import type { Currency } from '@/interfaces/currency.interface'
import type { BaseInterface } from '@/interfaces/base.interface'

export interface UserWallet extends BaseInterface {
  balance: string
  currency: Currency
}
