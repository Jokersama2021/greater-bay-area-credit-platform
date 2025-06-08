<template>
  <div class="enhanced-background">
    <!-- 主背景层 -->
    <div class="background-base"></div>
    
    <!-- 动态光效层 -->
    <div class="light-effects">
      <div class="light-beam light-beam-1"></div>
      <div class="light-beam light-beam-2"></div>
      <div class="light-beam light-beam-3"></div>
    </div>
    
    <!-- 粤港澳地理轮廓 -->
    <div class="geographic-outline">
      <svg class="outline-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="outlineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.3" />
            <stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:0.5" />
            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0.3" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- 大湾区轮廓 -->
        <path 
          class="bay-outline"
          d="M400,300 Q600,200 800,300 Q1000,400 1200,350 Q1400,300 1500,400 Q1600,500 1400,600 Q1200,700 1000,650 Q800,600 600,650 Q400,700 300,600 Q200,500 300,400 Z"
          stroke="url(#outlineGradient)"
          stroke-width="2"
          fill="none"
          filter="url(#glow)"
        />
        
        <!-- 城市连接点 -->
        <g class="city-connections">
          <!-- 广州 -->
          <circle class="city-point guangzhou" cx="800" cy="350" r="6" fill="#ffd700" />
          <circle class="city-glow guangzhou-glow" cx="800" cy="350" r="12" fill="none" stroke="#ffd700" stroke-width="2" opacity="0.6" />
          
          <!-- 深圳 -->
          <circle class="city-point shenzhen" cx="1100" cy="450" r="5" fill="#00d4ff" />
          <circle class="city-glow shenzhen-glow" cx="1100" cy="450" r="10" fill="none" stroke="#00d4ff" stroke-width="2" opacity="0.6" />
          
          <!-- 香港 -->
          <circle class="city-point hongkong" cx="1200" cy="500" r="5" fill="#ff6b6b" />
          <circle class="city-glow hongkong-glow" cx="1200" cy="500" r="10" fill="none" stroke="#ff6b6b" stroke-width="2" opacity="0.6" />
          
          <!-- 澳门 -->
          <circle class="city-point macau" cx="950" cy="520" r="4" fill="#10b981" />
          <circle class="city-glow macau-glow" cx="950" cy="520" r="8" fill="none" stroke="#10b981" stroke-width="2" opacity="0.6" />
          
          <!-- 珠海 -->
          <circle class="city-point zhuhai" cx="900" cy="480" r="4" fill="#8b5cf6" />
          <circle class="city-glow zhuhai-glow" cx="900" cy="480" r="8" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.6" />
        </g>
        
        <!-- 数据流动线 -->
        <g class="data-flows">
          <path class="flow-line flow-1" d="M800,350 Q950,400 1100,450" stroke="#6366f1" stroke-width="1.5" fill="none" opacity="0.7" />
          <path class="flow-line flow-2" d="M1100,450 Q1150,475 1200,500" stroke="#06b6d4" stroke-width="1.5" fill="none" opacity="0.7" />
          <path class="flow-line flow-3" d="M950,520 Q925,500 900,480" stroke="#10b981" stroke-width="1.5" fill="none" opacity="0.7" />
          <path class="flow-line flow-4" d="M800,350 Q875,435 950,520" stroke="#8b5cf6" stroke-width="1.5" fill="none" opacity="0.7" />
        </g>
      </svg>
    </div>
    
    <!-- 浮动粒子 -->
    <div class="floating-particles">
      <div 
        v-for="n in 30" 
        :key="n" 
        class="floating-particle"
        :style="getFloatingParticleStyle(n)"
      ></div>
    </div>
    
    <!-- 网格纹理 -->
    <div class="grid-texture">
      <div class="grid-lines">
        <div v-for="n in 15" :key="'h' + n" class="grid-line horizontal" :style="{ top: (n * 6.67) + '%' }"></div>
        <div v-for="n in 25" :key="'v' + n" class="grid-line vertical" :style="{ left: (n * 4) + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EnhancedBackground',
  methods: {
    getFloatingParticleStyle(index) {
      const size = Math.random() * 3 + 1
      const duration = Math.random() * 15 + 10
      const delay = Math.random() * 5
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
.enhanced-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -2;
  overflow: hidden;
}

/* 主背景层 */
.background-base {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0a0f1c 0%,
    #0f1419 25%,
    #1a1f2e 50%,
    #0f1419 75%,
    #0a0f1c 100%
  );
}

/* 动态光效层 */
.light-effects {
  position: absolute;
  width: 100%;
  height: 100%;
}

.light-beam {
  position: absolute;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  filter: blur(20px);
  animation: lightSweep 12s ease-in-out infinite;
}

.light-beam-1 {
  width: 200px;
  height: 100vh;
  left: -100px;
  animation-delay: 0s;
}

.light-beam-2 {
  width: 150px;
  height: 100vh;
  left: 50%;
  animation-delay: 4s;
}

.light-beam-3 {
  width: 180px;
  height: 100vh;
  right: -90px;
  animation-delay: 8s;
}

@keyframes lightSweep {
  0%, 100% {
    opacity: 0;
    transform: translateX(-50px) skewX(-15deg);
  }
  50% {
    opacity: 1;
    transform: translateX(50px) skewX(-15deg);
  }
}

/* 地理轮廓 */
.geographic-outline {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}

.outline-svg {
  width: 100%;
  height: 100%;
}

.bay-outline {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawOutline 8s ease-in-out infinite;
}

@keyframes drawOutline {
  0%, 100% {
    stroke-dashoffset: 2000;
    opacity: 0.3;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 0.8;
  }
}

/* 城市连接点 */
.city-point {
  animation: cityPulse 3s ease-in-out infinite;
}

.city-glow {
  animation: cityGlowPulse 2s ease-in-out infinite;
}

@keyframes cityPulse {
  0%, 100% {
    opacity: 0.8;
    r: 4;
  }
  50% {
    opacity: 1;
    r: 6;
  }
}

@keyframes cityGlowPulse {
  0% {
    opacity: 0.3;
    r: 8;
  }
  100% {
    opacity: 0;
    r: 20;
  }
}

/* 数据流动线 */
.flow-line {
  stroke-dasharray: 100 50;
  animation: dataFlow 6s linear infinite;
}

.flow-1 { animation-delay: 0s; }
.flow-2 { animation-delay: 1.5s; }
.flow-3 { animation-delay: 3s; }
.flow-4 { animation-delay: 4.5s; }

@keyframes dataFlow {
  0% {
    stroke-dashoffset: 150;
    opacity: 0;
  }
  20% {
    opacity: 0.7;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    stroke-dashoffset: -150;
    opacity: 0;
  }
}

/* 浮动粒子 */
.floating-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: floatUp linear infinite;
}

@keyframes floatUp {
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

/* 网格纹理 */
.grid-texture {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.05;
}

.grid-line {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
  animation: gridFadeH 8s ease-in-out infinite;
}

.grid-line.vertical {
  height: 100%;
  width: 1px;
  animation: gridFadeV 10s ease-in-out infinite;
}

@keyframes gridFadeH {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.15; }
}

@keyframes gridFadeV {
  0%, 100% { opacity: 0.05; }
  50% { opacity: 0.15; }
}
</style>
