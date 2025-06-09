<template>
  <div class="partner-detail-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>
    
    <div v-else class="content">
      <div class="page-header animate-slide-down">
        <router-link to="/" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回首页
        </router-link>
      </div>

      <div class="partner-header animate-fade-in">
        <div class="partner-logo animate-scale-in">
          <i :class="partner.icon"></i>
        </div>
        <div class="partner-info animate-slide-right">
          <h1 class="partner-name">{{ partner.name }}</h1>
          <div class="partner-tags">
            <span class="tag animate-bounce-in" style="animation-delay: 0.3s">{{ partner.category }}</span>
            <span class="tag animate-bounce-in" v-if="partner.isVerified" style="animation-delay: 0.4s">已认证</span>
          </div>
        </div>
      </div>

      <div class="partner-grid">
        <div class="partner-card about animate-slide-up" style="animation-delay: 0.2s">
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
        
        <div class="partner-card services animate-slide-up" style="animation-delay: 0.3s">
          <h2 class="card-title">
            <i class="fas fa-hands-helping"></i> 服务内容
          </h2>
          <div class="card-content">
            <div class="service-list">
              <div class="service-item animate-fade-in" v-for="(service, index) in partner.services" :key="index" :style="`animation-delay: ${0.5 + index * 0.1}s`">
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

        <div class="partner-card cooperation animate-slide-up" style="animation-delay: 0.4s">
          <h2 class="card-title">
            <i class="fas fa-handshake"></i> 合作案例
          </h2>
          <div class="card-content">
            <div class="case-list" v-if="partner.cases.length > 0">
              <div class="case-item animate-fade-in" v-for="(caseItem, index) in partner.cases" :key="index" :style="`animation-delay: ${0.6 + index * 0.1}s`">
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

        <div class="partner-card contact animate-slide-up" style="animation-delay: 0.5s">
          <h2 class="card-title">
            <i class="fas fa-address-card"></i> 联系信息
          </h2>
          <div class="card-content">
            <div class="contact-list">
              <div class="contact-item animate-slide-right" style="animation-delay: 0.7s">
                <i class="fas fa-map-marker-alt"></i>
                <span>{{ partner.address }}</span>
              </div>
              <div class="contact-item animate-slide-right" style="animation-delay: 0.8s">
                <i class="fas fa-phone"></i>
                <span>{{ partner.phone }}</span>
              </div>
              <div class="contact-item animate-slide-right" style="animation-delay: 0.9s">
                <i class="fas fa-envelope"></i>
                <span>{{ partner.email }}</span>
              </div>
              <div class="contact-item animate-slide-right" v-if="partner.website" style="animation-delay: 1.0s">
                <i class="fas fa-globe"></i>
                <span>{{ partner.website }}</span>
              </div>
            </div>
            <div class="map-placeholder animate-fade-in" style="animation-delay: 1.1s">
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
    getServicesForCategory(category) {
      const serviceMap = {
        '征信公司': [
          {
            icon: 'fas fa-chart-line',
            name: '信用评估服务',
            description: '提供个人和企业信用评估，建立完善的信用档案和评分体系。'
          },
          {
            icon: 'fas fa-shield-alt',
            name: '风险监控服务',
            description: '实时监控信用风险变化，提供预警和风险管理建议。'
          },
          {
            icon: 'fas fa-database',
            name: '征信数据服务',
            description: '提供全面的征信数据查询和分析服务，支持金融决策。'
          }
        ],
        '银行': [
          {
            icon: 'fas fa-money-bill-wave',
            name: '信贷服务',
            description: '提供个人和企业贷款服务，包括抵押贷款、信用贷款等多种产品。'
          },
          {
            icon: 'fas fa-credit-card',
            name: '支付结算',
            description: '提供便捷的支付结算服务，支持跨境汇款和贸易融资。'
          },
          {
            icon: 'fas fa-piggy-bank',
            name: '财富管理',
            description: '为客户提供专业的财富管理和投资理财服务。'
          }
        ],
        '保险公司': [
          {
            icon: 'fas fa-umbrella',
            name: '保险产品',
            description: '提供人寿保险、财产保险、健康保险等全方位保险产品。'
          },
          {
            icon: 'fas fa-heart',
            name: '理赔服务',
            description: '快速、专业的理赔服务，保障客户权益。'
          },
          {
            icon: 'fas fa-user-shield',
            name: '风险评估',
            description: '专业的风险评估和保险方案设计服务。'
          }
        ],
        '互联网金融': [
          {
            icon: 'fas fa-mobile-alt',
            name: '移动支付',
            description: '提供便捷的移动支付解决方案，支持多种支付场景。'
          },
          {
            icon: 'fas fa-chart-bar',
            name: '金融科技',
            description: '运用大数据、AI等技术提供智能化金融服务。'
          },
          {
            icon: 'fas fa-wallet',
            name: '数字钱包',
            description: '安全便捷的数字钱包服务，支持多种数字资产管理。'
          }
        ]
      };

      return serviceMap[category] || [
        {
          icon: 'fas fa-chart-line',
          name: '专业咨询',
          description: '提供专业的行业咨询和解决方案服务。'
        },
        {
          icon: 'fas fa-handshake',
          name: '合作服务',
          description: '建立长期合作关系，共同推进业务发展。'
        },
        {
          icon: 'fas fa-cogs',
          name: '技术支持',
          description: '提供专业的技术支持和系统集成服务。'
        }
      ];
    },
    getCasesForCategory(category) {
      const caseMap = {
        '征信公司': [
          {
            title: '大湾区银行风控系统升级项目',
            date: '2023年8月',
            description: '为大湾区某大型银行提供征信数据服务，升级其风控系统，提升信贷审批效率。',
            result: '帮助银行信贷审批效率提升50%，不良贷款率降低0.5个百分点。'
          },
          {
            title: '跨境电商征信服务项目',
            date: '2023年5月',
            description: '为跨境电商平台提供商户征信服务，建立完善的商户信用评级体系。',
            result: '平台交易纠纷率降低40%，商户满意度提升35%。'
          }
        ],
        '银行': [
          {
            title: '大湾区中小企业融资服务项目',
            date: '2023年9月',
            description: '推出专门针对大湾区中小企业的融资产品，简化审批流程，降低融资门槛。',
            result: '累计为500+中小企业提供融资支持，总额超过50亿元。'
          },
          {
            title: '跨境贸易金融服务创新',
            date: '2023年6月',
            description: '创新跨境贸易金融产品，为大湾区企业提供便捷的跨境结算和融资服务。',
            result: '跨境贸易融资业务量增长80%，客户满意度达到95%。'
          }
        ],
        '保险公司': [
          {
            title: '大湾区企业综合保险方案',
            date: '2023年7月',
            description: '为大湾区制造业企业设计综合保险方案，涵盖财产险、责任险、货运险等。',
            result: '为300+企业提供保险保障，理赔效率提升60%。'
          },
          {
            title: '跨境保险服务创新项目',
            date: '2023年4月',
            description: '推出跨境保险产品，为大湾区居民和企业提供跨境保险保障。',
            result: '跨境保险业务增长120%，服务覆盖三地居民。'
          }
        ],
        '互联网金融': [
          {
            title: '数字化支付解决方案',
            date: '2023年10月',
            description: '为大湾区商户提供一体化数字支付解决方案，支持多种支付方式。',
            result: '服务商户数量增长200%，交易成功率达到99.9%。'
          },
          {
            title: 'AI智能投顾服务',
            date: '2023年6月',
            description: '推出AI智能投顾服务，为用户提供个性化的投资建议和资产配置方案。',
            result: '用户投资收益率平均提升15%，服务用户超过10万人。'
          }
        ]
      };

      return caseMap[category] || [
        {
          title: '大湾区企业服务创新项目',
          date: '2023年6月',
          description: '为大湾区企业提供创新服务解决方案，提升企业运营效率和竞争力。',
          result: '帮助企业运营效率提升30%，客户满意度达到90%以上。'
        },
        {
          title: '数字化转型咨询项目',
          date: '2023年3月',
          description: '为传统企业提供数字化转型咨询服务，助力企业实现数字化升级。',
          result: '成功帮助企业完成数字化转型，业务效率提升40%。'
        }
      ];
    },
    getAddressForCategory(category) {
      const addresses = {
        '征信公司': ['深圳市福田区深南大道1006号国际创新中心', '广州市天河区珠江新城冼村路11号', '香港中环国际金融中心'],
        '银行': ['深圳市福田区深南大道5047号', '广州市越秀区东风东路713号', '香港中环皇后大道中1号'],
        '保险公司': ['深圳市南山区深南大道9678号', '广州市天河区体育西路191号', '香港湾仔告士打道108号'],
        '互联网金融': ['深圳市南山区科技园南区', '广州市天河区天河北路233号', '香港数码港道100号']
      };
      const categoryAddresses = addresses[category] || ['广州市天河区珠江新城冼村路5号凯华国际中心'];
      return categoryAddresses[Math.floor(Math.random() * categoryAddresses.length)] + `${Math.floor(Math.random() * 30) + 10}楼`;
    },
    getPhoneForCategory(category) {
      const areaCodes = {
        '征信公司': ['0755', '020', '852'],
        '银行': ['0755', '020', '852'],
        '保险公司': ['0755', '020', '852'],
        '互联网金融': ['0755', '020', '400']
      };
      const codes = areaCodes[category] || ['020'];
      const areaCode = codes[Math.floor(Math.random() * codes.length)];
      const number = Math.floor(Math.random() * 90000000) + 10000000;
      return `${areaCode}-${number.toString().substring(0, 8)}`;
    },
    getEmailForPartner(name) {
      const domain = name.includes('银行') ? 'bank.com' :
                   name.includes('保险') ? 'insurance.com' :
                   name.includes('征信') ? 'credit.com' :
                   name.includes('金融') ? 'fintech.com' : 'partner.com';
      return `service@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${domain}`;
    },
    getWebsiteForPartner(name) {
      return `www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
    },
    fetchPartnerDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        // 真实合作伙伴数据 - 对应PartnerLogos.vue中的所有机构
        const partners = [
          // 征信公司
          {
            id: 1,
            name: '环联征信有限公司',
            icon: 'fas fa-shield-alt',
            category: '征信公司',
            isVerified: true,
            description: '环联征信有限公司是中国领先的征信服务提供商，致力于为金融机构和企业提供全面的信用信息服务。公司拥有丰富的数据资源和先进的技术平台，通过大数据分析和人工智能技术，为客户提供精准的信用评估和风险管理解决方案。',
            foundingDate: '2013年',
            registeredCapital: '5亿元',
            location: '深圳',
            employeeCount: '500-1000人',
            services: [
              {
                icon: 'fas fa-chart-line',
                name: '个人征信服务',
                description: '为金融机构提供全面的个人信用报告和评分服务，涵盖信贷记录、还款历史、信用行为等多维度信息。'
              },
              {
                icon: 'fas fa-building',
                name: '企业征信服务',
                description: '提供企业信用报告、风险评估和监控服务，帮助金融机构和合作伙伴做出明智的商业决策。'
              },
              {
                icon: 'fas fa-shield-alt',
                name: '反欺诈服务',
                description: '运用先进的机器学习算法和大数据分析技术，提供实时的反欺诈检测和风险预警服务。'
              }
            ],
            cases: [
              {
                title: '大湾区银行个人信贷风控项目',
                date: '2023年6月',
                description: '为大湾区某大型银行提供个人信贷风控服务，建立完善的信用评估模型，有效降低不良贷款率。',
                result: '帮助银行个人信贷不良率降低0.8个百分点，信贷审批效率提升40%。'
              },
              {
                title: '跨境电商企业征信服务项目',
                date: '2023年3月',
                description: '为香港某跨境电商平台提供商户征信服务，建立商户信用评级体系，降低平台交易风险。',
                result: '平台交易纠纷率降低30%，商户满意度提升25%，交易额增长15%。'
              }
            ],
            address: '深圳市福田区深南大道1006号国际创新中心A座20楼',
            phone: '0755-83216789',
            email: 'service@transunion.cn',
            website: 'www.transunion.cn'
          },
          {
            id: 2,
            name: '深圳百行征信服务有限公司',
            icon: 'fas fa-building',
            category: '征信公司',
            isVerified: true,
            description: '深圳百行征信服务有限公司是中国首家市场化个人征信机构，由中国互联网金融协会与芝麻信用、腾讯征信等8家机构共同发起设立。公司致力于建设覆盖全社会的征信系统，为传统金融和新金融业态提供全面的征信服务，促进普惠金融发展。',
            foundingDate: '2018年',
            registeredCapital: '10亿元',
            location: '深圳',
            employeeCount: '300-500人',
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

        // 合作伙伴基础信息映射（对应PartnerLogos.vue中的数据）
        const partnerMapping = {
          // 征信公司
          1: { name: '环联征信有限公司', icon: 'fas fa-shield-alt', category: '征信公司' },
          2: { name: '深圳百行征信服务有限公司', icon: 'fas fa-building', category: '征信公司' },
          3: { name: '广东德信行信用管理有限公司', icon: 'fas fa-check-circle', category: '征信公司' },
          4: { name: '广东鹏元征信有限公司', icon: 'fas fa-award', category: '征信公司' },
          5: { name: '诺华诚信（Nova Credit）', icon: 'fas fa-star', category: '征信公司' },
          6: { name: '邓白氏（Dun & Bradstreet, D&B）', icon: 'fas fa-globe', category: '征信公司' },
          7: { name: '澳门金融管理局（AMCM）信贷数据库', icon: 'fas fa-landmark', category: '征信公司' },
          8: { name: '澳门银行公会（ABM）信贷信息共享系统', icon: 'fas fa-university', category: '征信公司' },
          // 银行
          9: { name: '中国工商银行', icon: 'fas fa-landmark', category: '银行' },
          10: { name: '中国农业银行', icon: 'fas fa-piggy-bank', category: '银行' },
          11: { name: '汇丰银行', icon: 'fas fa-university', category: '银行' },
          12: { name: '恒生银行', icon: 'fas fa-building', category: '银行' },
          13: { name: '渣打银行', icon: 'fas fa-coins', category: '银行' },
          // 保险公司
          14: { name: '中国人保（PICC）', icon: 'fas fa-shield-alt', category: '保险公司' },
          15: { name: '中国太保（CPIC）', icon: 'fas fa-umbrella', category: '保险公司' },
          16: { name: '友邦保险（AIA）', icon: 'fas fa-heart', category: '保险公司' },
          17: { name: '安盛保险（AXA）', icon: 'fas fa-shield-alt', category: '保险公司' },
          18: { name: '澳门人寿（Macau Life）', icon: 'fas fa-user-shield', category: '保险公司' },
          19: { name: '太平保险（澳门）（Taiping Macau）', icon: 'fas fa-life-ring', category: '保险公司' },
          // 互联网金融
          20: { name: '平安健康保险', icon: 'fas fa-heartbeat', category: '互联网金融' },
          21: { name: '富途证券', icon: 'fas fa-chart-line', category: '互联网金融' },
          22: { name: '同花顺', icon: 'fas fa-chart-bar', category: '互联网金融' },
          23: { name: '财付通', icon: 'fas fa-wallet', category: '互联网金融' },
          24: { name: '腾讯金融科技', icon: 'fas fa-money-bill-wave', category: '互联网金融' },
          25: { name: '度小满金融', icon: 'fas fa-hand-holding-usd', category: '互联网金融' }
        };

        // 根据ID获取合作伙伴数据
        const baseInfo = partnerMapping[parseInt(id)];
        const partner = partners.find(p => p.id === parseInt(id)) || {
          id: id,
          name: baseInfo?.name || `大湾区合作机构${id}`,
          icon: baseInfo?.icon || 'fas fa-university',
          category: baseInfo?.category || '金融服务',
          isVerified: true,
          description: `${baseInfo?.name || '本机构'}是大湾区领先的${baseInfo?.category || '金融服务'}提供商，致力于为企业和个人提供全方位、专业化的服务和解决方案。凭借多年的行业经验和专业团队，我们深入了解客户面临的挑战和需求，提供定制化的服务，帮助客户实现可持续发展。`,
          foundingDate: '2015年',
          registeredCapital: '5000万元',
          location: ['广州', '深圳', '香港', '澳门'][Math.floor(Math.random() * 4)],
          employeeCount: '200-500人',
          services: this.getServicesForCategory(baseInfo?.category || '金融服务'),
          cases: this.getCasesForCategory(baseInfo?.category || '金融服务'),
          address: this.getAddressForCategory(baseInfo?.category || '金融服务'),
          phone: this.getPhoneForCategory(baseInfo?.category || '金融服务'),
          email: this.getEmailForPartner(baseInfo?.name || '合作机构'),
          website: this.getWebsiteForPartner(baseInfo?.name || '合作机构')
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

/* 动画样式 */
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-down {
  opacity: 0;
  transform: translateY(-30px);
  animation: slideDown 0.6s ease-out forwards;
}

.animate-slide-up {
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.8s ease-out forwards;
}

.animate-slide-right {
  opacity: 0;
  transform: translateX(-30px);
  animation: slideRight 0.6s ease-out forwards;
}

.animate-scale-in {
  opacity: 0;
  transform: scale(0.8);
  animation: scaleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.animate-bounce-in {
  opacity: 0;
  transform: scale(0.3);
  animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

/* 动画关键帧 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

/* 页面整体进入动画 */
.content {
  animation: pageEnter 0.5s ease-out;
}

@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 增强现有元素的动画效果 */
.partner-logo {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.partner-logo:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 15px 35px rgba(94, 252, 232, 0.3);
}

.service-item {
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateY(-2px);
  background: rgba(0, 0, 0, 0.3);
}

.case-item {
  transition: all 0.3s ease;
}

.case-item:hover {
  transform: translateY(-2px);
  background: rgba(0, 0, 0, 0.3);
}

.contact-item {
  transition: all 0.3s ease;
}

.contact-item:hover {
  transform: translateX(5px);
  color: rgba(94, 252, 232, 0.9);
}

.back-btn {
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateX(-8px) scale(1.05);
  box-shadow: 0 8px 25px rgba(94, 252, 232, 0.2);
}
</style>