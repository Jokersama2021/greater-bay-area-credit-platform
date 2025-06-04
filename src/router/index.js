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

export default router 