<script setup lang="ts">
import { formatBalance } from '@/utils/format-balance'

import { useCartStore } from '@/stores/cart/cart.store'

import { popup } from '@/components/popup/popup'
import Button from '@/components/ui/button/Button.vue'

import type { CartItem } from '@/interfaces/cart.interface'
import type { ErrorResponse } from '@/interfaces/response.interface'

interface CartItemCardProps {
  cartItem: CartItem
}

defineProps<CartItemCardProps>()

const cartStore = useCartStore()

const handleUpdateCartItemQuantity = async (cartItemId: string, quantity: number) => {
  try {
    if (quantity <= 0) {
      return
    }

    await cartStore.updateProductInCard({ cartItemId, quantity })
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    popup({
      icon: 'error',
      title: errorData.data.message,
      showConfirmButton: true
    })
  }
}

const handleDeleteCartItem = async (cartItemId: string) => {
  try {
    const confirm = await popup({
      icon: 'question',
      title: 'Are you sure you want to delete this item?',
      showConfirmButton: true
    })

    if (!confirm) {
      return
    }

    await cartStore.removeProductFromCart({ cartItemId })

    popup({
      icon: 'success',
      title: 'Item has been deleted',
      showCancelButton: false,
      showConfirmButton: true
    })
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    popup({
      icon: 'error',
      title: errorData.data.message,
      showConfirmButton: true
    })
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 border-b pb-4">
    <div class="flex space-x-2">
      <div class="w-24 h-24 border rounded-md">
        <img :src="cartItem.product.imageUrl" />
      </div>
      <div class="py-2 text-sm line-clamp-1 text-gray-500">{{ cartItem.product.name }}</div>
    </div>

    <div class="flex items-center w-full mt-2">
      <div class="grid grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        <!-- Unit price -->
        <div id="unit price" class="text-left">
          <div class="text-xs text-gray-400">Unit Price</div>
          <div>฿{{ formatBalance(Number(cartItem.product.price)) }}</div>
        </div>

        <!-- Quantity -->
        <div id="quantity" class="flex justify-center items-center">
          <div class="flex items-center justify-between w-full lg:w-2/3">
            <Button
              variant="outline"
              class="font-normal text-gray-500"
              size="xs"
              :disable="cartItem.quantity <= 1"
              @click="handleUpdateCartItemQuantity(cartItem.id, cartItem.quantity - 1)"
              >-</Button
            >
            <div>{{ cartItem.quantity }}</div>
            <Button
              variant="outline"
              class="font-normal text-gray-500"
              size="xs"
              @click="handleUpdateCartItemQuantity(cartItem.id, cartItem.quantity + 1)"
              >+</Button
            >
          </div>
        </div>

        <!-- Total Price -->
        <div id="total price" class="hidden text-right lg:block">
          <div class="text-xs text-gray-400">Total Price</div>
          <div>฿{{ formatBalance(Number(cartItem.product.price) * cartItem.quantity) }}</div>
        </div>

        <!-- Action -->
        <div class="flex items-center justify-center">
          <Button
            variant="outline"
            class="font-normal text-xs"
            size="xs"
            @click="handleDeleteCartItem(cartItem.id)"
            >Delete</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
