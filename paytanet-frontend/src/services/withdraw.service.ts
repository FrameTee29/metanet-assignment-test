import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { Withdraw, WithdrawPayload, WithdrawResponse } from '@/interfaces/withdraw.interface'

const withdraw = (payload: WithdrawPayload): Promise<AxiosResponse<Response<WithdrawResponse>>> => {
  const path = `/transaction/withdraw`

  return httpClient().post(path, payload)
}

const withdrawHistory = (): Promise<AxiosResponse<Response<Withdraw[]>>> => {
  const path = `/transaction/withdraw/history`

  return httpClient().get(path)
}

const withdrawService = {
  withdraw,
  withdrawHistory
}

export default withdrawService
