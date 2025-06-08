<template>
  <!-- 空组件，不再显示页面过渡效果 -->
  <div></div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'PageTransition',
  props: {
    isTransitioning: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isExiting = ref(false)

    watch(() => props.isTransitioning, (newVal) => {
      if (newVal) {
        isExiting.value = false
      } else {
        isExiting.value = true
      }
    })

    return {
      isExiting
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
  animation: smoothFadeIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* 从0.6s减少到0.3s */
  will-change: opacity, transform;
}

.page-transition-overlay.exiting {
  animation: smoothFadeOut 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; /* 从0.5s减少到0.25s */
}

/* 更流畅的淡入淡出动画 */
@keyframes smoothFadeIn {
  from {
    opacity: 0;
    transform: scale(1.02);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes smoothFadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.98);
  }
}

/* 流畅的背景遮罩 */
.transition-background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(135deg,
    rgba(10, 15, 30, 0.92) 0%,
    rgba(15, 25, 40, 0.94) 50%,
    rgba(20, 30, 50, 0.96) 100%);
  backdrop-filter: blur(10px) saturate(1.1); /* 进一步减少模糊程度 */
  animation: backgroundFlow 0.15s cubic-bezier(0.23, 1, 0.32, 1); /* 从0.3s减少到0.15s */
  will-change: backdrop-filter, opacity;
}

@keyframes backgroundFlow {
  from {
    backdrop-filter: blur(0px) saturate(1);
    opacity: 0;
  }
  to {
    backdrop-filter: blur(10px) saturate(1.1); /* 进一步减少模糊程度 */
    opacity: 1;
  }
}

.page-transition-overlay.exiting .transition-background {
  animation: backgroundFlowOut 0.15s cubic-bezier(0.23, 1, 0.32, 1) forwards; /* 从0.25s减少到0.15s */
}

@keyframes backgroundFlowOut {
  from {
    backdrop-filter: blur(10px) saturate(1.1); /* 进一步减少模糊程度 */
    opacity: 1;
  }
  to {
    backdrop-filter: blur(0px) saturate(1);
    opacity: 0;
  }
}
</style>