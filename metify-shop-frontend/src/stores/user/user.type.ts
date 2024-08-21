import type { UserWallet } from '@/interfaces/user-wallet.interface'

export interface UseUserState {
  wallets: UserWallet[]
}

export interface UseUserAction {
  getMyWallets: () => Promise<void>
  reset: () => void
}
