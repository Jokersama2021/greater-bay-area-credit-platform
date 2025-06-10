<template>
  <div class="map-container" ref="mapRef">
    <div class="background-particles">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>
    <div class="gba-title">
      <span class="title-glow">粵港澳大灣區</span>
      <div class="title-underline"></div>
    </div>
    <div class="stats-summary">總數據量: <span class="stats-value">{{ totalValue }}</span> 家企業</div>
    <div class="rectangle-map">
      <router-link
        v-for="(layout, index) in cityLayout"
        :key="index"
        class="city-block enhanced-city-button city-animate-in"
        :class="{
          'guangzhou': cityData[layout.id].name === '廣州',
          'shenzhen': cityData[layout.id].name === '深圳',
          'hongkong': cityData[layout.id].name === '香港',
          'macau': cityData[layout.id].name === '澳門'
        }"
        :style="{
          gridArea: layout.gridArea,
          backgroundColor: cityData[layout.id].color,
          backgroundImage: `linear-gradient(135deg, ${cityData[layout.id].color} 0%, ${cityData[layout.id].colorEnd} 100%)`,
          animationDelay: `${index * 0.03}s`
        }"
        :to="`/enterprises?city=${encodeURIComponent(cityData[layout.id].name)}`"
        @click="handleCityClick"
      >
        <div class="city-background"></div>
        <div class="city-ripple"></div>
        <div class="city-name">{{ cityData[layout.id].name }}</div>
        <div class="city-value">{{ cityData[layout.id].value }}</div>
        <div class="connection-lines" v-if="['廣州', '深圳', '香港'].includes(cityData[layout.id].name)"></div>
        <div class="city-glow-effect"></div>
      </router-link>
    </div>
    <div class="map-legend">
      <div class="legend-item">
        <div class="legend-color mainland"></div>
        <div class="legend-text">内地城市</div>
      </div>
      <div class="legend-item">
        <div class="legend-color sar"></div>
        <div class="legend-text">特別行政區</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'

export default {
  name: 'GreaterBayAreaMap',
  setup() {
    const mapRef = ref(null)
    
    const cityData = reactive([
      { name: '肇慶', value: 2, color: '#2c3e50', colorEnd: '#1e2a36', rank: 10 },
      { name: '廣州', value: 10, color: '#4a1942', colorEnd: '#2d1423', rank: 1 },
      { name: '惠州', value: 3, color: '#1b3a4b', colorEnd: '#072736', rank: 7 },
      { name: '佛山', value: 4, color: '#3d2c20', colorEnd: '#241a14', rank: 5 },
      { name: '東莞', value: 4, color: '#3a3104', colorEnd: '#1e1a02', rank: 4 },
      { name: '江門', value: 3, color: '#2d2d2d', colorEnd: '#1a1a1a', rank: 8 },
      { name: '中山', value: 3, color: '#333622', colorEnd: '#1e1f14', rank: 6 },
      { name: '珠海', value: 4, color: '#432234', colorEnd: '#2c1722', rank: 3 },
      { name: '深圳', value: 12, color: '#6e1230', colorEnd: '#420a1c', rank: 1 },
      { name: '香港', value: 10, color: '#133a5e', colorEnd: '#0a2239', rank: 2 },
      { name: '澳門', value: 8, color: '#133a5e', colorEnd: '#0a2239', rank: 3 }
    ])

    // 排列成完整矩形
    const cityLayout = reactive([
      { id: 0, gridArea: '1 / 1 / 2 / 2' }, // 肇慶
      { id: 1, gridArea: '1 / 2 / 2 / 4' }, // 廣州 - 占2格
      { id: 2, gridArea: '1 / 4 / 2 / 5' }, // 惠州
      { id: 3, gridArea: '2 / 1 / 3 / 2' }, // 佛山
      { id: 4, gridArea: '2 / 2 / 3 / 3' }, // 東莞
      { id: 8, gridArea: '2 / 3 / 3 / 4' }, // 深圳
      { id: 9, gridArea: '2 / 4 / 3 / 5' }, // 香港
      { id: 5, gridArea: '3 / 1 / 4 / 2' }, // 江門
      { id: 6, gridArea: '3 / 2 / 4 / 3' }, // 中山
      { id: 7, gridArea: '3 / 3 / 4 / 4' }, // 珠海
      { id: 10, gridArea: '3 / 4 / 4 / 5' }  // 澳門
    ])

    // 計算總數值
    const totalValue = computed(() => {
      return cityData.reduce((sum, city) => sum + city.value, 0);
    });

    // 随機粒子動画
    onMounted(() => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        animateParticle(particle);
      });

      // 确保所有城市在動画完成后保持可見
      setTimeout(() => {
        const cityBlocks = document.querySelectorAll('.city-animate-in');
        cityBlocks.forEach(block => {
          block.classList.add('animation-complete');
        });
      }, 2000);
    });

    const animateParticle = (element) => {
      const duration = Math.random() * 15 + 15; // 15-30秒
      const delay = Math.random() * 10; // 0-10秒延迟
      const size = Math.random() * 4 + 1; // 1-5px
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = Math.random() * 100;
      const endY = Math.random() * 100;

      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.opacity = Math.random() * 0.5 + 0.1;
      element.style.left = `${startX}%`;
      element.style.top = `${startY}%`;
      element.style.animationDuration = `${duration}s`;
      element.style.animationDelay = `${delay}s`;

      // 设置自定义属性用于CSS動画
      element.style.setProperty('--end-x', `${endX}%`);
      element.style.setProperty('--end-y', `${endY}%`);
    };

    const handleCityClick = (event) => {
      const city = event.currentTarget
      const ripple = city.querySelector('.city-ripple')
      const rect = city.getBoundingClientRect()

      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = x + 'px'
      ripple.style.top = y + 'px'

      ripple.classList.remove('ripple-animate')
      void ripple.offsetWidth
      ripple.classList.add('ripple-animate')
    };

    return {
      mapRef,
      cityData,
      cityLayout,
      totalValue,
      handleCityClick
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  min-height: 450px;
  position: relative;
  border-radius: 16px;
  background: linear-gradient(145deg, #061029, #0c1a43);
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.3), 0 10px 30px rgba(0, 0, 20, 0.5);
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* 背景粒子 */
.background-particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: floatParticle 20s linear infinite;
}

@keyframes floatParticle {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(var(--end-x), var(--end-y));
  }
}

.gba-title {
  text-align: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
}

.title-glow {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: white;
  text-shadow: 0 0 10px rgba(135, 206, 250, 0.8);
  animation: titlePulse 3s infinite;
  position: relative;
}

.title-underline {
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, rgba(135, 206, 250, 0.2), rgba(135, 206, 250, 0.8), rgba(135, 206, 250, 0.2));
  margin: 10px auto 0;
  border-radius: 2px;
}

.stats-summary {
  text-align: center;
  margin-bottom: 20px;
  font-family: var(--font-body);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.5px;
}

.stats-value {
  font-family: var(--font-digital);
  font-weight: bold;
  font-size: 1.1rem;
  color: #4fd1c5;
  letter-spacing: 1px;
  text-shadow: 0 0 8px rgba(79, 209, 197, 0.4);
}

.rectangle-map {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
  position: relative;
  z-index: 2;
  min-height: 300px;
  width: 100%;
}

.city-block {
  position: relative;
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 12px 8px;
  color: white;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 85px;
  opacity: 1 !important;
  visibility: visible !important;
}

/* 城市模块進入動画 - 更自然的淡入效果 */
.city-animate-in {
  opacity: 0;
  transform: translateY(15px);
  animation: citySmoothIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes citySmoothIn {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 确保動画完成后城市保持可見 */
.city-animate-in.animation-complete {
  opacity: 1 !important;
  transform: translateY(0) !important;
}

.enhanced-city-button .city-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 50%,
    rgba(255, 255, 255, 0.1) 100%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.enhanced-city-button .city-ripple {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
  transform: scale(0);
  pointer-events: none;
}

.enhanced-city-button .city-ripple.ripple-animate {
  animation: cityRippleEffect 0.8s ease-out;
}

@keyframes cityRippleEffect {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

.enhanced-city-button .city-glow-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.enhanced-city-button:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    0 0 20px rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  z-index: 10;
}

.enhanced-city-button:hover .city-background {
  opacity: 1;
}

.enhanced-city-button:hover .city-glow-effect {
  opacity: 1;
}

.enhanced-city-button:active {
  transform: translateY(-4px) scale(1.02);
}

.city-block::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.1));
  opacity: 0;
  transition: opacity 0.3s;
}

.city-block:hover::after {
  opacity: 1;
}

.city-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  z-index: 2;
  letter-spacing: 1px;
}

.city-value {
  font-family: var(--font-digital);
  font-size: 1.3rem;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.95);
  margin-top: 5px;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  letter-spacing: 1px;
}

/* 連接線 */
.connection-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* 图例 */
.map-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
  z-index: 2;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.legend-color.mainland {
  background: linear-gradient(135deg, #3d2c20, #241a14);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.legend-color.sar {
  background: linear-gradient(135deg, #133a5e, #0a2239);
  border: 1px solid rgba(0, 174, 255, 0.6);
  box-shadow: 0 0 5px rgba(0, 112, 186, 0.4);
}

.legend-text {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.5px;
}

/* 廣州特殊樣式 */
.guangzhou {
  z-index: 6 !important;
  animation: glow 3s infinite;
  border: 2px solid rgba(255, 255, 255, 0.7) !important;
  box-shadow: 0 0 20px rgba(74, 25, 66, 0.6) !important;
}

/* 深圳特殊樣式 */
.shenzhen {
  animation: shine 2s infinite;
  z-index: 5 !important;
  border: 2px solid rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 0 15px rgba(110, 18, 48, 0.5) !important;
}

/* 香港特殊樣式 */
.hongkong {
  animation: borderGlow 4s infinite alternate;
  z-index: 5 !important;
  border: 2px solid rgba(0, 174, 255, 0.6) !important;
  box-shadow: 0 0 15px rgba(0, 112, 186, 0.4) !important;
  background: rgba(19, 58, 94, 0.9) !important;
  backdrop-filter: blur(8px);
}

.hongkong .city-name {
  color: rgba(0, 174, 255, 0.9);
}

.hongkong .city-value {
  color: rgba(255, 255, 255, 0.9);
}

/* 澳門特殊樣式 */
.macau {
  animation: borderGlow 4s infinite alternate;
  z-index: 5 !important;
  border: 2px solid rgba(0, 174, 255, 0.6) !important;
  box-shadow: 0 0 15px rgba(0, 112, 186, 0.4) !important;
  background: rgba(19, 58, 94, 0.9) !important;
  backdrop-filter: blur(8px);
}

.macau .city-name {
  color: rgba(0, 174, 255, 0.9);
}

.macau .city-value {
  color: rgba(255, 255, 255, 0.9);
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.3); }
  70% { box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
}

@keyframes shine {
  0% { box-shadow: 0 0 10px 2px rgba(255, 0, 85, 0.5); }
  50% { box-shadow: 0 0 20px 5px rgba(255, 0, 85, 0.7); }
  100% { box-shadow: 0 0 10px 2px rgba(255, 0, 85, 0.5); }
}

@keyframes glow {
  0% { box-shadow: 0 0 15px 2px rgba(247, 88, 104, 0.6); }
  50% { box-shadow: 0 0 25px 8px rgba(247, 88, 104, 0.8); }
  100% { box-shadow: 0 0 15px 2px rgba(247, 88, 104, 0.6); }
}

@keyframes float {
  0% { transform: translateY(0) scale(1.03); }
  50% { transform: translateY(-8px) scale(1.06); }
  100% { transform: translateY(0) scale(1.03); }
}

@keyframes borderGlow {
  0% { border-color: rgba(0, 174, 255, 0.4); box-shadow: 0 0 10px rgba(0, 112, 186, 0.3); }
  100% { border-color: rgba(0, 174, 255, 0.8); box-shadow: 0 0 20px rgba(0, 112, 186, 0.6); }
}
</style> 