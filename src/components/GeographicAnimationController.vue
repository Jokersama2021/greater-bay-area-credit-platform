<template>
  <div class="animation-controller">
    <div class="control-panel" v-if="showControls">
      <h4>🌊 粵港澳地理動画控制</h4>
      
      <div class="control-group">
        <label>動画强度</label>
        <input 
          type="range" 
          min="0" 
          max="100" 
          v-model="animationIntensity"
          @input="updateAnimationIntensity"
        />
        <span>{{ animationIntensity }}%</span>
      </div>

      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="enableWaves"
            @change="toggleWaves"
          />
          珠江水纹
        </label>
      </div>

      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="enableConnections"
            @change="toggleConnections"
          />
          城市連接線
        </label>
      </div>

      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="enableLandmarks"
            @change="toggleLandmarks"
          />
          地標建筑
        </label>
      </div>

      <div class="control-group">
        <label>
          <input 
            type="checkbox" 
            v-model="enableClouds"
            @change="toggleClouds"
          />
          雲层飘移
        </label>
      </div>

      <div class="control-group">
        <label>動画主題</label>
        <select v-model="animationTheme" @change="changeTheme">
          <option value="default">默認</option>
          <option value="night">夜景模式</option>
          <option value="festival">节慶模式</option>
          <option value="business">商務模式</option>
        </select>
      </div>

      <div class="control-group">
        <button @click="resetAnimations" class="reset-btn">
          🔄 重置動画
        </button>
      </div>
    </div>

    <button 
      class="toggle-controls" 
      @click="showControls = !showControls"
      :class="{ active: showControls }"
    >
      ⚙️
    </button>
  </div>
</template>

<script>
export default {
  name: 'GeographicAnimationController',
  data() {
    return {
      showControls: false,
      animationIntensity: 80,
      enableWaves: true,
      enableConnections: true,
      enableLandmarks: true,
      enableClouds: true,
      animationTheme: 'default'
    }
  },
  methods: {
    updateAnimationIntensity() {
      const intensity = this.animationIntensity / 100
      document.documentElement.style.setProperty('--animation-intensity', intensity)
      
      // 调整動画速度
      const elements = document.querySelectorAll('.geographic-background *')
      elements.forEach(el => {
        if (el.style.animationDuration) {
          const baseDuration = parseFloat(el.dataset.baseDuration || '1')
          el.style.animationDuration = `${baseDuration / intensity}s`
        }
      })
    },

    toggleWaves() {
      const waves = document.querySelector('.pearl-river-waves')
      if (waves) {
        waves.style.display = this.enableWaves ? 'block' : 'none'
      }
    },

    toggleConnections() {
      const connections = document.querySelector('.connection-lines')
      if (connections) {
        connections.style.display = this.enableConnections ? 'block' : 'none'
      }
    },

    toggleLandmarks() {
      const landmarks = document.querySelector('.landmarks')
      if (landmarks) {
        landmarks.style.display = this.enableLandmarks ? 'block' : 'none'
      }
    },

    toggleClouds() {
      const clouds = document.querySelector('.clouds')
      if (clouds) {
        clouds.style.display = this.enableClouds ? 'block' : 'none'
      }
    },

    changeTheme() {
      const background = document.querySelector('.geographic-background')
      if (background) {
        background.className = `geographic-background theme-${this.animationTheme}`
      }
    },

    resetAnimations() {
      // 重新触發所有動画
      const animatedElements = document.querySelectorAll('.geographic-background [class*="animation"]')
      animatedElements.forEach(el => {
        el.style.animation = 'none'
        el.offsetHeight // 触發重排
        el.style.animation = null
      })
    }
  },

  mounted() {
    // 初始化動画强度
    this.updateAnimationIntensity()
  }
}
</script>

<style scoped>
.animation-controller {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.control-panel {
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1rem;
  min-width: 250px;
  backdrop-filter: blur(10px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.animation-controller:hover .control-panel,
.control-panel:focus-within {
  transform: translateX(0);
}

.control-panel h4 {
  margin: 0 0 1rem 0;
  color: #fff;
  font-size: 0.9rem;
}

.control-group {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-group label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  min-width: 80px;
}

.control-group input[type="range"] {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
}

.control-group input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: #4a90e2;
  border-radius: 50%;
  cursor: pointer;
}

.control-group input[type="checkbox"] {
  margin-right: 0.5rem;
}

.control-group select {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #fff;
  padding: 0.25rem;
  font-size: 0.8rem;
}

.reset-btn {
  background: linear-gradient(135deg, #4a90e2, #357abd);
  border: none;
  border-radius: 6px;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.toggle-controls {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.toggle-controls:hover {
  background: rgba(74, 144, 226, 0.8);
  transform: scale(1.1);
}

.toggle-controls.active {
  background: #4a90e2;
  transform: rotate(90deg);
}

/* 主題樣式 */
:global(.theme-night) {
  filter: hue-rotate(240deg) brightness(0.7);
}

:global(.theme-festival) {
  filter: hue-rotate(60deg) saturate(1.5) brightness(1.2);
}

:global(.theme-business) {
  filter: grayscale(0.3) contrast(1.1);
}

@media (max-width: 768px) {
  .animation-controller {
    top: 10px;
    right: 10px;
  }
  
  .control-panel {
    min-width: 200px;
    padding: 0.75rem;
  }
  
  .toggle-controls {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>
