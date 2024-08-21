<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import { useUserWalletStore } from '@/stores/user-wallet/user-wallet.store'

import Wallet from '@/components/screen/profile/Wallet.vue'

const userWalletStore = useUserWalletStore()

const isLoading = ref(false)

const fetchData = async () => {
  isLoading.value = true
  await userWalletStore.getMyWallets()
  isLoading.value = false
}

watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start">
    <div v-if="isLoading">Loading ...</div>
    <div v-else v-for="wallet in userWalletStore.userWallets" :key="wallet.id">
      <Wallet :wallet="wallet" />
    </div>
  </div>
</template>
