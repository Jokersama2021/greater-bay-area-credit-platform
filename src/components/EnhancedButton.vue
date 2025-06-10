<template>
  <button 
    class="enhanced-button"
    :class="[
      `btn-${variant}`,
      `btn-${size}`,
      { 
        'btn-loading': loading,
        'btn-disabled': disabled,
        'btn-icon-only': iconOnly
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="buttonRef"
  >
    <!-- 背景效果 -->
    <div class="btn-background"></div>
    
    <!-- 涟漪效果 -->
    <div class="btn-ripple" ref="rippleRef"></div>
    
    <!-- 内容 -->
    <div class="btn-content">
      <!-- 加載状态 -->
      <div v-if="loading" class="btn-loading-spinner">
        <div class="spinner-ring"></div>
      </div>
      
      <!-- 图標 -->
      <i v-if="icon && !loading" :class="icon" class="btn-icon"></i>
      
      <!-- 文字 -->
      <span v-if="!iconOnly && !loading" class="btn-text">
        <slot></slot>
      </span>
      
      <!-- 右侧图標 -->
      <i v-if="iconRight && !loading" :class="iconRight" class="btn-icon-right"></i>
    </div>
    
    <!-- 光效 -->
    <div class="btn-glow"></div>
  </button>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'EnhancedButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'ghost'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    iconRight: {
      type: String,
      default: ''
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const buttonRef = ref(null)
    const rippleRef = ref(null)

    const handleClick = (e) => {
      if (props.disabled || props.loading) return
      
      // 創建涟漪效果
      createRipple(e)
      
      emit('click', e)
    }

    const createRipple = (e) => {
      if (!buttonRef.value || !rippleRef.value) return
      
      const button = buttonRef.value
      const ripple = rippleRef.value
      const rect = button.getBoundingClientRect()
      
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2
      
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'
      
      ripple.classList.remove('ripple-animate')
      void ripple.offsetWidth // 强制重排
      ripple.classList.add('ripple-animate')
    }

    const handleMouseEnter = () => {
      if (props.disabled || props.loading) return
      // 可以添加额外的悬停效果
    }

    const handleMouseLeave = () => {
      if (props.disabled || props.loading) return
      // 可以添加额外的離開效果
    }

    return {
      buttonRef,
      rippleRef,
      handleClick,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
.enhanced-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-family: var(--font-primary);
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
  overflow: hidden;
  outline: none;
  user-select: none;
}

/* 尺寸变体 */
.btn-small {
  padding: 8px 16px;
  font-size: 0.875rem;
  min-height: 36px;
}

.btn-medium {
  padding: 12px 24px;
  font-size: 1rem;
  min-height: 44px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.125rem;
  min-height: 52px;
}

.btn-icon-only.btn-small {
  padding: 8px;
  width: 36px;
}

.btn-icon-only.btn-medium {
  padding: 12px;
  width: 44px;
}

.btn-icon-only.btn-large {
  padding: 16px;
  width: 52px;
}

/* 颜色变体 */
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-primary:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover:not(.btn-disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--border-light);
}

.btn-accent {
  background: var(--gradient-accent);
  color: white;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
}

.btn-accent:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
}

.btn-success {
  background: var(--gradient-success);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-success:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.btn-warning {
  background: linear-gradient(135deg, var(--warning-color), #f97316);
  color: white;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.btn-warning:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, var(--error-color), #dc2626);
  color: white;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.btn-danger:hover:not(.btn-disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
}

.btn-ghost {
  background: transparent;
  color: var(--text-light);
  border: 1px solid transparent;
}

.btn-ghost:hover:not(.btn-disabled) {
  background: rgba(255, 255, 255, 0.05);
  border-color: var(--border-light);
}

/* 状态 */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.btn-loading {
  cursor: wait;
}

/* 背景效果 */
.btn-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  transition: all 0.3s ease;
}

/* 涟漪效果 */
.btn-ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  pointer-events: none;
}

.ripple-animate {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

/* 内容 */
.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-icon,
.btn-icon-right {
  font-size: 1em;
  transition: transform 0.3s ease;
}

.enhanced-button:hover:not(.btn-disabled) .btn-icon,
.enhanced-button:hover:not(.btn-disabled) .btn-icon-right {
  transform: scale(1.1);
}

.btn-text {
  white-space: nowrap;
}

/* 加載動画 */
.btn-loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-ring {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 光效 */
.btn-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.enhanced-button:hover:not(.btn-disabled) .btn-glow {
  opacity: 0.5;
}
</style>
