<template>
  <div class="partner-detail-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <div v-else class="content">
      <div class="page-header">
        <router-link to="/" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回首页
        </router-link>
      </div>
      
      <div class="partner-header">
        <div class="partner-logo">
          <i :class="partner.icon"></i>
        </div>
        <div class="partner-info">
          <h1 class="partner-name">{{ partner.name }}</h1>
          <div class="partner-tags">
            <span class="tag">{{ partner.category }}</span>
            <span class="tag" v-if="partner.isVerified">已认证</span>
          </div>
        </div>
      </div>
      
      <div class="partner-grid">
        <div class="partner-card about">
          <h2 class="card-title">
            <i class="fas fa-building"></i> 机构简介
          </h2>
          <div class="card-content">
            <p class="description">{{ partner.description }}</p>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">成立时间</div>
                <div class="info-value">{{ partner.foundingDate }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">注册资本</div>
                <div class="info-value">{{ partner.registeredCapital }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">所在地区</div>
                <div class="info-value">{{ partner.location }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">员工规模</div>
                <div class="info-value">{{ partner.employeeCount }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="partner-card services">
          <h2 class="card-title">
            <i class="fas fa-hands-helping"></i> 服务内容
          </h2>
          <div class="card-content">
            <div class="service-list">
              <div class="service-item" v-for="(service, index) in partner.services" :key="index">
                <div class="service-icon">
                  <i :class="service.icon"></i>
                </div>
                <div class="service-content">
                  <div class="service-name">{{ service.name }}</div>
                  <div class="service-desc">{{ service.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="partner-card cooperation">
          <h2 class="card-title">
            <i class="fas fa-handshake"></i> 合作案例
          </h2>
          <div class="card-content">
            <div class="case-list" v-if="partner.cases.length > 0">
              <div class="case-item" v-for="(caseItem, index) in partner.cases" :key="index">
                <div class="case-header">
                  <div class="case-title">{{ caseItem.title }}</div>
                  <div class="case-date">{{ caseItem.date }}</div>
                </div>
                <div class="case-desc">{{ caseItem.description }}</div>
                <div class="case-result" v-if="caseItem.result">
                  <span class="result-label">成果：</span>
                  <span class="result-value">{{ caseItem.result }}</span>
                </div>
              </div>
            </div>
            <div class="empty-state" v-else>
              <i class="fas fa-inbox"></i>
              <p>暂无合作案例</p>
            </div>
          </div>
        </div>
        
        <div class="partner-card contact">
          <h2 class="card-title">
            <i class="fas fa-address-card"></i> 联系信息
          </h2>
          <div class="card-content">
            <div class="contact-list">
              <div class="contact-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ partner.address }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>{{ partner.phone }}</span>
              </div>
              <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>{{ partner.email }}</span>
              </div>
              <div class="contact-item" v-if="partner.website">
                <i class="fas fa-globe"></i>
                <span>{{ partner.website }}</span>
              </div>
            </div>
            <div class="map-placeholder">
              <i class="fas fa-map"></i>
              <span>地图位置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartnerDetail',
  data() {
    return {
      loading: true,
      partner: {
        id: '',
        name: '',
        icon: '',
        category: '',
        isVerified: false,
        description: '',
        foundingDate: '',
        registeredCapital: '',
        location: '',
        employeeCount: '',
        services: [],
        cases: [],
        address: '',
        phone: '',
        email: '',
        website: ''
      }
    }
  },
  created() {
    const partnerId = this.$route.params.id
    this.fetchPartnerDetail(partnerId)
  },
  methods: {
    fetchPartnerDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        // 真实合作伙伴数据
        const partners = [
          {
            id: 1,
            name: '中国银行大湾区金融研究院',
            icon: 'fas fa-university',
            category: '金融机构',
            isVerified: true,
            description: '中国银行大湾区金融研究院是中国银行设立的专注于粤港澳大湾区金融研究的专业机构，致力于为大湾区企业提供全方位的金融服务和咨询。研究院拥有一支高素质的研究团队，通过深入研究大湾区经济和金融发展趋势，为企业提供专业的金融解决方案和政策建议。',
            foundingDate: '2018年',
            registeredCapital: '2亿元',
            location: '广州',
            employeeCount: '150-200人',
            services: [
              {
                icon: 'fas fa-chart-line',
                name: '企业信用评估',
                description: '运用金融科技手段和大数据分析，为企业提供全面、客观的信用评估服务，帮助企业了解自身信用状况，提升融资能力。'
              },
              {
                icon: 'fas fa-money-bill-wave',
                name: '融资顾问服务',
                description: '基于企业具体情况，提供个性化的融资方案设计，对接银行、投资机构等多元化融资渠道，降低融资成本。'
              },
              {
                icon: 'fas fa-landmark',
                name: '跨境金融服务',
                description: '提供跨境贸易结算、跨境并购、跨境投融资等一站式跨境金融服务，助力企业国际化发展。'
              }
            ],
            cases: [
              {
                title: '某科技企业跨境并购融资项目',
                date: '2023年4月',
                description: '为深圳某科技企业提供跨境并购融资服务，协助其成功收购香港一家高科技企业，并设计了优化的融资方案。',
                result: '帮助企业获得5亿元银团贷款，降低融资成本1.2个百分点，成功完成收购。'
              },
              {
                title: '大湾区制造业信用体系建设项目',
                date: '2022年11月',
                description: '为大湾区制造业企业群体构建信用评价体系，建立专业评估模型，服务超过500家制造业企业。',
                result: '帮助参与企业整体融资成本降低15%，授信额度平均提升20%。'
              }
            ],
            address: '广州市天河区珠江新城冼村路11号中国银行大厦25楼',
            phone: '020-38905678',
            email: 'gbafin@bank-of-china.com',
            website: 'www.boc-gbafinance.cn'
          },
          {
            id: 2,
            name: '德勤华南区企业风险服务中心',
            icon: 'fas fa-shield-alt',
            category: '咨询机构',
            isVerified: true,
            description: '德勤华南区企业风险服务中心是德勤在大湾区设立的专业风险管理咨询服务机构，致力于为大湾区企业提供全面的风险咨询、内部控制、企业治理和合规管理等服务。中心拥有一支由行业专家、风险管理专家和前监管人员组成的专业团队，能够为不同行业的企业提供量身定制的风险解决方案。',
            foundingDate: '2015年',
            registeredCapital: '不适用',
            location: '深圳',
            employeeCount: '200-300人',
            services: [
              {
                icon: 'fas fa-exclamation-triangle',
                name: '企业风险评估',
                description: '基于行业领先的风险评估方法论，全面识别和评估企业面临的战略风险、运营风险、财务风险和合规风险，提供系统性风险管理建议。'
              },
              {
                icon: 'fas fa-sitemap',
                name: '企业治理优化',
                description: '评估企业现有治理结构，提供公司治理优化方案，完善董事会运作机制，提升企业治理水平和管理效率。'
              },
              {
                icon: 'fas fa-file-contract',
                name: '合规管理服务',
                description: '协助企业建立健全合规管理体系，识别合规风险点，制定合规管理策略，降低法律和监管风险。'
              }
            ],
            cases: [
              {
                title: '某上市公司全面风险管理体系构建项目',
                date: '2023年2月',
                description: '为深圳某上市科技公司设计并实施全面风险管理体系，包括风险识别、评估、应对和监控的完整流程，建立风险管理组织架构和制度体系。',
                result: '帮助企业建立了符合国际标准的风险管理体系，有效识别和应对了多项重大风险，保障了企业稳健运营。'
              },
              {
                title: '金融科技企业合规体系建设项目',
                date: '2022年9月',
                description: '为广州某金融科技企业提供合规管理咨询服务，结合国内外金融科技监管要求，建立健全合规管理体系。',
                result: '帮助企业顺利通过监管合规检查，避免了潜在的合规风险和处罚。'
              }
            ],
            address: '深圳市福田区福华一路6号免税商务大厦20层',
            phone: '0755-82463100',
            email: 'gbarisk@deloitte.com',
            website: 'www.deloitte.com/cn/gba'
          },
          {
            id: 3,
            name: '香港贸发局大湾区服务中心',
            icon: 'fas fa-globe-asia',
            category: '服务机构',
            isVerified: true,
            description: '香港贸发局大湾区服务中心致力于促进香港与大湾区其他城市的经贸合作，为大湾区企业提供市场信息、商业配对、展览推广和政策咨询等专业服务。中心拥有庞大的全球商业网络和丰富的国际市场经验，能够帮助大湾区企业拓展海外市场，提升国际竞争力。',
            foundingDate: '2019年',
            registeredCapital: '政府支持机构',
            location: '香港',
            employeeCount: '100-150人',
            services: [
              {
                icon: 'fas fa-handshake',
                name: '商业配对服务',
                description: '根据企业需求，精准匹配全球合作伙伴，促成商业合作，帮助企业拓展国际市场和寻找投资机会。'
              },
              {
                icon: 'fas fa-search-dollar',
                name: '市场信息咨询',
                description: '提供全球主要市场的经济数据、行业研究报告和市场趋势分析，帮助企业制定有针对性的市场开拓策略。'
              },
              {
                icon: 'fas fa-certificate',
                name: '国际认证辅导',
                description: '协助企业了解和获取国际市场准入所需的各类认证，提供认证标准咨询和认证申请辅导服务。'
              }
            ],
            cases: [
              {
                title: '大湾区企业"走出去"系列活动',
                date: '2023年5月',
                description: '组织大湾区企业参加多个国际展览会和商贸考察团，涵盖东南亚、欧洲和中东等重点市场，为企业提供展示产品和寻找合作伙伴的平台。',
                result: '帮助超过200家大湾区企业达成合作意向，签订贸易合同总额超过10亿美元。'
              },
              {
                title: '大湾区-东盟经贸合作论坛',
                date: '2022年12月',
                description: '在香港举办大湾区-东盟经贸合作论坛，邀请东盟各国商会和政府代表，与大湾区企业进行深入交流和商业配对。',
                result: '促成50多个合作项目，总投资额超过5亿美元，建立了大湾区与东盟的长期合作机制。'
              }
            ],
            address: '香港湾仔博览道1号香港会展中心办公大楼38楼',
            phone: '852-18428',
            email: 'gbaservice@hktdc.org',
            website: 'www.hktdc.com/gba'
          },
          {
            id: 4,
            name: '粤港澳大湾区数字经济研究院',
            icon: 'fas fa-laptop-code',
            category: '技术服务商',
            isVerified: true,
            description: '粤港澳大湾区数字经济研究院是由政府支持、行业共建的专业研究机构，致力于推动大湾区数字经济发展和数字化转型。研究院汇聚了一批数字技术和产业研究专家，为企业提供数字化转型咨询、数据价值评估、数字技术应用等专业服务，助力大湾区数字经济高质量发展。',
            foundingDate: '2020年',
            registeredCapital: '3亿元',
            location: '广州',
            employeeCount: '120-180人',
            services: [
              {
                icon: 'fas fa-digital-tachograph',
                name: '数字化转型咨询',
                description: '基于企业实际情况，设计个性化数字化转型路径和实施方案，帮助企业实现数字化升级和智能化运营。'
              },
              {
                icon: 'fas fa-database',
                name: '数据资产评估',
                description: '运用专业评估方法，对企业数据资产进行全面盘点和价值评估，发掘数据潜在价值，提供数据治理和应用建议。'
              },
              {
                icon: 'fas fa-brain',
                name: '人工智能应用',
                description: '提供AI技术应用咨询和解决方案，帮助企业在生产、营销、服务等环节引入AI技术，提升效率和创新能力。'
              }
            ],
            cases: [
              {
                title: '传统制造企业数字化转型项目',
                date: '2023年1月',
                description: '为东莞某传统制造企业设计并实施数字化转型方案，引入工业互联网、物联网和大数据技术，建设智能工厂。',
                result: '帮助企业生产效率提升30%，能源消耗降低20%，产品不良率降低15%，成功实现传统制造向智能制造的转型。'
              },
              {
                title: '零售行业数据价值挖掘项目',
                date: '2022年8月',
                description: '为香港某大型零售集团提供数据价值挖掘服务，构建客户画像和消费行为分析模型，挖掘数据商业价值。',
                result: '帮助企业精准营销效果提升40%，客户留存率提高15%，实现数据驱动的经营决策。'
              }
            ],
            address: '广州市黄埔区科学城科学大道181号',
            phone: '020-82356789',
            email: 'info@gbadei.org',
            website: 'www.gbadei.org'
          },
          {
            id: 5,
            name: '大湾区知识产权保护联盟',
            icon: 'fas fa-copyright',
            category: '评估机构',
            isVerified: true,
            description: '大湾区知识产权保护联盟是由大湾区各地知识产权局、专业机构和企业共同发起成立的非营利性组织，致力于为大湾区企业提供知识产权保护、评估、运营和交易等专业服务。联盟拥有一支由知识产权律师、专利代理人和评估专家组成的专业团队，为企业知识产权保驾护航。',
            foundingDate: '2017年',
            registeredCapital: '非营利组织',
            location: '深圳',
            employeeCount: '50-80人',
            services: [
              {
                icon: 'fas fa-balance-scale',
                name: '知识产权评估',
                description: '运用国际通用的知识产权评估方法，对企业专利、商标、版权等知识产权进行全面评估，确定其市场价值和商业潜力。'
              },
              {
                icon: 'fas fa-gavel',
                name: '知识产权保护',
                description: '提供知识产权侵权监测、维权援助和纠纷调解等服务，帮助企业构建完善的知识产权保护体系。'
              },
              {
                icon: 'fas fa-exchange-alt',
                name: '知识产权交易',
                description: '运营知识产权交易平台，提供专利转让、许可、质押等交易服务，促进知识产权的市场化流通和价值变现。'
              }
            ],
            cases: [
              {
                title: '高科技企业专利组合评估项目',
                date: '2023年3月',
                description: '为珠海某高科技企业提供专利组合评估服务，对其200余项专利进行全面评估，发掘高价值专利，制定专利运营策略。',
                result: '帮助企业识别30项核心专利，成功实现专利许可，获得许可收入2000万元。'
              },
              {
                title: '跨境知识产权保护行动',
                date: '2022年10月',
                description: '组织开展跨境知识产权保护行动，针对侵犯大湾区企业知识产权的跨境侵权行为，提供联合维权服务。',
                result: '成功处理50余起跨境侵权案件，挽回经济损失超过1亿元，有效保护了企业知识产权。'
              }
            ],
            address: '深圳市南山区高新南九道10号深圳湾科技生态园10栋A座18楼',
            phone: '0755-86123456',
            email: 'service@gbaip.org',
            website: 'www.gbaip.org'
          }
        ];

        // 根据ID获取合作伙伴数据
        const partner = partners.find(p => p.id === parseInt(id)) || {
          id: id,
          name: `大湾区合作机构${id}`,
          icon: 'fas fa-university',
          category: ['金融机构', '评估机构', '技术服务商', '咨询机构'][Math.floor(Math.random() * 4)],
          isVerified: true,
          description: '作为大湾区领先的企业服务提供商，我们致力于为企业提供全方位、专业化的信息服务和解决方案。凭借多年的行业经验和专业团队，我们深入了解企业面临的挑战和需求，提供定制化的服务，帮助企业实现可持续发展。',
          foundingDate: '2015年',
          registeredCapital: '5000万元',
          location: ['广州', '深圳', '香港', '珠海'][Math.floor(Math.random() * 4)],
          employeeCount: '200-500人',
          services: [
            {
              icon: 'fas fa-chart-line',
              name: '企业信用评估',
              description: '通过多维度数据分析，提供全面的企业信用评估报告，帮助企业了解自身信用状况。'
            },
            {
              icon: 'fas fa-balance-scale',
              name: '资产评估服务',
              description: '专业的资产评估团队，提供准确、客观的企业资产价值评估，支持企业重大决策。'
            },
            {
              icon: 'fas fa-shield-alt',
              name: '风险管理咨询',
              description: '识别企业经营风险，提供有效的风险管理策略，降低企业经营风险。'
            }
          ],
          cases: [
            {
              title: '某大型制造企业信用评估项目',
              date: '2023年6月',
              description: '为大湾区某知名制造企业提供全面的信用评估服务，包括财务状况分析、经营风险评估和行业竞争力分析。',
              result: '帮助企业取得银行授信1亿元，顺利完成产能扩张计划。'
            },
            {
              title: '科技创新企业资产评估案例',
              date: '2023年3月',
              description: '为一家高新技术企业提供专业的资产评估服务，包括知识产权、固定资产和无形资产的全面评估。',
              result: '成功帮助企业获得2轮融资，估值提升30%。'
            }
          ],
          address: '广州市天河区珠江新城冼村路5号凯华国际中心2301室',
          phone: '020-12345678',
          email: 'contact@gbapartner.com',
          website: 'www.gbapartner.com'
        };
        
        this.partner = partner;
        this.loading = false;
      }, 200);
    }
  }
}
</script>

<style scoped>
.partner-detail-container {
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
  width: max-content;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-5px);
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.partner-logo {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
}

.partner-info {
  flex: 1;
}

.partner-name {
  font-size: 28px;
  margin: 0 0 10px 0;
  color: #e6edf3;
  background: linear-gradient(135deg, #fff 0%, #c9d1d9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.partner-tags {
  display: flex;
  gap: 10px;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.partner-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.partner-card {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.about, .contact {
  grid-column: span 1;
}

.services, .cooperation {
  grid-column: span 1;
}

.card-title {
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #e6edf3;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 10px;
}

.card-title i {
  color: #5EFCE8;
}

.description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.info-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
}

.info-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 5px;
}

.info-value {
  color: #e6edf3;
  font-size: 14px;
}

.service-list {
  display: grid;
  gap: 15px;
}

.service-item {
  display: flex;
  gap: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
}

.service-icon {
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

.service-content {
  flex: 1;
}

.service-name {
  font-weight: bold;
  color: #e6edf3;
  margin-bottom: 5px;
}

.service-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.case-list {
  display: grid;
  gap: 15px;
}

.case-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px;
}

.case-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.case-title {
  font-weight: bold;
  color: #e6edf3;
}

.case-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.case-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
  margin-bottom: 10px;
}

.case-result {
  font-size: 14px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.result-label {
  color: rgba(255, 255, 255, 0.6);
}

.result-value {
  color: #5EFCE8;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 150px;
  color: rgba(255, 255, 255, 0.5);
}

.empty-state i {
  font-size: 30px;
}

.contact-list {
  display: grid;
  gap: 15px;
  margin-bottom: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);
}

.contact-item i {
  color: #5EFCE8;
  width: 20px;
  text-align: center;
}

.map-placeholder {
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

.map-placeholder i {
  font-size: 30px;
}

@media (max-width: 768px) {
  .partner-grid {
    grid-template-columns: 1fr;
  }
  
  .about, .services, .cooperation, .contact {
    grid-column: span 1;
  }
  
  .partner-header {
    flex-direction: column;
    text-align: center;
  }
  
  .partner-logo {
    margin: 0 auto;
  }
  
  .partner-tags {
    justify-content: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style> 