<template>
  <div class="enterprise-trend-chart">
    <div class="trend-header">
      <div class="trend-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 12L12 7L16 11L21 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="trend-title">发展趋势</h3>
    </div>
    <div class="chart-container" ref="chartRef"></div>
    <div class="trend-indicators">
      <div class="indicator">
        <div class="indicator-dot growth"></div>
        <span>增长期</span>
      </div>
      <div class="indicator">
        <div class="indicator-dot stable"></div>
        <span>稳定期</span>
      </div>
      <div class="indicator">
        <div class="indicator-dot decline"></div>
        <span>调整期</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'EnterpriseTrendChart',
  setup() {
    const chartRef = ref(null)
    let chart = null

    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    const generateTrendData = () => {
      const enterprise = currentEnterprise.value
      const years = []
      const creditScores = []
      const businessVolumes = []
      
      // 生成近5年的数据
      const currentYear = new Date().getFullYear()
      for (let i = 4; i >= 0; i--) {
        years.push(currentYear - i)
        
        // 基于企业ID和年份生成模拟数据
        const baseScore = enterprise.creditScore
        const yearVariation = (Math.sin((enterprise.id + i) * 0.5) * 20) + (i * 5)
        creditScores.push(Math.max(600, Math.min(1000, baseScore - 50 + yearVariation)))
        
        const baseVolume = 100 + (enterprise.id * 10)
        const volumeVariation = (Math.cos((enterprise.id + i) * 0.7) * 30) + (i * 8)
        businessVolumes.push(Math.max(50, baseVolume + volumeVariation))
      }
      
      return { years, creditScores, businessVolumes }
    }

    const initChart = () => {
      if (!chartRef.value) return

      chart = echarts.init(chartRef.value)
      const { years, creditScores, businessVolumes } = generateTrendData()

      const option = {
        grid: {
          top: 20,
          left: 30,
          right: 30,
          bottom: 30,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: years,
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
        yAxis: [
          {
            type: 'value',
            name: '信用评分',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 10
            },
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
          {
            type: 'value',
            name: '业务量',
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 10
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 10
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '信用评分',
            type: 'line',
            yAxisIndex: 0,
            data: creditScores,
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
              borderWidth: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(0, 212, 255, 0.3)' },
                { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
              ])
            }
          },
          {
            name: '业务量',
            type: 'bar',
            yAxisIndex: 1,
            data: businessVolumes,
            barWidth: '40%',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4CAF50' },
                { offset: 1, color: '#81C784' }
              ]),
              borderRadius: [4, 4, 0, 0]
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          }
        },
        legend: {
          data: ['信用评分', '业务量'],
          textStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 10
          },
          top: 0,
          right: 0
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
      chartRef
    }
  }
}
</script>

<style scoped>
.enterprise-trend-chart {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.trend-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.trend-icon {
  width: 1.75rem;
  height: 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.trend-icon svg {
  width: 1rem;
  height: 1rem;
}

.trend-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-family: var(--font-heading);
}

.chart-container {
  height: 160px;
  margin-bottom: 0.75rem;
}

.trend-indicators {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
}

.indicator-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.indicator-dot.growth { background: #4CAF50; }
.indicator-dot.stable { background: #00D4FF; }
.indicator-dot.decline { background: #FF9800; }
</style>
