<template>
  <div class="advanced-3d-pie-chart" ref="chartContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref(null)
let chart = null

const props = defineProps({
  title: {
    type: String,
    default: '数据分布'
  },
  data: {
    type: Array,
    default: () => [
      { value: 35, name: '优秀企业', color: '#34C759' },
      { value: 28, name: '良好企业', color: '#007AFF' },
      { value: 22, name: '一般企业', color: '#FF9500' },
      { value: 15, name: '风险企业', color: '#FF3B30' }
    ]
  }
})

const initChart = () => {
  if (!chartContainer.value) return

  chart = echarts.init(chartContainer.value)
  
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
      trigger: 'item',
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
      textStyle: {
        color: '#ffffff',
        fontSize: 12
      },
      formatter: (params) => {
        return `
          <div style="padding: 8px;">
            <div style="font-weight: 600; margin-bottom: 6px;">${params.name}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="width: 8px; height: 8px; background: ${params.color}; border-radius: 50%;"></div>
              <span>${params.value}% (${params.percent}%)</span>
            </div>
          </div>
        `
      },
      extraCssText: 'border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);'
    },
    legend: {
      orient: 'vertical',
      left: '5%',
      top: 'middle',
      textStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 11
      },
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 12,
      formatter: (name) => {
        const item = props.data.find(d => d.name === name)
        return `{a|${name}} {b|${item?.value}%}`
      },
      rich: {
        a: {
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: 11,
          fontWeight: 500
        },
        b: {
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: 10,
          fontWeight: 400
        }
      }
    },
    series: [
      {
        name: props.title,
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['65%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2,
          shadowBlur: 15,
          shadowOffsetX: 0,
          shadowOffsetY: 5,
          shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#ffffff',
            formatter: (params) => {
              return `{a|${params.name}}\n{b|${params.value}%}`
            },
            rich: {
              a: {
                fontSize: 14,
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 20
              },
              b: {
                fontSize: 18,
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 25
              }
            }
          },
          itemStyle: {
            shadowBlur: 20,
            shadowOffsetX: 0,
            shadowOffsetY: 8,
            shadowColor: 'rgba(0, 0, 0, 0.4)'
          }
        },
        labelLine: {
          show: false
        },
        data: props.data.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                { offset: 0, color: item.color },
                { offset: 0.5, color: item.color + 'CC' },
                { offset: 1, color: item.color + '88' }
              ]
            }
          }
        })),
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: (idx) => idx * 200,
        animationDuration: 1500
      },
      // 内圈装饰
      {
        name: '内圈',
        type: 'pie',
        radius: ['0%', '25%'],
        center: ['65%', '50%'],
        silent: true,
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: 'rgba(0, 122, 255, 0.3)' },
              { offset: 0.7, color: 'rgba(0, 122, 255, 0.1)' },
              { offset: 1, color: 'transparent' }
            ]
          },
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        },
        data: [{ value: 100, name: '' }],
        animationDuration: 1000
      }
    ],
    animation: true,
    animationThreshold: 2000,
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut'
  }

  chart.setOption(option)
  
  // 添加自动旋转效果
  let currentIndex = 0
  const autoRotate = () => {
    chart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0
    })
    
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    
    currentIndex = (currentIndex + 1) % props.data.length
  }
  
  setTimeout(() => {
    setInterval(autoRotate, 3000)
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
.advanced-3d-pie-chart {
  width: 100%;
  height: 220px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
}

.advanced-3d-pie-chart::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 65% 50%, rgba(0, 122, 255, 0.08) 0%, rgba(90, 200, 250, 0.04) 40%, transparent 70%);
  pointer-events: none;
  z-index: 1;
}

.advanced-3d-pie-chart::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 65%;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #007AFF 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: centerGlow 4s ease-in-out infinite;
  z-index: 2;
}

@keyframes centerGlow {
  0%, 100% {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 10px rgba(0, 122, 255, 0.3);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.8);
    box-shadow: 0 0 20px rgba(0, 122, 255, 0.6);
  }
}
</style>
