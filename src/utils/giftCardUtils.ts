/**
 * Gift Card Utility Functions
 * Helper functions for gift card code generation, validation, and calculations
 */

import {
  GIFT_CARD_CODE_CONFIG,
  GIFT_CARD_CODE_REGEX,
  GIFT_CARD_EXPIRY_MONTHS,
  EXPIRY_WARNING_DAYS,
} from '@/constants/giftcards';
import type { GiftCard, GiftCardStatus } from '@/types/giftcard.types';

// ============================================
// CODE GENERATION
// ============================================

/**
 * Generates a unique gift card code in format: DIVA-A1B2-C3D4-E5F6
 * @returns {string} Generated gift card code
 */
export function generateGiftCardCode(): string {
  const { prefix, segments, segmentLength, separator, characters } = GIFT_CARD_CODE_CONFIG;

  const generateSegment = (): string => {
    return Array.from({ length: segmentLength }, () => {
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters.charAt(randomIndex);
    }).join('');
  };

  const codeSegments = Array.from({ length: segments }, () => generateSegment());

  return `${prefix}${separator}${codeSegments.join(separator)}`;
}

/**
 * Validates gift card code format
 * @param {string} code - Gift card code to validate
 * @returns {boolean} True if code format is valid
 */
export function isValidGiftCardCodeFormat(code: string): boolean {
  return GIFT_CARD_CODE_REGEX.test(code.toUpperCase());
}

/**
 * Formats gift card code with proper separators
 * @param {string} code - Raw code
 * @returns {string} Formatted code
 */
export function formatGiftCardCode(code: string): string {
  // Remove all non-alphanumeric characters
  const cleaned = code.replace(/[^A-Z0-9]/gi, '').toUpperCase();

  // Split into segments
  if (cleaned.startsWith('DIVA')) {
    const rest = cleaned.slice(4);
    const segments = rest.match(/.{1,4}/g) || [];
    return `DIVA-${segments.join('-')}`;
  }

  return code;
}

// ============================================
// DATE & EXPIRY CALCULATIONS
// ============================================

/**
 * Calculates expiry date from a given date
 * @param {number} months - Number of months until expiry
 * @param {Date} fromDate - Starting date (defaults to now)
 * @returns {Date} Expiry date
 */
export function calculateExpiryDate(
  months: number = GIFT_CARD_EXPIRY_MONTHS,
  fromDate: Date = new Date()
): Date {
  const expiryDate = new Date(fromDate);
  expiryDate.setMonth(expiryDate.getMonth() + months);
  return expiryDate;
}

/**
 * Checks if a gift card or balance has expired
 * @param {string} expiryDate - ISO date string
 * @returns {boolean} True if expired
 */
export function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}

/**
 * Calculates days until expiry
 * @param {string} expiryDate - ISO date string
 * @returns {number} Days until expiry (negative if expired)
 */
export function daysUntilExpiry(expiryDate: string): number {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Checks if expiry warning should be shown
 * @param {string} expiryDate - ISO date string
 * @returns {boolean} True if should show warning
 */
export function shouldShowExpiryWarning(expiryDate: string): boolean {
  const days = daysUntilExpiry(expiryDate);
  return days > 0 && days <= EXPIRY_WARNING_DAYS;
}

/**
 * Formats expiry date for display
 * @param {string} expiryDate - ISO date string
 * @returns {string} Formatted date
 */
export function formatExpiryDate(expiryDate: string): string {
  return new Date(expiryDate).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============================================
// BALANCE & AMOUNT CALCULATIONS
// ============================================

/**
 * Calculates usage percentage of a gift card
 * @param {number} originalAmount - Original amount
 * @param {number} currentBalance - Current balance
 * @returns {number} Usage percentage (0-100)
 */
export function calculateUsagePercentage(originalAmount: number, currentBalance: number): number {
  if (originalAmount === 0) return 0;
  const usedAmount = originalAmount - currentBalance;
  return Math.round((usedAmount / originalAmount) * 100);
}

/**
 * Determines gift card status based on balance and expiry
 * @param {number} balance - Current balance
 * @param {number} originalAmount - Original amount
 * @param {string} expiryDate - Expiry date
 * @returns {GiftCardStatus} Status
 */
export function determineGiftCardStatus(
  balance: number,
  originalAmount: number,
  expiryDate: string
): GiftCardStatus {
  if (isExpired(expiryDate)) {
    return 'expired';
  }

  if (balance === 0) {
    return 'fully_redeemed';
  }

  if (balance < originalAmount) {
    return 'partially_used';
  }

  return 'active';
}

/**
 * Calculates discount amount for checkout
 * @param {number} giftCardBalance - Gift card balance
 * @param {number} orderTotal - Order total amount
 * @returns {number} Discount amount to apply
 */
export function calculateGiftCardDiscount(giftCardBalance: number, orderTotal: number): number {
  return Math.min(giftCardBalance, orderTotal);
}

/**
 * Calculates remaining balance after usage
 * @param {number} currentBalance - Current balance
 * @param {number} usedAmount - Amount used
 * @returns {number} Remaining balance
 */
export function calculateRemainingBalance(currentBalance: number, usedAmount: number): number {
  return Math.max(0, currentBalance - usedAmount);
}

/**
 * Calculates how much account balance to use
 * @param {number} userBalance - User's total balance
 * @param {number} orderTotal - Order total
 * @param {number} giftCardDiscount - Already applied gift card discount
 * @returns {number} Balance amount to use
 */
export function calculateBalanceToUse(
  userBalance: number,
  orderTotal: number,
  giftCardDiscount: number = 0
): number {
  const remainingOrderAmount = orderTotal - giftCardDiscount;
  return Math.min(userBalance, Math.max(0, remainingOrderAmount));
}

/**
 * Calculates final order amount after all discounts
 * @param {number} orderTotal - Original order total
 * @param {number} giftCardDiscount - Gift card discount
 * @param {number} balanceUsed - Account balance used
 * @returns {number} Final amount to pay
 */
export function calculateFinalAmount(
  orderTotal: number,
  giftCardDiscount: number = 0,
  balanceUsed: number = 0
): number {
  return Math.max(0, orderTotal - giftCardDiscount - balanceUsed);
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Validates gift card amount
 * @param {number} amount - Amount to validate
 * @param {number} minAmount - Minimum allowed amount
 * @param {number | null} maxAmount - Maximum allowed amount (null for no max)
 * @returns {{ isValid: boolean; error?: string }} Validation result
 */
export function validateGiftCardAmount(
  amount: number,
  minAmount: number,
  maxAmount: number | null = null
): { isValid: boolean; error?: string } {
  if (amount < minAmount) {
    return {
      isValid: false,
      error: `Minimum amount is ₹${minAmount}`,
    };
  }

  if (maxAmount !== null && amount > maxAmount) {
    return {
      isValid: false,
      error: `Maximum amount is ₹${maxAmount}`,
    };
  }

  return { isValid: true };
}

/**
 * Validates email address format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates gift card can be used
 * @param {GiftCard} giftCard - Gift card to validate
 * @returns {{ canUse: boolean; reason?: string }} Validation result
 */
export function canUseGiftCard(giftCard: GiftCard): { canUse: boolean; reason?: string } {
  // Check if expired
  if (isExpired(giftCard.expires_at)) {
    return {
      canUse: false,
      reason: 'This gift card has expired',
    };
  }

  // Check if has balance
  if (giftCard.balance <= 0) {
    return {
      canUse: false,
      reason: 'This gift card has no remaining balance',
    };
  }

  // Check if cancelled
  if (giftCard.status === 'cancelled') {
    return {
      canUse: false,
      reason: 'This gift card has been cancelled',
    };
  }

  return { canUse: true };
}

// ============================================
// DISPLAY FORMATTING
// ============================================

/**
 * Formats currency amount for display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: INR)
 * @returns {string} Formatted amount
 */
export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (currency === 'INR') {
    return `₹${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Masks gift card code for security (shows only last 4 characters)
 * @param {string} code - Gift card code
 * @returns {string} Masked code
 */
export function maskGiftCardCode(code: string): string {
  if (code.length <= 8) return code;

  const parts = code.split('-');
  if (parts.length >= 4) {
    return `${parts[0]}-****-****-${parts[parts.length - 1]}`;
  }

  return `****-${code.slice(-4)}`;
}

/**
 * Generates user-friendly transaction description
 * @param {string} transactionType - Type of transaction
 * @param {number} amount - Transaction amount
 * @returns {string} Description
 */
export function getTransactionDescription(transactionType: string, amount: number): string {
  const formattedAmount = formatCurrency(amount);

  switch (transactionType) {
    case 'purchase':
      return `Purchased gift card worth ${formattedAmount}`;
    case 'redemption_to_balance':
      return `Redeemed ${formattedAmount} to account balance`;
    case 'checkout_usage':
      return `Used ${formattedAmount} at checkout`;
    case 'refund':
      return `Refunded ${formattedAmount}`;
    case 'expiry':
      return `Expired ${formattedAmount}`;
    case 'cancellation':
      return `Cancelled - ${formattedAmount}`;
    default:
      return `Transaction of ${formattedAmount}`;
  }
}

// ============================================
// SORTING & FILTERING HELPERS
// ============================================

/**
 * Sorts gift cards by expiry date (expiring soon first)
 * @param {GiftCard[]} giftCards - Array of gift cards
 * @returns {GiftCard[]} Sorted array
 */
export function sortByExpiry(giftCards: GiftCard[]): GiftCard[] {
  return [...giftCards].sort((a, b) => {
    const dateA = new Date(a.expires_at).getTime();
    const dateB = new Date(b.expires_at).getTime();
    return dateA - dateB;
  });
}

/**
 * Filters active gift cards (not expired, has balance)
 * @param {GiftCard[]} giftCards - Array of gift cards
 * @returns {GiftCard[]} Filtered array
 */
export function filterActiveGiftCards(giftCards: GiftCard[]): GiftCard[] {
  return giftCards.filter(
    (card) => !isExpired(card.expires_at) && card.balance > 0 && card.status !== 'cancelled'
  );
}

/**
 * Filters gift cards expiring soon
 * @param {GiftCard[]} giftCards - Array of gift cards
 * @returns {GiftCard[]} Filtered array
 */
export function filterExpiringSoon(giftCards: GiftCard[]): GiftCard[] {
  return giftCards.filter((card) => shouldShowExpiryWarning(card.expires_at));
}

// ============================================
// ANALYTICS HELPERS
// ============================================

/**
 * Calculates total value of gift cards
 * @param {GiftCard[]} giftCards - Array of gift cards
 * @param {'amount' | 'balance'} field - Which field to sum
 * @returns {number} Total value
 */
export function calculateTotalValue(
  giftCards: GiftCard[],
  field: 'amount' | 'balance' = 'balance'
): number {
  return giftCards.reduce((total, card) => total + card[field], 0);
}

/**
 * Groups gift cards by status
 * @param {GiftCard[]} giftCards - Array of gift cards
 * @returns {Record<GiftCardStatus, GiftCard[]>} Grouped gift cards
 */
export function groupByStatus(giftCards: GiftCard[]): Record<string, GiftCard[]> {
  return giftCards.reduce((groups, card) => {
    const status = card.status;
    if (!groups[status]) {
      groups[status] = [];
    }
    groups[status].push(card);
    return groups;
  }, {} as Record<string, GiftCard[]>);
}
