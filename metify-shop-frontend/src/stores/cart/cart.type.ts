import type { Cart, CartItem } from '@/interfaces/cart.interface'
import type { Response } from '@/interfaces/response.interface'

export interface UseCartState {
  cart: Cart
  cartItems: CartItem[]
}

export interface UseCartAction {
  getMyCartProduct: () => Promise<Response<Cart>>
  addProductToCart: (payload: { productId: string; quantity: number }) => Promise<void>
  updateProductInCard: (payload: { cartItemId: string; quantity: number }) => Promise<void>
  removeProductFromCart: (payload: { cartItemId: string }) => Promise<void>
  reset: () => void
}

export interface UseCartGetters {
  totalItems: () => number
}
