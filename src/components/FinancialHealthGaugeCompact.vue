<template>
  <div class="compact-health-card">
    <div class="compact-header">
      <div class="compact-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3 class="compact-title">财务健康度</h3>
    </div>
    
    <div class="compact-content">
      <!-- 主要指标 -->
      <div class="main-gauge">
        <div class="gauge-container">
          <svg viewBox="0 0 120 80" class="gauge-svg">
            <!-- 背景弧 -->
            <path
              d="M 20 60 A 40 40 0 0 1 100 60"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              stroke-width="8"
              stroke-linecap="round"
            />
            <!-- 进度弧 -->
            <path
              :d="getProgressPath()"
              fill="none"
              :stroke="getHealthColor()"
              stroke-width="8"
              stroke-linecap="round"
              class="progress-arc"
            />
          </svg>
          <div class="gauge-center">
            <div class="score">{{ healthScore }}</div>
          </div>
        </div>
      </div>
      
      <!-- 关键指标 -->
      <div class="key-metrics">
        <div class="metric-item">
          <div class="metric-icon">⭐</div>
          <div class="metric-info">
            <div class="metric-label">信用等级</div>
            <div class="metric-value">AAA</div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">🛡️</div>
          <div class="metric-info">
            <div class="metric-label">风险等级</div>
            <div class="metric-value">低风险</div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">📅</div>
          <div class="metric-info">
            <div class="metric-label">经营年限</div>
            <div class="metric-value">{{ operatingYears }}年</div>
          </div>
        </div>
        <div class="metric-item">
          <div class="metric-icon">✅</div>
          <div class="metric-info">
            <div class="metric-label">合规状况</div>
            <div class="metric-value">优秀</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinancialHealthGaugeCompact',
  data() {
    return {
      healthScore: 94,
      operatingYears: 38
    }
  },
  methods: {
    getProgressPath() {
      const percentage = this.healthScore / 100
      const angle = percentage * 180 // 半圆
      const radians = (angle * Math.PI) / 180
      const x = 60 + 40 * Math.cos(Math.PI - radians)
      const y = 60 - 40 * Math.sin(Math.PI - radians)
      const largeArcFlag = angle > 90 ? 1 : 0
      
      return `M 20 60 A 40 40 0 ${largeArcFlag} 1 ${x} ${y}`
    },
    getHealthColor() {
      if (this.healthScore >= 80) return '#10b981'
      if (this.healthScore >= 60) return '#f59e0b'
      return '#ef4444'
    }
  }
}
</script>

<style scoped>
.compact-health-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.compact-health-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.compact-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.compact-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.compact-icon svg {
  width: 18px;
  height: 18px;
}

.compact-title {
  color: #e2e8f0;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.compact-content {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.main-gauge {
  flex-shrink: 0;
}

.gauge-container {
  position: relative;
  width: 120px;
  height: 80px;
}

.gauge-svg {
  width: 100%;
  height: 100%;
}

.progress-arc {
  transition: stroke-dasharray 1s ease-in-out;
}

.gauge-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  text-align: center;
}

.score {
  font-size: 1.5rem;
  font-weight: 700;
  color: #10b981;
  line-height: 1;
}

.key-metrics {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.metric-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
}

.metric-info {
  flex: 1;
  min-width: 0;
}

.metric-label {
  font-size: 0.7rem;
  color: #94a3b8;
  line-height: 1;
  margin-bottom: 2px;
}

.metric-value {
  font-size: 0.8rem;
  color: #e2e8f0;
  font-weight: 600;
  line-height: 1;
}

@media (max-width: 768px) {
  .compact-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .key-metrics {
    grid-template-columns: 1fr;
    width: 100%;
  }
}
</style>
