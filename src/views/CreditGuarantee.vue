<template>
  <div class="credit-guarantee-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载信用担保服务中...</div>
    </div>
    
    <div v-else class="content">
      <!-- 页面头部 -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div class="header-info">
            <h1 class="page-title">信用担保</h1>
            <p class="page-subtitle">信用担保服务 - 增信助力，共创价值</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <div class="stat-value">{{ guaranteeAmount }}亿</div>
              <div class="stat-label">累计担保金额</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ successRate }}%</div>
              <div class="stat-label">担保成功率</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 担保产品 -->
      <div class="guarantee-products-section">
        <h2 class="section-title">担保产品</h2>
        <div class="products-grid">
          <div class="product-card" v-for="product in guaranteeProducts" :key="product.id">
            <div class="product-header">
              <div class="product-icon">
                <i :class="product.icon"></i>
              </div>
              <div class="product-badge" v-if="product.hot">热门</div>
            </div>
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-desc">{{ product.description }}</p>
            <div class="product-features">
              <div class="feature-row" v-for="feature in product.features" :key="feature.label">
                <span class="feature-label">{{ feature.label }}：</span>
                <span class="feature-value">{{ feature.value }}</span>
              </div>
            </div>
            <div class="product-advantages">
              <div class="advantage-tag" v-for="advantage in product.advantages" :key="advantage">
                {{ advantage }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务流程 */
      <div class="service-process-section">
        <h2 class="section-title">服务流程</h2>
        <div class="process-timeline">
          <div class="timeline-item" v-for="(step, index) in serviceSteps" :key="step.id">
            <div class="timeline-marker">
              <div class="marker-number">{{ index + 1 }}</div>
            </div>
            <div class="timeline-content">
              <h3 class="step-title">{{ step.title }}</h3>
              <p class="step-desc">{{ step.description }}</p>
              <div class="step-details">
                <div class="detail-item" v-for="detail in step.details" :key="detail">
                  <i class="fas fa-check"></i>
                  <span>{{ detail }}</span>
                </div>
              </div>
              <div class="step-time">预计时间：{{ step.timeframe }}</div>
            </div>
            <div class="timeline-connector" v-if="index < serviceSteps.length - 1"></div>
          </div>
        </div>
      </div>

      <!-- 风险管控 -->
      <div class="risk-management-section">
        <h2 class="section-title">风险管控</h2>
        <div class="risk-system-overview">
          <div class="overview-content">
            <h3>全方位风险管控体系</h3>
            <p>建立事前、事中、事后全流程风险管控机制，确保担保业务安全稳健运行</p>
          </div>
          <div class="risk-metrics">
            <div class="metric-item" v-for="metric in riskMetrics" :key="metric.id">
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-label">{{ metric.label }}</div>
            </div>
          </div>
        </div>
        <div class="risk-measures-grid">
          <div class="measure-card" v-for="measure in riskMeasures" :key="measure.id">
            <div class="measure-icon">
              <i :class="measure.icon"></i>
            </div>
            <h3 class="measure-title">{{ measure.title }}</h3>
            <p class="measure-desc">{{ measure.description }}</p>
            <div class="measure-methods">
              <div class="method-item" v-for="method in measure.methods" :key="method">
                <i class="fas fa-arrow-right"></i>
                <span>{{ method }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 合作机构 -->
      <div class="partners-section">
        <h2 class="section-title">合作机构</h2>
        <div class="partners-showcase">
          <div class="partner-category" v-for="category in partnerCategories" :key="category.id">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="partners-list">
              <div class="partner-item" v-for="partner in category.partners" :key="partner.id">
                <div class="partner-logo">
                  <i :class="partner.icon"></i>
                </div>
                <div class="partner-info">
                  <h4 class="partner-name">{{ partner.name }}</h4>
                  <p class="partner-desc">{{ partner.description }}</p>
                  <div class="cooperation-scope">
                    <span class="scope-tag" v-for="scope in partner.scope" :key="scope">
                      {{ scope }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 申请条件 */
      <div class="application-requirements-section">
        <h2 class="section-title">申请条件</h2>
        <div class="requirements-container">
          <div class="requirement-category" v-for="category in requirementCategories" :key="category.id">
            <h3 class="category-title">{{ category.title }}</h3>
            <div class="requirements-list">
              <div class="requirement-item" v-for="req in category.requirements" :key="req.id">
                <div class="req-icon">
                  <i :class="req.icon"></i>
                </div>
                <div class="req-content">
                  <h4 class="req-title">{{ req.title }}</h4>
                  <p class="req-desc">{{ req.description }}</p>
                  <div class="req-criteria" v-if="req.criteria">
                    <div class="criteria-item" v-for="criteria in req.criteria" :key="criteria">
                      <i class="fas fa-dot-circle"></i>
                      <span>{{ criteria }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="action-section">
        <button class="primary-btn" @click="startApplication">
          <i class="fas fa-file-contract"></i>
          申请担保
        </button>
        <button class="secondary-btn" @click="riskAssessment">
          <i class="fas fa-chart-pie"></i>
          风险评估
        </button>
        <button class="secondary-btn" @click="consultExpert">
          <i class="fas fa-user-graduate"></i>
          专家咨询
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditGuarantee',
  data() {
    return {
      loading: true,
      guaranteeAmount: 0,
      successRate: 0,
      guaranteeProducts: [
        {
          id: 1,
          icon: 'fas fa-handshake',
          title: '融资担保',
          description: '为企业银行贷款提供担保服务，解决融资难题',
          hot: true,
          features: [
            { label: '担保金额', value: '50万-5000万' },
            { label: '担保期限', value: '1-3年' },
            { label: '担保费率', value: '1.5%-3.0%' },
            { label: '反担保方式', value: '灵活多样' }
          ],
          advantages: ['快速审批', '费率优惠', '专业服务']
        },
        {
          id: 2,
          icon: 'fas fa-file-invoice',
          title: '履约担保',
          description: '为企业合同履约提供担保，增强商业信用',
          hot: false,
          features: [
            { label: '担保金额', value: '10万-2000万' },
            { label: '担保期限', value: '按合同期限' },
            { label: '担保费率', value: '0.8%-2.0%' },
            { label: '适用范围', value: '工程、贸易等' }
          ],
          advantages: ['信用增级', '降低保证金', '提升竞争力']
        },
        {
          id: 3,
          icon: 'fas fa-money-check-alt',
          title: '投标担保',
          description: '为企业投标提供担保，替代保证金缴纳',
          hot: false,
          features: [
            { label: '担保金额', value: '5万-1000万' },
            { label: '担保期限', value: '投标有效期' },
            { label: '担保费率', value: '0.5%-1.5%' },
            { label: '出具时间', value: '1-2个工作日' }
          ],
          advantages: ['资金释放', '快速出具', '全程服务']
        }
      ],
      serviceSteps: [
        {
          id: 1,
          title: '咨询申请',
          description: '客户咨询担保需求，提交申请材料',
          details: ['需求分析', '方案设计', '材料清单'],
          timeframe: '1个工作日'
        },
        {
          id: 2,
          title: '尽职调查',
          description: '对申请企业进行全面尽职调查',
          details: ['实地调研', '财务分析', '风险评估'],
          timeframe: '3-5个工作日'
        },
        {
          id: 3,
          title: '审批决策',
          description: '担保委员会审议并作出担保决策',
          details: ['材料审核', '集体决策', '条件确定'],
          timeframe: '2-3个工作日'
        },
        {
          id: 4,
          title: '签约放款',
          description: '签署担保合同，协助客户获得融资',
          details: ['合同签署', '反担保落实', '放款协助'],
          timeframe: '1-2个工作日'
        }
      ],
      riskMetrics: [
        { id: 1, value: '0.8%', label: '代偿率' },
        { id: 2, value: '95%', label: '风险识别准确率' },
        { id: 3, value: '24小时', label: '风险响应时间' },
        { id: 4, value: '100%', label: '合规覆盖率' }
      ],
      riskMeasures: [
        {
          id: 1,
          icon: 'fas fa-search',
          title: '事前风控',
          description: '建立完善的准入标准和评估体系',
          methods: ['客户准入标准', '信用评级体系', '担保决策机制']
        },
        {
          id: 2,
          icon: 'fas fa-eye',
          title: '事中监控',
          description: '对担保项目进行全程跟踪监控',
          methods: ['定期检查', '财务监控', '预警机制']
        },
        {
          id: 3,
          icon: 'fas fa-shield-alt',
          title: '事后处置',
          description: '建立高效的风险处置和代偿机制',
          methods: ['应急预案', '代偿处置', '追偿回收']
        }
      ],
      partnerCategories: [
        {
          id: 1,
          title: '银行机构',
          partners: [
            {
              id: 1,
              icon: 'fas fa-university',
              name: '中国银行',
              description: '国有大型商业银行',
              scope: ['融资担保', '票据担保', '履约担保']
            },
            {
              id: 2,
              icon: 'fas fa-university',
              name: '招商银行',
              description: '股份制商业银行',
              scope: ['中小企业贷款', '供应链金融', '贸易融资']
            }
          ]
        },
        {
          id: 2,
          title: '政府机构',
          partners: [
            {
              id: 3,
              icon: 'fas fa-building',
              name: '市金融局',
              description: '地方金融监管部门',
              scope: ['政策支持', '风险补偿', '业务指导']
            },
            {
              id: 4,
              icon: 'fas fa-building',
              name: '中小企业局',
              description: '中小企业服务机构',
              scope: ['企业推荐', '政策扶持', '服务对接']
            }
          ]
        }
      ],
      requirementCategories: [
        {
          id: 1,
          title: '基本条件',
          requirements: [
            {
              id: 1,
              icon: 'fas fa-building',
              title: '企业资质',
              description: '申请企业应具备的基本资质要求',
              criteria: [
                '依法设立并有效存续的企业法人',
                '具有固定的经营场所',
                '经营状况良好，财务状况稳定',
                '无重大违法违规记录'
              ]
            },
            {
              id: 2,
              icon: 'fas fa-chart-line',
              title: '经营状况',
              description: '企业经营和财务状况要求',
              criteria: [
                '成立时间满2年以上',
                '年营业收入1000万元以上',
                '资产负债率不超过70%',
                '现金流状况良好'
              ]
            }
          ]
        },
        {
          id: 2,
          title: '担保条件',
          requirements: [
            {
              id: 3,
              icon: 'fas fa-shield-alt',
              title: '反担保措施',
              description: '提供充分有效的反担保措施',
              criteria: [
                '房产抵押或设备抵押',
                '股东个人连带责任保证',
                '第三方保证或质押',
                '其他有效担保方式'
              ]
            },
            {
              id: 4,
              icon: 'fas fa-percentage',
              title: '担保比例',
              description: '合理的担保金额和比例',
              criteria: [
                '担保金额与企业规模匹配',
                '担保比例不超过净资产3倍',
                '单笔担保金额上限5000万',
                '集中度风险控制'
              ]
            }
          ]
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
        this.guaranteeAmount = 280
        this.successRate = 98.5
        this.loading = false
      }, 800)
    },
    startApplication() {
      this.$router.push('/credit-guarantee/apply')
    },
    riskAssessment() {
      alert('风险评估功能开发中...')
    },
    consultExpert() {
      alert('专家咨询功能开发中...')
    }
  }
}
</script>

<style scoped>
.credit-guarantee-container {
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
  border: 3px solid rgba(128, 0, 128, 0.2);
  border-top: 3px solid #800080;
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
  background: linear-gradient(135deg, rgba(128, 0, 128, 0.1) 0%, rgba(147, 51, 234, 0.05) 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(128, 0, 128, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #800080, #9333ea);
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
  background: linear-gradient(135deg, #800080, #9333ea);
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
  color: #800080;
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

/* 担保产品样式 */
.guarantee-products-section {
  margin-bottom: 3rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: rgba(128, 0, 128, 0.3);
  box-shadow: 0 10px 30px rgba(128, 0, 128, 0.1);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.product-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #800080, #9333ea);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.product-badge {
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.product-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.product-features {
  margin-bottom: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
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
  color: #800080;
  font-weight: 600;
}

.product-advantages {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.advantage-tag {
  background: rgba(128, 0, 128, 0.2);
  color: #800080;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
}

/* 服务流程样式 */
.service-process-section {
  margin-bottom: 3rem;
}

.process-timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #800080, #9333ea);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.marker-number {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-left: 1rem;
}

.step-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.step-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.step-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.detail-item i {
  color: #800080;
}

.step-time {
  color: #800080;
  font-size: 0.9rem;
  font-weight: 600;
}

.timeline-connector {
  position: absolute;
  left: -1.75rem;
  top: 50px;
  width: 2px;
  height: calc(100% + 2rem);
  background: linear-gradient(180deg, #800080, rgba(128, 0, 128, 0.3));
}

/* 风险管控样式 */
.risk-management-section {
  margin-bottom: 3rem;
}

.risk-system-overview {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.overview-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #800080;
}

.overview-content p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.risk-metrics {
  display: flex;
  gap: 2rem;
}

.metric-item {
  text-align: center;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #800080;
}

.metric-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.25rem;
}

.risk-measures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.measure-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.measure-card:hover {
  transform: translateY(-5px);
  border-color: rgba(128, 0, 128, 0.3);
  box-shadow: 0 10px 30px rgba(128, 0, 128, 0.1);
}

.measure-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #800080, #9333ea);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.measure-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.measure-desc {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 1rem;
}

.measure-methods {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.method-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.method-item i {
  color: #800080;
}

/* 合作机构样式 */
.partners-section {
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
  color: #800080;
}

.partners-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}

.partner-item {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.partner-item:hover {
  border-color: rgba(128, 0, 128, 0.3);
  transform: translateY(-2px);
}

.partner-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #800080, #9333ea);
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

.cooperation-scope {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.scope-tag {
  background: rgba(128, 0, 128, 0.15);
  color: #800080;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

/* 申请条件样式 */
.application-requirements-section {
  margin-bottom: 3rem;
}

.requirements-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.requirement-category {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.category-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #800080;
}

.requirements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1rem;
}

.requirement-item {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.req-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #800080, #9333ea);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.req-content {
  flex: 1;
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
  margin-bottom: 0.75rem;
}

.req-criteria {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.criteria-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
}

.criteria-item i {
  color: #800080;
  font-size: 0.6rem;
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
  background: linear-gradient(135deg, #800080, #9333ea);
  color: white;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(128, 0, 128, 0.3);
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
  .credit-guarantee-container {
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

  .risk-system-overview {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .risk-metrics {
    justify-content: center;
  }

  .process-timeline {
    padding-left: 0;
  }

  .timeline-marker {
    position: relative;
    left: 0;
    margin: 0 auto 1rem;
  }

  .timeline-content {
    margin-left: 0;
  }

  .timeline-connector {
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
