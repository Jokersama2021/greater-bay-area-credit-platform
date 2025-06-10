<template>
  <div class="industry-comparison-radar">
    <div class="radar-header">
      <div class="radar-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3 class="radar-title">行業對比</h3>
    </div>
    <div class="chart-container" ref="chartRef"></div>
    <div class="comparison-legend">
      <div class="legend-item">
        <div class="legend-dot current"></div>
        <span>當前企業</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot industry"></div>
        <span>行業平均</span>
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
      
      // 當前企業數據
      const currentData = [
        enterprise.creditMetrics.riskControl,
        enterprise.creditMetrics.creditHistory,
        enterprise.creditMetrics.developmentTrend,
        enterprise.creditMetrics.businessStatus,
        enterprise.creditMetrics.enterpriseScale
      ]
      
      // 行業平均數據（基于企業規模调整）
      const scaleMultiplier = {
        '大型企業': 0.9,
        '中型企業': 0.8,
        '小型企業': 0.7,
        '微型企業': 0.6
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
        { name: '風險控制', max: 100 },
        { name: '信用历史', max: 100 },
        { name: '發展趋势', max: 100 },
        { name: '經营状况', max: 100 },
        { name: '企業規模', max: 100 }
      ]

      const option = {
        backgroundColor: 'transparent',
        radar: {
          indicator: indicators,
          center: ['50%', '50%'],
          radius: '65%',
          startAngle: 90,
          axisName: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 11,
            fontWeight: 600,
            padding: [5, 8],
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: 8,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1
          },
          splitArea: {
            areaStyle: {
              color: [
                'rgba(255, 255, 255, 0.01)',
                'rgba(255, 255, 255, 0.03)',
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.03)',
                'rgba(255, 255, 255, 0.01)'
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
              width: 2
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.15)',
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [
          // 背景光晕效果
          {
            type: 'radar',
            data: [
              {
                value: currentData.map(v => v * 1.1),
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    { offset: 0, color: 'rgba(0, 212, 255, 0.1)' },
                    { offset: 1, color: 'rgba(0, 212, 255, 0.02)' }
                  ])
                },
                lineStyle: {
                  color: 'transparent'
                },
                itemStyle: {
                  color: 'transparent'
                }
              }
            ],
            z: 1
          },
          // 主數據层
          {
            type: 'radar',
            data: [
              {
                value: currentData,
                name: '當前企業',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                    { offset: 0, color: 'rgba(0, 212, 255, 0.4)' },
                    { offset: 0.5, color: 'rgba(0, 212, 255, 0.2)' },
                    { offset: 1, color: 'rgba(0, 212, 255, 0.05)' }
                  ])
                },
                lineStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#00D4FF' },
                    { offset: 0.5, color: '#0099FF' },
                    { offset: 1, color: '#0066CC' }
                  ]),
                  width: 4,
                  shadowColor: 'rgba(0, 212, 255, 0.8)',
                  shadowBlur: 15
                },
                itemStyle: {
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    { offset: 0, color: '#FFFFFF' },
                    { offset: 0.4, color: '#00D4FF' },
                    { offset: 1, color: '#0066CC' }
                  ]),
                  borderColor: 'rgba(255, 255, 255, 0.9)',
                  borderWidth: 3,
                  shadowColor: 'rgba(0, 212, 255, 0.9)',
                  shadowBlur: 12
                },
                symbol: 'circle',
                symbolSize: 8
              },
              {
                value: industryAverage,
                name: '行業平均',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.8, [
                    { offset: 0, color: 'rgba(255, 152, 0, 0.3)' },
                    { offset: 0.5, color: 'rgba(255, 152, 0, 0.15)' },
                    { offset: 1, color: 'rgba(255, 152, 0, 0.03)' }
                  ])
                },
                lineStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#FF9800' },
                    { offset: 0.5, color: '#FF7043' },
                    { offset: 1, color: '#E65100' }
                  ]),
                  width: 3,
                  type: [5, 5],
                  shadowColor: 'rgba(255, 152, 0, 0.6)',
                  shadowBlur: 10
                },
                itemStyle: {
                  color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                    { offset: 0, color: '#FFFFFF' },
                    { offset: 0.4, color: '#FF9800' },
                    { offset: 1, color: '#E65100' }
                  ]),
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  borderWidth: 2,
                  shadowColor: 'rgba(255, 152, 0, 0.8)',
                  shadowBlur: 10
                },
                symbol: 'diamond',
                symbolSize: 6
              }
            ],
            animationDuration: 2500,
            animationEasing: 'elasticOut',
            z: 2
          },
          // 動态粒子效果
          {
            type: 'effectScatter',
            coordinateSystem: 'radar',
            data: currentData.map((value, index) => {
              const angle = (index * 72 - 90) * Math.PI / 180
              const radius = value * 0.7 / 100
              return [radius * Math.cos(angle), radius * Math.sin(angle)]
            }),
            symbolSize: 4,
            rippleEffect: {
              brushType: 'stroke',
              scale: 2,
              period: 4
            },
            itemStyle: {
              color: 'rgba(0, 212, 255, 0.8)',
              shadowBlur: 8,
              shadowColor: 'rgba(0, 212, 255, 0.6)'
            },
            z: 3
          }
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          borderColor: 'rgba(0, 212, 255, 0.5)',
          borderWidth: 2,
          textStyle: {
            color: '#ffffff',
            fontSize: 12
          },
          formatter: (params) => {
            if (params.seriesType === 'radar') {
              const name = params.name
              const data = params.value
              const indicators = ['風險控制', '信用历史', '發展趋势', '經营状况', '企業規模']
              let content = `<div style="padding: 10px;"><div style="color: ${params.color}; font-weight: 600; margin-bottom: 8px;">${name}</div>`
              data.forEach((value, index) => {
                content += `<div style="margin: 4px 0;">${indicators[index]}: ${value}</div>`
              })
              content += '</div>'
              return content
            }
            return ''
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
  height: 160px;
  margin-bottom: 0.5rem;
  overflow: visible;
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
