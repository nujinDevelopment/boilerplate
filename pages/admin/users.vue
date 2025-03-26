<template>
  <div class="space-y-6">
    <!-- Error Alert -->
    <div v-if="error" class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ error }}</span>
      </div>
    </div>

    <!-- Stats Section -->
    <div v-if="showStats && canViewStats" class="w-full">
      <UserManagementUserStats />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- User List -->
      <div class="xl:col-span-2">
        <UserManagementUserList @edit-user="editUser" />
      </div>

      <!-- User Form -->
      <div class="sticky top-4">
        <UserManagementUserForm
          v-if="canCreateOrEditUsers"
          :user="selectedUser"
          @user-updated="handleUserUpdated"
          @user-created="handleUserChange"
          @cancel="handleCancel"
        />
        <div v-else class="card bg-base-100 shadow">
          <div class="card-body">
            <div class="flex items-center gap-3 mb-4">
              <div class="bg-error/20 p-3 rounded-lg">
                <i class="fas fa-lock text-error text-xl"></i>
              </div>
              <h2 class="card-title text-2xl">Access Denied</h2>
            </div>
            <p class="text-base-content/70">You don't have permission to create or edit users. Please contact an administrator for access.</p>
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

interface UserMetadata {
  name?: string;
  role?: 'admin' | 'manager' | 'user';
}

interface User {
  id: string;
  email?: string;
  created_at?: string;
  last_sign_in_at?: string;
  banned?: boolean;
  user_metadata: UserMetadata;
  [key: string]: any;
}

definePageMeta({
  layout: 'admin',
  pageName: 'User Management'
});

const selectedUser = ref<User | undefined>();
const { fetchUsers, getCurrentUserRole, error } = useUsers();
const showStats = ref(true);

const currentUserRole = computed(() => getCurrentUserRole());

const canViewStats = computed(() => ['admin', 'manager'].includes(currentUserRole.value));
const canCreateOrEditUsers = computed(() => ['admin', 'manager'].includes(currentUserRole.value));

const editUser = (user: User) => {
  if (canCreateOrEditUsers.value) {
    selectedUser.value = user;
  }
};

const handleUserUpdated = async () => {
  selectedUser.value = undefined;
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
  selectedUser.value = undefined;
};

// Fetch users when the component is mounted
fetchUsers();
</script>
