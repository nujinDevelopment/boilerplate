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

          <!-- Bars -->
          <g class="bars">
            <rect
              v-for="(bar, index) in scaledBars"
              :key="index"
              :x="bar.x"
              :y="bar.y"
              :width="barWidth"
              :height="bar.height"
              :class="[
                'opacity-90 hover:opacity-100 transition-all duration-300',
                {'fill-primary': !barColor || barColor === 'primary'},
                {'fill-secondary': barColor === 'secondary'},
                {'fill-accent': barColor === 'accent'},
                {'fill-info': barColor === 'info'},
                {'fill-success': barColor === 'success'},
                {'fill-warning': barColor === 'warning'}
              ]"
              @mouseenter="handleBarHover(index, $event)"
              @mouseleave="handleBarLeave"
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
import { ref, computed, onMounted } from 'vue'

interface Props {
  data: { label: string; value: number }[]
  title?: string
  barColor?: string
  width?: number
  height?: number
  padding?: number
}

const props = withDefaults(defineProps<Props>(), {
  width: 600,
  height: 400,
  padding: 40,
  barColor: 'primary'
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
const minValue = computed(() => Math.min(0, ...props.data.map(d => d.value))) // Ensure we include 0

const barWidth = computed(() => {
  const availableWidth = props.width - 2 * props.padding
  const gap = availableWidth * 0.1 / (props.data.length - 1)
  return (availableWidth - (gap * (props.data.length - 1))) / props.data.length
})

const scale = computed(() => {
  const yRange = maxValue.value - minValue.value
  return {
    y: (props.height - 2 * props.padding) / yRange
  }
})

const scaledBars = computed(() => {
  return props.data.map((point, index) => {
    const x = props.padding + index * (barWidth.value + (props.width - 2 * props.padding) * 0.1 / (props.data.length - 1))
    const height = (point.value - minValue.value) * scale.value.y
    const y = props.height - props.padding - height
    return { x, y, height }
  })
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
  ).reverse()
})

// Methods
const getXPosition = (index: number) => 
  props.padding + index * (barWidth.value + (props.width - 2 * props.padding) * 0.1 / (props.data.length - 1)) + barWidth.value / 2

const getYPosition = (index: number) => 
  props.padding + index * (props.height - 2 * props.padding) / (yLabels.value.length - 1)

// Event handlers
const handleBarHover = (index: number, event: MouseEvent) => {
  if (!chartContainer.value) return

  tooltipData.value = props.data[index]
  const bar = scaledBars.value[index]
  tooltipStyle.value = {
    left: `${bar.x + barWidth.value / 2}px`,
    top: `${bar.y - 40}px`
  }
  showTooltip.value = true
}

const handleBarLeave = () => {
  showTooltip.value = false
}

// Lifecycle
onMounted(() => {
  // Add any necessary event listeners
})
</script>

<style scoped>
.tooltip {
  transform: translateX(-50%);
  z-index: 10;
}
</style>
