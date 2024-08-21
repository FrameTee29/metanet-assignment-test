import { defineStore } from 'pinia'

import type { UseDepositState, UseDepositStore } from '@/stores/deposit/deposit.type'

import depositService from '@/services/deposit.service'

export const useDepositStore = defineStore<'Deposit', UseDepositState, {}, UseDepositStore>(
  'Deposit',
  {
    state: (): UseDepositState => ({
      depositHistories: []
    }),
    actions: {
      async getDepositHistories() {
        const response = await depositService.depositHistory()
        this.depositHistories = response.data.data
        return response.data
      }
    }
  }
)
