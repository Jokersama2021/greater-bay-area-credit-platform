<template>
  <div class="service-records">
    <div class="records-list">
      <div v-for="record in records" :key="record.id" class="record-item">
        <div class="record-icon" :style="{ backgroundColor: record.color + '20', color: record.color }">
          <i :class="record.icon"></i>
        </div>
        <div class="record-content">
          <div class="record-header">
            <div class="record-title">{{ record.title }}</div>
            <div class="record-region">{{ record.region }}</div>
          </div>
          <div class="record-info">
            <span class="record-type">{{ record.type }}</span>
            <span class="record-amount">{{ record.amount }}</span>
          </div>
          <div class="record-footer">
            <span class="record-time">{{ record.time }}</span>
            <div class="record-status" :class="record.status" :style="{ color: record.color }">
              {{ record.statusText }}
            </div>
          </div>
        </div>
        <div class="record-indicator" :style="{ backgroundColor: record.color }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ServiceRecords',
  setup() {
    const records = ref([
      {
        id: 1,
        title: '香港汇丰银行信用评估',
        type: '信用评估',
        time: '2025-03-31 14:30',
        status: 'completed',
        statusText: '已完成',
        icon: 'fas fa-check-circle',
        color: '#30D158',
        amount: '¥2,500,000',
        region: 'HK'
      },
      {
        id: 2,
        title: '澳门中银跨境融资',
        type: '融资服务',
        time: '2025-03-30 16:45',
        status: 'processing',
        statusText: '处理中',
        icon: 'fas fa-sync',
        color: '#007AFF',
        amount: '¥5,800,000',
        region: 'MO'
      },
      {
        id: 3,
        title: '深圳工行授信申请',
        type: '授信服务',
        time: '2025-03-29 10:15',
        status: 'completed',
        statusText: '已完成',
        icon: 'fas fa-check-circle',
        color: '#30D158',
        amount: '¥3,200,000',
        region: 'SZ'
      },
      {
        id: 4,
        title: '广州农行风险评估',
        type: '风险评估',
        time: '2025-03-28 09:20',
        status: 'pending',
        statusText: '待处理',
        icon: 'fas fa-clock',
        color: '#FF9500',
        amount: '¥1,800,000',
        region: 'GZ'
      },
      {
        id: 5,
        title: '珠海建行贸易融资',
        type: '贸易融资',
        time: '2025-03-27 15:30',
        status: 'completed',
        statusText: '已完成',
        icon: 'fas fa-check-circle',
        color: '#30D158',
        amount: '¥4,100,000',
        region: 'ZH'
      }
    ])

    return {
      records
    }
  }
}
</script>

<style scoped>
.service-records {
  height: 100%;
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 100%;
  overflow-y: auto;
  padding-right: 4px;
}

.records-list::-webkit-scrollbar {
  width: 4px;
}

.records-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.records-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.records-list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.record-item {
  position: relative;
  display: flex;
  gap: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.record-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.record-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px) scale(1.01);
  box-shadow:
    0 8px 25px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.05);
}

.record-item:hover::before {
  opacity: 1;
}

.record-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.record-icon::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.record-item:hover .record-icon::before {
  animation: iconShimmer 1.5s ease-in-out;
}

.record-icon i {
  font-size: 1.3rem;
  transition: transform 0.3s ease;
  z-index: 1;
}

.record-item:hover .record-icon i {
  transform: scale(1.1);
}

.record-content {
  flex: 1;
  min-width: 0;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.record-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.01em;
  line-height: 1.3;
}

.record-region {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 6px;
  border-radius: 6px;
  letter-spacing: 0.02em;
}

.record-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.record-type {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.01em;
}

.record-amount {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02em;
}

.record-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.record-time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 0.01em;
}

.record-status {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
}

.record-indicator {
  width: 3px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 0 12px 12px 0;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.record-item:hover .record-indicator {
  opacity: 1;
  width: 4px;
}

@keyframes iconShimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .record-item {
    padding: 12px;
  }

  .record-icon {
    width: 40px;
    height: 40px;
  }

  .record-icon i {
    font-size: 1.1rem;
  }

  .record-title {
    font-size: 0.85rem;
  }

  .record-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
}
</style>