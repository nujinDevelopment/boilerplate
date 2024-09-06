<template>
  <aside class="drawer-side z-10">
    <label for="my-drawer" class="drawer-overlay"></label>
    <nav class="flex min-h-screen w-72 flex-col gap-2 overflow-y-auto bg-base-100 px-6 py-10">
      <div class="mx-4 flex items-center gap-2 font-black">
        <svg
          width="32"
          height="32"
          viewBox="0 0 1024 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect x="256" y="670.72" width="512" height="256" rx="128" class="fill-base-content" />
          <circle cx="512" cy="353.28" r="256" class="fill-base-content" />
          <circle
            cx="512"
            cy="353.28"
            r="261"
            stroke="black"
            stroke-opacity="0.2"
            stroke-width="10" />
          <circle cx="512" cy="353.28" r="114.688" class="fill-base-100" />
        </svg>
        Daisy Corp
      </div>
      <ul class="menu">
        <li v-for="(item, index) in menuItems" :key="index">
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
          <a v-else :class="{ active: item.active }">
            <component :is="item.icon" class="h-5 w-5" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { defineComponent, h } from 'vue';

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

const IconProducts = defineComponent({
  render: () => h('svg', { xmlns: "http://www.w3.org/2000/svg", class: "h-5 w-5", viewBox: "0 0 20 20", fill: "currentColor" },
    [h('path', { d: "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" })]
  )
});

const menuItems = [
  { label: 'Dashboard', icon: IconHome, active: true },
  { label: 'Users', icon: IconUser },
  { 
    label: 'Products', 
    icon: IconProducts,
    subItems: ['All Products', 'Add New', 'Categories', 'Tags', 'Reports', 'Archive']
  },
  // Add more menu items here
];
</script>