import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { PayPayload, PayResponse } from '@/interfaces/payment.interface'

const pay = (payload: PayPayload): Promise<AxiosResponse<Response<PayResponse>>> => {
  const path = `payment/pay`
  return httpClient().post(path, payload)
}

const paymentService = {
  pay
}

export default paymentService
