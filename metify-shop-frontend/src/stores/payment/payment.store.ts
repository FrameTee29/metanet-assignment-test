import { defineStore } from 'pinia'

import { useCartStore } from '@/stores/cart/cart.store'
import { useCurrencyStore } from '@/stores/currency/currency.store'
import type { UsePaymentAction, UsePaymentState } from '@/stores/payment/payment.type'

const initialState: UsePaymentState = {
  paymentCurrency: {
    id: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: '',
    currencyName: '',
    currencyCode: '',
    currencySymbol: '',
    flagImage: '',
    isDefault: false
  },
  priceRate: 1
}

export const usePaymentStore = defineStore<
  'Payment',
  UsePaymentState,
  { totalPrice: () => number },
  UsePaymentAction
>('Payment', {
  state: (): UsePaymentState => ({
    ...initialState
  }),
  actions: {
    initialPaymentCurrency() {
      const currencyStore = useCurrencyStore()

      this.paymentCurrency =
        currencyStore.currencies.find((item) => item.isDefault) || initialState.paymentCurrency
    },
    setPaymentCurrency(currency: string) {
      const currencyStore = useCurrencyStore()

      this.paymentCurrency =
        currencyStore.currencies.find((item) => item.currencyCode === currency) ||
        initialState.paymentCurrency

      if (currency === 'THB') {
        this.priceRate = 1
        return
      }

      this.priceRate = +Number(currencyStore.mapExchangeRates[currency].selling).toFixed(2)
    },
    reset() {
      this.paymentCurrency = initialState.paymentCurrency
      this.priceRate = initialState.priceRate
    }
  },
  getters: {
    totalPrice() {
      const cartStore = useCartStore()

      return +Number(cartStore.totalPrice / this.priceRate).toFixed(2)
    }
  }
})
