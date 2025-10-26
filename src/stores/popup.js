import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    isVisible: false,
    message: '',
  }),
  actions: {
    showPopup(message) {
      this.message = message
      this.isVisible = true
    },
    hidePopup() {
      this.isVisible = false
      this.message = ''
    },
  },
})
