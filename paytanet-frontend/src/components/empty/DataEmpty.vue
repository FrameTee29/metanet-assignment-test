<script setup lang="ts">
import { Inbox } from 'lucide-vue-next'
</script>

<template>
  <div
    class="flex flex-col justify-center items-center w-full text-gray-300 border py-4 rounded-xl"
  >
    <Inbox :size="32" />
    <div class="text-xs">The data is empty.</div>
  </div>
</template>
