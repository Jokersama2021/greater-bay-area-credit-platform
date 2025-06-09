<template>
  <div class="financial-health-gauge">
    <div class="gauge-container" ref="gaugeRef"></div>
    <div class="health-indicators">
      <div class="indicator-item" v-for="indicator in healthIndicators" :key="indicator.name">
        <div class="indicator-icon" :style="{ background: indicator.color }">
          <i :class="indicator.icon"></i>
        </div>
        <div class="indicator-content">
          <div class="indicator-value">{{ indicator.value }}</div>
          <div class="indicator-label">{{ indicator.name }}</div>
        </div>
        <div class="indicator-trend" :class="indicator.trend">
          <i :class="indicator.trend === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import * as echarts from 'echarts'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'FinancialHealthGauge',
  setup() {
    const gaugeRef = ref(null)
    let chart = null

    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    // 计算财务健康度评分
    const healthScore = computed(() => {
      const enterprise = currentEnterprise.value
      let score = 0
      
      // 信用评分权重 40%
      score += (enterprise.creditScore / 1000) * 40
      
      // 经营年限权重 25% (最高30年)
      score += Math.min(enterprise.businessYears / 30, 1) * 25
      
      // 企业规模权重 20%
      const scaleScore = {
        '大型企业': 20,
        '中型企业': 15,
        '小型企业': 10,
        '微型企业': 5
      }
      score += scaleScore[enterprise.scale] || 10
      
      // 跨境业务活跃度权重 15%
      const businessScore = {
        '非常活跃': 15,
        '活跃': 12,
        '一般': 8,
        '较少': 5
      }
      score += businessScore[enterprise.crossBorderBusiness] || 8
      
      return Math.round(score)
    })

    // 健康度指标
    const healthIndicators = computed(() => [
      {
        name: '信用等级',
        value: currentEnterprise.value.creditLevel,
        icon: 'fas fa-star',
        color: 'linear-gradient(135deg, #ffd700 0%, #ffb347 100%)',
        trend: 'up'
      },
      {
        name: '风险等级',
        value: currentEnterprise.value.riskLevel,
        icon: 'fas fa-shield-alt',
        color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        trend: currentEnterprise.value.riskLevel === '低风险' ? 'up' : 'down'
      },
      {
        name: '经营年限',
        value: `${currentEnterprise.value.businessYears}年`,
        icon: 'fas fa-calendar-alt',
        color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        trend: 'up'
      },
      {
        name: '合规状况',
        value: currentEnterprise.value.complianceRecord,
        icon: 'fas fa-check-circle',
        color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        trend: currentEnterprise.value.complianceRecord === '优秀' ? 'up' : 'down'
      }
    ])

    const initGauge = () => {
      if (!gaugeRef.value) return

      chart = echarts.init(gaugeRef.value)

      const option = {
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '80%',
            min: 0,
            max: 100,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 8,
                color: [
                  [0.3, '#FF6B6B'],
                  [0.7, '#FFD93D'],
                  [1, '#6BCF7F']
                ]
              }
            },
            pointer: {
              itemStyle: {
                color: 'auto',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            axisTick: {
              distance: -8,
              length: 8,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
                width: 2
              }
            },
            splitLine: {
              distance: -12,
              length: 12,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.5)',
                width: 3
              }
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 10,
              distance: -25,
              formatter: function (value) {
                if (value === 0) return '0'
                if (value === 50) return '50'
                if (value === 100) return '100'
                return ''
              }
            },
            detail: {
              fontSize: 24,
              fontWeight: 'bold',
              color: 'rgba(255, 255, 255, 0.95)',
              valueAnimation: true,
              formatter: '{value}',
              offsetCenter: [0, '20%']
            },
            data: [
              {
                value: healthScore.value,
                name: '财务健康度',
                title: {
                  offsetCenter: [0, '-20%'],
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              }
            ],
            animation: true,
            animationDuration: 2000,
            animationEasing: 'elasticOut'
          }
        ]
      }

      chart.setOption(option)
    }

    const updateGauge = () => {
      if (chart) {
        chart.setOption({
          series: [
            {
              data: [
                {
                  value: healthScore.value,
                  name: '财务健康度'
                }
              ]
            }
          ]
        })
      }
    }

    watch(currentEnterprise, () => {
      updateGauge()
    }, { deep: true })

    onMounted(() => {
      setTimeout(() => {
        initGauge()
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
      gaugeRef,
      healthScore,
      healthIndicators
    }
  }
}
</script>

<style scoped>
.financial-health-gauge {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.gauge-container {
  height: 200px;
  margin-bottom: 1rem;
}

.health-indicators {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.indicator-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.indicator-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.indicator-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.indicator-content {
  flex: 1;
}

.indicator-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.125rem;
}

.indicator-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.indicator-trend {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

.indicator-trend.up {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.indicator-trend.down {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}
</style>
