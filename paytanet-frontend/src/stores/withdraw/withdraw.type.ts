import type { Response } from '@/interfaces/response.interface'
import type { Withdraw } from '@/interfaces/withdraw.interface'

export interface UseWithdrawState {
  withdrawHistories: Withdraw[]
}

export interface UseWithdrawStore {
  getWithdrawHistories: () => Promise<Response<Withdraw[]>>
}
