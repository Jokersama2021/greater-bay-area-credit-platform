<template>
  <div class="credit-portrait">
    <!-- 信用评分圆环 -->
    <div class="credit-score-section">
      <div class="score-circle-container">
        <svg class="score-circle" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#007AFF;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#5AC8FA;stop-opacity:1" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="7"/>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="url(#scoreGradient)"
            stroke-width="7"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="strokeDashoffset"
            transform="rotate(-90 50 50)"
            class="score-progress"
          />
        </svg>
        <div class="score-content">
          <div class="score-number">{{ creditScore }}</div>
          <div class="score-level">{{ creditLevel }}</div>
        </div>
      </div>
      <div class="score-description">
        <p>综合信用评分</p>
        <span class="score-trend">较上月 +5分</span>
      </div>
    </div>

    <!-- 信用画像网格 -->
    <div class="portrait-grid">
      <div class="portrait-card" v-for="(item, index) in portraitItems" :key="index">
        <div class="card-header">
          <div class="card-icon" :style="{ background: item.gradient }">
            <svg v-if="item.title === '风险评估'" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon-svg">
              <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <i v-else :class="item.icon"></i>
          </div>
        </div>
        <div class="card-content">
          <h4 class="card-title">{{ item.title }}</h4>
          <div class="card-value" :style="{ color: item.color }">{{ item.value }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'CreditPortrait',
  setup() {
    const creditScore = ref(0)
    const targetScore = 850
    const creditLevel = ref('优秀')

    // 圆环动画计算
    const circumference = 2 * Math.PI * 40
    const strokeDashoffset = computed(() => {
      const progress = creditScore.value / 1000
      return circumference - (progress * circumference)
    })

    // 信用画像数据
    const portraitItems = ref([
      {
        title: '企业规模',
        value: '大型企业',
        icon: 'fas fa-building',
        color: '#007AFF',
        gradient: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)'
      },
      {
        title: '经营年限',
        value: '15年',
        icon: 'fas fa-calendar-alt',
        color: '#30D158',
        gradient: 'linear-gradient(135deg, #30D158 0%, #32D74B 100%)'
      },
      {
        title: '信用等级',
        value: 'AAA',
        icon: 'fas fa-medal',
        color: '#FF9500',
        gradient: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)'
      },
      {
        title: '风险评估',
        value: '低风险',
        icon: 'fas fa-shield-check',
        color: '#32D74B',
        gradient: 'linear-gradient(135deg, #32D74B 0%, #30D158 100%)'
      },
      {
        title: '跨境业务',
        value: '活跃',
        icon: 'fas fa-globe-americas',
        color: '#5AC8FA',
        gradient: 'linear-gradient(135deg, #5AC8FA 0%, #007AFF 100%)'
      },
      {
        title: '合规记录',
        value: '优秀',
        icon: 'fas fa-check-double',
        color: '#34C759',
        gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)'
      }
    ])

    // 动画函数
    const animateScore = () => {
      const duration = 2000
      const startTime = Date.now()
      const startScore = 0

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        // 使用缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        creditScore.value = Math.round(startScore + (targetScore - startScore) * easeOutQuart)

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }

    onMounted(() => {
      setTimeout(() => {
        animateScore()
      }, 500)
    })

    return {
      creditScore,
      creditLevel,
      circumference,
      strokeDashoffset,
      portraitItems
    }
  }
}
</script>

<style scoped>
.credit-portrait {
  padding: 20px;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* 信用评分圆环部分 */
.credit-score-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(90, 200, 250, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid rgba(0, 122, 255, 0.2);
}

.score-circle-container {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.score-circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.score-progress {
  transition: stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 0 8px rgba(0, 122, 255, 0.3));
}

.score-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.score-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #007AFF;
  line-height: 1;
  margin-bottom: 4px;
}

.score-level {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.score-description {
  flex: 1;
}

.score-description p {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
}

.score-trend {
  font-size: 0.9rem;
  color: #30D158;
  font-weight: 500;
}

/* 信用画像网格 */
.portrait-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.portrait-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 120px;
  display: flex;
  align-items: center;
}

.portrait-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portrait-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.portrait-card:hover::before {
  opacity: 1;
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-right: 16px;
}

.icon-svg {
  width: 24px;
  height: 24px;
  color: white;
}

.card-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.portrait-card:hover .card-icon::before {
  animation: iconShimmer 1.5s ease-in-out;
}

.portrait-card:hover .card-icon {
  transform: scale(1.05);
}



/* 卡片内容 */
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 6px 0;
  letter-spacing: 0.01em;
}

.card-value {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.02em;
}



@keyframes iconShimmer {
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



/* 响应式设计 */
@media (max-width: 768px) {
  .credit-score-section {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .score-circle-container {
    width: 70px;
    height: 70px;
  }

  .score-number {
    font-size: 1.2rem;
  }

  .portrait-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .portrait-card {
    padding: 12px;
    height: 80px;
  }

  .card-icon {
    width: 32px;
    height: 32px;
    font-size: 1rem;
  }

  .card-value {
    font-size: 1.1rem;
  }
}
</style>