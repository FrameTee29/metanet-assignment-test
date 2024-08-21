import { defineStore } from 'pinia'
import type { UseCurrencyAction, UseCurrencyState } from './currency.type'
import currencyService from '@/services/currency.service'
import type { ExchangeRate } from '@/interfaces/currency.interface'

export const useCurrencyStore = defineStore<'Currency', UseCurrencyState, {}, UseCurrencyAction>(
  'Currency',
  {
    state: (): UseCurrencyState => ({
      currencies: [],
      exchangeRates: [],
      mapExchangeRates: {}
    }),
    actions: {
      async getAllCurrency() {
        const response = await currencyService.getAllCurrency()

        this.currencies = response.data.data
      },
      async getExchangeRates() {
        const response = await currencyService.getExchangeRate()

        this.exchangeRates = response.data.data

        this.mapExchangeRates = response.data.data.reduce(
          (acc: { [k: string]: ExchangeRate }, item: ExchangeRate) => {
            acc[item.currency_id] = item

            return acc
          },
          {}
        )
      },
      reset() {
        this.exchangeRates = []
        this.mapExchangeRates = {}
      }
    }
  }
)
