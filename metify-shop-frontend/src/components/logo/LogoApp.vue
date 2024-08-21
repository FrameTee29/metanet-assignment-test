<script setup lang="ts">
import Logo from '@/assets/logo.png'

interface LogoProps {
  size?: number
}

const props = defineProps<LogoProps>()

const size = props.size ?? 80
</script>

<template>
  <div>
    <img :src="Logo" :width="size" :height="size" alt="metifty-shop" />
  </div>
</template>
