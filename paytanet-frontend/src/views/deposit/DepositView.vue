<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue'
import MyWallets from '@/components/screen/profile/MyWallets.vue'
import DepositForm from '@/components/screen/deposit/DepositForm.vue'
import DepositHistory from '@/components/screen/deposit/DepositHistory.vue'
</script>

<template>
  <div class="space-y-10 pb-20">
    <div id="my-profile">
      <h1 class="text-xl font-bold">Deposit</h1>
      <Separator class="mb-4 mt-2" />
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="flex flex-col justify-center items-center">
          <h1 class="text-lg font-medium mb-4">My Wallets</h1>
          <MyWallets />
        </div>
        <div>
          <DepositForm />
        </div>
      </div>
    </div>

    <div id="my-wallet">
      <h1 class="text-xl font-bold">Deposit History</h1>
      <Separator class="mb-4 mt-2" />
      <div>
        <DepositHistory />
      </div>
    </div>
  </div>
</template>
