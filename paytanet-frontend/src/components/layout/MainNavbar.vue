<script setup lang="ts">
import { ref } from 'vue'
import { LogOut, Menu } from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'

import { cn } from '@/lib/utils'
import { LocalStorageKey } from '@/constants/localStorage.constant'

import { popup } from '@/components/popup/popup'
import LogoApp from '@/components/logo/LogoApp.vue'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

const menus = [
  // { title: 'Profile', name: 'my-profile', path: '/my-profile' },
  { title: 'Deposit', name: 'deposit', path: '/deposit' },
  { title: 'Withdraw', name: 'withdraw', path: '/withdraw' }
]

const router = useRouter()
const route = useRoute()

const open = ref(false)

const openSheet = () => {
  open.value = true
}

const routeTo = (name: string) => {
  open.value = false
  router.push({ name })
}

const logout = async () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="min-h-16 border-b sticky top-0 bg-white z-10">
    <div class="container flex items-center justify-between w-full h-16 bg-white">
      <div class="space-x-4 flex items-center h-full">
        <router-link to="/"> <LogoApp /></router-link>

        <!-- Desktop -->
        <div class="hidden lg:flex space-x-4 items-center h-full">
          <div v-for="menu in menus" :key="menu.name" class="h-full">
            <router-link
              :to="menu.path"
              :class="
                cn(
                  'relative text-sm font-medium h-full flex items-center justify-center min-w-20 text-gray-500 hover:text-primary  ',
                  route.name === menu.name ? 'text-primary' : ''
                )
              "
            >
              <span>{{ menu.title }}</span>
              <div
                :class="
                  cn(route.name === menu.name ? 'h-[2px] bg-primary w-full absolute bottom-0' : '')
                "
            /></router-link>
          </div>
        </div>
      </div>
      <!-- Desktop -->
      <div class="hidden lg:flex">
        <button
          @click="logout"
          class="flex items-center space-x-1 bg-secondary hover:bg-gray-300 p-2 rounded-lg cursor-pointer"
        >
          <LogOut :size="16" />
          <span class="text-xs">logout</span>
        </button>
      </div>

      <!-- Drawer for mobile -->
      <div class="flex lg:hidden">
        <Sheet v-model:open="open">
          <Menu @click="openSheet" />
          <SheetContent side="left" class="w-full bg-white p-0">
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription> </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col h-full">
              <div class="p-4"><LogoApp @click="routeTo('home')" /></div>
              <div class="flex-1 h-full w-full overflow-y-auto pt-4 pl-4 space-y-4">
                <div v-for="menu in menus" :key="menu.name" class="w-full">
                  <div
                    :class="
                      cn(
                        'flex w-full py-1 px-4',
                        route.name === menu.name
                          ? 'bg-muted px-4 rounded-tl-md rounded-bl-md border-r-2 border-primary text-primary font-bold'
                          : ''
                      )
                    "
                    @click="routeTo(menu.name)"
                  >
                    {{ menu.title }}
                  </div>
                </div>
              </div>
              <div class="pb-4 pt-2 px-2">
                <Button
                  size="xs"
                  variant="outline"
                  class="w-full text-red-500 font-semibold border-red-500"
                  @click="logout"
                  >Logout</Button
                >
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
</template>
