<template>
  <div class="invoice-loan-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载发票贷服务中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 页面头部 -->
      <div class="page-header animate-fade-in-up" style="animation-delay: 0.1s">
        <div class="header-content">
          <div class="header-icon animate-bounce-in" style="animation-delay: 0.2s">
            <i class="fas fa-file-invoice-dollar"></i>
          </div>
          <div class="header-info animate-slide-in-left" style="animation-delay: 0.3s">
            <h1 class="page-title">发票贷</h1>
            <p class="page-subtitle">基于发票的融资服务 - 快速、便捷、安全</p>
          </div>
          <div class="header-stats animate-slide-in-right" style="animation-delay: 0.4s">
            <div class="stat-item">
              <div class="stat-value">{{ totalLoans.toLocaleString() }}</div>
              <div class="stat-label">累计放款笔数</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ (totalAmount / 100000000).toFixed(1) }}亿</div>
              <div class="stat-label">累计放款金额</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务特色 -->
      <div class="features-section animate-fade-in-up" style="animation-delay: 0.5s">
        <h2 class="section-title">服务特色</h2>
        <div class="features-grid">
          <div class="feature-card animate-card-in" v-for="(feature, index) in features" :key="feature.id" :style="{ animationDelay: `${0.6 + index * 0.1}s` }">
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- 申请流程 -->
      <div class="process-section animate-fade-in-up" style="animation-delay: 1.0s">
        <h2 class="section-title">申请流程</h2>
        <div class="process-timeline">
          <div class="process-step animate-step-in" v-for="(step, index) in processSteps" :key="step.id" :style="{ animationDelay: `${1.1 + index * 0.2}s` }">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
            </div>
            <div class="step-connector" v-if="index < processSteps.length - 1"></div>
          </div>
        </div>
      </div>

      <!-- 产品信息 -->
      <div class="product-info-section animate-fade-in-up" style="animation-delay: 1.9s">
        <h2 class="section-title">产品信息</h2>
        <div class="info-grid">
          <div class="info-card animate-card-in" style="animation-delay: 2.0s">
            <h3 class="info-title">贷款额度</h3>
            <div class="info-content">
              <div class="amount-range">10万 - 1000万</div>
              <p class="info-desc">根据发票金额和企业资质确定</p>
            </div>
          </div>
          <div class="info-card animate-card-in" style="animation-delay: 2.1s">
            <h3 class="info-title">贷款期限</h3>
            <div class="info-content">
              <div class="term-range">1-12个月</div>
              <p class="info-desc">灵活选择，随借随还</p>
            </div>
          </div>
          <div class="info-card animate-card-in" style="animation-delay: 2.2s">
            <h3 class="info-title">利率水平</h3>
            <div class="info-content">
              <div class="rate-range">年化3.6%-7.2%</div>
              <p class="info-desc">根据企业信用等级浮动</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 申请条件 -->
      <div class="requirements-section animate-fade-in-up" style="animation-delay: 2.3s">
        <h2 class="section-title">申请条件</h2>
        <div class="requirements-grid">
          <div class="requirement-item animate-card-in" v-for="(req, index) in requirements" :key="req.id" :style="{ animationDelay: `${2.4 + index * 0.1}s` }">
            <div class="req-icon">
              <i :class="req.icon"></i>
            </div>
            <div class="req-content">
              <h3 class="req-title">{{ req.title }}</h3>
              <p class="req-desc">{{ req.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-section animate-fade-in-up" style="animation-delay: 2.8s">
        <button class="primary-btn animate-button-bounce" style="animation-delay: 2.9s" @click="startApplication">
          <i class="fas fa-paper-plane"></i>
          立即申请
        </button>
        <button class="secondary-btn animate-button-bounce" style="animation-delay: 3.0s" @click="consultService">
          <i class="fas fa-comments"></i>
          在线咨询
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoiceLoan',
  data() {
    return {
      loading: true,
      totalLoans: 0,
      totalAmount: 0,
      features: [
        {
          id: 1,
          icon: 'fas fa-clock',
          title: '快速审批',
          description: '基于发票真实性验证，最快1小时完成审批'
        },
        {
          id: 2,
          icon: 'fas fa-shield-alt',
          title: '安全可靠',
          description: '依托区块链技术，确保发票数据真实可信'
        },
        {
          id: 3,
          icon: 'fas fa-percentage',
          title: '利率优惠',
          description: '基于发票信用，享受更低融资成本'
        },
        {
          id: 4,
          icon: 'fas fa-mobile-alt',
          title: '线上操作',
          description: '全程线上申请，无需线下跑腿'
        }
      ],
      processSteps: [
        {
          id: 1,
          title: '上传发票',
          description: '上传真实有效的增值税发票'
        },
        {
          id: 2,
          title: '信息验证',
          description: '系统自动验证发票真实性'
        },
        {
          id: 3,
          title: '信用评估',
          description: '基于企业征信进行风险评估'
        },
        {
          id: 4,
          title: '审批放款',
          description: '审批通过后快速放款到账'
        }
      ],
      requirements: [
        {
          id: 1,
          icon: 'fas fa-building',
          title: '企业资质',
          description: '成立满1年的正常经营企业'
        },
        {
          id: 2,
          icon: 'fas fa-file-invoice',
          title: '发票要求',
          description: '真实有效的增值税专用发票'
        },
        {
          id: 3,
          icon: 'fas fa-star',
          title: '信用等级',
          description: '企业信用等级B级以上'
        },
        {
          id: 4,
          icon: 'fas fa-chart-line',
          title: '经营状况',
          description: '近12个月经营状况良好'
        }
      ]
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      // 模拟数据加载
      setTimeout(() => {
        this.totalLoans = 125680
        this.totalAmount = 8560000000 // 85.6亿
        this.loading = false
      }, 800)
    },
    startApplication() {
      // 跳转到申请页面
      this.$router.push('/invoice-loan/apply')
    },
    consultService() {
      // 打开在线咨询
      alert('在线咨询功能开发中...')
    }
  }
}
</script>

<style scoped>
.invoice-loan-container {
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
  border: 3px solid rgba(0, 212, 255, 0.2);
  border-top: 3px solid #00d4ff;
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

.animate-card-in {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  animation: cardIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-step-in {
  opacity: 0;
  transform: translateY(40px) scale(0.9);
  animation: stepIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-button-bounce {
  opacity: 0;
  transform: scale(0.8);
  animation: buttonBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
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

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes stepIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes buttonBounce {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  60% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 页面头部样式 */
.page-header {
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 153, 255, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(0, 212, 255, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
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
  background: linear-gradient(135deg, #00d4ff, #0099ff);
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
  color: #00d4ff;
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

/* 服务特色样式 */
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
  border-color: rgba(0, 212, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.1);
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
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
}

/* 申请流程样式 */
.process-section {
  margin-bottom: 3rem;
}

.process-timeline {
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
  background: linear-gradient(135deg, #00d4ff, #0099ff);
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
}

.step-connector {
  position: absolute;
  top: 25px;
  left: 100%;
  width: 2rem;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, #0099ff);
}

/* 产品信息样式 */
.product-info-section {
  margin-bottom: 3rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.info-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #00d4ff;
}

.amount-range, .term-range, .rate-range {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.info-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 申请条件样式 */
.requirements-section {
  margin-bottom: 3rem;
}

.requirements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.requirement-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.req-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.req-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.req-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 操作按钮样式 */
.action-section {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
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
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
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
  .invoice-loan-container {
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
  
  .process-timeline {
    flex-direction: column;
    gap: 1rem;
  }
  
  .step-connector {
    display: none;
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
