import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'

import type { Deposit, DepositPayload, DepositResponse } from '@/interfaces/deposit.interface'

const deposit = (payload: DepositPayload): Promise<AxiosResponse<Response<DepositResponse>>> => {
  const path = `/transaction/deposit`

  return httpClient().post(path, payload)
}

const depositHistory = (): Promise<AxiosResponse<Response<Deposit[]>>> => {
  const path = `/transaction/deposit/history`

  return httpClient().get(path)
}

const depositService = {
  deposit,
  depositHistory
}

export default depositService
