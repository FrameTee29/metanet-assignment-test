import { defineStore } from 'pinia'

import type { UseProductState, UseProductAction } from '@/stores/product/product.type'

import productService from '@/services/product.service'

export const useProductStore = defineStore<'Product', UseProductState, {}, UseProductAction>(
  'Product',
  {
    state: (): UseProductState => ({
      products: []
    }),
    actions: {
      async getAllProducts() {
        const response = await productService.getAllProducts()

        this.products = response.data.data

        return response.data
      },
      reset() {
        this.products = []
      }
    }
  }
)
