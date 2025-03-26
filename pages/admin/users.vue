<template>
  <div class="">
    <div v-if="error" class="alert alert-error mb-6">{{ error }}</div>
    <UserManagementUserStats v-if="showStats && canViewStats" class="mb-6" />
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2">
        <UserManagementUserList @edit-user="editUser" />
      </div>
      <div>
        <UserManagementUserForm
          v-if="canCreateOrEditUsers"
          :user="selectedUser"
          @user-updated="handleUserUpdated"
          @user-created="handleUserChange"
          @cancel="handleCancel"
        />
        <div v-else class="card bg-base-100 shadow">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-4">User Management</h2>
            <p>You don't have permission to create or edit users.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import UserManagementUserStats from '~/modules/user-management/components/UserStats.vue';
import UserManagementUserList from '~/modules/user-management/components/UserList.vue';
import UserManagementUserForm from '~/modules/user-management/components/UserForm.vue';

definePageMeta({
  layout: 'admin',
  pageName: 'User Management'
});

const selectedUser = ref(null);
const { fetchUsers, getCurrentUserRole, error } = useUsers();
const showStats = ref(true);

const currentUserRole = computed(() => getCurrentUserRole());

const canViewStats = computed(() => ['admin', 'manager'].includes(currentUserRole.value));
const canCreateOrEditUsers = computed(() => ['admin', 'manager'].includes(currentUserRole.value));

const editUser = (user) => {
  if (canCreateOrEditUsers.value) {
    selectedUser.value = user;
  }
};

const handleUserUpdated = async () => {
  selectedUser.value = null;
  await fetchUsers();
  handleUserChange();
};

const handleUserChange = async () => {
  await fetchUsers();
  // Refresh stats by toggling showStats
  showStats.value = false;
  setTimeout(() => {
    showStats.value = true;
  }, 0);
};

const handleCancel = () => {
  selectedUser.value = null;
};

// Fetch users when the component is mounted
fetchUsers();
</script>