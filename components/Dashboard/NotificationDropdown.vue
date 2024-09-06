<template>
  <div class="dropdown dropdown-end z-10">
    <div tabindex="0" class="btn btn-circle btn-ghost">
      <div class="indicator">
        <span class="badge indicator-item badge-error badge-xs"></span>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content mt-3 w-80 rounded-box bg-base-100 p-2 shadow-2xl">
      <li v-for="(notification, index) in notifications" :key="index">
        <a class="gap-4">
          <div class="avatar">
            <div class="w-8 rounded-full">
              <img :src="notification.avatar" :alt="notification.name" />
            </div>
          </div>
          <span>
            <b>{{ notification.title }}</b>
            <br />
            {{ notification.message }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const notifications = [
  {
    avatar: 'https://picsum.photos/80/80?1',
    name: 'Alice',
    title: 'New message',
    message: 'Alice: Hi, did you get my files?'
  },
  {
    avatar: 'https://picsum.photos/80/80?2',
    name: 'System',
    title: 'Reminder',
    message: 'Your meeting is at 10am'
  },
  {
    avatar: 'https://picsum.photos/80/80?3',
    name: 'John Doe',
    title: 'New payment',
    message: 'Received $2500 from John Doe'
  },
  {
    avatar: 'https://picsum.photos/80/80?4',
    name: 'Alice',
    title: 'New payment',
    message: 'Received $1900 from Alice'
  }
];
</script>