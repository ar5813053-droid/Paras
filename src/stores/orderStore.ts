import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderStatus } from '../types'

interface OrderState {
  orders: Order[]
  addOrder: (order: Order) => void
  updateStatus: (id: string, status: OrderStatus) => void
  getById: (id: string) => Order | undefined
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === id
              ? {
                  ...o,
                  status,
                  statusHistory: [
                    ...o.statusHistory,
                    { status, at: new Date().toISOString() },
                  ],
                }
              : o
          ),
        })),
      getById: (id) => get().orders.find((o) => o.id === id),
    }),
    { name: 'paras-orders' }
  )
)
