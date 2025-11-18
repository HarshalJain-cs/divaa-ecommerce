/**
 * Gift Card System TypeScript Types
 * Comprehensive type definitions for gift cards, user balance, and transactions
 */

// ============================================
// ENUMS & LITERAL TYPES
// ============================================

export type GiftCardTheme = 'birthday' | 'wedding' | 'anniversary' | 'thankyou' | 'general';

export type GiftCardStatus = 'active' | 'partially_used' | 'fully_redeemed' | 'expired' | 'cancelled';

export type GiftCardTransactionType =
  | 'purchase'
  | 'redemption_to_balance'
  | 'checkout_usage'
  | 'refund'
  | 'expiry'
  | 'cancellation';

export type UserBalanceTransactionType =
  | 'redemption'
  | 'checkout_usage'
  | 'expiry'
  | 'adjustment';

export type RedemptionType = 'balance' | 'checkout';

// ============================================
// DATABASE ENTITY TYPES
// ============================================

/**
 * Gift Card entity from database
 */
export interface GiftCard {
  id: string;
  code: string; // Format: DIVA-A1B2-C3D4-E5F6
  amount: number;
  balance: number;
  recipient_email?: string | null;
  recipient_name?: string | null;
  sender_name?: string | null;
  personal_message?: string | null;
  design_theme: GiftCardTheme;
  status: GiftCardStatus;
  purchased_by?: string | null;
  purchased_at: string; // ISO timestamp
  expires_at: string; // ISO timestamp
  created_at: string;
  updated_at: string;
}

/**
 * User Balance entity from database
 */
export interface UserBalance {
  id: string;
  user_id: string;
  balance: number;
  last_updated: string;
  created_at: string;
}

/**
 * Gift Card Transaction entity from database
 */
export interface GiftCardTransaction {
  id: string;
  gift_card_id: string;
  transaction_type: GiftCardTransactionType;
  amount: number;
  balance_before?: number | null;
  balance_after?: number | null;
  user_id?: string | null;
  order_id?: string | null;
  notes?: string | null;
  created_at: string;
}

/**
 * Gift Card Redemption entity from database
 */
export interface GiftCardRedemption {
  id: string;
  order_id: string;
  gift_card_id?: string | null;
  amount_used: number;
  created_at: string;
}

/**
 * User Balance Transaction entity from database
 */
export interface UserBalanceTransaction {
  id: string;
  user_balance_id: string;
  transaction_type: UserBalanceTransactionType;
  amount: number;
  balance_before?: number | null;
  balance_after?: number | null;
  gift_card_id?: string | null;
  order_id?: string | null;
  expires_at?: string | null; // When this specific balance expires
  notes?: string | null;
  created_at: string;
}

// ============================================
// FORM & INPUT TYPES
// ============================================

/**
 * Form data for purchasing a gift card
 */
export interface GiftCardFormData {
  amount: number;
  recipient_email: string;
  recipient_name: string;
  sender_name: string;
  personal_message: string;
  design_theme: GiftCardTheme;
}

/**
 * Validation for gift card form
 */
export interface GiftCardFormErrors {
  amount?: string;
  recipient_email?: string;
  recipient_name?: string;
  sender_name?: string;
  personal_message?: string;
  design_theme?: string;
}

/**
 * Input for redeeming a gift card
 */
export interface GiftCardRedemptionInput {
  code: string;
  redemption_type: RedemptionType;
}

/**
 * Input for applying gift card at checkout
 */
export interface CheckoutGiftCardInput {
  code: string;
  order_total: number;
}

/**
 * Input for using account balance at checkout
 */
export interface CheckoutBalanceInput {
  use_balance: boolean;
  amount?: number; // Optional: specify amount, or use maximum available
  order_total: number;
}

// ============================================
// RESPONSE & RESULT TYPES
// ============================================

/**
 * Result from validating a gift card code
 */
export interface GiftCardValidationResult {
  isValid: boolean;
  giftCard?: GiftCard;
  error?: string;
  availableBalance?: number;
}

/**
 * Result from redeeming a gift card to balance
 */
export interface RedeemToBalanceResult {
  success: boolean;
  message: string;
  newBalance?: number;
  amountAdded?: number;
  expiresAt?: string;
}

/**
 * Result from applying gift card at checkout
 */
export interface ApplyGiftCardResult {
  success: boolean;
  discountAmount: number;
  remainingBalance: number;
  message: string;
  error?: string;
}

/**
 * Result from applying account balance at checkout
 */
export interface ApplyBalanceResult {
  success: boolean;
  balanceUsed: number;
  remainingBalance: number;
  message: string;
  error?: string;
}

/**
 * Complete checkout calculation result
 */
export interface CheckoutCalculation {
  subtotal: number;
  giftCardDiscount: number;
  balanceUsed: number;
  finalAmount: number;
  giftCardCode?: string;
}

// ============================================
// UI & DISPLAY TYPES
// ============================================

/**
 * Gift card theme configuration for UI
 */
export interface GiftCardThemeConfig {
  name: string;
  image: string;
  gradient: string;
  description?: string;
}

/**
 * Gift card display data (with additional computed properties)
 */
export interface GiftCardDisplay extends GiftCard {
  isExpired: boolean;
  isPartiallyUsed: boolean;
  usagePercentage: number;
  daysUntilExpiry: number;
  formattedCode: string; // With hyphens for display
}

/**
 * User balance display data (with additional computed properties)
 */
export interface UserBalanceDisplay extends UserBalance {
  hasBalance: boolean;
  formattedBalance: string; // Formatted currency
  expiringBalances: ExpiringBalance[];
}

/**
 * Balance that will expire soon
 */
export interface ExpiringBalance {
  amount: number;
  expires_at: string;
  daysUntilExpiry: number;
}

// ============================================
// ADMIN & MANAGEMENT TYPES
// ============================================

/**
 * Admin input for manually creating a gift card
 */
export interface AdminCreateGiftCardInput {
  amount: number;
  design_theme: GiftCardTheme;
  recipient_email?: string;
  recipient_name?: string;
  custom_code?: string; // Allow custom codes for promotions
  expiry_months?: number; // Override default 6 months
  notes?: string;
}

/**
 * Filters for admin gift card listing
 */
export interface AdminGiftCardFilters {
  status?: GiftCardStatus;
  theme?: GiftCardTheme;
  min_amount?: number;
  max_amount?: number;
  purchased_by?: string;
  recipient_email?: string;
  date_from?: string;
  date_to?: string;
  search_code?: string;
}

/**
 * Gift card analytics for admin dashboard
 */
export interface GiftCardAnalytics {
  total_sold: number;
  total_value_sold: number;
  total_redeemed: number;
  total_value_redeemed: number;
  active_value: number;
  expired_value: number;
  redemption_rate: number; // Percentage
  average_value: number;
  popular_themes: {
    theme: GiftCardTheme;
    count: number;
  }[];
}

/**
 * Detailed gift card with relations
 */
export interface GiftCardWithDetails extends GiftCard {
  transactions: GiftCardTransaction[];
  redemptions: GiftCardRedemption[];
  purchaser?: {
    id: string;
    email: string;
    full_name?: string;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Sort parameters
 */
export interface SortParams {
  field: string;
  order: 'asc' | 'desc';
}

// ============================================
// CART & ORDER INTEGRATION TYPES
// ============================================

/**
 * Extended order type with gift card information
 */
export interface OrderWithGiftCard {
  id: string;
  user_id: string;
  total_amount: number;
  gift_card_discount: number;
  balance_used: number;
  final_amount: number;
  gift_card_code?: string | null;
  status: string;
  created_at: string;
}

/**
 * Gift card product for cart (when purchasing gift card through cart)
 */
export interface GiftCardProduct {
  id: string;
  type: 'gift_card';
  amount: number;
  design_theme: GiftCardTheme;
  recipient_email: string;
  recipient_name: string;
  sender_name: string;
  personal_message: string;
}

// ============================================
// HOOKS & STATE TYPES
// ============================================

/**
 * State for gift card form component
 */
export interface GiftCardFormState {
  formData: GiftCardFormData;
  errors: GiftCardFormErrors;
  selectedAmount?: number;
  selectedTheme: GiftCardTheme;
  isSubmitting: boolean;
}

/**
 * State for checkout with gift cards
 */
export interface CheckoutGiftCardState {
  giftCardCode: string;
  isApplyingGiftCard: boolean;
  appliedGiftCard?: ApplyGiftCardResult;
  useBalance: boolean;
  balanceToUse?: number;
  appliedBalance?: ApplyBalanceResult;
}

// ============================================
// ERROR TYPES
// ============================================

/**
 * Gift card specific errors
 */
export class GiftCardError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'GiftCardError';
    this.code = code;
  }
}

export enum GiftCardErrorCode {
  INVALID_CODE = 'INVALID_CODE',
  EXPIRED = 'EXPIRED',
  FULLY_REDEEMED = 'FULLY_REDEEMED',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  ALREADY_USED = 'ALREADY_USED',
  MINIMUM_AMOUNT = 'MINIMUM_AMOUNT',
  INVALID_THEME = 'INVALID_THEME',
  EMAIL_SEND_FAILED = 'EMAIL_SEND_FAILED',
  DATABASE_ERROR = 'DATABASE_ERROR',
}
