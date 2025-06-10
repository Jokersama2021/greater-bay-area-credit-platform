<template>
  <div class="cross-border-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加載跨境结算服務中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 頁面頭部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i class="fas fa-globe"></i>
          </div>
          <div class="header-info">
            <h1 class="page-title">跨境结算</h1>
            <p class="page-subtitle">跨境支付结算 - 連通全球，畅享無界金融</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <div class="stat-value">{{ supportedCountries }}+</div>
              <div class="stat-label">支持國家/地區</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ dailyVolume }}亿</div>
              <div class="stat-label">日均交易量</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服務範围 */
      <div class="service-scope-section">
        <h2 class="section-title">服務範围</h2>
        <div class="scope-grid">
          <div class="scope-card" v-for="scope in serviceScopes" :key="scope.id">
            <div class="scope-icon">
              <i :class="scope.icon"></i>
            </div>
            <h3 class="scope-title">{{ scope.title }}</h3>
            <p class="scope-desc">{{ scope.description }}</p>
            <div class="scope-features">
              <div class="feature-item" v-for="feature in scope.features" :key="feature">
                <i class="fas fa-check-circle"></i>
                <span>{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 支持币种 -->
      <div class="currencies-section">
        <h2 class="section-title">支持币种</h2>
        <div class="currencies-showcase">
          <div class="currency-category" v-for="category in currencyCategories" :key="category.id">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="currencies-grid">
              <div class="currency-item" v-for="currency in category.currencies" :key="currency.code">
                <div class="currency-flag">
                  <i :class="currency.flag"></i>
                </div>
                <div class="currency-info">
                  <div class="currency-code">{{ currency.code }}</div>
                  <div class="currency-name">{{ currency.name }}</div>
                  <div class="currency-rate">{{ currency.rate }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 產品特色 */
      <div class="features-section">
        <h2 class="section-title">產品特色</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <div class="feature-highlight">
              <span class="highlight-label">{{ feature.highlight.label }}：</span>
              <span class="highlight-value">{{ feature.highlight.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 费率標準 */
      <div class="pricing-section">
        <h2 class="section-title">费率標準</h2>
        <div class="pricing-table">
          <div class="pricing-header">
            <div class="header-item">交易类型</div>
            <div class="header-item">手续费率</div>
            <div class="header-item">到账時間</div>
            <div class="header-item">最低费用</div>
          </div>
          <div class="pricing-row" v-for="pricing in pricingData" :key="pricing.id">
            <div class="row-item">
              <div class="service-name">{{ pricing.service }}</div>
              <div class="service-desc">{{ pricing.description }}</div>
            </div>
            <div class="row-item rate">{{ pricing.rate }}</div>
            <div class="row-item time">{{ pricing.time }}</div>
            <div class="row-item fee">{{ pricing.minFee }}</div>
          </div>
        </div>
      </div>

      <!-- 合規保障 */
      <div class="compliance-section">
        <h2 class="section-title">合規保障</h2>
        <div class="compliance-grid">
          <div class="compliance-item" v-for="item in complianceItems" :key="item.id">
            <div class="compliance-icon">
              <i :class="item.icon"></i>
            </div>
            <div class="compliance-content">
              <h3 class="compliance-title">{{ item.title }}</h3>
              <p class="compliance-desc">{{ item.description }}</p>
              <div class="compliance-details">
                <div class="detail-item" v-for="detail in item.details" :key="detail">
                  <i class="fas fa-shield-alt"></i>
                  <span>{{ detail }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-section">
        <button class="primary-btn" @click="startService">
          <i class="fas fa-play-circle"></i>
          開通服務
        </button>
        <button class="secondary-btn" @click="checkRates">
          <i class="fas fa-chart-line"></i>
          汇率查詢
        </button>
        <button class="secondary-btn" @click="consultService">
          <i class="fas fa-customer-service"></i>
          客服咨詢
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CrossBorderSettlement',
  data() {
    return {
      loading: true,
      supportedCountries: 0,
      dailyVolume: 0,
      serviceScopes: [
        {
          id: 1,
          icon: 'fas fa-exchange-alt',
          title: '跨境汇款',
          description: '個人和企業跨境汇款服務，支持多种汇款方式',
          features: ['實時汇率', '快速到账', '安全可靠', '费率優惠']
        },
        {
          id: 2,
          icon: 'fas fa-credit-card',
          title: '贸易结算',
          description: '國際贸易项下的货款收付和结算服務',
          features: ['信用證结算', '托收结算', 'T/T结算', '風險管控']
        },
        {
          id: 3,
          icon: 'fas fa-building',
          title: '企業金融',
          description: '為企業提供專業的跨境金融解決方案',
          features: ['資金池管理', '外汇套保', '融資服務', '账户管理']
        },
        {
          id: 4,
          icon: 'fas fa-mobile-alt',
          title: '數字支付',
          description: '基于區块链技术的數字货币跨境支付',
          features: ['數字人民币', '稳定币支付', '智能合约', '即時清算']
        }
      ],
      currencyCategories: [
        {
          id: 1,
          title: '主要货币',
          currencies: [
            { code: 'USD', name: '美元', rate: '1 USD = 7.2456 CNY', flag: 'fas fa-flag-usa' },
            { code: 'EUR', name: '欧元', rate: '1 EUR = 7.8234 CNY', flag: 'fas fa-flag' },
            { code: 'JPY', name: '日元', rate: '100 JPY = 4.8567 CNY', flag: 'fas fa-flag' },
            { code: 'GBP', name: '英镑', rate: '1 GBP = 9.1234 CNY', flag: 'fas fa-flag' }
          ]
        },
        {
          id: 2,
          title: '亚太货币',
          currencies: [
            { code: 'HKD', name: '港币', rate: '1 HKD = 0.9234 CNY', flag: 'fas fa-flag' },
            { code: 'SGD', name: '新加坡元', rate: '1 SGD = 5.3456 CNY', flag: 'fas fa-flag' },
            { code: 'KRW', name: '韩元', rate: '1000 KRW = 5.4567 CNY', flag: 'fas fa-flag' },
            { code: 'AUD', name: '澳元', rate: '1 AUD = 4.7890 CNY', flag: 'fas fa-flag' }
          ]
        }
      ],
      features: [
        {
          id: 1,
          icon: 'fas fa-clock',
          title: '極速到账',
          description: '采用先進的支付網絡，實現秒級跨境转账',
          highlight: { label: '最快到账', value: '3秒' }
        },
        {
          id: 2,
          icon: 'fas fa-percentage',
          title: '费率透明',
          description: '無隐藏费用，實時汇率，费率公開透明',
          highlight: { label: '手续费低至', value: '0.1%' }
        },
        {
          id: 3,
          icon: 'fas fa-shield-alt',
          title: '安全保障',
          description: '銀行級安全防护，多重加密保护資金安全',
          highlight: { label: '安全等級', value: '銀行級' }
        },
        {
          id: 4,
          icon: 'fas fa-headset',
          title: '7×24服務',
          description: '全天候客服支持，随時解決您的問題',
          highlight: { label: '服務時間', value: '7×24小時' }
        }
      ],
      pricingData: [
        {
          id: 1,
          service: '個人汇款',
          description: '個人跨境汇款服務',
          rate: '0.15%-0.25%',
          time: '1-3個工作日',
          minFee: '¥50'
        },
        {
          id: 2,
          service: '企業汇款',
          description: '企業跨境汇款服務',
          rate: '0.10%-0.20%',
          time: '當日到账',
          minFee: '¥100'
        },
        {
          id: 3,
          service: '贸易结算',
          description: '國際贸易结算服務',
          rate: '0.08%-0.15%',
          time: '即時到账',
          minFee: '¥200'
        },
        {
          id: 4,
          service: '數字支付',
          description: '數字货币跨境支付',
          rate: '0.05%-0.10%',
          time: '實時到账',
          minFee: '¥20'
        }
      ],
      complianceItems: [
        {
          id: 1,
          icon: 'fas fa-certificate',
          title: '監管合規',
          description: '严格遵守各國金融監管要求，确保業務合規',
          details: ['央行備案', '外汇管理', 'AML合規', 'KYC認證']
        },
        {
          id: 2,
          icon: 'fas fa-user-shield',
          title: '隐私保护',
          description: '严格保护客户隐私信息，符合數據保护法規',
          details: ['數據加密', '隐私保护', '信息安全', '合規审計']
        },
        {
          id: 3,
          icon: 'fas fa-balance-scale',
          title: '風險管控',
          description: '建立完善的風險管控体系，保障資金安全',
          details: ['實時監控', '風險評估', '异常预警', '應急處置']
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
        this.supportedCountries = 180
        this.dailyVolume = 85.6
        this.loading = false
      }, 800)
    },
    startService() {
      this.$router.push('/cross-border/apply')
    },
    checkRates() {
      alert('汇率查詢功能開發中...')
    },
    consultService() {
      alert('客服咨詢功能開發中...')
    }
  }
}
</script>

<style scoped>
.cross-border-container {
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
  border: 3px solid rgba(30, 144, 255, 0.2);
  border-top: 3px solid #1e90ff;
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
  background: linear-gradient(135deg, rgba(30, 144, 255, 0.1) 0%, rgba(65, 105, 225, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(30, 144, 255, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
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
  background: linear-gradient(135deg, #1e90ff, #4169e1);
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
  color: #1e90ff;
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

/* 服務範围樣式 */
.service-scope-section {
  margin-bottom: 3rem;
}

.scope-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.scope-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.scope-card:hover {
  transform: translateY(-5px);
  border-color: rgba(30, 144, 255, 0.3);
  box-shadow: 0 10px 30px rgba(30, 144, 255, 0.1);
}

.scope-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.scope-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.scope-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.scope-features {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.feature-item i {
  color: #1e90ff;
}

/* 支持币种樣式 */
.currencies-section {
  margin-bottom: 3rem;
}

.currencies-showcase {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.currency-category {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1e90ff;
}

.currencies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.currency-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.currency-item:hover {
  border-color: rgba(30, 144, 255, 0.3);
  transform: translateY(-2px);
}

.currency-flag {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.currency-info {
  flex: 1;
}

.currency-code {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.currency-name {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0.2rem 0;
}

.currency-rate {
  font-size: 0.8rem;
  color: #1e90ff;
  font-weight: 600;
}

/* 產品特色樣式 */
.features-section {
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(30, 144, 255, 0.3);
  box-shadow: 0 10px 30px rgba(30, 144, 255, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.feature-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.feature-highlight {
  background: rgba(30, 144, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  display: inline-block;
}

.highlight-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.highlight-value {
  color: #1e90ff;
  font-weight: 700;
  font-size: 1rem;
}

/* 费率標準樣式 */
.pricing-section {
  margin-bottom: 3rem;
}

.pricing-table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.pricing-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background: rgba(30, 144, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-item {
  padding: 1rem;
  font-weight: 600;
  color: #1e90ff;
  text-align: center;
}

.pricing-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pricing-row:last-child {
  border-bottom: none;
}

.row-item {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.row-item:first-child {
  justify-content: flex-start;
  text-align: left;
}

.service-name {
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
}

.service-desc {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.rate {
  color: #1e90ff;
  font-weight: 600;
}

.time {
  color: rgba(255, 255, 255, 0.8);
}

.fee {
  color: rgba(255, 255, 255, 0.8);
}

/* 合規保障樣式 */
.compliance-section {
  margin-bottom: 3rem;
}

.compliance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.compliance-item {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.compliance-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.compliance-content {
  flex: 1;
}

.compliance-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.compliance-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.compliance-details {
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
  color: #1e90ff;
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
  background: linear-gradient(135deg, #1e90ff, #4169e1);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(30, 144, 255, 0.3);
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
  .cross-border-container {
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

  .pricing-header,
  .pricing-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .header-item,
  .row-item {
    text-align: left;
    justify-content: flex-start;
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
