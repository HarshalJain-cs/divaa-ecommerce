/**
 * Gift Card System Constants
 * Configuration values, themes, and preset options for gift cards
 */

import { GiftCardTheme, GiftCardThemeConfig } from '@/types/giftcard.types';

// ============================================
// AMOUNT CONFIGURATION
// ============================================

/**
 * Preset gift card amounts (in INR)
 */
export const GIFT_CARD_PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000] as const;

/**
 * Minimum gift card amount (in INR)
 */
export const GIFT_CARD_MIN_AMOUNT = 500;

/**
 * Maximum gift card amount (in INR)
 * Set to null for no maximum
 */
export const GIFT_CARD_MAX_AMOUNT: number | null = null;

// ============================================
// EXPIRY CONFIGURATION
// ============================================

/**
 * Gift card expiry period in months from purchase date
 */
export const GIFT_CARD_EXPIRY_MONTHS = 6;

/**
 * Account balance expiry period in months from redemption date
 */
export const ACCOUNT_BALANCE_EXPIRY_MONTHS = 6;

/**
 * Days before expiry to show warning (for UI)
 */
export const EXPIRY_WARNING_DAYS = 30;

// ============================================
// CODE GENERATION CONFIGURATION
// ============================================

/**
 * Gift card code format configuration
 */
export const GIFT_CARD_CODE_CONFIG = {
  prefix: 'DIVA',
  segments: 4,
  segmentLength: 4,
  separator: '-',
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
} as const;

/**
 * Example format: DIVA-A1B2-C3D4-E5F6
 */
export const GIFT_CARD_CODE_FORMAT = 'DIVA-XXXX-XXXX-XXXX';

/**
 * Regular expression to validate gift card code format
 */
export const GIFT_CARD_CODE_REGEX = /^DIVA-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

// ============================================
// DESIGN THEMES
// ============================================

/**
 * Gift card theme configurations with images and gradients
 */
export const GIFT_CARD_THEMES: Record<GiftCardTheme, GiftCardThemeConfig> = {
  birthday: {
    name: 'Birthday',
    image: 'https://via.placeholder.com/400x250/E0BFB8/FFFFFF?text=Happy+Birthday',
    gradient: 'from-pink-400 via-purple-400 to-purple-500',
    description: 'Perfect for birthday celebrations',
  },
  wedding: {
    name: 'Wedding',
    image: 'https://via.placeholder.com/400x250/DCA1A1/FFFFFF?text=Wedding+Wishes',
    gradient: 'from-rose-300 via-pink-300 to-pink-400',
    description: 'Ideal for wedding gifts',
  },
  anniversary: {
    name: 'Anniversary',
    image: 'https://via.placeholder.com/400x250/DE5D83/FFFFFF?text=Happy+Anniversary',
    gradient: 'from-red-400 via-pink-400 to-pink-500',
    description: 'Celebrate love and milestones',
  },
  thankyou: {
    name: 'Thank You',
    image: 'https://via.placeholder.com/400x250/C37F7A/FFFFFF?text=Thank+You',
    gradient: 'from-amber-300 via-orange-300 to-orange-400',
    description: 'Show your appreciation',
  },
  general: {
    name: 'General',
    image: 'https://via.placeholder.com/400x250/B76E79/FFFFFF?text=Gift+Card',
    gradient: 'from-rose-gold via-rose-gold-light to-rose-gold-dark',
    description: 'For any occasion',
  },
} as const;

/**
 * Get array of theme options for selection
 */
export const GIFT_CARD_THEME_OPTIONS = Object.entries(GIFT_CARD_THEMES).map(
  ([key, config]) => ({
    value: key as GiftCardTheme,
    label: config.name,
    ...config,
  })
);

// ============================================
// REDEMPTION OPTIONS
// ============================================

/**
 * Redemption types with descriptions
 */
export const REDEMPTION_OPTIONS = {
  balance: {
    label: 'Add to Account Balance',
    description: 'Add the full gift card value to your account balance for future purchases',
    icon: 'wallet',
  },
  checkout: {
    label: 'Apply at Checkout',
    description: 'Use this code during checkout to get an instant discount on your order',
    icon: 'shopping-cart',
  },
} as const;

// ============================================
// PURCHASE OPTIONS
// ============================================

/**
 * Purchase methods available
 */
export const PURCHASE_METHODS = {
  direct: {
    label: 'Buy Now',
    description: 'Purchase and send gift card directly via email',
    recommended: true,
  },
  cart: {
    label: 'Add to Cart',
    description: 'Add gift card to cart and checkout with other items',
    recommended: false,
  },
} as const;

// ============================================
// VALIDATION RULES
// ============================================

/**
 * Form validation rules
 */
export const GIFT_CARD_VALIDATION = {
  amount: {
    min: GIFT_CARD_MIN_AMOUNT,
    max: GIFT_CARD_MAX_AMOUNT,
    required: true,
  },
  recipient_email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  recipient_name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  sender_name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  personal_message: {
    required: false,
    maxLength: 500,
  },
} as const;

// ============================================
// UI MESSAGES
// ============================================

/**
 * Success messages for different actions
 */
export const SUCCESS_MESSAGES = {
  PURCHASE: 'Gift card purchased successfully! Email sent to recipient.',
  REDEEM_TO_BALANCE: 'Gift card redeemed! Balance added to your account.',
  APPLY_AT_CHECKOUT: 'Gift card applied successfully!',
  BALANCE_APPLIED: 'Account balance applied to your order.',
} as const;

/**
 * Error messages for different scenarios
 */
export const ERROR_MESSAGES = {
  INVALID_CODE: 'Invalid gift card code. Please check and try again.',
  EXPIRED: 'This gift card has expired.',
  FULLY_REDEEMED: 'This gift card has already been fully redeemed.',
  INSUFFICIENT_BALANCE: 'Insufficient gift card balance for this order.',
  MINIMUM_AMOUNT: `Minimum gift card amount is ₹${GIFT_CARD_MIN_AMOUNT}.`,
  ALREADY_USED_IN_ORDER: 'This gift card has already been used in another order.',
  INVALID_EMAIL: 'Please enter a valid email address.',
  REQUIRED_FIELD: 'This field is required.',
  EMAIL_SEND_FAILED: 'Failed to send gift card email. Please contact support.',
  PURCHASE_FAILED: 'Failed to purchase gift card. Please try again.',
  REDEMPTION_FAILED: 'Failed to redeem gift card. Please try again.',
} as const;

/**
 * Warning messages
 */
export const WARNING_MESSAGES = {
  EXPIRING_SOON: (days: number) =>
    `This gift card expires in ${days} day${days !== 1 ? 's' : ''}!`,
  BALANCE_EXPIRING_SOON: (amount: number, days: number) =>
    `₹${amount} of your balance expires in ${days} day${days !== 1 ? 's' : ''}!`,
  PARTIAL_REDEMPTION: 'Gift card partially used. Remaining balance can be used for future purchases.',
} as const;

/**
 * Info messages
 */
export const INFO_MESSAGES = {
  HOW_IT_WORKS: 'Gift cards can be redeemed at checkout or added to your account balance. They expire 6 months from purchase date.',
  EMAIL_DELIVERY: 'Gift card will be delivered via email instantly after purchase.',
  NO_MAXIMUM: 'No maximum limit - choose any custom amount above ₹500.',
  SINGLE_USE_PER_ORDER: 'Only one gift card code can be applied per order.',
  PARTIAL_BALANCE_ALLOWED: 'You can use partial account balance at checkout.',
} as const;

// ============================================
// STATUS LABELS & COLORS
// ============================================

/**
 * Gift card status display configuration
 */
export const STATUS_CONFIG = {
  active: {
    label: 'Active',
    color: 'green',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  partially_used: {
    label: 'Partially Used',
    color: 'yellow',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
  },
  fully_redeemed: {
    label: 'Fully Redeemed',
    color: 'gray',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
  },
  expired: {
    label: 'Expired',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
} as const;

// ============================================
// TRANSACTION TYPE LABELS
// ============================================

/**
 * Transaction type display labels
 */
export const TRANSACTION_TYPE_LABELS = {
  purchase: 'Purchased',
  redemption_to_balance: 'Redeemed to Balance',
  checkout_usage: 'Used at Checkout',
  refund: 'Refunded',
  expiry: 'Expired',
  cancellation: 'Cancelled',
} as const;

// ============================================
// FEATURE FLAGS
// ============================================

/**
 * Feature toggles for gift card functionality
 */
export const GIFT_CARD_FEATURES = {
  ALLOW_CART_PURCHASE: true, // Allow adding gift cards to cart
  ALLOW_DIRECT_PURCHASE: true, // Allow direct purchase without cart
  ALLOW_BALANCE_REDEMPTION: true, // Allow redeeming to account balance
  ALLOW_CHECKOUT_REDEMPTION: true, // Allow applying at checkout
  ALLOW_MULTIPLE_CARDS: false, // Allow multiple gift cards per order (currently false)
  ALLOW_PARTIAL_BALANCE: true, // Allow using partial account balance
  SHOW_EXPIRY_WARNINGS: true, // Show expiry warnings to users
  ENABLE_EMAIL_DELIVERY: true, // Enable email delivery (placeholder for now)
  ENABLE_PDF_VOUCHER: false, // Generate PDF vouchers (future feature)
} as const;

// ============================================
// ADMIN CONFIGURATION
// ============================================

/**
 * Admin panel configuration
 */
export const ADMIN_CONFIG = {
  ITEMS_PER_PAGE: 20,
  ALLOW_MANUAL_CREATION: true,
  ALLOW_CANCELLATION: true,
  ALLOW_REFUND: true,
  ALLOW_CUSTOM_CODES: true,
  ALLOW_CUSTOM_EXPIRY: true,
} as const;

// ============================================
// EMAIL CONFIGURATION (Placeholder)
// ============================================

/**
 * Email template configuration (for future implementation)
 */
export const EMAIL_CONFIG = {
  FROM_NAME: 'DIVA Jewels',
  FROM_EMAIL: 'noreply@divajewels.com',
  SUBJECT: (theme: string) => `You've received a DIVA ${theme} Gift Card!`,
  TEMPLATE_ID: {
    birthday: 'birthday-gift-card',
    wedding: 'wedding-gift-card',
    anniversary: 'anniversary-gift-card',
    thankyou: 'thankyou-gift-card',
    general: 'general-gift-card',
  },
} as const;

// ============================================
// ANALYTICS EVENTS
// ============================================

/**
 * Analytics event names for tracking
 */
export const ANALYTICS_EVENTS = {
  GIFT_CARD_VIEWED: 'gift_card_page_viewed',
  THEME_SELECTED: 'gift_card_theme_selected',
  AMOUNT_SELECTED: 'gift_card_amount_selected',
  PURCHASE_INITIATED: 'gift_card_purchase_initiated',
  PURCHASE_COMPLETED: 'gift_card_purchase_completed',
  REDEMPTION_INITIATED: 'gift_card_redemption_initiated',
  REDEMPTION_COMPLETED: 'gift_card_redemption_completed',
  BALANCE_APPLIED: 'account_balance_applied',
  CODE_VALIDATED: 'gift_card_code_validated',
} as const;
