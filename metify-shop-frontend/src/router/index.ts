import { createRouter, createWebHistory } from 'vue-router'

import { LocalStorageKey } from '@/constants/localStorage.constant'

import HomeView from '@/views/home/HomeView.vue'
import CartView from '@/views/cart/CartView.vue'
import LoginView from '@/views/auth/LoginView.vue'

import AuthLayout from '@/components/layout/auth-layout/AuthLayout.vue'

import MainLayout from '@/components/layout/main-layout/MainLayout.vue'
import OrderHistoryView from '@/views/order/OrderHistoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: HomeView, meta: { requiresAuth: true } },
        { path: '/cart', name: 'cart', component: CartView, meta: { requiresAuth: true } },
        {
          path: '/order/history',
          name: 'order-history',
          component: OrderHistoryView,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      component: AuthLayout,
      children: [{ path: '/login', name: 'login', component: LoginView }]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)

  if (to.path === '/login' && token) {
    return next({ path: '/' })
  }

  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  }

  return next()
})

export default router
