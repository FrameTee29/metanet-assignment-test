<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import LogoApp from '@/components/logo/LogoApp.vue'
</script>

<template>
  <div class="bg-primary w-full" style="height: calc(100vh - 5rem)">
    <div class="container mx-auto h-full">
      <div class="grid lg:grid-cols-2 h-full gap-4">
        <slot />
      </div>
    </div>
  </div>
</template>
