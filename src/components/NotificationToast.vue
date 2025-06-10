<template>
  <Transition name="toast" appear>
    <div class="toast-container" :class="toastClass" v-if="visible">
      <div class="toast-icon">
        <i :class="iconClass"></i>
      </div>
      <div class="toast-content">
        <h4 class="toast-title" v-if="title">{{ title }}</h4>
        <p class="toast-message">{{ message }}</p>
      </div>
      <button class="toast-close" @click="close" v-if="closable">
        <i class="fas fa-times"></i>
      </button>
      <div class="toast-progress" v-if="showProgress">
        <div class="progress-bar" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
  name: 'NotificationToast',
  props: {
    type: {
      type: String,
      default: 'info',
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 4000
    },
    closable: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(true)
    const progressWidth = ref(100)
    let timer = null
    let progressTimer = null

    const toastClass = computed(() => `toast-${props.type}`)

    const iconClass = computed(() => {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return icons[props.type]
    })

    const close = () => {
      visible.value = false
      setTimeout(() => {
        emit('close')
      }, 300)
    }

    const startTimer = () => {
      if (props.duration > 0) {
        timer = setTimeout(close, props.duration)
        
        if (props.showProgress) {
          const interval = 50
          const steps = props.duration / interval
          const decrement = 100 / steps
          
          progressTimer = setInterval(() => {
            progressWidth.value -= decrement
            if (progressWidth.value <= 0) {
              clearInterval(progressTimer)
            }
          }, interval)
        }
      }
    }

    const pauseTimer = () => {
      if (timer) {
        clearTimeout(timer)
      }
      if (progressTimer) {
        clearInterval(progressTimer)
      }
    }

    const resumeTimer = () => {
      startTimer()
    }

    onMounted(() => {
      startTimer()
    })

    onUnmounted(() => {
      if (timer) clearTimeout(timer)
      if (progressTimer) clearInterval(progressTimer)
    })

    return {
      visible,
      progressWidth,
      toastClass,
      iconClass,
      close,
      pauseTimer,
      resumeTimer
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-lg);
  min-width: 320px;
  max-width: 480px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toast-container:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-title {
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--text-light);
}

.toast-message {
  font-size: 0.8125rem;
  margin: 0;
  color: var(--text-dim);
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.75rem;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
}

.progress-bar {
  height: 100%;
  transition: width 0.05s linear;
  border-radius: 0 0 12px 12px;
}

/* 主題变体 */
.toast-success {
  background: linear-gradient(135deg, 
    rgba(16, 185, 129, 0.15) 0%, 
    rgba(16, 185, 129, 0.05) 100%);
  border-color: rgba(16, 185, 129, 0.2);
}

.toast-success .toast-icon {
  color: var(--success-color);
}

.toast-success .progress-bar {
  background: var(--success-color);
}

.toast-error {
  background: linear-gradient(135deg, 
    rgba(239, 68, 68, 0.15) 0%, 
    rgba(239, 68, 68, 0.05) 100%);
  border-color: rgba(239, 68, 68, 0.2);
}

.toast-error .toast-icon {
  color: var(--error-color);
}

.toast-error .progress-bar {
  background: var(--error-color);
}

.toast-warning {
  background: linear-gradient(135deg, 
    rgba(245, 158, 11, 0.15) 0%, 
    rgba(245, 158, 11, 0.05) 100%);
  border-color: rgba(245, 158, 11, 0.2);
}

.toast-warning .toast-icon {
  color: var(--warning-color);
}

.toast-warning .progress-bar {
  background: var(--warning-color);
}

.toast-info {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.15) 0%, 
    rgba(99, 102, 241, 0.05) 100%);
  border-color: rgba(99, 102, 241, 0.2);
}

.toast-info .toast-icon {
  color: var(--primary-color);
}

.toast-info .progress-bar {
  background: var(--primary-color);
}

/* 動画 */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%) scale(0.95);
  opacity: 0;
}
</style>
