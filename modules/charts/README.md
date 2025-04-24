# Nuxt DaisyUI Charts

A modern, responsive chart library for Nuxt.js, built with DaisyUI styling. This module provides beautiful, interactive charts that automatically adapt to your DaisyUI theme.

## Features

- 📊 Three chart types: Line, Bar, and Pie charts
- 🎨 Seamless DaisyUI theme integration
- 📱 Fully responsive design
- 💡 Interactive tooltips
- ✨ Smooth animations
- 🌗 Light/Dark mode support

## Installation

```bash
# npm
npm install nuxt-daisyui-charts

# yarn
yarn add nuxt-daisyui-charts

# pnpm
pnpm add nuxt-daisyui-charts
```

## Setup

Add the module to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-daisyui-charts'
  ],
  daisyuiCharts: {
    // optional configuration
    prefix: 'Chart' // default prefix for components
  }
})
```

## Usage

### Line Chart

```vue
<template>
  <LineChart
    :data="[
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 120 }
    ]"
    title="Monthly Revenue"
    lineColor="primary"
  />
</template>
```

#### Props

- `data`: Array of objects with `label` and `value` properties
- `title`: (optional) Chart title
- `lineColor`: (optional) DaisyUI color class (default: 'primary')
- `width`: (optional) Chart width in pixels (default: 600)
- `height`: (optional) Chart height in pixels (default: 400)
- `padding`: (optional) Chart padding in pixels (default: 40)

### Bar Chart

```vue
<template>
  <BarChart
    :data="[
      { label: 'Product A', value: 300 },
      { label: 'Product B', value: 450 },
      { label: 'Product C', value: 280 }
    ]"
    title="Product Sales"
    barColor="secondary"
  />
</template>
```

#### Props

- `data`: Array of objects with `label` and `value` properties
- `title`: (optional) Chart title
- `barColor`: (optional) DaisyUI color class (default: 'primary')
- `width`: (optional) Chart width in pixels (default: 600)
- `height`: (optional) Chart height in pixels (default: 400)
- `padding`: (optional) Chart padding in pixels (default: 40)

### Pie Chart

```vue
<template>
  <PieChart
    :data="[
      { label: 'Market 1', value: 35 },
      { label: 'Market 2', value: 25 },
      { label: 'Market 3', value: 40 }
    ]"
    title="Market Share"
  />
</template>
```

#### Props

- `data`: Array of objects with `label` and `value` properties
- `title`: (optional) Chart title
- `width`: (optional) Chart width in pixels (default: 600)
- `height`: (optional) Chart height in pixels (default: 400)
- `colors`: (optional) Array of DaisyUI color classes (default: ['primary', 'secondary', 'accent', 'info', 'success', 'warning'])

## Features

### Responsive Design
All charts are fully responsive and will adapt to their container size while maintaining proper aspect ratios.

### Theme Integration
Charts automatically use your DaisyUI theme colors and adapt to light/dark mode changes.

### Interactive Elements
- Hover effects on data points and bars
- Tooltips showing detailed information
- Smooth transitions and animations

### Accessibility
Charts include proper ARIA labels and semantic HTML for better accessibility.

## Demo

Check out the demo page at `/charts/demo` to see all chart types in action.

## License

MIT
