<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 v-if="title" class="card-title text-base-content">{{ title }}</h2>
      
      <!-- Chart Container -->
      <div class="relative w-full h-64" ref="chartContainer">
        <!-- SVG Chart -->
        <svg class="w-full h-full" :viewBox="`0 0 ${width} ${height}`" ref="chartSvg">
          <!-- Pie Segments -->
          <g :transform="`translate(${width/2}, ${height/2})`">
            <path
              v-for="(segment, index) in segments"
              :key="index"
              :d="segment.path"
              :class="[
                'opacity-90 hover:opacity-100 transition-all duration-300 cursor-pointer',
                {
                  'fill-primary': colors[index % colors.length] === 'primary',
                  'fill-secondary': colors[index % colors.length] === 'secondary',
                  'fill-accent': colors[index % colors.length] === 'accent',
                  'fill-info': colors[index % colors.length] === 'info',
                  'fill-success': colors[index % colors.length] === 'success',
                  'fill-warning': colors[index % colors.length] === 'warning'
                }
              ]"
              @mouseenter="handleSegmentHover(index, $event)"
              @mouseleave="handleSegmentLeave"
            />
          </g>
        </svg>

        <!-- Labels -->
        <div class="absolute top-0 right-0 p-4 space-y-2">
          <div
            v-for="(item, index) in data"
            :key="index"
            class="flex items-center gap-2 text-sm"
          >
            <div
              :class="[
                'w-3 h-3 rounded-sm',
                {
                  'bg-primary': colors[index % colors.length] === 'primary',
                  'bg-secondary': colors[index % colors.length] === 'secondary',
                  'bg-accent': colors[index % colors.length] === 'accent',
                  'bg-info': colors[index % colors.length] === 'info',
                  'bg-success': colors[index % colors.length] === 'success',
                  'bg-warning': colors[index % colors.length] === 'warning'
                }
              ]"
            ></div>
            <span class="text-base-content">{{ item.label }}</span>
          </div>
        </div>

        <!-- Tooltip -->
        <div
          v-if="showTooltip"
          class="tooltip absolute bg-base-200 p-2 rounded-lg shadow-lg text-base-content"
          :style="tooltipStyle"
        >
          <div class="font-semibold">{{ tooltipData.label }}</div>
          <div>{{ tooltipData.value }} ({{ tooltipData.percentage }}%)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  data: { label: string; value: number }[]
  title?: string
  width?: number
  height?: number
  colors?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  height: 400,
  colors: () => ['primary', 'secondary', 'accent', 'info', 'success', 'warning']
})

// Refs
const chartContainer = ref<HTMLElement | null>(null)
const chartSvg = ref<SVGElement | null>(null)
const showTooltip = ref(false)
const tooltipData = ref({ label: '', value: 0, percentage: 0 })
const tooltipStyle = ref({
  left: '0px',
  top: '0px'
})

// Computed
const total = computed(() => props.data.reduce((sum, item) => sum + item.value, 0))

const segments = computed(() => {
  const radius = Math.min(props.width, props.height) / 3
  let startAngle = 0
  
  return props.data.map(item => {
    const percentage = (item.value / total.value)
    const angle = percentage * Math.PI * 2
    const endAngle = startAngle + angle
    
    // Calculate SVG arc path
    const x1 = radius * Math.cos(startAngle)
    const y1 = radius * Math.sin(startAngle)
    const x2 = radius * Math.cos(endAngle)
    const y2 = radius * Math.sin(endAngle)
    
    const largeArcFlag = angle > Math.PI ? 1 : 0
    
    const path = `
      M 0 0
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `
    
    const segment = {
      path,
      startAngle,
      endAngle,
      percentage: Math.round(percentage * 100)
    }
    
    startAngle = endAngle
    return segment
  })
})

// Event handlers
const handleSegmentHover = (index: number, event: MouseEvent) => {
  if (!chartContainer.value) return

  const rect = chartContainer.value.getBoundingClientRect()
  const segment = segments.value[index]
  const radius = Math.min(props.width, props.height) / 3
  const angle = (segment.startAngle + segment.endAngle) / 2
  
  // Position tooltip at the middle of the segment
  const x = props.width/2 + Math.cos(angle) * radius * 0.7
  const y = props.height/2 + Math.sin(angle) * radius * 0.7
  
  tooltipData.value = {
    label: props.data[index].label,
    value: props.data[index].value,
    percentage: segment.percentage
  }
  
  tooltipStyle.value = {
    left: `${x}px`,
    top: `${y}px`
  }
  
  showTooltip.value = true
}

const handleSegmentLeave = () => {
  showTooltip.value = false
}

// Lifecycle
onMounted(() => {
  // Add any necessary event listeners
})
</script>

<style scoped>
.tooltip {
  transform: translate(-50%, -50%);
  z-index: 10;
}
</style>
