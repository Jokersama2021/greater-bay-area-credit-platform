<template>
  <div class="report-detail-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <div v-else class="content">
      <div class="page-header">
        <router-link :to="`/enterprise/${enterpriseId}`" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回企业详情
        </router-link>
        <div class="action-btn">
          <button class="download-btn">
            <i class="fas fa-download"></i> 下载报告
          </button>
        </div>
      </div>
      
      <div class="report-header">
        <div class="report-title-section">
          <h1 class="report-title">{{ report.title }}</h1>
          <div class="report-meta">
            <div class="meta-item">
              <i class="fas fa-calendar-alt"></i>
              <span>生成日期: {{ report.generateDate }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-id-card"></i>
              <span>报告编号: {{ report.id }}</span>
            </div>
          </div>
        </div>
        
        <div class="report-icon">
          <i :class="report.icon"></i>
        </div>
      </div>
      
      <div class="enterprise-summary">
        <h2 class="section-title">企业概况</h2>
        <div class="summary-content">
          <div class="enterprise-basic">
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
          
          <div class="credit-summary">
            <div class="credit-score">
              <div class="score-value">{{ report.creditScore }}</div>
              <div class="score-label">信用评分</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="report-section">
        <h2 class="section-title">评估结果</h2>
        <div class="section-content">
          <div class="section-text">{{ report.conclusion }}</div>
        </div>
      </div>
      
      <div v-for="(section, index) in report.sections" :key="index" class="report-section">
        <h2 class="section-title">{{ section.title }}</h2>
        <div class="section-content">
          <div class="section-text">{{ section.content }}</div>
        </div>
      </div>
      
      <div class="report-section">
        <h2 class="section-title">建议与展望</h2>
        <div class="recommendations">
          <div v-for="(recommendation, index) in report.recommendations" :key="index" class="recommendation-item">
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
    fetchReportDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        // 真实报告数据
        const reportTypes = [
          {
            id: 1,
            title: '企业资信报告',
            icon: 'fas fa-file-invoice',
            sections: [
              {
                title: '基本信息分析',
                content: '该企业在工商注册、法律诉讼、税务缴纳等方面表现良好，企业合规性高。公司成立至今，企业主体资格和经营状态稳定，未发现异常变更记录。法人代表及主要股东个人信用良好，无不良记录。'
              },
              {
                title: '财务状况评估',
                content: '企业近三年财务状况稳健，资产负债率保持在42%左右，低于行业平均水平。流动比率2.1，速动比率1.8，短期偿债能力较强。营业收入保持平稳增长，毛利率和净利率均高于行业平均水平，体现了良好的盈利能力和成本控制能力。'
              },
              {
                title: '市场表现分析',
                content: '企业在行业内具有较高的市场份额和品牌影响力，主要产品市场占有率位居行业前五。客户结构多元化，无过度依赖单一客户现象。供应商合作稳定，采购渠道多样化，有效降低了供应链风险。'
              }
            ],
            recommendations: [
              {
                title: '拓展融资渠道',
                content: '建议企业在保持银行贷款良好合作的基础上，适当考虑多元化融资渠道，如发行债券、引入战略投资者等，优化资本结构。',
                icon: 'fas fa-money-bill-wave'
              },
              {
                title: '增强研发投入',
                content: '建议持续加大研发投入，提高产品技术含量和附加值，增强企业核心竞争力。',
                icon: 'fas fa-lightbulb'
              },
              {
                title: '优化公司治理',
                content: '建议完善内部控制制度，强化风险管理，提升公司治理水平，为企业长期稳健发展奠定基础。',
                icon: 'fas fa-balance-scale'
              }
            ]
          },
          {
            id: 2,
            title: '资产评估报告',
            icon: 'fas fa-balance-scale',
            sections: [
              {
                title: '资产评估概述',
                content: '本次评估采用资产基础法和收益法两种方法，最终选取收益法评估结果作为评估结论。评估基准日为2023年6月30日，企业整体资产评估价值为152.8亿元，较账面净资产增值率为28.4%。'
              },
              {
                title: '固定资产评估',
                content: '企业固定资产主要包括房屋建筑物、机器设备、运输设备和电子设备等。经评估，固定资产评估价值为38.6亿元，增值率为15.2%。增值原因主要是房产价格上涨和部分设备折旧年限与实际经济寿命不一致所致。'
              },
              {
                title: '无形资产评估',
                content: '企业无形资产主要包括土地使用权、专利技术、商标权和软件著作权等。经评估，无形资产评估价值为26.9亿元，增值率为42.8%。增值较大的原因主要是企业拥有的核心技术专利和品牌价值在账面价值中未得到充分体现。'
              },
              {
                title: '长期股权投资评估',
                content: '企业共有12家子公司的长期股权投资，经评估，长期股权投资评估价值为45.3亿元，增值率为22.6%。增值原因主要是部分子公司盈利能力较强，未来收益预期良好。'
              }
            ],
            recommendations: [
              {
                title: '优化资产结构',
                content: '建议对低效资产进行处置或改造，提高资产使用效率，优化资产结构，提升资产回报率。',
                icon: 'fas fa-chart-pie'
              },
              {
                title: '加强知识产权管理',
                content: '建议加强对专利、商标等知识产权的管理和保护，完善知识产权运营策略，充分发挥无形资产的价值。',
                icon: 'fas fa-copyright'
              },
              {
                title: '推进子公司整合',
                content: '建议对业务重叠或协同效应不明显的子公司进行整合或调整，优化集团管控模式，提高整体运营效率。',
                icon: 'fas fa-object-group'
              }
            ]
          },
          {
            id: 3,
            title: '企业评分报告',
            icon: 'fas fa-chart-line',
            sections: [
              {
                title: '评分模型说明',
                content: '本评分报告采用多维度、全方位的评分体系，包括财务表现、市场地位、管理能力、创新能力和社会责任五大维度，每个维度下设多个细分指标，满分100分。根据得分情况，将企业评级划分为AAA、AA、A、BBB、BB、B、CCC、CC、C九个等级。'
              },
              {
                title: '财务表现（得分：85分）',
                content: '企业财务状况良好，利润率、资产回报率和现金流量等指标均高于行业平均水平。资产负债结构合理，短期和长期偿债能力强。财务管理规范，信息披露及时、准确、完整。'
              },
              {
                title: '市场地位（得分：88分）',
                content: '企业在行业内处于领先地位，市场份额稳步提升。品牌知名度高，客户满意度和忠诚度强。产品竞争力突出，定价能力强，毛利率水平高于行业平均。'
              },
              {
                title: '管理能力（得分：82分）',
                content: '企业管理团队经验丰富，战略规划明确，执行力强。公司治理结构完善，内控体系健全。人力资源管理体系完善，员工满意度和稳定性高。'
              },
              {
                title: '创新能力（得分：78分）',
                content: '企业研发投入占比较高，拥有多项核心专利技术。产品创新能力强，新产品贡献率高。技术创新与商业模式创新并重，有较强的行业引领性。'
              },
              {
                title: '社会责任（得分：80分）',
                content: '企业环保达标率100%，积极推进节能减排和绿色制造。参与社会公益活动，履行企业社会责任。劳动关系和谐，员工权益保障完善。'
              },
              {
                title: '综合评分与评级',
                content: '企业综合评分为83分，对应信用评级为AA级。表明企业整体实力较强，经营稳健，抗风险能力强，发展前景良好。'
              }
            ],
            recommendations: [
              {
                title: '提升创新能力',
                content: '建议加大研发投入，完善创新激励机制，提高技术创新能力和新产品开发速度，增强企业核心竞争力。',
                icon: 'fas fa-rocket'
              },
              {
                title: '优化管理体系',
                content: '建议进一步完善企业管理体系，推进信息化和数字化转型，提高管理效率和决策水平。',
                icon: 'fas fa-cogs'
              },
              {
                title: '拓展国际市场',
                content: '建议积极拓展国际市场，优化全球资源配置，提高国际化经营水平，降低单一市场依赖风险。',
                icon: 'fas fa-globe'
              }
            ]
          },
          {
            id: 4,
            title: '风控预警报告',
            icon: 'fas fa-exclamation-circle',
            sections: [
              {
                title: '风险评估概述',
                content: '本报告基于企业经营数据、行业环境、政策变化等多维度信息，对企业面临的各类风险进行综合评估和预警。风险等级分为高、中、低三级，并提供针对性的风险管控建议。'
              },
              {
                title: '经营风险（等级：中）',
                content: '企业主营业务收入增速放缓，较上年同期下降5.2个百分点，毛利率有所下滑。主要原因是原材料价格上涨和行业竞争加剧。建议加强成本管控，优化产品结构，提高高毛利产品占比。'
              },
              {
                title: '财务风险（等级：低）',
                content: '企业整体财务状况稳健，偿债能力强，但应收账款周转率有所下降，较上年同期延长8天。建议加强应收账款管理，完善客户信用评估体系，防范坏账风险。'
              },
              {
                title: '市场风险（等级：中）',
                content: '行业竞争加剧，新进入者增多，市场份额面临挑战。部分区域市场饱和度高，增长空间有限。建议深耕优势区域，积极开拓新兴市场，加强品牌差异化建设。'
              },
              {
                title: '政策风险（等级：中）',
                content: '行业监管趋严，环保、安全、质量等标准提高，合规成本增加。相关税收优惠政策可能调整，影响企业盈利水平。建议密切关注政策变化，提前做好应对准备。'
              },
              {
                title: '运营风险（等级：低）',
                content: '企业供应链总体稳定，但个别关键原材料供应商集中度较高，存在供应风险。信息系统安全防护需要加强，防范网络安全风险。建议优化供应商结构，加强信息系统安全建设。'
              }
            ],
            recommendations: [
              {
                title: '构建全面风险管理体系',
                content: '建议建立健全全面风险管理体系，明确风险管理责任，完善风险识别、评估、应对和监控机制，提高风险管理的系统性和有效性。',
                icon: 'fas fa-shield-alt'
              },
              {
                title: '加强财务风险预警',
                content: '建议建立财务风险预警机制，定期开展财务风险排查，关注现金流、负债、应收账款等关键指标，防范财务风险。',
                icon: 'fas fa-chart-line'
              },
              {
                title: '完善业务连续性计划',
                content: '建议制定完善的业务连续性计划，做好重大风险事件的应急预案，提高企业应对突发事件的能力，确保业务持续稳定运行。',
                icon: 'fas fa-random'
              }
            ]
          }
        ];

        // 根据ID获取报告数据
        const reportData = reportTypes.find(r => r.id === parseInt(id)) || reportTypes[0];
        
        // 获取关联的企业
        const enterpriseId = this.$route.query.enterprise || Math.floor(Math.random() * 5) + 1;
        const enterprises = {
          1: {
            name: '腾讯科技（深圳）有限公司',
            region: '深圳',
            industry: '互联网'
          },
          2: {
            name: '华为技术有限公司',
            region: '深圳',
            industry: '通信设备制造'
          },
          3: {
            name: '比亚迪股份有限公司',
            region: '深圳',
            industry: '汽车制造'
          },
          4: {
            name: '广州恒大集团有限公司',
            region: '广州',
            industry: '房地产'
          },
          5: {
            name: '珠海格力电器股份有限公司',
            region: '珠海',
            industry: '家电制造'
          }
        };
        
        const enterprise = enterprises[enterpriseId] || {
          name: `大湾区企业${enterpriseId}`,
          region: ['广州', '深圳', '香港', '珠海'][Math.floor(Math.random() * 4)],
          industry: ['金融', '科技', '制造', '服务'][Math.floor(Math.random() * 4)]
        };
        
        this.report = {
          id: `GBA${10000 + parseInt(id)}`,
          title: reportData.title,
          icon: reportData.icon,
          generateDate: '2023-11-15',
          enterpriseName: enterprise.name,
          enterpriseRegion: enterprise.region,
          enterpriseIndustry: enterprise.industry,
          creditScore: 85 + Math.floor(Math.random() * 15),
          conclusion: '该企业整体经营状况良好，具有较高的资信水平和偿债能力。在市场表现、财务状况、合规性等方面均保持良好水平，但存在一定的经营风险，建议持续关注其现金流变化和市场环境影响。',
          sections: reportData.sections || [
            {
              title: '基本信息分析',
              content: '企业成立于2015年，位于广州市南沙区，主要从事科技产品研发与销售业务。近三年营业收入持续增长，年均增长率达15%，具有良好的发展潜力。公司员工规模稳定在200人左右，核心管理团队稳定。'
            },
            {
              title: '财务状况评估',
              content: '该企业财务状况总体健康，资产负债率为45%，处于行业平均水平。流动比率1.8，速动比率1.3，短期偿债能力良好。营业利润率为18%，净资产收益率为16%，盈利能力较强。'
            },
            {
              title: '经营风险分析',
              content: '企业经营风险总体可控，但需关注行业政策变化和市场竞争加剧带来的挑战。主要风险点包括：技术创新风险、客户集中度风险、资金周转风险。建议加强风险管理，拓展客户群体，优化资金使用效率。'
            }
          ],
          recommendations: reportData.recommendations || [
            {
              title: '优化客户结构',
              content: '建议企业积极拓展新客户群体，降低对大客户的依赖度，分散经营风险。',
              icon: 'fas fa-user-plus'
            },
            {
              title: '加强现金流管理',
              content: '提高应收账款管理效率，合理规划投资节奏，确保企业现金流健康。',
              icon: 'fas fa-money-bill-wave'
            },
            {
              title: '增强技术研发',
              content: '持续加大研发投入，保持技术领先性，提高产品附加值和市场竞争力。',
              icon: 'fas fa-lightbulb'
            }
          ]
        };
        
        this.loading = false;
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