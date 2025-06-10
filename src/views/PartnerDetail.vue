<template>
  <div class="partner-detail-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>加載中...</p>
    </div>
    
    <div v-else class="content">
      <div class="page-header animate-slide-down">
        <router-link to="/" class="back-btn">
          <i class="fas fa-arrow-left"></i> 返回首頁
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
            <span class="tag animate-bounce-in" v-if="partner.isVerified" style="animation-delay: 0.4s">已認證</span>
          </div>
        </div>
      </div>

      <div class="partner-grid">
        <div class="partner-card about animate-slide-up" style="animation-delay: 0.2s">
          <h2 class="card-title">
            <i class="fas fa-building"></i> 機構简介
          </h2>
          <div class="card-content">
            <p class="description">{{ partner.description }}</p>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">成立時間</div>
                <div class="info-value">{{ partner.foundingDate }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">注册資本</div>
                <div class="info-value">{{ partner.registeredCapital }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">所在地區</div>
                <div class="info-value">{{ partner.location }}</div>
              </div>
              <div class="info-item">
                <div class="info-label">员工規模</div>
                <div class="info-value">{{ partner.employeeCount }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="partner-card services animate-slide-up" style="animation-delay: 0.3s">
          <h2 class="card-title">
            <i class="fas fa-hands-helping"></i> 服務内容
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
              <p>暂無合作案例</p>
            </div>
          </div>
        </div>

        <div class="partner-card contact animate-slide-up" style="animation-delay: 0.5s">
          <h2 class="card-title">
            <i class="fas fa-address-card"></i> 聯系信息
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
        '徵信公司': [
          {
            icon: 'fas fa-chart-line',
            name: '信用評估服務',
            description: '提供個人和企業信用評估，建立完善的信用档案和評分体系。'
          },
          {
            icon: 'fas fa-shield-alt',
            name: '風險監控服務',
            description: '實時監控信用風險变化，提供预警和風險管理建议。'
          },
          {
            icon: 'fas fa-database',
            name: '徵信數據服務',
            description: '提供全面的徵信數據查詢和分析服務，支持金融決策。'
          }
        ],
        '銀行': [
          {
            icon: 'fas fa-money-bill-wave',
            name: '信贷服務',
            description: '提供個人和企業贷款服務，包括抵押贷款、信用贷款等多种產品。'
          },
          {
            icon: 'fas fa-credit-card',
            name: '支付结算',
            description: '提供便捷的支付结算服務，支持跨境汇款和贸易融資。'
          },
          {
            icon: 'fas fa-piggy-bank',
            name: '財富管理',
            description: '為客户提供專業的財富管理和投資理財服務。'
          }
        ],
        '保險公司': [
          {
            icon: 'fas fa-umbrella',
            name: '保險產品',
            description: '提供人寿保險、財產保險、健康保險等全方位保險產品。'
          },
          {
            icon: 'fas fa-heart',
            name: '理赔服務',
            description: '快速、專業的理赔服務，保障客户权益。'
          },
          {
            icon: 'fas fa-user-shield',
            name: '風險評估',
            description: '專業的風險評估和保險方案设計服務。'
          }
        ],
        '互聯網金融': [
          {
            icon: 'fas fa-mobile-alt',
            name: '移動支付',
            description: '提供便捷的移動支付解決方案，支持多种支付场景。'
          },
          {
            icon: 'fas fa-chart-bar',
            name: '金融科技',
            description: '运用大數據、AI等技术提供智能化金融服務。'
          },
          {
            icon: 'fas fa-wallet',
            name: '數字錢包',
            description: '安全便捷的數字錢包服務，支持多种數字資產管理。'
          }
        ]
      };

      return serviceMap[category] || [
        {
          icon: 'fas fa-chart-line',
          name: '專業咨詢',
          description: '提供專業的行業咨詢和解決方案服務。'
        },
        {
          icon: 'fas fa-handshake',
          name: '合作服務',
          description: '建立長期合作關系，共同推進業務發展。'
        },
        {
          icon: 'fas fa-cogs',
          name: '技术支持',
          description: '提供專業的技术支持和系統集成服務。'
        }
      ];
    },
    getCasesForCategory(category) {
      const caseMap = {
        '徵信公司': [
          {
            title: '大灣區銀行風控系統升級项目',
            date: '2023年8月',
            description: '為大灣區某大型銀行提供徵信數據服務，升級其風控系統，提升信贷审批效率。',
            result: '帮助銀行信贷审批效率提升50%，不良贷款率降低0.5個百分點。'
          },
          {
            title: '跨境電商徵信服務项目',
            date: '2023年5月',
            description: '為跨境電商平臺提供商户徵信服務，建立完善的商户信用評級体系。',
            result: '平臺交易纠纷率降低40%，商户滿意度提升35%。'
          }
        ],
        '銀行': [
          {
            title: '大灣區中小企業融資服務项目',
            date: '2023年9月',
            description: '推出專門针對大灣區中小企業的融資產品，简化审批流程，降低融資門槛。',
            result: '累計為500+中小企業提供融資支持，總额超過50亿元。'
          },
          {
            title: '跨境贸易金融服務創新',
            date: '2023年6月',
            description: '創新跨境贸易金融產品，為大灣區企業提供便捷的跨境结算和融資服務。',
            result: '跨境贸易融資業務量增長80%，客户滿意度达到95%。'
          }
        ],
        '保險公司': [
          {
            title: '大灣區企業综合保險方案',
            date: '2023年7月',
            description: '為大灣區制造業企業设計综合保險方案，涵盖財產險、责任險、货运險等。',
            result: '為300+企業提供保險保障，理赔效率提升60%。'
          },
          {
            title: '跨境保險服務創新项目',
            date: '2023年4月',
            description: '推出跨境保險產品，為大灣區居民和企業提供跨境保險保障。',
            result: '跨境保險業務增長120%，服務覆盖三地居民。'
          }
        ],
        '互聯網金融': [
          {
            title: '數字化支付解決方案',
            date: '2023年10月',
            description: '為大灣區商户提供一体化數字支付解決方案，支持多种支付方式。',
            result: '服務商户數量增長200%，交易成功率达到99.9%。'
          },
          {
            title: 'AI智能投顾服務',
            date: '2023年6月',
            description: '推出AI智能投顾服務，為用户提供個性化的投資建议和資產配置方案。',
            result: '用户投資收益率平均提升15%，服務用户超過10万人。'
          }
        ]
      };

      return caseMap[category] || [
        {
          title: '大灣區企業服務創新项目',
          date: '2023年6月',
          description: '為大灣區企業提供創新服務解決方案，提升企業运营效率和竞争力。',
          result: '帮助企業运营效率提升30%，客户滿意度达到90%以上。'
        },
        {
          title: '數字化转型咨詢项目',
          date: '2023年3月',
          description: '為传統企業提供數字化转型咨詢服務，助力企業實現數字化升級。',
          result: '成功帮助企業完成數字化转型，業務效率提升40%。'
        }
      ];
    },
    getAddressForCategory(category) {
      const addresses = {
        '徵信公司': ['深圳市福田區深南大道1006号國際創新中心', '廣州市天河區珠江新城冼村路11号', '香港中环國際金融中心'],
        '銀行': ['深圳市福田區深南大道5047号', '廣州市越秀區東風東路713号', '香港中环皇后大道中1号'],
        '保險公司': ['深圳市南山區深南大道9678号', '廣州市天河區体育西路191号', '香港灣仔告士打道108号'],
        '互聯網金融': ['深圳市南山區科技园南區', '廣州市天河區天河北路233号', '香港數碼港道100号']
      };
      const categoryAddresses = addresses[category] || ['廣州市天河區珠江新城冼村路5号凯華國際中心'];
      return categoryAddresses[Math.floor(Math.random() * categoryAddresses.length)] + `${Math.floor(Math.random() * 30) + 10}楼`;
    },
    getPhoneForCategory(category) {
      const areaCodes = {
        '徵信公司': ['0755', '020', '852'],
        '銀行': ['0755', '020', '852'],
        '保險公司': ['0755', '020', '852'],
        '互聯網金融': ['0755', '020', '400']
      };
      const codes = areaCodes[category] || ['020'];
      const areaCode = codes[Math.floor(Math.random() * codes.length)];
      const number = Math.floor(Math.random() * 90000000) + 10000000;
      return `${areaCode}-${number.toString().substring(0, 8)}`;
    },
    getEmailForPartner(name) {
      const domain = name.includes('銀行') ? 'bank.com' :
                   name.includes('保險') ? 'insurance.com' :
                   name.includes('徵信') ? 'credit.com' :
                   name.includes('金融') ? 'fintech.com' : 'partner.com';
      return `service@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${domain}`;
    },
    getWebsiteForPartner(name) {
      return `www.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
    },
    fetchPartnerDetail(id) {
      // 模拟API请求
      setTimeout(() => {
        // 真實合作夥伴數據 - 對應PartnerLogos.vue中的所有機構
        const partners = [
          // 徵信公司
          {
            id: 1,
            name: '环聯徵信有限公司',
            icon: 'fas fa-shield-alt',
            category: '徵信公司',
            isVerified: true,
            description: '环聯徵信有限公司是中國領先的徵信服務提供商，致力于為金融機構和企業提供全面的信用信息服務。公司拥有丰富的數據資源和先進的技术平臺，通過大數據分析和人工智能技术，為客户提供精準的信用評估和風險管理解決方案。',
            foundingDate: '2013年',
            registeredCapital: '5亿元',
            location: '深圳',
            employeeCount: '500-1000人',
            services: [
              {
                icon: 'fas fa-chart-line',
                name: '個人徵信服務',
                description: '為金融機構提供全面的個人信用報告和評分服務，涵盖信贷記录、還款历史、信用行為等多维度信息。'
              },
              {
                icon: 'fas fa-building',
                name: '企業徵信服務',
                description: '提供企業信用報告、風險評估和監控服務，帮助金融機構和合作夥伴做出明智的商業決策。'
              },
              {
                icon: 'fas fa-shield-alt',
                name: '反欺诈服務',
                description: '运用先進的機器學习算法和大數據分析技术，提供實時的反欺诈检测和風險预警服務。'
              }
            ],
            cases: [
              {
                title: '大灣區銀行個人信贷風控项目',
                date: '2023年6月',
                description: '為大灣區某大型銀行提供個人信贷風控服務，建立完善的信用評估模型，有效降低不良贷款率。',
                result: '帮助銀行個人信贷不良率降低0.8個百分點，信贷审批效率提升40%。'
              },
              {
                title: '跨境電商企業徵信服務项目',
                date: '2023年3月',
                description: '為香港某跨境電商平臺提供商户徵信服務，建立商户信用評級体系，降低平臺交易風險。',
                result: '平臺交易纠纷率降低30%，商户滿意度提升25%，交易额增長15%。'
              }
            ],
            address: '深圳市福田區深南大道1006号國際創新中心A座20楼',
            phone: '0755-83216789',
            email: 'service@transunion.cn',
            website: 'www.transunion.cn'
          },
          {
            id: 2,
            name: '深圳百行徵信服務有限公司',
            icon: 'fas fa-building',
            category: '徵信公司',
            isVerified: true,
            description: '深圳百行徵信服務有限公司是中國首家市场化個人徵信機構，由中國互聯網金融协會与芝麻信用、騰訊徵信等8家機構共同發起设立。公司致力于建设覆盖全社會的徵信系統，為传統金融和新金融業态提供全面的徵信服務，促進普惠金融發展。',
            foundingDate: '2018年',
            registeredCapital: '10亿元',
            location: '深圳',
            employeeCount: '300-500人',
            services: [
              {
                icon: 'fas fa-exclamation-triangle',
                name: '企業風險評估',
                description: '基于行業領先的風險評估方法论，全面識別和評估企業面临的战略風險、运营風險、財務風險和合規風險，提供系統性風險管理建议。'
              },
              {
                icon: 'fas fa-sitemap',
                name: '企業治理優化',
                description: '評估企業現有治理结構，提供公司治理優化方案，完善董事會运作機制，提升企業治理水平和管理效率。'
              },
              {
                icon: 'fas fa-file-contract',
                name: '合規管理服務',
                description: '协助企業建立健全合規管理体系，識別合規風險點，制定合規管理策略，降低法律和監管風險。'
              }
            ],
            cases: [
              {
                title: '某上市公司全面風險管理体系構建项目',
                date: '2023年2月',
                description: '為深圳某上市科技公司设計并實施全面風險管理体系，包括風險識別、評估、應對和監控的完整流程，建立風險管理组织架構和制度体系。',
                result: '帮助企業建立了符合國際標準的風險管理体系，有效識別和應對了多项重大風險，保障了企業稳健运营。'
              },
              {
                title: '金融科技企業合規体系建设项目',
                date: '2022年9月',
                description: '為廣州某金融科技企業提供合規管理咨詢服務，结合國内外金融科技監管要求，建立健全合規管理体系。',
                result: '帮助企業顺利通過監管合規检查，避免了潜在的合規風險和處罚。'
              }
            ],
            address: '深圳市福田區福華一路6号免税商務大厦20层',
            phone: '0755-82463100',
            email: 'gbarisk@deloitte.com',
            website: 'www.deloitte.com/cn/gba'
          },
          {
            id: 3,
            name: '香港贸發局大灣區服務中心',
            icon: 'fas fa-globe-asia',
            category: '服務機構',
            isVerified: true,
            description: '香港贸發局大灣區服務中心致力于促進香港与大灣區其他城市的經贸合作，為大灣區企業提供市场信息、商業配對、展览推廣和政策咨詢等專業服務。中心拥有庞大的全球商業網絡和丰富的國際市场經验，能够帮助大灣區企業拓展海外市场，提升國際竞争力。',
            foundingDate: '2019年',
            registeredCapital: '政府支持機構',
            location: '香港',
            employeeCount: '100-150人',
            services: [
              {
                icon: 'fas fa-handshake',
                name: '商業配對服務',
                description: '根據企業需求，精準匹配全球合作夥伴，促成商業合作，帮助企業拓展國際市场和寻找投資機會。'
              },
              {
                icon: 'fas fa-search-dollar',
                name: '市场信息咨詢',
                description: '提供全球主要市场的經济數據、行業研究報告和市场趋势分析，帮助企業制定有针對性的市场開拓策略。'
              },
              {
                icon: 'fas fa-certificate',
                name: '國際認證辅导',
                description: '协助企業了解和获取國際市场準入所需的各类認證，提供認證標準咨詢和認證申请辅导服務。'
              }
            ],
            cases: [
              {
                title: '大灣區企業"走出去"系列活動',
                date: '2023年5月',
                description: '组织大灣區企業参加多個國際展览會和商贸考察团，涵盖東南亚、欧洲和中東等重點市场，為企業提供展示產品和寻找合作夥伴的平臺。',
                result: '帮助超過200家大灣區企業达成合作意向，签订贸易合同總额超過10亿美元。'
              },
              {
                title: '大灣區-東盟經贸合作论坛',
                date: '2022年12月',
                description: '在香港举办大灣區-東盟經贸合作论坛，邀请東盟各國商會和政府代表，与大灣區企業進行深入交流和商業配對。',
                result: '促成50多個合作项目，總投資额超過5亿美元，建立了大灣區与東盟的長期合作機制。'
              }
            ],
            address: '香港灣仔博览道1号香港會展中心办公大楼38楼',
            phone: '852-18428',
            email: 'gbaservice@hktdc.org',
            website: 'www.hktdc.com/gba'
          },
          {
            id: 4,
            name: '粵港澳大灣區數字經济研究院',
            icon: 'fas fa-laptop-code',
            category: '技术服務商',
            isVerified: true,
            description: '粵港澳大灣區數字經济研究院是由政府支持、行業共建的專業研究機構，致力于推動大灣區數字經济發展和數字化转型。研究院汇聚了一批數字技术和產業研究專家，為企業提供數字化转型咨詢、數據价值評估、數字技术應用等專業服務，助力大灣區數字經济高质量發展。',
            foundingDate: '2020年',
            registeredCapital: '3亿元',
            location: '廣州',
            employeeCount: '120-180人',
            services: [
              {
                icon: 'fas fa-digital-tachograph',
                name: '數字化转型咨詢',
                description: '基于企業實際情况，设計個性化數字化转型路径和實施方案，帮助企業實現數字化升級和智能化运营。'
              },
              {
                icon: 'fas fa-database',
                name: '數據資產評估',
                description: '运用專業評估方法，對企業數據資產進行全面盘點和价值評估，發掘數據潜在价值，提供數據治理和應用建议。'
              },
              {
                icon: 'fas fa-brain',
                name: '人工智能應用',
                description: '提供AI技术應用咨詢和解決方案，帮助企業在生產、营销、服務等环节引入AI技术，提升效率和創新能力。'
              }
            ],
            cases: [
              {
                title: '传統制造企業數字化转型项目',
                date: '2023年1月',
                description: '為東莞某传統制造企業设計并實施數字化转型方案，引入工業互聯網、物聯網和大數據技术，建设智能工厂。',
                result: '帮助企業生產效率提升30%，能源消耗降低20%，產品不良率降低15%，成功實現传統制造向智能制造的转型。'
              },
              {
                title: '零售行業數據价值挖掘项目',
                date: '2022年8月',
                description: '為香港某大型零售集团提供數據价值挖掘服務，構建客户画像和消费行為分析模型，挖掘數據商業价值。',
                result: '帮助企業精準营销效果提升40%，客户留存率提高15%，實現數據驱動的經营決策。'
              }
            ],
            address: '廣州市黄埔區科學城科學大道181号',
            phone: '020-82356789',
            email: 'info@gbadei.org',
            website: 'www.gbadei.org'
          },
          {
            id: 5,
            name: '大灣區知識產权保护聯盟',
            icon: 'fas fa-copyright',
            category: '評估機構',
            isVerified: true,
            description: '大灣區知識產权保护聯盟是由大灣區各地知識產权局、專業機構和企業共同發起成立的非营利性组织，致力于為大灣區企業提供知識產权保护、評估、运营和交易等專業服務。聯盟拥有一支由知識產权律师、專利代理人和評估專家组成的專業团队，為企業知識產权保驾护航。',
            foundingDate: '2017年',
            registeredCapital: '非营利组织',
            location: '深圳',
            employeeCount: '50-80人',
            services: [
              {
                icon: 'fas fa-balance-scale',
                name: '知識產权評估',
                description: '运用國際通用的知識產权評估方法，對企業專利、商標、版权等知識產权進行全面評估，确定其市场价值和商業潜力。'
              },
              {
                icon: 'fas fa-gavel',
                name: '知識產权保护',
                description: '提供知識產权侵权監测、维权援助和纠纷调解等服務，帮助企業構建完善的知識產权保护体系。'
              },
              {
                icon: 'fas fa-exchange-alt',
                name: '知識產权交易',
                description: '运营知識產权交易平臺，提供專利转讓、许可、质押等交易服務，促進知識產权的市场化流通和价值变現。'
              }
            ],
            cases: [
              {
                title: '高科技企業專利组合評估项目',
                date: '2023年3月',
                description: '為珠海某高科技企業提供專利组合評估服務，對其200余项專利進行全面評估，發掘高价值專利，制定專利运营策略。',
                result: '帮助企業識別30项核心專利，成功實現專利许可，获得许可收入2000万元。'
              },
              {
                title: '跨境知識產权保护行動',
                date: '2022年10月',
                description: '组织開展跨境知識產权保护行動，针對侵犯大灣區企業知識產权的跨境侵权行為，提供聯合维权服務。',
                result: '成功處理50余起跨境侵权案件，挽回經济损失超過1亿元，有效保护了企業知識產权。'
              }
            ],
            address: '深圳市南山區高新南九道10号深圳灣科技生态园10栋A座18楼',
            phone: '0755-86123456',
            email: 'service@gbaip.org',
            website: 'www.gbaip.org'
          }
        ];

        // 合作夥伴基础信息映射（對應PartnerLogos.vue中的數據）
        const partnerMapping = {
          // 徵信公司
          1: { name: '环聯徵信有限公司', icon: 'fas fa-shield-alt', category: '徵信公司' },
          2: { name: '深圳百行徵信服務有限公司', icon: 'fas fa-building', category: '徵信公司' },
          3: { name: '廣東德信行信用管理有限公司', icon: 'fas fa-check-circle', category: '徵信公司' },
          4: { name: '廣東鹏元徵信有限公司', icon: 'fas fa-award', category: '徵信公司' },
          5: { name: '诺華诚信（Nova Credit）', icon: 'fas fa-star', category: '徵信公司' },
          6: { name: '邓白氏（Dun & Bradstreet, D&B）', icon: 'fas fa-globe', category: '徵信公司' },
          7: { name: '澳門金融管理局（AMCM）信贷數據库', icon: 'fas fa-landmark', category: '徵信公司' },
          8: { name: '澳門銀行公會（ABM）信贷信息共享系統', icon: 'fas fa-university', category: '徵信公司' },
          // 銀行
          9: { name: '中國工商銀行', icon: 'fas fa-landmark', category: '銀行' },
          10: { name: '中國农業銀行', icon: 'fas fa-piggy-bank', category: '銀行' },
          11: { name: '汇丰銀行', icon: 'fas fa-university', category: '銀行' },
          12: { name: '恒生銀行', icon: 'fas fa-building', category: '銀行' },
          13: { name: '渣打銀行', icon: 'fas fa-coins', category: '銀行' },
          // 保險公司
          14: { name: '中國人保（PICC）', icon: 'fas fa-shield-alt', category: '保險公司' },
          15: { name: '中國太保（CPIC）', icon: 'fas fa-umbrella', category: '保險公司' },
          16: { name: '友邦保險（AIA）', icon: 'fas fa-heart', category: '保險公司' },
          17: { name: '安盛保險（AXA）', icon: 'fas fa-shield-alt', category: '保險公司' },
          18: { name: '澳門人寿（Macau Life）', icon: 'fas fa-user-shield', category: '保險公司' },
          19: { name: '太平保險（澳門）（Taiping Macau）', icon: 'fas fa-life-ring', category: '保險公司' },
          // 互聯網金融
          20: { name: '平安健康保險', icon: 'fas fa-heartbeat', category: '互聯網金融' },
          21: { name: '富途證券', icon: 'fas fa-chart-line', category: '互聯網金融' },
          22: { name: '同花顺', icon: 'fas fa-chart-bar', category: '互聯網金融' },
          23: { name: '財付通', icon: 'fas fa-wallet', category: '互聯網金融' },
          24: { name: '騰訊金融科技', icon: 'fas fa-money-bill-wave', category: '互聯網金融' },
          25: { name: '度小滿金融', icon: 'fas fa-hand-holding-usd', category: '互聯網金融' }
        };

        // 根據ID获取合作夥伴數據
        const baseInfo = partnerMapping[parseInt(id)];
        const partner = partners.find(p => p.id === parseInt(id)) || {
          id: id,
          name: baseInfo?.name || `大灣區合作機構${id}`,
          icon: baseInfo?.icon || 'fas fa-university',
          category: baseInfo?.category || '金融服務',
          isVerified: true,
          description: `${baseInfo?.name || '本機構'}是大灣區領先的${baseInfo?.category || '金融服務'}提供商，致力于為企業和個人提供全方位、專業化的服務和解決方案。凭借多年的行業經验和專業团队，我们深入了解客户面临的挑战和需求，提供定制化的服務，帮助客户實現可持续發展。`,
          foundingDate: '2015年',
          registeredCapital: '5000万元',
          location: ['廣州', '深圳', '香港', '澳門'][Math.floor(Math.random() * 4)],
          employeeCount: '200-500人',
          services: this.getServicesForCategory(baseInfo?.category || '金融服務'),
          cases: this.getCasesForCategory(baseInfo?.category || '金融服務'),
          address: this.getAddressForCategory(baseInfo?.category || '金融服務'),
          phone: this.getPhoneForCategory(baseInfo?.category || '金融服務'),
          email: this.getEmailForPartner(baseInfo?.name || '合作機構'),
          website: this.getWebsiteForPartner(baseInfo?.name || '合作機構')
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

/* 動画樣式 */
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

/* 動画關键帧 */
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

/* 頁面整体進入動画 */
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

/* 增强現有元素的動画效果 */
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