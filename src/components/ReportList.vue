<template>
  <div class="report-grid">
    <router-link
      v-for="(report, index) in reports"
      :key="report.id"
      class="report-card enhanced-card-button bounce-in-card"
      :style="{ animationDelay: `${index * 0.1}s` }"
      :to="report.route"
      @click="handleCardClick"
    >
      <div class="card-background"></div>
      <div class="card-ripple"></div>
      <div class="report-icon">
        <i :class="report.icon"></i>
      </div>
      <div class="report-content">
        <h4>{{ report.title }}</h4>
        <p>{{ report.description }}</p>
      </div>
      <div class="card-glow"></div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ReportList',
  setup() {
    const reports = [
      {
        id: 1,
        title: '企業資信報告',
        description: '全面的企業信用評估報告',
        icon: 'fas fa-building',
        route: '/reports/enterprise-credit'
      },
      {
        id: 2,
        title: '資產評估報告',
        description: '企業資產詳細評估',
        icon: 'fas fa-chart-line',
        route: '/reports/asset-evaluation'
      },
      {
        id: 3,
        title: '企業評分報告',
        description: '多维度信用評分分析',
        icon: 'fas fa-star',
        route: '/reports/enterprise-rating'
      },
      {
        id: 4,
        title: '風控预警報告',
        description: '實時風險監控预警',
        icon: 'fas fa-exclamation-triangle',
        route: '/reports/risk-warning'
      }
    ]

    const handleCardClick = (event) => {
      const card = event.currentTarget
      const ripple = card.querySelector('.card-ripple')
      const rect = card.getBoundingClientRect()

      // 添加淡出動画
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      card.style.opacity = '0.6'
      card.style.transform = 'translateY(-4px) scale(0.95)'

      // 波纹效果
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'

      ripple.classList.remove('ripple-animate')
      void ripple.offsetWidth
      ripple.classList.add('ripple-animate')

      // 延迟后恢复
      setTimeout(() => {
        card.style.opacity = '1'
        card.style.transform = 'translateY(-4px) scale(1.02)'
      }, 200)
    }

    return {
      reports,
      handleCardClick
    }
  }
}
</script>

<style scoped>
.report-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

/* 弹出動画 */
.bounce-in-card {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  animation: bounceInCard 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes bounceInCard {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.enhanced-card-button {
  position: relative;
  display: block;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.card-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(0, 122, 255, 0.05) 0%,
    rgba(90, 200, 250, 0.03) 50%,
    rgba(52, 199, 89, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.card-ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  transform: scale(0);
  pointer-events: none;
}

.card-ripple.ripple-animate {
  animation: rippleEffect 0.6s ease-out;
}

@keyframes rippleEffect {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
    rgba(0, 122, 255, 0.1) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.enhanced-card-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    0 0 30px rgba(0, 122, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.2);
}

.enhanced-card-button:hover .card-background {
  opacity: 1;
}

.enhanced-card-button:hover .card-glow {
  opacity: 1;
}

.enhanced-card-button:active {
  transform: translateY(-2px) scale(0.98);
}

.report-icon {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #007AFF, #5AC8FA);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.4s ease;
  z-index: 2;
}

.report-icon i {
  font-size: 1.25rem;
  color: white;
  transition: transform 0.4s ease;
}

.enhanced-card-button:hover .report-icon {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 8px 25px rgba(0, 122, 255, 0.4);
}

.enhanced-card-button:hover .report-icon i {
  transform: scale(1.1);
}

.report-content {
  position: relative;
  z-index: 2;
}

.report-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  transition: color 0.3s ease;
}

.report-content p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
  transition: color 0.3s ease;
}

.enhanced-card-button:hover .report-content h4 {
  color: rgba(255, 255, 255, 1);
}

.enhanced-card-button:hover .report-content p {
  color: rgba(255, 255, 255, 0.8);
}

/* 响應式设計 */
@media (max-width: 768px) {
  .report-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .enhanced-card-button {
    padding: 1.25rem;
  }

  .report-icon {
    width: 40px;
    height: 40px;
  }

  .report-icon i {
    font-size: 1rem;
  }
}
</style>