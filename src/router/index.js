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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 页面过渡效果
let isTransitioning = false

router.beforeEach((to, from, next) => {
  if (from.name && to.name !== from.name) {
    // 只在从主页进入二级页面或二级页面之间切换时使用动画
    if (from.name === 'Home' && to.name !== 'Home') {
      // 从主页进入二级页面：使用页面过渡动画
      const event = new CustomEvent('page-transition-start', {
        detail: { to: to.name, from: from.name }
      })
      window.dispatchEvent(event)
    } else if (from.name !== 'Home' && to.name !== 'Home') {
      // 二级页面之间切换：使用页面过渡动画
      const event = new CustomEvent('page-transition-start', {
        detail: { to: to.name, from: from.name }
      })
      window.dispatchEvent(event)
    }
    // 返回主页时不触发任何动画，直接显示

    // 立即开始导航
    next()
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  if (from.name && to.name !== from.name) {
    // 只在有页面过渡动画时才结束动画
    if (to.name !== 'Home') {
      // 进入二级页面或二级页面之间切换：结束页面过渡动画
      setTimeout(() => {
        const event = new CustomEvent('page-transition-end')
        window.dispatchEvent(event)
      }, 1500)
    }
    // 返回主页时不需要结束任何动画
  }
})

export default router