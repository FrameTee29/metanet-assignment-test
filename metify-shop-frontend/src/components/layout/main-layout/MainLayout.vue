<script setup lang="ts">
import MainNavbar from '@/components/layout/main-layout/MainNavbar.vue'
</script>

<template>
  <div class="w-full min-h-screen bg-muted">
    <MainNavbar />
    <main class="">
      <router-view></router-view>
    </main>
  </div>
</template>
