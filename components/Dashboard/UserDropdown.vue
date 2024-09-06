<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    // Redirect to login page after successful logout
    await router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
    // You might want to show an error message to the user here
  }
}
</script>

<template>
  <div class="dropdown-end dropdown z-10">
    <div tabindex="0" class="avatar btn btn-circle btn-ghost">
      <div class="w-10 rounded-full">
        <img src="https://picsum.photos/80/80?5" alt="User Avatar" />
      </div>
    </div>
    <ul
      tabindex="0"
      class="menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow-2xl">
      <li>
        <a>Profile</a>
      </li>
      <li>
        <a>
          Inbox
          <span class="badge badge-success">12</span>
        </a>
      </li>
      <li><a>Settings</a></li>
      <li><a @click="logout">Logout</a></li>
    </ul>
  </div>
</template>