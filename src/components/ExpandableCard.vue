<template>
  <div class="expandable-card" :class="{ expanded: isExpanded }">
    <!-- 卡片头部 - 始终显示 -->
    <div class="card-header" @click="toggleExpand">
      <div class="header-left">
        <div class="card-icon" :style="{ backgroundColor: iconColor + '20', color: iconColor }">
          <i :class="icon"></i>
        </div>
        <div class="header-info">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div class="header-right">
        <div class="summary-data" v-if="summaryData">
          <span class="summary-value" :style="{ color: iconColor }">{{ summaryData.value }}</span>
          <span class="summary-label">{{ summaryData.label }}</span>
        </div>
        <button class="expand-btn" :class="{ rotated: isExpanded }">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>

    <!-- 卡片内容 - 展开时显示 -->
    <transition name="expand">
      <div v-if="isExpanded" class="card-content">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ExpandableCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: '#007AFF'
    },
    summaryData: {
      type: Object,
      default: null
    },
    defaultExpanded: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isExpanded = ref(props.defaultExpanded)
    
    const toggleExpand = () => {
      isExpanded.value = !isExpanded.value
    }
    
    return {
      isExpanded,
      toggleExpand
    }
  }
}
</script>

<style scoped>
.expandable-card {
  background: var(--card-background);
  border: 1px solid var(--card-border);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.expandable-card:hover {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
  transform: translateY(-2px);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.expandable-card.expanded {
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-header:hover {
  background: rgba(255, 255, 255, 0.02);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  transition: all 0.3s ease;
}

.expandable-card:hover .card-icon {
  transform: scale(1.05);
}

.header-info {
  flex: 1;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.card-subtitle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.summary-data {
  text-align: right;
  min-width: 80px;
}

.summary-value {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
}

.summary-label {
  display: block;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 2px;
}

.expand-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.expand-btn.rotated {
  transform: rotate(180deg);
}

.expand-btn.rotated:hover {
  transform: rotate(180deg) scale(1.05);
}

.card-content {
  padding: 0 20px 20px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: -1px;
}

/* 展开动画 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.expand-enter-to,
.expand-leave-from {
  max-height: 1000px;
  opacity: 1;
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .card-header {
    padding: 16px;
  }
  
  .header-left {
    gap: 12px;
  }
  
  .card-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .card-title {
    font-size: 1rem;
  }
  
  .card-subtitle {
    font-size: 0.8rem;
  }
  
  .summary-value {
    font-size: 1.2rem;
  }
  
  .card-content {
    padding: 0 16px 16px 16px;
  }
}
</style>
