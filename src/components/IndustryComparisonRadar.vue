<template>
  <div class="industry-comparison-radar">
    <div class="radar-header">
      <div class="radar-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3 class="radar-title">行业对比</h3>
    </div>
    <div class="chart-container" ref="chartRef"></div>
    <div class="comparison-legend">
      <div class="legend-item">
        <div class="legend-dot current"></div>
        <span>当前企业</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot industry"></div>
        <span>行业平均</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'IndustryComparisonRadar',
  setup() {
    const chartRef = ref(null)
    let chart = null

    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    const generateComparisonData = () => {
      const enterprise = currentEnterprise.value
      
      // 当前企业数据
      const currentData = [
        enterprise.creditMetrics.riskControl,
        enterprise.creditMetrics.creditHistory,
        enterprise.creditMetrics.developmentTrend,
        enterprise.creditMetrics.businessStatus,
        enterprise.creditMetrics.enterpriseScale
      ]
      
      // 行业平均数据（基于企业规模调整）
      const scaleMultiplier = {
        '大型企业': 0.9,
        '中型企业': 0.8,
        '小型企业': 0.7,
        '微型企业': 0.6
      }[enterprise.scale] || 0.8
      
      const industryAverage = [
        75 * scaleMultiplier,
        78 * scaleMultiplier,
        72 * scaleMultiplier,
        76 * scaleMultiplier,
        80 * scaleMultiplier
      ]
      
      return { currentData, industryAverage }
    }

    const initChart = () => {
      if (!chartRef.value) return

      chart = echarts.init(chartRef.value)
      const { currentData, industryAverage } = generateComparisonData()

      const indicators = [
        { name: '风险控制', max: 100 },
        { name: '信用历史', max: 100 },
        { name: '发展趋势', max: 100 },
        { name: '经营状况', max: 100 },
        { name: '企业规模', max: 100 }
      ]

      const option = {
        radar: {
          indicator: indicators,
          center: ['50%', '50%'],
          radius: '70%',
          axisName: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: 10
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)',
              width: 1,
              type: 'dashed'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'rgba(255, 255, 255, 0.02)',
                'rgba(255, 255, 255, 0.04)',
                'rgba(255, 255, 255, 0.06)'
              ]
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: currentData,
                name: '当前企业',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: {
                  width: 3,
                  color: '#00D4FF',
                  shadowColor: 'rgba(0, 212, 255, 0.4)',
                  shadowBlur: 10
                },
                itemStyle: {
                  color: '#00D4FF',
                  borderColor: '#ffffff',
                  borderWidth: 2
                },
                areaStyle: {
                  color: 'rgba(0, 212, 255, 0.2)'
                }
              },
              {
                value: industryAverage,
                name: '行业平均',
                symbol: 'circle',
                symbolSize: 4,
                lineStyle: {
                  width: 2,
                  color: '#FF9800',
                  type: 'dashed'
                },
                itemStyle: {
                  color: '#FF9800',
                  borderColor: '#ffffff',
                  borderWidth: 1
                },
                areaStyle: {
                  color: 'rgba(255, 152, 0, 0.1)'
                }
              }
            ],
            animationDuration: 2000,
            animationEasing: 'elasticOut'
          }
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          textStyle: {
            color: '#ffffff',
            fontSize: 12
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
      chartRef
    }
  }
}
</script>

<style scoped>
.industry-comparison-radar {
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

.radar-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.radar-icon {
  width: 1.75rem;
  height: 1.75rem;
  background: linear-gradient(135deg, #FF9800 0%, #FF5722 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 2px 8px rgba(255, 152, 0, 0.3);
}

.radar-icon svg {
  width: 1rem;
  height: 1rem;
}

.radar-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-family: var(--font-heading);
}

.chart-container {
  height: 140px;
  margin-bottom: 0.5rem;
}

.comparison-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
}

.legend-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
}

.legend-dot.current { background: #00D4FF; }
.legend-dot.industry { background: #FF9800; }
</style>
