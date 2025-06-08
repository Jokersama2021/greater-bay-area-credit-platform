<template>
  <div class="app-container min-h-screen">
    <!-- 数字雨背景 -->
    <digital-rain-background />

    <!-- 简化背景系统 -->
    <div class="background-container">
      <!-- 静态背景层 -->
      <div class="static-background"></div>
    </div>

    <!-- 顶部标题栏 -->
    <header class="header-modern">
      <div class="header-content">
        <div class="flex items-center">
          <div class="logo-modern">
            <div class="logo-icon-modern">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- 外圈代表大湾区 -->
                <circle cx="24" cy="24" r="20" stroke="currentColor" stroke-width="2" opacity="0.3"/>
                <!-- 内部三个区域代表港澳内地 -->
                <path d="M24 8 L36 20 L24 24 L12 20 Z" fill="currentColor" opacity="0.8"/>
                <path d="M12 20 L24 24 L24 36 L12 28 Z" fill="currentColor" opacity="0.6"/>
                <path d="M24 24 L36 20 L36 28 L24 36 Z" fill="currentColor" opacity="0.7"/>
                <!-- 中心连接点 -->
                <circle cx="24" cy="24" r="3" fill="currentColor"/>
                <!-- 数据流动线条 -->
                <path d="M24 4 Q30 10 24 16" stroke="currentColor" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
                <path d="M40 24 Q34 30 28 24" stroke="currentColor" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
                <path d="M24 44 Q18 38 24 32" stroke="currentColor" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
                <path d="M8 24 Q14 18 20 24" stroke="currentColor" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h1 class="logo-title">粤港澳大湾区跨境征信服务平台</h1>
          </div>
        </div>

        <div class="header-center">
          <nav class="nav-menu">
            <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
              <i class="fas fa-home"></i>
              <span>首页</span>
            </router-link>
            <router-link to="/enterprises" class="nav-link" :class="{ active: $route.path === '/enterprises' }">
              <i class="fas fa-building"></i>
              <span>企业管理</span>
            </router-link>
          </nav>
        </div>

        <div class="header-actions">
          <div class="status-indicator">
            <svg class="status-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="status-text">系统正常</span>
          </div>
          <div class="time-display">
            <svg class="time-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <polyline points="12,6 12,12 16,14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ currentTime }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 路由视图 -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- 页面过渡效果 -->
    <page-transition
      :is-transitioning="isPageTransitioning"
      :transition-text="transitionText"
    />

    <!-- 主页加载动画已移除 -->

    <!-- 地理动画控制器 -->
    <GeographicAnimationController />
  </div>
</template>

<script>
import GeographicAnimationController from './components/GeographicAnimationController.vue'
import DigitalRainBackground from './components/DigitalRainBackground.vue'
import PageTransition from './components/PageTransition.vue'
// FinTechLoader import removed

export default {
  components: {
    GeographicAnimationController,
    DigitalRainBackground,
    PageTransition
  },
  data() {
    return {
      currentTime: '',
      isPageTransitioning: false,
      transitionText: '页面加载中...'
    }
  },
  mounted() {
    this.updateTime()
    setInterval(this.updateTime, 1000)

    // 监听页面过渡事件
    window.addEventListener('page-transition-start', this.handleTransitionStart)
    window.addEventListener('page-transition-end', this.handleTransitionEnd)
  },
  beforeUnmount() {
    window.removeEventListener('page-transition-start', this.handleTransitionStart)
    window.removeEventListener('page-transition-end', this.handleTransitionEnd)
  },
  methods: {
    updateTime() {
      const now = new Date()
      this.currentTime = now.toLocaleTimeString('zh-CN', { hour12: false })
    },
    handleTransitionStart(event) {
      const { to } = event.detail
      this.isPageTransitioning = true

      // 根据目标页面设置不同的过渡文本
      const pageTexts = {
        'Home': '正在加载主页...',
        'Enterprises': '正在加载企业管理...',
        'EnterpriseDetail': '正在加载企业详情...',
        'ReportDetail': '正在加载报告详情...',
        'PartnerDetail': '正在加载合作伙伴详情...'
      }

      this.transitionText = pageTexts[to] || '页面加载中...'
    },
    handleTransitionEnd() {
      this.isPageTransitioning = false
    }
  }
}
</script>

<style>
.app-container {
  position: relative;
  background: #0a0f1c;
  color: var(--text-light);
  min-height: 100vh;
  overflow-x: hidden;
}

/* 简洁背景系统 */
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -3;
  opacity: 0.4;
}

/* 静态背景层 */
.static-background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.6) 0%,
    rgba(30, 41, 59, 0.5) 25%,
    rgba(51, 65, 85, 0.4) 50%,
    rgba(30, 41, 59, 0.5) 75%,
    rgba(15, 23, 42, 0.6) 100%
  );
}



/* 现代化头部 */
.header-modern {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-light);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .header-content {
    padding: 1rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0.75rem 1rem;
    flex-direction: column;
    gap: 1rem;
  }

  .header-center {
    order: 2;
  }

  .header-actions {
    order: 3;
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
  }

  .nav-link {
    flex: 1;
    justify-content: center;
    padding: 12px 8px;
  }

  .nav-link span {
    display: none;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0.5rem 0.75rem;
    gap: 0.75rem;
  }
}

.logo-modern {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s var(--ease-out-expo);
}

.logo-modern:hover .logo-icon-modern {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(135deg,
    #1e40af 0%,
    #3b82f6 20%,
    #06b6d4 40%,
    #10b981 60%,
    #f59e0b 80%,
    #ef4444 100%);
  box-shadow:
    0 8px 30px rgba(59, 130, 246, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(16, 185, 129, 0.3);
}

.logo-modern:hover .logo-title {
  color: var(--primary-color);
}

.logo-icon-modern {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg,
    #1e40af 0%,
    #3b82f6 25%,
    #06b6d4 50%,
    #10b981 75%,
    #f59e0b 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.4s var(--ease-out-expo);
  box-shadow:
    0 4px 20px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.logo-icon-modern::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.logo-modern:hover .logo-icon-modern::before {
  animation: logoShimmer 1.5s ease-in-out;
}

@keyframes logoShimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

.logo-icon-modern svg {
  width: 24px;
  height: 24px;
}

/* Logo动画效果 */
.logo-icon-modern svg circle:first-child {
  animation: rotate 8s linear infinite;
  transform-origin: center;
}

.logo-icon-modern svg path:nth-child(2) {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0s;
}

.logo-icon-modern svg path:nth-child(3) {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.3s;
}

.logo-icon-modern svg path:nth-child(4) {
  animation: pulse 2s ease-in-out infinite;
  animation-delay: 0.6s;
}

.logo-icon-modern svg circle:nth-child(5) {
  animation: heartbeat 1.5s ease-in-out infinite;
}

.logo-icon-modern svg path:nth-child(n+6) {
  animation: dataFlow 3s ease-in-out infinite;
}

.logo-icon-modern svg path:nth-child(6) { animation-delay: 0s; }
.logo-icon-modern svg path:nth-child(7) { animation-delay: 0.75s; }
.logo-icon-modern svg path:nth-child(8) { animation-delay: 1.5s; }
.logo-icon-modern svg path:nth-child(9) { animation-delay: 2.25s; }

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes dataFlow {
  0%, 100% { opacity: 0.3; stroke-dasharray: 0 10; }
  50% { opacity: 0.8; stroke-dasharray: 5 5; }
}

.logo-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.16667;
  letter-spacing: 0.009em;
  margin: 0;
  transition: all 0.3s var(--ease-out-expo);
}

@media (max-width: 768px) {
  .logo-title {
    font-size: 20px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .logo-title {
    font-size: 18px;
  }
}

/* 导航菜单 */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-menu {
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 6px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(90, 200, 250, 0.1) 100%);
  opacity: 0;
  transition: all 0.4s ease;
  transform: scale(0.8);
}

.nav-link::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.nav-link:hover::before,
.nav-link.active::before {
  opacity: 1;
  transform: scale(1);
}

.nav-link:hover::after {
  width: 100px;
  height: 100px;
  opacity: 0;
}

.nav-link:active {
  transform: scale(0.95);
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.95);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 122, 255, 0.2);
}

.nav-link.active {
  background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%);
  color: #ffffff;
  box-shadow:
    0 8px 25px rgba(0, 122, 255, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.nav-link i {
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.nav-link:hover i,
.nav-link.active i {
  transform: scale(1.1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .header-actions {
    gap: 1rem;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .header-actions {
    gap: 0.75rem;
    flex-direction: column;
  }
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(52, 199, 89, 0.1);
  border: 1px solid rgba(52, 199, 89, 0.2);
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.3s var(--ease-out-expo);
}

.status-indicator:hover {
  background: rgba(52, 199, 89, 0.15);
  transform: scale(1.05);
}

.status-icon {
  width: 16px;
  height: 16px;
  color: var(--success-color);
  animation: pulse 2s ease-in-out infinite;
}

.status-text {
  color: var(--success-color);
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}







.time-display {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--background-secondary);
  border: 1px solid var(--border-light);
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-secondary);
  transition: all 0.3s var(--ease-out-expo);
}

.time-display:hover {
  background: var(--background-tertiary);
  border-color: var(--border-color);
  transform: scale(1.05);
}

.time-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
}

.main-content {
  position: relative;
  z-index: 10;
}

.dashboard-card {
  background: var(--card-background);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  padding: 1.25rem;
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              0 0 0 4px rgba(124, 58, 237, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  background: linear-gradient(to right, #f0f0f0, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.card-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4338ca, #6366f1);
  color: white;
  font-size: 0.875rem;
}

.data-tile {
  background: var(--card-background);
  border-radius: 12px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
}

.data-tile:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.data-title {
  font-size: 0.75rem;
  color: #94a3b8;
}

.data-value {
  font-size: 1.5rem;
  font-weight: 600;
}

.stats-pill {
  display: flex;
  align-items: center;
  background: var(--card-background);
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
}

.stats-pill:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.stats-pill .value {
  font-weight: 600;
  margin: 0 0.25rem;
}

.stats-pill .label {
  color: #94a3b8;
}

.partner-section-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.partner-title-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e9ecef;
  margin-right: 0.75rem;
}

.partner-title-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0));
}
</style>
