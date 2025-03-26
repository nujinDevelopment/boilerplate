import { ref } from 'vue'

export interface Notification {
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export function useNotification() {
  const notification = ref<Notification | null>(null)
  const timeout = ref<NodeJS.Timeout>()

  const showNotification = (message: string, type: Notification['type'] = 'info', duration = 3000) => {
    // Clear any existing timeout
    if (timeout.value) {
      clearTimeout(timeout.value)
    }

    notification.value = { message, type }
    
    // Set new timeout
    timeout.value = setTimeout(() => {
      notification.value = null
    }, duration)
  }

  // Clean up on component unmount
  onUnmounted(() => {
    if (timeout.value) {
      clearTimeout(timeout.value)
    }
  })

  return {
    notification,
    showNotification
  }
}
