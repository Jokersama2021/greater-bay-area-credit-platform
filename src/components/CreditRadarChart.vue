<template>
  <div class="premium-credit-radar">
    <div class="radar-background">
      <div class="background-glow"></div>
      <div class="grid-overlay"></div>
    </div>
    <div class="chart-container" ref="chartRef"></div>
    <div class="center-score">
      <div class="score-value">{{ animatedScore }}</div>
      <div class="score-label">综合评分</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

export default {
  name: 'CreditRadarChart',
  setup() {
    const chartRef = ref(null)
    const animatedScore = ref(0)
    let chart = null

    const finalScore = computed(() => {
      const scores = [85, 90, 75, 95, 85]
      return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    })

    const animateScore = () => {
      const duration = 2000
      const startTime = Date.now()
      const startValue = 0
      const targetValue = finalScore.value

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

        animatedScore.value = Math.round(startValue + (targetValue - startValue) * easeOutExpo)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      setTimeout(() => {
        requestAnimationFrame(animate)
      }, 1000)
    }

    const initChart = () => {
      if (!chartRef.value) return

      chart = echarts.init(chartRef.value)

      const indicators = [
        { name: '风险控制', max: 100, color: '#FF6B6B' },
        { name: '信用历史', max: 100, color: '#4ECDC4' },
        { name: '发展趋势', max: 100, color: '#45B7D1' },
        { name: '经营状况', max: 100, color: '#96CEB4' },
        { name: '企业规模', max: 100, color: '#FFEAA7' }
      ]

      const data = [85, 85, 95, 75, 90]

      const option = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2,
          borderRadius: 12,
          textStyle: {
            color: '#ffffff',
            fontSize: 13,
            fontWeight: '500'
          },
          formatter: (params) => {
            const index = params.dataIndex
            const indicator = indicators[index]
            const value = data[index]
            return `
              <div style="padding: 12px;">
                <div style="font-weight: 600; margin-bottom: 8px; color: ${indicator.color};">${indicator.name}</div>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div style="width: 10px; height: 10px; background: ${indicator.color}; border-radius: 50%; box-shadow: 0 0 8px ${indicator.color}60;"></div>
                  <span style="font-size: 14px;">评分: <strong style="color: ${indicator.color};">${value}</strong>/100</span>
                </div>
              </div>
            `
          },
          extraCssText: 'box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1);'
        },
        radar: {
          indicator: indicators.map(item => ({
            name: item.name,
            max: item.max
          })),
          shape: 'polygon',
          splitNumber: 4,
          center: ['50%', '50%'],
          radius: '65%',
          startAngle: 90,
          name: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: 12,
              fontWeight: 600,
              fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
            },
            formatter: (name) => {
              return `{a|${name}}`
            },
            rich: {
              a: {
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: 12,
                fontWeight: 600,
                padding: [4, 8],
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 8,
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
              }
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.15)',
              width: 2
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
                symbolSize: 10,
                lineStyle: {
                  width: 4,
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: '#007AFF' },
                      { offset: 0.3, color: '#5AC8FA' },
                      { offset: 0.6, color: '#34C759' },
                      { offset: 1, color: '#30D158' }
                    ]
                  },
                  shadowColor: 'rgba(0, 122, 255, 0.4)',
                  shadowBlur: 15,
                  shadowOffsetY: 5
                },
                itemStyle: {
                  color: (params) => {
                    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
                    return {
                      type: 'radial',
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                        { offset: 0, color: '#ffffff' },
                        { offset: 0.4, color: colors[params.dataIndex] },
                        { offset: 1, color: '#007AFF' }
                      ]
                    }
                  },
                  borderColor: '#ffffff',
                  borderWidth: 3,
                  shadowColor: 'rgba(0, 122, 255, 0.6)',
                  shadowBlur: 12
                },
                areaStyle: {
                  color: {
                    type: 'radial',
                    x: 0.5,
                    y: 0.5,
                    r: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(0, 122, 255, 0.4)' },
                      { offset: 0.3, color: 'rgba(90, 200, 250, 0.3)' },
                      { offset: 0.6, color: 'rgba(52, 199, 89, 0.2)' },
                      { offset: 1, color: 'rgba(48, 209, 88, 0.1)' }
                    ]
                  },
                  shadowColor: 'rgba(0, 122, 255, 0.3)',
                  shadowBlur: 20
                }
              }
            ],
            animationDuration: 2500,
            animationEasing: 'elasticOut',
            animationDelay: 500
          }
        ],
        animation: true,
        animationThreshold: 2000,
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'cubicInOut'
      }

      chart.setOption(option)

      // 添加动态高亮效果
      let currentIndex = 0
      const autoHighlight = () => {
        chart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        })

        chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: currentIndex
        })

        currentIndex = (currentIndex + 1) % indicators.length
      }

      setTimeout(() => {
        setInterval(autoHighlight, 3000)
      }, 3000)
    }

    const handleResize = () => {
      if (chart) {
        chart.resize()
      }
    }

    onMounted(() => {
      initChart()
      animateScore()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      if (chart) {
        chart.dispose()
      }
      window.removeEventListener('resize', handleResize)
    })

    return {
      chartRef,
      animatedScore
    }
  }
}
</script>

<style scoped>
.premium-credit-radar {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg,
    rgba(15, 23, 42, 0.8) 0%,
    rgba(30, 41, 59, 0.6) 50%,
    rgba(51, 65, 85, 0.4) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.radar-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.background-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle,
    rgba(0, 122, 255, 0.15) 0%,
    rgba(90, 200, 250, 0.1) 30%,
    rgba(52, 199, 89, 0.05) 60%,
    transparent 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(20px);
  animation: glowPulse 6s ease-in-out infinite;
}

.grid-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.center-score {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 3;
  pointer-events: none;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #007AFF, #5AC8FA, #34C759);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 4s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
  line-height: 1;
  margin-bottom: 4px;
}

.score-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .premium-credit-radar {
    height: 250px;
  }

  .score-value {
    font-size: 2rem;
  }

  .score-label {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .premium-credit-radar {
    height: 220px;
  }

  .score-value {
    font-size: 1.8rem;
  }

  .score-label {
    font-size: 0.65rem;
  }
}
</style>