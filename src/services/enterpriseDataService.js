import { ref, reactive } from 'vue'

// 企业数据库
const enterpriseDatabase = [
  {
    id: 1,
    name: '腾讯控股有限公司',
    region: '深圳',
    creditScore: 950,
    creditLevel: 'AAA',
    riskLevel: '低风险',
    businessYears: 27,
    scale: '大型企业',
    crossBorderBusiness: '非常活跃',
    complianceRecord: '优秀',
    riskData: [12, 8, 5, 9, 7, 4],
    creditMetrics: {
      riskControl: 95,
      creditHistory: 92,
      developmentTrend: 88,
      businessStatus: 94,
      enterpriseScale: 98
    }
  },
  {
    id: 2,
    name: '华为技术有限公司',
    region: '深圳',
    creditScore: 920,
    creditLevel: 'AAA',
    riskLevel: '低风险',
    businessYears: 38,
    scale: '大型企业',
    crossBorderBusiness: '活跃',
    complianceRecord: '优秀',
    riskData: [15, 11, 8, 13, 10, 6],
    creditMetrics: {
      riskControl: 92,
      creditHistory: 95,
      developmentTrend: 85,
      businessStatus: 91,
      enterpriseScale: 97
    }
  },
  {
    id: 3,
    name: '比亚迪股份有限公司',
    region: '深圳',
    creditScore: 880,
    creditLevel: 'AAA',
    riskLevel: '低风险',
    businessYears: 30,
    scale: '大型企业',
    crossBorderBusiness: '活跃',
    complianceRecord: '良好',
    riskData: [18, 14, 11, 16, 13, 9],
    creditMetrics: {
      riskControl: 88,
      creditHistory: 87,
      developmentTrend: 92,
      businessStatus: 89,
      enterpriseScale: 94
    }
  },
  {
    id: 4,
    name: '平安银行股份有限公司',
    region: '深圳',
    creditScore: 910,
    creditLevel: 'AAA',
    riskLevel: '低风险',
    businessYears: 38,
    scale: '大型企业',
    crossBorderBusiness: '非常活跃',
    complianceRecord: '优秀',
    riskData: [10, 7, 5, 8, 6, 3],
    creditMetrics: {
      riskControl: 91,
      creditHistory: 94,
      developmentTrend: 87,
      businessStatus: 93,
      enterpriseScale: 95
    }
  },
  {
    id: 5,
    name: '招商银行股份有限公司',
    region: '深圳',
    creditScore: 930,
    creditLevel: 'AAA',
    riskLevel: '低风险',
    businessYears: 38,
    scale: '大型企业',
    crossBorderBusiness: '非常活跃',
    complianceRecord: '优秀',
    riskData: [8, 5, 3, 7, 4, 2],
    creditMetrics: {
      riskControl: 93,
      creditHistory: 96,
      developmentTrend: 89,
      businessStatus: 95,
      enterpriseScale: 97
    }
  },
  {
    id: 6,
    name: '广州汽车集团股份有限公司',
    region: '广州',
    creditScore: 850,
    creditLevel: 'AA',
    riskLevel: '低风险',
    businessYears: 28,
    scale: '大型企业',
    crossBorderBusiness: '活跃',
    complianceRecord: '良好',
    riskData: [22, 18, 15, 20, 17, 12],
    creditMetrics: {
      riskControl: 85,
      creditHistory: 83,
      developmentTrend: 88,
      businessStatus: 86,
      enterpriseScale: 90
    }
  },
  {
    id: 7,
    name: '格力电器股份有限公司',
    region: '珠海',
    creditScore: 820,
    creditLevel: 'AA',
    riskLevel: '中低风险',
    businessYears: 34,
    scale: '大型企业',
    crossBorderBusiness: '活跃',
    complianceRecord: '良好',
    riskData: [28, 22, 18, 25, 21, 16],
    creditMetrics: {
      riskControl: 82,
      creditHistory: 85,
      developmentTrend: 80,
      businessStatus: 84,
      enterpriseScale: 89
    }
  },
  {
    id: 8,
    name: '美的集团股份有限公司',
    region: '佛山',
    creditScore: 840,
    creditLevel: 'AA',
    riskLevel: '低风险',
    businessYears: 57,
    scale: '大型企业',
    crossBorderBusiness: '活跃',
    complianceRecord: '良好',
    riskData: [25, 19, 14, 21, 18, 13],
    creditMetrics: {
      riskControl: 84,
      creditHistory: 87,
      developmentTrend: 82,
      businessStatus: 85,
      enterpriseScale: 92
    }
  }
]

// 当前选中的企业
const currentEnterprise = ref(enterpriseDatabase[0])

// 自动切换定时器
let autoSwitchTimer = null
const autoSwitchInterval = 8000 // 8秒切换一次

// 企业数据服务
export const enterpriseDataService = {
  // 获取当前企业
  getCurrentEnterprise: () => currentEnterprise.value,
  
  // 设置当前企业
  setCurrentEnterprise: (enterpriseId) => {
    const enterprise = enterpriseDatabase.find(e => e.id === enterpriseId)
    if (enterprise) {
      currentEnterprise.value = enterprise
    }
  },
  
  // 获取所有企业列表
  getAllEnterprises: () => enterpriseDatabase,
  
  // 响应式的当前企业
  currentEnterprise,
  
  // 启动自动切换
  startAutoSwitch: () => {
    if (autoSwitchTimer) {
      clearInterval(autoSwitchTimer)
    }
    
    let currentIndex = 0
    autoSwitchTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % enterpriseDatabase.length
      currentEnterprise.value = enterpriseDatabase[currentIndex]
    }, autoSwitchInterval)
  },
  
  // 停止自动切换
  stopAutoSwitch: () => {
    if (autoSwitchTimer) {
      clearInterval(autoSwitchTimer)
      autoSwitchTimer = null
    }
  },
  
  // 获取下一个企业
  getNextEnterprise: () => {
    const currentIndex = enterpriseDatabase.findIndex(e => e.id === currentEnterprise.value.id)
    const nextIndex = (currentIndex + 1) % enterpriseDatabase.length
    return enterpriseDatabase[nextIndex]
  },
  
  // 获取上一个企业
  getPreviousEnterprise: () => {
    const currentIndex = enterpriseDatabase.findIndex(e => e.id === currentEnterprise.value.id)
    const prevIndex = currentIndex === 0 ? enterpriseDatabase.length - 1 : currentIndex - 1
    return enterpriseDatabase[prevIndex]
  },
  
  // 切换到下一个企业
  switchToNext: () => {
    const nextEnterprise = enterpriseDataService.getNextEnterprise()
    currentEnterprise.value = nextEnterprise
  },
  
  // 切换到上一个企业
  switchToPrevious: () => {
    const prevEnterprise = enterpriseDataService.getPreviousEnterprise()
    currentEnterprise.value = prevEnterprise
  }
}

// 默认启动自动切换
enterpriseDataService.startAutoSwitch()
