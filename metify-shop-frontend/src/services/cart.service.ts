import type { AxiosResponse } from 'axios'

import httpClient from '@/utils/httpClient'

import type {
  AddProductToCartPayload,
  AddProductToCartResponse,
  Cart,
  EditProductInCartPayload,
  EditProductInCartResponse,
  RemoveProductFromCartPayload
} from '@/interfaces/cart.interface'
import type { Response } from '@/interfaces/response.interface'

const getMyCartProduct = async (): Promise<AxiosResponse<Response<Cart>>> => {
  const path = `/cart/my/products`
  return httpClient().get(path)
}

const addProductToCart = async (
  payload: AddProductToCartPayload
): Promise<AxiosResponse<Response<AddProductToCartResponse>>> => {
  const path = `/cart/add/product`
  return httpClient().post(path, payload)
}

const updateProductQuantity = async (
  payload: EditProductInCartPayload
): Promise<AxiosResponse<Response<EditProductInCartResponse>>> => {
  const path = `/cart/edit/product`
  return httpClient().patch(path, payload)
}

const removeProductFromCart = async (payload: RemoveProductFromCartPayload) => {
  const path = `/cart/remove/product/${payload.cartItemId}`
  return httpClient().delete(path)
}

const cartService = {
  getMyCartProduct,
  addProductToCart,
  updateProductQuantity,
  removeProductFromCart
}

export default cartService
