<template>
  <div class="enterprise-detail-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加載企業詳情中...</div>
    </div>

    <div v-else class="content">
      <div class="page-header animate-fade-in-up" :style="{ animationDelay: '0.2s' }">
        <router-link to="/enterprises" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回列表
        </router-link>
        <div class="action-btn">
          <button class="print-btn">
            <i class="fas fa-print"></i> 打印
          </button>
        </div>
      </div>

      <div class="enterprise-header-card animate-slide-in-up" :style="{ animationDelay: '0.3s' }">
        <div class="enterprise-info-main">
          <h1 class="enterprise-name animate-slide-in-left" :style="{ animationDelay: '0.4s' }">{{ enterprise.name }}</h1>
          <div class="enterprise-basic-info">
            <div class="info-item animate-fade-in-up" :style="{ animationDelay: '0.5s' }">
              <i class="fas fa-building"></i>
              <span>信用代碼: {{ enterprise.creditCode }}</span>
            </div>
            <div class="info-item animate-fade-in-up" :style="{ animationDelay: '0.6s' }">
              <i class="fas fa-map-marker-alt"></i>
              <span>地區: {{ enterprise.region }}</span>
            </div>
            <div class="info-item animate-fade-in-up" :style="{ animationDelay: '0.7s' }">
              <i class="fas fa-industry"></i>
              <span>行業: {{ enterprise.industry }}</span>
            </div>
          </div>
        </div>

        <div class="enterprise-score-card animate-fade-in-scale" :style="{ animationDelay: '0.5s' }">
          <div class="score-circle">
            <div class="score-value">{{ animatedScore }}</div>
            <div class="score-label">信用評分</div>
          </div>
          <div class="rating">
            <div class="rating-value">{{ enterprise.creditRating }}</div>
            <div class="rating-label">信用等級</div>
          </div>
        </div>
      </div>
      
      <div class="detail-grid">
        <div class="detail-card company-info animate-slide-in-left" :style="{ animationDelay: '0.8s' }">
          <h2 class="card-title">
            <i class="fas fa-info-circle"></i> 企業信息
          </h2>
          <div class="info-grid">
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.9s' }">
              <div class="info-label">公司全称</div>
              <div class="info-value">{{ enterprise.fullName }}</div>
            </div>
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.4s' }">
              <div class="info-label">法定代表人</div>
              <div class="info-value">{{ enterprise.legalRepresentative }}</div>
            </div>
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.5s' }">
              <div class="info-label">注册資本</div>
              <div class="info-value">{{ enterprise.registeredCapital }}万元</div>
            </div>
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.6s' }">
              <div class="info-label">成立日期</div>
              <div class="info-value">{{ enterprise.establishDate }}</div>
            </div>
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.7s' }">
              <div class="info-label">企業类型</div>
              <div class="info-value">{{ enterprise.type }}</div>
            </div>
            <div class="info-row animate-fade-in-up" :style="{ animationDelay: '0.8s' }">
              <div class="info-label">經营範围</div>
              <div class="info-value long-text">{{ enterprise.businessScope }}</div>
            </div>
          </div>
        </div>

        <div class="detail-card financial-info animate-slide-in-right" :style="{ animationDelay: '0.3s' }">
          <h2 class="card-title">
            <i class="fas fa-chart-line"></i> 財務數據
          </h2>
          <div class="chart-container">
            <div class="chart-placeholder">
              <i class="fas fa-chart-bar"></i>
              <span>年度营收增長趋势</span>
            </div>
          </div>
          <div class="financial-grid">
            <div class="financial-item">
              <div class="financial-value">{{ enterprise.financialData.revenue }}万元</div>
              <div class="financial-label">年营業收入</div>
            </div>
            <div class="financial-item">
              <div class="financial-value">{{ enterprise.financialData.profit }}万元</div>
              <div class="financial-label">净利润</div>
            </div>
            <div class="financial-item">
              <div class="financial-value">{{ enterprise.financialData.assets }}万元</div>
              <div class="financial-label">總資產</div>
            </div>
            <div class="financial-item">
              <div class="financial-value">{{ enterprise.financialData.liabilities }}万元</div>
              <div class="financial-label">總负债</div>
            </div>
          </div>
        </div>
        
        <div class="detail-card risk-info">
          <h2 class="card-title">
            <i class="fas fa-exclamation-triangle"></i> 風險信息
          </h2>
          <div class="risk-stats">
            <div class="risk-item" v-for="(risk, index) in enterprise.riskData" :key="index">
              <div class="risk-value">{{ risk.count }}</div>
              <div class="risk-label">{{ risk.name }}</div>
            </div>
          </div>
          <div class="risk-list" v-if="enterprise.riskList.length > 0">
            <div class="risk-list-header">近期風險事件</div>
            <div class="risk-event" v-for="(event, index) in enterprise.riskList" :key="index">
              <div class="event-date">{{ event.date }}</div>
              <div class="event-content">
                <div class="event-title">{{ event.title }}</div>
                <div class="event-desc">{{ event.description }}</div>
              </div>
            </div>
          </div>
          <div class="no-risk" v-else>
            <i class="fas fa-check-circle"></i>
            <span>暂無風險事件記录</span>
          </div>
        </div>
        
        <div class="detail-card related-companies">
          <h2 class="card-title">
            <i class="fas fa-sitemap"></i> 相關企業
          </h2>
          <div class="company-list">
            <div class="company-item" v-for="(company, index) in enterprise.relatedCompanies" :key="index">
              <div class="company-name">{{ company.name }}</div>
              <div class="relation-type">{{ company.relation }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="report-section">
        <h2 class="section-title">
          <i class="fas fa-file-alt"></i> 相關報告
        </h2>
        <div class="report-cards">
          <div class="report-card" v-for="(report, index) in enterprise.reports" :key="index" @click="goToReport(report.id)">
            <div class="report-icon">
              <i :class="report.icon"></i>
            </div>
            <div class="report-info">
              <div class="report-name">{{ report.name }}</div>
              <div class="report-date">{{ report.date }}</div>
            </div>
            <div class="report-action">
              <i class="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEnterprises } from '../services/enterpriseDataService.js'

export default {
  name: 'EnterpriseDetail',
  data() {
    return {
      loading: true,
      animatedScore: 0,
      enterprise: {
        id: null,
        name: '',
        fullName: '',
        creditCode: '',
        legalRepresentative: '',
        registeredCapital: 0,
        establishDate: '',
        region: '',
        industry: '',
        type: '',
        businessScope: '',
        creditScore: 0,
        creditRating: '',
        financialData: {
          revenue: 0,
          profit: 0,
          assets: 0,
          liabilities: 0
        },
        riskData: [],
        riskList: [],
        relatedCompanies: [],
        reports: []
      }
    }
  },
  created() {
    // 获取企業ID
    const enterpriseId = this.$route.params.id
    this.fetchEnterpriseDetail(enterpriseId)
  },
  methods: {
    // 數字動画函數
    animateScore(target, duration = 2000) {
      const start = this.animatedScore
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutExpo 缓動函數
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        this.animatedScore = Math.round(start + (target - start) * easeOutExpo)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    },

    fetchEnterpriseDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        try {
          // 從企業數據服務获取所有企業數據
          const allEnterprises = getEnterprises()

          // 首先從企業數據服務中查找企業
          let enterprise = allEnterprises.find(e => e.id === parseInt(id))

          if (enterprise) {
            // 為企業數據服務中的企業补充詳細信息
            enterprise = this.enrichEnterpriseData(enterprise)
          } else {
            // 如果找不到，使用默認數據
            enterprise = this.generateDefaultEnterprise(id)
          }

          this.enterprise = enterprise
          this.loading = false

          // 启動信用評分動画
          setTimeout(() => {
            this.animateScore(enterprise.creditScore, 1500)
          }, 800)
        } catch (error) {
          console.error('获取企業詳情時發生错误:', error)
          this.loading = false
        }
      }, 200)
    },

    // 為企業數據补充詳細信息
    enrichEnterpriseData(enterprise) {
      // 為澳門國際銀行提供特定的詳細信息
      if (enterprise.id === 45) {
        return {
          ...enterprise,
          fullName: '澳門國際銀行股份有限公司',
          creditCode: 'MO0237000001',
          legalRepresentative: '張三',
          registeredCapital: 200000,
          establishDate: '1974-01-01',
          industry: '銀行業',
          type: '股份有限公司',
          businessScope: '銀行業務、金融服務、投資理財、外匯兌換、信貸業務、企業融資、個人理財、國際結算、資產管理、保險代理',
          creditScore: enterprise.creditScore || 930,
          creditRating: enterprise.creditLevel,
          financialData: {
            revenue: 231650, // 23.165億
            profit: 98270,   // 9.827億
            assets: 6937000, // 693.7億
            liabilities: 598270 // 59.827億
          },
          riskData: [
            { name: '司法風險', count: 0 },
            { name: '經營風險', count: 1 },
            { name: '行政處罰', count: 0 },
            { name: '失信信息', count: 0 }
          ],
          riskList: [],
          relatedCompanies: [
            { name: '澳門國際銀行(香港)有限公司', relation: '子公司' },
            { name: '澳門國際投資管理有限公司', relation: '關聯公司' },
            { name: '澳門國際金融服務有限公司', relation: '子公司' }
          ],
          reports: [
            { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-11-01' },
            { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-10-20' },
            { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-09-15' }
          ]
        }
      }

      // 其他企業使用通用逻辑
      return {
        ...enterprise,
        fullName: enterprise.name,
        creditCode: this.generateCreditCode(enterprise),
        legalRepresentative: this.generateLegalRepresentative(enterprise.region),
        registeredCapital: this.generateRegisteredCapital(enterprise.scale),
        establishDate: this.formatEstablishDate(enterprise),
        industry: this.getIndustryByName(enterprise.name),
        type: enterprise.region === '澳門' ? '股份有限公司' : '有限责任公司',
        businessScope: this.getBusinessScope(enterprise.name),
        // 保留原有的信用評分，不要覆盖
        creditScore: enterprise.creditScore || this.convertCreditScore(enterprise.creditLevel),
        creditRating: enterprise.creditLevel,
        financialData: this.generateFinancialData(enterprise.scale),
        riskData: this.generateRiskData(enterprise.riskLevel),
        riskList: this.generateRiskList(enterprise.riskLevel),
        relatedCompanies: this.generateRelatedCompanies(enterprise.name),
        reports: [
          { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-11-01' },
          { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-10-20' },
          { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-09-15' }
        ]
      }
    },

    // 生成默認企業數據
    generateDefaultEnterprise(id) {
      return {
        id: id,
        name: `大灣區企業${id}`,
        fullName: `大灣區企業集团有限公司(${id})`,
        creditCode: `91440101MA${id.padStart(5, '0')}U`,
        legalRepresentative: ['张三', '李四', '王五', '赵六'][Math.floor(Math.random() * 4)],
        registeredCapital: Math.floor(Math.random() * 10000) + 1000,
        establishDate: `${2000 + Math.floor(Math.random() * 22)}-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}`,
        region: ['廣州', '深圳', '香港', '珠海', '澳門', '佛山'][Math.floor(Math.random() * 6)],
        industry: ['金融', '科技', '制造', '服務', '医疗', '教育'][Math.floor(Math.random() * 6)],
        type: ['有限责任公司', '股份有限公司', '合夥企業'][Math.floor(Math.random() * 3)],
        businessScope: '計算機软硬件技术開發、技术服務；信息系統集成服務；信息技术咨詢服務；數據處理和存储服務；企業管理咨詢；會议及展览服務；市场营销策划；自有房屋租赁；物業管理。',
        creditScore: 85 + Math.floor(Math.random() * 15),
        creditRating: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B'][Math.floor(Math.random() * 6)],
        financialData: {
          revenue: 10000 + Math.floor(Math.random() * 90000),
          profit: 1000 + Math.floor(Math.random() * 9000),
          assets: 20000 + Math.floor(Math.random() * 80000),
          liabilities: 10000 + Math.floor(Math.random() * 30000)
        },
        riskData: [
          { name: '司法風險', count: Math.floor(Math.random() * 3) },
          { name: '經营風險', count: Math.floor(Math.random() * 5) },
          { name: '行政處罚', count: Math.floor(Math.random() * 2) },
          { name: '失信信息', count: Math.floor(Math.random() * 1) }
        ],
        riskList: [
          {
            date: '2023-10-15',
            title: '行政處罚',
            description: '因未及時公示年度報告信息，被市场監督管理局處以罚款5000元'
          }
        ],
        relatedCompanies: [
          { name: `大灣區科技有限公司`, relation: '子公司' },
          { name: `大灣區金融服務有限公司`, relation: '關聯公司' },
          { name: `大灣區投資集团`, relation: '股東' }
        ],
        reports: [
          { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-10-15' },
          { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-09-20' },
          { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-11-01' }
        ]
      }
    },

    goToReport(reportId) {
      this.$router.push(`/report/${reportId}?enterprise=${this.enterprise.id}`)
    },

    // 辅助方法：根據地區生成法定代表人
    generateLegalRepresentative(region) {
      const representatives = {
        '澳門': ['何猷君', '崔世安', '賀一誠', '吳志良', '梁維特'],
        '香港': ['李嘉誠', '李澤鉅', '郭炳聯', '劉鑾雄', '呂志和'],
        '深圳': ['馬化騰', '任正非', '王傳福', '汪滔', '徐航'],
        '廣州': ['許家印', '楊國強', '何享健', '梁穩根', '董明珠']
      }
      const names = representatives[region] || ['張三', '李四', '王五', '趙六', '陳七']
      return names[Math.floor(Math.random() * names.length)]
    },

    // 辅助方法：格式化成立日期
    formatEstablishDate(enterprise) {
      if (enterprise.businessYears) {
        const currentYear = new Date().getFullYear()
        const establishYear = currentYear - enterprise.businessYears
        const month = Math.floor(Math.random() * 12) + 1
        const day = Math.floor(Math.random() * 28) + 1
        return `${establishYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      }
      return '1995-01-01'
    },

    // 辅助方法：根據企業名称推断行業
    getIndustryByName(name) {
      if (name.includes('博彩') || name.includes('娛樂') || name.includes('金沙')) return '博彩娛樂'
      if (name.includes('電訊') || name.includes('通訊')) return '電信通訊'
      if (name.includes('機場')) return '交通運輸'
      if (name.includes('自來水')) return '公用事業'
      if (name.includes('人工智能') || name.includes('AI')) return '人工智能'
      if (name.includes('區塊鏈') || name.includes('blockchain')) return '區塊鏈技術'
      if (name.includes('金融科技') || name.includes('FinTech')) return '金融科技'
      if (name.includes('數字經濟') || name.includes('數位')) return '數字經濟'
      if (name.includes('雲計算') || name.includes('雲端')) return '雲計算服務'
      if (name.includes('物聯網') || name.includes('IoT')) return '物聯網技術'
      if (name.includes('大數據') || name.includes('數據分析')) return '大數據分析'
      if (name.includes('電子商務') || name.includes('電商')) return '電子商務'
      if (name.includes('科技') || name.includes('騰訊') || name.includes('華為')) return '科技服務'
      if (name.includes('汽車') || name.includes('比亞迪')) return '汽車制造'
      if (name.includes('地產') || name.includes('恒大')) return '房地產'
      if (name.includes('電器') || name.includes('格力')) return '家電制造'
      return '綜合服務'
    },

    // 辅助方法：根據企業名称生成經营範围
    getBusinessScope(name) {
      if (name.includes('博彩') || name.includes('娛樂') || name.includes('金沙')) {
        return '博彩業務經營；娛樂場所管理；酒店餐飲服務；會議展覽服務；旅遊服務；物業租賃；投資管理。'
      }
      if (name.includes('電訊') || name.includes('通訊')) {
        return '電信業務經營；網絡通訊服務；數據傳輸服務；互聯網接入服務；通訊設備銷售；技術咨詢服務。'
      }
      if (name.includes('機場')) {
        return '機場運營管理；航空地面服務；貨物運輸；旅客服務；商業租賃；廣告服務；停車場管理。'
      }
      if (name.includes('自來水')) {
        return '自來水生產供應；污水處理；水質檢測；管道維護；水務工程；環保服務；技術咨詢。'
      }
      if (name.includes('科技園')) {
        return '科技園區運營管理；科技企業孵化；技術轉移服務；創新創業支持；產學研合作；知識產權服務；投資管理。'
      }
      if (name.includes('智慧城市')) {
        return '智慧城市解決方案；城市信息化建設；物聯網系統集成；智能交通系統；智慧政務服務；數據分析服務。'
      }
      if (name.includes('人工智能')) {
        return '人工智能技術研發；機器學習算法開發；智能軟件開發；AI產品設計；技術咨詢服務；數據處理服務。'
      }
      if (name.includes('區塊鏈')) {
        return '區塊鏈技術開發；分佈式系統設計；加密技術服務；數字資產管理；智能合約開發；技術咨詢服務。'
      }
      if (name.includes('金融科技')) {
        return '金融科技解決方案；支付系統開發；風險管理系統；金融數據分析；投資管理平臺；技術咨詢服務。'
      }
      if (name.includes('數字經濟')) {
        return '數字化轉型服務；電子商務平臺；數字營銷服務；在線教育平臺；數字內容創作；技術咨詢服務。'
      }
      if (name.includes('雲計算')) {
        return '雲計算服務；雲端存儲服務；虛擬化技術；雲安全服務；雲平臺開發；技術運維服務。'
      }
      if (name.includes('物聯網')) {
        return '物聯網系統開發；傳感器技術；智能設備製造；物聯網平臺運營；數據採集分析；技術咨詢服務。'
      }
      if (name.includes('大數據')) {
        return '大數據分析服務；數據挖掘技術；商業智能解決方案；數據可視化；預測分析；數據咨詢服務。'
      }
      if (name.includes('電子商務')) {
        return '電子商務平臺運營；在線零售服務；數字營銷；供應鏈管理；支付解決方案；客戶關係管理。'
      }
      return '企業管理；投資咨詢；商務服務；技術開發；設備租賃；物業管理；進出口貿易。'
    },

    // 辅助方法：将信用等級转换為信用評分
    convertCreditScore(creditLevel) {
      const scoreMap = {
        'AAA': 95 + Math.floor(Math.random() * 5),
        'AA': 85 + Math.floor(Math.random() * 10),
        'A': 75 + Math.floor(Math.random() * 10),
        'BBB': 65 + Math.floor(Math.random() * 10),
        'BB': 55 + Math.floor(Math.random() * 10),
        'B': 45 + Math.floor(Math.random() * 10)
      }
      return scoreMap[creditLevel] || 80
    },

    // 辅助方法：根據企業規模生成財務數據
    generateFinancialData(scale) {
      const scaleMultiplier = {
        '大型企業': { revenue: 100000, profit: 10000, assets: 200000, liabilities: 80000 },
        '中型企業': { revenue: 30000, profit: 3000, assets: 60000, liabilities: 25000 },
        '小型企業': { revenue: 8000, profit: 800, assets: 15000, liabilities: 6000 }
      }
      const base = scaleMultiplier[scale] || scaleMultiplier['中型企業']
      return {
        revenue: base.revenue + Math.floor(Math.random() * base.revenue * 0.5),
        profit: base.profit + Math.floor(Math.random() * base.profit * 0.5),
        assets: base.assets + Math.floor(Math.random() * base.assets * 0.3),
        liabilities: base.liabilities + Math.floor(Math.random() * base.liabilities * 0.3)
      }
    },

    // 辅助方法：根據風險等級生成風險數據
    generateRiskData(riskLevel) {
      const riskMultiplier = {
        '低風險': { judicial: 0, business: 1, admin: 0, credit: 0 },
        '中風險': { judicial: 1, business: 2, admin: 1, credit: 0 },
        '高風險': { judicial: 3, business: 5, admin: 2, credit: 1 }
      }
      const base = riskMultiplier[riskLevel] || riskMultiplier['低風險']
      return [
        { name: '司法風險', count: base.judicial + Math.floor(Math.random() * 2) },
        { name: '經營風險', count: base.business + Math.floor(Math.random() * 2) },
        { name: '行政處罰', count: base.admin + Math.floor(Math.random() * 2) },
        { name: '失信信息', count: base.credit + Math.floor(Math.random() * 1) }
      ]
    },

    // 辅助方法：根據風險等級生成風險事件列表
    generateRiskList(riskLevel) {
      if (riskLevel === '低風險') {
        return []
      }
      return [
        {
          date: '2023-10-15',
          title: '經營風險',
          description: '受市場環境影響，部分業務收入有所下降'
        }
      ]
    },

    // 辅助方法：根據企業名称生成關聯企業
    generateRelatedCompanies(name) {
      const baseName = name.replace(/有限公司|股份有限公司|集團/g, '')
      return [
        { name: `${baseName}投資有限公司`, relation: '關聯公司' },
        { name: `${baseName}管理有限公司`, relation: '子公司' },
        { name: `${baseName}發展有限公司`, relation: '控股公司' }
      ]
    },

    // 辅助方法：生成信用代碼
    generateCreditCode(enterprise) {
      if (enterprise.region === '澳門') {
        return `MO${enterprise.id.toString().padStart(8, '0')}`
      } else if (enterprise.region === '香港') {
        return `HK${enterprise.id.toString().padStart(8, '0')}`
      } else {
        return `91440${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}${enterprise.id.toString().padStart(8, '0')}`
      }
    },

    // 辅助方法：根據企業規模生成注册資本
    generateRegisteredCapital(scale) {
      const scaleMultiplier = {
        '大型企業': 50000 + Math.floor(Math.random() * 200000), // 5万-25万
        '中型企業': 10000 + Math.floor(Math.random() * 40000),  // 1万-5万
        '小型企業': 1000 + Math.floor(Math.random() * 9000)     // 0.1万-1万
      }
      return scaleMultiplier[scale] || 10000
    }
  }
}
</script>

<style scoped>
.enterprise-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 頁面進入動画 - 更快更流畅 */
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(6px);
  animation: smoothFadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從1.2s减少到0.6s */
}

.animate-slide-in-left {
  opacity: 0;
  transform: translateX(6px);
  animation: smoothFadeInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從1.2s减少到0.6s */
}

.animate-slide-in-right {
  opacity: 0;
  transform: translateX(-6px);
  animation: smoothFadeInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從1.2s减少到0.6s */
}

.animate-slide-in-up {
  opacity: 0;
  transform: translateY(6px);
  animation: smoothFadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從1.2s减少到0.6s */
}

.animate-fade-in-scale {
  opacity: 0;
  transform: scale(0.99);
  animation: smoothFadeInScale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從1.2s减少到0.6s */
}

@keyframes smoothFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes smoothFadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes smoothFadeInRight {
  0% {
    opacity: 0;
    transform: translateX(-8px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes smoothFadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #5EFCE8;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #c9d1d9;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.print-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.print-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.enterprise-header-card {
  display: flex;
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  justify-content: space-between;
}

.enterprise-info-main {
  flex: 1;
}

.enterprise-name {
  font-size: 28px;
  margin: 0 0 15px 0;
  color: #e6edf3;
  background: linear-gradient(135deg, #fff 0%, #c9d1d9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.enterprise-basic-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.enterprise-score-card {
  display: flex;
  gap: 20px;
  align-items: center;
}

.score-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 5px 15px rgba(94, 252, 232, 0.3);
}

.score-value {
  font-size: 28px;
  font-weight: bold;
}

.score-label {
  font-size: 12px;
  opacity: 0.8;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rating-value {
  font-size: 36px;
  font-weight: bold;
  color: #e6edf3;
}

.rating-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.detail-card {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-title {
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #e6edf3;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-title i {
  color: #5EFCE8;
}

.info-grid {
  display: grid;
  gap: 10px;
}

.info-row {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
}

.info-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.info-value {
  color: rgba(255, 255, 255, 0.9);
}

.long-text {
  grid-column: 1 / 3;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  line-height: 1.5;
}

.chart-container {
  margin-bottom: 20px;
}

.chart-placeholder {
  height: 150px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  gap: 10px;
}

.chart-placeholder i {
  font-size: 30px;
}

.financial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.financial-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.financial-value {
  font-size: 18px;
  font-weight: bold;
  color: #5EFCE8;
  margin-bottom: 5px;
}

.financial-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.risk-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.risk-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  text-align: center;
}

.risk-value {
  font-size: 24px;
  font-weight: bold;
  color: #ff7e5f;
}

.risk-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.risk-list {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
}

.risk-list-header {
  font-size: 16px;
  color: #e6edf3;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.risk-event {
  display: flex;
  margin-bottom: 15px;
  gap: 10px;
}

.event-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  min-width: 90px;
}

.event-title {
  font-weight: bold;
  color: #ff7e5f;
  margin-bottom: 5px;
}

.event-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.no-risk {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100px;
  color: rgba(255, 255, 255, 0.5);
}

.no-risk i {
  color: #4CAF50;
  font-size: 30px;
}

.company-list {
  display: grid;
  gap: 10px;
}

.company-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.company-name {
  font-weight: bold;
  color: #e6edf3;
}

.relation-type {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 3px 8px;
  border-radius: 10px;
}

.report-section {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #e6edf3;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-title i {
  color: #5EFCE8;
}

.report-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.report-card {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.report-card:hover {
  background: rgba(0, 0, 0, 0.3);
  transform: translateY(-3px);
}

.report-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
}

.report-info {
  flex: 1;
}

.report-name {
  font-weight: bold;
  color: #e6edf3;
  margin-bottom: 5px;
}

.report-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.report-action {
  color: rgba(255, 255, 255, 0.6);
  transition: transform 0.3s ease;
}

.report-card:hover .report-action {
  transform: translateX(3px);
}

/* 简单加載樣式 */
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

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .enterprise-header-card {
    flex-direction: column;
    gap: 20px;
  }

  .enterprise-score-card {
    justify-content: center;
  }

  .risk-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>