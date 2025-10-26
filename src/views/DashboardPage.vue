<template>
  <div class="dashboard-page">
    <main>
      <section class="dashboard-section">
        <h2>Dashboard</h2>
        <div class="stats">
          <div class="stat-card">
            <h3>Total Tickets</h3>
            <p>{{ totalTickets }}</p>
          </div>
          <div class="stat-card">
            <h3>Open Tickets</h3>
            <p>{{ openTickets }}</p>
          </div>
          <div class="stat-card">
            <h3>Resolved Tickets</h3>
            <p>{{ resolvedTickets }}</p>
          </div>
        </div>
        <router-link :to="{ name: 'Tickets' }" class="btn">Manage Tickets</router-link>
        <button @click="handleLogout" class="btn logout-btn">Logout</button>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const totalTickets = ref(0)
const openTickets = ref(0)
const resolvedTickets = ref(0)

const handleLogout = () => {
  localStorage.removeItem('ticketapp_session')
  router.push({ name: 'Login' })
  console.log('dashboard log out')
}

const fetchTicketStats = () => {
  const mockTickets = JSON.parse(localStorage.getItem('tickets') || '[]')

  totalTickets.value = mockTickets.length
  openTickets.value = mockTickets.filter((t) => t.status === 'open').length
  resolvedTickets.value = mockTickets.filter((t) => t.status === 'closed').length
}

onMounted(() => {
  fetchTicketStats()
})
</script>

<style scoped>
.dashboard-page {
  max-width: 1440px;
  margin: 0 auto;
}

.dashboard-section {
  padding: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card h3 {
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.stat-card p {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-right: 1rem;
  font-weight: 500;
}

.logout-btn {
  background-color: #ff4444;
}

.btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .btn,
  .logout-btn {
    display: block;
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
