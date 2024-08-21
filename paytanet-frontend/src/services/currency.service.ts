import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Currency } from '@/interfaces/currency.interface'
import type { Response } from '@/interfaces/response.interface'

const getAllCurrencies = async (): Promise<AxiosResponse<Response<Currency[]>>> => {
  const path = `/currency/all`

  return httpClient().get(path)
}

const currencyService = {
  getAllCurrencies
}

export default currencyService
