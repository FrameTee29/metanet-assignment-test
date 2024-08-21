<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { watchEffect } from 'vue'

import { formatBalance } from '@/utils/format-balance'

import paymentService from '@/services/payment.service'

import { useUserStore } from '@/stores/user/user.store'
import { usePaymentStore } from '@/stores/payment/payment.store'
import { useCurrencyStore } from '@/stores/currency/currency.store'

import { popup } from '@/components/popup/popup'
import Button from '@/components/ui/button/Button.vue'
import WalletCard from '@/components/card/WalletCard.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import RadioGroup from '@/components/ui/radio-group/RadioGroup.vue'
import RadioGroupItem from '@/components/ui/radio-group/RadioGroupItem.vue'

import type { ErrorResponse } from '@/interfaces/response.interface'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart/cart.store'

const router = useRouter()

const userStore = useUserStore()
const cartStore = useCartStore()
const paymentStore = usePaymentStore()
const currencyStore = useCurrencyStore()

const fetchData = async () => {
  try {
    await Promise.all([
      userStore.getMyWallets(),
      currencyStore.getAllCurrency(),
      currencyStore.getExchangeRates()
    ])

    await paymentStore.initialPaymentCurrency()
  } catch (error) {
    // ! Error handling
  }
}

watchEffect((onCleanUp) => {
  fetchData()

  onCleanUp(() => {
    userStore.reset()
    cartStore.reset()
    paymentStore.reset()
    currencyStore.reset()
  })
})

const handleSelectCurrency = (currency: string) => {
  paymentStore.setPaymentCurrency(currency)
}

const handlePay = async () => {
  try {
    const confirm = await popup({
      title: 'Payment Confirmation',
      showCancelButton: true
    })

    if (!confirm) {
      return
    }

    await paymentService.pay({
      currencyCode: paymentStore.paymentCurrency.currencyCode,
      priceRate: paymentStore.priceRate,
      totalPrice: paymentStore.totalPrice
    })

    popup({
      icon: 'success',
      title: 'Payment Success',
      showCancelButton: false
    })

    router.push({ name: 'order-history' })
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    popup({
      icon: 'error',
      title: 'Payment Failed',
      text: errorData.data.message,
      showCancelButton: false
    })
  }
}
</script>

<template>
  <div class="bg-white p-4" v-if="cartStore.totalItems > 0">
    <h1 class="font-medium text-primary">Payment Currency</h1>
    <Separator class="my-2" />
    <div class="space-y-4">
      <div>
        <RadioGroup @update:model-value="handleSelectCurrency" default-value="THB">
          <div
            v-for="wallet in userStore.wallets"
            :key="wallet.id"
            class="flex justify-start items-center space-x-4"
          >
            <RadioGroupItem
              :id="wallet.currency.currencyCode"
              :value="wallet.currency.currencyCode"
            />
            <WalletCard :for="wallet.currency.currencyCode" :wallet="wallet" />
          </div>
        </RadioGroup>
      </div>
      <div
        class="flex flex-col justify-end items-end space-y-4"
        v-if="!!paymentStore.paymentCurrency.id"
      >
        <div class="text-right">
          <div class="text-xs">Currency</div>
          <div class="flex space-x-1 items-center justify-center">
            <img :src="paymentStore.paymentCurrency.flagImage" class="w-6 h-6 rounded-full" />
            <div>{{ paymentStore.paymentCurrency.currencyCode }}</div>
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs">Total Price</div>
          <div class="text-primary font-semibold text-lg">
            {{ paymentStore.paymentCurrency.currencySymbol
            }}{{ formatBalance(paymentStore.totalPrice) }}
          </div>
        </div>
        <div>
          <Button @click="handlePay">Pay</Button>
        </div>
      </div>
    </div>
  </div>
</template>
