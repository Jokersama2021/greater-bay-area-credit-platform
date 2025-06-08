<template>
  <div class="advanced-animations">
    <!-- 高级背景光效 -->
    <div class="background-lights">
      <div class="light-orb light-1" :style="{ animationDelay: '0s' }"></div>
      <div class="light-orb light-2" :style="{ animationDelay: '2s' }"></div>
      <div class="light-orb light-3" :style="{ animationDelay: '4s' }"></div>
      <div class="light-orb light-4" :style="{ animationDelay: '6s' }"></div>
      <div class="light-orb light-5" :style="{ animationDelay: '8s' }"></div>
    </div>

    <!-- 粒子系统 -->
    <div class="particle-system">
      <div 
        v-for="n in 50" 
        :key="n" 
        class="particle"
        :style="getParticleStyle(n)"
      ></div>
    </div>

    <!-- 数据流动线条 -->
    <div class="data-streams">
      <svg class="stream-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="streamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#6366f1;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0" />
          </linearGradient>
          <linearGradient id="streamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#10b981;stop-opacity:0" />
          </linearGradient>
        </defs>
        
        <!-- 流动路径 -->
        <path 
          class="stream-path stream-1" 
          d="M-100,200 Q400,100 800,300 T1600,200" 
          stroke="url(#streamGradient1)" 
          stroke-width="2" 
          fill="none"
        />
        <path 
          class="stream-path stream-2" 
          d="M-100,600 Q600,400 1200,700 T2000,500" 
          stroke="url(#streamGradient2)" 
          stroke-width="2" 
          fill="none"
        />
        <path 
          class="stream-path stream-3" 
          d="M-100,900 Q300,700 900,1000 T1800,800" 
          stroke="url(#streamGradient1)" 
          stroke-width="1.5" 
          fill="none"
        />
      </svg>
    </div>

    <!-- 网格背景 */
    <div class="grid-background">
      <div class="grid-lines-horizontal">
        <div v-for="n in 20" :key="'h' + n" class="grid-line horizontal" :style="{ top: (n * 5) + '%' }"></div>
      </div>
      <div class="grid-lines-vertical">
        <div v-for="n in 30" :key="'v' + n" class="grid-line vertical" :style="{ left: (n * 3.33) + '%' }"></div>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'AdvancedAnimations',
  methods: {
    getParticleStyle(index) {
      const size = Math.random() * 4 + 1
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 10
      const x = Math.random() * 100
      const y = Math.random() * 100

      return {
        width: size + 'px',
        height: size + 'px',
        left: x + '%',
        top: y + '%',
        animationDuration: duration + 's',
        animationDelay: delay + 's'
      }
    }
  }
}
</script>

<style scoped>
.advanced-animations {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

/* 高级背景光效 */
.background-lights {
  position: absolute;
  width: 100%;
  height: 100%;
}

.light-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.3;
  animation: lightFloat 15s ease-in-out infinite;
}

.light-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #6366f1 0%, transparent 70%);
  top: 10%;
  left: 10%;
}

.light-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  top: 60%;
  right: 15%;
}

.light-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  bottom: 20%;
  left: 30%;
}

.light-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #10b981 0%, transparent 70%);
  top: 30%;
  right: 40%;
}

.light-5 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
  bottom: 40%;
  right: 20%;
}

@keyframes lightFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.2;
  }
  25% {
    transform: translate(30px, -20px) scale(1.1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-20px, 30px) scale(0.9);
    opacity: 0.3;
  }
  75% {
    transform: translate(20px, 20px) scale(1.05);
    opacity: 0.35;
  }
}

/* 粒子系统 */
.particle-system {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) scale(1);
  }
  90% {
    opacity: 1;
    transform: translateY(-10vh) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20vh) scale(0);
  }
}

/* 数据流动线条 */
.data-streams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stream-svg {
  width: 100%;
  height: 100%;
}

.stream-path {
  stroke-dasharray: 100 200;
  animation: streamFlow 8s linear infinite;
}

.stream-1 {
  animation-delay: 0s;
}

.stream-2 {
  animation-delay: 2s;
}

.stream-3 {
  animation-delay: 4s;
}

@keyframes streamFlow {
  0% {
    stroke-dashoffset: 300;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: -300;
    opacity: 0;
  }
}

/* 网格背景 */
.grid-background {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.grid-line {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
  animation: gridPulseH 10s ease-in-out infinite;
}

.grid-line.vertical {
  height: 100%;
  width: 1px;
  background: linear-gradient(0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: gridPulseV 12s ease-in-out infinite;
}

@keyframes gridPulseH {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}

@keyframes gridPulseV {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.3; }
}
</style>
