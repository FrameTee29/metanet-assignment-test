import { defineStore } from 'pinia'

import type { UseUserState, UseUserStore } from '@/stores/user/user.type'

import userService from '@/services/user.service'

export const useUserStore = defineStore<'User', UseUserState, {}, UseUserStore>('User', {
  state: (): UseUserState => ({
    user: {
      id: '',
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      createdAt: '',
      updatedAt: '',
      isActive: false,
      deletedAt: null,
      userWallets: [],
      userAuth: {
        id: '',
        username: '',
        createdAt: '',
        updatedAt: '',
        deletedAt: null
      }
    }
  }),
  actions: {
    async getMyUserInformation() {
      const response = await userService.getMyUserInformation()

      this.user = response.data.data

      return response.data
    }
  }
})
