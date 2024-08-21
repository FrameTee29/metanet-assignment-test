import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { UserWallet } from '@/interfaces/user-wallet.interface'

const getMyWallets = (): Promise<AxiosResponse<Response<UserWallet[]>>> => {
  const path = `/user-wallet/my/wallet`

  return httpClient().get(path)
}

const userWalletService = {
  getMyWallets
}

export default userWalletService
