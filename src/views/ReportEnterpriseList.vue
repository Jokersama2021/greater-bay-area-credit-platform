<template>
  <div class="enterprise-list-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载企业列表中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 页面头部 -->
      <div class="page-header animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="header-content">
          <div class="header-icon animate-bounce-in" style="animation-delay: 0.2s">
            <i :class="reportTypeIcon"></i>
          </div>
          <div class="header-info animate-slide-in-left" style="animation-delay: 0.3s">
            <h1 class="page-title">{{ reportTypeName }}</h1>
            <p class="page-subtitle">选择企业查看详细报告</p>
          </div>
          <div class="header-stats animate-slide-in-right" style="animation-delay: 0.4s">
            <div class="stat-item">
              <div class="stat-value">{{ enterprises.length }}</div>
              <div class="stat-label">企业总数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ onlineCount }}</div>
              <div class="stat-label">在线企业</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索和筛选 -->
      <div class="search-filter-section animate-fade-in-up" style="animation-delay: 0.5s">
        <div class="search-box">
          <div class="search-input-wrapper">
            <i class="fas fa-search search-icon"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索企业名称、统一社会信用代码..."
              class="search-input"
            />
            <button v-if="searchQuery" @click="clearSearch" class="clear-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div class="filter-tabs">
          <button
            v-for="(filter, index) in filters"
            :key="filter.id"
            :class="['filter-tab', { active: activeFilter === filter.id }]"
            :style="{ animationDelay: `${0.6 + index * 0.1}s` }"
            class="animate-slide-in-up"
            @click="activeFilter = filter.id"
          >
            <i :class="filter.icon"></i>
            <span>{{ filter.name }}</span>
            <span class="filter-count">{{ filter.count }}</span>
          </button>
        </div>
      </div>

      <!-- 企业列表 -->
      <div class="enterprises-grid">
        <div
          v-for="(enterprise, index) in filteredEnterprises"
          :key="enterprise.id"
          class="enterprise-card animate-card-in"
          :style="{ animationDelay: `${1.0 + index * 0.1}s` }"
          @click="viewReport(enterprise)"
        >
          <div class="enterprise-header">
            <div class="enterprise-logo">
              <i :class="enterprise.icon"></i>
            </div>
            <div class="enterprise-status" :class="enterprise.status">
              <div class="status-dot"></div>
              <span>{{ getStatusText(enterprise.status) }}</span>
            </div>
          </div>
          
          <div class="enterprise-info">
            <h3 class="enterprise-name">{{ enterprise.name }}</h3>
            <p class="enterprise-code">{{ enterprise.creditCode }}</p>
            <div class="enterprise-details">
              <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ enterprise.location }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-industry"></i>
                <span>{{ enterprise.industry }}</span>
              </div>
              <div class="detail-item">
                <i class="fas fa-calendar-alt"></i>
                <span>成立于 {{ enterprise.establishedYear }}</span>
              </div>
            </div>
          </div>

          <div class="enterprise-metrics">
            <div class="metric-item">
              <span class="metric-label">信用等级</span>
              <span class="metric-value" :class="enterprise.creditLevel.toLowerCase()">
                {{ enterprise.creditLevel }}
              </span>
            </div>
            <div class="metric-item">
              <span class="metric-label">注册资本</span>
              <span class="metric-value">{{ enterprise.registeredCapital }}</span>
            </div>
          </div>

          <div class="enterprise-actions">
            <button class="action-btn primary" @click.stop="viewReport(enterprise)">
              <i class="fas fa-file-alt"></i>
              查看报告
            </button>
            <button class="action-btn secondary" @click.stop="viewDetails(enterprise)">
              <i class="fas fa-info-circle"></i>
              详细信息
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ReportEnterpriseList',
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const loading = ref(true)
    const searchQuery = ref('')
    const activeFilter = ref('all')
    
    // 根据路由参数确定报告类型
    const reportTypes = {
      'enterprise-credit': {
        name: '企业资信报告',
        icon: 'fas fa-building'
      },
      'asset-evaluation': {
        name: '资产评估报告',
        icon: 'fas fa-chart-line'
      },
      'enterprise-rating': {
        name: '企业评分报告',
        icon: 'fas fa-star'
      },
      'risk-warning': {
        name: '风控预警报告',
        icon: 'fas fa-exclamation-triangle'
      }
    }
    
    const reportType = computed(() => route.params.type || 'enterprise-credit')
    const reportTypeName = computed(() => reportTypes[reportType.value]?.name || '企业报告')
    const reportTypeIcon = computed(() => reportTypes[reportType.value]?.icon || 'fas fa-building')
    
    // 模拟企业数据
    const enterprises = ref([
      {
        id: 1,
        name: '腾讯控股有限公司',
        creditCode: '91440300279467019E',
        location: '深圳市南山区',
        industry: '互联网科技',
        establishedYear: '1998',
        creditLevel: 'AAA',
        registeredCapital: '25.6亿港元',
        status: 'online',
        icon: 'fas fa-laptop-code'
      },
      {
        id: 2,
        name: '比亚迪股份有限公司',
        creditCode: '91440300192317458Y',
        location: '深圳市坪山区',
        industry: '新能源汽车',
        establishedYear: '1995',
        creditLevel: 'AA',
        registeredCapital: '29.4亿元',
        status: 'online',
        icon: 'fas fa-car'
      },
      {
        id: 3,
        name: '华为技术有限公司',
        creditCode: '91440300618057294B',
        location: '深圳市龙岗区',
        industry: '通信设备',
        establishedYear: '1987',
        creditLevel: 'AAA',
        registeredCapital: '403.1亿元',
        status: 'online',
        icon: 'fas fa-mobile-alt'
      },
      {
        id: 4,
        name: '招商银行股份有限公司',
        creditCode: '91440300100011047G',
        location: '深圳市福田区',
        industry: '银行业',
        establishedYear: '1987',
        creditLevel: 'AAA',
        registeredCapital: '252.2亿元',
        status: 'online',
        icon: 'fas fa-university'
      },
      {
        id: 5,
        name: '万科企业股份有限公司',
        creditCode: '91440300192317458A',
        location: '深圳市盐田区',
        industry: '房地产',
        establishedYear: '1984',
        creditLevel: 'AA',
        registeredCapital: '110.9亿元',
        status: 'offline',
        icon: 'fas fa-building'
      },
      {
        id: 6,
        name: '平安保险(集团)股份有限公司',
        creditCode: '91440300100011047H',
        location: '深圳市福田区',
        industry: '保险业',
        establishedYear: '1988',
        creditLevel: 'AAA',
        registeredCapital: '182.8亿元',
        status: 'online',
        icon: 'fas fa-shield-alt'
      }
    ])
    
    const filters = ref([
      { id: 'all', name: '全部', icon: 'fas fa-list', count: 0 },
      { id: 'online', name: '在线', icon: 'fas fa-circle', count: 0 },
      { id: 'aaa', name: 'AAA级', icon: 'fas fa-star', count: 0 },
      { id: 'tech', name: '科技类', icon: 'fas fa-microchip', count: 0 }
    ])
    
    const onlineCount = computed(() => 
      enterprises.value.filter(e => e.status === 'online').length
    )
    
    const filteredEnterprises = computed(() => {
      let filtered = enterprises.value
      
      // 搜索过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(e => 
          e.name.toLowerCase().includes(query) ||
          e.creditCode.toLowerCase().includes(query)
        )
      }
      
      // 状态过滤
      if (activeFilter.value === 'online') {
        filtered = filtered.filter(e => e.status === 'online')
      } else if (activeFilter.value === 'aaa') {
        filtered = filtered.filter(e => e.creditLevel === 'AAA')
      } else if (activeFilter.value === 'tech') {
        filtered = filtered.filter(e => 
          e.industry.includes('科技') || e.industry.includes('互联网')
        )
      }
      
      return filtered
    })
    
    const getStatusText = (status) => {
      return status === 'online' ? '在线' : '离线'
    }
    
    const clearSearch = () => {
      searchQuery.value = ''
    }
    
    const viewReport = (enterprise) => {
      router.push(`/report/${reportType.value}/${enterprise.id}`)
    }
    
    const viewDetails = (enterprise) => {
      router.push(`/enterprise/${enterprise.id}`)
    }
    
    const updateFilterCounts = () => {
      filters.value[0].count = enterprises.value.length
      filters.value[1].count = enterprises.value.filter(e => e.status === 'online').length
      filters.value[2].count = enterprises.value.filter(e => e.creditLevel === 'AAA').length
      filters.value[3].count = enterprises.value.filter(e => 
        e.industry.includes('科技') || e.industry.includes('互联网')
      ).length
    }
    
    onMounted(() => {
      setTimeout(() => {
        updateFilterCounts()
        loading.value = false
      }, 800)
    })
    
    return {
      loading,
      searchQuery,
      activeFilter,
      reportTypeName,
      reportTypeIcon,
      enterprises,
      filters,
      onlineCount,
      filteredEnterprises,
      getStatusText,
      clearSearch,
      viewReport,
      viewDetails
    }
  }
}
</script>

<style scoped>
.enterprise-list-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a2332 100%);
  color: white;
  padding: 2rem;
}

.simple-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
}

/* 页面进入动画 */
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-bounce-in {
  opacity: 0;
  transform: scale(0.3);
  animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

.animate-slide-in-left {
  opacity: 0;
  transform: translateX(-50px);
  animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-slide-in-right {
  opacity: 0;
  transform: translateX(50px);
  animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-slide-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-card-in {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  animation: cardIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.header-info {
  flex: 1;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #3b82f6;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

/* 搜索和筛选样式 */
.search-filter-section {
  margin-bottom: 2rem;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.clear-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

.filter-tabs {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-tab:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.filter-tab.active {
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  border-color: transparent;
  color: white;
}

.filter-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: 600;
}

.filter-tab.active .filter-count {
  background: rgba(255, 255, 255, 0.3);
}

/* 企业列表样式 */
.enterprises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.enterprise-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.enterprise-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.enterprise-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.enterprise-card:hover::before {
  opacity: 1;
}

.enterprise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.enterprise-logo {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.enterprise-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.enterprise-status.online {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.enterprise-status.offline {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.enterprise-info {
  margin-bottom: 1rem;
}

.enterprise-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.enterprise-code {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  font-family: monospace;
}

.enterprise-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.detail-item i {
  color: #3b82f6;
  width: 16px;
}

.enterprise-metrics {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.metric-item {
  text-align: center;
}

.metric-label {
  display: block;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
}

.metric-value.aaa {
  color: #22c55e;
}

.metric-value.aa {
  color: #3b82f6;
}

.metric-value.a {
  color: #f59e0b;
}

.enterprise-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.action-btn.primary {
  background: linear-gradient(135deg, #3b82f6, #7c3aed);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .enterprises-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .enterprise-list-container {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .header-stats {
    justify-content: center;
  }

  .enterprises-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .filter-tabs {
    justify-content: center;
  }

  .enterprise-metrics {
    flex-direction: column;
    gap: 1rem;
  }

  .enterprise-actions {
    flex-direction: column;
  }
}
</style>
