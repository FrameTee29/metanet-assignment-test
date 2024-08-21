import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Response } from '@/interfaces/response.interface'
import type { LoginPayload, LoginResponse } from '@/interfaces/auth.interface'

const login = async (payload: LoginPayload): Promise<AxiosResponse<Response<LoginResponse>>> => {
  const path = `/auth/login`
  return httpClient().post(path, payload)
}

const authService = {
  login
}

export default authService
