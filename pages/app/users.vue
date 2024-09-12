<template>
  <div class="p-4">
    <UserManagementUserStats v-if="showStats" class="mb-6" />
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div class="xl:col-span-2">
        <UserManagementUserList @edit-user="editUser" />
      </div>
      <div>
        <UserManagementUserForm
          :user="selectedUser"
          @user-updated="handleUserUpdated"
          @user-created="handleUserChange"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import UserManagementUserStats from '~/modules/user-management/components/UserStats.vue';
import UserManagementUserList from '~/modules/user-management/components/UserList.vue';
import UserManagementUserForm from '~/modules/user-management/components/UserForm.vue';

definePageMeta({
  layout: 'app',
  pageName: 'User Management'
});

// This page manages users with role-based access control (admin, manager, user)
const selectedUser = ref(null);
const { fetchUsers } = useUsers();
const showStats = ref(true);

const editUser = (user) => {
  selectedUser.value = user;
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
</script>