<template>
  <div class="loading-container" :class="{ 'overlay': overlay }">
    <div class="spinner-wrapper">
      <div class="spinner" :class="sizeClass">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="loading-text" v-if="text">
        <span class="text-content">{{ text }}</span>
        <div class="dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    text: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sizeClass() {
      return `spinner-${this.size}`
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-container.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  z-index: 9999;
}

.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  position: relative;
  display: inline-block;
}

.spinner-small {
  width: 32px;
  height: 32px;
}

.spinner-medium {
  width: 48px;
  height: 48px;
}

.spinner-large {
  width: 64px;
  height: 64px;
}

.spinner-ring {
  position: absolute;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

.spinner-small .spinner-ring {
  width: 32px;
  height: 32px;
}

.spinner-medium .spinner-ring {
  width: 48px;
  height: 48px;
}

.spinner-large .spinner-ring {
  width: 64px;
  height: 64px;
}

.spinner-ring:nth-child(1) {
  border-top-color: var(--primary-color);
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: var(--secondary-color);
  animation-delay: 0.1s;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: var(--accent-color);
  animation-delay: 0.2s;
}

.spinner-ring:nth-child(4) {
  border-left-color: var(--success-color);
  animation-delay: 0.3s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.7;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

.loading-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.875rem;
  font-weight: 500;
}

.text-content {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dots {
  display: flex;
  gap: 0.25rem;
}

.dot {
  width: 4px;
  height: 4px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: bounce-dot 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

.dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes bounce-dot {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 脉冲效果变体 */
.spinner.pulse .spinner-ring {
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
}

/* 呼吸效果 */
.spinner.breathe .spinner-ring {
  animation: breathe 3s ease-in-out infinite;
}

@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}
</style>
