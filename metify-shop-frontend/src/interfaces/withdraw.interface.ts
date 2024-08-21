import type { BaseInterface } from '@/interfaces/base.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

export interface Withdraw extends BaseInterface {
  amount: string
  status: string
  note: string
  userWallet: UserWallet
}

export interface WithdrawPayload {
  amount: number
  currencyCode: string
}

export interface WithdrawResponse {
  message: string
  amount: number
  currencyCode: string
}
