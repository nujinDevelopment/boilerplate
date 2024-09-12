<template>
  <aside class="drawer-side z-10">
    <label for="my-drawer" class="drawer-overlay"></label>
    <nav class="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
      <NuxtLink class="mx-4 flex items-center gap-2 font-black" to="/">
        <svg class="fill-base-content w-12 h-12" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 512 512">
          <g>
            <g>
              <path d="m365.5,191.5v-106.7c0-7.2-3.8-13.8-9.9-17.5l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.1-3.7 9.9-10.3 9.9-17.5z"/>
              <path d="m220,303l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89.1,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0-7.2-3.7-13.8-9.9-17.5z"/>
              <path d="m491.1,302.9l-89-53.4c-6.5-3.9-14.5-3.9-21,0l-89.1,53.4c-6.2,3.7-9.9,10.3-9.9,17.5v106.7c0,7.2 3.8,13.8 9.9,17.5l89,53.4c9.4,5.4 17.2,2.5 21,0l89-53.4c6.2-3.7 9.9-10.3 9.9-17.5v-106.7c0.1-7.2-3.7-13.8-9.8-17.5z"/>
            </g>
          </g>
        </svg>
        <h1 class="font-normal text-xl">nujin</h1>
      </NuxtLink>
      <ul class="menu pt-16">
        <li v-for="(item, index) in filteredMenuItems" :key="index">
          <template v-if="item.subItems">
            <details>
              <summary>
                <component :is="item.icon" class="h-5 w-5" />
                {{ item.label }}
              </summary>
              <ul>
                <li v-for="(subItem, subIndex) in item.subItems" :key="subIndex">
                  <a>{{ subItem }}</a>
                </li>
              </ul>
            </details>
          </template>
          <NuxtLink v-else :to="item.to" :class="{ active: isActive(item) }">
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { defineComponent, h, computed } from 'vue';
import { useRoute } from '#imports';

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

const route = useRoute();

// Simulating user role - replace this with actual user role logic
const userRole = 'admin'; // Can be 'admin', 'manager', or 'user'

const menuItems = [
  { label: 'Dashboard', icon: IconHome, to: '/app/', roles: ['admin', 'manager', 'user'] },
  { label: 'Users', icon: IconUser, to: '/app/users', roles: ['admin', 'manager'] },
  { 
    label: 'Projects', 
    icon: IconProject,
    subItems: ['All Projects', 'Add New', 'Categories', 'Tags', 'Reports', 'Archive'],
    roles: ['admin', 'manager', 'user']
  },
  { label: 'Settings', icon: IconSettings, to: '/app/settings', roles: ['admin', 'manager', 'user'] },
];

const filteredMenuItems = computed(() => {
  return menuItems.filter(item => item.roles.includes(userRole));
});

const isActive = (item) => {
  if (item.to === route.path) {
    return true;
  }
};
</script>