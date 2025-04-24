<template>
  <div class="drawer lg:drawer-open">
    <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
    
    <!-- Drawer Content -->
    <div class="drawer-content min-h-screen bg-base-200">
      <!-- Top Navigation -->
      <div class="navbar bg-base-100 shadow-lg sticky top-0 z-30">
        <div class="flex-none lg:hidden">
          <label for="dashboard-drawer" class="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </label>
        </div>
        <div class="flex-1">
          <h1 class="text-2xl font-bold px-4">Enterprise Analytics Dashboard</h1>
        </div>
        <div class="flex-none gap-2">
          <div class="form-control">
            <div class="input-group">
              <select class="select select-bordered">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
              <button class="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="p-6 space-y-6">
        <!-- Breadcrumbs -->
        <div class="text-sm breadcrumbs">
          <ul>
            <li><a>Home</a></li>
            <li><a>Analytics</a></li>
            <li>Dashboard</li>
          </ul>
        </div>

        <!-- Quick Actions -->
        <div class="flex flex-wrap gap-4 mb-6">
          <button class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
            Generate Report
          </button>
          <button class="btn btn-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
            </svg>
            New Project
          </button>
          <button class="btn btn-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Share Insights
          </button>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="stats shadow bg-primary text-primary-content">
            <div class="stat">
              <div class="stat-title">Revenue</div>
              <div class="stat-value">$2.4M</div>
              <div class="stat-desc">↗︎ 12% from last month</div>
            </div>
          </div>
          
          <div class="stats shadow bg-secondary text-secondary-content">
            <div class="stat">
              <div class="stat-title">New Customers</div>
              <div class="stat-value">486</div>
              <div class="stat-desc">↗︎ 8% from last month</div>
            </div>
          </div>
          
          <div class="stats shadow bg-accent text-accent-content">
            <div class="stat">
              <div class="stat-title">Active Projects</div>
              <div class="stat-value">142</div>
              <div class="stat-desc">↘︎ 3% from last month</div>
            </div>
          </div>
          
          <div class="stats shadow bg-info text-info-content">
            <div class="stat">
              <div class="stat-title">Customer Satisfaction</div>
              <div class="stat-value">94%</div>
              <div class="stat-desc">↗︎ 2% from last month</div>
            </div>
          </div>
        </div>

        <!-- Revenue and Sales Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Revenue Trends</h2>
              <LineChart
                :data="revenueData"
                title="Monthly Revenue"
                lineColor="primary"
              />
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Sales by Product Category</h2>
              <BarChart
                :data="salesData"
                title="Product Sales"
                barColor="secondary"
              />
            </div>
          </div>
        </div>

        <!-- Department Performance -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Department Budget Allocation</h2>
              <PieChart
                :data="budgetData"
                title="Budget Distribution"
              />
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Team Performance</h2>
              <BarChart
                :data="teamData"
                title="Team Metrics"
                barColor="accent"
              />
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Project Status</h2>
              <PieChart
                :data="projectData"
                title="Project Distribution"
              />
            </div>
          </div>
        </div>

        <!-- Market Analysis -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Market Share</h2>
              <PieChart
                :data="marketShareData"
                title="Market Distribution"
              />
            </div>
          </div>

          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Customer Demographics</h2>
              <BarChart
                :data="demographicsData"
                title="Age Groups"
                barColor="info"
              />
            </div>
          </div>
        </div>

        <!-- Additional Insights -->
        <div class="grid grid-cols-1 gap-6">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title">Customer Satisfaction Trends</h2>
              <LineChart
                :data="satisfactionData"
                title="Monthly CSAT Score"
                lineColor="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Drawer Side -->
    <div class="drawer-side">
      <label for="dashboard-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <div class="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
        <!-- Sidebar content -->
        <div class="flex flex-col h-full">
          <!-- Logo -->
          <div class="flex items-center gap-2 px-2 pt-2 pb-6">
            <div class="avatar placeholder">
              <div class="bg-primary text-primary-content rounded-full w-10">
                <span class="text-xl">N</span>
              </div>
            </div>
            <span class="text-xl font-bold">Nujin Analytics</span>
          </div>

          <!-- Navigation -->
          <ul class="menu menu-lg rounded-box">
            <li>
              <h2 class="menu-title">Overview</h2>
              <ul>
                <li><a class="active">Dashboard</a></li>
                <li><a>Reports</a></li>
                <li><a>Analytics</a></li>
              </ul>
            </li>
            <li>
              <h2 class="menu-title">Departments</h2>
              <ul>
                <li><a>Sales</a></li>
                <li><a>Marketing</a></li>
                <li><a>Operations</a></li>
                <li><a>Finance</a></li>
              </ul>
            </li>
            <li>
              <h2 class="menu-title">Settings</h2>
              <ul>
                <li><a>Preferences</a></li>
                <li><a>Notifications</a></li>
              </ul>
            </li>
          </ul>

          <!-- User Profile -->
          <div class="mt-auto border-t border-base-300 pt-4">
            <div class="flex items-center gap-4 px-2">
              <div class="avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                  <span>JD</span>
                </div>
              </div>
              <div>
                <div class="font-bold">John Doe</div>
                <div class="text-sm opacity-70">CEO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Revenue Data
const revenueData = [
  { label: 'Jan', value: 1200000 },
  { label: 'Feb', value: 1500000 },
  { label: 'Mar', value: 1800000 },
  { label: 'Apr', value: 1600000 },
  { label: 'May', value: 2100000 },
  { label: 'Jun', value: 2400000 }
]

// Sales Data
const salesData = [
  { label: 'Electronics', value: 450000 },
  { label: 'Software', value: 680000 },
  { label: 'Services', value: 820000 },
  { label: 'Hardware', value: 590000 },
  { label: 'Support', value: 320000 }
]

// Budget Data
const budgetData = [
  { label: 'R&D', value: 35 },
  { label: 'Marketing', value: 25 },
  { label: 'Operations', value: 20 },
  { label: 'Sales', value: 15 },
  { label: 'Admin', value: 5 }
]

// Team Performance Data
const teamData = [
  { label: 'Development', value: 92 },
  { label: 'Marketing', value: 88 },
  { label: 'Sales', value: 95 },
  { label: 'Support', value: 87 },
  { label: 'Operations', value: 91 }
]

// Project Status Data
const projectData = [
  { label: 'Completed', value: 45 },
  { label: 'In Progress', value: 35 },
  { label: 'Planning', value: 20 }
]

// Market Share Data
const marketShareData = [
  { label: 'Our Company', value: 35 },
  { label: 'Competitor A', value: 28 },
  { label: 'Competitor B', value: 22 },
  { label: 'Others', value: 15 }
]

// Demographics Data
const demographicsData = [
  { label: '18-24', value: 15 },
  { label: '25-34', value: 32 },
  { label: '35-44', value: 28 },
  { label: '45-54', value: 18 },
  { label: '55+', value: 7 }
]

// Customer Satisfaction Data
const satisfactionData = [
  { label: 'Jan', value: 89 },
  { label: 'Feb', value: 91 },
  { label: 'Mar', value: 90 },
  { label: 'Apr', value: 92 },
  { label: 'May', value: 93 },
  { label: 'Jun', value: 94 }
]
</script>
