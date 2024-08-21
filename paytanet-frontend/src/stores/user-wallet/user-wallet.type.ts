import type { Response } from '@/interfaces/response.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

export interface UseUserWalletState {
  userWallets: UserWallet[]
}

export interface UseUserWalletStore {
  getMyWallets: () => Promise<Response<UserWallet[]>>
}
