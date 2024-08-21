import type { Currency, ExchangeRate } from '@/interfaces/currency.interface'

export interface UseCurrencyState {
  currencies: Currency[]
  exchangeRates: ExchangeRate[]
  mapExchangeRates: {
    [key: string]: ExchangeRate
  }
}

export interface UseCurrencyAction {
  getAllCurrency: () => Promise<void>
  getExchangeRates: () => Promise<void>
  reset: () => void
}
