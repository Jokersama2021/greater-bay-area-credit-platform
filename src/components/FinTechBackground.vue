<template>
  <div class="fintech-background">
    <!-- 主背景层 -->
    <div class="background-base"></div>
    
    <!-- 金融數據流 -->
    <div class="data-streams">
      <svg class="stream-svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <!-- 數據流渐变 -->
          <linearGradient id="dataFlow1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0" />
            <stop offset="30%" style="stop-color:#00d4ff;stop-opacity:0.8" />
            <stop offset="70%" style="stop-color:#0099ff;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#0066ff;stop-opacity:0" />
          </linearGradient>
          
          <linearGradient id="dataFlow2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#10b981;stop-opacity:0" />
            <stop offset="30%" style="stop-color:#10b981;stop-opacity:0.6" />
            <stop offset="70%" style="stop-color:#059669;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#047857;stop-opacity:0" />
          </linearGradient>
          
          <linearGradient id="dataFlow3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:0" />
            <stop offset="30%" style="stop-color:#f59e0b;stop-opacity:0.7" />
            <stop offset="70%" style="stop-color:#d97706;stop-opacity:0.7" />
            <stop offset="100%" style="stop-color:#b45309;stop-opacity:0" />
          </linearGradient>
          
          <!-- 發光效果 -->
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- 金融數據流路径 -->
        <g class="financial-flows">
          <!-- 主要數據流 -->
          <path 
            class="data-path flow-1"
            d="M-200,200 Q400,150 800,250 Q1200,350 1600,200 Q1800,150 2100,250"
            stroke="url(#dataFlow1)"
            stroke-width="3"
            fill="none"
            filter="url(#glow)"
          />
          
          <path 
            class="data-path flow-2"
            d="M-200,500 Q300,400 700,550 Q1100,700 1500,500 Q1700,400 2100,550"
            stroke="url(#dataFlow2)"
            stroke-width="2.5"
            fill="none"
            filter="url(#glow)"
          />
          
          <path 
            class="data-path flow-3"
            d="M-200,800 Q500,700 900,850 Q1300,1000 1700,800 Q1900,700 2200,850"
            stroke="url(#dataFlow3)"
            stroke-width="2"
            fill="none"
            filter="url(#glow)"
          />
          
          <!-- 次要數據流 -->
          <path 
            class="data-path flow-4"
            d="M-100,350 Q600,300 1000,400 Q1400,500 1800,350"
            stroke="url(#dataFlow1)"
            stroke-width="1.5"
            fill="none"
            opacity="0.6"
          />
          
          <path 
            class="data-path flow-5"
            d="M-100,650 Q400,600 800,700 Q1200,800 1600,650"
            stroke="url(#dataFlow2)"
            stroke-width="1.5"
            fill="none"
            opacity="0.6"
          />
        </g>
        
        <!-- 金融节點 -->
        <g class="financial-nodes">
          <!-- 主要金融中心 -->
          <circle class="node major-node" cx="400" cy="200" r="8" fill="#00d4ff" opacity="0.8" filter="url(#glow)" />
          <circle class="node major-node" cx="800" cy="250" r="8" fill="#0099ff" opacity="0.8" filter="url(#glow)" />
          <circle class="node major-node" cx="1200" cy="350" r="8" fill="#0066ff" opacity="0.8" filter="url(#glow)" />
          <circle class="node major-node" cx="1600" cy="200" r="8" fill="#00d4ff" opacity="0.8" filter="url(#glow)" />
          
          <!-- 次要节點 -->
          <circle class="node minor-node" cx="600" cy="400" r="4" fill="#10b981" opacity="0.6" />
          <circle class="node minor-node" cx="1000" cy="500" r="4" fill="#059669" opacity="0.6" />
          <circle class="node minor-node" cx="1400" cy="600" r="4" fill="#047857" opacity="0.6" />
          
          <!-- 交易节點 -->
          <circle class="node trade-node" cx="500" cy="700" r="3" fill="#f59e0b" opacity="0.7" />
          <circle class="node trade-node" cx="900" cy="800" r="3" fill="#d97706" opacity="0.7" />
          <circle class="node trade-node" cx="1300" cy="750" r="3" fill="#b45309" opacity="0.7" />
        </g>
      </svg>
    </div>
    
    <!-- 區块链網格 -->
    <div class="blockchain-grid">
      <div class="grid-container">
        <div 
          v-for="n in 120" 
          :key="n" 
          class="grid-block"
          :style="getBlockStyle(n)"
        ></div>
      </div>
    </div>
    
    <!-- 金融數據粒子 -->
    <div class="financial-particles">
      <div 
        v-for="n in 40" 
        :key="n" 
        class="financial-particle"
        :style="getParticleStyle(n)"
      ></div>
    </div>
    
    <!-- 科技光束 -->
    <div class="tech-beams">
      <div class="beam beam-1"></div>
      <div class="beam beam-2"></div>
      <div class="beam beam-3"></div>
      <div class="beam beam-4"></div>
    </div>
    
    <!-- 數字雨效果 -->
    <div class="digital-rain">
      <div 
        v-for="n in 20" 
        :key="n" 
        class="rain-column"
        :style="getRainStyle(n)"
      >
        <span v-for="char in getRandomChars()" :key="char" class="rain-char">{{ char }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FinTechBackground',
  methods: {
    getBlockStyle(index) {
      const row = Math.floor((index - 1) / 12)
      const col = (index - 1) % 12
      const delay = (row + col) * 0.1
      const opacity = Math.random() * 0.3 + 0.1
      
      return {
        animationDelay: delay + 's',
        opacity: opacity
      }
    },
    
    getParticleStyle(index) {
      const size = Math.random() * 3 + 1
      const duration = Math.random() * 20 + 15
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
    },
    
    getRainStyle(index) {
      const left = (index * 5) + Math.random() * 5
      const duration = Math.random() * 3 + 2
      const delay = Math.random() * 5
      
      return {
        left: left + '%',
        animationDuration: duration + 's',
        animationDelay: delay + 's'
      }
    },
    
    getRandomChars() {
      const chars = '0123456789ABCDEF$¥€£₿'
      const length = Math.floor(Math.random() * 10) + 5
      return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)])
    }
  }
}
</script>

<style scoped>
.fintech-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -3;
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
    #0d1117 25%,
    #161b22 50%,
    #0d1117 75%,
    #0a0f1c 100%
  );
}

/* 金融數據流 */
.data-streams {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.stream-svg {
  width: 100%;
  height: 100%;
}

.data-path {
  stroke-dasharray: 200 100;
  animation: dataFlowAnimation 12s linear infinite;
}

.flow-1 { animation-delay: 0s; }
.flow-2 { animation-delay: 2s; }
.flow-3 { animation-delay: 4s; }
.flow-4 { animation-delay: 6s; }
.flow-5 { animation-delay: 8s; }

@keyframes dataFlowAnimation {
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

/* 金融节點動画 */
.node {
  animation: nodePulse 3s ease-in-out infinite;
}

.major-node {
  animation-duration: 2s;
}

.minor-node {
  animation-duration: 2.5s;
}

.trade-node {
  animation-duration: 1.5s;
}

@keyframes nodePulse {
  0%, 100% {
    opacity: 0.4;
    r: 4;
  }
  50% {
    opacity: 1;
    r: 8;
  }
}

/* 區块链網格 */
.blockchain-grid {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 2px;
  width: 100%;
  height: 100%;
  padding: 20px;
}

.grid-block {
  background: rgba(0, 212, 255, 0.3);
  border: 1px solid rgba(0, 212, 255, 0.2);
  animation: blockPulse 4s ease-in-out infinite;
}

@keyframes blockPulse {
  0%, 100% {
    background: rgba(0, 212, 255, 0.1);
    border-color: rgba(0, 212, 255, 0.1);
  }
  50% {
    background: rgba(0, 212, 255, 0.3);
    border-color: rgba(0, 212, 255, 0.3);
  }
}

/* 金融數據粒子 */
.financial-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.financial-particle {
  position: absolute;
  background: rgba(0, 212, 255, 0.6);
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

/* 科技光束 */
.tech-beams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.beam {
  position: absolute;
  background: linear-gradient(45deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  filter: blur(15px);
  animation: beamSweep 15s ease-in-out infinite;
}

.beam-1 {
  width: 300px;
  height: 100vh;
  left: -150px;
  animation-delay: 0s;
}

.beam-2 {
  width: 200px;
  height: 100vh;
  left: 25%;
  animation-delay: 3s;
}

.beam-3 {
  width: 250px;
  height: 100vh;
  left: 50%;
  animation-delay: 6s;
}

.beam-4 {
  width: 180px;
  height: 100vh;
  right: -90px;
  animation-delay: 9s;
}

@keyframes beamSweep {
  0%, 100% {
    opacity: 0;
    transform: translateX(-100px) skewX(-20deg);
  }
  50% {
    opacity: 1;
    transform: translateX(100px) skewX(-20deg);
  }
}

/* 數字雨效果 */
.digital-rain {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.3;
}

.rain-column {
  position: absolute;
  top: -100px;
  display: flex;
  flex-direction: column;
  animation: rainFall linear infinite;
}

.rain-char {
  color: #00d4ff;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0 0 5px #00d4ff;
  margin-bottom: 10px;
  animation: charFade 0.5s ease-in-out infinite alternate;
}

@keyframes rainFall {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}

@keyframes charFade {
  0% { opacity: 0.3; }
  100% { opacity: 1; }
}

/* 响應式设計 */
@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(12, 1fr);
  }
  
  .digital-rain {
    opacity: 0.2;
  }
  
  .rain-char {
    font-size: 12px;
  }
}
</style>
