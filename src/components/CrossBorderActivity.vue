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

    <div class="activity-metrics">
      <div class="metric-row">
        <div class="metric-item">
          <div class="metric-icon trade">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="metric-info">
            <div class="metric-value">{{ tradeVolume }}</div>
            <div class="metric-label">月交易量</div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon partners">
            <i class="fas fa-handshake"></i>
          </div>
          <div class="metric-info">
            <div class="metric-value">{{ partnerCount }}</div>
            <div class="metric-label">合作伙伴</div>
          </div>
        </div>
      </div>
      <div class="metric-row">
        <div class="metric-item">
          <div class="metric-icon regions">
            <i class="fas fa-globe-americas"></i>
          </div>
          <div class="metric-info">
            <div class="metric-value">{{ regionCount }}</div>
            <div class="metric-label">覆盖地区</div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon growth">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="metric-info">
            <div class="metric-value">+{{ growthRate }}%</div>
            <div class="metric-label">增长率</div>
          </div>
        </div>
      </div>
    </div>
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

    const tradeVolume = computed(() => businessData.value.tradeVolume)
    const partnerCount = computed(() => businessData.value.partnerCount)
    const regionCount = computed(() => businessData.value.regionCount)
    const growthRate = computed(() => businessData.value.growthRate)

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

      const option = {
        grid: {
          top: 20,
          left: 10,
          right: 10,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 10
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: 10
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'line',
            data: activityData,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              color: '#00D4FF',
              width: 3,
              shadowColor: 'rgba(0, 212, 255, 0.4)',
              shadowBlur: 10
            },
            itemStyle: {
              color: '#00D4FF',
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 212, 255, 0.6)',
              shadowBlur: 8
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
              ])
            },
            animationDuration: 2000,
            animationEasing: 'cubicOut'
          }
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          textStyle: {
            color: '#ffffff'
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
      tradeVolume,
      partnerCount,
      regionCount,
      growthRate,
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
  height: 120px;
  margin-bottom: 1.5rem;
}

.activity-metrics {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.metric-row {
  display: flex;
  gap: 0.75rem;
}

.metric-item {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.metric-icon {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
}

.metric-icon.trade { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.metric-icon.partners { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.metric-icon.regions { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.metric-icon.growth { background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%); }

.metric-info {
  flex: 1;
}

.metric-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.125rem;
}

.metric-label {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}
</style>
