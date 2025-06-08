<template>
  <div class="fintech-loader" v-if="loading">
    <div class="loader-background"></div>
    <div class="loader-content">
      <!-- 主要加载动画 -->
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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
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
      
      <!-- 加载文本 -->
      <div class="loader-text">
        <h3 class="loading-title">{{ loadingText }}</h3>
        <p class="loading-subtitle">正在连接区块链网络...</p>
      </div>
      
      <!-- 数据流动效果 -->
      <div class="data-flow-container">
        <div class="data-stream" v-for="n in 6" :key="n" :style="getStreamStyle(n)">
          <div class="stream-particle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'FinTechLoader',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 1800 // 从3000ms减少到1800ms
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const loadingText = ref('粤港澳大湾区跨境征信服务平台')

    let textInterval = null
    
    const loadingTexts = [
      '粤港澳大湾区跨境征信服务平台',
      '初始化区块链网络...',
      '连接Fabric链节点...',
      '连接BCOS链节点...',
      '同步跨链数据...',
      '加载完成'
    ]
    
    const getStreamStyle = (index) => {
      const angle = (index - 1) * 60
      const delay = (index - 1) * 0.2
      
      return {
        transform: `rotate(${angle}deg)`,
        animationDelay: `${delay}s`
      }
    }
    
    const startLoading = () => {
      // 文本切换动画 - 加快速度
      let textIndex = 0
      textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
          textIndex++
          loadingText.value = loadingTexts[textIndex]
        }
      }, props.duration / loadingTexts.length)

      // 完成回调
      setTimeout(() => {
        loadingText.value = loadingTexts[loadingTexts.length - 1]
        setTimeout(() => {
          emit('complete')
        }, 300) // 从500ms减少到300ms
      }, props.duration)
    }
    
    onMounted(() => {
      if (props.loading) {
        startLoading()
      }
    })
    
    onUnmounted(() => {
      if (textInterval) clearInterval(textInterval)
    })

    return {
      loadingText,
      getStreamStyle
    }
  }
}
</script>

<style scoped>
.fintech-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(10, 15, 28, 0.95) 0%,
    rgba(15, 20, 25, 0.95) 50%,
    rgba(10, 15, 28, 0.95) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.loader-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  z-index: 1;
}

/* 主要加载动画 */
.main-loader {
  position: relative;
  width: 200px;
  height: 200px;
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
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  animation: ringProgress 2s ease-in-out infinite;
}

@keyframes ringProgress {
  0% {
    stroke-dashoffset: 283;
  }
  50% {
    stroke-dashoffset: 70;
  }
  100% {
    stroke-dashoffset: 283;
  }
}

.center-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  color: #00d4ff;
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
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
  top: 50%;
  left: 50%;
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 50%;
  animation: orbitRotate linear infinite;
}

.orbit-1 {
  width: 140px;
  height: 140px;
  margin: -70px 0 0 -70px;
  animation-duration: 8s;
}

.orbit-2 {
  width: 170px;
  height: 170px;
  margin: -85px 0 0 -85px;
  animation-duration: 12s;
  animation-direction: reverse;
}

.orbit-3 {
  width: 200px;
  height: 200px;
  margin: -100px 0 0 -100px;
  animation-duration: 16s;
}

@keyframes orbitRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.orbit-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #00d4ff;
  border-radius: 50%;
  box-shadow: 0 0 10px #00d4ff;
  animation: dotPulse 1s ease-in-out infinite;
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

/* 加载文本 */
.loader-text {
  text-align: center;
  max-width: 400px;
}

.loading-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #00d4ff, #0099ff, #0066ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: titleGlow 2s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

/* 进度条样式已移除 */

.loading-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  animation: subtitleFade 2s ease-in-out infinite;
}

@keyframes subtitleFade {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
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
  width: 150px;
  height: 2px;
  transform-origin: 0 50%;
  animation: streamRotate 4s linear infinite;
}

.stream-particle {
  position: absolute;
  top: 50%;
  right: 0;
  width: 4px;
  height: 4px;
  background: #00d4ff;
  border-radius: 50%;
  transform: translateY(-50%);
  animation: particleMove 2s ease-in-out infinite;
  box-shadow: 0 0 8px #00d4ff;
}

@keyframes streamRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes particleMove {
  0% {
    right: 0;
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    right: 150px;
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-loader {
    width: 150px;
    height: 150px;
  }
  
  .loading-title {
    font-size: 1.2rem;
  }
  
  .data-flow-container {
    width: 250px;
    height: 250px;
  }
}
</style>
