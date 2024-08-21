import type { BaseInterface } from '@/interfaces/base.interface'

export interface Product extends BaseInterface {
  name: string
  description: string
  price: string
  quantity: number
  imageUrl: string
}
