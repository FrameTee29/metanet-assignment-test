import type { UserAuth } from '@/interfaces/user-auth.interface'
import type { BaseInterface } from '@/interfaces/base.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

export interface User extends BaseInterface {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | null
  phone: string | null
  isActive: boolean
  userWallets: UserWallet[]
  userAuth: UserAuth
}
