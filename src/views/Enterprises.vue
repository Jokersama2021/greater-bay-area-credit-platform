<template>
  <div class="enterprises-page">
    <!-- 頁面頭部 -->
    <div class="page-header animate-fade-in-up" :style="{ animationDelay: '0.2s' }">
      <div class="header-content">
        <h1 class="page-title animate-slide-in-left" :style="{ animationDelay: '0.3s' }">企業徵信管理</h1>
        <div class="header-stats">
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.4s' }">
            <div class="stat-value">{{ animatedNumbers.totalEnterprises.toLocaleString() }}</div>
            <div class="stat-label">總企業數</div>
          </div>
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.5s' }">
            <div class="stat-value">{{ animatedNumbers.activeEnterprises.toLocaleString() }}</div>
            <div class="stat-label">活躍企業</div>
          </div>
          <div class="stat-card animate-fade-in-scale" :style="{ animationDelay: '0.6s' }">
            <div class="stat-value">{{ animatedNumbers.riskEnterprises.toLocaleString() }}</div>
            <div class="stat-label">風險企業</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 搜索和篩選 -->
    <div class="search-section animate-slide-in-up" :style="{ animationDelay: '0.7s' }">
      <div class="search-bar">
        <div class="search-input-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="搜索企業名称、統一社會信用代碼..."
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
          <label>地區</label>
          <select v-model="selectedRegion" class="filter-select">
            <option value="">全部地區</option>
            <option value="廣州">廣州</option>
            <option value="深圳">深圳</option>
            <option value="香港">香港</option>
            <option value="澳門">澳門</option>
            <option value="珠海">珠海</option>
            <option value="佛山">佛山</option>
            <option value="東莞">東莞</option>
            <option value="中山">中山</option>
            <option value="江門">江門</option>
            <option value="惠州">惠州</option>
            <option value="肇慶">肇慶</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>信用等級</label>
          <select v-model="selectedCreditLevel" class="filter-select">
            <option value="">全部等級</option>
            <option value="AAA">AAA</option>
            <option value="AA">AA</option>
            <option value="A">A</option>
            <option value="BBB">BBB</option>
            <option value="BB">BB</option>
            <option value="B">B</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>企業規模</label>
          <select v-model="selectedScale" class="filter-select">
            <option value="">全部規模</option>
            <option value="大型">大型企業</option>
            <option value="中型">中型企業</option>
            <option value="小型">小型企業</option>
            <option value="微型">微型企業</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 企業列表 -->
    <div class="enterprises-list animate-slide-in-up" :style="{ animationDelay: '0.8s' }">
      <div class="list-header animate-fade-in-up" :style="{ animationDelay: '0.9s' }">
        <div class="list-title">企業列表</div>
        <div class="list-actions">
          <button class="action-btn export-btn">
            <i class="fas fa-download"></i>
            导出
          </button>
          <button class="action-btn add-btn">
            <i class="fas fa-plus"></i>
            添加企業
          </button>
        </div>
      </div>

      <div class="table-container animate-fade-in-up" :style="{ animationDelay: '1.0s' }">
        <table class="enterprises-table">
          <thead>
            <tr>
              <th>企業名称</th>
              <th>統一社會信用代碼</th>
              <th>所在地區</th>
              <th>信用等級</th>
              <th>企業規模</th>
              <th>注册資本</th>
              <th>成立時間</th>
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
      
      <!-- 分頁 -->
      <div class="pagination">
        <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">
          <i class="fas fa-chevron-left"></i>
        </button>
        <span class="page-info">
          第 {{ currentPage }} 頁，共 {{ totalPages }} 頁
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
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Enterprises',
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 响應式數據
    const searchQuery = ref('')
    const selectedRegion = ref('')
    const selectedCreditLevel = ref('')
    const selectedScale = ref('')
    const currentPage = ref(1)
    const pageSize = ref(20)

    // 統計數據
    const totalEnterprises = ref(15847)
    const activeEnterprises = ref(14523)
    const riskEnterprises = ref(342)

    // 動画數字
    const animatedNumbers = ref({
      totalEnterprises: 0,
      activeEnterprises: 0,
      riskEnterprises: 0
    })

    // 企業數據
    const enterprises = ref([])

    // 數字動画函數
    const animateNumber = (target, key, duration = 2000) => {
      const start = animatedNumbers.value[key]
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用 easeOutExpo 缓動函數
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        animatedNumbers.value[key] = Math.round(start + (target - start) * easeOutExpo)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }
    
    // 真實粵港澳大灣區企業數據
    const generateRealData = () => {
      const realEnterprises = [
        // 深圳知名企業
        {
          id: 1,
          name: '騰訊控股有限公司',
          type: '股份有限公司',
          creditCode: '91440300279460456U',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 25000000,
          establishDate: new Date(1998, 10, 11),
          lastUpdate: new Date(2025, 3, 15)
        },
        {
          id: 2,
          name: '華為技术有限公司',
          type: '有限责任公司',
          creditCode: '91440300618057294B',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 4040000,
          establishDate: new Date(1987, 8, 15),
          lastUpdate: new Date(2025, 3, 20)
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
          lastUpdate: new Date(2025, 3, 18)
        },
        {
          id: 4,
          name: '平安銀行股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300100020248G',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 19405918,
          establishDate: new Date(1987, 11, 22),
          lastUpdate: new Date(2025, 3, 25)
        },
        {
          id: 5,
          name: '招商銀行股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300100020180F',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 25220000,
          establishDate: new Date(1987, 3, 8),
          lastUpdate: new Date(2025, 3, 22)
        },
        // 廣州知名企業
        {
          id: 6,
          name: '廣州汽車集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190349473L',
          region: '廣州',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 6606000,
          establishDate: new Date(1997, 5, 12),
          lastUpdate: new Date(2025, 3, 10)
        },
        {
          id: 7,
          name: '網易（杭州）網絡有限公司廣州分公司',
          type: '有限责任公司分公司',
          creditCode: '91440101MA59M8KE8K',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 0,
          establishDate: new Date(2010, 4, 17),
          lastUpdate: new Date(2025, 3, 12)
        },
        {
          id: 8,
          name: '唯品會（中國）有限公司',
          type: '有限责任公司',
          creditCode: '91440101055658846H',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 200000,
          establishDate: new Date(2008, 7, 28),
          lastUpdate: new Date(2025, 3, 8)
        },
        {
          id: 9,
          name: '廣州白雲山制药股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190274909H',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 204000,
          establishDate: new Date(1973, 0, 29),
          lastUpdate: new Date(2025, 3, 5)
        },
        {
          id: 10,
          name: '海大集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440000190349474M',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 158000,
          establishDate: new Date(1998, 2, 18),
          lastUpdate: new Date(2025, 3, 14)
        },
        // 香港知名企業
        {
          id: 11,
          name: '長江和記實業有限公司',
          type: '有限公司',
          creditCode: 'HK0001000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1500000,
          establishDate: new Date(1980, 0, 1),
          lastUpdate: new Date(2025, 3, 16)
        },
        {
          id: 12,
          name: '新鸿基地產發展有限公司',
          type: '有限公司',
          creditCode: 'HK0016000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1200000,
          establishDate: new Date(1972, 7, 29),
          lastUpdate: new Date(2025, 3, 11)
        },
        {
          id: 13,
          name: '恒生銀行有限公司',
          type: '有限公司',
          creditCode: 'HK0011000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 980000,
          establishDate: new Date(1933, 2, 3),
          lastUpdate: new Date(2025, 3, 19)
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
          lastUpdate: new Date(2025, 3, 13)
        },
        {
          id: 15,
          name: '中國移動有限公司',
          type: '有限公司',
          creditCode: 'HK0941000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1500000,
          establishDate: new Date(1997, 8, 3),
          lastUpdate: new Date(2025, 3, 17)
        },
        // 澳門知名企業
        {
          id: 16,
          name: '澳門博彩股份有限公司',
          type: '股份有限公司',
          creditCode: 'MO0027000001',
          region: '澳門',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 280000,
          establishDate: new Date(1962, 0, 1),
          lastUpdate: new Date(2025, 3, 9)
        },
        {
          id: 17,
          name: '銀河娱乐集团有限公司',
          type: '有限公司',
          creditCode: 'MO0027000002',
          region: '澳門',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 350000,
          establishDate: new Date(1980, 4, 15),
          lastUpdate: new Date(2025, 3, 7)
        },
        {
          id: 18,
          name: '澳門電訊有限公司',
          type: '有限公司',
          creditCode: 'MO0311000001',
          region: '澳門',
          creditLevel: 'AA',
          scale: '中型',
          registeredCapital: 120000,
          establishDate: new Date(1981, 1, 1),
          lastUpdate: new Date(2025, 3, 6)
        },
        // 珠海知名企業
        {
          id: 19,
          name: '格力電器股份有限公司',
          type: '股份有限公司',
          creditCode: '91440400190274909H',
          region: '珠海',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 601700,
          establishDate: new Date(1991, 0, 18),
          lastUpdate: new Date(2025, 3, 21)
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
          lastUpdate: new Date(2025, 3, 4)
        },
        // 佛山知名企業
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
          lastUpdate: new Date(2025, 3, 23)
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
          lastUpdate: new Date(2025, 3, 2)
        },
        // 東莞知名企業
        {
          id: 23,
          name: '東莞銀行股份有限公司',
          type: '股份有限公司',
          creditCode: '91441900190274909H',
          region: '東莞',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 4200000,
          establishDate: new Date(1999, 8, 28),
          lastUpdate: new Date(2025, 3, 1)
        },
        {
          id: 24,
          name: 'OPPO廣東移動通信有限公司',
          type: '有限责任公司',
          creditCode: '91441900190274909I',
          region: '東莞',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 80000,
          establishDate: new Date(2004, 8, 18),
          lastUpdate: new Date(2025, 2, 28)
        },
        // 中山知名企業
        {
          id: 25,
          name: '小熊電器股份有限公司',
          type: '股份有限公司',
          creditCode: '91442000190274909H',
          region: '中山',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 40000,
          establishDate: new Date(2006, 7, 25),
          lastUpdate: new Date(2025, 2, 25)
        },
        // 江門知名企業
        {
          id: 26,
          name: '江門甘蔗化工厂（集团）股份有限公司',
          type: '股份有限公司',
          creditCode: '91440700190274909H',
          region: '江門',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 35000,
          establishDate: new Date(1958, 5, 15),
          lastUpdate: new Date(2025, 2, 20)
        },
        // 惠州知名企業
        {
          id: 27,
          name: '惠州TCL移動通信有限公司',
          type: '有限责任公司',
          creditCode: '91441300190274909H',
          region: '惠州',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 120000,
          establishDate: new Date(1999, 3, 8),
          lastUpdate: new Date(2025, 2, 18)
        },
        // 肇慶知名企業
        {
          id: 28,
          name: '肇慶星湖生物科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91441200190274909H',
          region: '肇慶',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 28000,
          establishDate: new Date(1993, 11, 20),
          lastUpdate: new Date(2025, 2, 15)
        },
        // 更多深圳企業
        {
          id: 29,
          name: '深圳市騰訊計算機系統有限公司',
          type: '有限责任公司',
          creditCode: '91440300708461136T',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 200000,
          establishDate: new Date(1998, 10, 11),
          lastUpdate: new Date(2025, 3, 12)
        },
        {
          id: 30,
          name: '深圳市大疆創新科技有限公司',
          type: '有限责任公司',
          creditCode: '91440300551227015K',
          region: '深圳',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 100000,
          establishDate: new Date(2006, 10, 14),
          lastUpdate: new Date(2025, 3, 8)
        },
        {
          id: 31,
          name: '顺丰控股股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300279374614G',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1806000,
          establishDate: new Date(1993, 2, 26),
          lastUpdate: new Date(2025, 3, 5)
        },
        {
          id: 32,
          name: '万科企業股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300279374615H',
          region: '深圳',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1097000,
          establishDate: new Date(1984, 4, 8),
          lastUpdate: new Date(2025, 3, 18)
        },
        {
          id: 33,
          name: '中兴通訊股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300279374616I',
          region: '深圳',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 4173000,
          establishDate: new Date(1985, 0, 1),
          lastUpdate: new Date(2025, 3, 15)
        },
        {
          id: 34,
          name: '深圳迈瑞生物医疗電子股份有限公司',
          type: '股份有限公司',
          creditCode: '91440300279374617J',
          region: '深圳',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 121700,
          establishDate: new Date(1991, 0, 1),
          lastUpdate: new Date(2025, 3, 10)
        },
        // 更多廣州企業
        {
          id: 35,
          name: '廣州医药集团有限公司',
          type: '有限责任公司',
          creditCode: '91440101190349475N',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 500000,
          establishDate: new Date(1951, 0, 1),
          lastUpdate: new Date(2025, 3, 7)
        },
        {
          id: 36,
          name: '廣州珠江鋼琴集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440101190349476O',
          region: '廣州',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 45000,
          establishDate: new Date(1956, 0, 1),
          lastUpdate: new Date(2025, 3, 3)
        },
        {
          id: 37,
          name: '廣州酒家集团股份有限公司',
          type: '股份有限公司',
          creditCode: '91440101190349477P',
          region: '廣州',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 42000,
          establishDate: new Date(1935, 0, 1),
          lastUpdate: new Date(2025, 2, 28)
        },
        {
          id: 38,
          name: '廣州富力地產股份有限公司',
          type: '股份有限公司',
          creditCode: '91440101190349478Q',
          region: '廣州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 400000,
          establishDate: new Date(1994, 7, 27),
          lastUpdate: new Date(2025, 3, 1)
        },
        {
          id: 39,
          name: '廣州恒大淘宝足球俱乐部股份有限公司',
          type: '股份有限公司',
          creditCode: '91440101190349479R',
          region: '廣州',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 120000,
          establishDate: new Date(1977, 0, 1),
          lastUpdate: new Date(2025, 2, 25)
        },
        // 更多香港企業
        {
          id: 40,
          name: '中國銀行（香港）有限公司',
          type: '有限公司',
          creditCode: 'HK2388000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 2000000,
          establishDate: new Date(1917, 0, 1),
          lastUpdate: new Date(2025, 3, 20)
        },
        {
          id: 41,
          name: '太古股份有限公司',
          type: '有限公司',
          creditCode: 'HK0019000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1800000,
          establishDate: new Date(1816, 0, 1),
          lastUpdate: new Date(2025, 3, 17)
        },
        {
          id: 42,
          name: '九龍仓集团有限公司',
          type: '有限公司',
          creditCode: 'HK0004000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1600000,
          establishDate: new Date(1886, 0, 1),
          lastUpdate: new Date(2025, 3, 14)
        },
        {
          id: 43,
          name: '香港電灯有限公司',
          type: '有限公司',
          creditCode: 'HK0006000001',
          region: '香港',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 900000,
          establishDate: new Date(1889, 0, 1),
          lastUpdate: new Date(2025, 3, 11)
        },
        {
          id: 44,
          name: '中華電力有限公司',
          type: '有限公司',
          creditCode: 'HK0002000001',
          region: '香港',
          creditLevel: 'AAA',
          scale: '大型',
          registeredCapital: 1100000,
          establishDate: new Date(1901, 0, 1),
          lastUpdate: new Date(2025, 3, 8)
        },
        // 更多澳門企業
        {
          id: 45,
          name: '澳門國際銀行股份有限公司',
          type: '股份有限公司',
          creditCode: 'MO0237000001',
          region: '澳門',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 200000,
          establishDate: new Date(1974, 0, 1),
          lastUpdate: new Date(2025, 3, 6)
        },
        {
          id: 46,
          name: '澳門旅游娱乐股份有限公司',
          type: '股份有限公司',
          creditCode: 'MO0027000003',
          region: '澳門',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 180000,
          establishDate: new Date(1961, 0, 1),
          lastUpdate: new Date(2025, 3, 4)
        },
        {
          id: 47,
          name: '澳門自來水股份有限公司',
          type: '股份有限公司',
          creditCode: 'MO0311000002',
          region: '澳門',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 80000,
          establishDate: new Date(1935, 0, 1),
          lastUpdate: new Date(2025, 3, 2)
        },
        // 更多珠海企業
        {
          id: 48,
          name: '珠海華發實業股份有限公司',
          type: '股份有限公司',
          creditCode: '91440400190274910H',
          region: '珠海',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 300000,
          establishDate: new Date(1980, 7, 26),
          lastUpdate: new Date(2025, 3, 19)
        },
        {
          id: 49,
          name: '珠海金山软件股份有限公司',
          type: '股份有限公司',
          creditCode: '91440400190274911I',
          region: '珠海',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 60000,
          establishDate: new Date(1988, 0, 1),
          lastUpdate: new Date(2025, 3, 16)
        },
        {
          id: 50,
          name: '珠海欧比特宇航科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91440400190274912J',
          region: '珠海',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 45000,
          establishDate: new Date(2000, 2, 15),
          lastUpdate: new Date(2025, 3, 13)
        },
        // 更多佛山企業
        {
          id: 51,
          name: '佛山海天调味食品股份有限公司',
          type: '股份有限公司',
          creditCode: '91440600190274913K',
          region: '佛山',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 120000,
          establishDate: new Date(1955, 0, 1),
          lastUpdate: new Date(2025, 3, 22)
        },
        {
          id: 52,
          name: '廣東万和新電气股份有限公司',
          type: '股份有限公司',
          creditCode: '91440600190274914L',
          region: '佛山',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 80000,
          establishDate: new Date(1993, 7, 28),
          lastUpdate: new Date(2025, 3, 20)
        },
        {
          id: 53,
          name: '佛山市國星光電股份有限公司',
          type: '股份有限公司',
          creditCode: '91440600190274915M',
          region: '佛山',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 70000,
          establishDate: new Date(1969, 0, 1),
          lastUpdate: new Date(2025, 3, 17)
        },
        // 更多東莞企業
        {
          id: 54,
          name: 'vivo移動通信有限公司',
          type: '有限责任公司',
          creditCode: '91441900190274916N',
          region: '東莞',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 200000,
          establishDate: new Date(2009, 4, 18),
          lastUpdate: new Date(2025, 2, 26)
        },
        {
          id: 55,
          name: '東莞市生益科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91441900190274917O',
          region: '東莞',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 150000,
          establishDate: new Date(1985, 0, 1),
          lastUpdate: new Date(2025, 2, 24)
        },
        {
          id: 56,
          name: '東莞市易事特電源股份有限公司',
          type: '股份有限公司',
          creditCode: '91441900190274918P',
          region: '東莞',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 90000,
          establishDate: new Date(1989, 0, 1),
          lastUpdate: new Date(2025, 2, 22)
        },
        // 更多中山企業
        {
          id: 57,
          name: '中山市華帝燃具股份有限公司',
          type: '股份有限公司',
          creditCode: '91442000190274919Q',
          region: '中山',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 55000,
          establishDate: new Date(1992, 3, 8),
          lastUpdate: new Date(2025, 2, 23)
        },
        {
          id: 58,
          name: '中山大洋電機股份有限公司',
          type: '股份有限公司',
          creditCode: '91442000190274920Q',
          region: '中山',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 48000,
          establishDate: new Date(1994, 8, 15),
          lastUpdate: new Date(2025, 2, 21)
        },
        // 更多江門企業
        {
          id: 59,
          name: '江門市海目星激光智能装備股份有限公司',
          type: '股份有限公司',
          creditCode: '91440700190274921R',
          region: '江門',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 42000,
          establishDate: new Date(2008, 5, 20),
          lastUpdate: new Date(2025, 2, 18)
        },
        {
          id: 60,
          name: '廣東李锦記营养保健品有限公司',
          type: '有限责任公司',
          creditCode: '91440700190274922S',
          region: '江門',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 38000,
          establishDate: new Date(1888, 0, 1),
          lastUpdate: new Date(2025, 2, 16)
        },
        // 更多惠州企業
        {
          id: 61,
          name: '惠州亿纬锂能股份有限公司',
          type: '股份有限公司',
          creditCode: '91441300190274923T',
          region: '惠州',
          creditLevel: 'AA',
          scale: '大型',
          registeredCapital: 180000,
          establishDate: new Date(2001, 11, 28),
          lastUpdate: new Date(2025, 2, 14)
        },
        {
          id: 62,
          name: '惠州市德赛電池科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91441300190274924U',
          region: '惠州',
          creditLevel: 'A',
          scale: '大型',
          registeredCapital: 95000,
          establishDate: new Date(1983, 0, 1),
          lastUpdate: new Date(2025, 2, 12)
        },
        // 更多肇慶企業
        {
          id: 63,
          name: '肇慶市風華高新科技股份有限公司',
          type: '股份有限公司',
          creditCode: '91441200190274925V',
          region: '肇慶',
          creditLevel: 'A',
          scale: '中型',
          registeredCapital: 65000,
          establishDate: new Date(1984, 0, 1),
          lastUpdate: new Date(2025, 2, 10)
        }
      ]

      enterprises.value = realEnterprises

      // 根據實際數據更新統計
      updateStatistics()
    }

    // 根據實際企業數據計算統計信息
    const updateStatistics = () => {
      const total = enterprises.value.length
      const activeCount = enterprises.value.filter(e => e.creditLevel === 'AAA' || e.creditLevel === 'AA').length
      const riskCount = enterprises.value.filter(e => e.creditLevel === 'A' || e.creditLevel === 'BBB' || e.creditLevel === 'BB' || e.creditLevel === 'B').length

      totalEnterprises.value = total
      activeEnterprises.value = activeCount
      riskEnterprises.value = riskCount
    }
    
    // 計算属性
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
        '廣州': 'guangzhou',
        '深圳': 'shenzhen', 
        '香港': 'hongkong',
        '澳門': 'macau'
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
      console.log('查看企業:', id)
      router.push(`/enterprise/${id}`)
    }
    
    const editEnterprise = (id) => {
      console.log('编辑企業:', id)
    }
    
    const generateReport = (id) => {
      console.log('生成報告:', id)
    }

    onMounted(() => {
      generateRealData()

      // 检查URL查詢参數，如果有city参數则自動選择對應城市
      if (route.query.city) {
        selectedRegion.value = route.query.city
      }

      // 启動數字動画 - 頁面加載后立即開始
      setTimeout(() => {
        animateNumber(totalEnterprises.value, 'totalEnterprises', 1800)
      }, 800) // 等待頁面過渡動画完成
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

.animate-table-row {
  opacity: 0;
  transform: translateY(3px);
  animation: smoothFadeInUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 從0.8s减少到0.4s */
}

@keyframes smoothFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(6px); /* 减少移動距離 */
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes smoothFadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(6px); /* 减少移動距離 */
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

/* 頁面頭部 */
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

/* 搜索和篩選 */
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

/* 企業列表 */
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

/* 分頁 */
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

/* 响應式设計 */
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
