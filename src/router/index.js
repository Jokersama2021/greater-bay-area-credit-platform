import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Enterprises from '../views/Enterprises.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/enterprise/:id',
    name: 'EnterpriseDetail',
    component: () => import('../views/EnterpriseDetail.vue')
  },
  {
    path: '/enterprises',
    name: 'Enterprises',
    component: Enterprises
  },
  {
    path: '/report/:id',
    name: 'ReportDetail',
    component: () => import('../views/ReportDetail.vue')
  },
  {
    path: '/partner/:id',
    name: 'PartnerDetail',
    component: () => import('../views/PartnerDetail.vue')
  },
  // 金融服务页面路由
  {
    path: '/invoice-loan',
    name: 'InvoiceLoan',
    component: () => import('../views/InvoiceLoan.vue')
  },
  {
    path: '/order-loan',
    name: 'OrderLoan',
    component: () => import('../views/OrderLoan.vue')
  },
  {
    path: '/asset-loan',
    name: 'AssetLoan',
    component: () => import('../views/AssetLoan.vue')
  },
  {
    path: '/supply-chain-finance',
    name: 'SupplyChainFinance',
    component: () => import('../views/SupplyChainFinance.vue')
  },
  {
    path: '/cross-border-settlement',
    name: 'CrossBorderSettlement',
    component: () => import('../views/CrossBorderSettlement.vue')
  },
  {
    path: '/credit-guarantee',
    name: 'CreditGuarantee',
    component: () => import('../views/CreditGuarantee.vue')
  },
  // 报告企业列表路由
  {
    path: '/reports/:type',
    name: 'ReportEnterpriseList',
    component: () => import('../views/ReportEnterpriseList.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 简化页面过渡效果 - 移除黑屏过渡
router.beforeEach((to, from, next) => {
  // 直接导航，不使用过渡动画
  next()
})

router.afterEach((to, from) => {
  // 页面切换完成后的处理
  if (from.name && to.name !== from.name) {
    // 可以在这里添加页面切换完成后的逻辑
    console.log(`页面从 ${from.name} 切换到 ${to.name}`)
  }
})

export default router