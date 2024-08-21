import type { Product } from '@/interfaces/product.interface'
import type { Response } from '@/interfaces/response.interface'

export interface UseProductState {
  products: Product[]
}

export interface UseProductAction {
  getAllProducts: () => Promise<Response<Product[]>>
  reset: () => void
}
