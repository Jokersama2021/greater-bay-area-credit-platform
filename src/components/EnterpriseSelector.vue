<template>
  <div class="enterprise-selector">
    <div class="selector-header">
      <div class="current-enterprise">
        <div class="enterprise-info">
          <h3 class="enterprise-name">{{ currentEnterprise.name }}</h3>
          <div class="enterprise-meta">
            <span class="region">{{ currentEnterprise.region }}</span>
            <span class="credit-level" :class="creditLevelClass">{{ currentEnterprise.creditLevel }}</span>
          </div>
        </div>
        <div class="auto-switch-indicator" :class="{ active: isAutoSwitching }">
          <div class="indicator-dot"></div>
          <span>{{ isAutoSwitching ? '自動切换' : '手動模式' }}</span>
        </div>
      </div>
      
      <div class="selector-controls">
        <button 
          class="control-btn" 
          @click="switchToPrevious"
          :disabled="isAutoSwitching"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button 
          class="control-btn auto-toggle" 
          @click="toggleAutoSwitch"
          :class="{ active: isAutoSwitching }"
        >
          <i class="fas fa-play" v-if="!isAutoSwitching"></i>
          <i class="fas fa-pause" v-else></i>
        </button>
        
        <button 
          class="control-btn" 
          @click="switchToNext"
          :disabled="isAutoSwitching"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
    
    <div class="enterprise-dropdown" v-if="showDropdown">
      <div class="dropdown-header">
        <span>選择企業</span>
        <button class="close-btn" @click="showDropdown = false">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="enterprise-list">
        <div 
          v-for="enterprise in allEnterprises" 
          :key="enterprise.id"
          class="enterprise-item"
          :class="{ active: enterprise.id === currentEnterprise.id }"
          @click="selectEnterprise(enterprise.id)"
        >
          <div class="item-info">
            <div class="item-name">{{ enterprise.name }}</div>
            <div class="item-meta">
              <span class="item-region">{{ enterprise.region }}</span>
              <span class="item-score">{{ enterprise.creditScore }}分</span>
            </div>
          </div>
          <div class="item-level" :class="getCreditLevelClass(enterprise.creditLevel)">
            {{ enterprise.creditLevel }}
          </div>
        </div>
      </div>
    </div>
    
    <button class="dropdown-toggle" @click="showDropdown = !showDropdown">
      <span>選择其他企業</span>
      <i class="fas fa-chevron-down" :class="{ rotated: showDropdown }"></i>
    </button>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { enterpriseDataService } from '../services/enterpriseDataService'

export default {
  name: 'EnterpriseSelector',
  setup() {
    const showDropdown = ref(false)
    const isAutoSwitching = ref(true)
    
    const currentEnterprise = computed(() => enterpriseDataService.getCurrentEnterprise())
    const allEnterprises = computed(() => enterpriseDataService.getAllEnterprises())
    
    const creditLevelClass = computed(() => {
      const level = currentEnterprise.value.creditLevel
      return {
        'level-aaa': level === 'AAA',
        'level-aa': level === 'AA',
        'level-a': level === 'A'
      }
    })
    
    const getCreditLevelClass = (level) => {
      return {
        'level-aaa': level === 'AAA',
        'level-aa': level === 'AA',
        'level-a': level === 'A'
      }
    }
    
    const selectEnterprise = (enterpriseId) => {
      enterpriseDataService.setCurrentEnterprise(enterpriseId)
      showDropdown.value = false
      // 選择企業后停止自動切换
      if (isAutoSwitching.value) {
        toggleAutoSwitch()
      }
    }
    
    const switchToNext = () => {
      enterpriseDataService.switchToNext()
    }
    
    const switchToPrevious = () => {
      enterpriseDataService.switchToPrevious()
    }
    
    const toggleAutoSwitch = () => {
      if (isAutoSwitching.value) {
        enterpriseDataService.stopAutoSwitch()
        isAutoSwitching.value = false
      } else {
        enterpriseDataService.startAutoSwitch()
        isAutoSwitching.value = true
      }
    }
    
    // 點击外部關闭下拉菜单
    const handleClickOutside = (event) => {
      if (!event.target.closest('.enterprise-selector')) {
        showDropdown.value = false
      }
    }
    
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      showDropdown,
      isAutoSwitching,
      currentEnterprise,
      allEnterprises,
      creditLevelClass,
      getCreditLevelClass,
      selectEnterprise,
      switchToNext,
      switchToPrevious,
      toggleAutoSwitch
    }
  }
}
</script>

<style scoped>
.enterprise-selector {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 16px;
  position: relative;
}

.selector-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.current-enterprise {
  flex: 1;
}

.enterprise-info {
  margin-bottom: 8px;
}

.enterprise-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 2px 0;
}

.enterprise-meta {
  display: flex;
  gap: 12px;
  align-items: center;
}

.region {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.credit-level {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.level-aaa {
  background: linear-gradient(135deg, #FF9500, #FFCC02);
  color: #000;
}

.level-aa {
  background: linear-gradient(135deg, #007AFF, #5AC8FA);
  color: #fff;
}

.level-a {
  background: linear-gradient(135deg, #30D158, #32D74B);
  color: #fff;
}

.auto-switch-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.auto-switch-indicator.active .indicator-dot {
  background: #30D158;
  animation: pulse 2s infinite;
}

.selector-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.auto-toggle.active {
  background: linear-gradient(135deg, #007AFF, #5AC8FA);
  border-color: #007AFF;
  color: #fff;
}

.dropdown-toggle {
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-toggle:hover {
  background: rgba(255, 255, 255, 0.08);
}

.dropdown-toggle i.rotated {
  transform: rotate(180deg);
}

.enterprise-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-top: 8px;
  z-index: 1000;
  backdrop-filter: blur(20px);
  max-height: 300px;
  overflow-y: auto;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 4px;
}

.enterprise-list {
  padding: 8px;
}

.enterprise-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.enterprise-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.enterprise-item.active {
  background: rgba(0, 122, 255, 0.2);
  border: 1px solid rgba(0, 122, 255, 0.3);
}

.item-name {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
}

.item-meta {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.item-level {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 响應式设計 */
@media (max-width: 768px) {
  .selector-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .enterprise-name {
    font-size: 1.1rem;
  }
  
  .control-btn {
    width: 36px;
    height: 36px;
  }
}
</style>
