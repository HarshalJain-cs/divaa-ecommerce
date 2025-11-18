/**
 * @file Gift Card Type Definitions
 * @description Complete type definitions for the gift card system
 */

// =============================================
// DATABASE TYPES (matching Supabase schema)
// =============================================

export interface GiftCardDesign {
  id: string;
  name: GiftCardTheme;
  display_name: string;
  description: string | null;
  gradient_from: string;
  gradient_to: string;
  icon_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase_amount: number;
  max_uses: number | null;
  current_uses: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GiftCardOrder {
  id: string;
  order_number: string;
  user_id: string | null;
  order_type: 'single' | 'bulk';
  total_cards: number;
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  promo_code_id: string | null;
  promo_code_applied: string | null;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  payment_method: string | null;
  payment_transaction_id: string | null;
  payment_date: string | null;
  otp_verified: boolean;
  otp_verified_at: string | null;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  csv_file_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftCard {
  id: string;
  card_number: string;
  card_pin: string;
  qr_code_url: string | null;
  order_id: string;
  design_id: string | null;
  card_type: 'regular' | 'reloadable';
  original_amount: number;
  current_balance: number;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string | null;
  personal_message: string | null;
  custom_image_url: string | null;
  delivery_method: 'email' | 'sms' | 'both';
  email_sent: boolean;
  email_sent_at: string | null;
  sms_sent: boolean;
  sms_sent_at: string | null;
  status: 'active' | 'used' | 'expired' | 'cancelled' | 'refunded';
  expiry_date: string;
  redeemed_count: number;
  last_redeemed_at: string | null;
  saved_by_user_id: string | null;
  saved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface GiftCardTransaction {
  id: string;
  card_id: string;
  transaction_type: 'redeem' | 'refund' | 'reload';
  amount: number;
  balance_before: number;
  balance_after: number;
  order_reference: string | null;
  user_id: string | null;
  notes: string | null;
  created_at: string;
}

export interface BulkOrder {
  id: string;
  order_id: string;
  csv_file_url: string;
  total_rows: number;
  valid_rows: number;
  invalid_rows: number;
  processed_rows: number;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  error_log: string | null;
  created_at: string;
  completed_at: string | null;
}

// =============================================
// FORM & UI TYPES
// =============================================

export type GiftCardTheme = 'birthday' | 'diwali' | 'general';

export type GiftCardType = 'regular' | 'reloadable';

export interface GiftCardFormData {
  amount: number;
  custom_amount?: string;
  design_theme: GiftCardTheme;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone?: string;
  personal_message?: string;
  custom_image?: File | null;
  card_type: GiftCardType;
  delivery_method: 'email' | 'sms' | 'both';
  promo_code?: string;
}

export interface BulkOrderFormData {
  csv_file: File;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
}

export interface BulkOrderCSVRow {
  recipient_name: string;
  recipient_email: string;
  recipient_phone: string;
  amount: number;
  custom_message: string;
  design_theme: GiftCardTheme;
}

export interface BulkOrderCSVError {
  row: number;
  field: string;
  error: string;
  value: any;
}

export interface PromoCodeValidation {
  valid: boolean;
  code?: string;
  promo_code?: PromoCode;
  discount_amount?: number;
  error?: string;
}

export interface GiftCardCheckoutData {
  order: GiftCardOrder;
  cards: GiftCard[];
  promo_code?: PromoCode;
}

export interface GiftCardRedemptionData {
  card_number: string;
  card_pin: string;
  amount_to_redeem: number;
}

export interface GiftCardBalanceCheck {
  card_number: string;
  card_pin: string;
}

export interface GiftCardBalanceResponse {
  valid: boolean;
  card?: GiftCard;
  design?: GiftCardDesign;
  error?: string;
}

// =============================================
// OTP TYPES
// =============================================

export interface OTPVerification {
  order_id: string;
  email?: string;
  phone?: string;
  otp_code: string;
  otp_type: 'email' | 'sms';
}

export interface OTPSendRequest {
  order_id: string;
  email?: string;
  phone?: string;
  otp_type: 'email' | 'sms';
}

export interface OTPSendResponse {
  success: boolean;
  message: string;
  expires_at?: string;
}

export interface OTPVerifyResponse {
  success: boolean;
  verified: boolean;
  message: string;
}

// =============================================
// EMAIL & PDF TYPES
// =============================================

export interface GiftCardEmailData {
  card: GiftCard;
  design: GiftCardDesign;
  qr_code_data_url: string;
  pdf_url?: string;
}

export interface GiftCardPDFData {
  card_number: string;
  card_pin: string;
  amount: number;
  sender_name: string;
  recipient_name: string;
  personal_message?: string;
  design: GiftCardDesign;
  qr_code_data_url: string;
  expiry_date: string;
  custom_image_url?: string;
}

// =============================================
// CONTEXT & STATE TYPES
// =============================================

export interface GiftCardContextType {
  formData: Partial<GiftCardFormData>;
  setFormData: (data: Partial<GiftCardFormData>) => void;
  resetForm: () => void;
  selectedDesign: GiftCardTheme | null;
  setSelectedDesign: (design: GiftCardTheme) => void;
  selectedAmount: number | null;
  setSelectedAmount: (amount: number | null) => void;
  appliedPromoCode: PromoCode | null;
  applyPromoCode: (code: string) => Promise<PromoCodeValidation>;
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  cartItems: GiftCardFormData[];
  addToCart: (item: GiftCardFormData) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

// =============================================
// ADMIN TYPES
// =============================================

export interface AdminStats {
  total_cards: number;
  active_cards: number;
  used_cards: number;
  expired_cards: number;
  total_value_issued: number;
  total_balance_remaining: number;
  total_redeemed: number;
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
  bulk_orders: number;
  total_revenue: number;
  total_discounts: number;
  average_order_value: number;
}

export interface AdminSearchFilters {
  search_query?: string;
  status?: GiftCard['status'];
  card_type?: GiftCardType;
  date_from?: string;
  date_to?: string;
  min_amount?: number;
  max_amount?: number;
}

export interface AdminManualGenerateData {
  amount: number;
  design_theme: GiftCardTheme;
  card_type: GiftCardType;
  sender_name: string;
  recipient_name: string;
  recipient_email: string;
  recipient_phone?: string;
  personal_message?: string;
  expiry_months?: number;
}

// =============================================
// API RESPONSE TYPES
// =============================================

export interface GiftCardCreateResponse {
  success: boolean;
  order?: GiftCardOrder;
  cards?: GiftCard[];
  error?: string;
}

export interface GiftCardRedeemResponse {
  success: boolean;
  transaction?: GiftCardTransaction;
  new_balance?: number;
  error?: string;
}

export interface BulkOrderProcessResponse {
  success: boolean;
  bulk_order?: BulkOrder;
  processed_count?: number;
  failed_count?: number;
  errors?: BulkOrderCSVError[];
}

// =============================================
// UTILITY TYPES
// =============================================

export interface CardGenerationResult {
  card_number: string;
  card_pin: string;
  qr_code_url: string;
}

export interface QRCodeGenerationOptions {
  card_number: string;
  size?: number;
  error_correction?: 'L' | 'M' | 'Q' | 'H';
}

export interface PDFGenerationOptions {
  card_data: GiftCardPDFData;
  output_path?: string;
}

// =============================================
// WALLET TYPES
// =============================================

export interface UserGiftCardWallet {
  purchased_cards: GiftCard[];
  received_cards: GiftCard[];
  total_balance: number;
}

export interface GiftCardWalletFilters {
  show_expired?: boolean;
  show_used?: boolean;
  sort_by?: 'date' | 'amount' | 'expiry';
  sort_order?: 'asc' | 'desc';
}

// =============================================
// THEME CONFIGURATION TYPES
// =============================================

export interface GiftCardThemeConfig {
  name: string;
  image: string;
  gradient: string;
  description: string;
}
