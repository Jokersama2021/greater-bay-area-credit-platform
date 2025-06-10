<template>
  <div class="digital-rain-background">
    <div
      v-for="drop in raindrops"
      :key="drop.id"
      class="rain-drop"
      :style="drop.style"
    >
      {{ drop.char }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'DigitalRainBackground',
  setup() {
    const raindrops = ref([])

    const createRaindrops = () => {
      const dropCount = 80 // 80個独立的數字雨滴
      const newDrops = []

      for (let i = 0; i < dropCount; i++) {
        const drop = {
          id: i,
          char: Math.random() > 0.5 ? '0' : '1',
          style: {
            left: Math.random() * 100 + '%',
            animationDuration: (Math.random() * 5 + 3) + 's', // 3-8秒随機速度
            animationDelay: Math.random() * 8 + 's', // 0-8秒随機延迟
            fontSize: (Math.random() * 8 + 14) + 'px' // 14-22px随機大小
          }
        }
        newDrops.push(drop)
      }

      raindrops.value = newDrops
    }

    const handleResize = () => {
      createRaindrops()
    }

    onMounted(() => {
      createRaindrops()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      raindrops
    }
  }
}
</script>

<style scoped>
.digital-rain-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
  opacity: 0.5;
}

.rain-drop {
  position: absolute;
  top: -50px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  color: #007AFF;
  text-shadow: 0 0 5px #007AFF;
  animation: dropFall linear infinite;
  user-select: none;
}

@keyframes dropFall {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 50px));
    opacity: 0;
  }
}

/* 响應式设計 */
@media (max-width: 768px) {
  .digital-rain-background {
    opacity: 0.2;
  }

  .rain-drop {
    font-size: 12px !important;
  }
}

@media (max-width: 480px) {
  .digital-rain-background {
    opacity: 0.15;
  }

  .rain-drop {
    font-size: 10px !important;
  }
}
</style>
