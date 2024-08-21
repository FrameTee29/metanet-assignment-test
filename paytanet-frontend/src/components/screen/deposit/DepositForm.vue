<script setup lang="ts">
import { ref, watchEffect } from 'vue'

import depositService from '@/services/deposit.service'

import { useDepositStore } from '@/stores/deposit/deposit.store'
import { useCurrencyStore } from '@/stores/currency/currency.store'
import { useUserWalletStore } from '@/stores/user-wallet/user-wallet.store'

import {
  Select,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { popup } from '@/components/popup/popup'

import type { ErrorResponse } from '@/interfaces/response.interface'

const currencyStore = useCurrencyStore()
const userWalletStore = useUserWalletStore()
const depositStore = useDepositStore()

const amount = ref(0)
const currency = ref('')

const handleDeposit = async () => {
  try {
    if (amount.value === 0 || currency.value === '') {
      popup({
        icon: 'error',
        title: 'Please fill in all the fields',
        showCancelButton: false,
        showConfirmButton: true
      })
      return
    }

    const confirm = await popup({
      icon: 'info',
      title: 'Are you sure you want to deposit?',
      text: `You are about to deposit ${amount.value} ${currency.value}`,
      showCancelButton: true,
      showConfirmButton: true
    })

    if (confirm === false) {
      return
    }

    const response = await depositService.deposit({
      amount: amount.value,
      currencyCode: currency.value
    })

    await Promise.all([userWalletStore.getMyWallets(), depositStore.getDepositHistories()])

    await popup({
      icon: 'success',
      title: response.data.data.message,
      showCancelButton: false,
      showConfirmButton: true
    })

    amount.value = 0
    currency.value = ''
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    popup({
      icon: 'error',
      title: errorData.data.message,
      showCancelButton: false,
      showConfirmButton: true
    })
  }
}

const fetchData = async () => {
  try {
    await currencyStore.getCurrencies()
  } catch (error) {
    // ! Handle error
  }
}

watchEffect(() => {
  fetchData()
})
</script>

<template>
  <div class="max-w-[425px] mx-auto p-4 border rounded-md">
    <h1 class="text-center font-semibold">Deposit</h1>
    <div class="space-y-4">
      <div>
        <label class="text-xs font-bold">Currency</label>
        <Select v-model="currency">
          <SelectTrigger>
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              <SelectItem
                v-for="currency in currencyStore.currencies"
                :key="currency.id"
                :value="currency.currencyCode"
              >
                <div class="flex items-center h-full justify-center space-x-2">
                  <img :src="currency.flagImage" alt="currency" class="w-6 h-6 rounded-full" />
                  <div>{{ currency.currencyCode }}</div>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label class="text-xs font-bold">Amount</label>
        <Input v-model="amount" type="number" min="0" class="text-center" />
      </div>

      <Button class="w-full bg-green-600" :disabled="false" @click="handleDeposit">Deposit</Button>
    </div>
  </div>
</template>
