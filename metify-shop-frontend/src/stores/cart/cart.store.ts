import { defineStore } from 'pinia'

import type { UseCartState, UseCartAction, UseCartGetters } from '@/stores/cart/cart.type'

import cartService from '@/services/cart.service'

const initialState: UseCartState = {
  cart: {
    id: '',
    userId: '',
    cartItems: [],
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  },
  cartItems: []
}

export const useCartStore = defineStore<
  'Cart',
  UseCartState,
  { totalItems: () => number; totalPrice: () => number },
  UseCartAction
>('Cart', {
  state: (): UseCartState => ({
    ...initialState
  }),
  actions: {
    async getMyCartProduct() {
      const response = await cartService.getMyCartProduct()

      this.cart = response.data.data
      this.cartItems = response.data.data.cartItems

      return response.data
    },
    async addProductToCart(payload) {
      await cartService.addProductToCart(payload)

      await this.getMyCartProduct()
    },
    async updateProductInCard(payload) {
      await cartService.updateProductQuantity(payload)

      await this.getMyCartProduct()
    },
    async removeProductFromCart(payload) {
      await cartService.removeProductFromCart(payload)

      await this.getMyCartProduct()
    },
    reset() {
      this.cart = initialState.cart
      this.cartItems = initialState.cartItems
    }
  },
  getters: {
    totalItems() {
      return this.cartItems.length
    },
    totalPrice() {
      return this.cartItems.reduce((acc, item) => {
        return acc + Number(item.product.price) * item.quantity
      }, 0)
    }
  }
})
