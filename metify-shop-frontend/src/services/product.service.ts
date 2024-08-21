import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type { Product } from '@/interfaces/product.interface'
import type { Response } from '@/interfaces/response.interface'

const getAllProducts = async (): Promise<AxiosResponse<Response<Product[]>>> => {
  const path = `/product/all`
  return httpClient().get(path)
}

const productService = {
  getAllProducts
}

export default productService
