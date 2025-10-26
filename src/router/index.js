import { createRouter, createWebHistory } from 'vue-router'
import { usePopupStore } from '../stores/popup'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: () => import('../views/LandingPage.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginPage.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupPage.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: () => import('../views/TicketsPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const popupStore = usePopupStore()
  const isAuthenticated = localStorage.getItem('ticketapp_session')

  if (to.meta.requiresAuth && !isAuthenticated) {
    popupStore.showPopup('You must be logged in to access this page.')
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else if (to.name === 'Signup' && isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
