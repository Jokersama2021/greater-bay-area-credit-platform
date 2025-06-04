<template>
  <div class="animation-enhancements">
    <!-- 高级加载画面 -->
    <transition name="page-load" appear>
      <div class="premium-loading-overlay" v-if="isLoading">
        <!-- 动态背景 -->
        <div class="loading-background">
          <div class="bg-gradient bg-gradient-1"></div>
          <div class="bg-gradient bg-gradient-2"></div>
          <div class="bg-gradient bg-gradient-3"></div>
          <div class="loading-particles">
            <div class="particle" v-for="n in 30" :key="n" :style="getParticleStyle()"></div>
          </div>
        </div>

        <!-- 主要内容 -->
        <div class="loading-content">
          <!-- 3D Logo -->
          <div class="logo-3d-container">
            <div class="logo-3d">
              <div class="logo-face logo-front">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- 外圈光环 -->
                  <circle cx="60" cy="60" r="50" stroke="url(#logoGradient)" stroke-width="3" opacity="0.6" stroke-dasharray="8 4"/>
                  <!-- 中心钻石 -->
                  <path d="M60 20 L80 40 L60 60 L40 40 Z" fill="url(#diamondGradient)" opacity="0.9"/>
                  <path d="M40 40 L60 60 L60 100 L40 80 Z" fill="url(#diamondGradient2)" opacity="0.7"/>
                  <path d="M60 60 L80 40 L80 80 L60 100 Z" fill="url(#diamondGradient3)" opacity="0.8"/>
                  <!-- 中心核心 -->
                  <circle cx="60" cy="60" r="8" fill="url(#coreGradient)"/>
                  <!-- 能量线条 -->
                  <path d="M60 10 Q70 25 60 40" stroke="url(#energyGradient)" stroke-width="2" opacity="0.8" stroke-linecap="round"/>
                  <path d="M110 60 Q95 70 80 60" stroke="url(#energyGradient)" stroke-width="2" opacity="0.8" stroke-linecap="round"/>
                  <path d="M60 110 Q50 95 60 80" stroke="url(#energyGradient)" stroke-width="2" opacity="0.8" stroke-linecap="round"/>
                  <path d="M10 60 Q25 50 40 60" stroke="url(#energyGradient)" stroke-width="2" opacity="0.8" stroke-linecap="round"/>

                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                      <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="diamondGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="diamondGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                    </linearGradient>
                    <radialGradient id="coreGradient">
                      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
                    </radialGradient>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.8" />
                      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <!-- 文字内容 -->
          <div class="loading-text-content">
            <h1 class="loading-title">
              <span class="title-char" v-for="(char, index) in titleChars" :key="index" :style="{ animationDelay: index * 0.1 + 's' }">
                {{ char }}
              </span>
            </h1>
            <p class="loading-subtitle">跨境征信服务平台</p>
          </div>

          <!-- 高级进度条 -->
          <div class="progress-container">
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              <div class="progress-glow" :style="{ left: progress + '%' }"></div>
            </div>
            <div class="progress-text">{{ Math.round(progress) }}%</div>
          </div>

          <!-- 加载状态 -->
          <div class="loading-status">
            <div class="status-dots">
              <span class="dot" v-for="n in 3" :key="n"></span>
            </div>
            <span class="status-text">{{ loadingText }}</span>
          </div>
        </div>
      </div>
    </transition>

    <!-- 浮动粒子效果 -->
    <div class="floating-particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- 数据流动效果 -->
    <div class="data-streams">
      <div class="stream stream-1"></div>
      <div class="stream stream-2"></div>
      <div class="stream stream-3"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'AnimationEnhancements',
  setup() {
    const isLoading = ref(true)
    const progress = ref(0)
    const loadingText = ref('正在初始化系统...')

    // 标题字符数组
    const titleChars = computed(() => '粤港澳大湾区'.split(''))

    // 加载阶段文本
    const loadingStages = [
      '正在初始化系统...',
      '正在加载数据模块...',
      '正在连接区块链网络...',
      '正在验证安全证书...',
      '正在同步最新数据...',
      '系统准备就绪'
    ]

    onMounted(() => {
      // 快速加载动画
      let currentStage = 0
      const progressInterval = setInterval(() => {
        progress.value += Math.random() * 15 + 5

        if (progress.value >= 100) {
          progress.value = 100
          loadingText.value = loadingStages[5]
          clearInterval(progressInterval)

          // 短暂延迟后隐藏加载画面
          setTimeout(() => {
            isLoading.value = false
          }, 500)
        } else {
          // 更新加载文本
          const stageIndex = Math.floor((progress.value / 100) * (loadingStages.length - 1))
          if (stageIndex !== currentStage && stageIndex < loadingStages.length - 1) {
            currentStage = stageIndex
            loadingText.value = loadingStages[stageIndex]
          }
        }
      }, 200) // 更快的更新频率
    })

    const getParticleStyle = () => {
      const size = Math.random() * 3 + 1
      const left = Math.random() * 100
      const top = Math.random() * 100
      const animationDelay = Math.random() * 5
      const animationDuration = Math.random() * 10 + 8

      return {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`
      }
    }

    return {
      isLoading,
      progress,
      loadingText,
      titleChars,
      getParticleStyle
    }
  }
}
</script>

<style scoped>
.animation-enhancements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}

/* 高级加载画面 */
.premium-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #1a1f36 0%, #0a0f1c 70%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  pointer-events: all;
  overflow: hidden;
}

/* 动态背景 */
.loading-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.bg-gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
  mix-blend-mode: screen;
}

.bg-gradient-1 {
  background: radial-gradient(ellipse at 30% 20%,
    rgba(99, 102, 241, 0.4) 0%,
    transparent 60%);
  animation: gradientMove1 8s ease-in-out infinite;
}

.bg-gradient-2 {
  background: radial-gradient(ellipse at 70% 80%,
    rgba(139, 92, 246, 0.3) 0%,
    transparent 60%);
  animation: gradientMove2 10s ease-in-out infinite reverse;
}

.bg-gradient-3 {
  background: radial-gradient(ellipse at 50% 50%,
    rgba(6, 182, 212, 0.2) 0%,
    transparent 70%);
  animation: gradientMove3 12s ease-in-out infinite;
}

/* 加载粒子 */
.loading-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: particleFloat 8s linear infinite;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* 主要内容 */
.loading-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 2rem;
}

/* 3D Logo */
.logo-3d-container {
  perspective: 1000px;
  margin-bottom: 3rem;
}

.logo-3d {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  transform-style: preserve-3d;
  animation: logo3DRotate 4s ease-in-out infinite;
}

.logo-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.logo-front svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.6));
}

/* 文字内容 */
.loading-text-content {
  margin-bottom: 3rem;
}

.loading-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.title-char {
  display: inline-block;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #06b6d4);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: charGlow 2s ease-in-out infinite, gradientShift 3s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
}

.loading-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
  letter-spacing: 0.1em;
  animation: subtitleFade 2s ease-in-out infinite alternate;
}

/* 高级进度条 */
.progress-container {
  margin-bottom: 2rem;
}

.progress-track {
  position: relative;
  width: 300px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin: 0 auto 1rem;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4);
  background-size: 200% 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
  animation: progressShimmer 2s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.6);
}

.progress-glow {
  position: absolute;
  top: -2px;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent);
  border-radius: 50%;
  transform: translateX(-50%);
  transition: left 0.3s ease;
  animation: glowPulse 1s ease-in-out infinite;
}

.progress-text {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

/* 加载状态 */
.loading-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.status-dots {
  display: flex;
  gap: 0.5rem;
}

.status-dots .dot {
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.status-dots .dot:nth-child(1) { animation-delay: -0.32s; }
.status-dots .dot:nth-child(2) { animation-delay: -0.16s; }
.status-dots .dot:nth-child(3) { animation-delay: 0s; }

.status-text {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* 浮动粒子效果 */
.floating-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, var(--primary-color), transparent);
  border-radius: 50%;
  opacity: 0.6;
  animation: floatUp linear infinite;
}

/* 数据流动效果 */
.data-streams {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.stream {
  position: absolute;
  width: 2px;
  height: 100px;
  background: linear-gradient(to bottom, transparent, var(--primary-color), transparent);
  opacity: 0.3;
  animation: streamFlow linear infinite;
}

.stream-1 {
  left: 20%;
  animation-duration: 8s;
  animation-delay: 0s;
}

.stream-2 {
  left: 60%;
  animation-duration: 12s;
  animation-delay: 3s;
}

.stream-3 {
  left: 80%;
  animation-duration: 10s;
  animation-delay: 6s;
}

/* 动画关键帧 */
@keyframes logo3DRotate {
  0% {
    transform: rotateY(0deg) rotateX(0deg) scale(1);
  }
  25% {
    transform: rotateY(90deg) rotateX(8deg) scale(1.02);
  }
  50% {
    transform: rotateY(180deg) rotateX(0deg) scale(1.04);
  }
  75% {
    transform: rotateY(270deg) rotateX(-8deg) scale(1.02);
  }
  100% {
    transform: rotateY(360deg) rotateX(0deg) scale(1);
  }
}

@keyframes charGlow {
  0%, 100% {
    transform: translateY(0px) scale(1);
    filter: brightness(1);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
    filter: brightness(1.1);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes subtitleFade {
  0% { opacity: 0.6; }
  100% { opacity: 1; }
}

@keyframes progressShimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.6;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 0.9;
    transform: translateX(-50%) scale(1.08);
  }
}

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  40% {
    transform: scale(1.1);
    opacity: 0.9;
  }
}

@keyframes gradientMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10px, -15px) scale(1.05); }
  66% { transform: translate(-8px, 12px) scale(0.95); }
}

@keyframes gradientMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-12px, 10px) scale(1.08); }
}

@keyframes gradientMove3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(8px, -10px) scale(0.9); }
  75% { transform: translate(-5px, 8px) scale(1.05); }
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) translateX(0) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.4;
  }
  85% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100px) translateX(30px) rotate(180deg);
    opacity: 0;
  }
}

@keyframes floatUp {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.3;
  }
  85% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(-100px) rotate(180deg);
    opacity: 0;
  }
}

@keyframes streamFlow {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

/* 页面过渡动画 */
.page-load-enter-active {
  transition: all 0.5s ease-out;
}

.page-load-leave-active {
  transition: all 0.8s ease-in;
}

.page-load-enter-from {
  opacity: 0;
  transform: scale(1.1);
}

.page-load-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* 响应式适配 */
@media (max-width: 1024px) {
  .loading-content {
    padding: 1.5rem;
  }

  .logo-3d {
    width: 100px;
    height: 100px;
  }

  .loading-title {
    font-size: 2rem;
  }

  .progress-track {
    width: 250px;
  }
}

@media (max-width: 768px) {
  .premium-loading-overlay {
    padding: 1rem;
  }

  .loading-content {
    padding: 1rem;
    max-width: 400px;
  }

  .logo-3d {
    width: 80px;
    height: 80px;
  }

  .loading-title {
    font-size: 1.8rem;
  }

  .loading-subtitle {
    font-size: 1rem;
  }

  .progress-track {
    width: 200px;
    height: 4px;
  }

  .loading-particles {
    display: none; /* 移动端隐藏粒子以提升性能 */
  }
}

@media (max-width: 480px) {
  .loading-title {
    font-size: 1.5rem;
  }

  .loading-subtitle {
    font-size: 0.9rem;
  }

  .logo-3d {
    width: 60px;
    height: 60px;
  }

  .progress-track {
    width: 180px;
  }

  .bg-gradient {
    opacity: 0.4; /* 降低背景强度 */
  }
}
</style>
