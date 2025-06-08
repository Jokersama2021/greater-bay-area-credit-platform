<template>
  <div class="data-flow-background">
    <!-- 内地城市节点 -->
    <div class="mainland-cities">
      <div
        v-for="city in mainlandCities"
        :key="city.id"
        class="city-node mainland"
        :class="{
          'sending': city.isSending,
          'receiving': city.isReceiving
        }"
        :style="{ top: city.y + '%', left: city.x + '%' }"
      >
        <div class="node-container">
          <div class="node-ring"></div>
          <div class="node-core">
            <div class="node-dot"></div>
          </div>
          <div class="node-pulse"></div>
        </div>
        <div class="city-label">
          <div class="label-bg"></div>
          <span class="label-text">{{ city.name }}</span>
        </div>
      </div>
    </div>

    <!-- 境外地区节点 -->
    <div class="overseas-cities">
      <div
        v-for="city in overseasCities"
        :key="city.id"
        class="city-node overseas"
        :class="{
          'sending': city.isSending,
          'receiving': city.isReceiving
        }"
        :style="{ top: city.y + '%', right: city.x + '%' }"
      >
        <div class="node-container">
          <div class="node-ring"></div>
          <div class="node-core">
            <div class="node-dot"></div>
          </div>
          <div class="node-pulse"></div>
        </div>
        <div class="city-label">
          <div class="label-bg"></div>
          <span class="label-text">{{ city.name }}</span>
        </div>
      </div>
    </div>

    <!-- 城市间连接线 -->
    <svg class="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line
        v-for="connection in activeConnections"
        :key="connection.id"
        :x1="connection.x1"
        :y1="connection.y1"
        :x2="connection.x2"
        :y2="connection.y2"
        :stroke="connection.isReverse ? 'rgba(245, 158, 11, 0.6)' : 'rgba(59, 130, 246, 0.6)'"
        stroke-width="0.2"
        :style="{
          animationDelay: connection.delay + 's',
          animationDuration: connection.duration + 's'
        }"
        class="city-connection"
        :class="{ 'reverse-connection': connection.isReverse }"
      />
    </svg>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'CrossBorderDataFlow',
  setup() {
    // 内地城市位置 - 分散在左侧
    const mainlandCities = ref([
      { id: 1, name: '广州', x: 3, y: 25, isSending: false, isReceiving: false },
      { id: 2, name: '深圳', x: 8, y: 55, isSending: false, isReceiving: false },
      { id: 3, name: '佛山', x: 2, y: 40, isSending: false, isReceiving: false },
      { id: 4, name: '东莞', x: 6, y: 35, isSending: false, isReceiving: false },
      { id: 5, name: '中山', x: 4, y: 65, isSending: false, isReceiving: false },
      { id: 6, name: '珠海', x: 2, y: 75, isSending: false, isReceiving: false },
      { id: 7, name: '惠州', x: 9, y: 20, isSending: false, isReceiving: false },
      { id: 8, name: '江门', x: 1, y: 60, isSending: false, isReceiving: false },
      { id: 9, name: '肇庆', x: 3, y: 10, isSending: false, isReceiving: false }
    ])

    // 境外地区位置 - 分散在右侧
    const overseasCities = ref([
      { id: 10, name: '香港', x: 6, y: 40, isSending: false, isReceiving: false },
      { id: 11, name: '澳门', x: 3, y: 70, isSending: false, isReceiving: false }
    ])

    // 活跃的城市连接
    const activeConnections = ref([])

    // 创建城市间连接
    const createCityConnection = () => {
      // 随机决定传输方向：true = 内地到境外，false = 境外到内地
      const isMainlandToOverseas = Math.random() > 0.4 // 60% 概率内地到境外，40% 概率境外到内地

      let fromCity, toCity, fromCityIndex, toCityIndex

      if (isMainlandToOverseas) {
        // 内地到境外
        fromCityIndex = Math.floor(Math.random() * mainlandCities.value.length)
        fromCity = mainlandCities.value[fromCityIndex]
        toCityIndex = Math.floor(Math.random() * overseasCities.value.length)
        toCity = overseasCities.value[toCityIndex]
      } else {
        // 境外到内地
        fromCityIndex = Math.floor(Math.random() * overseasCities.value.length)
        fromCity = overseasCities.value[fromCityIndex]
        toCityIndex = Math.floor(Math.random() * mainlandCities.value.length)
        toCity = mainlandCities.value[toCityIndex]
      }

      // 设置发送动画
      fromCity.isSending = true
      setTimeout(() => {
        fromCity.isSending = false
      }, 300)

      // 延迟设置接收动画
      setTimeout(() => {
        toCity.isReceiving = true
        setTimeout(() => {
          toCity.isReceiving = false
        }, 300)
      }, 1500) // 1.5秒后接收

      const connection = {
        id: Date.now() + Math.random(),
        x1: isMainlandToOverseas ? fromCity.x : (100 - fromCity.x),
        y1: fromCity.y,
        x2: isMainlandToOverseas ? (100 - toCity.x) : toCity.x,
        y2: toCity.y,
        delay: 0,
        duration: 3,
        isReverse: !isMainlandToOverseas // 境外到内地时为反向
      }

      activeConnections.value.push(connection)

      // 清理旧的连接
      if (activeConnections.value.length > 8) {
        activeConnections.value = activeConnections.value.slice(-5)
      }
    }

    let connectionInterval

    onMounted(() => {
      // 初始创建一些连接
      for (let i = 0; i < 3; i++) {
        setTimeout(() => createCityConnection(), i * 1000)
      }

      // 定期创建新的连接
      connectionInterval = setInterval(() => {
        createCityConnection()
      }, 3000 + Math.random() * 2000) // 3-5秒间隔
    })

    onUnmounted(() => {
      if (connectionInterval) {
        clearInterval(connectionInterval)
      }
    })

    return {
      mainlandCities,
      overseasCities,
      activeConnections
    }
  }
}
</script>

<style scoped>
.data-flow-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
  opacity: 0.8;
}

/* 城市节点 */
.city-node {
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.node-container {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 外环 */
.node-ring {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

/* 核心 */
.node-core {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* 中心点 */
.node-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
}

/* 脉冲效果 */
.node-pulse {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid;
  opacity: 0;
  animation: nodePulse 3s ease-in-out infinite;
}

/* 内地城市样式 */
.mainland .node-ring {
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.1);
}

.mainland .node-core {
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

.mainland .node-pulse {
  border-color: rgba(59, 130, 246, 0.8);
}

/* 境外地区样式 */
.overseas .node-ring {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.1);
}

.overseas .node-core {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}

.overseas .node-pulse {
  border-color: rgba(245, 158, 11, 0.8);
}

/* 发送动画 - 压缩效果 */
.city-node.sending .node-container {
  animation: sendCompress 0.3s ease-out;
}

.city-node.sending .node-pulse {
  animation: sendPulse 0.3s ease-out;
}

/* 接收动画 - 膨胀效果 */
.city-node.receiving .node-container {
  animation: receiveExpand 0.3s ease-out;
}

.city-node.receiving .node-pulse {
  animation: receivePulse 0.3s ease-out;
}

/* 城市标签 */
.city-label {
  position: absolute;
  top: 26px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.label-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.label-text {
  position: relative;
  display: block;
  padding: 3px 8px;
  font-size: 9px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 0.3px;
}

/* 城市连接线 */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.city-connection {
  animation: connectionPulse 4s ease-in-out infinite;
  stroke-dasharray: 2 3;
}

.city-connection.reverse-connection {
  animation: connectionPulseReverse 4s ease-in-out infinite;
  stroke-dasharray: 3 2;
}

/* 动画 */
@keyframes nodePulse {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.5);
  }
  100% {
    opacity: 0;
    transform: scale(2);
  }
}

/* 发送动画 */
@keyframes sendCompress {
  0% { transform: scale(1); }
  50% { transform: scale(0.8); }
  100% { transform: scale(1); }
}

@keyframes sendPulse {
  0% {
    opacity: 0;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(2);
  }
}

/* 接收动画 */
@keyframes receiveExpand {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

@keyframes receivePulse {
  0% {
    opacity: 0;
    transform: scale(2);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes connectionPulse {
  0% {
    opacity: 0.3;
    stroke-dashoffset: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.3;
    stroke-dashoffset: -5;
  }
}

@keyframes connectionPulseReverse {
  0% {
    opacity: 0.3;
    stroke-dashoffset: 0;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.3;
    stroke-dashoffset: 5;
  }
}
</style>
