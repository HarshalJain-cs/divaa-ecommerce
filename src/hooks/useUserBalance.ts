/**
 * useUserBalance Hook
 * Manages user account balance operations including:
 * - Fetching current balance
 * - Fetching balance transactions
 * - Applying balance at checkout
 * - Tracking expiring balances
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { calculateBalanceToUse, formatCurrency, daysUntilExpiry, isExpired } from '@/utils/giftCardUtils';
import type {
  UserBalance,
  UserBalanceTransaction,
  ApplyBalanceResult,
  ExpiringBalance,
} from '@/types/giftcard.types';

// ============================================
// QUERY KEYS
// ============================================

export const userBalanceKeys = {
  all: ['user-balance'] as const,
  detail: () => [...userBalanceKeys.all, 'detail'] as const,
  transactions: () => [...userBalanceKeys.all, 'transactions'] as const,
  expiring: () => [...userBalanceKeys.all, 'expiring'] as const,
};

// ============================================
// FETCH QUERIES
// ============================================

/**
 * Fetches current user's balance
 */
export function useUserBalance() {
  return useQuery({
    queryKey: userBalanceKeys.detail(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      const { data, error } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // If no balance record exists, return zero balance
      if (error && error.code === 'PGRST116') {
        return {
          id: '',
          user_id: user.id,
          balance: 0,
          last_updated: new Date().toISOString(),
          created_at: new Date().toISOString(),
        } as UserBalance;
      }

      if (error) {
        console.error('Error fetching user balance:', error);
        throw error;
      }

      return data as UserBalance;
    },
    enabled: true,
  });
}

/**
 * Fetches user balance transaction history
 */
export function useBalanceTransactions() {
  return useQuery({
    queryKey: userBalanceKeys.transactions(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // First get user balance ID
      const { data: userBalance } = await supabase
        .from('user_balance')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!userBalance) {
        return [];
      }

      // Then fetch transactions
      const { data, error } = await supabase
        .from('user_balance_transactions')
        .select('*')
        .eq('user_balance_id', userBalance.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching balance transactions:', error);
        throw error;
      }

      return data as UserBalanceTransaction[];
    },
    enabled: true,
  });
}

/**
 * Fetches expiring balances (balances that will expire soon)
 */
export function useExpiringBalances() {
  return useQuery({
    queryKey: userBalanceKeys.expiring(),
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // Get user balance ID
      const { data: userBalance } = await supabase
        .from('user_balance')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!userBalance) {
        return [];
      }

      // Fetch transactions that haven't expired yet and have expiry dates
      const { data, error } = await supabase
        .from('user_balance_transactions')
        .select('*')
        .eq('user_balance_id', userBalance.id)
        .eq('transaction_type', 'redemption') // Only redemption transactions add expiring balance
        .not('expires_at', 'is', null)
        .gte('expires_at', new Date().toISOString()) // Not yet expired
        .order('expires_at', { ascending: true });

      if (error) {
        console.error('Error fetching expiring balances:', error);
        throw error;
      }

      // Map to expiring balance format
      const expiringBalances: ExpiringBalance[] = (data as UserBalanceTransaction[])
        .filter((txn) => txn.expires_at && !isExpired(txn.expires_at))
        .map((txn) => ({
          amount: txn.amount,
          expires_at: txn.expires_at!,
          daysUntilExpiry: daysUntilExpiry(txn.expires_at!),
        }));

      return expiringBalances;
    },
    enabled: true,
  });
}

// ============================================
// MUTATIONS
// ============================================

/**
 * Applies user balance at checkout
 */
export function useApplyBalanceAtCheckout() {
  return useMutation({
    mutationFn: async ({
      amount,
      orderTotal,
      giftCardDiscount = 0,
    }: {
      amount?: number;
      orderTotal: number;
      giftCardDiscount?: number;
    }): Promise<ApplyBalanceResult> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Must be logged in');
      }

      // Fetch current balance
      const { data: userBalance, error: fetchError } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError || !userBalance) {
        return {
          success: false,
          balanceUsed: 0,
          remainingBalance: 0,
          message: 'No balance available',
          error: 'No balance found',
        };
      }

      if (userBalance.balance <= 0) {
        return {
          success: false,
          balanceUsed: 0,
          remainingBalance: 0,
          message: 'Insufficient balance',
          error: 'Your account balance is zero',
        };
      }

      // Calculate balance to use
      const balanceToUse = amount !== undefined
        ? Math.min(amount, userBalance.balance, orderTotal - giftCardDiscount)
        : calculateBalanceToUse(userBalance.balance, orderTotal, giftCardDiscount);

      if (balanceToUse <= 0) {
        return {
          success: false,
          balanceUsed: 0,
          remainingBalance: userBalance.balance,
          message: 'No balance needed for this order',
        };
      }

      const remainingBalance = userBalance.balance - balanceToUse;

      // Note: Actual balance deduction happens when order is confirmed
      // This mutation just calculates and validates

      return {
        success: true,
        balanceUsed: balanceToUse,
        remainingBalance,
        message: `${formatCurrency(balanceToUse)} from your balance will be applied`,
      };
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.error || 'Cannot apply balance');
      }
    },
    onError: (error) => {
      console.error('Error applying balance:', error);
      toast.error('Failed to apply account balance');
    },
  });
}

/**
 * Deducts balance after order confirmation
 * This should be called after payment is successful
 */
export function useDeductBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      orderId,
    }: {
      amount: number;
      orderId: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // Fetch current balance
      const { data: userBalance, error: fetchError } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError || !userBalance) {
        throw new Error('User balance not found');
      }

      if (userBalance.balance < amount) {
        throw new Error('Insufficient balance');
      }

      const newBalance = userBalance.balance - amount;

      // Update balance
      const { error: updateError } = await supabase
        .from('user_balance')
        .update({ balance: newBalance })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      // Create transaction record
      const { error: transactionError } = await supabase
        .from('user_balance_transactions')
        .insert({
          user_balance_id: userBalance.id,
          transaction_type: 'checkout_usage',
          amount: -amount, // Negative for deduction
          balance_before: userBalance.balance,
          balance_after: newBalance,
          order_id: orderId,
        });

      if (transactionError) {
        console.error('Error creating balance transaction:', transactionError);
        // Non-critical error
      }

      return { newBalance, amountUsed: amount };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userBalanceKeys.detail() });
      queryClient.invalidateQueries({ queryKey: userBalanceKeys.transactions() });
    },
    onError: (error) => {
      console.error('Failed to deduct balance:', error);
      toast.error('Failed to deduct balance from account');
    },
  });
}

/**
 * Manually adds balance (admin only or promotional)
 */
export function useAddBalance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      notes,
    }: {
      amount: number;
      notes?: string;
    }) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // Get or create user balance
      const { data: existingBalance } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      let newBalance: number;

      if (existingBalance) {
        newBalance = existingBalance.balance + amount;
        const { error } = await supabase
          .from('user_balance')
          .update({ balance: newBalance })
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        newBalance = amount;
        const { error } = await supabase
          .from('user_balance')
          .insert({ user_id: user.id, balance: newBalance });

        if (error) throw error;
      }

      // Create transaction
      const userBalanceId = existingBalance?.id || (await supabase
        .from('user_balance')
        .select('id')
        .eq('user_id', user.id)
        .single()).data!.id;

      await supabase.from('user_balance_transactions').insert({
        user_balance_id: userBalanceId,
        transaction_type: 'adjustment',
        amount,
        balance_before: existingBalance?.balance || 0,
        balance_after: newBalance,
        notes,
      });

      return { newBalance, amountAdded: amount };
    },
    onSuccess: (data) => {
      toast.success(`${formatCurrency(data.amountAdded)} added to your balance`);
      queryClient.invalidateQueries({ queryKey: userBalanceKeys.detail() });
      queryClient.invalidateQueries({ queryKey: userBalanceKeys.transactions() });
    },
    onError: (error) => {
      console.error('Failed to add balance:', error);
      toast.error('Failed to add balance');
    },
  });
}

/**
 * Processes expired balances (cron job or manual trigger)
 * This should be run periodically to expire old balances
 */
export function useProcessExpiredBalances() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('Not authenticated');
      }

      // Get user balance
      const { data: userBalance } = await supabase
        .from('user_balance')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!userBalance) {
        return { expiredAmount: 0 };
      }

      // Find expired transactions
      const { data: expiredTransactions } = await supabase
        .from('user_balance_transactions')
        .select('*')
        .eq('user_balance_id', userBalance.id)
        .eq('transaction_type', 'redemption')
        .not('expires_at', 'is', null)
        .lt('expires_at', new Date().toISOString());

      if (!expiredTransactions || expiredTransactions.length === 0) {
        return { expiredAmount: 0 };
      }

      // Calculate total expired amount
      const expiredAmount = expiredTransactions.reduce((sum, txn) => sum + txn.amount, 0);

      // Deduct from balance
      const newBalance = Math.max(0, userBalance.balance - expiredAmount);

      await supabase
        .from('user_balance')
        .update({ balance: newBalance })
        .eq('user_id', user.id);

      // Create expiry transaction
      await supabase.from('user_balance_transactions').insert({
        user_balance_id: userBalance.id,
        transaction_type: 'expiry',
        amount: -expiredAmount,
        balance_before: userBalance.balance,
        balance_after: newBalance,
        notes: 'Automatic expiry of old balance',
      });

      return { expiredAmount, newBalance };
    },
    onSuccess: (data) => {
      if (data.expiredAmount > 0) {
        toast.info(`${formatCurrency(data.expiredAmount)} of expired balance has been removed`);
      }
      queryClient.invalidateQueries({ queryKey: userBalanceKeys.all });
    },
    onError: (error) => {
      console.error('Failed to process expired balances:', error);
    },
  });
}

// Export all hooks
export default {
  useUserBalance,
  useBalanceTransactions,
  useExpiringBalances,
  useApplyBalanceAtCheckout,
  useDeductBalance,
  useAddBalance,
  useProcessExpiredBalances,
};
