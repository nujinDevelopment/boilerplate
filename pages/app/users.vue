<template>
  <div class="p-4">
    <UserManagementUserStats v-if="showStats" class="mb-6" />
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <UserManagementUserList 
          :users="users" 
          @edit-user="editUser" 
          @user-deleted="handleUserChange"
        />
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
import { ref, onMounted } from 'vue';
import { useUsers } from '~/modules/user-management/composables/useUsers';
import UserManagementUserStats from '~/modules/user-management/components/UserStats.vue';
import UserManagementUserList from '~/modules/user-management/components/UserList.vue';
import UserManagementUserForm from '~/modules/user-management/components/UserForm.vue';

definePageMeta({
  layout: 'app',
  pageName: 'User Management'
});

const selectedUser = ref(null);
const { users, fetchUsers } = useUsers();
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
  showStats.value = false;
  setTimeout(() => {
    showStats.value = true;
  }, 0);
};

const handleCancel = () => {
  selectedUser.value = null;
};

onMounted(async () => {
  console.log('Users page mounted, fetching users...');
  await fetchUsers();
});
</script>