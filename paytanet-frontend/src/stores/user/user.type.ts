import type { Response } from '@/interfaces/response.interface'

import type { User } from '@/interfaces/user.interface'

export interface UseUserState {
  user: User
}

export interface UseUserStore {
  getMyUserInformation: () => Promise<Response<User>>
}
