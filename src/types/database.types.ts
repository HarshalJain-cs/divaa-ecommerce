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
