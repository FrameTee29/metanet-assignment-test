import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

const getMyWallets = async (): Promise<AxiosResponse<Response<UserWallet[]>>> => {
  const path = `/user/my/wallets`
  return httpClient().get(path)
}

const userService = {
  getMyWallets
}

export default userService
