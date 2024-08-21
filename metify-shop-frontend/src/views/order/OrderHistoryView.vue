<script setup lang="ts">
import { watchEffect } from 'vue'

import Container from '@/components/container/Container.vue'
import OrderList from '@/components/screen/order/OrderList.vue'
import { useOrderStore } from '@/stores/order/order.store'

const orderStore = useOrderStore()

const fetchData = async () => {
  try {
    await orderStore.getAllOrderHistory()
  } catch (error) {
    // ! Error handling
  }
}

watchEffect((onCleanUp) => {
  fetchData()

  onCleanUp(() => {
    orderStore.reset()
  })
})
</script>

<template>
  <Container class="mt-6">
    <div class="w-full bg-white p-4">
      <h1 class="text-primary font-medium">My Purchase</h1>
    </div>
    <div class="mt-4 space-y-4">
      <OrderList /></div
  ></Container>
</template>
