<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart } from 'lucide-vue-next'

import { useCartStore } from '@/stores/cart/cart.store'

const router = useRouter()

const cartStore = useCartStore()

const fetchData = async () => {
  try {
    await cartStore.getMyCartProduct()
  } catch (error) {
    // ! Handle error
  }
}

watchEffect((onCleanup) => {
  fetchData()
  onCleanup(() => {
    cartStore.reset()
  })
})

const goToCartView = () => {
  router.push({ name: 'cart' })
}
</script>

<template>
  <div class="relative w-8 h-8 flex justify-center items-center">
    <div
      v-if="cartStore.totalItems > 0"
      class="absolute -top-2 -right-1 bg-primary text-white p-[2px] w-5 rounded-full text-[10px] flex justify-center items-center"
    >
      <div>{{ cartStore.totalItems }}</div>
    </div>
    <ShoppingCart class="cursor-pointer hover:text-primary" :size="24" @click="goToCartView" />
  </div>
</template>
