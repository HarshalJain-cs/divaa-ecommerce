/**
 * @file Admin Type Definitions
 * @description Type definitions for admin panel functionality
 */

import type { GiftCard, GiftCardOrder, PromoCode, AdminStats } from './giftcard.types';

// =============================================
// ADMIN AUTH TYPES
// =============================================

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  email: string | null;
  role: 'admin' | 'super_admin';
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminLoginCredentials {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  admin?: {
    id: string;
    username: string;
    role: 'admin' | 'super_admin';
  };
  token?: string;
  error?: string;
}

export interface AdminAuthState {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  loading: boolean;
}

// =============================================
// ADMIN DASHBOARD TYPES
// =============================================

export interface AdminDashboardData {
  stats: AdminStats;
  recent_orders: GiftCardOrder[];
  recent_cards: GiftCard[];
  pending_orders: GiftCardOrder[];
}

// =============================================
// ADMIN ORDERS TYPES
// =============================================

export interface AdminOrderFilters {
  status?: GiftCardOrder['status'];
  order_type?: 'single' | 'bulk';
  date_from?: string;
  date_to?: string;
  search_query?: string;
  payment_status?: GiftCardOrder['payment_status'];
}

export interface AdminOrderDetails extends GiftCardOrder {
  cards: GiftCard[];
  promo_code?: PromoCode;
}

// =============================================
// ADMIN CARDS TYPES
// =============================================

export interface AdminCardFilters {
  status?: GiftCard['status'];
  card_type?: 'regular' | 'reloadable';
  date_from?: string;
  date_to?: string;
  search_query?: string; // card number, recipient email, etc.
  min_balance?: number;
  max_balance?: number;
  expiring_soon?: boolean; // within 30 days
}

export interface AdminCardDetails extends GiftCard {
  order: GiftCardOrder;
  transactions: Array<{
    id: string;
    transaction_type: 'redeem' | 'refund' | 'reload';
    amount: number;
    created_at: string;
  }>;
}

// =============================================
// ADMIN ACTIONS TYPES
// =============================================

export interface AdminCardAction {
  action: 'cancel' | 'refund' | 'extend_expiry' | 'mark_as_sent';
  card_id: string;
  reason?: string;
  notes?: string;
}

export interface AdminOrderAction {
  action: 'cancel' | 'refund' | 'complete' | 'resend';
  order_id: string;
  reason?: string;
  notes?: string;
}

export interface AdminExtendExpiryData {
  card_id: string;
  additional_months: number;
  reason: string;
}

export interface AdminRefundData {
  card_id: string;
  refund_amount?: number; // If partial refund
  reason: string;
}

// =============================================
// ADMIN PROMO CODE TYPES
// =============================================

export interface AdminPromoCodeFormData {
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  min_purchase_amount: number;
  max_uses: number | null;
  expires_at: string | null;
  is_active: boolean;
}

export interface AdminPromoCodeFilters {
  is_active?: boolean;
  discount_type?: 'percentage' | 'fixed';
  search_query?: string;
  expiring_soon?: boolean;
}

// =============================================
// ADMIN EXPORT TYPES
// =============================================

export interface AdminExportOptions {
  export_type: 'orders' | 'cards' | 'transactions';
  format: 'csv' | 'pdf' | 'excel';
  date_from?: string;
  date_to?: string;
  filters?: Record<string, any>;
  include_fields?: string[];
}

export interface AdminExportResponse {
  success: boolean;
  download_url?: string;
  filename?: string;
  error?: string;
}

// =============================================
// ADMIN ANALYTICS TYPES
// =============================================

export interface AdminAnalyticsPeriod {
  period: 'today' | 'week' | 'month' | 'year' | 'custom';
  start_date?: string;
  end_date?: string;
}

export interface AdminRevenueAnalytics {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  total_discounts: number;
  net_revenue: number;
  revenue_by_date: Array<{
    date: string;
    revenue: number;
    orders: number;
  }>;
}

export interface AdminCardAnalytics {
  total_issued: number;
  total_value: number;
  redemption_rate: number;
  average_redemption_time: number; // in days
  expiry_rate: number;
  cards_by_design: Array<{
    design: string;
    count: number;
    value: number;
  }>;
}

// =============================================
// ADMIN TABLE TYPES
// =============================================

export interface AdminTableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface AdminTablePagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface AdminTableSort {
  column: string;
  direction: 'asc' | 'desc';
}

// =============================================
// ADMIN NOTIFICATIONS TYPES
// =============================================

export interface AdminNotification {
  id: string;
  type: 'order' | 'card' | 'system' | 'error';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  title: string;
  message: string;
  data?: Record<string, any>;
  read: boolean;
  created_at: string;
}

// =============================================
// ADMIN SETTINGS TYPES
// =============================================

export interface AdminSystemSettings {
  gift_card_min_amount: number;
  gift_card_max_amount: number;
  gift_card_expiry_months: number;
  max_cart_items: number;
  allow_bulk_orders: boolean;
  require_otp: boolean;
  auto_send_cards: boolean;
  support_email: string;
  support_phone: string;
}
