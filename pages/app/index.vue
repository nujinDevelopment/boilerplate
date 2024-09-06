<template>
  <div class="drawer min-h-screen bg-base-200 lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <!-- content -->
    <main class="drawer-content">
      <div class="grid grid-cols-12 grid-rows-[min-content] gap-y-12 p-4 lg:gap-x-12 lg:p-10">
        <!-- header -->
        <header class="col-span-12 flex items-center gap-2 lg:gap-4">
          <label for="my-drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
          <div class="grow">
            <h1 class="lg:text-2xl lg:font-light">Dashboard</h1>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              class="input input-sm rounded-full max-sm:w-24" />
          </div>
          <!-- dropdown -->
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
              <li>
                <a class="gap-4">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <img src="https://picsum.photos/80/80?1" alt="User Avatar" />
                    </div>
                  </div>
                  <span>
                    <b>New message</b>
                    <br />
                    Alice: Hi, did you get my files?
                  </span>
                </a>
              </li>
              <li>
                <a class="gap-4">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <img src="https://picsum.photos/80/80?2" alt="User Avatar" />
                    </div>
                  </div>
                  <span>
                    <b>Reminder</b>
                    <br />
                    Your meeting is at 10am
                  </span>
                </a>
              </li>
              <li>
                <a class="gap-4">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <img src="https://picsum.photos/80/80?3" alt="User Avatar" />
                    </div>
                  </div>
                  <span>
                    <b>New payment</b>
                    <br />
                    Received $2500 from John Doe
                  </span>
                </a>
              </li>
              <li>
                <a class="gap-4">
                  <div class="avatar">
                    <div class="w-8 rounded-full">
                      <img src="https://picsum.photos/80/80?4" alt="User Avatar" />
                    </div>
                  </div>
                  <span>
                    <b>New payment</b>
                    <br />
                    Received $1900 from Alice
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <!-- /dropdown -->
          <!-- dropdown -->
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
              <li><a>Logout</a></li>
            </ul>
          </div>
          <!-- /dropdown -->
        </header>
        <!-- /header -->

        <!-- stats -->
        <section class="stats stats-vertical col-span-12 w-full shadow-sm xl:stats-horizontal">
          <div class="stat">
            <div class="stat-title">Total Page Views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-title">Total Page Views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-title">Total Page Views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>

          <div class="stat">
            <div class="stat-title">Total Page Views</div>
            <div class="stat-value">89,400</div>
            <div class="stat-desc">21% more than last month</div>
          </div>
        </section>
        <!-- /stats -->
        <!-- card -->
        <section class="card col-span-12 overflow-hidden bg-base-100 shadow-sm xl:col-span-6">
          <div class="card-body grow-0">
            <h2 class="card-title">
              <a class="link-hover link">Transactions</a>
            </h2>
          </div>
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <tbody>
                <tr>
                  <td>Cy Ganderton</td>
                  <td>Feb 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-success">
                      <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                    </svg>
                    180 USD
                  </td>
                </tr>
                <tr>
                  <td>Hart Hagerty</td>
                  <td>Sep 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-success">
                      <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                    </svg>
                    250 USD
                  </td>
                </tr>
                <tr>
                  <td>Jim Hagerty</td>
                  <td>Sep 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-success">
                      <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                    </svg>
                    250 USD
                  </td>
                </tr>
                <tr>
                  <td>Hart Hagerty</td>
                  <td>Sep 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-error">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z" />
                    </svg>
                    250 USD
                  </td>
                </tr>
                <tr>
                  <td>Hart Hagerty</td>
                  <td>Sep 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-error">
                      <path d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z" />
                    </svg>
                    250 USD
                  </td>
                </tr>
                <tr>
                  <td>Brice Swyre</td>
                  <td>Jul 2nd</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="inline-block h-5 w-5 text-success">
                      <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clip-rule="evenodd" />
                    </svg>
                    320 USD
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <!-- /card -->
        <!-- card -->
        <section class="card col-span-12 bg-primary text-primary-content shadow-sm xl:col-span-6">
          <div class="card-body pb-0">
            <h2 class="card-title">21,500 USD</h2>
            <a class="link-hover link text-xs">Revenue report →</a>
          </div>
          <div class="h-full w-full p-4 pt-0 [--shape-color:oklch(var(--pc))]">
            <!-- Replace tc-column with a chart component or implement your own -->
            <div class="h-40 w-full bg-primary-focus"></div>
          </div>
        </section>
        <!-- /card -->
        <!-- Add more sections here as needed -->
      </div>
    </main>
    <!-- /content -->
    <aside class="drawer-side z-10">
      <label for="my-drawer" class="drawer-overlay"></label>
      <!-- sidebar menu -->
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
          <li>
            <a class="active">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
              Users
            </a>
          </li>
          <li>
            <details>
              <summary>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Products
              </summary>
              <ul>
                <li><a>All Products</a></li>
                <li><a>Add New</a></li>
                <li><a>Categories</a></li>
                <li><a>Tags</a></li>
                <li><a>Reports</a></li>
                <li><a>Archive</a></li>
              </ul>
            </details>
          </li>
          <!-- Add more menu items here -->
        </ul>
      </nav>
      <!-- /sidebar menu -->
    </aside>
  </div>
</template>

<script setup>
// Add any necessary imports here

// Add any necessary component logic here
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>