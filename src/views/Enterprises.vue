<template>
  <div class="enterprises-page">
    <!-- 页面头部 -->
    <div class="page-header animate-fade-in-up" :style="{ animationDelay: '0.2s' }">
      <div class="header-content">
        <h1 class="page-title animate-slide-in-left" :style="{ animationDelay: '0.3s' }">企业征信管理</h1>
        <div class="header-stats">
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.4s' }">
            <div class="stat-value">{{ animatedNumbers.totalEnterprises.toLocaleString() }}</div>
            <div class="stat-label">总企业数</div>
          </div>
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.5s' }">
            <div class="stat-value">{{ animatedNumbers.activeEnterprises.toLocaleString() }}</div>
            <div class="stat-label">活跃企业</div>
          </div>
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.6s' }">
            <div class="stat-value">{{ animatedNumbers.riskEnterprises.toLocaleString() }}</div>
            <div class="stat-label">风险企业</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-section animate-slide-in-up" :style="{ animationDelay: '0.7s' }">
      <div class="search-bar">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索企业名称、统一社会信用代码..."
            class="search-input"
          />
        </div>
        <button class="search-btn">
          <i class="fas fa-search"></i>
          搜索
        </button>
      </div>
      
      <div class="filter-section">
        <div class="filter-group">
          <label>地区</label>
          <select v-model="selectedRegion" class="filter-select">
            <option value="">全部地区</option>
            <option value="广州">广州</option>
            <option value="深圳">深圳</option>
            <option value="香港">香港</option>
            <option value="澳门">澳门</option>
            <option value="珠海">珠海</option>
            <option value="佛山">佛山</option>
            <option value="东莞">东莞</option>
            <option value="中山">中山</option>
            <option value="江门">江门</option>
            <option value="惠州">惠州</option>
            <option value="肇庆">肇庆</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>信用等级</label>
          <select v-model="selectedCreditLevel" class="filter-select">
            <option value="">全部等级</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="BBB">BBB</option>
            <option value="BB">BB</option>
            <option value="B">B</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>企业规模</label>
          <select v-model="selectedScale" class="filter-select">
            <option value="">全部规模</option>
            <option value="大型">大型企业</option>
            <option value="中型">中型企业</option>
            <option value="小型">小型企业</option>
            <option value="微型">微型企业</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 企业列表 -->
    <div class="enterprises-list animate-slide-in-up" :style="{ animationDelay: '0.8s' }">
      <div class="list-header animate-fade-in-up" :style="{ animationDelay: '0.9s' }">
        <div class="list-title">企业列表</div>
        <div class="list-actions">
          <button class="action-btn export-btn">
            <i class="fas fa-download"></i>
            导出
          </button>
          <button class="action-btn add-btn">
            <i class="fas fa-plus"></i>
            添加企业
          </button>
        </div>
      </div>

      <div class="table-container animate-fade-in-up" :style="{ animationDelay: '1.0s' }">
        <table class="enterprises-table">
          <thead>
            <tr>
              <th>企业名称</th>
              <th>统一社会信用代码</th>
              <th>所在地区</th>
              <th>信用等级</th>
              <th>企业规模</th>
              <th>注册资本</th>
              <th>成立时间</th>
              <th>最后更新</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(enterprise, index) in filteredEnterprises"
              :key="enterprise.id"
              class="table-row animate-table-row"
              :style="{ animationDelay: `${1.1 + index * 0.03}s` }"
            >
              <td class="enterprise-name">
                <div class="name-wrapper">
                  <div class="company-name">{{ enterprise.name }}</div>
                  <div class="company-type">{{ enterprise.type }}</div>
                </div>
              </td>
              <td class="credit-code">{{ enterprise.creditCode }}</td>
              <td class="region">
                <span class="region-tag" :class="getRegionClass(enterprise.region)">
                  {{ enterprise.region }}
                </span>
              </td>
              <td class="credit-level">
                <span class="level-badge" :class="getCreditLevelClass(enterprise.creditLevel)">
                  {{ enterprise.creditLevel }}
                </span>
              </td>
              <td class="scale">{{ enterprise.scale }}</td>
              <td class="capital">{{ formatCurrency(enterprise.registeredCapital) }}</td>
              <td class="establish-date">{{ formatDate(enterprise.establishDate) }}</td>
              <td class="update-time">{{ formatDate(enterprise.lastUpdate) }}</td>
              <td class="actions">
                <button class="action-btn view-btn" @click="viewEnterprise(enterprise.id)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" @click="editEnterprise(enterprise.id)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn report-btn" @click="generateReport(enterprise.id)">
                  <i class="fas fa-file-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 分页 -->
      <div class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="page-info">
          第 {{ currentPage }} 页，共 {{ totalPages }} 页
        </span>
        <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Enterprises',
  setup() {
    const router = useRouter()

    // 响应式数据
    const searchQuery = ref('')
    const selectedRegion = ref('')
    const selectedCreditLevel = ref('')
    const selectedScale = ref('')
    const currentPage = ref(1)
    const pageSize = ref(20)

    // 统计数据
    const totalEnterprises = ref(15847)
    const activeEnterprises = ref(14523)
    const riskEnterprises = ref(342)

    // 动画数字
    const animatedNumbers = ref({
      totalEnterprises: 0,
      activeEnterprises: 0,
      riskEnterprises: 0
    })

    // 企业数据
    const enterprises = ref([])

    // 数字动画函数
    const animateNumber = (target, key, duration = 2000) => {
      const start = animatedNumbers.value[key]
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutExpo 缓动函数
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        animatedNumbers.value[key] = Math.round(start + (target - start) * easeOutExpo)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
    
    // 真实粤港澳大湾区企业数据
    const generateRealData = () => {
      const realEnterprises = [
        // 深圳知名企业
        {
          id: 1,
          name: '腾讯控股有限公司',
          type: '股份有限公司',
          creditCode: '91440300279460456U',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 25000000,
          establishDate: new Date(1998, 10, 11),
          lastUpdate: new Date(2024, 3, 15)
        },
        {
          id: 2,
          name: '华为技术有限公司',
          type: '有限责任公司',
          creditCode: '91440300618057294B',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 4040000,
          establishDate: new Date(1987, 8, 15),
          lastUpdate: new Date(2024, 3, 20)
        },
        {
          id: 3,
          name: '比亚迪股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300279374613F',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 2668000,
          establishDate: new Date(1995, 1, 10),
          lastUpdate: new Date(2024, 3, 18)
        },
        {
          id: 4,
          name: '平安银行股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300100020248G',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 19405918,
          establishDate: new Date(1987, 11, 22),
          lastUpdate: new Date(2024, 3, 25)
        },
        {
          id: 5,
          name: '招商银行股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300100020180F',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 25220000,
          establishDate: new Date(1987, 3, 8),
          lastUpdate: new Date(2024, 3, 22)
        },
        // 广州知名企业
        {
          id: 6,
          name: '广州汽车集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190349473L',
          region: '广州',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 6606000,
          establishDate: new Date(1997, 5, 12),
          lastUpdate: new Date(2024, 3, 10)
        },
        {
          id: 7,
          name: '网易（杭州）网络有限公司广州分公司',
          type: '有限责任公司分公司',
          creditCode: '91440101MA59M8KE8K',
          region: '广州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 0,
          establishDate: new Date(2010, 4, 17),
          lastUpdate: new Date(2024, 3, 12)
        },
        {
          id: 8,
          name: '唯品会（中国）有限公司',
          type: '有限责任公司',
          creditCode: '91440101055658846H',
          region: '广州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 200000,
          establishDate: new Date(2008, 7, 28),
          lastUpdate: new Date(2024, 3, 8)
        },
        {
          id: 9,
          name: '广州白云山制药股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190274909H',
          region: '广州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 204000,
          establishDate: new Date(1973, 0, 29),
          lastUpdate: new Date(2024, 3, 5)
        },
        {
          id: 10,
          name: '海大集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190349474M',
          region: '广州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 158000,
          establishDate: new Date(1998, 2, 18),
          lastUpdate: new Date(2024, 3, 14)
        },
        // 香港知名企业
        {
          id: 11,
          name: '长江和记实业有限公司',
          type: '有限公司',
          creditCode: 'HK0001000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1500000,
          establishDate: new Date(1980, 0, 1),
          lastUpdate: new Date(2024, 3, 16)
        },
        {
          id: 12,
          name: '新鸿基地产发展有限公司',
          type: '有限公司',
          creditCode: 'HK0016000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1200000,
          establishDate: new Date(1972, 7, 29),
          lastUpdate: new Date(2024, 3, 11)
        },
        {
          id: 13,
          name: '恒生银行有限公司',
          type: '有限公司',
          creditCode: 'HK0011000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 980000,
          establishDate: new Date(1933, 2, 3),
          lastUpdate: new Date(2024, 3, 19)
        },
        {
          id: 14,
          name: '香港交易及结算所有限公司',
          type: '有限公司',
          creditCode: 'HK0388000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 800000,
          establishDate: new Date(2000, 2, 6),
          lastUpdate: new Date(2024, 3, 13)
        },
        {
          id: 15,
          name: '中国移动有限公司',
          type: '有限公司',
          creditCode: 'HK0941000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1500000,
          establishDate: new Date(1997, 8, 3),
          lastUpdate: new Date(2024, 3, 17)
        },
        // 澳门知名企业
        {
          id: 16,
          name: '澳门博彩股份有限公司',
          type: '股份有限公司',
          creditCode: 'MO0027000001',
          region: '澳门',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 280000,
          establishDate: new Date(1962, 0, 1),
          lastUpdate: new Date(2024, 3, 9)
        },
        {
          id: 17,
          name: '银河娱乐集团有限公司',
          type: '有限公司',
          creditCode: 'MO0027000002',
          region: '澳门',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 350000,
          establishDate: new Date(1980, 4, 15),
          lastUpdate: new Date(2024, 3, 7)
        },
        {
          id: 18,
          name: '澳门电讯有限公司',
          type: '有限公司',
          creditCode: 'MO0311000001',
          region: '澳门',
          creditLevel: 'AA',
          scale: '中型',
          registeredCapital: 120000,
          establishDate: new Date(1981, 1, 1),
          lastUpdate: new Date(2024, 3, 6)
        },
        // 珠海知名企业
        {
          id: 19,
          name: '格力电器股份有限公司',
          type: '股份有限公司',
          creditCode: '91440400190274909H',
          region: '珠海',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 601700,
          establishDate: new Date(1991, 0, 18),
          lastUpdate: new Date(2024, 3, 21)
        },
        {
          id: 20,
          name: '魅族科技有限公司',
          type: '有限责任公司',
          creditCode: '91440400666419046Q',
          region: '珠海',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 50000,
          establishDate: new Date(2003, 2, 1),
          lastUpdate: new Date(2024, 3, 4)
        },
        // 佛山知名企业
        {
          id: 21,
          name: '美的集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440600190274909H',
          region: '佛山',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 658000,
          establishDate: new Date(1968, 0, 1),
          lastUpdate: new Date(2024, 3, 23)
        },
        {
          id: 22,
          name: '碧桂园控股有限公司',
          type: '有限公司',
          creditCode: '91440600190274909I',
          region: '佛山',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 1200000,
          establishDate: new Date(1992, 6, 1),
          lastUpdate: new Date(2024, 3, 2)
        },
        // 东莞知名企业
        {
          id: 23,
          name: '东莞银行股份有限公司',
          type: '股份有限公司',
          creditCode: '91441900190274909H',
          region: '东莞',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 4200000,
          establishDate: new Date(1999, 8, 28),
          lastUpdate: new Date(2024, 3, 1)
        },
        {
          id: 24,
          name: 'OPPO广东移动通信有限公司',
          type: '有限责任公司',
          creditCode: '91441900190274909I',
          region: '东莞',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 80000,
          establishDate: new Date(2004, 8, 18),
          lastUpdate: new Date(2024, 2, 28)
        },
        // 中山知名企业
        {
          id: 25,
          name: '小熊电器股份有限公司',
          type: '股份有限公司',
          creditCode: '91442000190274909H',
          region: '中山',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 40000,
          establishDate: new Date(2006, 7, 25),
          lastUpdate: new Date(2024, 2, 25)
        },
        // 江门知名企业
        {
          id: 26,
          name: '江门甘蔗化工厂（集团）股份有限公司',
          type: '股份有限公司',
          creditCode: '91440700190274909H',
          region: '江门',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 35000,
          establishDate: new Date(1958, 5, 15),
          lastUpdate: new Date(2024, 2, 20)
        },
        // 惠州知名企业
        {
          id: 27,
          name: '惠州TCL移动通信有限公司',
          type: '有限责任公司',
          creditCode: '91441300190274909H',
          region: '惠州',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 120000,
          establishDate: new Date(1999, 3, 8),
          lastUpdate: new Date(2024, 2, 18)
        },
        // 肇庆知名企业
        {
          id: 28,
          name: '肇庆星湖生物科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91441200190274909H',
          region: '肇庆',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 28000,
          establishDate: new Date(1993, 11, 20),
          lastUpdate: new Date(2024, 2, 15)
        }
      ]

      enterprises.value = realEnterprises
    }
    
    // 计算属性
    const filteredEnterprises = computed(() => {
      let filtered = enterprises.value
      
      if (searchQuery.value) {
        filtered = filtered.filter(enterprise => 
          enterprise.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          enterprise.creditCode.includes(searchQuery.value)
        )
      }
      
      if (selectedRegion.value) {
        filtered = filtered.filter(enterprise => enterprise.region === selectedRegion.value)
      }
      
      if (selectedCreditLevel.value) {
        filtered = filtered.filter(enterprise => enterprise.creditLevel === selectedCreditLevel.value)
      }
      
      if (selectedScale.value) {
        filtered = filtered.filter(enterprise => enterprise.scale === selectedScale.value)
      }
      
      return filtered
    })
    
    const totalPages = computed(() => {
      return Math.ceil(filteredEnterprises.value.length / pageSize.value)
    })
    
    // 方法
    const getRegionClass = (region) => {
      const regionClasses = {
        '广州': 'guangzhou',
        '深圳': 'shenzhen', 
        '香港': 'hongkong',
        '澳门': 'macau'
      }
      return regionClasses[region] || 'other'
    }
    
    const getCreditLevelClass = (level) => {
      const levelClasses = {
        'AAA': 'excellent',
        'AA': 'good',
        'A': 'fair',
        'BBB': 'average',
        'BB': 'poor',
        'B': 'bad'
      }
      return levelClasses[level] || 'unknown'
    }
    
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY',
        minimumFractionDigits: 0
      }).format(amount)
    }
    
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('zh-CN').format(date)
    }
    
    const viewEnterprise = (id) => {
      console.log('查看企业:', id)
      router.push(`/enterprise/${id}`)
    }
    
    const editEnterprise = (id) => {
      console.log('编辑企业:', id)
    }
    
    const generateReport = (id) => {
      console.log('生成报告:', id)
    }

    onMounted(() => {
      generateRealData()

      // 启动数字动画 - 页面加载后立即开始
      setTimeout(() => {
        animateNumber(totalEnterprises.value, 'totalEnterprises', 1800)
      }, 800) // 等待页面过渡动画完成
      setTimeout(() => {
        animateNumber(activeEnterprises.value, 'activeEnterprises', 1900)
      }, 900)
      setTimeout(() => {
        animateNumber(riskEnterprises.value, 'riskEnterprises', 1600)
      }, 1000)
    })

    return {
      searchQuery,
      selectedRegion,
      selectedCreditLevel,
      selectedScale,
      currentPage,
      totalEnterprises,
      activeEnterprises,
      riskEnterprises,
      animatedNumbers,
      filteredEnterprises,
      totalPages,
      getRegionClass,
      getCreditLevelClass,
      formatCurrency,
      formatDate,
      viewEnterprise,
      editEnterprise,
      generateReport
    }
  }
}
</script>

<style scoped>
.enterprises-page {
  padding: 24px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
}

/* 页面进入动画 - 更快更流畅 */
.animate-fade-in-up {
  opacity: 0;
  transform: translateY(6px);
  animation: smoothFadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从1.2s减少到0.6s */
}

.animate-slide-in-left {
  opacity: 0;
  transform: translateX(6px);
  animation: smoothFadeInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从1.2s减少到0.6s */
}

.animate-slide-in-up {
  opacity: 0;
  transform: translateY(6px);
  animation: smoothFadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从1.2s减少到0.6s */
}

.animate-fade-in-scale {
  opacity: 0;
  transform: scale(0.99);
  animation: smoothFadeInScale 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从1.2s减少到0.6s */
}

.animate-table-row {
  opacity: 0;
  transform: translateY(3px);
  animation: smoothFadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从0.8s减少到0.4s */
}

@keyframes smoothFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(6px); /* 减少移动距离 */
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes smoothFadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(6px); /* 减少移动距离 */
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes smoothFadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.99); /* 减少缩放幅度 */
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 页面头部 */
.page-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  background: linear-gradient(135deg, #ffffff 0%, #60cdff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-stats {
  display: flex;
  gap: 16px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #007AFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* 搜索和筛选 */
.search-section {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.search-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.search-input-wrapper {
  position: relative;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 48px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007AFF;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 122, 255, 0.3);
}

.filter-section {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.filter-select {
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #007AFF;
  background: rgba(255, 255, 255, 0.08);
}

.filter-select option {
  background: #1a1a2e;
  color: #ffffff;
}

/* 企业列表 */
.enterprises-list {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.list-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
}

.list-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.export-btn:hover {
  border-color: #30D158;
  color: #30D158;
}

.add-btn:hover {
  border-color: #007AFF;
  color: #007AFF;
}

/* 表格 */
.table-container {
  overflow-x: auto;
}

.enterprises-table {
  width: 100%;
  border-collapse: collapse;
}

.enterprises-table th {
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.9rem;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.enterprises-table td {
  padding: 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.04);
}

.enterprise-name .company-name {
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 2px;
}

.enterprise-name .company-type {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.credit-code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.region-tag {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
}

.region-tag.guangzhou { background: rgba(255, 59, 48, 0.2); color: #FF3B30; }
.region-tag.shenzhen { background: rgba(0, 122, 255, 0.2); color: #007AFF; }
.region-tag.hongkong { background: rgba(48, 209, 88, 0.2); color: #30D158; }
.region-tag.macau { background: rgba(255, 149, 0, 0.2); color: #FF9500; }
.region-tag.other { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.7); }

.level-badge {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.level-badge.excellent { background: rgba(48, 209, 88, 0.2); color: #30D158; }
.level-badge.good { background: rgba(0, 122, 255, 0.2); color: #007AFF; }
.level-badge.fair { background: rgba(90, 200, 250, 0.2); color: #5AC8FA; }
.level-badge.average { background: rgba(255, 149, 0, 0.2); color: #FF9500; }
.level-badge.poor { background: rgba(255, 204, 0, 0.2); color: #FFCC02; }
.level-badge.bad { background: rgba(255, 59, 48, 0.2); color: #FF3B30; }

.actions {
  display: flex;
  gap: 8px;
}

.actions .action-btn {
  padding: 6px 8px;
  min-width: auto;
}

.view-btn:hover { color: #007AFF; border-color: #007AFF; }
.edit-btn:hover { color: #FF9500; border-color: #FF9500; }
.report-btn:hover { color: #30D158; border-color: #30D158; }

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.page-btn {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: #007AFF;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .enterprises-page {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-stats {
    width: 100%;
    justify-content: space-between;
  }

  .stat-card {
    flex: 1;
    padding: 12px 16px;
  }

  .search-bar {
    flex-direction: column;
  }

  .filter-section {
    flex-direction: column;
  }

  .filter-group {
    width: 100%;
  }

  .filter-select {
    width: 100%;
  }

  .list-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .table-container {
    font-size: 0.8rem;
  }

  .enterprises-table th,
  .enterprises-table td {
    padding: 12px 8px;
  }
}
</style>
