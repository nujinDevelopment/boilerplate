<template>
  <div class="p-8 space-y-8">
    <h1 class="text-3xl font-bold text-base-content mb-8">DaisyUI Charts Demo</h1>

    <!-- Line Chart Demo -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-base-content">Line Chart</h2>
      <LineChart
        :data="lineData"
        title="Monthly Revenue"
        lineColor="primary"
      />
    </div>

    <!-- Bar Chart Demo -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-base-content">Bar Chart</h2>
      <BarChart
        :data="barData"
        title="Product Sales"
        barColor="secondary"
      />
    </div>

    <!-- Pie Chart Demo -->
    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-base-content">Pie Chart</h2>
      <PieChart
        :data="pieData"
        title="Market Share"
      />
    </div>

    <!-- Usage Examples -->
    <div class="mt-12 space-y-6">
      <h2 class="text-2xl font-bold text-base-content">Usage Examples</h2>
      
      <div class="mockup-code">
        <pre><code>// Line Chart
&lt;LineChart
  :data="[
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 120 }
  ]"
  title="Monthly Revenue"
  lineColor="primary"
/&gt;

// Bar Chart
&lt;BarChart
  :data="[
    { label: 'Product A', value: 300 },
    { label: 'Product B', value: 450 },
    { label: 'Product C', value: 280 }
  ]"
  title="Product Sales"
  barColor="secondary"
/&gt;

// Pie Chart
&lt;PieChart
  :data="[
    { label: 'Market 1', value: 35 },
    { label: 'Market 2', value: 25 },
    { label: 'Market 3', value: 40 }
  ]"
  title="Market Share"
/&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const lineData = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 150 },
  { label: 'Mar', value: 120 },
  { label: 'Apr', value: 180 },
  { label: 'May', value: 160 },
  { label: 'Jun', value: 220 }
]

const barData = [
  { label: 'Product A', value: 300 },
  { label: 'Product B', value: 450 },
  { label: 'Product C', value: 280 },
  { label: 'Product D', value: 390 },
  { label: 'Product E', value: 320 }
]

const pieData = [
  { label: 'Market 1', value: 35 },
  { label: 'Market 2', value: 25 },
  { label: 'Market 3', value: 40 }
]
</script>
