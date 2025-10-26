<template>
  <div class="tickets-page">
    <main>
      <section class="tickets-section">
        <h2>Ticket Management</h2>
        <div class="ticket-form">
          <h3>{{ editing ? 'Edit Ticket' : 'Create New Ticket' }}</h3>
          <form @submit.prevent="editing ? handleUpdate : handleCreate">
            <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                id="title"
                v-model="newTicket.title"
                required
                :class="{ error: errors.title }"
              />
              <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea
                id="description"
                v-model="newTicket.description"
                :class="{ error: errors.description }"
              ></textarea>
              <span v-if="errors.description" class="error-message">{{ errors.description }}</span>
            </div>
            <div class="form-group">
              <label for="status">Status</label>
              <select
                id="status"
                v-model="newTicket.status"
                required
                :class="{ error: errors.status }"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              <span v-if="errors.status" class="error-message">{{ errors.status }}</span>
            </div>
            <div class="form-actions">
              <button type="submit" class="btn">
                {{ editing ? 'Update' : 'Create' }}
              </button>
              <button v-if="editing" type="button" @click="cancelEdit" class="btn cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div class="tickets-list">
          <h3>Your Tickets</h3>
          <div v-if="tickets.length === 0" class="no-tickets">
            No tickets found. Create your first ticket!
          </div>
          <div v-else class="ticket-grid">
            <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
              <h4>{{ ticket.title }}</h4>
              <p>{{ ticket.description }}</p>
              <span :class="['status-tag', ticket.status]">{{ formatStatus(ticket.status) }}</span>
              <div class="ticket-actions">
                <button @click="startEdit(ticket)" class="btn edit-btn">Edit</button>
                <button @click="confirmDelete(ticket.id)" class="btn delete-btn">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const tickets = ref([])
const newTicket = ref({
  id: null,
  title: '',
  description: '',
  status: 'open',
})
const editing = ref(false)
const errors = ref({})

const loadTickets = () => {
  const savedTickets = localStorage.getItem('tickets')
  if (savedTickets) {
    tickets.value = JSON.parse(savedTickets)
  } else {
    tickets.value = [
      { id: 1, title: 'First Ticket', description: 'This is the first ticket', status: 'open' },
      {
        id: 2,
        title: 'Second Ticket',
        description: 'This is the second ticket',
        status: 'in_progress',
      },
    ]
    saveTickets()
  }
}

const saveTickets = () => {
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
}

const formatStatus = (status) => {
  return status.replace('_', ' ')
}

const validateForm = () => {
  errors.value = {}

  if (!newTicket.value.title.trim()) {
    errors.value.title = 'Title is required'
  }

  if (newTicket.value.description && newTicket.value.description.length > 500) {
    errors.value.description = 'Description must be less than 500 characters'
  }

  if (!newTicket.value.status) {
    errors.value.status = 'Status is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleCreate = () => {
  if (!validateForm()) return

  const ticket = {
    id: tickets.value.length > 0 ? Math.max(...tickets.value.map((t) => t.id)) + 1 : 1,
    ...newTicket.value,
  }

  tickets.value.push(ticket)
  saveTickets()
  resetForm()
  toast.success('Ticket created successfully!')
}

const handleUpdate = () => {
  if (!validateForm()) return

  const index = tickets.value.findIndex((t) => t.id === newTicket.value.id)
  if (index !== -1) {
    tickets.value[index] = { ...newTicket.value }
    saveTickets()
    resetForm()
    toast.success('Ticket updated successfully!')
  }
}

const startEdit = (ticket) => {
  newTicket.value = { ...ticket }
  editing.value = true
}

const cancelEdit = () => {
  resetForm()
}

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this ticket?')) {
    handleDelete(id)
  }
}

const handleDelete = (id) => {
  tickets.value = tickets.value.filter((t) => t.id !== id)
  saveTickets()
  toast.success('Ticket deleted successfully!')
}

const resetForm = () => {
  newTicket.value = {
    id: null,
    title: '',
    description: '',
    status: 'open',
  }
  editing.value = false
  errors.value = {}
}

// Initialize
onMounted(() => {
  loadTickets()
})
</script>

<style scoped>
.tickets-page {
  max-width: 1440px;
  margin: 0 auto;
}

.tickets-section {
  padding: 2rem;
}

.ticket-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input.error,
.form-group textarea.error,
.form-group select.error {
  border-color: #ff4444;
}

.error-message {
  color: #ff4444;
  font-size: 0.8rem;
  display: block;
  margin-top: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.ticket-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.ticket-card:hover {
  transform: translateY(-5px);
}

.status-tag {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-top: 0.75rem;
  font-weight: 500;
}

.status-tag.open {
  background-color: #4caf50;
  color: white;
}

.status-tag.in_progress {
  background-color: #ffc107;
  color: black;
}

.status-tag.closed {
  background-color: #9e9e9e;
  color: white;
}

.ticket-actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.btn:hover {
  opacity: 0.9;
}

.edit-btn {
  background-color: #2196f3;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn {
  background-color: #9e9e9e;
  color: white;
}

.no-tickets {
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
}

@media (max-width: 768px) {
  .tickets-section {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
