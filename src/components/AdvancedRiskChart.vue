<template>
  <div class="advanced-risk-chart" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chart = null

const initChart = () => {
  if (!chartContainer.value) return

  chart = echarts.init(chartContainer.value)
  
  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: '15%',
      left: '8%',
      right: '8%',
      bottom: '15%',
      containLabel: true
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
            <div style="font-weight: 600; margin-bottom: 6px;">${data.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 8px; height: 8px; background: ${data.color}; border-radius: 50%;"></div>
              <span>风险预警: ${data.value} 次</span>
            </div>
          </div>
        `
      },
      extraCssText: 'border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 11,
        fontWeight: 500,
        margin: 12
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
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.06)',
          type: 'dashed',
          width: 1
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
        fontWeight: 500
      }
    },
    series: [
      {
        name: '风险预警',
        type: 'bar',
        data: [72, 23, 33, 48, 66, 23],
        barWidth: '45%',
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: (params) => {
            // 根据数值动态调整颜色强度
            const intensity = params.value / 80
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: `rgba(0, ${122 + intensity * 50}, 255, 1)` },
                { offset: 0.3, color: '#007AFF' },
                { offset: 0.7, color: '#5AC8FA' },
                { offset: 1, color: '#34AADC' }
              ]
            }
          },
          shadowColor: 'rgba(0, 122, 255, 0.5)',
          shadowBlur: 12,
          shadowOffsetY: 6,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#FF8A80' },
                { offset: 0.5, color: '#FF6B6B' },
                { offset: 1, color: '#FF5252' }
              ]
            },
            shadowColor: 'rgba(244, 67, 54, 0.6)',
            shadowBlur: 12,
            shadowOffsetY: 6
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.03)',
          borderRadius: [6, 6, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 10,
          fontWeight: 600,
          distance: 8,
          formatter: '{c}'
        },
        animationDuration: 1500,
        animationEasing: 'cubicOut'
      },
      // 添加趋势线
      {
        name: '趋势',
        type: 'line',
        data: [72, 23, 33, 48, 66, 23],
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#FFB74D',
          width: 3,
          shadowColor: 'rgba(255, 183, 77, 0.3)',
          shadowBlur: 6
        },
        itemStyle: {
          color: '#FFB74D',
          borderColor: '#ffffff',
          borderWidth: 2,
          shadowColor: 'rgba(255, 183, 77, 0.4)',
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
              { offset: 0, color: 'rgba(255, 183, 77, 0.2)' },
              { offset: 1, color: 'rgba(255, 183, 77, 0.05)' }
            ]
          }
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut',
        animationDelay: 500
      }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut'
  }

  chart.setOption(option)
  
  // 添加自动播放效果
  let currentIndex = 0
  const autoPlay = () => {
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    
    setTimeout(() => {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentIndex
      })
      currentIndex = (currentIndex + 1) % 6
    }, 1000)
  }
  
  // 延迟启动自动播放
  setTimeout(() => {
    setInterval(autoPlay, 2000)
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
.advanced-risk-chart {
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.advanced-risk-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.05) 0%, rgba(244, 67, 54, 0.02) 100%);
  pointer-events: none;
  z-index: 1;
}
</style>
