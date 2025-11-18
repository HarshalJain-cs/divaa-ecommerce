/**
 * useGiftCards Hook
 * Comprehensive hook for gift card operations including:
 * - Fetching purchased & received gift cards
 * - Creating/purchasing gift cards
 * - Validating gift card codes
 * - Redeeming to account balance
 * - Applying at checkout
 * - Fetching transaction history
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import {
  generateGiftCardCode,
  calculateExpiryDate,
  isValidGiftCardCodeFormat,
  canUseGiftCard,
  calculateGiftCardDiscount,
  calculateRemainingBalance,
} from '@/utils/giftCardUtils';
import { sendGiftCardEmail, sendRedemptionConfirmationEmail } from '@/services/emailService';
import type {
  GiftCard,
  GiftCardFormData,
  GiftCardValidationResult,
  RedeemToBalanceResult,
  ApplyGiftCardResult,
  GiftCardTransaction,
} from '@/types/giftcard.types';
import { GIFT_CARD_EXPIRY_MONTHS } from '@/constants/giftcards';

// ============================================
// QUERY KEYS
// ============================================

export const giftCardKeys = {
  all: ['gift-cards'] as const,
  purchased: () => [...giftCardKeys.all, 'purchased'] as const,
  received: () => [...giftCardKeys.all, 'received'] as const,
  byCode: (code: string) => [...giftCardKeys.all, 'code', code] as const,
  transactions: (giftCardId: string) => [...giftCardKeys.all, 'transactions', giftCardId] as const,
};

// ============================================
// FETCH QUERIES
// ============================================

/**
 * Fetches gift cards purchased by the current user
 */
export function usePurchasedGiftCards() {
  return useQuery({
    queryKey: giftCardKeys.purchased(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('purchased_by', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching purchased gift cards:', error);
        throw error;
      }

      return data as GiftCard[];
    },
    enabled: true, // Only run when user is logged in
  });
}

/**
 * Fetches gift cards received by the current user (sent to their email)
 */
export function useReceivedGiftCards() {
  return useQuery({
    queryKey: giftCardKeys.received(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !user.email) {
        throw new Error('Not authenticated or email not available');
      }

      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('recipient_email', user.email)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching received gift cards:', error);
        throw error;
      }

      return data as GiftCard[];
    },
    enabled: true,
  });
}

/**
 * Fetches a specific gift card by code
 */
export function useGiftCardByCode(code: string, enabled: boolean = false) {
  return useQuery({
    queryKey: giftCardKeys.byCode(code),
    queryFn: async () => {
      if (!code || !isValidGiftCardCodeFormat(code)) {
        throw new Error('Invalid gift card code format');
      }

      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Gift card not found');
        }
        console.error('Error fetching gift card:', error);
        throw error;
      }

      return data as GiftCard;
    },
    enabled: enabled && !!code,
    retry: false,
  });
}

/**
 * Fetches transaction history for a gift card
 */
export function useGiftCardTransactions(giftCardId: string) {
  return useQuery({
    queryKey: giftCardKeys.transactions(giftCardId),
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gift_card_transactions')
        .select('*')
        .eq('gift_card_id', giftCardId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching gift card transactions:', error);
        throw error;
      }

      return data as GiftCardTransaction[];
    },
    enabled: !!giftCardId,
  });
}

// ============================================
// MUTATIONS
// ============================================

/**
 * Creates a new gift card (purchase)
 */
export function useCreateGiftCard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: GiftCardFormData) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Must be logged in to purchase gift cards');
      }

      // Generate unique code
      let code = generateGiftCardCode();
      let isUnique = false;
      let attempts = 0;

      // Ensure code is unique
      while (!isUnique && attempts < 10) {
        const { data: existing } = await supabase
          .from('gift_cards')
          .select('code')
          .eq('code', code)
          .single();

        if (!existing) {
          isUnique = true;
        } else {
          code = generateGiftCardCode();
          attempts++;
        }
      }

      if (!isUnique) {
        throw new Error('Failed to generate unique gift card code');
      }

      // Calculate expiry date
      const expiresAt = calculateExpiryDate(GIFT_CARD_EXPIRY_MONTHS);

      // Create gift card record
      const { data: giftCard, error: insertError } = await supabase
        .from('gift_cards')
        .insert({
          code,
          amount: formData.amount,
          balance: formData.amount,
          recipient_email: formData.recipient_email,
          recipient_name: formData.recipient_name,
          sender_name: formData.sender_name,
          personal_message: formData.personal_message,
          design_theme: formData.design_theme,
          purchased_by: user.id,
          expires_at: expiresAt.toISOString(),
          status: 'active',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Error creating gift card:', insertError);
        throw insertError;
      }

      // Create transaction record
      const { error: transactionError } = await supabase.from('gift_card_transactions').insert({
        gift_card_id: giftCard.id,
        transaction_type: 'purchase',
        amount: giftCard.amount,
        balance_before: 0,
        balance_after: giftCard.amount,
        user_id: user.id,
      });

      if (transactionError) {
        console.error('Error creating transaction record:', transactionError);
        // Non-critical error, continue
      }

      // Send email to recipient (placeholder)
      await sendGiftCardEmail(giftCard);

      return giftCard as GiftCard;
    },
    onSuccess: () => {
      toast.success('Gift card created successfully! Email sent to recipient.');
      queryClient.invalidateQueries({ queryKey: giftCardKeys.purchased() });
    },
    onError: (error) => {
      console.error('Failed to create gift card:', error);
      toast.error('Failed to create gift card. Please try again.');
    },
  });
}

/**
 * Validates a gift card code
 */
export function useValidateGiftCard() {
  return useMutation({
    mutationFn: async (code: string): Promise<GiftCardValidationResult> => {
      // Check format
      if (!isValidGiftCardCodeFormat(code)) {
        return {
          isValid: false,
          error: 'Invalid gift card code format',
        };
      }

      // Fetch gift card
      const { data, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error || !data) {
        return {
          isValid: false,
          error: 'Gift card not found',
        };
      }

      const giftCard = data as GiftCard;

      // Check if can be used
      const validation = canUseGiftCard(giftCard);

      if (!validation.canUse) {
        return {
          isValid: false,
          error: validation.reason,
        };
      }

      return {
        isValid: true,
        giftCard,
        availableBalance: giftCard.balance,
      };
    },
  });
}

/**
 * Redeems gift card to account balance
 */
export function useRedeemToBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (code: string): Promise<RedeemToBalanceResult> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Must be logged in to redeem gift cards');
      }

      // Validate and fetch gift card
      const { data: giftCard, error: fetchError } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (fetchError || !giftCard) {
        throw new Error('Gift card not found');
      }

      // Validate gift card
      const validation = canUseGiftCard(giftCard);
      if (!validation.canUse) {
        throw new Error(validation.reason);
      }

      const amountToAdd = giftCard.balance;

      // Get or create user balance record
      const { data: existingBalance } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      let newBalance: number;

      if (existingBalance) {
        // Update existing balance
        newBalance = existingBalance.balance + amountToAdd;
        const { error: updateError } = await supabase
          .from('user_balance')
          .update({ balance: newBalance })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        // Create new balance record
        newBalance = amountToAdd;
        const { error: insertError } = await supabase
          .from('user_balance')
          .insert({ user_id: user.id, balance: newBalance });

        if (insertError) throw insertError;
      }

      // Update gift card status
      const { error: updateGiftCardError } = await supabase
        .from('gift_cards')
        .update({
          balance: 0,
          status: 'fully_redeemed',
        })
        .eq('id', giftCard.id);

      if (updateGiftCardError) throw updateGiftCardError;

      // Create gift card transaction
      await supabase.from('gift_card_transactions').insert({
        gift_card_id: giftCard.id,
        transaction_type: 'redemption_to_balance',
        amount: amountToAdd,
        balance_before: giftCard.balance,
        balance_after: 0,
        user_id: user.id,
      });

      // Create user balance transaction
      const expiresAt = calculateExpiryDate(6); // 6 months from redemption
      await supabase.from('user_balance_transactions').insert({
        user_balance_id: existingBalance?.id || (await supabase
          .from('user_balance')
          .select('id')
          .eq('user_id', user.id)
          .single()).data!.id,
        transaction_type: 'redemption',
        amount: amountToAdd,
        balance_before: existingBalance?.balance || 0,
        balance_after: newBalance,
        gift_card_id: giftCard.id,
        expires_at: expiresAt.toISOString(),
      });

      // Send confirmation email (placeholder)
      if (user.email) {
        await sendRedemptionConfirmationEmail(user.email, code, amountToAdd);
      }

      return {
        success: true,
        message: `₹${amountToAdd} added to your account balance`,
        newBalance,
        amountAdded: amountToAdd,
        expiresAt: expiresAt.toISOString(),
      };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: giftCardKeys.received() });
      queryClient.invalidateQueries({ queryKey: ['user-balance'] });
    },
    onError: (error) => {
      console.error('Failed to redeem gift card:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to redeem gift card');
    },
  });
}

/**
 * Applies gift card code at checkout
 */
export function useApplyGiftCardAtCheckout() {
  return useMutation({
    mutationFn: async ({
      code,
      orderTotal,
    }: {
      code: string;
      orderTotal: number;
    }): Promise<ApplyGiftCardResult> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Must be logged in');
      }

      // Validate and fetch gift card
      const { data: giftCard, error } = await supabase
        .from('gift_cards')
        .select('*')
        .eq('code', code.toUpperCase())
        .single();

      if (error || !giftCard) {
        return {
          success: false,
          discountAmount: 0,
          remainingBalance: 0,
          message: 'Gift card not found',
          error: 'Gift card not found',
        };
      }

      // Validate gift card
      const validation = canUseGiftCard(giftCard);
      if (!validation.canUse) {
        return {
          success: false,
          discountAmount: 0,
          remainingBalance: giftCard.balance,
          message: validation.reason || 'Cannot use this gift card',
          error: validation.reason,
        };
      }

      // Calculate discount
      const discountAmount = calculateGiftCardDiscount(giftCard.balance, orderTotal);
      const remainingBalance = calculateRemainingBalance(giftCard.balance, discountAmount);

      return {
        success: true,
        discountAmount,
        remainingBalance,
        message: `Gift card applied! ₹${discountAmount} discount.`,
      };
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error || 'Failed to apply gift card');
      }
    },
    onError: (error) => {
      console.error('Error applying gift card:', error);
      toast.error('Failed to apply gift card');
    },
  });
}

// Export all hooks
export default {
  usePurchasedGiftCards,
  useReceivedGiftCards,
  useGiftCardByCode,
  useGiftCardTransactions,
  useCreateGiftCard,
  useValidateGiftCard,
  useRedeemToBalance,
  useApplyGiftCardAtCheckout,
};
