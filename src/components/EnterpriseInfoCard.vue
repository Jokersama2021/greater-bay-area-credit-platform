<template>
  <div class="enterprise-info-card">
    <div class="info-header">
      <div class="company-avatar">
        <div class="avatar-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21H21M5 21V7L13 2L21 7V21M9 9V13M15 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="company-basic">
        <h3 class="company-name">{{ currentEnterprise.name }}</h3>
        <div class="company-region">
          <i class="fas fa-map-marker-alt"></i>
          <span>{{ currentEnterprise.region }}</span>
        </div>
      </div>
    </div>

    <div class="info-metrics">
      <div class="metric-item">
        <div class="metric-icon credit">
          <i class="fas fa-star"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ currentEnterprise.creditScore }}</div>
          <div class="metric-label">信用评分</div>
        </div>
        <div class="metric-badge" :class="getCreditLevelClass(currentEnterprise.creditLevel)">
          {{ currentEnterprise.creditLevel }}
        </div>
      </div>

      <div class="metric-item">
        <div class="metric-icon years">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ currentEnterprise.businessYears }}</div>
          <div class="metric-label">经营年限</div>
        </div>
        <div class="metric-trend">
          <i class="fas fa-arrow-up"></i>
        </div>
      </div>

      <div class="metric-item">
        <div class="metric-icon scale">
          <i class="fas fa-building"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ currentEnterprise.scale }}</div>
          <div class="metric-label">企业规模</div>
        </div>
      </div>

      <div class="metric-item">
        <div class="metric-icon business">
          <i class="fas fa-globe"></i>
        </div>
        <div class="metric-content">
          <div class="metric-value">{{ currentEnterprise.crossBorderBusiness }}</div>
          <div class="metric-label">跨境业务</div>
        </div>
        <div class="activity-indicator" :class="getActivityClass(currentEnterprise.crossBorderBusiness)">
          <div class="pulse"></div>
        </div>
      </div>
    </div>

    <div class="compliance-status">
      <div class="status-header">
        <i class="fas fa-shield-alt"></i>
        <span>合规记录</span>
      </div>
      <div class="status-badge" :class="getComplianceClass(currentEnterprise.complianceRecord)">
        <i class="fas fa-check-circle"></i>
        {{ currentEnterprise.complianceRecord }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'EnterpriseInfoCard',
  setup() {
    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    const getCreditLevelClass = (level) => {
      const classes = {
        'AAA': 'level-aaa',
        'AA': 'level-aa',
        'A': 'level-a',
        'BBB': 'level-bbb',
        'BB': 'level-bb',
        'B': 'level-b'
      }
      return classes[level] || 'level-default'
    }

    const getActivityClass = (activity) => {
      const classes = {
        '非常活跃': 'very-active',
        '活跃': 'active',
        '一般': 'normal',
        '较少': 'low'
      }
      return classes[activity] || 'normal'
    }

    const getComplianceClass = (compliance) => {
      const classes = {
        '优秀': 'excellent',
        '良好': 'good',
        '一般': 'normal',
        '较差': 'poor'
      }
      return classes[compliance] || 'normal'
    }

    return {
      currentEnterprise,
      getCreditLevelClass,
      getActivityClass,
      getComplianceClass
    }
  }
}
</script>

<style scoped>
.enterprise-info-card {
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

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.company-avatar {
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.avatar-icon svg {
  width: 1.5rem;
  height: 1.5rem;
  color: white;
}

.company-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 0.25rem 0;
  font-family: var(--font-heading);
}

.company-region {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

.info-metrics {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.metric-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-1px);
}

.metric-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
}

.metric-icon.credit { background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%); }
.metric-icon.years { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.metric-icon.scale { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.metric-icon.business { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0.125rem;
}

.metric-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.metric-badge {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
}

.level-aaa { background: #4CAF50; color: white; }
.level-aa { background: #8BC34A; color: white; }
.level-a { background: #CDDC39; color: #333; }

.activity-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  position: relative;
}

.very-active { background: #4CAF50; }
.active { background: #8BC34A; }
.normal { background: #FFC107; }
.low { background: #FF9800; }

.pulse {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.very-active .pulse { background: rgba(76, 175, 80, 0.3); }
.active .pulse { background: rgba(139, 195, 74, 0.3); }

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1.4); opacity: 0; }
}

.compliance-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.excellent { background: #4CAF50; color: white; }
.good { background: #8BC34A; color: white; }
.normal { background: #FFC107; color: #333; }
.poor { background: #F44336; color: white; }
</style>
