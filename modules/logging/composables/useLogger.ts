import { ref } from 'vue'

export const useLogger = () => {
  const pending = ref(false)

  const log = async (message: string, level: string, category: string, metadata: any = {}) => {
    pending.value = true
    try {
      const response = await $fetch('/api/logs', {
        method: 'POST',
        body: {
          message,
          level,
          category,
          metadata
        }
      })
      console.log(`Log sent: ${message}`)
      return response
    } catch (error) {
      console.error('Error sending log:', error)
    } finally {
      pending.value = false
    }
  }

  return {
    log,
    pending,
    info: (message: string, category: string, metadata?: any) => log(message, 'info', category, metadata),
    warn: (message: string, category: string, metadata?: any) => log(message, 'warn', category, metadata),
    error: (message: string, category: string, metadata?: any) => log(message, 'error', category, metadata),
    debug: (message: string, category: string, metadata?: any) => log(message, 'debug', category, metadata),
  }
}