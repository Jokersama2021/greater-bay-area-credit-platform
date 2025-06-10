<template>
  <div class="advanced-flow-chart" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chart = null

const props = defineProps({
  title: {
    type: String,
    default: '數據流動趋势'
  }
})

const initChart = () => {
  if (!chartContainer.value) return

  chart = echarts.init(chartContainer.value)
  
  // 生成流動數據
  const generateFlowData = () => {
    const data = []
    const categories = ['香港', '澳門', '深圳', '廣州', '珠海', '東莞']
    const now = new Date()
    
    for (let i = 0; i < 50; i++) {
      const time = new Date(now.getTime() - (50 - i) * 60000)
      data.push([
        time,
        Math.random() * 100 + 20,
        categories[Math.floor(Math.random() * categories.length)]
      ])
    }
    return data
  }
  
  const flowData = generateFlowData()
  
  const option = {
    backgroundColor: 'transparent',
    title: {
      text: props.title,
      left: 'center',
      top: '5%',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 14,
        fontWeight: 600
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      formatter: (params) => {
        const data = params[0]
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 6px;">${data.seriesName}</div>
            <div style="margin-bottom: 4px;">時間: ${data.axisValueLabel}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 8px; height: 8px; background: ${data.color}; border-radius: 50%;"></div>
              <span>流量: ${data.value[1].toFixed(1)} MB/s</span>
            </div>
            <div style="margin-top: 4px; color: rgba(255, 255, 255, 0.7);">
              區域: ${data.value[2]}
            </div>
          </div>
        `
      },
      extraCssText: 'border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);'
    },
    grid: {
      top: '20%',
      left: '8%',
      right: '8%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        formatter: (value) => {
          const date = new Date(value)
          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.05)',
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        formatter: '{value} MB/s'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: '數據流量',
        type: 'line',
        data: flowData,
        smooth: true,
        symbol: 'circle',
        symbolSize: (value) => Math.max(4, value[1] / 10),
        lineStyle: {
          width: 3,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#007AFF' },
              { offset: 0.3, color: '#5AC8FA' },
              { offset: 0.6, color: '#34C759' },
              { offset: 1, color: '#FF9500' }
            ]
          },
          shadowColor: 'rgba(0, 122, 255, 0.3)',
          shadowBlur: 8
        },
        itemStyle: {
          color: (params) => {
            const colors = {
              '香港': '#FF6B6B',
              '澳門': '#4ECDC4',
              '深圳': '#45B7D1',
              '廣州': '#96CEB4',
              '珠海': '#FFEAA7',
              '東莞': '#DDA0DD'
            }
            return colors[params.value[2]] || '#007AFF'
          },
          borderColor: '#ffffff',
          borderWidth: 2,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowBlur: 4
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(0, 122, 255, 0.3)' },
              { offset: 0.5, color: 'rgba(90, 200, 250, 0.2)' },
              { offset: 1, color: 'rgba(52, 199, 89, 0.1)' }
            ]
          }
        },
        markPoint: {
          data: [
            {
              type: 'max',
              name: '最大值',
              itemStyle: {
                color: '#FF3B30'
              },
              label: {
                color: '#ffffff',
                fontSize: 10
              }
            }
          ],
          symbol: 'pin',
          symbolSize: 40,
          animation: true,
          animationDuration: 1000
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut'
      },
      // 添加粒子效果
      {
        name: '流動粒子',
        type: 'effectScatter',
        coordinateSystem: 'cartesian2d',
        data: flowData.filter((_, index) => index % 5 === 0),
        symbolSize: (value) => Math.max(6, value[1] / 8),
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3,
          period: 2
        },
        itemStyle: {
          color: (params) => {
            const colors = {
              '香港': '#FF6B6B',
              '澳門': '#4ECDC4',
              '深圳': '#45B7D1',
              '廣州': '#96CEB4',
              '珠海': '#FFEAA7',
              '東莞': '#DDA0DD'
            }
            return colors[params.value[2]] || '#007AFF'
          },
          shadowBlur: 10,
          shadowColor: 'rgba(0, 122, 255, 0.5)'
        },
        animationDuration: 1500,
        animationDelay: 1000
      }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut'
  }

  chart.setOption(option)
  
  // 實時更新數據
  const updateData = () => {
    const newData = generateFlowData()
    chart.setOption({
      series: [
        {
          data: newData
        },
        {
          data: newData.filter((_, index) => index % 5 === 0)
        }
      ]
    })
  }
  
  // 每30秒更新一次數據
  setInterval(updateData, 30000)
}

const handleResize = () => {
  if (chart) {
    chart.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chart) {
    chart.dispose()
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.advanced-flow-chart {
  width: 100%;
  height: 250px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.advanced-flow-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(52, 199, 89, 0.03) 50%, rgba(255, 149, 0, 0.02) 100%);
  pointer-events: none;
  z-index: 1;
}
</style>
