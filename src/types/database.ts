export type UserRole = 'customer' | 'admin'

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  title: string
  article_no: string
  description: string | null
  care_instructions: string | null
  category_id: string | null
  fabric: string | null
  design: string | null
  pattern: string | null
  colour: string | null
  occasion: string | null
  mrp: number
  offer_price: number
  unit: string // piece, meter, set
  is_published: boolean
  is_featured: boolean
  is_bestseller: boolean
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  url: string
  sort_order: number
  alt_text: string | null
}

export interface ProductVariant {
  id: string
  product_id: string
  size: string | null
  colour: string | null
  sku: string | null
  stock: number
  low_stock_threshold: number
  price_adjustment: number
}

export interface Address {
  id: string
  user_id: string
  full_name: string
  phone: string
  address_line1: string
  address_line2: string | null
  city: string
  state: string
  pincode: string
  is_default: boolean
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  status: OrderStatus
  subtotal: number
  discount: number
  shipping_charge: number
  total: number
  shipping_address: Record<string, unknown>
  notes: string | null
  is_demo: boolean
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string | null
  title: string
  article_no: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface StoreSettings {
  id: string
  store_name: string
  tagline: string | null
  support_email: string | null
  support_phone: string | null
  shipping_charge: number
  low_stock_threshold: number
  updated_at: string
}
