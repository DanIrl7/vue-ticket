<template>
  <header>
    <div class="wave-background"></div>
    <nav>
      <router-link :to="{ name: 'Landing' }">Home</router-link>
      <router-link v-if="!authStore.isAuthenticated" :to="{ name: 'Login' }">Login</router-link>
      <router-link v-if="!authStore.isAuthenticated" :to="{ name: 'Signup' }">Signup</router-link>
      <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      <router-link :to="{ name: 'Tickets' }">Tickets</router-link>
      <button v-if="authStore.isAuthenticated" @click="logout" class="sign-out-button">
        Sign Out
      </button>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  console.log('logging out')
  authStore.logout()
  console.log(authStore.isAuthenticated)
  if (!authStore.isAuthenticated) {
    router.push({ name: 'Login' })
  } else console.log('still authenticated')
}
</script>

<style scoped lang="scss">
@use '../styles/variables' as v;

header {
  background-color: #f8f9fa;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.wave-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="%234e8abf" opacity=".25"/><path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09,26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.41,10.79,81.3,19.7,122.88,26.73,53.47,8.63,107.43,13.12,158.4,19.07V0Z" fill="%234e8abf" opacity=".5"/><path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="%234e8abf"/></svg>')
    repeat-x;
  background-size: 100% 100%;
  animation: wave 12s ease-in-out infinite;
}

nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  position: relative;
  z-index: 1;

  a {
    font-size: 1.5rem;
    color: v.$blue;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  a:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  a:visited {
    color: v.$blue;
  }

  a.router-link-exact-active {
    color: v.$blue;
    transform: scale(1.1);
    font-weight: bold;
  }

  .sign-out-button {
    font-size: 1.5rem;
    color: v.$blue;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
  }

  .sign-out-button:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #ea8d8d;
  }
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    a,
    .sign-out-button {
      font-size: 1.2rem;
      padding: 0.3rem 0.6rem;
    }
  }
}

@keyframes wave {
  0% {
    background-position-x: 0;
  }
  50% {
    background-position-x: 600px;
  }
  100% {
    background-position-x: 1200px;
  }
}
</style>
