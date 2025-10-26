<script setup>
import { RouterView, useRouter } from 'vue-router'
import { watch, onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import AuthPopup from './components/AuthPopup.vue'

const router = useRouter()
const authStore = useAuthStore()

const checkAuth = () => {
  authStore.isAuthenticated = !!localStorage.getItem('ticketapp_session')
}

watch(
  () => router.currentRoute.value,
  () => {
    checkAuth()
  },
)

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
    <AuthPopup />
  </div>
</template>

<style lang="scss">
$blue: rgb(20, 72, 119);
$gray: rgb(245, 248, 251);

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1440px;
  margin: 0 auto;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
}

body {
  h1 {
    color: $blue;
    font-size: 3.5rem;
    margin: 0;
  }

  p,
  h3,
  h4 {
    color: $blue;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0;
  }
}
</style>
