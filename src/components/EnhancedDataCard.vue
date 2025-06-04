<template>
  <div class="enhanced-data-card" :class="cardClass">
    <div class="card-background"></div>
    <div class="card-content">
      <div class="card-header">
        <div class="icon-wrapper" :class="iconClass">
          <i :class="icon"></i>
        </div>
        <div class="card-info">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-subtitle">{{ subtitle }}</p>
        </div>
      </div>
      
      <div class="card-body">
        <div class="main-value">
          <span class="value-number">{{ formattedValue }}</span>
          <span class="value-unit" v-if="unit">{{ unit }}</span>
        </div>
        
        <div class="trend-indicator" v-if="trend">
          <div class="trend-wrapper" :class="trendClass">
            <i :class="trendIcon"></i>
            <span class="trend-value">{{ trend }}%</span>
          </div>
          <span class="trend-label">{{ trendLabel }}</span>
        </div>
      </div>
      
      <div class="card-footer" v-if="showChart">
        <div class="mini-chart" ref="chartRef"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'EnhancedDataCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      required: true
    },
    unit: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'primary', // primary, success, warning, error
      validator: value => ['primary', 'success', 'warning', 'error'].includes(value)
    },
    trend: {
      type: Number,
      default: null
    },
    trendLabel: {
      type: String,
      default: '较上月'
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
        return props.value.toLocaleString()
      }
      return props.value
    })

    const cardClass = computed(() => `card-${props.type}`)
    const iconClass = computed(() => `icon-${props.type}`)

    const trendClass = computed(() => {
      if (props.trend === null) return ''
      return props.trend >= 0 ? 'trend-up' : 'trend-down'
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
          top: 5,
          left: 5,
          right: 5,
          bottom: 5
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
              { offset: 0, color: getChartColor(0.3) },
              { offset: 1, color: getChartColor(0.05) }
            ])
          }
        }]
      }

      chart.setOption(option)
    }

    const getChartColor = (opacity = 1) => {
      const colors = {
        primary: `rgba(99, 102, 241, ${opacity})`,
        success: `rgba(16, 185, 129, ${opacity})`,
        warning: `rgba(245, 158, 11, ${opacity})`,
        error: `rgba(239, 68, 68, ${opacity})`
      }
      return colors[props.type] || colors.primary
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
      cardClass,
      iconClass,
      trendClass,
      trendIcon
    }
  }
}
</script>

<style scoped>
.enhanced-data-card {
  position: relative;
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(20px);
  background: var(--card-background);
  border: 1px solid var(--card-border);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  min-height: 160px;
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  transition: opacity 0.3s ease;
}

.enhanced-data-card:hover {
  transform: translateY(-4px);
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.enhanced-data-card:hover .card-background {
  opacity: 0.1;
}

.card-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  flex-shrink: 0;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 0.25rem 0;
}

.card-subtitle {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.value-number {
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

.trend-indicator {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trend-wrapper {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.trend-up {
  color: var(--success-color);
}

.trend-down {
  color: var(--error-color);
}

.trend-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.card-footer {
  margin-top: 1rem;
}

.mini-chart {
  height: 40px;
  width: 100%;
}

/* 主题变体 */
.card-primary .card-background {
  background: var(--gradient-primary);
}

.icon-primary {
  background: var(--gradient-primary);
}

.card-success .card-background {
  background: var(--gradient-success);
}

.icon-success {
  background: var(--gradient-success);
}

.card-warning .card-background {
  background: linear-gradient(135deg, var(--warning-color), var(--accent-color));
}

.icon-warning {
  background: linear-gradient(135deg, var(--warning-color), var(--accent-color));
}

.card-error .card-background {
  background: linear-gradient(135deg, var(--error-color), var(--warning-color));
}

.icon-error {
  background: linear-gradient(135deg, var(--error-color), var(--warning-color));
}
</style>
