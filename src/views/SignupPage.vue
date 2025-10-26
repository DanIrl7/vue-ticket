<template>
  <div class="auth-page">
    <main>
      <section class="auth-section">
        <h2>Create an Account</h2>
        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              required
              :class="{ 'is-invalid': errors.name }"
            />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              :class="{ 'is-invalid': errors.email }"
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              :class="{ 'is-invalid': errors.password }"
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
          </div>
          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              v-model="confirmPassword"
              required
              :class="{ 'is-invalid': errors.confirmPassword }"
            />
            <div v-if="errors.confirmPassword" class="invalid-feedback">
              {{ errors.confirmPassword }}
            </div>
          </div>
          <div v-if="signupError" class="alert alert-danger">{{ signupError }}</div>
          <button type="submit" class="btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Sign Up</span>
            <span v-else>Creating account...</span>
          </button>
        </form>
        <div class="auth-footer">
          <p>Already have an account? <router-link :to="{ name: 'Login' }">Log in</router-link></p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const router = useRouter()
const toast = useToast()
const isSubmitting = ref(false)
const signupError = ref('')
const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const validateForm = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!name.value) {
    errors.name = 'Name is required'
    isValid = false
  } else if (name.value.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  if (!email.value) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.email = 'Please enter a valid email'
    isValid = false
  }

  if (!password.value) {
    errors.password = 'Password is required'
    isValid = false
  } else if (password.value.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  if (!confirmPassword.value) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleSignup = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  signupError.value = ''

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.setItem('ticketapp_session', 'mock-token')
    toast.success('Account created successfully!')
    const authStore = useAuthStore()
    authStore.login()
    router.push({ name: 'Dashboard' })
  } catch {
    signupError.value = 'Signup failed. Please try again.'
    toast.error('Signup failed')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    router.push({ name: 'Dashboard' })
  }
})
</script>

<style scoped>
.auth-page {
  max-width: 1440px;
  margin: 0 auto;
}

.auth-section {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #4283b9;
}

.form-group input.is-invalid {
  border-color: #ff4444;
}

.invalid-feedback {
  color: #ff4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.alert-danger {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4283b9;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #3aa876;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
}

.auth-footer p {
  margin: 0;
  color: #666;
}

.auth-footer a {
  color: #42b983;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}

/* Responsive design */
@media (max-width: 480px) {
  .auth-section {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
