<script setup lang="ts">
import type { UserWallet } from '@/interfaces/user-wallet.interface'
import { formatBalance } from '@/utils/format-balance'

interface WalletCardProps {
  wallet: UserWallet
}

defineProps<WalletCardProps>()
</script>

<template>
  <div class="flex space-x-4">
    <div class="border">
      <img
        :src="wallet.currency.flagImage"
        :alt="wallet.currency.currencyCode"
        class="rounded-full w-12 h-12"
      />
    </div>
    <div class="text-sm">
      <div>{{ wallet.currency.currencyCode }} Wallets</div>
      <div class="text-gray-400">
        {{ wallet.currency.currencySymbol }} {{ formatBalance(Number(wallet.balance)) }}
      </div>
    </div>
  </div>
</template>
