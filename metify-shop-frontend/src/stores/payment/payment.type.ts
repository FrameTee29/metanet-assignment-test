import type { Currency } from '@/interfaces/currency.interface'

export interface UsePaymentState {
  paymentCurrency: Currency
  priceRate: number
}

export interface UsePaymentAction {
  initialPaymentCurrency: () => void
  setPaymentCurrency: (currency: string) => void
  reset: () => void
}
