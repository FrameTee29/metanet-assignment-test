<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface ContainerProps {
  class?: string
}

const props = defineProps<ContainerProps>()
</script>

<template>
  <div :class="cn('container mx-auto pb-20', props.class)">
    <slot />
  </div>
</template>
