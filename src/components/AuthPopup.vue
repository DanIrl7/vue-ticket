<template>
  <div v-if="popupStore.isVisible" class="auth-popup-overlay">
    <div class="auth-popup-content">
      <p>{{ popupStore.message }}</p>
      <button @click="closePopup" class="btn">OK</button>
    </div>
  </div>
</template>

<script setup>
import { usePopupStore } from '../stores/popup'

const popupStore = usePopupStore()

const closePopup = () => {
  popupStore.hidePopup()
}
</script>

<style scoped>
.auth-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.auth-popup-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.auth-popup-content p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #3aa876;
}
</style>
