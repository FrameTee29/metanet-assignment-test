import type { Currency } from '@/interfaces/currency.interface'
import type { Response } from '@/interfaces/response.interface'

export interface UseCurrencyState {
  currencies: Currency[]
}

export interface UseCurrencyStore {
  getCurrencies: () => Promise<Response<Currency[]>>
}
