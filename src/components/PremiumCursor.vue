<template>
  <div class="premium-cursor" v-if="isVisible">
    <!-- 简化的主光标 -->
    <div
      class="cursor-main"
      :style="mainCursorStyle"
    >
      <div class="cursor-core"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'PremiumCursor',
  setup() {
    const isVisible = ref(false)
    const mousePos = ref({ x: 0, y: 0 })
    const smoothPos = ref({ x: 0, y: 0 })
    const isPressed = ref(false)
    const isHovering = ref(false)

    let animationId = null

    // 简化的主光标样式
    const mainCursorStyle = computed(() => {
      const scale = isPressed.value ? 0.8 : isHovering.value ? 1.2 : 1

      return {
        left: smoothPos.value.x + 'px',
        top: smoothPos.value.y + 'px',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: 0.9
      }
    })

    // 线性插值函数
    const lerp = (start, end, factor) => start + (end - start) * factor

    // 简化的光标更新
    const updateCursor = () => {
      // 平滑主光标跟随
      smoothPos.value.x = lerp(smoothPos.value.x, mousePos.value.x, 0.15)
      smoothPos.value.y = lerp(smoothPos.value.y, mousePos.value.y, 0.15)

      animationId = requestAnimationFrame(updateCursor)
    }



    // 简化的鼠标移动处理
    const handleMouseMove = (e) => {
      mousePos.value = { x: e.clientX, y: e.clientY }
      isVisible.value = true
    }

    // 鼠标按下
    const handleMouseDown = () => {
      isPressed.value = true
    }

    // 鼠标释放
    const handleMouseUp = () => {
      isPressed.value = false
    }

    // 鼠标进入元素
    const handleMouseEnter = (e) => {
      if (e.target.matches('button, a, [role="button"], .clickable')) {
        isHovering.value = true
      }
    }

    // 鼠标离开元素
    const handleMouseLeave = () => {
      isHovering.value = false
    }

    // 鼠标离开窗口
    const handleMouseLeave2 = () => {
      isVisible.value = false
    }

    onMounted(() => {
      nextTick(() => {
        document.addEventListener('mousemove', handleMouseMove, { passive: true })
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseenter', handleMouseEnter, true)
        document.addEventListener('mouseleave', handleMouseLeave, true)
        document.addEventListener('mouseleave', handleMouseLeave2)
        
        animationId = requestAnimationFrame(updateCursor)
      })
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('mouseleave', handleMouseLeave2)
      
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    })

    return {
      isVisible,
      mainCursorStyle
    }
  }
}
</script>

<style scoped>
.premium-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
  mix-blend-mode: difference;
}

/* 简化的主光标 */
.cursor-main {
  position: fixed;
  width: 20px;
  height: 20px;
  transition: transform 0.2s ease-out;
  will-change: transform;
}

.cursor-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: #ffffff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
}

/* 响应式隐藏 */
@media (max-width: 768px) {
  .premium-cursor {
    display: none;
  }
}

@media (hover: none) {
  .premium-cursor {
    display: none;
  }
}
</style>
