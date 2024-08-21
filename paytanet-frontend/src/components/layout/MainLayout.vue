<script setup lang="ts">
import MainNavbar from '@/components/layout/MainNavbar.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
</script>

<template>
  <div class="flex flex-col w-full min-h-screen">
    <MainNavbar />
    <main class="flex-1 mt-4 container">
      <router-view></router-view>
    </main>
    <!-- <MainFooter /> -->
  </div>
</template>
