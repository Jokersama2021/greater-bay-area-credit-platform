<template>
  <div class="dashboard-container">

    <!-- 跨境数据流动背景 -->
    <cross-border-data-flow />


    <!-- 主要功能区域 -->
    <div class="main-content-grid">
      <!-- 左侧区域 -->
      <div class="sidebar-left">
        <!-- 企业展示大框 -->
        <div class="enterprise-display-container">
          <div class="enterprise-display-header">
            <div class="enterprise-display-title">
              <div class="enterprise-display-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21M5 21V7L13 2L21 7V21M9 9V13M15 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 class="enterprise-display-title-text">企业信用分析</h1>
            </div>
            <div class="enterprise-display-subtitle">
              实时监控企业信用状况与风险评估
            </div>
          </div>

          <div class="enterprise-modules">
            <!-- 企业选择器 -->
            <enterprise-selector />

            <!-- 风险监测 -->
            <div class="modern-card card-hover animate-slide-in-left" style="animation-delay: 0.05s">
              <div class="card-header-modern">
                <div class="card-title-wrapper">
                  <div class="card-icon-modern risk-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2 class="card-title-modern gradient-text">风险监测</h2>
                </div>
              </div>
              <div class="chart-container">
                <beautiful-risk-chart />
              </div>
            </div>

            <!-- 信用评分 -->
            <div class="modern-card card-hover animate-slide-in-left" style="animation-delay: 0.1s">
              <div class="card-header-modern">
                <div class="card-title-wrapper">
                  <div class="card-icon-modern credit-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M22 12A10 10 0 0 0 12 2V12L22 12Z" fill="currentColor" opacity="0.2"/>
                    </svg>
                  </div>
                  <h2 class="card-title-modern gradient-text">信用评分</h2>
                </div>
              </div>
              <div class="chart-container">
                <credit-radar-chart />
              </div>
            </div>

            <!-- 跨境业务活跃度 -->
            <div class="animate-slide-in-left" style="animation-delay: 0.15s">
              <cross-border-activity />
            </div>

            <!-- 发展趋势 -->
            <div class="animate-slide-in-left" style="animation-delay: 0.2s">
              <enterprise-trend-chart />
            </div>

            <!-- 行业对比 -->
            <div class="animate-slide-in-left" style="animation-delay: 0.25s">
              <industry-comparison-radar />
            </div>
          </div>
        </div>
      </div>

      <!-- 中间地图区域 -->
      <div class="main-section">
        <div class="modern-card card-hover map-card animate-fade-in-up" style="animation-delay: 0.2s">
          <div class="card-header-modern">
            <div class="card-title-wrapper">
              <div class="card-icon-modern map-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                  <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h2 class="card-title-modern gradient-text-accent">粤港澳大湾区企业分布</h2>
            </div>

          </div>
          <div class="map-wrapper mt-4 rounded-xl overflow-hidden">
            <greater-bay-area-map class="h-[460px]" />
          </div>
          
          <!-- 合作机构 -->
          <div class="partner-logos-wrapper mt-4">
            <div class="partner-section-title">
              <span class="partner-title-text">合作机构</span>
              <div class="partner-title-line"></div>
            </div>
            <div class="mt-3">
              <partner-logos />
            </div>
          </div>
        </div>

        <!-- 跨链信息查询 -->
        <div class="modern-card card-hover animate-fade-in-up" style="animation-delay: 0.4s">
          <cross-chain-info />
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="sidebar-right">
        <!-- 信用报告 -->
        <div class="modern-card card-hover animate-slide-in-right" style="animation-delay: 0.1s">
          <div class="card-header-modern">
            <div class="card-title-wrapper">
              <div class="card-icon-modern report-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 class="card-title-modern gradient-text">信用报告</h2>
            </div>
          </div>
          <div class="content-container">
            <report-list />
          </div>
        </div>

        <!-- 合作产品 -->
        <div class="modern-card card-hover animate-slide-in-right" style="animation-delay: 0.2s">
          <div class="card-header-modern">
            <div class="card-title-wrapper">
              <div class="card-icon-modern product-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="12,22.08 12,17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h2 class="card-title-modern gradient-text">合作产品</h2>
            </div>
            <div class="card-badge">
              <span class="badge-text">热门</span>
            </div>
          </div>
          <div class="content-container">
            <product-grid />
          </div>
        </div>

        <!-- 跨境服务记录 -->
        <div class="modern-card card-hover animate-slide-in-right" style="animation-delay: 0.3s">
          <div class="card-header-modern">
            <div class="card-title-wrapper">
              <div class="card-icon-modern service-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" stroke-width="2"/>
                </svg>
              </div>
              <h2 class="card-title-modern gradient-text">跨境服务记录</h2>
            </div>
          </div>
          <div class="content-container">
            <service-records />
          </div>
        </div>
      </div>
    </div>

    <!-- 详情模态框 -->
    <detail-modal
      :visible="modalState.visible"
      :title="modalState.title"
      :subtitle="modalState.subtitle"
      :icon="modalState.icon"
      :icon-color="modalState.iconColor"
      @close="closeModal"
    >
      <div v-if="modalState.content === 'risk'" class="modal-detail-content">
        <div class="detail-stats-grid">
          <div class="detail-stat-item">
            <div class="stat-icon risk">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ currentRiskData.total }}</div>
              <div class="stat-label">风险预警次数</div>
            </div>
          </div>
          <div class="detail-stat-item">
            <div class="stat-icon warning">
              <i class="fas fa-percentage"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ currentRiskData.percentage }}%</div>
              <div class="stat-label">风险预警占比</div>
            </div>
          </div>
        </div>
        <div class="detail-chart-container">
          <div ref="riskChartRef" class="detail-chart"></div>
        </div>
      </div>

      <div v-else-if="modalState.content === 'enterprise'" class="modal-detail-content">
        <div class="detail-stats-grid">
          <div class="detail-stat-item">
            <div class="stat-icon enterprise">
              <i class="fas fa-building"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ animatedNumbers.enterprises.toLocaleString() }}</div>
              <div class="stat-label">注册企业总数</div>
            </div>
          </div>
          <div class="detail-stat-item">
            <div class="stat-icon growth">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">+8%</div>
              <div class="stat-label">月增长率</div>
            </div>
          </div>
        </div>
        <div class="detail-description">
          <p>粤港澳大湾区企业注册数量持续增长，其中科技创新企业占比显著提升，跨境业务活跃度不断增强。</p>
        </div>
      </div>

      <div v-else-if="modalState.content === 'transaction'" class="modal-detail-content">
        <div class="detail-stats-grid">
          <div class="detail-stat-item">
            <div class="stat-icon transaction">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ animatedNumbers.transactions.toLocaleString() }}万</div>
              <div class="stat-label">跨境交易笔数</div>
            </div>
          </div>
          <div class="detail-stat-item">
            <div class="stat-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">99.2%</div>
              <div class="stat-label">交易成功率</div>
            </div>
          </div>
        </div>
        <div class="detail-description">
          <p>跨境贸易交易量稳步增长，数字化支付方式普及率达到95%以上，交易效率显著提升。</p>
        </div>
      </div>

      <div v-else-if="modalState.content === 'amount'" class="modal-detail-content">
        <div class="detail-stats-grid">
          <div class="detail-stat-item">
            <div class="stat-icon amount">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">¥{{ animatedNumbers.amount.toLocaleString() }}亿</div>
              <div class="stat-label">交易总金额</div>
            </div>
          </div>
          <div class="detail-stat-item">
            <div class="stat-icon trend">
              <i class="fas fa-arrow-up"></i>
            </div>
            <div class="stat-info">
              <div class="stat-value">+23%</div>
              <div class="stat-label">同比增长</div>
            </div>
          </div>
        </div>
        <div class="detail-description">
          <p>跨境贸易金额创历史新高，其中高新技术产品贸易占比超过40%，服务贸易增长迅速。</p>
        </div>
      </div>
    </detail-modal>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { enterpriseDataService } from '../services/enterpriseDataService'
import CreditRadarChart from '../components/CreditRadarChart.vue'
import ReportList from '../components/ReportList.vue'
import ProductGrid from '../components/ProductGrid.vue'
import ServiceRecords from '../components/ServiceRecords.vue'
import GreaterBayAreaMap from '../components/GreaterBayAreaMap.vue'
import PartnerLogos from '../components/PartnerLogos.vue'
import CrossChainInfo from '../components/CrossChainInfo.vue'
import CrossBorderDataFlow from '../components/CrossBorderDataFlow.vue'

import ExpandableCard from '../components/ExpandableCard.vue'
import CompactStatsCard from '../components/CompactStatsCard.vue'
import DetailModal from '../components/DetailModal.vue'
import BeautifulRiskChart from '../components/BeautifulRiskChart.vue'
import EnterpriseSelector from '../components/EnterpriseSelector.vue'
import EnterpriseInfoCard from '../components/EnterpriseInfoCard.vue'
import FinancialHealthGauge from '../components/FinancialHealthGauge.vue'
import CrossBorderActivity from '../components/CrossBorderActivity.vue'
import EnterpriseTrendChart from '../components/EnterpriseTrendChart.vue'
import IndustryComparisonRadar from '../components/IndustryComparisonRadar.vue'

export default {
  name: 'Home',
  components: {
    CreditRadarChart,
    ReportList,
    ProductGrid,
    ServiceRecords,
    GreaterBayAreaMap,
    PartnerLogos,
    CrossChainInfo,
    CrossBorderDataFlow,

    ExpandableCard,
    CompactStatsCard,
    DetailModal,
    BeautifulRiskChart,
    EnterpriseSelector,
    EnterpriseInfoCard,
    FinancialHealthGauge,
    CrossBorderActivity,
    EnterpriseTrendChart,
    IndustryComparisonRadar
  },
  setup() {
    const currentTime = ref('')

    // 获取当前企业数据
    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())

    // 计算当前企业的风险数据
    const currentRiskData = computed(() => {
      const riskData = currentEnterprise.value.riskData
      const total = riskData.reduce((sum, val) => sum + val, 0)
      const percentage = ((total / (riskData.length * 30)) * 100).toFixed(1) // 假设每月最大风险数为30
      return {
        total,
        percentage: parseFloat(percentage)
      }
    })

    // 数字动画状态
    const animatedNumbers = ref({
      riskWarnings: 0,
      riskPercentage: 0,
      enterprises: 0,
      transactions: 0,
      amount: 0
    })

    // 模态框状态
    const modalState = ref({
      visible: false,
      title: '',
      subtitle: '',
      icon: '',
      iconColor: '',
      content: ''
    })

    const updateTime = () => {
      const now = new Date()
      currentTime.value = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    }

    // 数字动画函数
    const animateNumber = (target, key, duration = 4500) => { // 从3000ms增加到4500ms
      const start = animatedNumbers.value[key]
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用更柔和的缓动函数 - easeOutExpo
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        animatedNumbers.value[key] = Math.round(start + (target - start) * easeOutExpo)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }



    // 显示详情方法
    const showRiskDetails = () => {
      modalState.value = {
        visible: true,
        title: '风险预警详情',
        subtitle: '系统风险监控和预警信息',
        icon: 'fas fa-exclamation-triangle',
        iconColor: '#FF3B30',
        content: 'risk'
      }
    }

    const showEnterpriseDetails = () => {
      modalState.value = {
        visible: true,
        title: '企业统计详情',
        subtitle: '大湾区注册企业分布情况',
        icon: 'fas fa-building',
        iconColor: '#007AFF',
        content: 'enterprise'
      }
    }

    const showTransactionDetails = () => {
      modalState.value = {
        visible: true,
        title: '跨境交易详情',
        subtitle: '跨境贸易交易统计分析',
        icon: 'fas fa-exchange-alt',
        iconColor: '#30D158',
        content: 'transaction'
      }
    }

    const showAmountDetails = () => {
      modalState.value = {
        visible: true,
        title: '交易金额详情',
        subtitle: '跨境贸易金额统计分析',
        icon: 'fas fa-chart-line',
        iconColor: '#FF9500',
        content: 'amount'
      }
    }

    const closeModal = () => {
      modalState.value.visible = false
    }

    onMounted(() => {
      updateTime()
      setInterval(updateTime, 1000)

      // 启动数字动画 - 更合理的数据
      setTimeout(() => {
        animateNumber(45, 'riskWarnings', 1500) // 风险预警次数
      }, 300)
      setTimeout(() => {
        animateNumber(1.2, 'riskPercentage', 1600) // 风险预警占比
      }, 400)
      setTimeout(() => {
        animateNumber(12580, 'enterprises', 1700) // 注册企业数量
      }, 500)
      setTimeout(() => {
        animateNumber(8960, 'transactions', 1650) // 跨境交易笔数（万笔）
      }, 600)
      setTimeout(() => {
        animateNumber(2847, 'amount', 1800) // 交易金额（亿元）
      }, 700)
    })

    onUnmounted(() => {
      // 清理工作已移至各个组件内部
    })

    return {
      currentTime,
      animatedNumbers,
      modalState,
      currentEnterprise,
      currentRiskData,
      showRiskDetails,
      showEnterpriseDetails,
      showTransactionDetails,
      showAmountDetails,
      closeModal
    }
  }
}
</script>

<style scoped>
/* 仪表板容器 */
.dashboard-container {
  min-height: calc(100vh - 80px);
  background: transparent;
}

/* dashboard-grid 已移除，使用 main-content-grid */

/* 响应式设计 - 移除dashboard-grid的响应式规则，使用main-content-grid */

/* 企业展示容器 */
.enterprise-display-container {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 2rem;
  backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.enterprise-display-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%);
}

.enterprise-display-header {
  margin-bottom: 2rem;
  text-align: center;
}

.enterprise-display-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.enterprise-display-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.enterprise-display-icon svg {
  width: 1.5rem;
  height: 1.5rem;
}

.enterprise-display-title-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  font-family: var(--font-heading);
}

.enterprise-display-subtitle {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 400;
  font-family: var(--font-body);
}

.enterprise-modules {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 图表行布局 */
.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

/* 紧凑卡片样式 */
.compact-chart {
  padding: 1rem !important;
}

.compact-portrait {
  padding: 1rem !important;
}

.card-header-compact {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.card-icon-small {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
}

.card-icon-small.risk-icon { background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); }
.card-icon-small.portrait-icon { background: linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%); }

.card-icon-small svg {
  width: 1rem;
  height: 1rem;
}

.card-title-compact {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-family: var(--font-heading);
}

.compact-metrics {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.compact-metric {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.metric-number {
  font-size: 1.1rem;
  font-weight: 700;
  color: #FF6B6B;
  font-family: var(--font-mono);
}

.metric-unit {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
}

.mini-chart {
  height: 100px;
}

.compact-chart-container {
  height: 140px;
}

/* 企业信息卡片包装器 */
.enterprise-info-card-wrapper {
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.08) 0%,
    rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s var(--ease-out-expo);
}

.enterprise-info-card-wrapper:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 30px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.sidebar-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-area: left;
}

.sidebar-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-area: right;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  grid-area: center;
}

/* 现代化卡片悬停效果 */
.card-hover {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 动画关键帧 */
@keyframes slideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px) scale(0.95);
  }
  60% {
    opacity: 0.8;
    transform: translateX(10px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.card-hover:hover {
  transform: translateY(-4px) scale(1.01);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.08),
    0 0 40px rgba(99, 102, 241, 0.15);
}

/* 大模块淡入动画 - 苹果风格 */
.animate-slide-in-left {
  animation: appleSlideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateX(-20px) scale(0.95);
}

.animate-slide-in-right {
  animation: appleSlideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.animate-fade-in-up {
  animation: appleFadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

@keyframes appleSlideInLeft {
  0% {
    opacity: 0;
    transform: translateX(-20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes appleSlideInRight {
  0% {
    opacity: 0;
    transform: translateX(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes appleFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -4px, 0);
  }
  70% {
    transform: translate3d(0, -2px, 0);
  }
  90% {
    transform: translate3d(0, -1px, 0);
  }
}

/* 现代化卡片头部 */
.card-header-modern {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .card-header-modern {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .card-header-modern {
    margin-bottom: 0.75rem;
  }
}

.card-title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.card-icon-modern {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: white;
  box-shadow: var(--shadow-md);
  transition: all 0.3s var(--ease-out-expo);
  position: relative;
  overflow: hidden;
}

.card-icon-modern::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.card-hover:hover .card-icon-modern::before {
  animation: shimmer 1.5s ease-in-out;
}

.card-hover:hover .card-icon-modern {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.card-icon-modern svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

/* 图标颜色样式 */
.card-icon-modern.risk-icon { background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%); }
.card-icon-modern.credit-icon { background: linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%); }
.card-icon-modern.portrait-icon { background: linear-gradient(135deg, #A8E6CF 0%, #88D8A3 100%); }
.card-icon-modern.health-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }

.stats-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.risk-icon {
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.credit-icon {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
}

.portrait-icon {
  background: linear-gradient(135deg, #10b981, #06b6d4);
}

.report-icon {
  background: linear-gradient(135deg, #8b5cf6, #ec4899);
}

.service-icon {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
}

.product-icon {
  background: linear-gradient(135deg, #f59e0b, #ef4444);
}

.card-title-modern {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.card-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  font-size: 0.75rem;
}

.badge-text {
  color: var(--success-color);
  font-weight: 500;
}

/* 地图卡片特殊样式 */
.map-card {
  min-height: 600px;
}

@media (max-width: 1024px) {
  .map-card {
    min-height: 500px;
  }
}

@media (max-width: 768px) {
  .map-card {
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .map-card {
    min-height: 350px;
  }
}

.map-icon {
  background: linear-gradient(135deg, #06b6d4, #3b82f6);
}

.stats-summary {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .stats-summary {
    gap: 0.5rem;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .stats-summary {
    flex-direction: column;
    gap: 0.5rem;
  }
}

.stats-pill-modern {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  font-size: 0.875rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stats-pill-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.stats-pill-modern:hover::before {
  left: 100%;
}

.stats-pill-modern:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(0, 174, 255, 0.4);
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 174, 255, 0.2);
}

.stats-value {
  font-weight: 700;
  color: var(--text-light);
  font-family: var(--font-mono);
}

.stats-label {
  color: var(--text-dim);
  font-weight: 500;
}

/* 内容容器 */
.content-container,
.chart-container {
  position: relative;
  z-index: 1;
}

/* 数据瓦片现代化 */
.data-tile {
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.data-tile::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-primary);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.data-tile:hover::before {
  opacity: 1;
}

.data-tile:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .data-tile {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .data-tile {
    padding: 0.5rem;
  }

  .flex.gap-4 {
    flex-direction: column;
    gap: 0.75rem;
  }
}

.data-title {
  font-size: 0.875rem;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
  font-weight: 500;
}

.data-value {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: var(--font-mono);
  line-height: 1;
}

/* 风险图表容器 */
.risk-chart {
  height: 150px;
  margin-top: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

/* 移除重复的响应式规则 */

.dashboard-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 
              0 0 0 1px rgba(255, 255, 255, 0.1), 
              0 0 0 4px rgba(124, 58, 237, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(to right, #f0f0f0, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(45deg, rgba(124, 58, 237, 0.5), rgba(59, 130, 246, 0.5));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
}

/* 重复的data-tile样式已在上面定义，删除此重复定义 */

.data-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
}

.data-value {
  font-size: 1.6rem;
  font-weight: 700;
}

.risk-chart {
  height: 130px;
  margin-top: 0.75rem;
}

.stats-pill {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(124, 58, 237, 0.3));
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stats-pill .value {
  font-weight: 700;
  color: #f0f0f0;
  margin-right: 4px;
}

.stats-pill .label {
  color: rgba(255, 255, 255, 0.7);
}

.map-wrapper {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.area-stats-wrapper {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.area-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
}

.region-distribution {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.region-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.region-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.5), rgba(124, 58, 237, 0.5));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.region-content {
  flex: 1;
}

.region-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.region-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.region-value {
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
}

.region-progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.region-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #7c3aed);
  border-radius: 2px;
}

.time-badge {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.partner-logos-wrapper {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-top: 1.25rem;
  background: rgba(15, 23, 42, 0.3);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: inset 0 1px 5px rgba(255, 255, 255, 0.05);
}

.partner-section-title {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.partner-title-text {
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(to right, #60a5fa, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  padding-right: 0.75rem;
}

.partner-title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(124, 58, 237, 0.5), transparent);
}

/* 快速统计样式 */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.main-content-grid {
  display: grid;
  grid-template-columns: 500px 1000px 500px;
  grid-template-areas: "left center right";
  gap: 1.5rem;
  align-items: start;
  max-width: 2200px;
  margin: 0 auto;
  justify-content: center;
  padding: 1.5rem;
}

/* 模态框详情内容样式 */
.modal-detail-content {
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.detail-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.detail-stat-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.stat-icon.risk { background: rgba(255, 59, 48, 0.2); color: #FF3B30; }
.stat-icon.warning { background: rgba(255, 149, 0, 0.2); color: #FF9500; }
.stat-icon.enterprise { background: rgba(0, 122, 255, 0.2); color: #007AFF; }
.stat-icon.growth { background: rgba(48, 209, 88, 0.2); color: #30D158; }
.stat-icon.transaction { background: rgba(48, 209, 88, 0.2); color: #30D158; }
.stat-icon.success { background: rgba(50, 215, 75, 0.2); color: #32D74B; }
.stat-icon.amount { background: rgba(255, 149, 0, 0.2); color: #FF9500; }
.stat-icon.trend { background: rgba(48, 209, 88, 0.2); color: #30D158; }

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.2;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.3;
}

.detail-chart-container {
  height: 220px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 12px;
}

.detail-chart {
  width: 100%;
  height: 100%;
}

.detail-description {
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-top: 16px;
}

.detail-description p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* 响应式设计更新 */

/* 专门针对 1080p 屏幕优化 (1920x1080) */
@media (max-width: 1920px) and (min-width: 1800px) {
  .main-content-grid {
    grid-template-columns: 420px 900px 420px;
    grid-template-areas: "left center right";
    max-width: 1840px;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
  }

  .enterprise-display-container {
    padding: 1.5rem;
    border-radius: 20px;
  }

  .enterprise-display-header {
    margin-bottom: 1.5rem;
  }
}

/* 1080p 及稍小屏幕优化 */
@media (max-width: 1800px) and (min-width: 1600px) {
  .main-content-grid {
    grid-template-columns: 380px 800px 380px;
    grid-template-areas: "left center right";
    max-width: 1640px;
    gap: 0.75rem;
    padding: 1rem;
    justify-content: center;
  }

  .enterprise-display-container {
    padding: 1.25rem;
    border-radius: 18px;
  }

  .enterprise-display-header {
    margin-bottom: 1.25rem;
  }

  .enterprise-display-title-text {
    font-size: 1.3rem;
  }

  .enterprise-display-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  /* 优化卡片间距 */
  .enterprise-modules {
    gap: 0.75rem;
  }

  .sidebar-left, .sidebar-right, .main-section {
    gap: 0.75rem;
  }

  /* 优化紧凑卡片 */
  .compact-chart, .compact-portrait {
    padding: 0.75rem !important;
  }

  .enterprise-info-card-wrapper {
    padding: 0.75rem;
    border-radius: 14px;
  }
}

@media (max-width: 1600px) {
  .main-content-grid {
    grid-template-columns: 450px 450px 450px;
    grid-template-areas: "left center right";
    max-width: 1500px;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

@media (max-width: 1400px) {
  .main-content-grid {
    grid-template-columns: 400px 400px 400px;
    grid-template-areas: "left center right";
    max-width: 1350px;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

@media (max-width: 1200px) {
  .main-content-grid {
    grid-template-columns: 350px 350px 350px;
    grid-template-areas: "left center right";
    max-width: 1150px;
    gap: 1rem;
    padding: 1.5rem;
  }

  .quick-stats {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 1024px) {
  .main-content-grid {
    grid-template-columns: 1fr !important;
    grid-template-areas:
      "center"
      "left"
      "right" !important;
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .main-content-grid {
    padding: 0.75rem;
    gap: 1rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .detail-stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .detail-stat-item {
    padding: 16px;
  }

  .stat-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .main-content-grid {
    padding: 0.5rem;
    gap: 0.75rem;
  }
}
</style>