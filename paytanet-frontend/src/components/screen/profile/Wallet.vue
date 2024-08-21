<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { type UserWallet } from '@/interfaces/user-wallet.interface'
import { formatBalance } from '@/utils/format-balance'

interface WalletProps {
  wallet: UserWallet
}
defineProps<WalletProps>()
</script>

<template>
  <div
    class="flex flex-col items-center rounded-md border p-4 relative space-y-2 w-full min-w-60 lg:min-w-44"
  >
    <img :src="wallet.currency.flagImage" class="w-8 h-8 rounded-full" />
    <p class="text-xs">{{ wallet.currency.currencyCode }}</p>
    <p class="text-lg font-semibold truncate">
      {{ formatBalance(Number(wallet.balance)) }} {{ wallet.currency.currencySymbol }}
    </p>
  </div>
</template>
