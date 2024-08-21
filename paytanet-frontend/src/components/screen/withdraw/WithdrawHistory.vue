<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { formatDateTime } from '@/utils/format-date'
import { formatBalance } from '@/utils/format-balance'

import { useWithdrawStore } from '@/stores/withdraw/withdraw.store'

import DataEmpty from '@/components/empty/DataEmpty.vue'

const withdrawStore = useWithdrawStore()

const isLoading = ref(false)

const fetchData = async () => {
  try {
    isLoading.value = true
    await withdrawStore.getWithdrawHistories()
    isLoading.value = false
  } catch (error) {
    // ! implement error handling
  }
}

watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div v-if="isLoading" class="text-center">Loading...</div>

  <div v-else-if="withdrawStore.withdrawHistories.length === 0">
    <DataEmpty />
  </div>

  <div v-else class="space-y-2">
    <div v-for="withdraw in withdrawStore.withdrawHistories" :key="withdraw.id">
      <div class="grid grid-cols-3 border p-2 rounded-md">
        <div id="title">
          <p class="font-semibold text-sm">{{ withdraw.note ? withdraw.note : 'Withdraw' }}</p>
          <p class="text-gray-400 text-xs">{{ formatDateTime(withdraw.createdAt) }}</p>
        </div>
        <div id="title" class="flex justify-center items-center space-x-2">
          <img
            :src="withdraw.userWallet.currency.flagImage"
            alt="icon"
            class="w-6 h-6 rounded-full"
          />
          <p class="text-sm font-semibold">{{ withdraw.userWallet.currency.currencyCode }}</p>
        </div>
        <div id="title" class="flex justify-center flex-col items-end">
          <div class="space-x-1 text-red-600">
            <span class="text-sm font-bold">-{{ formatBalance(Number(withdraw.amount)) }}</span>
            <span class="text-sm">{{ withdraw.userWallet.currency.currencySymbol }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
