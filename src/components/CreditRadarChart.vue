<template>
  <div class="credit-radar-chart" ref="chartRef"></div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'CreditRadarChart',
  setup() {
    const chartRef = ref(null)
    let chart = null

    const initChart = () => {
      if (!chartRef.value) return

      chart = echarts.init(chartRef.value)
      const option = {
        backgroundColor: 'transparent',
        radar: {
          indicator: [
            { name: '风险控制', max: 100 },
            { name: '企业规模', max: 100 },
            { name: '经营状况', max: 100 },
            { name: '发展趋势', max: 100 },
            { name: '信用历史', max: 100 }
          ],
          splitNumber: 5,
          center: ['50%', '50%'],
          radius: '65%',
          shape: 'polygon',
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.08)',
              width: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.06)',
              width: 1
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'rgba(255, 255, 255, 0.01)',
                'rgba(255, 255, 255, 0.02)',
                'rgba(255, 255, 255, 0.03)',
                'rgba(255, 255, 255, 0.04)',
                'rgba(255, 255, 255, 0.05)'
              ]
            }
          },
          name: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: 11,
              fontWeight: 500,
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: [85, 90, 75, 95, 85],
            name: '信用评分',
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              width: 2.5,
              color: '#007AFF',
              shadowColor: 'rgba(0, 122, 255, 0.3)',
              shadowBlur: 8
            },
            itemStyle: {
              color: '#007AFF',
              borderColor: '#ffffff',
              borderWidth: 2,
              shadowColor: 'rgba(0, 122, 255, 0.4)',
              shadowBlur: 6
            },
            areaStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  { offset: 0, color: 'rgba(0, 122, 255, 0.25)' },
                  { offset: 1, color: 'rgba(0, 122, 255, 0.05)' }
                ]
              }
            }
          }]
        }],
        animation: true,
        animationDuration: 1500,
        animationEasing: 'cubicOut'
      }

      chart.setOption(option)
    }

    onMounted(() => {
      initChart()
      window.addEventListener('resize', initChart)
    })

    onUnmounted(() => {
      if (chart) {
        chart.dispose()
      }
      window.removeEventListener('resize', initChart)
    })

    return {
      chartRef
    }
  }
}
</script>

<style scoped>
.credit-radar-chart {
  width: 100%;
  height: 250px;
}
</style> 