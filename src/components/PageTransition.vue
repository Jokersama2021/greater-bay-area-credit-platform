<template>
  <div class="page-transition-overlay" :class="{ 'exiting': isExiting }" v-if="isTransitioning">
    <div class="transition-background">
      <!-- 简化的数字雨背景 -->
      <div class="digital-flow-container">
        <div
          v-for="n in 25"
          :key="n"
          class="digital-char"
          :style="getDigitalCharStyle(n)"
        >
          {{ getRandomDigit() }}
        </div>
      </div>

      <!-- 单个扫描线 -->
      <div class="scan-line"></div>

      <div class="transition-content">
        <!-- 简化的加载图标 -->
        <div class="loading-icon">
          <div class="spinner"></div>
        </div>

        <!-- 简化的进度条 -->
        <div class="loading-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">{{ Math.round(progress) }}%</div>
        </div>

        <div class="transition-text">{{ currentText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'PageTransition',
  props: {
    isTransitioning: {
      type: Boolean,
      default: false
    },
    transitionText: {
      type: String,
      default: '页面加载中...'
    }
  },
  setup(props) {
    const progress = ref(0)
    const currentText = ref('')
    const isExiting = ref(false)

    const loadingStages = [
      '初始化系统...',
      '连接数据库...',
      '加载用户数据...',
      '渲染界面组件...',
      '完成加载'
    ]

    const getDigitalCharStyle = () => {
      const delay = Math.random() * 3
      const size = Math.random() * 10 + 14
      const duration = Math.random() * 2 + 3

      return {
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        fontSize: size + 'px',
        animationDelay: delay + 's',
        animationDuration: duration + 's'
      }
    }

    // 移除不需要的粒子样式函数

    const getRandomDigit = () => {
      return Math.random() > 0.5 ? '0' : '1'
    }

    watch(() => props.isTransitioning, (newVal) => {
      if (newVal) {
        isExiting.value = false
        startTransition()
      } else {
        isExiting.value = true
        // 延迟重置，让退出动画播放
        setTimeout(() => {
          resetTransition()
        }, 400)
      }
    })

    const startTransition = () => {
      progress.value = 0
      currentText.value = loadingStages[0]

      // 更平滑的进度增长
      const interval = setInterval(() => {
        progress.value += Math.random() * 12 + 8 // 减少随机性，使进度更平滑

        if (progress.value >= 100) {
          progress.value = 100
          currentText.value = loadingStages[4]
          clearInterval(interval)
        } else {
          const stageIndex = Math.floor((progress.value / 100) * (loadingStages.length - 1))
          currentText.value = loadingStages[stageIndex]
        }
      }, 60) // 更频繁的更新，使动画更流畅
    }

    const resetTransition = () => {
      progress.value = 0
      currentText.value = ''
    }

    return {
      progress,
      currentText,
      isExiting,
      getDigitalCharStyle,
      getRandomDigit
    }
  }
}
</script>

<style scoped>
.page-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: all;
  animation: overlaySlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes overlaySlideIn {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-transition-overlay.exiting {
  animation: overlaySlideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes overlaySlideOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

.transition-background {
  position: relative;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 80%, rgba(0, 122, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(90, 200, 250, 0.15) 0%, transparent 50%),
    linear-gradient(135deg,
      rgba(5, 10, 20, 0.98) 0%,
      rgba(10, 15, 30, 0.95) 50%,
      rgba(15, 25, 40, 0.98) 100%);
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.digital-flow-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}

.digital-char {
  position: absolute;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #007AFF;
  text-shadow:
    0 0 5px #007AFF,
    0 0 10px #007AFF,
    0 0 15px rgba(0, 122, 255, 0.5);
  animation: digitalFlow linear infinite;
  opacity: 0.8;
  pointer-events: none;
}

@keyframes digitalFlow {
  0% {
    transform: translateY(-50px) scale(0.8);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
    transform: translateY(0) scale(1);
  }
  90% {
    opacity: 0.8;
    transform: translateY(calc(100vh - 100px)) scale(1);
  }
  100% {
    transform: translateY(calc(100vh + 50px)) scale(0.8);
    opacity: 0;
  }
}

/* 简化的扫描线效果 */
.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(0, 122, 255, 0.6) 50%,
    transparent 100%);
  animation: scanMove 4s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(0, 122, 255, 0.4);
  top: 0;
}

@keyframes scanMove {
  0% {
    top: -2px;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.transition-content {
  position: relative;
  text-align: center;
  z-index: 10;
  max-width: 450px;
  padding: 2.5rem;
}

/* 简化的加载图标 */
.loading-icon {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 0 auto 2rem;
}

.spinner {
  width: 100%;
  height: 100%;
  border: 3px solid rgba(0, 122, 255, 0.2);
  border-top: 3px solid #007AFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  box-shadow: 0 0 20px rgba(0, 122, 255, 0.3);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.2);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,
    #007AFF 0%,
    #5AC8FA 100%);
  border-radius: 3px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
}

@keyframes progressGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
  }
  50% {
    box-shadow: 0 0 15px rgba(0, 122, 255, 0.8);
  }
}

.progress-text {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: #007AFF;
  text-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
  letter-spacing: 2px;
}

.progress-text {
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: #007AFF;
  text-shadow: 0 0 10px rgba(0, 122, 255, 0.5);
  letter-spacing: 2px;
}

.transition-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1px;
  margin-bottom: 2rem;
  animation: textFlicker 3s ease-in-out infinite;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

@keyframes textFlicker {
  0%, 100% {
    opacity: 0.9;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
  }
}

/* 数据传输线样式已移除 */
</style>