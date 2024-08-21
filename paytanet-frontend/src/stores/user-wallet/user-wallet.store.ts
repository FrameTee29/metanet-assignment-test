import { defineStore } from 'pinia'

import type { UseUserWalletState, UseUserWalletStore } from '@/stores/user-wallet/user-wallet.type'

import userWalletService from '@/services/user-wallet.service'

export const useUserWalletStore = defineStore<
  'UserWallet',
  UseUserWalletState,
  {},
  UseUserWalletStore
>('UserWallet', {
  state: (): UseUserWalletState => ({
    userWallets: []
  }),
  actions: {
    async getMyWallets() {
      const response = await userWalletService.getMyWallets()

      this.userWallets = response.data.data

      return response.data
    }
  }
})
