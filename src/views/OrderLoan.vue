<template>
  <div class="order-loan-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载订单贷服务中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 页面头部 -->
      <div class="page-header animate-fade-in-up delay-100">
        <div class="header-content">
          <div class="header-icon animate-bounce-in delay-200">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div class="header-info animate-slide-in-left delay-300">
            <h1 class="page-title">订单贷</h1>
            <p class="page-subtitle">订单融资解决方案 - 助力企业订单履约</p>
          </div>
          <div class="header-stats animate-slide-in-right delay-400">
            <div class="stat-item">
              <div class="stat-value">{{ successRate }}%</div>
              <div class="stat-label">订单履约成功率</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ avgDays }}天</div>
              <div class="stat-label">平均放款时间</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 适用场景 -->
      <div class="scenarios-section animate-fade-in-up delay-500">
        <h2 class="section-title">适用场景</h2>
        <div class="scenarios-grid">
          <div class="scenario-card animate-card-in" v-for="(scenario, index) in scenarios" :key="scenario.id" :style="{ animationDelay: `${0.6 + index * 0.1}s` }">
            <div class="scenario-icon">
              <i :class="scenario.icon"></i>
            </div>
            <h3 class="scenario-title">{{ scenario.title }}</h3>
            <p class="scenario-desc">{{ scenario.description }}</p>
            <div class="scenario-example">
              <strong>典型案例：</strong>{{ scenario.example }}
            </div>
          </div>
        </div>
      </div>

      <!-- 产品优势 */
      <div class="advantages-section">
        <h2 class="section-title">产品优势</h2>
        <div class="advantages-grid">
          <div class="advantage-item" v-for="advantage in advantages" :key="advantage.id">
            <div class="advantage-icon">
              <i :class="advantage.icon"></i>
            </div>
            <div class="advantage-content">
              <h3 class="advantage-title">{{ advantage.title }}</h3>
              <p class="advantage-desc">{{ advantage.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 融资方案 -->
      <div class="plans-section">
        <h2 class="section-title">融资方案</h2>
        <div class="plans-grid">
          <div class="plan-card" v-for="plan in plans" :key="plan.id" :class="{ 'featured': plan.featured }">
            <div class="plan-header">
              <h3 class="plan-name">{{ plan.name }}</h3>
              <div class="plan-rate">{{ plan.rate }}</div>
            </div>
            <div class="plan-features">
              <div class="feature-item" v-for="feature in plan.features" :key="feature">
                <i class="fas fa-check"></i>
                <span>{{ feature }}</span>
              </div>
            </div>
            <div class="plan-limits">
              <div class="limit-item">
                <span class="limit-label">额度范围：</span>
                <span class="limit-value">{{ plan.amountRange }}</span>
              </div>
              <div class="limit-item">
                <span class="limit-label">期限范围：</span>
                <span class="limit-value">{{ plan.termRange }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 申请材料 -->
      <div class="materials-section">
        <h2 class="section-title">申请材料</h2>
        <div class="materials-grid">
          <div class="material-category" v-for="category in materials" :key="category.id">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="material-list">
              <div class="material-item" v-for="item in category.items" :key="item">
                <i class="fas fa-file-alt"></i>
                <span>{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 风控措施 -->
      <div class="risk-control-section">
        <h2 class="section-title">风控措施</h2>
        <div class="risk-measures">
          <div class="measure-item" v-for="measure in riskMeasures" :key="measure.id">
            <div class="measure-icon">
              <i :class="measure.icon"></i>
            </div>
            <div class="measure-content">
              <h3 class="measure-title">{{ measure.title }}</h3>
              <p class="measure-desc">{{ measure.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-section animate-fade-in-up" style="animation-delay: 2.8s">
        <button class="primary-btn animate-button-bounce" style="animation-delay: 2.9s" @click="startApplication">
          <i class="fas fa-rocket"></i>
          立即申请
        </button>
        <button class="secondary-btn animate-button-bounce" style="animation-delay: 3.0s" @click="calculateLoan">
          <i class="fas fa-calculator"></i>
          贷款计算器
        </button>
        <button class="secondary-btn animate-button-bounce" style="animation-delay: 3.1s" @click="consultService">
          <i class="fas fa-headset"></i>
          专家咨询
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderLoan',
  data() {
    return {
      loading: true,
      successRate: 0,
      avgDays: 0,
      scenarios: [
        {
          id: 1,
          icon: 'fas fa-industry',
          title: '生产制造',
          description: '接到大额订单，需要采购原材料和支付人工成本',
          example: '电子制造企业接到500万订单，需要300万资金采购芯片等原材料'
        },
        {
          id: 2,
          icon: 'fas fa-truck',
          title: '贸易流通',
          description: '订单周期长，需要垫付货款和物流费用',
          example: '贸易公司接到出口订单，需要垫付200万货款给上游供应商'
        },
        {
          id: 3,
          icon: 'fas fa-tools',
          title: '工程服务',
          description: '承接工程项目，需要支付材料费和人工费',
          example: '建筑公司承接政府工程，需要800万启动资金'
        },
        {
          id: 4,
          icon: 'fas fa-laptop-code',
          title: '科技服务',
          description: '软件开发项目，需要支付团队薪资和设备费用',
          example: '软件公司接到系统开发项目，需要100万支付开发团队薪资'
        }
      ],
      advantages: [
        {
          id: 1,
          icon: 'fas fa-tachometer-alt',
          title: '快速审批',
          description: '基于订单真实性和企业信用，最快24小时完成审批放款'
        },
        {
          id: 2,
          icon: 'fas fa-chart-line',
          title: '额度灵活',
          description: '根据订单金额和企业实力，提供10万-5000万灵活额度'
        },
        {
          id: 3,
          icon: 'fas fa-calendar-alt',
          title: '期限匹配',
          description: '贷款期限与订单周期匹配，最长可达24个月'
        },
        {
          id: 4,
          icon: 'fas fa-shield-alt',
          title: '风险可控',
          description: '订单作为还款来源，风险相对可控，利率更优惠'
        }
      ],
      plans: [
        {
          id: 1,
          name: '标准方案',
          rate: '年化4.8%-8.4%',
          amountRange: '10万-500万',
          termRange: '3-12个月',
          featured: false,
          features: [
            '订单金额50%-80%放款',
            '无需抵押担保',
            '随借随还',
            '线上申请'
          ]
        },
        {
          id: 2,
          name: '优质方案',
          rate: '年化3.6%-6.0%',
          amountRange: '50万-2000万',
          termRange: '6-18个月',
          featured: true,
          features: [
            '订单金额80%-90%放款',
            '优质客户专享',
            '专属客户经理',
            '绿色通道审批'
          ]
        },
        {
          id: 3,
          name: '大额方案',
          rate: '年化3.0%-5.4%',
          amountRange: '1000万-5000万',
          termRange: '12-24个月',
          featured: false,
          features: [
            '大额订单专项支持',
            '银团联合放款',
            '分阶段投放',
            '专业风控团队'
          ]
        }
      ],
      materials: [
        {
          id: 1,
          title: '企业基础资料',
          items: [
            '营业执照副本',
            '组织机构代码证',
            '税务登记证',
            '开户许可证',
            '法人身份证'
          ]
        },
        {
          id: 2,
          title: '订单相关材料',
          items: [
            '销售合同/订单',
            '采购合同',
            '订单履约保证',
            '客户资信证明',
            '历史合作记录'
          ]
        },
        {
          id: 3,
          title: '财务资料',
          items: [
            '近三年财务报表',
            '银行流水',
            '纳税证明',
            '审计报告',
            '资产负债表'
          ]
        }
      ],
      riskMeasures: [
        {
          id: 1,
          icon: 'fas fa-search',
          title: '订单真实性验证',
          description: '通过多渠道验证订单真实性，包括客户确认、合同审查等'
        },
        {
          id: 2,
          icon: 'fas fa-user-shield',
          title: '客户资信调查',
          description: '深度调查订单客户资信状况，评估付款能力和意愿'
        },
        {
          id: 3,
          icon: 'fas fa-eye',
          title: '全程监控',
          description: '对订单执行过程进行全程监控，确保资金专款专用'
        },
        {
          id: 4,
          icon: 'fas fa-money-check-alt',
          title: '回款管理',
          description: '建立回款监控机制，确保订单回款及时归还贷款'
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
        this.successRate = 96.8
        this.avgDays = 2.5
        this.loading = false
      }, 800)
    },
    startApplication() {
      this.$router.push('/order-loan/apply')
    },
    calculateLoan() {
      alert('贷款计算器功能开发中...')
    },
    consultService() {
      alert('专家咨询功能开发中...')
    }
  }
}
</script>

<style scoped>
.order-loan-container {
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
  border: 3px solid rgba(255, 165, 0, 0.2);
  border-top: 3px solid #ffa500;
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
  background: linear-gradient(135deg, rgba(255, 165, 0, 0.1) 0%, rgba(255, 140, 0, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 165, 0, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ffa500, #ff8c00);
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
  background: linear-gradient(135deg, #ffa500, #ff8c00);
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
  color: #ffa500;
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

/* 适用场景样式 */
.scenarios-section {
  margin-bottom: 3rem;
}

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.scenario-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.scenario-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 165, 0, 0.3);
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.1);
}

.scenario-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffa500, #ff8c00);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.scenario-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.scenario-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.scenario-example {
  background: rgba(255, 165, 0, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

/* 产品优势样式 */
.advantages-section {
  margin-bottom: 3rem;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.advantage-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.advantage-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ffa500, #ff8c00);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.advantage-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.advantage-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 融资方案样式 */
.plans-section {
  margin-bottom: 3rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.plan-card.featured {
  border-color: rgba(255, 165, 0, 0.5);
  background: rgba(255, 165, 0, 0.1);
  transform: scale(1.05);
}

.plan-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.plan-name {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.plan-rate {
  font-size: 1.1rem;
  color: #ffa500;
  font-weight: 600;
}

.plan-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.feature-item i {
  color: #ffa500;
}

.plan-limits {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
}

.limit-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.limit-label {
  color: rgba(255, 255, 255, 0.7);
}

.limit-value {
  color: white;
  font-weight: 600;
}

/* 申请材料样式 */
.materials-section {
  margin-bottom: 3rem;
}

.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.material-category {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffa500;
}

.material-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.material-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
}

.material-item i {
  color: #ffa500;
}

/* 风控措施样式 */
.risk-control-section {
  margin-bottom: 3rem;
}

.risk-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.measure-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.measure-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ffa500, #ff8c00);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.measure-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.measure-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
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
  background: linear-gradient(135deg, #ffa500, #ff8c00);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 165, 0, 0.3);
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
  .order-loan-container {
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
