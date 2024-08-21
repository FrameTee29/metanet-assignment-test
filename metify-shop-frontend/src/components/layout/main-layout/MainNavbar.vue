<script setup lang="ts">
import { useRouter } from 'vue-router'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar } from '@/components/ui/avatar'
import LogoApp from '@/components/logo/LogoApp.vue'
import Button from '@/components/ui/button/Button.vue'
import CartNavigate from '@/components/screen/cart/CartNavigate.vue'
import { LocalStorageKey } from '@/constants/localStorage.constant'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN)
  router.push('/login')
}
</script>

<template>
  <div class="h-16 w-full bg-white border-b shadow-md sticky top-0">
    <div class="container mx-auto flex w-full h-full justify-between items-center">
      <div id="logo">
        <router-link to="/"> <LogoApp :size="60" /></router-link>
      </div>
      <!-- Desktop -->
      <div class="flex items-center space-x-2">
        <router-link to="/order/history"
          ><Button size="xs" variant="ghost">My Purchase</Button></router-link
        >
        <div>
          <CartNavigate />
        </div>

        <div class="flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar size="xs" class="bg-primary">
                <div class="font-medium text-lg">P</div>
              </Avatar></DropdownMenuTrigger
            >
            <DropdownMenuContent class="text-sm">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <router-link to="/cart"><DropdownMenuItem>Cart</DropdownMenuItem></router-link>
              <router-link to="/order/history"
                ><DropdownMenuItem>My Purchase</DropdownMenuItem></router-link
              >
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="handleLogout">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>
