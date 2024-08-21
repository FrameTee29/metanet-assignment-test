<script setup lang="ts">
import AuthNavbar from '@/components/layout/auth-layout/AuthNavbar.vue'
</script>

<template>
  <div class="w-full min-h-screen">
    <AuthNavbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
