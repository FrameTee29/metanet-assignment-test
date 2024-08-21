<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue'
import { useUserStore } from '@/stores/user/user.store'
import { formatDateTime } from '@/utils/format-date'

const userStore = useUserStore()
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div id="Personal information" class="border rounded-md p-4">
      <h1 class="text-center text-lg font-semibold">Personal information</h1>
      <Separator class="my-1" />
      <div class="space-y-2">
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Name</h2>
          <p class="text-gray-500">{{ userStore.user.firstName }}</p>
        </div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Surname</h2>
          <p class="text-gray-500">{{ userStore.user.lastName }}</p>
        </div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Email</h2>
          <p class="text-gray-500">{{ userStore.user.email }}</p>
        </div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Phone</h2>
          <p class="text-gray-500">{{ userStore.user.phone }}</p>
        </div>
      </div>
    </div>
    <div id="Account Information" class="border rounded-md p-4">
      <h1 class="text-center text-lg font-semibold">Account</h1>
      <Separator class="my-1" />
      <div class="space-y-2">
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Username</h2>
          <p class="text-gray-500">{{ userStore.user.userAuth.username }}</p>
        </div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Activation</h2>
          <div class="text-xs font-semibold text-white">
            <div v-if="userStore.user.isActive" class="bg-green-500 py-[2px] px-1 rounded-md">
              Active
            </div>
            <div v-else class="bg-red-600 py-[2px] px-1 rounded-md">Inactive</div>
          </div>
        </div>
        <div class="flex justify-between items-center mt-2">
          <h2 class="font-medium">Created At</h2>
          <p class="text-gray-500">
            {{ formatDateTime(userStore.user.userAuth.createdAt, 'YYYY/MM/DD') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
