import type { Order } from '@/interfaces/order.interface'

export interface UseOrderState {
  orderHistory: Order[]
}

export interface UseOrderAction {
  getAllOrderHistory: () => void
  reset: () => void
}
