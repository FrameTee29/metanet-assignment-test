<script setup lang="ts">
import { watchEffect } from 'vue'

import { useUserStore } from '@/stores/user/user.store'

import Separator from '@/components/ui/separator/Separator.vue'
import MyWallets from '@/components/screen/profile/MyWallets.vue'

const userStore = useUserStore()

watchEffect((onCleanup) => {
  userStore.getMyUserInformation()

  onCleanup(() => {
    console.log('Clean up')
  })
})
</script>

<template>
  <div class="space-y-10">
    <div id="my-wallet" class="flex justify-center items-center flex-col">
      <h1 class="text-2xl font-bold">Wallets</h1>
      <div class="mt-4">
        <MyWallets />
      </div>
    </div>
    <div id="my-profile">
      <h1 class="text-2xl font-bold">My Profile</h1>
      <Separator class="mb-4 mt-2" />
    </div>
  </div>
</template>
