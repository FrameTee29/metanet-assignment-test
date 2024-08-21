import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { User } from '@/interfaces/user.interface'
import type { Response } from '@/interfaces/response.interface'

const getMyUserInformation = (): Promise<AxiosResponse<Response<User>>> => {
  const path = '/user/my/information'

  return httpClient().get(path)
}

const userService = {
  getMyUserInformation
}

export default userService
