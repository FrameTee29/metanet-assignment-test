<script setup lang="ts">
import LogoApp from '@/components/logo/LogoApp.vue'
import Container from '@/components/screen/login/Container.vue'
import LoginForm from '@/components/screen/login/LoginForm.vue'
</script>

<template>
  <Container>
    <div id="logo-app" class="hidden lg:flex flex-col w-full h-full justify-center items-center">
      <div class="bg-white rounded-lg">
        <LogoApp :size="240" />
      </div>
      <h1 class="text-white text-2xl mt-4">The largest online shopping destination in Thailand.</h1>
    </div>
    <div class="flex flex-col w-full h-full justify-center items-center"><LoginForm /></div>
  </Container>
</template>
