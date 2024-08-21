import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { Currency, ExchangeRate } from '@/interfaces/currency.interface'

const getExchangeRate = async (): Promise<AxiosResponse<Response<ExchangeRate[]>>> => {
  const path = `/currency/exchange-rate`
  return httpClient().get(path)
}

const getAllCurrency = async (): Promise<AxiosResponse<Response<Currency[]>>> => {
  const path = `/currency/all`
  return httpClient().get(path)
}

const currencyService = {
  getExchangeRate,
  getAllCurrency
}

export default currencyService
