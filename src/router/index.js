import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('@/views/Manage.vue'),
    beforeEnter: (to, from, next) => {
      // check if user is logged in
      // if not, redirect to login page
      // if yes, continue to the route
      next()
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-yellow-500', // styles for an active link globally
  routes,
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    return next()
  }

  const userStore = useUserStore()
  if (userStore.userLoggedIn) return next()

  return next({ name: 'home' })
})

export default router
