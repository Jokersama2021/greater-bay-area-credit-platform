<template>
  <div
    class="enhanced-card"
    :class="[
      `card-${variant}`,
      { 'card-hoverable': hoverable, 'card-elevated': elevated }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    ref="cardRef"
  >
    <!-- 内容區域 -->
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'EnhancedCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'accent', 'success', 'warning'].includes(value)
    },
    hoverable: {
      type: Boolean,
      default: true
    },
    elevated: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const cardRef = ref(null)
    const isHovered = ref(false)

    const handleMouseEnter = () => {
      if (!props.hoverable) return
      isHovered.value = true
    }

    const handleMouseLeave = () => {
      if (!props.hoverable) return
      isHovered.value = false
    }

    return {
      cardRef,
      isHovered,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style scoped>
.enhanced-card {
  position: relative;
  background: var(--card-background);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--card-border);
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease-out;
  overflow: hidden;
  cursor: pointer;
}

.enhanced-card.card-elevated {
  box-shadow: var(--shadow-lg);
}

.enhanced-card.card-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--card-border-hover);
}

/* 变体樣式 */
.card-primary {
  border-color: rgba(99, 102, 241, 0.2);
}

.card-primary:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: var(--shadow-xl);
}

.card-accent {
  border-color: rgba(6, 182, 212, 0.2);
}

.card-accent:hover {
  border-color: rgba(6, 182, 212, 0.4);
  box-shadow: var(--shadow-xl);
}

.card-success {
  border-color: rgba(16, 185, 129, 0.2);
}

.card-success:hover {
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: var(--shadow-xl);
}

.card-warning {
  border-color: rgba(245, 158, 11, 0.2);
}

.card-warning:hover {
  border-color: rgba(245, 158, 11, 0.4);
  box-shadow: var(--shadow-xl);
}

/* 内容區域 */
.card-content {
  position: relative;
  z-index: 1;
}

/* 响應式设計 */
@media (max-width: 768px) {
  .enhanced-card {
    padding: 1rem;
  }
  
  .enhanced-card.card-hoverable:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .enhanced-card {
    padding: 0.75rem;
    border-radius: 16px;
  }
}
</style>
