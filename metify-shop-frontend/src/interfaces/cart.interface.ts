import type { BaseInterface } from '@/interfaces/base.interface'
import type { Product } from '@/interfaces/product.interface'

export interface Cart extends BaseInterface {
  userId: string
  cartItems: CartItem[]
}

export interface CartItem extends BaseInterface {
  quantity: number
  product: Product
}

export interface AddProductToCartPayload {
  productId: string
  quantity: number
}

export interface AddProductToCartResponse {
  message: string
}

export interface EditProductInCartPayload {
  cartItemId: string
  quantity: number
}

export interface EditProductInCartResponse extends BaseInterface {
  quantity: number
}

export interface RemoveProductFromCartPayload {
  cartItemId: string
}

export interface RemoveProductFromCartResponse {
  message: string
}
