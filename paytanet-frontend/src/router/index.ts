import { createRouter, createWebHistory } from 'vue-router'

import { LocalStorageKey } from '@/constants/localStorage.constant'

import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import MyProfileView from '@/views/profile/MyProfileView.vue'
import DepositView from '@/views/deposit/DepositView.vue'
import WithdrawView from '@/views/withdraw/WithdrawView.vue'

import MainLayout from '@/components/layout/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'home', component: HomeView, meta: { requiresAuth: true } },
        {
          path: '/my-profile',
          name: 'my-profile',
          component: MyProfileView,
          meta: { requiresAuth: true }
        },
        {
          path: '/deposit',
          name: 'deposit',
          component: DepositView,
          meta: { requiresAuth: true }
        },
        {
          path: '/withdraw',
          name: 'withdraw',
          component: WithdrawView,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN)

  if ((to.path === '/login' || to.path === '/register') && token) {
    return next({ path: '/' })
  }

  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
  }
  return next()
})

export default router
