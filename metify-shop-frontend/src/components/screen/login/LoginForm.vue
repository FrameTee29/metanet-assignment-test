<script setup lang="ts">
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
import { useRouter } from 'vue-router'

const paytanetUrl = import.meta.env.VITE_PATANET_WEB_URL

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

    popup({
      icon: 'success',
      title: 'Log in success',
      text: 'Wait a moment, you will be redirected...',
      timer: 1500,
      allowOutsideClick: false,
      showCancelButton: false,
      showConfirmButton: false
    })

    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, data.data.accessToken)

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
  <div class="p-6 rounded-lg border max-w-[425px] w-full bg-white">
    <form @submit="onSubmit" class="w-full">
      <h1 class="text-lg font-medium">Log In</h1>
      <div class="space-y-4 mt-4">
        <FormField v-slot="{ componentField }" name="username">
          <FormItem>
            <FormLabel class="text-sm font-normal text-gray-500">username</FormLabel>
            <FormControl>
              <Input type="text" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel class="text-sm font-normal text-gray-500">password</FormLabel>
            <FormControl>
              <Input type="password" v-bind="componentField" />
            </FormControl>
            <FormMessage class="text-xs" />
          </FormItem>
        </FormField>
      </div>
      <div class="mt-4">
        <div class="text-sm space-x-2">
          <span class="text-gray-400">New to Metify shop ?</span
          ><a
            :href="paytanetUrl + '/register'"
            target="_blank"
            class="font-semibold underline text-primary"
            >Register</a
          >
        </div>

        <Button type="submit" class="mt-4 w-full"> Log In</Button>
      </div>
    </form>
  </div>
</template>
