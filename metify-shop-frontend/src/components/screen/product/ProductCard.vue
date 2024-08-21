<script setup lang="ts">
import { ref } from 'vue'
import { Heart } from 'lucide-vue-next'

import { useCartStore } from '@/stores/cart/cart.store'

import Button from '@/components/ui/button/Button.vue'

import type { Product } from '@/interfaces/product.interface'

interface ProductCardProps {
  product: Product
}

defineProps<ProductCardProps>()

const cartStore = useCartStore()

const isAdding = ref(false)

const handleAddToCart = async (productId: string) => {
  try {
    isAdding.value = true
    await cartStore.addProductToCart({ productId, quantity: 1 })
    isAdding.value = false
  } catch (error) {
    // ! Handle error
    isAdding.value = false
  }
}
</script>

<template>
  <div class="w-72 shadow-md bg-white line-clamp-2">
    <div class="w-72 h-72">
      <img :src="product.imageUrl" :alt="product.name" class="object-cover" />
    </div>
    <div class="p-6 border-t">
      <h2 class="text-sm">{{ product.name }}</h2>

      <div class="flex justify-between items-center mt-4">
        <div>
          <div class="text-xs text-gray-400">Price</div>
          <div class="space-x-1 font-medium text-sm">
            <span>฿</span><span>{{ product.price }}</span>
          </div>
        </div>
        <div class="flex space-x-1">
          <Button
            variant="outline"
            size="sm"
            class="text-xs"
            :disabled="isAdding"
            @click="handleAddToCart(product.id)"
          >
            <span v-if="isAdding" class="animate-pulse">Adding</span>
            <span v-else>Add to cart</span>
          </Button>
          <Button variant="outline" size="sm" class="border-red-100 bg-red-50 text-red-500"
            ><Heart :size="20"
          /></Button>
        </div>
      </div>
    </div>
  </div>
</template>
