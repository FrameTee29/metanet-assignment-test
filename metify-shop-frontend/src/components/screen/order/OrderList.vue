<script setup lang="ts">
import { useOrderStore } from '@/stores/order/order.store'
import OrderCard from '@/components/screen/order/OrderCard.vue'

const orderStore = useOrderStore()
</script>

<template>
  <div class="space-y-4">
    <div v-if="orderStore.orderHistory.length === 0"><DataEmpty /></div>

    <div v-for="order in orderStore.orderHistory" :key="order.id">
      <OrderCard :order="order" />
    </div>
  </div>
</template>
