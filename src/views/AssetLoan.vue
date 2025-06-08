<template>
  <div class="asset-loan-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载资产贷服务中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i class="fas fa-building"></i>
          </div>
          <div class="header-info">
            <h1 class="page-title">资产贷</h1>
            <p class="page-subtitle">资产抵押融资 - 盘活企业固定资产</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <div class="stat-value">{{ maxLoanRatio }}%</div>
              <div class="stat-label">最高抵押率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ maxAmount }}亿</div>
              <div class="stat-label">最高授信额度</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 抵押资产类型 -->
      <div class="asset-types-section">
        <h2 class="section-title">抵押资产类型</h2>
        <div class="asset-types-grid">
          <div class="asset-type-card" v-for="assetType in assetTypes" :key="assetType.id">
            <div class="asset-icon">
              <i :class="assetType.icon"></i>
            </div>
            <h3 class="asset-title">{{ assetType.title }}</h3>
            <div class="asset-details">
              <div class="detail-item">
                <span class="detail-label">抵押率：</span>
                <span class="detail-value">{{ assetType.loanRatio }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">评估周期：</span>
                <span class="detail-value">{{ assetType.evaluationPeriod }}</span>
              </div>
            </div>
            <p class="asset-desc">{{ assetType.description }}</p>
          </div>
        </div>
      </div>

      <!-- 产品特色 */
      <div class="features-section">
        <h2 class="section-title">产品特色</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
            <div class="feature-highlight">{{ feature.highlight }}</div>
          </div>
        </div>
      </div>

      <!-- 贷款方案 */
      <div class="loan-plans-section">
        <h2 class="section-title">贷款方案</h2>
        <div class="plans-comparison">
          <div class="plan-item" v-for="plan in loanPlans" :key="plan.id">
            <div class="plan-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <div class="plan-badge" v-if="plan.recommended">推荐</div>
            </div>
            <div class="plan-content">
              <div class="plan-rate">
                <span class="rate-label">年化利率</span>
                <span class="rate-value">{{ plan.rate }}</span>
              </div>
              <div class="plan-features">
                <div class="feature-row" v-for="feature in plan.features" :key="feature.label">
                  <span class="feature-label">{{ feature.label }}：</span>
                  <span class="feature-value">{{ feature.value }}</span>
                </div>
              </div>
              <div class="plan-advantages">
                <div class="advantage-item" v-for="advantage in plan.advantages" :key="advantage">
                  <i class="fas fa-check-circle"></i>
                  <span>{{ advantage }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 申请流程 */
      <div class="process-section">
        <h2 class="section-title">申请流程</h2>
        <div class="process-flow">
          <div class="process-step" v-for="(step, index) in processSteps" :key="step.id">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
              <div class="step-time">{{ step.timeframe }}</div>
            </div>
            <div class="step-arrow" v-if="index < processSteps.length - 1">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- 风险提示 -->
      <div class="risk-warning-section">
        <h2 class="section-title">风险提示</h2>
        <div class="warning-content">
          <div class="warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div class="warning-text">
            <h3>重要提醒</h3>
            <ul class="warning-list">
              <li>抵押资产需要进行专业评估，评估费用由借款人承担</li>
              <li>抵押期间资产不得转让、出租或再次抵押</li>
              <li>如无法按时还款，抵押资产可能被依法处置</li>
              <li>请根据自身还款能力合理申请贷款额度</li>
              <li>详细条款请仔细阅读贷款合同</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 操作按钮 */
      <div class="action-section">
        <button class="primary-btn" @click="startApplication">
          <i class="fas fa-file-signature"></i>
          立即申请
        </button>
        <button class="secondary-btn" @click="assetEvaluation">
          <i class="fas fa-search-dollar"></i>
          资产评估
        </button>
        <button class="secondary-btn" @click="consultExpert">
          <i class="fas fa-user-tie"></i>
          专家咨询
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetLoan',
  data() {
    return {
      loading: true,
      maxLoanRatio: 0,
      maxAmount: 0,
      assetTypes: [
        {
          id: 1,
          icon: 'fas fa-home',
          title: '房产抵押',
          loanRatio: '最高70%',
          evaluationPeriod: '3-5个工作日',
          description: '商业用房、厂房、写字楼等不动产抵押融资'
        },
        {
          id: 2,
          icon: 'fas fa-industry',
          title: '设备抵押',
          loanRatio: '最高60%',
          evaluationPeriod: '2-3个工作日',
          description: '生产设备、机械设备、车辆等动产抵押融资'
        },
        {
          id: 3,
          icon: 'fas fa-warehouse',
          title: '土地使用权',
          loanRatio: '最高80%',
          evaluationPeriod: '5-7个工作日',
          description: '工业用地、商业用地使用权抵押融资'
        },
        {
          id: 4,
          icon: 'fas fa-gem',
          title: '其他资产',
          loanRatio: '最高50%',
          evaluationPeriod: '3-5个工作日',
          description: '股权、知识产权、应收账款等资产抵押融资'
        }
      ],
      features: [
        {
          id: 1,
          icon: 'fas fa-coins',
          title: '额度充足',
          description: '根据抵押资产价值确定贷款额度，最高可达资产评估价值的80%',
          highlight: '最高5亿元授信'
        },
        {
          id: 2,
          icon: 'fas fa-calendar-check',
          title: '期限灵活',
          description: '贷款期限1-10年，可根据企业经营周期灵活选择',
          highlight: '最长10年期限'
        },
        {
          id: 3,
          icon: 'fas fa-percentage',
          title: '利率优惠',
          description: '抵押贷款风险较低，享受更优惠的利率政策',
          highlight: '年化3.0%起'
        },
        {
          id: 4,
          icon: 'fas fa-redo-alt',
          title: '循环使用',
          description: '额度内可循环使用，随借随还，提高资金使用效率',
          highlight: '循环授信额度'
        }
      ],
      loanPlans: [
        {
          id: 1,
          name: '标准抵押贷',
          rate: '3.0%-5.5%',
          recommended: false,
          features: [
            { label: '贷款额度', value: '50万-2000万' },
            { label: '贷款期限', value: '1-5年' },
            { label: '抵押率', value: '最高70%' },
            { label: '还款方式', value: '等额本息/先息后本' }
          ],
          advantages: [
            '手续简便，审批快速',
            '利率相对较低',
            '适合中小企业',
            '可提前还款'
          ]
        },
        {
          id: 2,
          name: '优质抵押贷',
          rate: '2.8%-4.8%',
          recommended: true,
          features: [
            { label: '贷款额度', value: '500万-1亿' },
            { label: '贷款期限', value: '3-10年' },
            { label: '抵押率', value: '最高80%' },
            { label: '还款方式', value: '灵活还款' }
          ],
          advantages: [
            '优质客户专享',
            '更高抵押率',
            '专属客户经理',
            '绿色审批通道'
          ]
        },
        {
          id: 3,
          name: '大额抵押贷',
          rate: '2.5%-4.2%',
          recommended: false,
          features: [
            { label: '贷款额度', value: '5000万-5亿' },
            { label: '贷款期限', value: '5-10年' },
            { label: '抵押率', value: '最高75%' },
            { label: '还款方式', value: '个性化定制' }
          ],
          advantages: [
            '大额资金支持',
            '银团联合放款',
            '专业服务团队',
            '定制化方案'
          ]
        }
      ],
      processSteps: [
        {
          id: 1,
          title: '提交申请',
          description: '提交贷款申请及相关资料',
          timeframe: '1个工作日'
        },
        {
          id: 2,
          title: '资产评估',
          description: '委托专业机构进行资产评估',
          timeframe: '3-7个工作日'
        },
        {
          id: 3,
          title: '审批决策',
          description: '银行进行信贷审批决策',
          timeframe: '3-5个工作日'
        },
        {
          id: 4,
          title: '签约放款',
          description: '签署合同并办理抵押登记',
          timeframe: '2-3个工作日'
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
        this.maxLoanRatio = 80
        this.maxAmount = 5
        this.loading = false
      }, 800)
    },
    startApplication() {
      this.$router.push('/asset-loan/apply')
    },
    assetEvaluation() {
      alert('资产评估功能开发中...')
    },
    consultExpert() {
      alert('专家咨询功能开发中...')
    }
  }
}
</script>

<style scoped>
.asset-loan-container {
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
  border: 3px solid rgba(34, 139, 34, 0.2);
  border-top: 3px solid #228b22;
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

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, rgba(34, 139, 34, 0.1) 0%, rgba(46, 125, 50, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(34, 139, 34, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #228b22, #2e7d32);
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
  background: linear-gradient(135deg, #228b22, #2e7d32);
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
  color: #228b22;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

/* 通用样式 */
.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
}

/* 抵押资产类型样式 */
.asset-types-section {
  margin-bottom: 3rem;
}

.asset-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.asset-type-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.asset-type-card:hover {
  transform: translateY(-5px);
  border-color: rgba(34, 139, 34, 0.3);
  box-shadow: 0 10px 30px rgba(34, 139, 34, 0.1);
}

.asset-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #228b22, #2e7d32);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.asset-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.asset-details {
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.detail-label {
  color: rgba(255, 255, 255, 0.7);
}

.detail-value {
  color: #228b22;
  font-weight: 600;
}

.asset-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  font-size: 0.9rem;
}

/* 产品特色样式 */
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
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: rgba(34, 139, 34, 0.3);
  box-shadow: 0 10px 30px rgba(34, 139, 34, 0.1);
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #228b22, #2e7d32);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
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
  background: rgba(34, 139, 34, 0.2);
  color: #228b22;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 0.9rem;
}

/* 贷款方案样式 */
.loan-plans-section {
  margin-bottom: 3rem;
}

.plans-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.plan-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.plan-item:has(.plan-badge) {
  border-color: rgba(34, 139, 34, 0.5);
  background: rgba(34, 139, 34, 0.1);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.plan-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
}

.plan-badge {
  background: linear-gradient(135deg, #228b22, #2e7d32);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.plan-rate {
  text-align: center;
  margin-bottom: 1.5rem;
}

.rate-label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.rate-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #228b22;
}

.plan-features {
  margin-bottom: 1.5rem;
}

.feature-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.feature-label {
  color: rgba(255, 255, 255, 0.7);
}

.feature-value {
  color: white;
  font-weight: 600;
}

.plan-advantages {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.advantage-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.advantage-item i {
  color: #228b22;
}

/* 申请流程样式 */
.process-section {
  margin-bottom: 3rem;
}

.process-flow {
  display: flex;
  align-items: center;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
  position: relative;
}

.step-number {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #228b22, #2e7d32);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.step-content {
  text-align: center;
}

.step-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.step-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.step-time {
  color: #228b22;
  font-size: 0.8rem;
  font-weight: 600;
}

.step-arrow {
  position: absolute;
  top: 25px;
  left: 100%;
  color: #228b22;
  font-size: 1.2rem;
}

/* 风险提示样式 */
.risk-warning-section {
  margin-bottom: 3rem;
}

.warning-content {
  display: flex;
  gap: 1rem;
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
}

.warning-icon {
  width: 50px;
  height: 50px;
  background: rgba(255, 193, 7, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #ffc107;
  flex-shrink: 0;
}

.warning-text h3 {
  color: #ffc107;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.warning-list {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.warning-list li {
  margin-bottom: 0.5rem;
}

/* 操作按钮样式 */
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
  background: linear-gradient(135deg, #228b22, #2e7d32);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(34, 139, 34, 0.3);
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

/* 响应式设计 */
@media (max-width: 768px) {
  .asset-loan-container {
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

  .process-flow {
    flex-direction: column;
    gap: 1rem;
  }

  .step-arrow {
    display: none;
  }

  .warning-content {
    flex-direction: column;
    text-align: center;
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
