<script setup lang="ts">
import { useRouter } from 'vue-router'

import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { LocalStorageKey } from '@/constants/localStorage.constant'

import authService from '@/services/auth.service'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { popup } from '@/components/popup/popup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import type { ErrorResponse } from '@/interfaces/response.interface'

const router = useRouter()

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string({ message: 'Please enter your user account.' })
      .min(2, { message: 'Please enter your user account.' })
      .max(50),
    password: z
      .string()
      .min(6, { message: 'Please enter a password of at least 6 characters.' })
      .max(20, { message: 'Please enter a password of no more than 20 characters.' })
  })
)

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    username: '',
    password: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const response = await authService.login(values)

    const { data } = response

    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, data.data.accessToken)

    popup({
      icon: 'success',
      title: 'Login success',
      text: 'Wait a moment, you will be redirected...',
      timer: 1500,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false
    })

    router.push({ name: 'home' })
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    popup({
      icon: 'error',
      title: errorData.data.message,
      showCancelButton: false
    })
  }
})
</script>

<template>
  <div class="p-6 rounded-lg border">
    <form @submit="onSubmit" class="min-w-[320px]">
      <div class="space-y-4">
        <h1 class="text-center text-xl font-bold">Log In</h1>
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel class="text-sm font-medium">username</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="text-sm font-medium">password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>

      <div class="space-x-1 mt-6 text-xs">
        <span class="text-gray-400">New to Paytanet ?</span
        ><a href="/register" class="font-semibold underline text-primary">Register</a>
      </div>
      <div class="mt-2">
        <Button type="submit" class="w-full">Login</Button>
      </div>
    </form>
  </div>
</template>
