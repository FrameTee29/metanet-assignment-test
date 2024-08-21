import type { Deposit } from '@/interfaces/deposit.interface'
import type { Response } from '@/interfaces/response.interface'

export interface UseDepositState {
  depositHistories: Deposit[]
}

export interface UseDepositStore {
  getDepositHistories: () => Promise<Response<Deposit[]>>
}
