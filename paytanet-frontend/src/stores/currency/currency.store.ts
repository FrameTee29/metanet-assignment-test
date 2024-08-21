import { defineStore } from 'pinia'

import type { UseCurrencyState, UseCurrencyStore } from '@/stores/currency/currency.type'

import currencyService from '@/services/currency.service'

export const useCurrencyStore = defineStore<'Currency', UseCurrencyState, {}, UseCurrencyStore>(
  'Currency',
  {
    state: (): UseCurrencyState => ({
      currencies: []
    }),
    actions: {
      async getCurrencies() {
        const response = await currencyService.getAllCurrencies()

        this.currencies = response.data.data

        return response.data
      }
    }
  }
)
