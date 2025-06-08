<template>
  <div class="advanced-credit-radar" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chart = null

const initChart = () => {
  if (!chartContainer.value) return

  chart = echarts.init(chartContainer.value)
  
  const indicators = [
    { name: '风险控制', max: 100, color: '#FF6B6B' },
    { name: '企业规模', max: 100, color: '#4ECDC4' },
    { name: '经营状况', max: 100, color: '#45B7D1' },
    { name: '发展趋势', max: 100, color: '#96CEB4' },
    { name: '信用历史', max: 100, color: '#FFEAA7' }
  ]
  
  const data = [85, 90, 75, 95, 85]
  
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      formatter: (params) => {
        const index = params.dataIndex
        const indicator = indicators[index]
        const value = data[index]
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 6px;">${indicator.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 8px; height: 8px; background: ${indicator.color}; border-radius: 50%;"></div>
              <span>评分: ${value}/100</span>
            </div>
          </div>
        `
      },
      extraCssText: 'border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);'
    },
    radar: {
      indicator: indicators.map(item => ({
        name: item.name,
        max: item.max
      })),
      shape: 'polygon',
      splitNumber: 4,
      center: ['50%', '50%'],
      radius: '70%',
      startAngle: 90,
      name: {
        textStyle: {
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: 11,
          fontWeight: 600,
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
        },
        formatter: (name) => {
          return `{a|${name}}`
        },
        rich: {
          a: {
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: 11,
            fontWeight: 600,
            padding: [2, 4],
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 6
          }
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
          width: 1.5
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
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
            'rgba(255, 255, 255, 0.06)',
            'rgba(255, 255, 255, 0.08)'
          ]
        }
      }
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data,
            name: '信用评分',
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
              width: 3,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  { offset: 0, color: '#007AFF' },
                  { offset: 0.5, color: '#5AC8FA' },
                  { offset: 1, color: '#34C759' }
                ]
              },
              shadowColor: 'rgba(0, 122, 255, 0.3)',
              shadowBlur: 8
            },
            itemStyle: {
              color: (params) => {
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
                return {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.6,
                  colorStops: [
                    { offset: 0, color: '#ffffff' },
                    { offset: 0.5, color: colors[params.dataIndex] },
                    { offset: 1, color: '#007AFF' }
                  ]
                }
              },
              borderColor: '#ffffff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 122, 255, 0.6)',
              shadowBlur: 10
            },
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  { offset: 0, color: 'rgba(0, 122, 255, 0.3)' },
                  { offset: 0.5, color: 'rgba(90, 200, 250, 0.2)' },
                  { offset: 1, color: 'rgba(52, 199, 89, 0.1)' }
                ]
              },
              shadowColor: 'rgba(0, 122, 255, 0.2)',
              shadowBlur: 10
            }
          }
        ],
        animationDuration: 2000,
        animationEasing: 'cubicOut'
      },
      // 添加背景参考线
      {
        type: 'radar',
        data: [
          {
            value: [100, 100, 100, 100, 100],
            name: '满分参考',
            symbol: 'none',
            lineStyle: {
              width: 1,
              color: 'rgba(255, 255, 255, 0.15)',
              type: 'dotted'
            },
            areaStyle: {
              color: 'rgba(255, 255, 255, 0.02)'
            }
          }
        ],
        silent: true,
        animationDuration: 1000
      }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut'
  }

  chart.setOption(option)
  
  // 添加动态高亮效果
  let currentIndex = 0
  const autoHighlight = () => {
    // 清除之前的高亮
    chart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    })
    
    // 高亮当前指标
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    
    currentIndex = (currentIndex + 1) % indicators.length
  }
  
  // 延迟启动自动高亮
  setTimeout(() => {
    setInterval(autoHighlight, 2500)
  }, 3000)
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
.advanced-credit-radar {
  width: 100%;
  height: 280px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.advanced-credit-radar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0, 122, 255, 0.05) 0%, rgba(90, 200, 250, 0.02) 50%, transparent 100%);
  pointer-events: none;
  z-index: 1;
}

.advanced-credit-radar::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #007AFF 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: centerPulse 3s ease-in-out infinite;
  z-index: 2;
}

@keyframes centerPulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.5);
  }
}
</style>
