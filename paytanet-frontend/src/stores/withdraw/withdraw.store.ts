import { defineStore } from 'pinia'

import type { UseWithdrawState, UseWithdrawStore } from '@/stores/withdraw/withdraw.type'

import withdrawService from '@/services/withdraw.service'

export const useWithdrawStore = defineStore<'Withdraw', UseWithdrawState, {}, UseWithdrawStore>(
  'Withdraw',
  {
    state: (): UseWithdrawState => ({
      withdrawHistories: []
    }),

    actions: {
      async getWithdrawHistories() {
        const response = await withdrawService.withdrawHistory()

        this.withdrawHistories = response.data.data

        return response.data
      }
    }
  }
)
