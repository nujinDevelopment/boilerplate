import { ref, readonly } from 'vue'

interface Toast {
  title: string
  description?: string
  icon?: string
  color?: 'green' | 'red' | 'blue' | 'yellow'
  duration?: number
  remove?: () => void
}

const toasts = ref<Toast[]>([])

export const useToast = () => {
  const add = (toast: Omit<Toast, 'remove'>) => {
    const id = Date.now()
    const remove = () => {
      toasts.value = toasts.value.filter(t => t.title !== toast.title)
    }
    
    const newToast = { 
      ...toast, 
      duration: toast.duration || 5000,
      remove
    }
    toasts.value.push(newToast)
    
    // Auto remove after duration
    setTimeout(() => {
      remove()
    }, newToast.duration)
  }

  return {
    toasts: readonly(toasts),
    add
  }
}
