<script setup lang="ts">
import { useRouter } from 'vue-router'

import * as z from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import authService from '@/services/auth.service'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { popup } from '@/components/popup/popup'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import type { ErrorResponse } from '@/interfaces/response.interface'
import Separator from '@/components/ui/separator/Separator.vue'

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
      .max(20, { message: 'Please enter a password of no more than 20 characters.' }),
    firstName: z.string({ message: 'Please enter your first name.' }),
    lastName: z.string({ message: 'Please enter your last name.' }),
    email: z
      .string({ message: 'Please enter your email address.' })
      .email({ message: 'Please enter a valid email address.' }),
    phone: z.string({ message: 'Please enter your phone number.' })
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
    const response = await authService.register(values)
    const { data } = response

    const confirm = await popup({
      icon: 'success',
      title: data?.data?.message,
      text: 'You can now login with your account',
      showCancelButton: true,
      confirmButtonText: 'Go to login'
    })

    if (confirm) {
      router.push({ name: 'login' })
    }
  } catch (error: any) {
    const errorData = error.response.data as ErrorResponse

    const result = await popup({
      icon: 'error',
      title: errorData.data.message,
      showCancelButton: false
    })

    console.log(result)
  }
})
</script>

<template>
  <div class="p-6 rounded-lg border">
    <form @submit="onSubmit" class="min-w-[320px]">
      <div class="space-y-4">
        <h1 class="text-center text-xl font-bold">Register</h1>
        <div id="account">
          <h1 class="font-bold">Account</h1>
          <Separator class="my-2" />
          <div class="space-y-4">
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
        </div>
        <div id="Information">
          <h1 class="font-bold">Personal Information</h1>
          <Separator class="my-2" />
          <div class="space-y-4">
            <FormField v-slot="{ componentField }" name="firstName">
              <FormItem>
                <FormLabel class="text-sm font-medium">Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="lastName">
              <FormItem>
                <FormLabel class="text-sm font-medium">Surname</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="email">
              <FormItem>
                <FormLabel class="text-sm font-medium">email</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
            <FormField v-slot="{ componentField }" name="phone">
              <FormItem>
                <FormLabel class="text-sm font-medium">phone</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="" v-bind="componentField" />
                </FormControl>
                <FormMessage class="text-xs" />
              </FormItem>
            </FormField>
          </div>
        </div>
      </div>

      <div class="space-x-1 mt-6 text-xs">
        <span class="text-gray-400">If you already have a user account, you can</span
        ><a href="/login" class="font-semibold underline text-primary">Login</a>
      </div>
      <div class="mt-2">
        <Button type="submit" class="w-full">Submit</Button>
      </div>
    </form>
  </div>
</template>
