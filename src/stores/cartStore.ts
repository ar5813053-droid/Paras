import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, qty: number) => void
  clear: () => void
  totalItems: () => number
  subtotal: () => number
  savings: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const qty = item.quantity ?? 1
        set((s) => {
          const existing = s.items.find(
            (i) => i.productId === item.productId && i.size === item.size
          )
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.productId === item.productId && i.size === item.size
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            }
          }
          return { items: [...s.items, { ...item, quantity: qty }] }
        })
      },
      removeItem: (productId, size) =>
        set((s) => ({
          items: s.items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        })),
      updateQty: (productId, size, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size)
          return
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.productId === productId && i.size === size
              ? { ...i, quantity: qty }
              : i
          ),
        }))
      },
      clear: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
      savings: () =>
        get().items.reduce(
          (sum, i) => sum + (i.mrp - i.unitPrice) * i.quantity,
          0
        ),
    }),
    { name: 'paras-cart' }
  )
)
