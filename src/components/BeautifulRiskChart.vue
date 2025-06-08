<template>
  <div class="beautiful-risk-chart" ref="chartContainer">
    <div class="chart-background">
      <div class="background-grid"></div>
      <div class="background-glow"></div>
    </div>
  </div>
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
      top: '20%',
      left: '8%',
      right: '8%',
      bottom: '20%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(0, 122, 255, 0.3)',
      borderWidth: 2,
      borderRadius: 12,
      textStyle: {
        color: '#ffffff',
        fontSize: 13,
        fontWeight: '500'
      },
      formatter: (params) => {
        const data = params[0]
        return `
          <div style="padding: 12px;">
            <div style="font-weight: 600; margin-bottom: 8px; color: #007AFF;">${data.name}</div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 10px; height: 10px; background: linear-gradient(45deg, #007AFF, #5AC8FA); border-radius: 50%; box-shadow: 0 0 8px rgba(0, 122, 255, 0.6);"></div>
              <span style="font-size: 14px;">风险预警: <strong style="color: #007AFF;">${data.value}</strong> 次</span>
            </div>
          </div>
        `
      },
      extraCssText: 'box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 107, 107, 0.1);'
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          width: 2
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 12,
        fontWeight: '500',
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
        show: true,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.08)',
          width: 1,
          type: 'dashed'
        }
      },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 11,
        margin: 12
      }
    },
    series: [
      {
        name: '风险预警',
        type: 'bar',
        data: [72, 23, 33, 48, 66, 23],
        barWidth: '50%',
        itemStyle: {
          borderRadius: [12, 12, 4, 4],
          color: () => {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#007AFF' },
              { offset: 0.3, color: '#5AC8FA' },
              { offset: 0.7, color: '#34AADC' },
              { offset: 1, color: '#1E90FF' }
            ])
          },
          shadowColor: 'rgba(0, 122, 255, 0.4)',
          shadowBlur: 15,
          shadowOffsetY: 8,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        },
        emphasis: {
          itemStyle: {
            shadowColor: 'rgba(0, 122, 255, 0.6)',
            shadowBlur: 25,
            shadowOffsetY: 12,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderWidth: 2
          }
        },
        animationDuration: 1500,
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 200
      },
      {
        name: '趋势线',
        type: 'line',
        data: [72, 23, 33, 48, 66, 23],
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#ffa726',
          width: 4,
          shadowColor: 'rgba(255, 167, 38, 0.4)',
          shadowBlur: 10
        },
        itemStyle: {
          color: '#ffa726',
          borderColor: '#ffffff',
          borderWidth: 3,
          shadowColor: 'rgba(255, 167, 38, 0.6)',
          shadowBlur: 8
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(255, 167, 38, 0.25)' },
            { offset: 1, color: 'rgba(255, 167, 38, 0.05)' }
          ])
        },
        animationDuration: 2000,
        animationEasing: 'cubicOut',
        animationDelay: 800
      }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDurationUpdate: 1200,
    animationEasingUpdate: 'cubicInOut'
  }

  chart.setOption(option)
  
  // 添加交互效果
  let currentHighlight = -1
  const autoHighlight = () => {
    if (currentHighlight >= 0) {
      chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: currentHighlight
      })
    }
    
    currentHighlight = (currentHighlight + 1) % 6
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentHighlight
    })
  }
  
  // 延迟启动自动高亮
  setTimeout(() => {
    setInterval(autoHighlight, 3000)
  }, 2000)
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
.beautiful-risk-chart {
  width: 100%;
  height: 220px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, 
    rgba(255, 107, 107, 0.03) 0%, 
    rgba(244, 67, 54, 0.02) 50%,
    rgba(211, 47, 47, 0.03) 100%);
  border: 1px solid rgba(255, 107, 107, 0.1);
}

.chart-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.background-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.background-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(30px);
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .beautiful-risk-chart {
    height: 180px;
  }
}

@media (max-width: 480px) {
  .beautiful-risk-chart {
    height: 160px;
  }
}
</style>
