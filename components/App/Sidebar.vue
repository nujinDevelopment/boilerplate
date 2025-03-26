<template>
  <aside class="drawer-side z-10">
    <label for="my-drawer" class="drawer-overlay"></label>
    <nav class="flex h-screen w-80 flex-col bg-base-100 text-base-content">
      <!-- Logo Section -->
      <div class="flex-none">
        <div class="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6">
          <NuxtLink class="flex items-center gap-3 transition-transform hover:scale-105" to="/">
            <svg class="w-10 h-10 fill-primary transition-colors duration-300" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g><g>
                <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
                <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
                <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
              </g></g>
            </svg>
            <div>
              <h1 class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">nujin</h1>
              <p class="text-xs text-base-content/60">Development Platform</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="flex-1 overflow-y-auto px-4 py-6">
        <ul class="menu menu-lg gap-2">
          <li v-for="(item, index) in filteredMenuItems" :key="index">
            <template v-if="item.subItems">
              <details class="group">
                <summary class="menu-title rounded-lg hover:bg-base-200 transition-all duration-200">
                  <component 
                    :is="item.icon" 
                    class="h-5 w-5 text-primary group-hover:text-primary-focus transition-colors duration-200" 
                  />
                  <span class="font-medium">{{ item.label }}</span>
                </summary>
                <ul class="menu-sub pl-6 mt-2 space-y-1">
                  <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                    <NuxtLink 
                      :to="subItem.to" 
                      class="rounded-lg transition-all duration-200 hover:bg-base-200"
                      :class="{ 'bg-primary/10 text-primary font-medium': isActive(subItem) }"
                    >
                      {{ subItem.label }}
                    </NuxtLink>
                  </li>
                </ul>
              </details>
            </template>
            <NuxtLink 
              v-else 
              :to="item.to" 
              class="rounded-lg group transition-all duration-200 hover:bg-base-200"
              :class="{ 'bg-primary/10 text-primary font-medium': isActive(item) }"
            >
              <component 
                :is="item.icon" 
                class="h-5 w-5 transition-colors duration-200"
                :class="isActive(item) ? 'text-primary' : 'text-base-content/70 group-hover:text-primary'" 
              />
              <span>{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- User Section -->
      <div class="flex-none p-4 border-t border-base-200">
        <div class="flex items-center gap-4 px-2">
          <div class="avatar placeholder">
            <div class="w-10 h-10 rounded-full bg-primary/10">
              <span class="text-primary text-lg">{{ userInitials }}</span>
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">{{ userName }}</p>
            <p class="text-xs text-base-content/60 capitalize">{{ userRole }}</p>
          </div>
          <button class="btn btn-ghost btn-circle btn-sm hover:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { defineComponent, h, computed } from 'vue';
import { useRoute } from '#imports';
import { useUsers } from '~/modules/user-management/composables/useUsers';

type UserRole = 'admin' | 'manager' | 'user';

interface MenuItem {
  label: string;
  icon: ReturnType<typeof defineComponent>;
  to: string;
  roles: UserRole[];
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  label: string;
  to: string;
  roles: UserRole[];
}

// Icons
const IconHome = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { d: "M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" })]
  )
});

const IconUser = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { 'fill-rule': "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", 'clip-rule': "evenodd" })]
  )
});

const IconProject = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" })]
  )
});

const IconSettings = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { 'fill-rule': "evenodd", d: "M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z", 'clip-rule': "evenodd" })]
  )
});

const IconLogs = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { 'fill-rule': "evenodd", d: "M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2V7H7v5H5V5z", 'clip-rule': "evenodd" })]
  )
});

const route = useRoute();
const { getCurrentUserRole } = useUsers();

// Menu Items Configuration
const menuItems: MenuItem[] = [
  { label: 'Dashboard', icon: IconHome, to: '/app/', roles: ['admin', 'manager', 'user'] },
  { 
    label: 'Projects', 
    icon: IconProject,
    to: '/app/projects',
    subItems: [
      { label: 'All Projects', to: '/app/projects', roles: ['admin', 'manager', 'user'] },
      { label: 'Create Project', to: '/app/projects/create', roles: ['admin', 'manager'] },
    ],
    roles: ['admin', 'manager', 'user']
  },
  { label: 'Settings', icon: IconSettings, to: '/app/settings', roles: ['admin', 'manager', 'user'] },
  { label: 'Users', icon: IconUser, to: '/admin/users', roles: ['admin', 'manager'] },
  { label: 'Logs', icon: IconLogs, to: '/admin/logs', roles: ['admin'] },
];

// Computed Properties
const filteredMenuItems = computed(() => {
  const userRole = getCurrentUserRole() as UserRole;
  return menuItems.map(item => {
    if (item.subItems) {
      return {
        ...item,
        subItems: item.subItems.filter(subItem => subItem.roles.includes(userRole))
      };
    }
    return item;
  }).filter(item => item.roles.includes(userRole));
});

const userRole = computed(() => getCurrentUserRole());
const userName = computed(() => 'John Doe'); // Replace with actual user name from your auth system
const userInitials = computed(() => userName.value.split(' ').map(n => n[0]).join(''));

const isActive = (item: MenuItem | SubMenuItem): boolean => {
  if (item.to === route.path) {
    return true;
  }
  if ('subItems' in item && item.subItems) {
    return item.subItems.some(subItem => subItem.to === route.path);
  }
  return false;
};
</script>

<style scoped>
/* Custom Scrollbar */
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-primary/20 rounded-full hover:bg-primary/30 transition-colors;
}

/* Menu Animations */
.menu-title {
  @apply transition-all duration-200;
}

.menu-sub {
  @apply transition-all duration-200;
}

details[open] .menu-title {
  @apply bg-primary/10 text-primary;
}

/* Avatar Animation */
.avatar {
  @apply transition-transform duration-200 hover:scale-105;
}
</style>
