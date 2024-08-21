<script setup lang="ts">
import { watchEffect } from 'vue'

import { useProductStore } from '@/stores/product/product.store'

import ProductCard from '@/components/screen/product/ProductCard.vue'

const productStore = useProductStore()

const fetchData = async () => {
  try {
    await productStore.getAllProducts()
  } catch (error) {
    // ! Handle error
  }
}

watchEffect((onCleanup) => {
  fetchData()

  onCleanup(() => {
    productStore.reset()
  })
})
</script>

<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div v-for="product in productStore.products" :key="product.id">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
