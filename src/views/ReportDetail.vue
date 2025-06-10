<template>
  <div class="report-detail-container">
    <div v-if="loading" class="simple-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加載報告詳情中...</div>
    </div>

    <div v-else class="content">
      <div class="page-header animate-fade-in-up" :style="{ animationDelay: '0.2s' }">
        <router-link :to="`/enterprise/${enterpriseId}`" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回企業詳情
        </router-link>
        <div class="action-btn">
          <button class="download-btn">
            <i class="fas fa-download"></i> 下載報告
          </button>
        </div>
      </div>

      <div class="report-header animate-slide-in-up" :style="{ animationDelay: '0.3s' }">
        <div class="report-title-section">
          <h1 class="report-title animate-slide-in-left" :style="{ animationDelay: '0.4s' }">{{ report.title }}</h1>
          <div class="report-meta">
            <div class="meta-item animate-fade-in-up" :style="{ animationDelay: '0.5s' }">
              <i class="fas fa-calendar-alt"></i>
              <span>生成日期: {{ report.generateDate }}</span>
            </div>
            <div class="meta-item animate-fade-in-up" :style="{ animationDelay: '0.6s' }">
              <i class="fas fa-id-card"></i>
              <span>報告编号: {{ report.id }}</span>
            </div>
          </div>
        </div>

        <div class="report-icon animate-fade-in-scale" :style="{ animationDelay: '0.5s' }">
          <i :class="report.icon"></i>
        </div>
      </div>

      <div class="enterprise-summary animate-slide-in-up" :style="{ animationDelay: '0.7s' }">
        <h2 class="section-title">企業概况</h2>
        <div class="summary-content">
          <div class="enterprise-basic animate-slide-in-left" :style="{ animationDelay: '0.8s' }">
            <div class="enterprise-name">{{ report.enterpriseName }}</div>
            <div class="enterprise-info">
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ report.enterpriseRegion }}</span>
              </div>
              <div class="info-item">
                <i class="fas fa-industry"></i>
                <span>{{ report.enterpriseIndustry }}</span>
              </div>
            </div>
          </div>

          <div class="credit-summary animate-slide-in-right" :style="{ animationDelay: '0.9s' }">
            <div class="credit-score">
              <div class="score-value">{{ animatedScore }}</div>
              <div class="score-label">信用評分</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="report-section animate-slide-in-up" :style="{ animationDelay: '1.0s' }">
        <h2 class="section-title">評估结果</h2>
        <div class="section-content">
          <div class="section-text">{{ report.conclusion }}</div>
        </div>
      </div>

      <div
        v-for="(section, index) in report.sections"
        :key="index"
        class="report-section animate-slide-in-up"
        :style="{ animationDelay: `${1.1 + index * 0.08}s` }"
      >
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="section-content">
          <div class="section-text">{{ section.content }}</div>
        </div>
      </div>

      <div class="report-section animate-slide-in-up" :style="{ animationDelay: `${1.3 + report.sections.length * 0.08}s` }">
        <h2 class="section-title">建议与展望</h2>
        <div class="recommendations">
          <div
            v-for="(recommendation, index) in report.recommendations"
            :key="index"
            class="recommendation-item animate-fade-in-up"
            :style="{ animationDelay: `${1.4 + report.sections.length * 0.08 + index * 0.06}s` }"
          >
            <div class="recommendation-icon">
              <i :class="recommendation.icon"></i>
            </div>
            <div class="recommendation-content">
              <div class="recommendation-title">{{ recommendation.title }}</div>
              <div class="recommendation-text">{{ recommendation.content }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportDetail',
  data() {
    return {
      loading: true,
      enterpriseId: null,
      animatedScore: 0,
      report: {
        id: '',
        title: '',
        icon: '',
        generateDate: '',
        enterpriseName: '',
        enterpriseRegion: '',
        enterpriseIndustry: '',
        creditScore: 0,
        conclusion: '',
        sections: [],
        recommendations: []
      }
    }
  },
  created() {
    this.enterpriseId = this.$route.query.enterprise || null
    const reportId = this.$route.params.id
    this.fetchReportDetail(reportId)
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

    fetchReportDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        // 真實報告數據
        const reportTypes = [
          {
            id: 1,
            title: '企業資信報告',
            icon: 'fas fa-file-invoice',
            sections: [
              {
                title: '基本信息分析',
                content: '该企業在工商注册、法律诉讼、税務缴纳等方面表現良好，企業合規性高。公司成立至今，企業主体資格和經营状态稳定，未發現异常变更記录。法人代表及主要股東個人信用良好，無不良記录。'
              },
              {
                title: '財務状况評估',
                content: '企業近三年財務状况稳健，資產负债率保持在42%左右，低于行業平均水平。流動比率2.1，速動比率1.8，短期偿债能力較强。营業收入保持平稳增長，毛利率和净利率均高于行業平均水平，体現了良好的盈利能力和成本控制能力。'
              },
              {
                title: '市场表現分析',
                content: '企業在行業内具有較高的市场份额和品牌影响力，主要產品市场占有率位居行業前五。客户结構多元化，無過度依赖单一客户現象。供應商合作稳定，采购渠道多樣化，有效降低了供應链風險。'
              }
            ],
            recommendations: [
              {
                title: '拓展融資渠道',
                content: '建议企業在保持銀行贷款良好合作的基础上，适當考虑多元化融資渠道，如發行债券、引入战略投資者等，優化資本结構。',
                icon: 'fas fa-money-bill-wave'
              },
              {
                title: '增强研發投入',
                content: '建议持续加大研發投入，提高產品技术含量和附加值，增强企業核心竞争力。',
                icon: 'fas fa-lightbulb'
              },
              {
                title: '優化公司治理',
                content: '建议完善内部控制制度，强化風險管理，提升公司治理水平，為企業長期稳健發展奠定基础。',
                icon: 'fas fa-balance-scale'
              }
            ]
          },
          {
            id: 2,
            title: '資產評估報告',
            icon: 'fas fa-balance-scale',
            sections: [
              {
                title: '資產評估概述',
                content: '本次評估采用資產基础法和收益法两种方法，最终選取收益法評估结果作為評估结论。評估基準日為2025年6月30日，企業整体資產評估价值為152.8亿元，較账面净資產增值率為28.4%。'
              },
              {
                title: '固定資產評估',
                content: '企業固定資產主要包括房屋建筑物、機器设備、运输设備和電子设備等。經評估，固定資產評估价值為38.6亿元，增值率為15.2%。增值原因主要是房產价格上涨和部分设備折旧年限与實際經济寿命不一致所致。'
              },
              {
                title: '無形資產評估',
                content: '企業無形資產主要包括土地使用权、專利技术、商標权和软件著作权等。經評估，無形資產評估价值為26.9亿元，增值率為42.8%。增值較大的原因主要是企業拥有的核心技术專利和品牌价值在账面价值中未得到充分体現。'
              },
              {
                title: '長期股权投資評估',
                content: '企業共有12家子公司的長期股权投資，經評估，長期股权投資評估价值為45.3亿元，增值率為22.6%。增值原因主要是部分子公司盈利能力較强，未來收益预期良好。'
              }
            ],
            recommendations: [
              {
                title: '優化資產结構',
                content: '建议對低效資產進行處置或改造，提高資產使用效率，優化資產结構，提升資產回報率。',
                icon: 'fas fa-chart-pie'
              },
              {
                title: '加强知識產权管理',
                content: '建议加强對專利、商標等知識產权的管理和保护，完善知識產权运营策略，充分發挥無形資產的价值。',
                icon: 'fas fa-copyright'
              },
              {
                title: '推進子公司整合',
                content: '建议對業務重叠或协同效應不明顯的子公司進行整合或调整，優化集团管控模式，提高整体运营效率。',
                icon: 'fas fa-object-group'
              }
            ]
          },
          {
            id: 3,
            title: '企業評分報告',
            icon: 'fas fa-chart-line',
            sections: [
              {
                title: '評分模型說明',
                content: '本評分報告采用多维度、全方位的評分体系，包括財務表現、市场地位、管理能力、創新能力和社會责任五大维度，每個维度下设多個細分指標，滿分100分。根據得分情况，将企業評級划分為AAA、AA、A、BBB、BB、B、CCC、CC、C九個等級。'
              },
              {
                title: '財務表現（得分：85分）',
                content: '企業財務状况良好，利润率、資產回報率和現金流量等指標均高于行業平均水平。資產负债结構合理，短期和長期偿债能力强。財務管理規範，信息披露及時、準确、完整。'
              },
              {
                title: '市场地位（得分：88分）',
                content: '企業在行業内處于領先地位，市场份额稳步提升。品牌知名度高，客户滿意度和忠诚度强。產品竞争力突出，定价能力强，毛利率水平高于行業平均。'
              },
              {
                title: '管理能力（得分：82分）',
                content: '企業管理团队經验丰富，战略規划明确，执行力强。公司治理结構完善，内控体系健全。人力資源管理体系完善，员工滿意度和稳定性高。'
              },
              {
                title: '創新能力（得分：78分）',
                content: '企業研發投入占比較高，拥有多项核心專利技术。產品創新能力强，新產品贡献率高。技术創新与商業模式創新并重，有較强的行業引領性。'
              },
              {
                title: '社會责任（得分：80分）',
                content: '企業环保达標率100%，积極推進节能减排和绿色制造。参与社會公益活動，履行企業社會责任。劳動關系和谐，员工权益保障完善。'
              },
              {
                title: '综合評分与評級',
                content: '企業综合評分為83分，對應信用評級為AA級。表明企業整体實力較强，經营稳健，抗風險能力强，發展前景良好。'
              }
            ],
            recommendations: [
              {
                title: '提升創新能力',
                content: '建议加大研發投入，完善創新激励機制，提高技术創新能力和新產品開發速度，增强企業核心竞争力。',
                icon: 'fas fa-rocket'
              },
              {
                title: '優化管理体系',
                content: '建议進一步完善企業管理体系，推進信息化和數字化转型，提高管理效率和決策水平。',
                icon: 'fas fa-cogs'
              },
              {
                title: '拓展國際市场',
                content: '建议积極拓展國際市场，優化全球資源配置，提高國際化經营水平，降低单一市场依赖風險。',
                icon: 'fas fa-globe'
              }
            ]
          },
          {
            id: 4,
            title: '風控预警報告',
            icon: 'fas fa-exclamation-circle',
            sections: [
              {
                title: '風險評估概述',
                content: '本報告基于企業經营數據、行業环境、政策变化等多维度信息，對企業面临的各类風險進行综合評估和预警。風險等級分為高、中、低三級，并提供针對性的風險管控建议。'
              },
              {
                title: '經营風險（等級：中）',
                content: '企業主营業務收入增速放缓，較上年同期下降5.2個百分點，毛利率有所下滑。主要原因是原材料价格上涨和行業竞争加剧。建议加强成本管控，優化產品结構，提高高毛利產品占比。'
              },
              {
                title: '財務風險（等級：低）',
                content: '企業整体財務状况稳健，偿债能力强，但應收账款周转率有所下降，較上年同期延長8天。建议加强應收账款管理，完善客户信用評估体系，防範坏账風險。'
              },
              {
                title: '市场風險（等級：中）',
                content: '行業竞争加剧，新進入者增多，市场份额面临挑战。部分區域市场饱和度高，增長空間有限。建议深耕優势區域，积極開拓新兴市场，加强品牌差异化建设。'
              },
              {
                title: '政策風險（等級：中）',
                content: '行業監管趋严，环保、安全、质量等標準提高，合規成本增加。相關税收優惠政策可能调整，影响企業盈利水平。建议密切關注政策变化，提前做好應對準備。'
              },
              {
                title: '运营風險（等級：低）',
                content: '企業供應链總体稳定，但個別關键原材料供應商集中度較高，存在供應風險。信息系統安全防护需要加强，防範網絡安全風險。建议優化供應商结構，加强信息系統安全建设。'
              }
            ],
            recommendations: [
              {
                title: '構建全面風險管理体系',
                content: '建议建立健全全面風險管理体系，明确風險管理责任，完善風險識別、評估、應對和監控機制，提高風險管理的系統性和有效性。',
                icon: 'fas fa-shield-alt'
              },
              {
                title: '加强財務風險预警',
                content: '建议建立財務風險预警機制，定期開展財務風險排查，關注現金流、负债、應收账款等關键指標，防範財務風險。',
                icon: 'fas fa-chart-line'
              },
              {
                title: '完善業務連续性計划',
                content: '建议制定完善的業務連续性計划，做好重大風險事件的應急预案，提高企業應對突發事件的能力，确保業務持续稳定运行。',
                icon: 'fas fa-random'
              }
            ]
          }
        ];

        // 根據ID获取報告數據
        const reportData = reportTypes.find(r => r.id === parseInt(id)) || reportTypes[0];
        
        // 获取關聯的企業
        const enterpriseId = this.$route.query.enterprise || Math.floor(Math.random() * 5) + 1;
        const enterprises = {
          1: {
            name: '騰訊科技（深圳）有限公司',
            region: '深圳',
            industry: '互聯網'
          },
          2: {
            name: '華為技术有限公司',
            region: '深圳',
            industry: '通信设備制造'
          },
          3: {
            name: '比亚迪股份有限公司',
            region: '深圳',
            industry: '汽車制造'
          },
          4: {
            name: '廣州恒大集团有限公司',
            region: '廣州',
            industry: '房地產'
          },
          5: {
            name: '珠海格力電器股份有限公司',
            region: '珠海',
            industry: '家電制造'
          }
        };
        
        const enterprise = enterprises[enterpriseId] || {
          name: `大灣區企業${enterpriseId}`,
          region: ['廣州', '深圳', '香港', '珠海'][Math.floor(Math.random() * 4)],
          industry: ['金融', '科技', '制造', '服務'][Math.floor(Math.random() * 4)]
        };
        
        this.report = {
          id: `GBA${10000 + parseInt(id)}`,
          title: reportData.title,
          icon: reportData.icon,
          generateDate: '2025-11-15',
          enterpriseName: enterprise.name,
          enterpriseRegion: enterprise.region,
          enterpriseIndustry: enterprise.industry,
          creditScore: 85 + Math.floor(Math.random() * 15),
          conclusion: '该企業整体經营状况良好，具有較高的資信水平和偿债能力。在市场表現、財務状况、合規性等方面均保持良好水平，但存在一定的經营風險，建议持续關注其現金流变化和市场环境影响。',
          sections: reportData.sections || [
            {
              title: '基本信息分析',
              content: '企業成立于2015年，位于廣州市南沙區，主要從事科技產品研發与销售業務。近三年营業收入持续增長，年均增長率达15%，具有良好的發展潜力。公司员工規模稳定在200人左右，核心管理团队稳定。'
            },
            {
              title: '財務状况評估',
              content: '该企業財務状况總体健康，資產负债率為45%，處于行業平均水平。流動比率1.8，速動比率1.3，短期偿债能力良好。营業利润率為18%，净資產收益率為16%，盈利能力較强。'
            },
            {
              title: '經营風險分析',
              content: '企業經营風險總体可控，但需關注行業政策变化和市场竞争加剧带來的挑战。主要風險點包括：技术創新風險、客户集中度風險、資金周转風險。建议加强風險管理，拓展客户群体，優化資金使用效率。'
            }
          ],
          recommendations: reportData.recommendations || [
            {
              title: '優化客户结構',
              content: '建议企業积極拓展新客户群体，降低對大客户的依赖度，分散經营風險。',
              icon: 'fas fa-user-plus'
            },
            {
              title: '加强現金流管理',
              content: '提高應收账款管理效率，合理規划投資节奏，确保企業現金流健康。',
              icon: 'fas fa-money-bill-wave'
            },
            {
              title: '增强技术研發',
              content: '持续加大研發投入，保持技术領先性，提高產品附加值和市场竞争力。',
              icon: 'fas fa-lightbulb'
            }
          ]
        };
        
        this.loading = false;

        // 启動信用評分動画 - 等待頁面過渡完成
        setTimeout(() => {
          this.animateScore(this.report.creditScore, 1500)
        }, 800)
      }, 200);
    }
  }
}
</script>

<style scoped>
.report-detail-container {
  max-width: 1000px;
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

.action-btn {
  display: flex;
  gap: 10px;
}

.download-btn {
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

.download-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.report-title-section {
  flex: 1;
}

.report-title {
  font-size: 28px;
  margin: 0 0 15px 0;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.report-meta {
  display: flex;
  gap: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.report-icon {
  width: 70px;
  height: 70px;
  border-radius: 15px;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
}

.enterprise-summary, .report-section {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.section-title {
  font-size: 20px;
  margin: 0 0 20px 0;
  color: #e6edf3;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.summary-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.enterprise-basic {
  flex: 1;
  min-width: 250px;
}

.enterprise-name {
  font-size: 24px;
  font-weight: bold;
  color: #e6edf3;
  margin-bottom: 10px;
}

.enterprise-info {
  display: flex;
  gap: 15px;
  color: rgba(255, 255, 255, 0.7);
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.credit-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.credit-score {
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
  font-size: 32px;
  font-weight: bold;
}

.score-label {
  font-size: 12px;
  opacity: 0.8;
}

.section-content {
  padding: 10px;
}

.section-text {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.recommendations {
  display: grid;
  gap: 15px;
}

.recommendation-item {
  display: flex;
  gap: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
}

.recommendation-icon {
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

.recommendation-content {
  flex: 1;
}

.recommendation-title {
  font-weight: bold;
  color: #e6edf3;
  margin-bottom: 5px;
}

.recommendation-text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
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
  .report-header {
    flex-direction: column;
    gap: 20px;
  }

  .report-icon {
    margin: 0 auto;
  }

  .report-meta {
    flex-direction: column;
    gap: 10px;
  }

  .action-btn {
    flex-direction: column;
    margin-top: 10px;
  }
}
</style>