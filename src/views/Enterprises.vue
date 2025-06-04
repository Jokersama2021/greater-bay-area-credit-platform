<template>
  <div class="enterprises-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">企业征信管理</h1>
        <div class="header-stats">
          <div class="stat-card">
            <div class="stat-value">{{ totalEnterprises.toLocaleString() }}</div>
            <div class="stat-label">总企业数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ activeEnterprises.toLocaleString() }}</div>
            <div class="stat-label">活跃企业</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ riskEnterprises.toLocaleString() }}</div>
            <div class="stat-label">风险企业</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-section">
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
    <div class="enterprises-list">
      <div class="list-header">
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
      
      <div class="table-container">
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
            <tr v-for="enterprise in filteredEnterprises" :key="enterprise.id" class="table-row">
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

export default {
  name: 'Enterprises',
  setup() {
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
    
    // 企业数据
    const enterprises = ref([])
    
    // 模拟企业数据
    const generateMockData = () => {
      const regions = ['广州', '深圳', '香港', '澳门', '珠海', '佛山', '东莞', '中山', '江门', '惠州', '肇庆']
      const creditLevels = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B']
      const scales = ['大型', '中型', '小型', '微型']
      const types = ['有限责任公司', '股份有限公司', '个人独资企业', '合伙企业']
      
      const mockEnterprises = []
      for (let i = 1; i <= 100; i++) {
        mockEnterprises.push({
          id: i,
          name: `企业${i.toString().padStart(3, '0')}`,
          type: types[Math.floor(Math.random() * types.length)],
          creditCode: `91440000${Math.random().toString().substr(2, 10)}`,
          region: regions[Math.floor(Math.random() * regions.length)],
          creditLevel: creditLevels[Math.floor(Math.random() * creditLevels.length)],
          scale: scales[Math.floor(Math.random() * scales.length)],
          registeredCapital: Math.floor(Math.random() * 100000000) + 1000000,
          establishDate: new Date(2000 + Math.floor(Math.random() * 24), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
          lastUpdate: new Date(2024, Math.floor(Math.random() * 4), Math.floor(Math.random() * 30))
        })
      }
      enterprises.value = mockEnterprises
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
    }
    
    const editEnterprise = (id) => {
      console.log('编辑企业:', id)
    }
    
    const generateReport = (id) => {
      console.log('生成报告:', id)
    }
    
    onMounted(() => {
      generateMockData()
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
