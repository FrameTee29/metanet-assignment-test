import { defineStore } from 'pinia'

import type { UseUserState, UseUserAction } from '@/stores/user/user.type'
import userService from '@/services/user.service'

export const useUserStore = defineStore<'User', UseUserState, {}, UseUserAction>('User', {
  state: (): UseUserState => ({
    wallets: []
  }),
  actions: {
    async getMyWallets() {
      const response = await userService.getMyWallets()

      this.wallets = response.data.data
    },
    reset() {
      this.wallets = []
    }
  }
})
