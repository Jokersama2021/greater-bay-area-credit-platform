<template>
  <div class="supply-chain-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加載供應链金融服務中...</div>
    </div>

    <div v-else class="content">
      <!-- 頁面頭部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i class="fas fa-link"></i>
          </div>
          <div class="header-info">
            <h1 class="page-title">供應链金融</h1>
            <p class="page-subtitle">供應链融資服務 - 連接上下游，共享金融价值</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <div class="stat-value">{{ partnerCount }}+</div>
              <div class="stat-label">合作核心企業</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ financingAmount }}亿</div>
              <div class="stat-label">累計融資金额</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服務模式 -->
      <div class="service-modes-section">
        <h2 class="section-title">服務模式</h2>
        <div class="modes-grid">
          <div class="mode-card" v-for="mode in serviceModes" :key="mode.id">
            <div class="mode-icon">
              <i :class="mode.icon"></i>
            </div>
            <h3 class="mode-title">{{ mode.title }}</h3>
            <p class="mode-desc">{{ mode.description }}</p>
            <div class="mode-features">
              <div class="feature-tag" v-for="feature in mode.features" :key="feature">
                {{ feature }}
              </div>
            </div>
            <div class="mode-stats">
              <div class="stat">
                <span class="stat-label">融資期限：</span>
                <span class="stat-value">{{ mode.term }}</span>
              </div>
              <div class="stat">
                <span class="stat-label">年化利率：</span>
                <span class="stat-value">{{ mode.rate }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 核心企業合作 -->
      <div class="core-partners-section">
        <h2 class="section-title">核心企業合作</h2>
        <div class="partners-showcase">
          <div class="partner-category" v-for="category in partnerCategories" :key="category.id">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="partners-grid">
              <div class="partner-card" v-for="partner in category.partners" :key="partner.id">
                <div class="partner-logo">
                  <i :class="partner.icon"></i>
                </div>
                <div class="partner-info">
                  <h4 class="partner-name">{{ partner.name }}</h4>
                  <p class="partner-desc">{{ partner.description }}</p>
                  <div class="partner-benefits">
                    <span class="benefit-tag" v-for="benefit in partner.benefits" :key="benefit">
                      {{ benefit }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 產品優势 -->
      <div class="advantages-section">
        <h2 class="section-title">產品優势</h2>
        <div class="advantages-grid">
          <div class="advantage-card" v-for="advantage in advantages" :key="advantage.id">
            <div class="advantage-icon">
              <i :class="advantage.icon"></i>
            </div>
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-desc">{{ advantage.description }}</p>
            <div class="advantage-metrics">
              <div class="metric" v-for="metric in advantage.metrics" :key="metric.label">
                <span class="metric-value">{{ metric.value }}</span>
                <span class="metric-label">{{ metric.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 申请条件 -->
      <div class="requirements-section">
        <h2 class="section-title">申请条件</h2>
        <div class="requirements-tabs">
          <div class="tab-header">
            <button
              class="tab-btn"
              v-for="tab in requirementTabs"
              :key="tab.id"
              :class="{ active: activeTab === tab.id }"
              @click="activeTab = tab.id"
            >
              {{ tab.title }}
            </button>
          </div>
          <div class="tab-content">
            <div class="requirement-list" v-for="tab in requirementTabs" :key="tab.id" v-show="activeTab === tab.id">
              <div class="requirement-item" v-for="req in tab.requirements" :key="req.id">
                <div class="req-icon">
                  <i :class="req.icon"></i>
                </div>
                <div class="req-content">
                  <h4 class="req-title">{{ req.title }}</h4>
                  <p class="req-desc">{{ req.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 風控体系 -->
      <div class="risk-control-section">
        <h2 class="section-title">風控体系</h2>
        <div class="risk-system">
          <div class="system-overview">
            <h3>全链条風險管控</h3>
            <p>基于供應链真實贸易背景，構建多维度風險防控体系</p>
          </div>
          <div class="control-measures">
            <div class="measure-item" v-for="measure in riskMeasures" :key="measure.id">
              <div class="measure-icon">
                <i :class="measure.icon"></i>
              </div>
              <div class="measure-content">
                <h4 class="measure-title">{{ measure.title }}</h4>
                <p class="measure-desc">{{ measure.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-section">
        <button class="primary-btn" @click="startApplication">
          <i class="fas fa-handshake"></i>
          申请合作
        </button>
        <button class="secondary-btn" @click="viewCases">
          <i class="fas fa-chart-bar"></i>
          成功案例
        </button>
        <button class="secondary-btn" @click="consultService">
          <i class="fas fa-phone-alt"></i>
          業務咨詢
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupplyChainFinance',
  data() {
    return {
      loading: true,
      partnerCount: 0,
      financingAmount: 0,
      activeTab: 1,
      serviceModes: [
        {
          id: 1,
          icon: 'fas fa-file-invoice',
          title: '應收账款融資',
          description: '基于核心企業應付账款，為供應商提供融資服務',
          features: ['免担保', '線上操作', '快速放款'],
          term: '30-180天',
          rate: '3.5%-6.8%'
        },
        {
          id: 2,
          icon: 'fas fa-warehouse',
          title: '存货融資',
          description: '以存货作為质押，為企業提供流動資金支持',
          features: ['動產质押', '專業監管', '灵活提取'],
          term: '1-12個月',
          rate: '4.2%-7.5%'
        },
        {
          id: 3,
          icon: 'fas fa-truck',
          title: '预付款融資',
          description: '基于真實贸易背景，為采购方提供预付款融資',
          features: ['贸易背景', '風險可控', '期限匹配'],
          term: '30-360天',
          rate: '3.8%-7.2%'
        },
        {
          id: 4,
          icon: 'fas fa-credit-card',
          title: '保理融資',
          description: '應收账款转讓，提供融資、催收、坏账担保服務',
          features: ['無追索权', '專業催收', '風險转移'],
          term: '30-180天',
          rate: '4.0%-8.0%'
        }
      ],
      partnerCategories: [
        {
          id: 1,
          title: '制造業龍頭',
          partners: [
            {
              id: 1,
              icon: 'fas fa-industry',
              name: '比亚迪汽車',
              description: '新能源汽車制造龍頭企業',
              benefits: ['供應商融資', '經销商支持', '全链条服務']
            },
            {
              id: 2,
              icon: 'fas fa-microchip',
              name: '華為技术',
              description: '通信设備制造領军企業',
              benefits: ['上游融資', '下游赋能', '技术支持']
            }
          ]
        },
        {
          id: 2,
          title: '零售連锁',
          partners: [
            {
              id: 3,
              icon: 'fas fa-shopping-cart',
              name: '沃尔玛中國',
              description: '全球零售連锁巨頭',
              benefits: ['供應商融資', '账期優化', '數據共享']
            },
            {
              id: 4,
              icon: 'fas fa-store',
              name: '永辉超市',
              description: '生鲜零售連锁企業',
              benefits: ['快速融資', '在線申请', '自動审批']
            }
          ]
        }
      ],
      advantages: [
        {
          id: 1,
          icon: 'fas fa-network-wired',
          title: '生态协同',
          description: '依托核心企業信用，構建供應链金融生态圈',
          metrics: [
            { value: '500+', label: '合作企業' },
            { value: '95%', label: '滿意度' }
          ]
        },
        {
          id: 2,
          icon: 'fas fa-robot',
          title: '智能風控',
          description: '运用大數據和AI技术，實現智能化風險管控',
          metrics: [
            { value: '0.3%', label: '不良率' },
            { value: '24小時', label: '审批時效' }
          ]
        },
        {
          id: 3,
          icon: 'fas fa-coins',
          title: '成本優化',
          description: '降低融資成本，提升供應链整体效率',
          metrics: [
            { value: '30%', label: '成本降低' },
            { value: '50%', label: '效率提升' }
          ]
        }
      ],
      requirementTabs: [
        {
          id: 1,
          title: '核心企業',
          requirements: [
            {
              id: 1,
              icon: 'fas fa-star',
              title: '企業資质',
              description: '行業龍頭企業，信用等級AA級以上'
            },
            {
              id: 2,
              icon: 'fas fa-chart-line',
              title: '經营状况',
              description: '年营業收入10亿元以上，經营稳定'
            },
            {
              id: 3,
              icon: 'fas fa-handshake',
              title: '合作意愿',
              description: '愿意為供應链夥伴提供信用支持'
            }
          ]
        },
        {
          id: 2,
          title: '供應商',
          requirements: [
            {
              id: 1,
              icon: 'fas fa-building',
              title: '企業基础',
              description: '成立滿2年，与核心企業有稳定合作關系'
            },
            {
              id: 2,
              icon: 'fas fa-file-contract',
              title: '贸易背景',
              description: '具有真實的贸易背景和應收账款'
            },
            {
              id: 3,
              icon: 'fas fa-shield-alt',
              title: '信用状况',
              description: '無重大违法违規記录，信用状况良好'
            }
          ]
        }
      ],
      riskMeasures: [
        {
          id: 1,
          icon: 'fas fa-search',
          title: '贸易真實性验證',
          description: '通過多维度數據交叉验證，确保贸易背景真實'
        },
        {
          id: 2,
          icon: 'fas fa-eye',
          title: '全流程監控',
          description: '對資金流、物流、信息流進行全程監控'
        },
        {
          id: 3,
          icon: 'fas fa-users',
          title: '多方确权',
          description: '核心企業、供應商、銀行多方确权機制'
        },
        {
          id: 4,
          icon: 'fas fa-lock',
          title: '風險隔離',
          description: '建立風險隔離機制，防範系統性風險'
        }
      ]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      setTimeout(() => {
        this.partnerCount = 500
        this.financingAmount = 1200
        this.loading = false
      }, 800)
    },
    startApplication() {
      this.$router.push('/supply-chain/apply')
    },
    viewCases() {
      alert('成功案例功能開發中...')
    },
    consultService() {
      alert('業務咨詢功能開發中...')
    }
  }
}
</script>

<style scoped>
.supply-chain-container {
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
  border: 3px solid rgba(138, 43, 226, 0.2);
  border-top: 3px solid #8a2be2;
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
  max-width: 1200px;
  margin: 0 auto;
}

/* 頁面頭部樣式 */
.page-header {
  background: linear-gradient(135deg, rgba(138, 43, 226, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(138, 43, 226, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
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
  background: linear-gradient(135deg, #8a2be2, #9333ea);
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
  color: #8a2be2;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

/* 通用樣式 */
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

/* 服務模式樣式 */
.service-modes-section {
  margin-bottom: 3rem;
}

.modes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.mode-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.mode-card:hover {
  transform: translateY(-5px);
  border-color: rgba(138, 43, 226, 0.3);
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.1);
}

.mode-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.mode-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.mode-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.mode-features {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.feature-tag {
  background: rgba(138, 43, 226, 0.2);
  color: #8a2be2;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.mode-stats {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
}

.stat-value {
  color: #8a2be2;
  font-weight: 600;
}

/* 核心企業合作樣式 */
.core-partners-section {
  margin-bottom: 3rem;
}

.partners-showcase {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.partner-category {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #8a2be2;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}

.partner-card {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.partner-card:hover {
  border-color: rgba(138, 43, 226, 0.3);
  transform: translateY(-2px);
}

.partner-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.partner-info {
  flex: 1;
}

.partner-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.partner-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.partner-benefits {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.benefit-tag {
  background: rgba(138, 43, 226, 0.15);
  color: #8a2be2;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 產品優势樣式 */
.advantages-section {
  margin-bottom: 3rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.advantage-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.advantage-card:hover {
  transform: translateY(-5px);
  border-color: rgba(138, 43, 226, 0.3);
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.1);
}

.advantage-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.advantage-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.advantage-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.advantage-metrics {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.metric {
  text-align: center;
}

.metric-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #8a2be2;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 申请条件樣式 */
.requirements-section {
  margin-bottom: 3rem;
}

.requirements-tabs {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.tab-header {
  display: flex;
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn {
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 3px solid transparent;
}

.tab-btn.active {
  color: #8a2be2;
  border-bottom-color: #8a2be2;
  background: rgba(138, 43, 226, 0.1);
}

.tab-content {
  padding: 1.5rem;
}

.requirement-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.req-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.req-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.req-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 風控体系樣式 */
.risk-control-section {
  margin-bottom: 3rem;
}

.risk-system {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.system-overview {
  text-align: center;
  margin-bottom: 2rem;
}

.system-overview h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #8a2be2;
}

.system-overview p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.control-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}

.measure-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.measure-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.measure-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: white;
}

.measure-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 操作按钮樣式 */
.action-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.primary-btn {
  background: linear-gradient(135deg, #8a2be2, #9333ea);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(138, 43, 226, 0.3);
}

.secondary-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* 响應式设計 */
@media (max-width: 768px) {
  .supply-chain-container {
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

  .tab-header {
    flex-direction: column;
  }

  .advantage-metrics {
    gap: 1rem;
  }

  .action-section {
    flex-direction: column;
    align-items: center;
  }

  .primary-btn, .secondary-btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>