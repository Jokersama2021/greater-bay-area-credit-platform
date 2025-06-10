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
        // 真實企業數據
        const enterprises = [
          {
            id: 1,
            name: '騰訊科技（深圳）有限公司',
            fullName: '騰訊科技（深圳）有限公司',
            creditCode: '91440300708461136T',
            legalRepresentative: '馬化騰',
            registeredCapital: 200000,
            establishDate: '1998-11-11',
            region: '深圳',
            industry: '互聯網',
            type: '有限责任公司',
            businessScope: '計算機软件的设計、開發、销售；互聯網及移動網絡技术開發；數據库及計算機網絡服務；電子商務；廣告设計、制作、代理、發布；經营電信業務；從事互聯網文化活動；信息服務業務。',
            creditScore: 98,
            creditRating: 'AAA',
            financialData: {
              revenue: 560380,
              profit: 159846,
              assets: 988620,
              liabilities: 410550
            },
            riskData: [
              { name: '司法風險', count: 0 },
              { name: '經营風險', count: 1 },
              { name: '行政處罚', count: 0 },
              { name: '失信信息', count: 0 }
            ],
            riskList: [
              {
                date: '2022-12-15',
                title: '經营風險',
                description: '因未及時更新個別游戏的版号信息，被監管部門要求整改'
              }
            ],
            relatedCompanies: [
              { name: '深圳市騰訊計算機系統有限公司', relation: '全資子公司' },
              { name: '騰訊音乐娱乐集团', relation: '控股子公司' },
              { name: '騰訊影業文化传播有限公司', relation: '控股子公司' }
            ],
            reports: [
              { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-10-15' },
              { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-09-28' },
              { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-11-05' }
            ]
          },
          {
            id: 2,
            name: '華為技术有限公司',
            fullName: '華為技术有限公司',
            creditCode: '91440300618933235D',
            legalRepresentative: '任正非',
            registeredCapital: 3990813,
            establishDate: '1987-09-15',
            region: '深圳',
            industry: '通信设備制造',
            type: '有限责任公司',
            businessScope: '通信终端设備、數據通信设備的開發、生產、销售；計算機软硬件、計算機網絡系統集成及應用软件的開發、生產、销售；數據處理服務；通信及信息系統工程设計、施工、技术咨詢。',
            creditScore: 97,
            creditRating: 'AAA',
            financialData: {
              revenue: 891368,
              profit: 113728,
              assets: 876854,
              liabilities: 455620
            },
            riskData: [
              { name: '司法風險', count: 1 },
              { name: '經营風險', count: 2 },
              { name: '行政處罚', count: 0 },
              { name: '失信信息', count: 0 }
            ],
            riskList: [
              {
                date: '2023-05-10',
                title: '經营風險',
                description: '受國際贸易环境影响，部分海外市场業務受限'
              },
              {
                date: '2023-02-18',
                title: '司法風險',
                description: '涉及一起知識產权诉讼案件，目前正在审理中'
              }
            ],
            relatedCompanies: [
              { name: '華為终端有限公司', relation: '全資子公司' },
              { name: '華為投資控股有限公司', relation: '母公司' },
              { name: '華為海洋網絡有限公司', relation: '控股子公司' }
            ],
            reports: [
              { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-11-12' },
              { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-10-25' },
              { id: 4, name: '風控预警報告', icon: 'fas fa-exclamation-circle', date: '2023-09-30' }
            ]
          },
          {
            id: 3,
            name: '比亚迪股份有限公司',
            fullName: '比亚迪股份有限公司',
            creditCode: '91440300192317458F',
            legalRepresentative: '王传福',
            registeredCapital: 287793,
            establishDate: '1995-02-10',
            region: '深圳',
            industry: '汽車制造',
            type: '股份有限公司',
            businessScope: '锂離子電池以及其他電池、充電器、電子產品、仪器仪表、柔性線路板、五金制品、液晶顯示器、手機零配件、模具、塑胶制品及其相關附件的生產、销售；汽車及汽車零配件、汽車用品的開發、制造及销售；自营進出口業務。',
            creditScore: 93,
            creditRating: 'AA',
            financialData: {
              revenue: 424061,
              profit: 30037,
              assets: 579494,
              liabilities: 365880
            },
            riskData: [
              { name: '司法風險', count: 0 },
              { name: '經营風險', count: 1 },
              { name: '行政處罚', count: 1 },
              { name: '失信信息', count: 0 }
            ],
            riskList: [
              {
                date: '2023-07-12',
                title: '行政處罚',
                description: '因环保問題，某工厂被环保部門處罚20万元'
              },
              {
                date: '2023-04-03',
                title: '經营風險',
                description: '部分車型因電池管理系統問題進行召回'
              }
            ],
            relatedCompanies: [
              { name: '比亚迪汽車工業有限公司', relation: '全資子公司' },
              { name: '比亚迪電子（國際）有限公司', relation: '控股子公司' },
              { name: '深圳市比亚迪供應链管理有限公司', relation: '控股子公司' }
            ],
            reports: [
              { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-10-05' },
              { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-11-11' },
              { id: 4, name: '風控预警報告', icon: 'fas fa-exclamation-circle', date: '2023-10-18' }
            ]
          },
          {
            id: 4,
            name: '廣州恒大集团有限公司',
            fullName: '廣州恒大集团有限公司',
            creditCode: '91440101231231546X',
            legalRepresentative: '许家印',
            registeredCapital: 300000,
            establishDate: '1996-06-24',
            region: '廣州',
            industry: '房地產',
            type: '有限责任公司',
            businessScope: '房地產開發經营；物業管理；房地產咨詢服務；房地產中介服務；企業管理咨詢服務；市场营销策划服務；商品零售贸易；商品批發贸易。',
            creditScore: 55,
            creditRating: 'BB',
            financialData: {
              revenue: 195540,
              profit: -52860,
              assets: 895620,
              liabilities: 796250
            },
            riskData: [
              { name: '司法風險', count: 15 },
              { name: '經营風險', count: 23 },
              { name: '行政處罚', count: 7 },
              { name: '失信信息', count: 3 }
            ],
            riskList: [
              {
                date: '2023-11-02',
                title: '司法風險',
                description: '因债務問題被多家企業提起诉讼'
              },
              {
                date: '2023-10-08',
                title: '經营風險',
                description: '多個项目停工，面临資金链断裂風險'
              },
              {
                date: '2023-09-15',
                title: '失信信息',
                description: '因未履行法院判決被列入失信被执行人名单'
              }
            ],
            relatedCompanies: [
              { name: '恒大地產集团有限公司', relation: '全資子公司' },
              { name: '恒大健康產業集团有限公司', relation: '控股子公司' },
              { name: '恒大物業集团有限公司', relation: '控股子公司' }
            ],
            reports: [
              { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-07-25' },
              { id: 4, name: '風控预警報告', icon: 'fas fa-exclamation-circle', date: '2023-11-10' }
            ]
          },
          {
            id: 5,
            name: '珠海格力電器股份有限公司',
            fullName: '珠海格力電器股份有限公司',
            creditCode: '91440400192548256P',
            legalRepresentative: '董明珠',
            registeredCapital: 601573,
            establishDate: '1989-12-13',
            region: '珠海',
            industry: '家電制造',
            type: '股份有限公司',
            businessScope: '货物、技术的進出口；民用空调、中央空调、冷冻冷藏设備、通訊设備、家用電器、電子產品、智能家居產品、智能装備、機器人、精密模具等的研發、制造、加工、销售及售后服務；新能源技术研發等。',
            creditScore: 95,
            creditRating: 'AAA',
            financialData: {
              revenue: 198154,
              profit: 27107,
              assets: 356782,
              liabilities: 143591
            },
            riskData: [
              { name: '司法風險', count: 0 },
              { name: '經营風險', count: 0 },
              { name: '行政處罚', count: 0 },
              { name: '失信信息', count: 0 }
            ],
            riskList: [],
            relatedCompanies: [
              { name: '珠海格力集团有限公司', relation: '大股東' },
              { name: '格力電工（馬來西亚）有限公司', relation: '全資子公司' },
              { name: '珠海格力智能装備有限公司', relation: '全資子公司' }
            ],
            reports: [
              { id: 1, name: '企業資信報告', icon: 'fas fa-file-invoice', date: '2023-11-01' },
              { id: 2, name: '資產評估報告', icon: 'fas fa-balance-scale', date: '2023-10-20' },
              { id: 3, name: '企業評分報告', icon: 'fas fa-chart-line', date: '2023-09-15' }
            ]
          }
        ];

        // 根據ID获取企業數據，如果找不到则生成随機數據
        const enterprise = enterprises.find(e => e.id === parseInt(id)) || {
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
            },
            {
              date: '2023-09-10',
              title: '經营風險',
              description: '受原材料价格上涨影响，產品成本增加，毛利率下降'
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
        };

        this.enterprise = enterprise;
        this.loading = false;

        // 启動信用評分動画 - 等待頁面過渡完成
        setTimeout(() => {
          this.animateScore(enterprise.creditScore, 1500)
        }, 800)
      }, 200);
    },
    goToReport(reportId) {
      this.$router.push(`/report/${reportId}?enterprise=${this.enterprise.id}`)
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