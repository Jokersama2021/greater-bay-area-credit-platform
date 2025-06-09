<template>
  <div class="cross-border-activity">
    <div class="activity-header">
      <div class="header-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <div class="header-content">
        <h3 class="activity-title">跨境业务活跃度</h3>
        <div class="activity-status" :class="getActivityClass(currentEnterprise.crossBorderBusiness)">
          <div class="status-indicator">
            <div class="pulse-dot"></div>
          </div>
          <span>{{ currentEnterprise.crossBorderBusiness }}</span>
        </div>
      </div>
    </div>

    <div class="activity-chart" ref="chartRef"></div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'CrossBorderActivity',
  setup() {
    const chartRef = ref(null)
    let chart = null

    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    // 根据企业生成模拟的跨境业务数据
    const businessData = computed(() => {
      const enterprise = currentEnterprise.value
      const baseMultiplier = {
        '非常活跃': 1.0,
        '活跃': 0.8,
        '一般': 0.6,
        '较少': 0.4
      }[enterprise.crossBorderBusiness] || 0.6

      return {
        tradeVolume: Math.round(1200 * baseMultiplier + (enterprise.id * 50)),
        partnerCount: Math.round(45 * baseMultiplier + (enterprise.id * 2)),
        regionCount: Math.round(12 * baseMultiplier + (enterprise.id % 3)),
        growthRate: Math.round(25 * baseMultiplier + (enterprise.id % 10))
      }
    })



    const getActivityClass = (activity) => {
      const classes = {
        '非常活跃': 'very-active',
        '活跃': 'active',
        '一般': 'normal',
        '较少': 'low'
      }
      return classes[activity] || 'normal'
    }

    const initChart = () => {
      if (!chartRef.value) return

      chart = echarts.init(chartRef.value)

      // 生成近6个月的活跃度数据
      const months = ['1月', '2月', '3月', '4月', '5月', '6月']
      const baseValue = businessData.value.tradeVolume / 6
      const activityData = months.map((_, index) => {
        const variation = (Math.random() - 0.5) * 0.3
        return Math.round(baseValue * (1 + variation))
      })

      // 创建流动波浪效果的数据
      const waveData = months.map((_, index) => {
        return activityData[index] + Math.sin(index * 0.8) * 15
      })

      const option = {
        backgroundColor: 'transparent',
        grid: {
          top: 30,
          left: 15,
          right: 15,
          bottom: 25,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 11,
            fontWeight: 500,
            margin: 12
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: [
          // 背景波浪层
          {
            type: 'line',
            data: waveData,
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
              color: 'rgba(0, 212, 255, 0.2)',
              width: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 212, 255, 0.15)' },
                { offset: 0.5, color: 'rgba(0, 212, 255, 0.08)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
              ])
            },
            z: 1
          },
          // 主数据流
          {
            type: 'line',
            data: activityData,
            smooth: 0.4,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#00D4FF' },
                { offset: 0.5, color: '#0099FF' },
                { offset: 1, color: '#0066CC' }
              ]),
              width: 4,
              shadowColor: 'rgba(0, 212, 255, 0.6)',
              shadowBlur: 15,
              shadowOffsetY: 3
            },
            itemStyle: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                { offset: 0, color: '#FFFFFF' },
                { offset: 0.4, color: '#00D4FF' },
                { offset: 1, color: '#0066CC' }
              ]),
              borderColor: 'rgba(255, 255, 255, 0.8)',
              borderWidth: 2,
              shadowColor: 'rgba(0, 212, 255, 0.8)',
              shadowBlur: 12
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
                { offset: 0.3, color: 'rgba(0, 212, 255, 0.2)' },
                { offset: 0.7, color: 'rgba(0, 212, 255, 0.1)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
              ])
            },
            animationDuration: 3000,
            animationEasing: 'elasticOut',
            z: 2
          },
          // 流动粒子效果
          {
            type: 'effectScatter',
            data: activityData.map((value, index) => [index, value]),
            symbolSize: (val) => Math.max(4, val[1] / 50),
            rippleEffect: {
              brushType: 'stroke',
              scale: 3,
              period: 2
            },
            itemStyle: {
              color: 'rgba(0, 212, 255, 0.8)',
              shadowBlur: 10,
              shadowColor: 'rgba(0, 212, 255, 0.6)'
            },
            z: 3
          }
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          borderColor: 'rgba(0, 212, 255, 0.5)',
          borderWidth: 1,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          formatter: (params) => {
            const month = params[0].axisValue
            const value = params[1].value
            return `
              <div style="padding: 8px;">
                <div style="color: #00D4FF; font-weight: 600; margin-bottom: 4px;">${month}</div>
                <div style="color: #ffffff;">活跃度: ${value}</div>
              </div>
            `
          }
        }
      }

      chart.setOption(option)
    }

    watch(currentEnterprise, () => {
      if (chart) {
        initChart()
      }
    }, { deep: true })

    onMounted(() => {
      setTimeout(() => {
        initChart()
      }, 100)

      window.addEventListener('resize', () => {
        if (chart) {
          chart.resize()
        }
      })
    })

    onUnmounted(() => {
      if (chart) {
        chart.dispose()
      }
    })

    return {
      chartRef,
      currentEnterprise,
      getActivityClass
    }
  }
}
</script>

<style scoped>
.cross-border-activity {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.activity-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.header-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
}

.header-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.25rem 0;
  font-family: var(--font-heading);
}

.activity-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-indicator {
  position: relative;
  width: 0.75rem;
  height: 0.75rem;
}

.pulse-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
}

.pulse-dot::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.very-active { color: #4CAF50; }
.very-active .pulse-dot { background: #4CAF50; }
.very-active .pulse-dot::before { background: rgba(76, 175, 80, 0.3); }

.active { color: #8BC34A; }
.active .pulse-dot { background: #8BC34A; }
.active .pulse-dot::before { background: rgba(139, 195, 74, 0.3); }

.normal { color: #FFC107; }
.normal .pulse-dot { background: #FFC107; }

.low { color: #FF9800; }
.low .pulse-dot { background: #FF9800; }

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1.4); opacity: 0; }
}

.activity-chart {
  height: 180px;
}
</style>
