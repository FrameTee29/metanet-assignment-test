import { defineStore } from 'pinia'

import type { UseOrderAction, UseOrderState } from '@/stores/order/order.type'
import orderService from '@/services/order.service'

export const useOrderStore = defineStore<'Order', UseOrderState, {}, UseOrderAction>('Order', {
  state: () => ({
    orderHistory: []
  }),
  actions: {
    async getAllOrderHistory() {
      const response = await orderService.getOrderHistory()
      this.orderHistory = response.data.data
    },
    reset() {
      this.orderHistory = []
    }
  }
})
