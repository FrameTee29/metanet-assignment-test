<script setup lang="ts">
import Container from '@/components/container/Container.vue'
import CartList from '@/components/screen/cart/CartList.vue'
import Payment from '@/components/screen/cart/Payment.vue'
</script>

<template>
  <Container class="mt-6">
    <div class="w-full bg-white p-4">
      <h1 class="text-primary font-medium">Shopping Cart</h1>
    </div>
    <div class="mt-4 space-y-4">
      <CartList />
      <Payment />
    </div>
  </Container>
</template>
