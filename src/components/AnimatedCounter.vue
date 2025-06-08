<template>
  <div class="animated-counter">
    <span 
      class="counter-display"
      :class="{ 'counting': isAnimating }"
    >
      {{ displayValue }}
    </span>
    <span v-if="suffix" class="counter-suffix">{{ suffix }}</span>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'

export default {
  name: 'AnimatedCounter',
  props: {
    value: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 1000 // 从2000ms减少到1000ms
    },
    suffix: {
      type: String,
      default: ''
    },
    decimals: {
      type: Number,
      default: 0
    },
    separator: {
      type: String,
      default: ','
    },
    autoStart: {
      type: Boolean,
      default: true
    }
  },
  emits: ['complete'],
  setup(props, { emit }) {
    const displayValue = ref(0)
    const isAnimating = ref(false)
    let animationId = null

    const formatNumber = (num) => {
      const fixed = Number(num).toFixed(props.decimals)
      if (props.separator && num >= 1000) {
        return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, props.separator)
      }
      return fixed
    }

    const animateToValue = (targetValue) => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }

      const startValue = displayValue.value
      const startTime = Date.now()
      isAnimating.value = true

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / props.duration, 1)

        // 使用 easeOutExpo 缓动函数
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
        
        displayValue.value = startValue + (targetValue - startValue) * easeOutExpo

        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        } else {
          displayValue.value = targetValue
          isAnimating.value = false
          emit('complete')
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    const startAnimation = () => {
      animateToValue(props.value)
    }

    watch(() => props.value, (newValue) => {
      animateToValue(newValue)
    })

    onMounted(() => {
      if (props.autoStart) {
        // 延迟启动动画以获得更好的视觉效果
        setTimeout(() => {
          startAnimation()
        }, 100)
      }
    })

    return {
      displayValue: ref(formatNumber(displayValue.value)),
      isAnimating,
      startAnimation
    }
  },
  watch: {
    displayValue(newValue) {
      this.displayValue = this.formatNumber(newValue)
    }
  },
  methods: {
    formatNumber(num) {
      const fixed = Number(num).toFixed(this.decimals)
      if (this.separator && num >= 1000) {
        return fixed.replace(/\B(?=(\d{3})+(?!\d))/g, this.separator)
      }
      return fixed
    }
  }
}
</script>

<style scoped>
.animated-counter {
  display: inline-flex;
  align-items: baseline;
  font-family: var(--font-mono);
  font-weight: 700;
}

.counter-display {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
  transition: all 0.3s var(--ease-out-expo);
  position: relative;
}

.counter-display.counting {
  animation: gradientShift 3s ease-in-out infinite, numberPulse 0.1s ease-in-out;
}

.counter-suffix {
  color: var(--text-dim);
  font-size: 0.8em;
  margin-left: 0.2em;
  font-weight: 500;
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes numberPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* 数字滚动效果 */
.counter-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.2) 50%, 
    transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.counter-display.counting::before {
  transform: translateX(100%);
}
</style>
