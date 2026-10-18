export type ProductUnit = 'piece' | 'meter' | 'set'

export interface Product {
  id: string
  title: string
  articleNo: string
  description: string
  category: string
  fabric: string
  design: string
  colour: string
  occasion: string
  mrp: number
  offerPrice: number
  images: string[]
  sizes: string[]
  stock: number
  unit: ProductUnit
  isFeatured: boolean
  isBestseller: boolean
  isNew: boolean
  care: string
}

export interface CartItem {
  productId: string
  title: string
  articleNo: string
  image: string
  size: string
  colour: string
  unitPrice: number
  mrp: number
  quantity: number
  unit: ProductUnit
}

export interface Address {
  id: string
  fullName: string
  phone: string
  addressLine: string
  landmark?: string
  city: string
  state: string
  pincode: string
  isDefault?: boolean
}

export type OrderStatus = 'placed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled'

export interface OrderItem {
  productId: string
  title: string
  articleNo: string
  size: string
  colour: string
  quantity: number
  unitPrice: number
  total: number
}

export interface Order {
  id: string
  orderNumber: string
  items: OrderItem[]
  address: Address
  subtotal: number
  discount: number
  shipping: number
  total: number
  paymentMethod: string
  status: OrderStatus
  statusHistory: { status: OrderStatus; at: string }[]
  createdAt: string
  isDemo: true
}

export interface Category {
  id: string
  name: string
  slug: string
  emoji: string
}
