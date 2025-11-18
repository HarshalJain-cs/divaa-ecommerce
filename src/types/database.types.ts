/**
 * @title Database Types
 * @description TypeScript types for database tables
 */

/**
 * @interface Profile
 * @description User profile information
 */
export interface Profile {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  country_code?: string
  phone?: string
  role: 'customer' | 'admin'
  created_at: string
  updated_at: string
}

/**
 * @interface Category
 * @description Product category
 */
export interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
  display_order: number
  metal_type?: string
  gender?: string
  created_at: string
}

/**
 * @interface Product
 * @description Product information
 */
export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category_id?: string
  image_url?: string
  additional_images?: string[]
  stock_quantity: number
  gender?: 'men' | 'women' | 'unisex'
  metal_type?: string
  stone_type?: string
  is_featured: boolean
  occasions?: string[]
  relations?: string[]
  style_type?: 'everyday' | 'traditional' | 'party' | 'office' | 'casual' | 'twinning'
  created_at: string
  updated_at: string
  // Joined data
  categories?: Category
}

/**
 * @interface CartItem
 * @description Shopping cart item
 */
export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  // Joined data
  products?: Product
}

/**
 * @interface ShippingAddress
 * @description Shipping address structure
 */
export interface ShippingAddress {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
}

/**
 * @interface Order
 * @description Customer order
 */
export interface Order {
  id: string
  user_id?: string
  total_amount: number
  gift_card_discount?: number
  balance_used?: number
  final_amount?: number
  gift_card_code?: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shipping_address: ShippingAddress
  payment_method?: string
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  notes?: string
  created_at: string
  updated_at: string
}

/**
 * @interface OrderItem
 * @description Item in an order
 */
export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  quantity: number
  price_at_time: number
  product_snapshot?: Partial<Product>
  created_at: string
  // Joined data
  products?: Product
}

/**
 * @interface ProductWithCategory
 * @description Product with category information
 */
export interface ProductWithCategory extends Product {
  category: Category
}

/**
 * @interface CartItemWithProduct
 * @description Cart item with full product details
 */
export interface CartItemWithProduct extends CartItem {
  product: Product
}

/**
 * @interface OrderWithItems
 * @description Order with all items
 */
export interface OrderWithItems extends Order {
  order_items: OrderItem[]
}

/**
 * @interface GiftCard
 * @description Gift card entity
 */
export interface GiftCard {
  id: string
  code: string
  amount: number
  balance: number
  recipient_email?: string
  recipient_name?: string
  sender_name?: string
  personal_message?: string
  design_theme: 'birthday' | 'wedding' | 'anniversary' | 'thankyou' | 'general'
  status: 'active' | 'partially_used' | 'fully_redeemed' | 'expired' | 'cancelled'
  purchased_by?: string
  purchased_at: string
  expires_at: string
  created_at: string
  updated_at: string
}

/**
 * @interface UserBalance
 * @description User account balance from redeemed gift cards
 */
export interface UserBalance {
  id: string
  user_id: string
  balance: number
  last_updated: string
  created_at: string
}

/**
 * @interface GiftCardTransaction
 * @description Gift card transaction record
 */
export interface GiftCardTransaction {
  id: string
  gift_card_id: string
  transaction_type: 'purchase' | 'redemption_to_balance' | 'checkout_usage' | 'refund' | 'expiry' | 'cancellation'
  amount: number
  balance_before?: number
  balance_after?: number
  user_id?: string
  order_id?: string
  notes?: string
  created_at: string
}

/**
 * @interface GiftCardRedemption
 * @description Tracks gift card usage in orders
 */
export interface GiftCardRedemption {
  id: string
  order_id: string
  gift_card_id?: string
  amount_used: number
  created_at: string
}

/**
 * @interface UserBalanceTransaction
 * @description User balance transaction record
 */
export interface UserBalanceTransaction {
  id: string
  user_balance_id: string
  transaction_type: 'redemption' | 'checkout_usage' | 'expiry' | 'adjustment'
  amount: number
  balance_before?: number
  balance_after?: number
  gift_card_id?: string
  order_id?: string
  expires_at?: string
  notes?: string
  created_at: string
}

/**
 * @interface GiftCardWithTransactions
 * @description Gift card with transaction history
 */
export interface GiftCardWithTransactions extends GiftCard {
  transactions: GiftCardTransaction[]
  redemptions: GiftCardRedemption[]
}

/**
 * @interface OrderWithGiftCardInfo
 * @description Order with gift card information
 */
export interface OrderWithGiftCardInfo extends Order {
  gift_card_details?: GiftCard
  balance_transactions?: UserBalanceTransaction[]
}
