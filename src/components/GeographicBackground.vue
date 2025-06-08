<template>
  <div class="geographic-background">
    <!-- 珠江水纹动画 -->
    <div class="pearl-river-waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
      <div class="wave wave-4"></div>
    </div>

    <!-- 三地连接线动画 -->
    <div class="connection-lines">
      <svg class="connection-svg" viewBox="0 0 1200 800">
        <!-- 香港到广州 -->
        <path 
          class="connection-line hk-gz" 
          d="M 200 600 Q 400 400 600 200"
          stroke="url(#connectionGradient1)"
          fill="none"
          stroke-width="2"
        />
        <!-- 澳门到广州 -->
        <path 
          class="connection-line mo-gz" 
          d="M 100 650 Q 350 450 600 200"
          stroke="url(#connectionGradient2)"
          fill="none"
          stroke-width="2"
        />
        <!-- 香港到澳门 -->
        <path 
          class="connection-line hk-mo" 
          d="M 200 600 Q 150 625 100 650"
          stroke="url(#connectionGradient3)"
          fill="none"
          stroke-width="2"
        />

        <!-- 渐变定义 -->
        <defs>
          <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#00d4ff;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0099cc;stop-opacity:0" />
          </linearGradient>
          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ff6b6b;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#ff6b6b;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#cc5555;stop-opacity:0" />
          </linearGradient>
          <linearGradient id="connectionGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#4ecdc4;stop-opacity:0" />
            <stop offset="50%" style="stop-color:#4ecdc4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3aa39c;stop-opacity:0" />
          </linearGradient>
        </defs>

        <!-- 城市节点 -->
        <g class="city-nodes">
          <!-- 广州 -->
          <circle class="city-node guangzhou" cx="600" cy="200" r="8" fill="#ffd700" />
          <circle class="city-pulse guangzhou-pulse" cx="600" cy="200" r="8" fill="none" stroke="#ffd700" stroke-width="2" />
          
          <!-- 香港 -->
          <circle class="city-node hongkong" cx="200" cy="600" r="6" fill="#00d4ff" />
          <circle class="city-pulse hongkong-pulse" cx="200" cy="600" r="6" fill="none" stroke="#00d4ff" stroke-width="2" />
          
          <!-- 澳门 -->
          <circle class="city-node macau" cx="100" cy="650" r="6" fill="#ff6b6b" />
          <circle class="city-pulse macau-pulse" cx="100" cy="650" r="6" fill="none" stroke="#ff6b6b" stroke-width="2" />
        </g>

        <!-- 数据流动粒子 -->
        <g class="data-particles">
          <circle class="particle particle-1" r="2" fill="#00d4ff">
            <animateMotion dur="8s" repeatCount="indefinite">
              <mpath href="#hk-gz-path"/>
            </animateMotion>
          </circle>
          <circle class="particle particle-2" r="2" fill="#ff6b6b">
            <animateMotion dur="10s" repeatCount="indefinite">
              <mpath href="#mo-gz-path"/>
            </animateMotion>
          </circle>
        </g>

        <!-- 隐藏的路径用于粒子动画 -->
        <defs>
          <path id="hk-gz-path" d="M 200 600 Q 400 400 600 200" />
          <path id="mo-gz-path" d="M 100 650 Q 350 450 600 200" />
        </defs>
      </svg>
    </div>

    <!-- 地标建筑剪影 -->
    <div class="landmarks">
      <!-- 港珠澳大桥 -->
      <div class="landmark bridge">
        <svg viewBox="0 0 200 60" class="bridge-svg">
          <path d="M 10 50 Q 50 20 100 50 Q 150 20 190 50" 
                stroke="#4a90e2" 
                stroke-width="2" 
                fill="none" 
                class="bridge-path" />
          <circle cx="50" cy="35" r="3" fill="#4a90e2" class="bridge-tower" />
          <circle cx="150" cy="35" r="3" fill="#4a90e2" class="bridge-tower" />
        </svg>
      </div>

      <!-- 广州塔 -->
      <div class="landmark tower guangzhou-tower">
        <svg viewBox="0 0 40 100" class="tower-svg">
          <path d="M 15 95 L 12 20 L 20 5 L 28 20 L 25 95 Z" 
                fill="url(#towerGradient)" 
                class="tower-body" />
          <defs>
            <linearGradient id="towerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff8c00;stop-opacity:0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- 澳门观光塔 -->
      <div class="landmark tower macau-tower">
        <svg viewBox="0 0 30 80" class="tower-svg">
          <rect x="12" y="60" width="6" height="35" fill="#ff6b6b" class="tower-base" />
          <circle cx="15" cy="15" r="12" fill="none" stroke="#ff6b6b" stroke-width="2" class="tower-top" />
        </svg>
      </div>
    </div>

    <!-- 云层飘移 -->
    <div class="clouds">
      <div class="cloud cloud-1">
        <svg viewBox="0 0 100 40">
          <ellipse cx="25" cy="25" rx="25" ry="15" fill="rgba(255,255,255,0.1)" />
          <ellipse cx="50" cy="20" rx="30" ry="18" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="75" cy="25" rx="25" ry="15" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
      <div class="cloud cloud-2">
        <svg viewBox="0 0 80 30">
          <ellipse cx="20" cy="20" rx="20" ry="12" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="40" cy="15" rx="25" ry="15" fill="rgba(255,255,255,0.08)" />
          <ellipse cx="60" cy="20" rx="20" ry="12" fill="rgba(255,255,255,0.06)" />
        </svg>
      </div>
      <div class="cloud cloud-3">
        <svg viewBox="0 0 120 50">
          <ellipse cx="30" cy="30" rx="30" ry="18" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="60" cy="25" rx="35" ry="20" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="90" cy="30" rx="30" ry="18" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GeographicBackground',
  mounted() {
    this.initAnimations()
  },
  methods: {
    initAnimations() {
      // 初始化连接线动画
      this.animateConnections()
      // 初始化地标动画
      this.animateLandmarks()
    },
    
    animateConnections() {
      const lines = document.querySelectorAll('.connection-line')
      lines.forEach((line, index) => {
        const length = line.getTotalLength()
        line.style.strokeDasharray = length
        line.style.strokeDashoffset = length
        
        setTimeout(() => {
          line.style.transition = 'stroke-dashoffset 3s ease-in-out'
          line.style.strokeDashoffset = 0
        }, index * 1000)
      })
    },
    
    animateLandmarks() {
      // 地标建筑的呼吸动画
      const landmarks = document.querySelectorAll('.landmark')
      landmarks.forEach(landmark => {
        landmark.style.animation = 'landmarkGlow 4s ease-in-out infinite'
      })
    }
  }
}
</script>

<style scoped>
.geographic-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* 珠江水纹动画 */
.pearl-river-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.wave {
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 200%;
  height: 100px;
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(0, 212, 255, 0.1) 25%,
    rgba(0, 212, 255, 0.2) 50%,
    rgba(0, 212, 255, 0.1) 75%,
    transparent 100%);
  border-radius: 50% 50% 0 0;
  animation: waveFlow 15s linear infinite;
}

.wave-1 {
  animation-delay: 0s;
  opacity: 0.8;
}

.wave-2 {
  animation-delay: -3s;
  opacity: 0.6;
  height: 80px;
}

.wave-3 {
  animation-delay: -6s;
  opacity: 0.4;
  height: 60px;
}

.wave-4 {
  animation-delay: -9s;
  opacity: 0.2;
  height: 40px;
}

@keyframes waveFlow {
  0% {
    transform: translateX(-50%) translateY(0px);
  }
  100% {
    transform: translateX(0%) translateY(-10px);
  }
}

/* 连接线动画 */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.connection-svg {
  width: 100%;
  height: 100%;
}

.connection-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: connectionPulse 6s ease-in-out infinite;
}

@keyframes connectionPulse {
  0%, 100% {
    opacity: 0.6;
    stroke-width: 2;
  }
  50% {
    opacity: 1;
    stroke-width: 3;
  }
}

/* 城市节点动画 */
.city-node {
  animation: cityGlow 3s ease-in-out infinite;
}

.city-pulse {
  animation: cityPulse 2s ease-in-out infinite;
}

@keyframes cityGlow {
  0%, 100% {
    opacity: 0.8;
    filter: drop-shadow(0 0 5px currentColor);
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 15px currentColor);
  }
}

@keyframes cityPulse {
  0% {
    r: 6;
    opacity: 1;
  }
  100% {
    r: 20;
    opacity: 0;
  }
}

/* 数据粒子动画 */
.particle {
  opacity: 0;
  animation: particleGlow 2s ease-in-out infinite;
}

.particle-1 {
  animation-delay: 0s;
}

.particle-2 {
  animation-delay: 1s;
}

@keyframes particleGlow {
  0%, 100% {
    opacity: 0;
    r: 1;
  }
  50% {
    opacity: 1;
    r: 3;
  }
}

/* 地标建筑动画 */
.landmarks {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.landmark {
  position: absolute;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.bridge {
  bottom: 30%;
  left: 20%;
  width: 200px;
  height: 60px;
}

.guangzhou-tower {
  top: 20%;
  right: 30%;
  width: 40px;
  height: 100px;
}

.macau-tower {
  bottom: 25%;
  left: 10%;
  width: 30px;
  height: 80px;
}

.bridge-path {
  animation: bridgeGlow 4s ease-in-out infinite;
}

.bridge-tower {
  animation: towerBlink 3s ease-in-out infinite;
}

@keyframes bridgeGlow {
  0%, 100% {
    stroke-width: 2;
    opacity: 0.6;
  }
  50% {
    stroke-width: 3;
    opacity: 1;
    filter: drop-shadow(0 0 10px #4a90e2);
  }
}

@keyframes towerBlink {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 8px currentColor);
  }
}

@keyframes landmarkGlow {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
    filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
  }
}

/* 云层动画 */
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  opacity: 0.6;
}

.cloud-1 {
  top: 10%;
  left: -10%;
  width: 200px;
  height: 80px;
  animation: cloudDrift1 25s linear infinite;
}

.cloud-2 {
  top: 25%;
  left: -8%;
  width: 160px;
  height: 60px;
  animation: cloudDrift2 30s linear infinite;
}

.cloud-3 {
  top: 40%;
  left: -12%;
  width: 240px;
  height: 100px;
  animation: cloudDrift3 35s linear infinite;
}

@keyframes cloudDrift1 {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(calc(100vw + 100px));
  }
}

@keyframes cloudDrift2 {
  0% {
    transform: translateX(-80px);
  }
  100% {
    transform: translateX(calc(100vw + 80px));
  }
}

@keyframes cloudDrift3 {
  0% {
    transform: translateX(-120px);
  }
  100% {
    transform: translateX(calc(100vw + 120px));
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .landmarks {
    opacity: 0.5;
  }

  .landmark {
    transform: scale(0.8);
  }

  .pearl-river-waves {
    height: 100px;
  }

  .wave {
    height: 50px;
  }

  .clouds {
    opacity: 0.4;
  }
}

@media (max-width: 480px) {
  .landmarks {
    display: none;
  }

  .connection-lines {
    opacity: 0.6;
  }

  .pearl-river-waves {
    height: 60px;
  }
}
</style>
