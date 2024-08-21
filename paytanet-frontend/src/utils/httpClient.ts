import axios, { AxiosError, type AxiosRequestHeaders, type AxiosResponse } from 'axios'

import { LocalStorageKey } from '@/constants/localStorage.constant'

const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const httpClient = (baseURL: string = url) => {
  const http = axios.create({ baseURL })

  http.interceptors.request.use((config) => {
    const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)

    if (token) {
      ;(config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`
    }

    return config
  })

  http.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error: AxiosError) => {
      // ! If you want to handle the error, you can do it here
      // ! if (error.response?.status === 401)  .... something like that

      throw error
    }
  )

  return http
}

export default httpClient
