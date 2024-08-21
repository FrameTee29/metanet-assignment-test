<script setup lang="ts">
import { formatBalance } from '@/utils/format-balance'

import { useCartStore } from '@/stores/cart/cart.store'

import CartItemCard from '@/components/screen/cart/CartItemCard.vue'
import DataEmpty from '@/components/empty/DataEmpty.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="bg-white p-4 space-y-4">
    <div v-if="cartStore.totalItems === 0"><DataEmpty /></div>

    <div v-for="cartItem in cartStore.cartItems" :key="cartItem.id">
      <CartItemCard :cartItem="cartItem" />
    </div>
    <div class="flex flex-col justify-end items-end">
      <div class="text-gray-400">Total Price</div>
      <div class="text-primary font-medium text-lg">฿{{ formatBalance(cartStore.totalPrice) }}</div>
    </div>
  </div>
</template>
