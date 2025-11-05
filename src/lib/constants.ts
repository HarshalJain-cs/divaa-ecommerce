/**
 * @title Application Constants
 * @description Constant values used throughout the application
 */

/**
 * @constant CATEGORIES
 * @description Main product categories
 */
export const CATEGORIES = [
  { id: 'rings', name: 'Rings', slug: 'rings' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets' },
  { id: 'sets', name: 'Sets', slug: 'sets' },
] as const

/**
 * @constant OCCASIONS
 * @description Gift occasions
 */
export const OCCASIONS = [
  { id: 'birthday', name: 'Birthday' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'wedding', name: 'Wedding' },
  { id: 'engagement', name: 'Engagement' },
  { id: 'valentines', name: "Valentine's Day" },
  { id: 'mothers-day', name: "Mother's Day" },
  { id: 'christmas', name: 'Christmas' },
] as const

/**
 * @constant RELATIONS
 * @description Gift relations
 */
export const RELATIONS = [
  { id: 'wife', name: 'Wife' },
  { id: 'mother', name: 'Mother' },
  { id: 'sister', name: 'Sister' },
  { id: 'daughter', name: 'Daughter' },
  { id: 'girlfriend', name: 'Girlfriend' },
  { id: 'friend', name: 'Friend' },
] as const

/**
 * @constant METAL_TYPES
 * @description Available metal types
 */
export const METAL_TYPES = [
  { id: 'gold', name: 'Gold' },
  { id: 'silver', name: 'Silver' },
  { id: 'platinum', name: 'Platinum' },
  { id: 'rose-gold', name: 'Rose Gold' },
  { id: 'white-gold', name: 'White Gold' },
] as const

/**
 * @constant STONE_TYPES
 * @description Available stone types
 */
export const STONE_TYPES = [
  { id: 'diamond', name: 'Diamond' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'emerald', name: 'Emerald' },
  { id: 'sapphire', name: 'Sapphire' },
  { id: 'pearl', name: 'Pearl' },
  { id: 'topaz', name: 'Topaz' },
] as const

/**
 * @constant ORDER_STATUS
 * @description Order status options
 */
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

/**
 * @constant PAYMENT_STATUS
 * @description Payment status options
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const

/**
 * @constant USER_ROLES
 * @description User role types
 */
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
} as const
