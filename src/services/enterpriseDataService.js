import { ref, reactive } from 'vue'

// 企業數據库
const enterpriseDatabase = [
  {
    id: 1,
    name: '騰訊控股有限公司',
    region: '深圳',
    creditScore: 950,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 27,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
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
    name: '華為技术有限公司',
    region: '深圳',
    creditScore: 920,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 38,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
    complianceRecord: '優秀',
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
    riskLevel: '低風險',
    businessYears: 30,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
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
    name: '平安銀行股份有限公司',
    region: '深圳',
    creditScore: 910,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 38,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
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
    name: '招商銀行股份有限公司',
    region: '深圳',
    creditScore: 930,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 38,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
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
    name: '廣州汽車集团股份有限公司',
    region: '廣州',
    creditScore: 850,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 28,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
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
    name: '格力電器股份有限公司',
    region: '珠海',
    creditScore: 820,
    creditLevel: 'AA',
    riskLevel: '中低風險',
    businessYears: 34,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
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
    riskLevel: '低風險',
    businessYears: 57,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
    complianceRecord: '良好',
    riskData: [25, 19, 14, 21, 18, 13],
    creditMetrics: {
      riskControl: 84,
      creditHistory: 87,
      developmentTrend: 82,
      businessStatus: 85,
      enterpriseScale: 92
    }
  },
  // 澳門地區企業
  {
    id: 11,
    name: '澳門博彩控股有限公司',
    region: '澳門',
    creditScore: 920,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 22,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
    riskData: [10, 8, 6, 9, 7, 5],
    creditMetrics: {
      riskControl: 94,
      creditHistory: 96,
      developmentTrend: 88,
      businessStatus: 93,
      enterpriseScale: 97
    }
  },
  {
    id: 12,
    name: '銀河娛樂集团有限公司',
    region: '澳門',
    creditScore: 910,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 30,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
    complianceRecord: '優秀',
    riskData: [12, 9, 7, 10, 8, 6],
    creditMetrics: {
      riskControl: 92,
      creditHistory: 94,
      developmentTrend: 86,
      businessStatus: 91,
      enterpriseScale: 96
    }
  },
  {
    id: 13,
    name: '新濠國際發展有限公司',
    region: '澳門',
    creditScore: 885,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 18,
    scale: '大型企業',
    crossBorderBusiness: '活躍',
    complianceRecord: '良好',
    riskData: [14, 11, 8, 12, 9, 7],
    creditMetrics: {
      riskControl: 89,
      creditHistory: 91,
      developmentTrend: 84,
      businessStatus: 88,
      enterpriseScale: 94
    }
  },
  {
    id: 14,
    name: '澳門電訊有限公司',
    region: '澳門',
    creditScore: 875,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 25,
    scale: '中型企業',
    crossBorderBusiness: '一般',
    complianceRecord: '優秀',
    riskData: [8, 6, 5, 7, 6, 4],
    creditMetrics: {
      riskControl: 90,
      creditHistory: 93,
      developmentTrend: 82,
      businessStatus: 87,
      enterpriseScale: 85
    }
  },
  {
    id: 15,
    name: '澳門國際機場專營股份有限公司',
    region: '澳門',
    creditScore: 890,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 28,
    scale: '中型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
    riskData: [6, 5, 4, 6, 5, 3],
    creditMetrics: {
      riskControl: 93,
      creditHistory: 95,
      developmentTrend: 85,
      businessStatus: 89,
      enterpriseScale: 88
    }
  },
  {
    id: 16,
    name: '澳門自來水股份有限公司',
    region: '澳門',
    creditScore: 860,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 35,
    scale: '中型企業',
    crossBorderBusiness: '一般',
    complianceRecord: '優秀',
    riskData: [5, 4, 3, 5, 4, 2],
    creditMetrics: {
      riskControl: 91,
      creditHistory: 94,
      developmentTrend: 80,
      businessStatus: 86,
      enterpriseScale: 82
    }
  },
  {
    id: 17,
    name: '澳門通股份有限公司',
    region: '澳門',
    creditScore: 845,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 15,
    scale: '小型企業',
    crossBorderBusiness: '活躍',
    complianceRecord: '良好',
    riskData: [7, 6, 5, 7, 6, 4],
    creditMetrics: {
      riskControl: 87,
      creditHistory: 89,
      developmentTrend: 83,
      businessStatus: 85,
      enterpriseScale: 78
    }
  },
  {
    id: 18,
    name: '澳門金沙中國有限公司',
    region: '澳門',
    creditScore: 900,
    creditLevel: 'AAA',
    riskLevel: '低風險',
    businessYears: 20,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
    riskData: [11, 9, 7, 10, 8, 6],
    creditMetrics: {
      riskControl: 91,
      creditHistory: 93,
      developmentTrend: 87,
      businessStatus: 90,
      enterpriseScale: 95
    }
  },
  // 澳門國際銀行股份有限公司
  {
    id: 45,
    name: '澳門國際銀行股份有限公司',
    region: '澳門',
    creditScore: 930,
    creditLevel: 'AA',
    riskLevel: '低風險',
    businessYears: 50,
    scale: '大型企業',
    crossBorderBusiness: '非常活躍',
    complianceRecord: '優秀',
    riskData: [5, 3, 2, 4, 3, 1],
    creditMetrics: {
      riskControl: 93,
      creditHistory: 96,
      developmentTrend: 89,
      businessStatus: 94,
      enterpriseScale: 97
    }
  }
]

// 當前選中的企業
const currentEnterprise = ref(enterpriseDatabase[0])

// 自動切换定時器
let autoSwitchTimer = null
const autoSwitchInterval = 8000 // 8秒切换一次

// 企業數據服務
export const enterpriseDataService = {
  // 获取當前企業
  getCurrentEnterprise: () => currentEnterprise.value,
  
  // 设置當前企業
  setCurrentEnterprise: (enterpriseId) => {
    const enterprise = enterpriseDatabase.find(e => e.id === enterpriseId)
    if (enterprise) {
      currentEnterprise.value = enterprise
    }
  },
  
  // 获取所有企業列表
  getAllEnterprises: () => enterpriseDatabase,
  
  // 响應式的當前企業
  currentEnterprise,
  
  // 启動自動切换
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
  
  // 停止自動切换
  stopAutoSwitch: () => {
    if (autoSwitchTimer) {
      clearInterval(autoSwitchTimer)
      autoSwitchTimer = null
    }
  },
  
  // 获取下一個企業
  getNextEnterprise: () => {
    const currentIndex = enterpriseDatabase.findIndex(e => e.id === currentEnterprise.value.id)
    const nextIndex = (currentIndex + 1) % enterpriseDatabase.length
    return enterpriseDatabase[nextIndex]
  },
  
  // 获取上一個企業
  getPreviousEnterprise: () => {
    const currentIndex = enterpriseDatabase.findIndex(e => e.id === currentEnterprise.value.id)
    const prevIndex = currentIndex === 0 ? enterpriseDatabase.length - 1 : currentIndex - 1
    return enterpriseDatabase[prevIndex]
  },
  
  // 切换到下一個企業
  switchToNext: () => {
    const nextEnterprise = enterpriseDataService.getNextEnterprise()
    currentEnterprise.value = nextEnterprise
  },
  
  // 切换到上一個企業
  switchToPrevious: () => {
    const prevEnterprise = enterpriseDataService.getPreviousEnterprise()
    currentEnterprise.value = prevEnterprise
  }
}

// 默認启動自動切换
enterpriseDataService.startAutoSwitch()

// 导出便捷函数
export const getEnterprises = () => enterpriseDatabase
export const getEnterpriseById = (id) => enterpriseDatabase.find(e => e.id === parseInt(id))
