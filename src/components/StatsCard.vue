<template>
  <div class="stats-card" :class="cardVariant">
    <div class="card-background">
      <div class="bg-pattern"></div>
      <div class="bg-glow"></div>
    </div>
    
    <div class="card-content">
      <div class="stats-header">
        <div class="stats-icon" :class="iconVariant">
          <i :class="icon"></i>
        </div>
        <div class="stats-meta">
          <span class="stats-category">{{ category }}</span>
          <div class="stats-trend" v-if="trend !== null">
            <i :class="[trendIcon, trendClass]"></i>
            <span class="trend-value">{{ Math.abs(trend) }}%</span>
          </div>
        </div>
      </div>
      
      <div class="stats-body">
        <div class="stats-value">
          <span class="value-main">{{ formattedValue }}</span>
          <span class="value-unit" v-if="unit">{{ unit }}</span>
        </div>
        <p class="stats-label">{{ label }}</p>
      </div>
      
      <div class="stats-footer" v-if="showChart || description">
        <div class="mini-chart" v-if="showChart" ref="chartRef"></div>
        <p class="stats-description" v-if="description">{{ description }}</p>
      </div>
    </div>
    
    <div class="card-shine"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'StatsCard',
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value)
    },
    trend: {
      type: Number,
      default: null
    },
    description: {
      type: String,
      default: ''
    },
    chartData: {
      type: Array,
      default: () => []
    },
    showChart: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const chartRef = ref(null)
    let chart = null

    const formattedValue = computed(() => {
      if (typeof props.value === 'number') {
        if (props.value >= 1000000) {
          return (props.value / 1000000).toFixed(1) + 'M'
        } else if (props.value >= 1000) {
          return (props.value / 1000).toFixed(1) + 'K'
        }
        return props.value.toLocaleString()
      }
      return props.value
    })

    const cardVariant = computed(() => `card-${props.variant}`)
    const iconVariant = computed(() => `icon-${props.variant}`)

    const trendClass = computed(() => {
      if (props.trend === null) return ''
      return props.trend >= 0 ? 'trend-positive' : 'trend-negative'
    })

    const trendIcon = computed(() => {
      if (props.trend === null) return ''
      return props.trend >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
    })

    const initChart = () => {
      if (!chartRef.value || !props.showChart || !props.chartData.length) return

      chart = echarts.init(chartRef.value)
      const option = {
        backgroundColor: 'transparent',
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          data: props.chartData.map((_, index) => index)
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [{
          data: props.chartData,
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: {
            width: 2,
            color: getChartColor()
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: getChartColor(0.4) },
              { offset: 1, color: getChartColor(0.1) }
            ])
          }
        }]
      }

      chart.setOption(option)
    }

    const getChartColor = (opacity = 1) => {
      const colors = {
        primary: `rgba(99, 102, 241, ${opacity})`,
        secondary: `rgba(139, 92, 246, ${opacity})`,
        success: `rgba(16, 185, 129, ${opacity})`,
        warning: `rgba(245, 158, 11, ${opacity})`,
        error: `rgba(239, 68, 68, ${opacity})`,
        info: `rgba(6, 182, 212, ${opacity})`
      }
      return colors[props.variant] || colors.primary
    }

    watch(() => props.chartData, () => {
      if (chart) {
        initChart()
      }
    }, { deep: true })

    onMounted(() => {
      initChart()
      window.addEventListener('resize', initChart)
    })

    return {
      chartRef,
      formattedValue,
      cardVariant,
      iconVariant,
      trendClass,
      trendIcon
    }
  }
}
</script>

<style scoped>
.stats-card {
  position: relative;
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 140px;
}

.stats-card:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.15);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  transition: opacity 0.3s ease;
}

.stats-card:hover .card-background {
  opacity: 0.15;
}

.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 80%, currentColor 2px, transparent 2px),
                    radial-gradient(circle at 80% 20%, currentColor 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.1;
}

.bg-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, currentColor 0%, transparent 70%);
  opacity: 0.05;
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.stats-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  box-shadow: var(--shadow-md);
}

.stats-meta {
  text-align: right;
}

.stats-category {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stats-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.trend-positive {
  color: var(--success-color);
}

.trend-negative {
  color: var(--error-color);
}

.stats-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.value-main {
  font-size: 2rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--text-light);
  line-height: 1;
}

.value-unit {
  font-size: 0.875rem;
  color: var(--text-dim);
  font-weight: 500;
}

.stats-label {
  font-size: 0.875rem;
  color: var(--text-dim);
  margin: 0;
  font-weight: 500;
}

.stats-footer {
  margin-top: 1rem;
}

.mini-chart {
  height: 40px;
  width: 100%;
  margin-bottom: 0.5rem;
}

.stats-description {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

.card-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.stats-card:hover .card-shine {
  left: 100%;
}

/* 主题变体 */
.card-primary {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--primary-color);
}

.card-primary:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-primary {
  background: var(--gradient-primary);
}

.card-secondary {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--secondary-color);
}

.card-secondary:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-secondary {
  background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
}

.card-success {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--success-color);
}

.card-success:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-success {
  background: var(--gradient-success);
}

.card-warning {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--warning-color);
}

.card-warning:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-warning {
  background: linear-gradient(135deg, var(--warning-color), var(--accent-color));
}

.card-error {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--error-color);
}

.card-error:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-error {
  background: linear-gradient(135deg, var(--error-color), var(--warning-color));
}

.card-info {
  background: var(--card-background);
  border-color: var(--card-border);
  color: var(--accent-color);
}

.card-info:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.icon-info {
  background: var(--gradient-accent);
}
</style>
