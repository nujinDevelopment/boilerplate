<template>
  <div class="p-4">
    <div v-if="error" class="alert alert-error mb-6">{{ error }}</div>
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h2 class="card-title text-2xl mb-4">Logs</h2>

        <LoggingLogList v-if="canViewLogs" />
        <div v-else class="alert alert-error">
          You don't have permission to view application logs.
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLogger } from '~/modules/logging/composables/useLogger';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import LoggingLogList from '~/modules/logging/components/LogList.vue';

definePageMeta({
  layout: 'app',
  pageName: 'Application Logs'
});

const { error, fetchLogs } = useLogger();
const { getCurrentUserRole } = useUsers();

// Access control - determine if user can view logs
const canViewLogs = computed(() => ['admin'].includes(getCurrentUserRole()));

// Fetch logs when component is mounted
fetchLogs();
</script>