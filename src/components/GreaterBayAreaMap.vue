<template>
  <div class="map-container" ref="mapRef">
    <div class="background-particles">
      <div v-for="n in 20" :key="n" class="particle"></div>
    </div>
    <div class="gba-title">
      <span class="title-glow">粤港澳大湾区</span>
      <div class="title-underline"></div>
    </div>
    <div class="stats-summary">总数据量: <span class="stats-value">{{ totalValue }}</span> 家企业</div>
    <div class="rectangle-map">
      <router-link 
        v-for="(layout, index) in cityLayout" 
        :key="index"
        class="city-block"
        :class="{ 
          'guangzhou': cityData[layout.id].name === '广州',
          'shenzhen': cityData[layout.id].name === '深圳',
          'hongkong': cityData[layout.id].name === '香港',
          'macau': cityData[layout.id].name === '澳门'
        }"
        :style="{ 
          gridArea: layout.gridArea,
          backgroundColor: cityData[layout.id].color, 
          backgroundImage: `linear-gradient(135deg, ${cityData[layout.id].color} 0%, ${cityData[layout.id].colorEnd} 100%)`
        }"
        :to="`/enterprises?city=${encodeURIComponent(cityData[layout.id].name)}`"
      >
        <div class="city-name">{{ cityData[layout.id].name }}</div>
        <div class="city-value">{{ cityData[layout.id].value }}</div>
        <div class="connection-lines" v-if="['广州', '深圳', '香港'].includes(cityData[layout.id].name)"></div>
      </router-link>
    </div>
    <div class="map-legend">
      <div class="legend-item">
        <div class="legend-color mainland"></div>
        <div class="legend-text">大陆城市</div>
      </div>
      <div class="legend-item">
        <div class="legend-color sar"></div>
        <div class="legend-text">特别行政区</div>
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
      { name: '肇庆', value: 142, color: '#2c3e50', colorEnd: '#1e2a36', rank: 9 },
      { name: '广州', value: 621, color: '#4a1942', colorEnd: '#2d1423', rank: 1 },
      { name: '惠州', value: 289, color: '#1b3a4b', colorEnd: '#072736', rank: 4 },
      { name: '佛山', value: 418, color: '#3d2c20', colorEnd: '#241a14', rank: 3 },
      { name: '东莞', value: 566, color: '#3a3104', colorEnd: '#1e1a02', rank: 2 },
      { name: '江门', value: 156, color: '#2d2d2d', colorEnd: '#1a1a1a', rank: 8 },
      { name: '中山', value: 321, color: '#333622', colorEnd: '#1e1f14', rank: 6 },
      { name: '珠海', value: 184, color: '#432234', colorEnd: '#2c1722', rank: 7 },
      { name: '深圳', value: 532, color: '#6e1230', colorEnd: '#420a1c', rank: 2 },
      { name: '香港', value: 787, color: '#133a5e', colorEnd: '#0a2239', rank: 1 },
      { name: '澳门', value: 103, color: '#133a5e', colorEnd: '#0a2239', rank: 10 }
    ])

    // 排列成完整矩形
    const cityLayout = reactive([
      { id: 0, gridArea: '1 / 1 / 2 / 2' }, // 肇庆
      { id: 1, gridArea: '1 / 2 / 2 / 4' }, // 广州 - 占2格
      { id: 2, gridArea: '1 / 4 / 2 / 5' }, // 惠州
      { id: 3, gridArea: '2 / 1 / 3 / 2' }, // 佛山
      { id: 4, gridArea: '2 / 2 / 3 / 3' }, // 东莞
      { id: 8, gridArea: '2 / 3 / 3 / 4' }, // 深圳
      { id: 9, gridArea: '2 / 4 / 3 / 5' }, // 香港
      { id: 5, gridArea: '3 / 1 / 4 / 2' }, // 江门
      { id: 6, gridArea: '3 / 2 / 4 / 3' }, // 中山
      { id: 7, gridArea: '3 / 3 / 4 / 4' }, // 珠海
      { id: 10, gridArea: '3 / 4 / 4 / 5' }  // 澳门
    ])

    // 计算总数值
    const totalValue = computed(() => {
      return cityData.reduce((sum, city) => sum + city.value, 0);
    });

    // 随机粒子动画
    onMounted(() => {
      const particles = document.querySelectorAll('.particle');
      particles.forEach(particle => {
        animateParticle(particle);
      });
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
      
      // 设置自定义属性用于CSS动画
      element.style.setProperty('--end-x', `${endX}%`);
      element.style.setProperty('--end-y', `${endY}%`);
    };

    return {
      mapRef,
      cityData,
      cityLayout,
      totalValue
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
  gap: 12px;
  padding: 12px;
  perspective: 1200px;
  position: relative;
  z-index: 2;
}

.city-block {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: 15px;
  color: white;
  overflow: hidden;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.city-block:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.2);
  z-index: 10;
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

/* 连接线 */
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

/* 广州特殊样式 */
.guangzhou {
  transform: scale(1.05);
  z-index: 6;
  animation: glow 3s infinite;
  border: 2px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 20px rgba(74, 25, 66, 0.6);
}

.guangzhou .city-name {
  font-size: 1.4rem;
  letter-spacing: 1.5px;
}

.guangzhou .city-value {
  font-size: 1.5rem;
  letter-spacing: 1.5px;
}

/* 深圳特殊样式 */
.shenzhen {
  animation: shine 2s infinite;
  transform: scale(1.05);
  z-index: 5;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 15px rgba(110, 18, 48, 0.5);
}

.shenzhen .city-name {
  font-size: 1.3rem;
  letter-spacing: 1.2px;
}

.shenzhen .city-value {
  font-size: 1.4rem;
  letter-spacing: 1.2px;
}

/* 香港特殊样式 */
.hongkong {
  animation: borderGlow 4s infinite alternate;
  transform: scale(1.05);
  z-index: 5;
  border: 2px solid rgba(0, 174, 255, 0.6);
  box-shadow: 0 0 15px rgba(0, 112, 186, 0.4);
  background: rgba(19, 58, 94, 0.9) !important;
  backdrop-filter: blur(8px);
}

.hongkong .city-name {
  font-size: 1.3rem;
  color: rgba(0, 174, 255, 0.9);
  letter-spacing: 1.2px;
}

.hongkong .city-value {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1.2px;
}

/* 澳门特殊样式 */
.macau {
  animation: borderGlow 4s infinite alternate;
  transform: scale(1.05);
  z-index: 5;
  border: 2px solid rgba(0, 174, 255, 0.6);
  box-shadow: 0 0 15px rgba(0, 112, 186, 0.4);
  background: rgba(19, 58, 94, 0.9) !important;
  backdrop-filter: blur(8px);
}

.macau .city-name {
  font-size: 1.3rem;
  color: rgba(0, 174, 255, 0.9);
  letter-spacing: 1.2px;
}

.macau .city-value {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 1.2px;
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