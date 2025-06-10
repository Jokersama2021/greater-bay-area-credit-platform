<template>
  <div class="compact-stats-card" @click="showDetails">
    <div class="stats-icon" :style="{ backgroundColor: iconColor + '20', color: iconColor }">
      <i :class="icon"></i>
    </div>
    <div class="stats-content">
      <div class="stats-value" :style="{ color: iconColor }">{{ value }}</div>
      <div class="stats-label">{{ label }}</div>
      <div class="stats-trend" v-if="trend" :class="trend.type">
        <i :class="trend.type === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
        <span>{{ trend.value }}</span>
      </div>
    </div>
    <div class="stats-action">
      <i class="fas fa-chevron-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompactStatsCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: '#007AFF'
    },
    value: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      required: true
    },
    trend: {
      type: Object,
      default: null
    }
  },
  methods: {
    showDetails() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.compact-stats-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.compact-stats-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.stats-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.compact-stats-card:hover .stats-icon {
  transform: scale(1.1);
}

.stats-content {
  flex: 1;
  min-width: 0;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 2px;
}

.stats-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.3;
  margin-bottom: 4px;
}

.stats-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.stats-trend.up {
  color: #30D158;
}

.stats-trend.down {
  color: #FF3B30;
}

.stats-trend i {
  font-size: 0.7rem;
}

.stats-action {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.compact-stats-card:hover .stats-action {
  color: rgba(255, 255, 255, 0.7);
  transform: translateX(2px);
}

/* 响應式设計 */
@media (max-width: 768px) {
  .compact-stats-card {
    padding: 14px;
    gap: 12px;
  }
  
  .stats-icon {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
  
  .stats-value {
    font-size: 1.3rem;
  }
  
  .stats-label {
    font-size: 0.8rem;
  }
}
</style>
