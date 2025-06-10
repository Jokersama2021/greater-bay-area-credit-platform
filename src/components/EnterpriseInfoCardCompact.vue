<template>
  <div class="compact-info-card">
    <div class="compact-header">
      <div class="compact-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
        </svg>
      </div>
      <h3 class="compact-title">信用画像</h3>
    </div>
    
    <div class="compact-content">
      <!-- 企業基本信息 -->
      <div class="enterprise-basic">
        <div class="enterprise-name">
          <div class="company-icon">🏢</div>
          <div class="company-info">
            <div class="company-name">{{ currentEnterprise.name }}</div>
            <div class="company-location">📍 {{ currentEnterprise.location }}</div>
          </div>
        </div>
      </div>
      
      <!-- 關键指標網格 -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-icon">⭐</div>
          <div class="metric-content">
            <div class="metric-value">{{ currentEnterprise.creditScore }}</div>
            <div class="metric-label">信用評分</div>
            <div class="metric-badge success">{{ currentEnterprise.creditLevel }}</div>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">📅</div>
          <div class="metric-content">
            <div class="metric-value">{{ currentEnterprise.operatingYears }}</div>
            <div class="metric-label">經营年限</div>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">🏭</div>
          <div class="metric-content">
            <div class="metric-value">{{ currentEnterprise.scale }}</div>
            <div class="metric-label">企業規模</div>
          </div>
        </div>
        
        <div class="metric-card">
          <div class="metric-icon">🌐</div>
          <div class="metric-content">
            <div class="metric-value">{{ currentEnterprise.crossBorderStatus }}</div>
            <div class="metric-label">跨境業務</div>
            <div class="status-indicator active"></div>
          </div>
        </div>
        
        <div class="metric-card full-width">
          <div class="metric-icon">🛡️</div>
          <div class="metric-content">
            <div class="metric-label">合規記录</div>
            <div class="compliance-status">
              <div class="metric-badge success">{{ currentEnterprise.complianceRecord }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseInfoCardCompact',
  data() {
    return {
      currentEnterprise: {
        name: '比亚迪股份有限公司',
        location: '深圳',
        creditScore: '880',
        creditLevel: 'AAA',
        operatingYears: '30',
        scale: '大型企業',
        crossBorderStatus: '活躍',
        complianceRecord: '良好'
      }
    }
  }
}
</script>

<style scoped>
.compact-info-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.08) 0%, 
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.compact-info-card:hover {
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
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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

.enterprise-basic {
  margin-bottom: 1rem;
}

.enterprise-name {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.company-icon {
  font-size: 1.5rem;
}

.company-info {
  flex: 1;
}

.company-name {
  color: #e2e8f0;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.2;
}

.company-location {
  color: #94a3b8;
  font-size: 0.75rem;
  margin-top: 2px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
}

.metric-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

.metric-card.full-width {
  grid-column: 1 / -1;
}

.metric-icon {
  font-size: 1rem;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
  min-width: 0;
}

.metric-value {
  color: #e2e8f0;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1;
}

.metric-label {
  color: #94a3b8;
  font-size: 0.7rem;
  line-height: 1;
  margin-top: 2px;
}

.metric-badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  margin-top: 2px;
}

.metric-badge.success {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.compliance-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  flex-shrink: 0;
}

.status-indicator.active {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .metric-card.full-width {
    grid-column: 1;
  }
}
</style>
