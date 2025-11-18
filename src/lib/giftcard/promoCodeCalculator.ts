/**
 * @file Promo Code Calculator Utility
 * @description Calculate discounts for promo codes
 */

import { supabase } from '@/lib/supabase';
import type { PromoCode, PromoCodeValidation } from '@/types/giftcard.types';

/**
 * Validate promo code and calculate discount
 */
export async function validatePromoCode(
  code: string,
  totalAmount: number
): Promise<PromoCodeValidation> {
  try {
    // Fetch promo code from database
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !data) {
      return {
        valid: false,
        error: 'Invalid promo code',
      };
    }

    const promoCode = data as PromoCode;

    // Check if expired
    if (promoCode.expires_at) {
      const expiryDate = new Date(promoCode.expires_at);
      if (expiryDate < new Date()) {
        return {
          valid: false,
          error: 'This promo code has expired',
        };
      }
    }

    // Check usage limit
    if (promoCode.max_uses !== null && promoCode.current_uses >= promoCode.max_uses) {
      return {
        valid: false,
        error: 'This promo code has reached its usage limit',
      };
    }

    // Check minimum purchase amount
    if (totalAmount < promoCode.min_purchase_amount) {
      return {
        valid: false,
        error: `Minimum purchase amount of ₹${promoCode.min_purchase_amount} required`,
      };
    }

    // Calculate discount
    const discountAmount = calculateDiscount(totalAmount, promoCode);

    return {
      valid: true,
      promo_code: promoCode,
      discount_amount: discountAmount,
    };
  } catch (error) {
    console.error('Error validating promo code:', error);
    return {
      valid: false,
      error: 'Failed to validate promo code',
    };
  }
}

/**
 * Calculate discount amount based on promo code type
 */
export function calculateDiscount(totalAmount: number, promoCode: PromoCode): number {
  if (promoCode.discount_type === 'percentage') {
    // Percentage discount
    const discount = (totalAmount * promoCode.discount_value) / 100;
    return Math.round(discount * 100) / 100; // Round to 2 decimal places
  } else {
    // Fixed amount discount
    return Math.min(promoCode.discount_value, totalAmount);
  }
}

/**
 * Calculate final amount after discount
 */
export function calculateFinalAmount(totalAmount: number, discountAmount: number): number {
  const finalAmount = totalAmount - discountAmount;
  return Math.max(0, finalAmount); // Ensure never negative
}

/**
 * Format discount for display
 */
export function formatDiscount(promoCode: PromoCode): string {
  if (promoCode.discount_type === 'percentage') {
    return `${promoCode.discount_value}% off`;
  } else {
    return `₹${promoCode.discount_value} off`;
  }
}

/**
 * Increment promo code usage count
 */
export async function incrementPromoCodeUsage(promoCodeId: string): Promise<boolean> {
  try {
    const { error } = await supabase.rpc('increment_promo_code_usage', {
      promo_code_id: promoCodeId,
    });

    if (error) {
      // Fallback: manual increment
      const { data: currentData } = await supabase
        .from('promo_codes')
        .select('current_uses')
        .eq('id', promoCodeId)
        .single();

      if (currentData) {
        await supabase
          .from('promo_codes')
          .update({ current_uses: currentData.current_uses + 1 })
          .eq('id', promoCodeId);
      }
    }

    return true;
  } catch (error) {
    console.error('Error incrementing promo code usage:', error);
    return false;
  }
}

/**
 * Check if promo code is currently valid (not considering amount)
 */
export async function isPromoCodeActive(code: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('id, is_active, expires_at, max_uses, current_uses')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) {
      return false;
    }

    // Check if active
    if (!data.is_active) {
      return false;
    }

    // Check if expired
    if (data.expires_at) {
      const expiryDate = new Date(data.expires_at);
      if (expiryDate < new Date()) {
        return false;
      }
    }

    // Check usage limit
    if (data.max_uses !== null && data.current_uses >= data.max_uses) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking promo code status:', error);
    return false;
  }
}

/**
 * Get promo code details
 */
export async function getPromoCodeDetails(code: string): Promise<PromoCode | null> {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error || !data) {
      return null;
    }

    return data as PromoCode;
  } catch (error) {
    console.error('Error fetching promo code details:', error);
    return null;
  }
}

/**
 * Calculate bulk order discount
 * Applies wholesale discount (10%) for bulk orders
 */
export function calculateBulkDiscount(totalAmount: number, quantity: number): number {
  // 10% wholesale discount for bulk orders
  const bulkDiscountPercent = 10;
  const discount = (totalAmount * bulkDiscountPercent) / 100;
  return Math.round(discount * 100) / 100;
}

/**
 * Check if order qualifies for bulk discount
 */
export function qualifiesForBulkDiscount(quantity: number): boolean {
  // Bulk discount applies to orders with 10 or more cards
  return quantity >= 10;
}

/**
 * Apply multiple discounts (promo code + bulk discount)
 * Note: Usually only one discount is allowed, but this handles edge cases
 */
export function applyMultipleDiscounts(
  totalAmount: number,
  discounts: Array<{ type: string; amount: number }>
): { totalDiscount: number; finalAmount: number } {
  const totalDiscount = discounts.reduce((sum, discount) => sum + discount.amount, 0);
  const finalAmount = calculateFinalAmount(totalAmount, totalDiscount);

  return {
    totalDiscount: Math.round(totalDiscount * 100) / 100,
    finalAmount: Math.round(finalAmount * 100) / 100,
  };
}
