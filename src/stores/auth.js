import { defineStore } from 'pinia'

// const router = useRouter()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      this.isAuthenticated = true
    },
    logout() {
      this.isAuthenticated = false
      localStorage.removeItem('ticketapp_session')
      console.log('ticket removed')
    },
  },
})
