import type { BaseInterface } from '@/interfaces/base.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

export interface Deposit extends BaseInterface {
  amount: string
  status: string
  note: string
  userWallet: UserWallet
}

export interface DepositPayload {
  amount: number
  currencyCode: string
}

export interface DepositResponse {
  message: string
  balance: number
  currencyCode: string
}
