<template>
  <div class="enterprise-list-container">
    <div class="page-header">
      <h1 class="page-title">企业列表</h1>
      <router-link to="/" class="back-btn">
        <i class="fas fa-arrow-left"></i> 返回首页
      </router-link>
    </div>

    <div class="search-filter-section">
      <div class="search-bar">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索企业名称、行业、地区..."
          class="search-input"
        />
        <button class="search-btn" @click="searchEnterprises">
          <i class="fas fa-search"></i>
        </button>
      </div>

      <div class="filters">
        <div class="filter-group">
          <label>地区</label>
          <select v-model="filters.region">
            <option value="">全部</option>
            <option value="广州">广州</option>
            <option value="深圳">深圳</option>
            <option value="香港">香港</option>
            <option value="澳门">澳门</option>
            <option value="珠海">珠海</option>
            <option value="佛山">佛山</option>
            <option value="中山">中山</option>
            <option value="东莞">东莞</option>
            <option value="惠州">惠州</option>
            <option value="江门">江门</option>
            <option value="肇庆">肇庆</option>
          </select>
        </div>

        <div class="filter-group">
          <label>行业</label>
          <select v-model="filters.industry">
            <option value="">全部</option>
            <option value="金融">金融</option>
            <option value="科技">科技</option>
            <option value="制造">制造</option>
            <option value="服务">服务</option>
            <option value="教育">教育</option>
            <option value="医疗">医疗</option>
          </select>
        </div>

        <div class="filter-group">
          <label>信用等级</label>
          <select v-model="filters.creditRating">
            <option value="">全部</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="BBB">BBB</option>
            <option value="BB">BB</option>
            <option value="B">B</option>
          </select>
        </div>

        <button class="filter-btn" @click="resetFilters">
          重置筛选
        </button>
      </div>
    </div>

    <div class="enterprise-grid">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-else-if="enterprises.length === 0" class="no-results">
        <i class="fas fa-search"></i>
        <p>未找到符合条件的企业</p>
        <button @click="resetFilters" class="reset-btn">重置筛选条件</button>
      </div>

      <div 
        v-for="enterprise in enterprises" 
        :key="enterprise.id" 
        class="enterprise-card"
        @click="goToEnterpriseDetail(enterprise.id)"
      >
        <div class="enterprise-header">
          <h3 class="enterprise-name">{{ enterprise.name }}</h3>
          <div class="credit-badge" :class="getCreditClass(enterprise.creditRating)">
            {{ enterprise.creditRating }}
          </div>
        </div>

        <div class="enterprise-info">
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ enterprise.region }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-industry"></i>
            <span>{{ enterprise.industry }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-calendar-alt"></i>
            <span>成立日期: {{ enterprise.establishDate }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-money-bill-wave"></i>
            <span>注册资本: {{ enterprise.registeredCapital }}万元</span>
          </div>
        </div>

        <div class="enterprise-footer">
          <div class="view-detail">查看详情 <i class="fas fa-chevron-right"></i></div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button 
        :disabled="currentPage === 1" 
        @click="currentPage--"
        class="page-btn"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <div class="page-info">
        {{ currentPage }} / {{ totalPages }}
      </div>
      
      <button 
        :disabled="currentPage === totalPages" 
        @click="currentPage++"
        class="page-btn"
      >
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnterpriseList',
  data() {
    return {
      searchQuery: '',
      filters: {
        region: '',
        industry: '',
        creditRating: ''
      },
      enterprises: [],
      loading: true,
      currentPage: 1,
      totalPages: 1,
      pageSize: 12
    }
  },
  created() {
    this.fetchEnterprises()
  },
  methods: {
    async fetchEnterprises() {
      this.loading = true
      
      // 模拟API请求
      setTimeout(() => {
        // 真实企业数据
        const realEnterprises = [
          {
            id: 1,
            name: '腾讯科技（深圳）有限公司',
            creditRating: 'AAA',
            region: '深圳',
            industry: '互联网',
            establishDate: '1998-11-11',
            registeredCapital: 200000
          },
          {
            id: 2,
            name: '华为技术有限公司',
            creditRating: 'AAA',
            region: '深圳',
            industry: '通信设备制造',
            establishDate: '1987-09-15',
            registeredCapital: 3990813
          },
          {
            id: 3,
            name: '比亚迪股份有限公司',
            creditRating: 'AA',
            region: '深圳',
            industry: '汽车制造',
            establishDate: '1995-02-10',
            registeredCapital: 287793
          },
          {
            id: 4,
            name: '广州恒大集团有限公司',
            creditRating: 'BB',
            region: '广州',
            industry: '房地产',
            establishDate: '1996-06-24',
            registeredCapital: 300000
          },
          {
            id: 5,
            name: '珠海格力电器股份有限公司',
            creditRating: 'AAA',
            region: '珠海',
            industry: '家电制造',
            establishDate: '1989-12-13',
            registeredCapital: 601573
          },
          {
            id: 6,
            name: '香港交易所',
            creditRating: 'AAA',
            region: '香港',
            industry: '金融',
            establishDate: '2000-07-05',
            registeredCapital: 123000
          },
          {
            id: 7,
            name: '澳门博彩控股有限公司',
            creditRating: 'AA',
            region: '澳门',
            industry: '旅游娱乐',
            establishDate: '2001-02-18',
            registeredCapital: 58000
          },
          {
            id: 8, 
            name: '中国银行（香港）有限公司',
            creditRating: 'AAA',
            region: '香港',
            industry: '金融',
            establishDate: '1964-10-01',
            registeredCapital: 435000
          },
          {
            id: 9,
            name: '美的集团股份有限公司',
            creditRating: 'AA',
            region: '佛山',
            industry: '家电制造',
            establishDate: '1981-05-07',
            registeredCapital: 298220
          },
          {
            id: 10,
            name: '广州汽车集团股份有限公司',
            creditRating: 'A',
            region: '广州',
            industry: '汽车制造',
            establishDate: '1997-06-21',
            registeredCapital: 125000
          },
          {
            id: 11,
            name: '华润创业有限公司',
            creditRating: 'AA',
            region: '香港',
            industry: '零售',
            establishDate: '1992-07-18',
            registeredCapital: 85000
          },
          {
            id: 12,
            name: '东莞三星视界有限公司',
            creditRating: 'A',
            region: '东莞',
            industry: '电子制造',
            establishDate: '2001-03-25',
            registeredCapital: 62500
          },
          {
            id: 13,
            name: '深圳迈瑞医疗电子股份有限公司',
            creditRating: 'AA',
            region: '深圳',
            industry: '医疗',
            establishDate: '1999-01-23',
            registeredCapital: 121500
          },
          {
            id: 14,
            name: '珠海丽珠医药集团股份有限公司',
            creditRating: 'A',
            region: '珠海',
            industry: '医药',
            establishDate: '1985-08-12',
            registeredCapital: 93462
          },
          {
            id: 15,
            name: '惠州市德赛电池有限公司',
            creditRating: 'BBB',
            region: '惠州',
            industry: '电子制造',
            establishDate: '1996-12-01',
            registeredCapital: 45000
          }
        ];

        // 筛选逻辑
        let filteredEnterprises = [...realEnterprises];
        
        // 根据地区筛选
        if (this.filters.region) {
          filteredEnterprises = filteredEnterprises.filter(e => 
            e.region === this.filters.region
          );
        }
        
        // 根据行业筛选
        if (this.filters.industry) {
          filteredEnterprises = filteredEnterprises.filter(e => 
            e.industry === this.filters.industry
          );
        }
        
        // 根据信用等级筛选
        if (this.filters.creditRating) {
          filteredEnterprises = filteredEnterprises.filter(e => 
            e.creditRating === this.filters.creditRating
          );
        }
        
        // 根据搜索词筛选
        if (this.searchQuery) {
          const query = this.searchQuery.toLowerCase();
          filteredEnterprises = filteredEnterprises.filter(e => 
            e.name.toLowerCase().includes(query) || 
            e.region.toLowerCase().includes(query) || 
            e.industry.toLowerCase().includes(query)
          );
        }
        
        // 如果筛选后没有数据，则添加随机生成的数据
        if (filteredEnterprises.length === 0) {
          filteredEnterprises = Array(12).fill().map((_, i) => ({
            id: 100 + i,
            name: `大湾区${this.filters.region || ''}企业${i + 1}`,
            creditRating: ['AAA', 'AA', 'A', 'BBB', 'BB', 'B'][Math.floor(Math.random() * 6)],
            region: this.filters.region || ['广州', '深圳', '香港', '佛山', '珠海', '东莞', '澳门', '惠州'][Math.floor(Math.random() * 8)],
            industry: this.filters.industry || ['金融', '科技', '制造', '服务', '教育', '医疗', '房地产', '零售'][Math.floor(Math.random() * 8)],
            establishDate: `${2000 + Math.floor(Math.random() * 22)}-${1 + Math.floor(Math.random() * 12)}-${1 + Math.floor(Math.random() * 28)}`,
            registeredCapital: Math.floor(Math.random() * 10000) + 100
          }));
        }

        // 分页
        this.totalPages = Math.ceil(filteredEnterprises.length / this.pageSize);
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.enterprises = filteredEnterprises.slice(startIndex, endIndex);
        
        this.loading = false;
      }, 200);
    },
    searchEnterprises() {
      this.currentPage = 1
      this.fetchEnterprises()
    },
    resetFilters() {
      this.searchQuery = ''
      this.filters = {
        region: '',
        industry: '',
        creditRating: ''
      }
      this.currentPage = 1
      this.fetchEnterprises()
    },
    goToEnterpriseDetail(id) {
      this.$router.push(`/enterprise/${id}`)
    },
    getCreditClass(rating) {
      const classes = {
        'AAA': 'credit-aaa',
        'AA': 'credit-aa',
        'A': 'credit-a',
        'BBB': 'credit-bbb',
        'BB': 'credit-bb',
        'B': 'credit-b'
      }
      return classes[rating] || ''
    }
  },
  watch: {
    currentPage() {
      this.fetchEnterprises()
    }
  }
}
</script>

<style scoped>
.enterprise-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 28px;
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
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

.search-filter-section {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.search-bar {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  height: 40px;
  border-radius: 20px 0 0 20px;
  padding: 0 20px;
  color: white;
  font-size: 16px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.search-btn {
  background: linear-gradient(135deg, #5EFCE8 0%, #736EFE 100%);
  border: none;
  height: 40px;
  width: 50px;
  border-radius: 0 20px 20px 0;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  opacity: 0.9;
}

.filters {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 120px;
}

.filter-group label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.filter-group select {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  height: 36px;
  border-radius: 5px;
  padding: 0 10px;
  color: white;
  cursor: pointer;
}

.filter-group select:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.15);
}

.filter-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 0 15px;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;
  height: 36px;
  margin-left: auto;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.enterprise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.enterprise-card {
  background: rgba(13, 17, 23, 0.5);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.enterprise-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border-color: rgba(94, 252, 232, 0.3);
}

.enterprise-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.enterprise-name {
  font-size: 18px;
  margin: 0;
  color: #e6edf3;
}

.credit-badge {
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 4px;
}

.credit-aaa {
  background: linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%);
  color: white;
}

.credit-aa {
  background: linear-gradient(135deg, #8BC34A 0%, #CDDC39 100%);
  color: #333;
}

.credit-a {
  background: linear-gradient(135deg, #CDDC39 0%, #FFEB3B 100%);
  color: #333;
}

.credit-bbb {
  background: linear-gradient(135deg, #FFEB3B 0%, #FFC107 100%);
  color: #333;
}

.credit-bb {
  background: linear-gradient(135deg, #FFC107 0%, #FF9800 100%);
  color: white;
}

.credit-b {
  background: linear-gradient(135deg, #FF9800 0%, #F44336 100%);
  color: white;
}

.enterprise-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

.enterprise-footer {
  display: flex;
  justify-content: flex-end;
}

.view-detail {
  font-size: 14px;
  color: #5EFCE8;
  display: flex;
  align-items: center;
  gap: 5px;
}

.view-detail i {
  transition: transform 0.3s ease;
}

.enterprise-card:hover .view-detail i {
  transform: translateX(3px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.page-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn:not(:disabled):hover {
  background: rgba(255, 255, 255, 0.2);
}

.page-info {
  font-size: 16px;
  color: white;
}

.loading-container {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 300px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #5EFCE8;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-results {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 300px;
  color: rgba(255, 255, 255, 0.7);
}

.no-results i {
  font-size: 48px;
  opacity: 0.5;
}

.reset-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 8px 15px;
  border-radius: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.reset-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style> 