<script setup lang="ts">
import LogoApp from '@/components/logo/LogoApp.vue'
</script>

<template>
  <div class="h-20 w-full bg-white">
    <div class="container mx-auto flex w-full h-full justify-between items-center">
      <div class="flex items-center">
        <LogoApp :size="60" />
        <h1 class="font-semibold">Log In</h1>
      </div>
      <div><h1 class="text-sm text-primary">Need help?</h1></div>
    </div>
  </div>
</template>
