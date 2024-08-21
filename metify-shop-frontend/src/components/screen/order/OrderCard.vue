<script setup lang="ts">
import { formatBalance } from "@/utils/format-balance";
import { formatDateTime } from "@/utils/format-date";

import Separator from "@/components/ui/separator/Separator.vue";

import type { Order } from "@/interfaces/order.interface";

interface OrderCardProps {
  order: Order;
}

defineProps<OrderCardProps>();
</script>

<template>
  <div class="bg-white p-4 w-full">
    <div class="flex justify-between items-center">
      <div class="space-x-4 flex items-center">
        <div class="text-xs bg-orange-500 px-2 py-1 rounded-md text-white">Suggest</div>
        <span>BigC</span>
      </div>
      <div class="text-xs flex flex-col items-end text-gray-500">
        <div>
          {{ formatDateTime(order.createdAt, "YYYY/MM/DD HH:mm ") }}
        </div>
      </div>
    </div>

    <Separator class="my-4" />
    <div class="space-y-4 grid grid-cols-1">
      <div
        v-for="orderItem in order.orderItems"
        :key="orderItem.id"
        class="border-b pb-4 flex justify-between items-start"
      >
        <div class="flex space-x-2">
          <div class="flex justify-center items-center w-24 h-24 border rounded-md">
            <img :src="orderItem.product.imageUrl" />
          </div>
          <div class="py-2">
            <div class="text-sm line-clamp-1 text-gray-500">
              {{ orderItem.product.name }}
            </div>
            <div>
              <span>x</span><span>{{ orderItem.quantity }}</span>
            </div>
          </div>
        </div>
        <div class="text-sm">
          {{ formatBalance(+orderItem.priceAtTime) }} {{ orderItem.currencyCode }}
        </div>
      </div>
    </div>

    <div id="summary" class="flex justify-end items-center space-x-2 mt-4">
      <div class="text-xs">Order Total :</div>
      <div class="text-primary font-medium">
        {{ formatBalance(+order.totalPrice) }} {{ order.currencyCode }}
      </div>
    </div>
  </div>
</template>
