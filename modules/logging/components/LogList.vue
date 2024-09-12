<template>
  <div>    
    <!-- Filters -->
    <div class="mb-4 flex space-x-4">
      <input v-model="filters.message" placeholder="Search message" class="border p-2 rounded" />
      <select v-model="filters.level" class="border p-2 rounded">
        <option value="">All Levels</option>
        <option value="info">Info</option>
        <option value="warn">Warn</option>
        <option value="error">Error</option>
        <option value="debug">Debug</option>
      </select>
      <input v-model="filters.category" placeholder="Category" class="border p-2 rounded" />
    </div>

    <!-- Log Table -->
    <table class="min-w-full bg-white">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Time</th>
          <th class="py-2 px-4 border-b">Level</th>
          <th class="py-2 px-4 border-b">Category</th>
          <th class="py-2 px-4 border-b">Message</th>
          <th class="py-2 px-4 border-b">Metadata</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in filteredLogs" :key="log.id" :class="{'bg-gray-100': log.level === 'error'}">
          <td class="py-2 px-4 border-b">{{ formatDate(log.created_at) }}</td>
          <td class="py-2 px-4 border-b">
            <span :class="getLevelClass(log.level)">{{ log.level }}</span>
          </td>
          <td class="py-2 px-4 border-b">{{ log.category }}</td>
          <td class="py-2 px-4 border-b">{{ log.message }}</td>
          <td class="py-2 px-4 border-b">
            <pre>{{ JSON.stringify(log.metadata, null, 2) }}</pre>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLogger } from '../composables/useLogger'

const logger = useLogger()
const logs = ref<any[]>([])
const currentPage = ref(1)
const itemsPerPage = 10
const totalItems = ref(0)

const filters = ref({
  message: '',
  level: '',
  category: ''
})

const fetchLogs = async () => {
  try {
    const response = await $fetch('/api/logs', {
      method: 'GET',
      params: {
        page: currentPage.value,
        itemsPerPage,
        ...filters.value
      }
    })
    logs.value = response.data
    totalItems.value = response.total
  } catch (error) {
    logger.error('Failed to fetch logs', 'LogList', { error })
  }
}

onMounted(fetchLogs)

const filteredLogs = computed(() => {
  return logs.value.filter(log =>
    log.message.toLowerCase().includes(filters.value.message.toLowerCase()) &&
    (filters.value.level === '' || log.level === filters.value.level) &&
    log.category.toLowerCase().includes(filters.value.category.toLowerCase())
  )
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchLogs()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchLogs()
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const getLevelClass = (level: string) => {
  switch (level) {
    case 'error':
      return 'text-red-600 font-bold'
    case 'warn':
      return 'text-yellow-600'
    case 'info':
      return 'text-blue-600'
    case 'debug':
      return 'text-gray-600'
    default:
      return ''
  }
}
</script>