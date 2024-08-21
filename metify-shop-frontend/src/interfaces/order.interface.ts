import type { BaseInterface } from '@/interfaces/base.interface'
import type { Product } from '@/interfaces/product.interface'

export interface Order extends BaseInterface {
  userId: string
  totalPrice: string
  priceRate: string
  currencyCode: string
  orderItems: OrderItem[]
}

export interface OrderItem extends BaseInterface {
  quantity: number
  priceAtTime: string
  currencyCode: string
  product: Product
}
