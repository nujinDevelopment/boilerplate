import { ref } from 'vue'

export const useLogger = () => {
  const pending = ref(false)
  const logs = ref([])
  const totalCount = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const level = ref('')
  const category = ref('')
  const loading = ref(false)

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
      return response
    } catch (error) {
      console.error('Error sending log:', error)
    } finally {
      pending.value = false
    }
  }

  const fetchLogs = async () => {
    loading.value = true
    try {
      const url = `/api/logs?page=${page.value}&pageSize=${pageSize.value}&level=${level.value}&category=${category.value}`
      console.debug('Fetching logs from API:', url)
      
      const response = await $fetch(url)
      console.debug('API response:', response)

      console.debug('Logs before update:', logs.value)
      logs.value = response.data
      totalCount.value = response.total
      console.debug('Logs after update:', logs.value)
    } catch (err) {
      console.error('Failed to fetch logs:', err)
    } finally {
      loading.value = false
    }
  }

  const getLogCount = async (filterLevel = '', filterCategory = '') => {
    try {
      const query = new URLSearchParams()
      if (filterLevel) query.append('level', filterLevel)
      if (filterCategory) query.append('category', filterCategory)
      const { totalCount: count } = await $fetch(`/api/logs?${query.toString()}`)
      return count
    } catch (err) {
      console.error('Failed to get log count:', err)
      return 0
    }
  }

  return {
    log,
    pending,
    logs,
    totalCount,
    page,
    pageSize,  
    level,
    category,
    loading,
    fetchLogs,
    getLogCount,
    setPage: (newPage) => {
      page.value = newPage
      fetchLogs()
    },
    setPageSize: (newPageSize) => {
      pageSize.value = newPageSize
      fetchLogs()
    },
    setLevel: (newLevel) => {
      level.value = newLevel
      fetchLogs()
    },
    setCategory: (newCategory) => {
      category.value = newCategory
      fetchLogs()
    },
    info: (message: string, category: string, metadata?: any) => log(message, 'info', category, metadata),
    warn: (message: string, category: string, metadata?: any) => log(message, 'warn', category, metadata),
    error: (message: string, category: string, metadata?: any) => log(message, 'error', category, metadata),
    debug: (message: string, category: string, metadata?: any) => log(message, 'debug', category, metadata),
  }
}