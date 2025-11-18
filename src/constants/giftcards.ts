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
 */
export const GIFT_CARD_MAX_AMOUNT = 50000;

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
  prefix: 'DIVAA',
  segments: 3, // 3 segments of 4 digits each
  segmentLength: 4,
  separator: '-',
  characters: '0123456789', // Numeric only for simplicity
} as const;

/**
 * Example format: DIVAA-1234-5678-9012
 */
export const GIFT_CARD_CODE_FORMAT = 'DIVAA-XXXX-XXXX-XXXX';

/**
 * Regular expression to validate gift card code format
 */
export const GIFT_CARD_CODE_REGEX = /^DIVAA-\d{4}-\d{4}-\d{4}$/;

// ============================================
// DESIGN THEMES
// ============================================

/**
 * Gift card theme configurations with gradients (Phase 1: Birthday, Diwali, General)
 * Note: Using brand colors from theme.css (--rose-gold, --blush-pink, etc.)
 */
export const GIFT_CARD_THEMES: Record<GiftCardTheme, GiftCardThemeConfig> = {
  birthday: {
    name: 'Birthday',
    image: '/gift-card-placeholders/birthday.svg',
    gradient: 'from-[#E0BFB8] to-[#DE5D83]', // Rose gold to blush pink
    description: 'Celebrate special birthdays with joy',
  },
  diwali: {
    name: 'Diwali',
    image: '/gift-card-placeholders/diwali.svg',
    gradient: 'from-[#B76E79] to-[#E0BFB8]', // Rose gold dark to rose gold
    description: 'Festival of lights celebration',
  },
  general: {
    name: 'General',
    image: '/gift-card-placeholders/general.svg',
    gradient: 'from-[#E0BFB8] to-[#B76E79]', // Rose gold to rose gold dark
    description: 'Perfect for any occasion',
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

// ============================================
// PHASE 1: NEW CONSTANTS
// ============================================

/**
 * Card PIN configuration
 */
export const CARD_PIN_CONFIG = {
  length: 6, // 6-digit PIN
  characters: '0123456789',
} as const;

/**
 * Bulk order configuration
 */
export const BULK_ORDER_CONFIG = {
  MAX_ROWS: 100,
  ALLOWED_FILE_TYPES: ['.csv'],
  MAX_FILE_SIZE_MB: 5,
  WHOLESALE_DISCOUNT_PERCENT: 10,
  MIN_AMOUNT: GIFT_CARD_MIN_AMOUNT,
  MAX_AMOUNT: GIFT_CARD_MAX_AMOUNT,
  CSV_COLUMNS: [
    'recipient_name',
    'recipient_email',
    'recipient_phone',
    'amount',
    'custom_message',
    'design_theme',
  ],
} as const;

/**
 * Cart limits for gift cards
 */
export const CART_LIMITS = {
  MAX_GIFT_CARDS: 5,
  MAX_ORDER_VALUE: 50000,
  MIN_ORDER_VALUE: 500,
} as const;

/**
 * OTP configuration
 */
export const OTP_CONFIG = {
  LENGTH: 6,
  EXPIRY_MINUTES: 10,
  MAX_ATTEMPTS: 5,
  RESEND_COOLDOWN_SECONDS: 30,
} as const;

/**
 * Promo code: GIFT5 configuration
 */
export const DEFAULT_PROMO_CODE = {
  CODE: 'GIFT5',
  DISCOUNT_PERCENT: 5,
  MIN_PURCHASE: 1000,
  MAX_USES: 100,
  VALID_DAYS: 30,
} as const;

/**
 * QR Code configuration
 */
export const QR_CODE_CONFIG = {
  SIZE: 200,
  ERROR_CORRECTION: 'M', // L, M, Q, H
  MARGIN: 4,
} as const;

/**
 * Email configuration for Resend
 */
export const EMAIL_SENDER = {
  FROM_NAME: 'Divaa Jewels',
  FROM_EMAIL: 'noreply@divaa.com',
  SUPPORT_EMAIL: 'saj.query@gmail.com',
} as const;

/**
 * SMS configuration (dummy for Phase 1)
 */
export const SMS_CONFIG = {
  ENABLED: false, // Dummy for Phase 1
  FROM_NUMBER: '+1234567890',
} as const;

/**
 * Card type configuration
 */
export const CARD_TYPE_CONFIG = {
  regular: {
    label: 'Regular Gift Card',
    description: 'One-time use gift card',
    badge: null,
  },
  reloadable: {
    label: 'Reloadable Gift Card',
    description: 'Can be reloaded multiple times',
    badge: '🔄 Reloadable',
    min_reload: 2000,
    max_reload: 10000,
  },
} as const;

/**
 * Admin configuration
 */
export const ADMIN_CREDENTIALS = {
  USERNAME: import.meta.env.VITE_ADMIN_USERNAME || 'harry',
  PASSWORD_HASH: import.meta.env.VITE_ADMIN_PASSWORD_HASH || 'diva.saj',
} as const;

/**
 * Low balance alert threshold
 */
export const LOW_BALANCE_THRESHOLD = 500;

/**
 * Velocity limits (fraud prevention)
 */
export const VELOCITY_LIMITS = {
  MAX_CARDS_PER_MONTH: 5,
  MAX_ORDERS_PER_MONTH: 5,
  MAX_AMOUNT_PER_CARD: 50000,
} as const;

/**
 * Gift card view page URL pattern
 */
export const GIFT_CARD_VIEW_URL = (cardNumber: string) => `/gift-cards/view/${cardNumber}`;

/**
 * Redemption instructions
 */
export const REDEMPTION_INSTRUCTIONS = {
  title: 'How to Redeem Your Gift Card',
  steps: [
    'Visit divaa.com and browse our collection',
    'Add items to your cart',
    'At checkout, enter your gift card number and PIN',
    'Your gift card balance will be applied to your order',
    'Any remaining balance stays on your card for future use',
  ],
} as const;

/**
 * Terms and conditions URL
 */
export const GIFT_CARD_TERMS_URL = '/terms#gift-cards';

/**
 * Contact support info
 */
export const SUPPORT_INFO = {
  EMAIL: 'saj.query@gmail.com',
  PHONE: '+91 1234567890',
  HOURS: 'Mon-Sat, 9 AM - 6 PM IST',
} as const;
