<template>
  <div class="secondary-page-loader" v-if="loading">
    <!-- 动态背景 -->
    <div class="loader-background">
      <div class="bg-gradient bg-gradient-1"></div>
      <div class="bg-gradient bg-gradient-2"></div>
      <div class="bg-gradient bg-gradient-3"></div>
      <div class="loading-particles">
        <div class="particle" v-for="n in 30" :key="n" :style="getParticleStyle()"></div>
      </div>
    </div>

    <!-- 主要内容 -->
    <div class="loader-content">
      <!-- 中心加载动画 -->
      <div class="main-loader">
        <!-- 中心圆环 -->
        <div class="center-ring">
          <svg class="ring-svg" viewBox="0 0 100 100">
            <circle 
              class="ring-track" 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="rgba(0, 212, 255, 0.1)" 
              stroke-width="2"
            />
            <circle 
              class="ring-progress" 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#progressGradient)" 
              stroke-width="3"
              stroke-linecap="round"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference - (progress / 100) * circumference"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
                <stop offset="50%" style="stop-color:#0099ff;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#0066ff;stop-opacity:1" />
              </linearGradient>
            </defs>
          </svg>
          
          <!-- 中心图标 -->
          <div class="center-icon">
            <i :class="pageIcon"></i>
          </div>
        </div>
        
        <!-- 外围轨道 -->
        <div class="orbit-container">
          <div class="orbit orbit-1">
            <div class="orbit-dot dot-1"></div>
            <div class="orbit-dot dot-2"></div>
            <div class="orbit-dot dot-3"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="orbit-dot dot-4"></div>
            <div class="orbit-dot dot-5"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="orbit-dot dot-6"></div>
          </div>
        </div>
      </div>

      <!-- 文字内容 -->
      <div class="loader-text-content">
        <h1 class="loading-title">
          <span class="title-char" v-for="(char, index) in titleChars" :key="index" :style="{ animationDelay: index * 0.1 + 's' }">
            {{ char }}
          </span>
        </h1>
        <p class="loading-subtitle">{{ pageSubtitle }}</p>
      </div>

      <!-- 高级进度条 -->
      <div class="progress-container">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          <div class="progress-glow" :style="{ left: progress + '%' }"></div>
        </div>
        <div class="progress-text">{{ Math.round(progress) }}%</div>
      </div>

      <!-- 加载状态文本 -->
      <div class="loading-status">
        <div class="status-text">{{ loadingText }}</div>
        <div class="status-dots">
          <span class="dot" v-for="n in 3" :key="n"></span>
        </div>
      </div>
    </div>

    <!-- 数据流动效果 -->
    <div class="data-flow-container">
      <div class="data-stream" v-for="n in 6" :key="n" :style="getStreamStyle(n)">
        <div class="stream-particle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'SecondaryPageLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    pageName: {
      type: String,
      default: '页面'
    },
    pageIcon: {
      type: String,
      default: 'fas fa-cog'
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const progress = ref(0)
    const loadingText = ref('初始化系统...')
    const circumference = 2 * Math.PI * 45

    // 根据页面名称设置不同的加载阶段
    const loadingStages = computed(() => {
      const baseStages = {
        '企业管理': [
          '初始化企业管理系统...',
          '连接企业数据库...',
          '加载企业信息...',
          '同步征信数据...',
          '渲染企业列表...',
          '加载完成'
        ],
        '企业详情': [
          '初始化企业详情...',
          '获取企业基本信息...',
          '加载财务数据...',
          '分析风险指标...',
          '生成信用报告...',
          '加载完成'
        ],
        '报告详情': [
          '初始化报告系统...',
          '解析报告数据...',
          '加载图表组件...',
          '渲染数据可视化...',
          '优化显示效果...',
          '加载完成'
        ]
      }
      
      return baseStages[props.pageName] || [
        '初始化系统...',
        '连接数据库...',
        '加载数据...',
        '渲染界面...',
        '优化性能...',
        '加载完成'
      ]
    })

    const titleChars = computed(() => {
      return `正在加载${props.pageName}`.split('')
    })

    const pageSubtitle = computed(() => {
      const subtitles = {
        '企业管理': '粤港澳大湾区企业征信管理平台',
        '企业详情': '企业信用信息详细分析',
        '报告详情': '专业信用评估报告'
      }
      return subtitles[props.pageName] || '跨境征信服务平台'
    })

    let progressInterval = null
    let textInterval = null

    const getParticleStyle = () => {
      return {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        width: Math.random() * 4 + 2 + 'px',
        height: Math.random() * 4 + 2 + 'px',
        animationDelay: Math.random() * 8 + 's',
        animationDuration: Math.random() * 4 + 6 + 's'
      }
    }

    const getStreamStyle = (index) => {
      const angle = (index - 1) * 60
      const delay = (index - 1) * 0.2
      
      return {
        transform: `rotate(${angle}deg)`,
        animationDelay: `${delay}s`
      }
    }

    const startLoading = () => {
      // 进度条动画
      let currentStage = 0
      progressInterval = setInterval(() => {
        progress.value += Math.random() * 20 + 10

        if (progress.value >= 100) {
          progress.value = 100
          loadingText.value = loadingStages.value[loadingStages.value.length - 1]
          clearInterval(progressInterval)

          setTimeout(() => {
            emit('complete')
          }, 300)
        } else {
          // 更新加载文本
          const stageIndex = Math.floor((progress.value / 100) * (loadingStages.value.length - 1))
          if (stageIndex !== currentStage && stageIndex < loadingStages.value.length - 1) {
            currentStage = stageIndex
            loadingText.value = loadingStages.value[stageIndex]
          }
        }
      }, 120)
    }

    onMounted(() => {
      if (props.loading) {
        startLoading()
      }
    })

    onUnmounted(() => {
      if (progressInterval) clearInterval(progressInterval)
      if (textInterval) clearInterval(textInterval)
    })

    return {
      progress,
      loadingText,
      circumference,
      titleChars,
      pageSubtitle,
      getParticleStyle,
      getStreamStyle
    }
  }
}
</script>

<style scoped>
.secondary-page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  overflow: hidden;
}

/* 动态背景 */
.loader-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(ellipse at center, #1a1f36 0%, #0a0f1c 70%);
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

@keyframes gradientMove1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -30px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}

@keyframes gradientMove2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-40px, -20px) scale(1.2); }
}

@keyframes gradientMove3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, 30px) scale(0.8); }
  75% { transform: translate(-30px, -10px) scale(1.1); }
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

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* 主要内容 */
.loader-content {
  position: relative;
  z-index: 10;
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 2rem;
}

/* 主要加载动画 */
.main-loader {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
}

.center-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.ring-progress {
  transition: stroke-dashoffset 0.3s ease;
  filter: drop-shadow(0 0 8px rgba(0, 212, 255, 0.6));
}

.center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: #00d4ff;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 1;
  }
}

/* 轨道系统 */
.orbit-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.orbit {
  position: absolute;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;
  animation: orbitRotate linear infinite;
}

.orbit-1 {
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 8s;
}

.orbit-2 {
  width: 150px;
  height: 150px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 12s;
  animation-direction: reverse;
}

.orbit-3 {
  width: 180px;
  height: 180px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-duration: 16s;
}

@keyframes orbitRotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00d4ff;
  animation: dotPulse 2s ease-in-out infinite;
}

.dot-1 { top: 0; left: 50%; transform: translateX(-50%); }
.dot-2 { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 0.3s; }
.dot-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.6s; }
.dot-4 { top: 0; left: 50%; transform: translateX(-50%); background: #10b981; box-shadow: 0 0 10px #10b981; }
.dot-5 { bottom: 0; left: 50%; transform: translateX(-50%); background: #10b981; box-shadow: 0 0 10px #10b981; animation-delay: 0.5s; }
.dot-6 { top: 50%; left: 0; transform: translateY(-50%); background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

/* 文字内容 */
.loader-text-content {
  margin-bottom: 2rem;
}

.loading-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #00d4ff, #0099ff, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title-char {
  display: inline-block;
  animation: charFadeIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes charFadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  animation: subtitleGlow 3s ease-in-out infinite;
}

@keyframes subtitleGlow {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* 高级进度条 */
.progress-container {
  position: relative;
  margin-bottom: 2rem;
}

.progress-track {
  position: relative;
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,
    #00d4ff 0%,
    #0099ff 50%,
    #0066ff 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
  animation: progressPulse 2s ease-in-out infinite;
}

@keyframes progressPulse {
  0%, 100% {
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
  }
  50% {
    box-shadow: 0 0 25px rgba(0, 212, 255, 0.9);
  }
}

.progress-glow {
  position: absolute;
  top: -2px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
  border-radius: 50%;
  transform: translateX(-50%);
  animation: glowMove 2s ease-in-out infinite;
}

@keyframes glowMove {
  0%, 100% {
    opacity: 0.8;
    transform: translateX(-50%) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) scale(1.2);
  }
}

.progress-text {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: bold;
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  letter-spacing: 2px;
  margin-top: 0.5rem;
}

/* 加载状态 */
.loading-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.status-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.status-dots {
  display: flex;
  gap: 0.3rem;
}

.status-dots .dot {
  width: 6px;
  height: 6px;
  background: #00d4ff;
  border-radius: 50%;
  animation: dotBounce 1.4s ease-in-out infinite both;
}

.status-dots .dot:nth-child(1) { animation-delay: -0.32s; }
.status-dots .dot:nth-child(2) { animation-delay: -0.16s; }
.status-dots .dot:nth-child(3) { animation-delay: 0s; }

@keyframes dotBounce {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 数据流动效果 */
.data-flow-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  pointer-events: none;
}

.data-stream {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 150px;
  transform-origin: bottom center;
}

.stream-particle {
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 4px;
  background: #00d4ff;
  border-radius: 50%;
  transform: translateX(-50%);
  animation: particleStream 3s linear infinite;
  box-shadow: 0 0 8px #00d4ff;
}

@keyframes particleStream {
  0% {
    top: 0;
    opacity: 0;
    transform: translateX(-50%) scale(0.5);
  }
  10% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
  100% {
    top: 150px;
    opacity: 0;
    transform: translateX(-50%) scale(0.5);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-loader {
    width: 150px;
    height: 150px;
  }

  .loading-title {
    font-size: 1.4rem;
  }

  .data-flow-container {
    width: 250px;
    height: 250px;
  }

  .loader-content {
    padding: 1rem;
  }
}</style>
