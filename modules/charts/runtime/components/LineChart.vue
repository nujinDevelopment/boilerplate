<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 v-if="title" class="card-title text-base-content">{{ title }}</h2>
      
      <!-- Chart Container -->
      <div class="relative w-full h-64" ref="chartContainer">
        <!-- SVG Chart -->
        <svg class="w-full h-full" :viewBox="`0 0 ${width} ${height}`" ref="chartSvg">
          <!-- Grid Lines -->
          <g class="grid-lines opacity-10">
            <line
              v-for="(line, index) in horizontalGridLines"
              :key="'h' + index"
              :x1="padding"
              :y1="line"
              :x2="width - padding"
              :y2="line"
              stroke="currentColor"
              stroke-dasharray="4,4"
            />
          </g>

          <!-- Data Line -->
          <path
            :d="linePath"
            fill="none"
            :class="[
              `stroke-${lineColor || 'primary'}`,
              'stroke-2',
              'transition-all duration-300 ease-in-out'
            ]"
          />

          <!-- Data Points -->
          <g class="data-points">
            <circle
              v-for="(point, index) in scaledPoints"
              :key="index"
              :cx="point.x"
              :cy="point.y"
              r="4"
              :class="[
                'transition-all duration-300 ease-in-out',
                'fill-base-100 stroke-2',
                {'stroke-primary': !lineColor || lineColor === 'primary'},
                {'stroke-secondary': lineColor === 'secondary'},
                {'stroke-accent': lineColor === 'accent'},
                {'stroke-info': lineColor === 'info'},
                {'stroke-success': lineColor === 'success'},
                {'stroke-warning': lineColor === 'warning'}
              ]"
            />
          </g>

          <!-- Axis Labels -->
          <g class="axis-labels fill-base-content text-sm">
            <text
              v-for="(label, index) in xLabels"
              :key="'x' + index"
              :x="getXPosition(index)"
              :y="height - padding/3"
              text-anchor="middle"
            >
              {{ label }}
            </text>
            <text
              v-for="(label, index) in yLabels"
              :key="'y' + index"
              :x="padding/2"
              :y="getYPosition(index)"
              text-anchor="end"
              alignment-baseline="middle"
            >
              {{ label }}
            </text>
          </g>
        </svg>

        <!-- Tooltip -->
        <div
          v-if="showTooltip"
          class="tooltip absolute bg-base-200 p-2 rounded-lg shadow-lg text-base-content"
          :style="tooltipStyle"
        >
          <div class="font-semibold">{{ tooltipData.label }}</div>
          <div>{{ tooltipData.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  data: { label: string; value: number }[]
  title?: string
  lineColor?: string
  width?: number
  height?: number
  padding?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  height: 400,
  padding: 40,
  lineColor: 'primary'
})

// Refs
const chartContainer = ref<HTMLElement | null>(null)
const chartSvg = ref<SVGElement | null>(null)
const showTooltip = ref(false)
const tooltipData = ref({ label: '', value: 0 })
const tooltipStyle = ref({
  left: '0px',
  top: '0px'
})

// Computed
const maxValue = computed(() => Math.max(...props.data.map(d => d.value)))
const minValue = computed(() => Math.min(...props.data.map(d => d.value)))

const scale = computed(() => {
  const yRange = maxValue.value - minValue.value
  return {
    x: (props.width - 2 * props.padding) / (props.data.length - 1),
    y: (props.height - 2 * props.padding) / yRange
  }
})

const scaledPoints = computed(() => {
  return props.data.map((point, index) => ({
    x: props.padding + index * scale.value.x,
    y: props.height - props.padding - (point.value - minValue.value) * scale.value.y
  }))
})

const linePath = computed(() => {
  return scaledPoints.value.reduce((path, point, index) => {
    return path + (index === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`)
  }, '')
})

const horizontalGridLines = computed(() => {
  const count = 5
  const gap = (props.height - 2 * props.padding) / (count - 1)
  return Array(count).fill(0).map((_, i) => props.padding + i * gap)
})

const xLabels = computed(() => props.data.map(d => d.label))
const yLabels = computed(() => {
  const count = 5
  const gap = (maxValue.value - minValue.value) / (count - 1)
  return Array(count).fill(0).map((_, i) => 
    Math.round((minValue.value + i * gap) * 100) / 100
  )
})

// Methods
const getXPosition = (index: number) => props.padding + index * scale.value.x
const getYPosition = (index: number) => props.padding + index * (props.height - 2 * props.padding) / (yLabels.value.length - 1)

// Event handlers
const handleMouseMove = (event: MouseEvent) => {
  if (!chartContainer.value) return

  const rect = chartContainer.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  
  // Find closest point
  const closestPoint = scaledPoints.value.reduce((closest, point, index) => {
    const distance = Math.abs(point.x - x)
    if (distance < closest.distance) {
      return { distance, index }
    }
    return closest
  }, { distance: Infinity, index: 0 })

  tooltipData.value = props.data[closestPoint.index]
  tooltipStyle.value = {
    left: `${scaledPoints.value[closestPoint.index].x}px`,
    top: `${scaledPoints.value[closestPoint.index].y - 60}px`
  }
  showTooltip.value = true
}

const handleMouseLeave = () => {
  showTooltip.value = false
}

// Lifecycle
onMounted(() => {
  if (chartContainer.value) {
    chartContainer.value.addEventListener('mousemove', handleMouseMove)
    chartContainer.value.addEventListener('mouseleave', handleMouseLeave)
  }
})
</script>

<style scoped>
.tooltip {
  transform: translateX(-50%);
  z-index: 10;
}
</style>
