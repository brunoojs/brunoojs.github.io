import { createMemoryHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/',
    component: () => import('@/components/Shared/MainLayout.vue'),
    redirect: '/customer',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/modules/Home/HomeListView.vue'),
        meta: { requiresAuth: true, showSearchBar: true }
      },
      {
        path: 'customer',
        name: 'Customer',
        component: () => import('@/modules/Customer/CustomerListView.vue'),
        meta: { requiresAuth: true, showSearchBar: true }
      },
      {
        path: 'add-customer',
        name: 'AddCustomer',
        component: () => import('@/modules/Customer/AddCustomerView.vue'),
        meta: { requiresAuth: true, showSearchBar: false }
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () => import('@/modules/Reports/ChatView.vue'),
        meta: { requiresAuth: true, showSearchBar: false }
      }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/modules/Auth/LoginView.vue'),
    meta: { requiresAuth: false, showSearchBar: false }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/modules/Auth/ForgotPasswordView.vue'),
    meta: { requiresAuth: false, showSearchBar: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/modules/Auth/RegisterView.vue'),
    meta: { requiresAuth: false, showSearchBar: false }
  },
  {
    path: '/email-sent',
    name: 'EmailSent',
    component: () => import('@/modules/Auth/EmailSentView.vue'),
    meta: { requiresAuth: false, showSearchBar: false }
  }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    return next({ name: 'Login' })
  }

  next()
})
