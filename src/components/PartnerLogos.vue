<template>
  <div class="partner-section">
    <div class="search-container">
      <div class="search-header">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索合作機構..."
            class="search-input"
            @input="filterPartners"
          />
          <i v-if="searchQuery" @click="clearSearch" class="fas fa-times clear-icon"></i>
        </div>

        <button @click="toggleCollapse" class="collapse-btn">
          <i :class="isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-up'"></i>
          <span>{{ isCollapsed ? '展開' : '收起' }}</span>
        </button>
      </div>

      <transition name="slide-fade" mode="out-in">
        <div v-show="!isCollapsed" class="filter-tabs">
          <button
            v-for="(cat, index) in ['全部', ...categoryNames]"
            :key="index"
            @click="filterByCategory(cat)"
            :class="['filter-tab', { active: activeCategory === cat }]"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ cat }}
          </button>
        </div>
      </transition>
    </div>

    <transition name="expand-fade" mode="out-in">
      <div v-show="!isCollapsed" class="partner-logos">
        <div v-if="filteredCategories.length === 0" class="no-results">
          <i class="fas fa-search"></i>
          <p>未找到匹配的合作機構</p>
        </div>

        <div v-for="(category, categoryIndex) in filteredCategories"
             :key="categoryIndex"
             class="category-section"
             :style="{ animationDelay: `${categoryIndex * 0.2}s` }">
          <div class="category-title">{{ category.name }}</div>
          <div class="partners-grid">
            <router-link
              v-for="(partner, partnerIndex) in category.partners"
              :key="partner.id"
              :to="`/partner/${partner.id}`"
              class="partner-item"
              :style="{ animationDelay: `${(categoryIndex * 0.2) + (partnerIndex * 0.05)}s` }"
            >
              <div class="partner-logo-wrapper">
                <div class="partner-logo" :style="{ backgroundColor: partner.bgColor }">
                  <i :class="partner.icon"></i>
                </div>
                <div class="partner-glow"></div>
              </div>
              <span class="partner-name">{{ partner.name }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PartnerLogos',
  setup() {
    const categories = [
      {
        name: '徵信公司',
        partners: [
          { id: 1, name: '环聯徵信有限公司', icon: 'fas fa-shield-alt', bgColor: 'rgba(255, 87, 51, 0.1)' },
          { id: 2, name: '深圳百行徵信服務有限公司', icon: 'fas fa-building', bgColor: 'rgba(52, 152, 219, 0.1)' },
          { id: 3, name: '廣東德信行信用管理有限公司', icon: 'fas fa-check-circle', bgColor: 'rgba(46, 204, 113, 0.1)' },
          { id: 4, name: '廣東鹏元徵信有限公司', icon: 'fas fa-award', bgColor: 'rgba(155, 89, 182, 0.1)' },
          { id: 5, name: '诺華诚信（Nova Credit）', icon: 'fas fa-star', bgColor: 'rgba(241, 196, 15, 0.1)' },
          { id: 6, name: '邓白氏（Dun & Bradstreet, D&B）', icon: 'fas fa-globe', bgColor: 'rgba(230, 126, 34, 0.1)' },
          { id: 7, name: '澳門金融管理局（AMCM）信贷數據库', icon: 'fas fa-landmark', bgColor: 'rgba(52, 73, 94, 0.1)' },
          { id: 8, name: '澳門銀行公會（ABM）信贷信息共享系統', icon: 'fas fa-university', bgColor: 'rgba(26, 188, 156, 0.1)' }
        ]
      },
      {
        name: '銀行',
        partners: [
          { id: 9, name: '中國工商銀行', icon: 'fas fa-landmark', bgColor: 'rgba(231, 76, 60, 0.1)' },
          { id: 10, name: '中國农業銀行', icon: 'fas fa-piggy-bank', bgColor: 'rgba(46, 204, 113, 0.1)' },
          { id: 11, name: '汇丰銀行', icon: 'fas fa-university', bgColor: 'rgba(52, 152, 219, 0.1)' },
          { id: 12, name: '恒生銀行', icon: 'fas fa-building', bgColor: 'rgba(155, 89, 182, 0.1)' },
          { id: 13, name: '渣打銀行', icon: 'fas fa-coins', bgColor: 'rgba(241, 196, 15, 0.1)' }
        ]
      },
      {
        name: '保險公司',
        partners: [
          { id: 14, name: '中國人保（PICC）', icon: 'fas fa-shield-alt', bgColor: 'rgba(231, 76, 60, 0.1)' },
          { id: 15, name: '中國太保（CPIC）', icon: 'fas fa-umbrella', bgColor: 'rgba(52, 152, 219, 0.1)' },
          { id: 16, name: '友邦保險（AIA）', icon: 'fas fa-heart', bgColor: 'rgba(46, 204, 113, 0.1)' },
          { id: 17, name: '安盛保險（AXA）', icon: 'fas fa-shield-alt', bgColor: 'rgba(155, 89, 182, 0.1)' },
          { id: 18, name: '澳門人寿（Macau Life）', icon: 'fas fa-user-shield', bgColor: 'rgba(241, 196, 15, 0.1)' },
          { id: 19, name: '太平保險（澳門）（Taiping Macau）', icon: 'fas fa-life-ring', bgColor: 'rgba(230, 126, 34, 0.1)' }
        ]
      },
      {
        name: '互聯網金融',
        partners: [
          { id: 20, name: '平安健康保險', icon: 'fas fa-heartbeat', bgColor: 'rgba(231, 76, 60, 0.1)' },
          { id: 21, name: '富途證券', icon: 'fas fa-chart-line', bgColor: 'rgba(52, 152, 219, 0.1)' },
          { id: 22, name: '同花顺', icon: 'fas fa-chart-bar', bgColor: 'rgba(46, 204, 113, 0.1)' },
          { id: 23, name: '財付通', icon: 'fas fa-wallet', bgColor: 'rgba(155, 89, 182, 0.1)' },
          { id: 24, name: '騰訊金融科技', icon: 'fas fa-money-bill-wave', bgColor: 'rgba(241, 196, 15, 0.1)' },
          { id: 25, name: '度小滿金融', icon: 'fas fa-hand-holding-usd', bgColor: 'rgba(230, 126, 34, 0.1)' }
        ]
      }
    ]
    
    const searchQuery = ref('');
    const activeCategory = ref('全部');
    const isCollapsed = ref(true);
    
    const categoryNames = computed(() => {
      return categories.map(cat => cat.name);
    });
    
    // 過滤后的分类和合作夥伴
    const filteredCategories = computed(() => {
      // 如果没有搜索詞且選择全部分类，返回所有數據
      if (!searchQuery.value && activeCategory.value === '全部') {
        return categories;
      }
      
      return categories
        .map(category => {
          // 按分类篩選
          if (activeCategory.value !== '全部' && category.name !== activeCategory.value) {
            return null;
          }
          
          // 按搜索詞篩選合作夥伴
          if (searchQuery.value) {
            const filteredPartners = category.partners.filter(partner => 
              partner.name.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
            
            if (filteredPartners.length === 0) {
              return null;
            }
            
            return {
              ...category,
              partners: filteredPartners
            };
          }
          
          return category;
        })
        .filter(Boolean); // 移除空值
    });
    
    // 清除搜索
    const clearSearch = () => {
      searchQuery.value = '';
    };
    
    // 按分类篩選
    const filterByCategory = (category) => {
      activeCategory.value = category;
    };
    
    // 實時篩選
    const filterPartners = () => {
      // 每次输入更新结果，函數体可以為空，因為使用了計算属性
    };

    // 切换折叠状态
    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      categories,
      categoryNames,
      searchQuery,
      activeCategory,
      filteredCategories,
      isCollapsed,
      clearSearch,
      filterByCategory,
      filterPartners,
      toggleCollapse
    }
  }
}
</script>

<style scoped>
.partner-section {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.search-container {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .search-header {
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .search-header {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
}

.search-box {
  position: relative;
  flex: 1;
}

.collapse-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-radius: 16px;
  border: 2px solid rgba(94, 252, 232, 0.4);
  background: linear-gradient(135deg, rgba(94, 252, 232, 0.2) 0%, rgba(115, 110, 254, 0.15) 100%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  font-family: var(--font-body);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(20px);
  white-space: nowrap;
  box-shadow:
    0 6px 20px rgba(94, 252, 232, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.collapse-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: buttonShine 3s ease-in-out infinite;
  z-index: 1;
}

.collapse-btn span,
.collapse-btn i {
  position: relative;
  z-index: 2;
}

.collapse-btn:hover {
  background: linear-gradient(135deg, rgba(94, 252, 232, 0.35) 0%, rgba(115, 110, 254, 0.25) 100%);
  color: white;
  border-color: rgba(94, 252, 232, 0.6);
  box-shadow:
    0 10px 30px rgba(94, 252, 232, 0.4),
    0 0 0 1px rgba(94, 252, 232, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-3px) scale(1.05);
}

.collapse-btn:active {
  transform: translateY(-1px) scale(0.98);
  box-shadow:
    0 5px 15px rgba(94, 252, 232, 0.3),
    0 0 0 1px rgba(94, 252, 232, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.collapse-btn i {
  font-size: 0.9rem;
  transition: all 0.3s ease;
  color: rgba(94, 252, 232, 0.9);
}

.collapse-btn:hover i {
  transform: rotate(180deg);
  color: rgba(94, 252, 232, 1);
  text-shadow: 0 0 10px rgba(94, 252, 232, 0.5);
}

.collapse-btn span {
  font-weight: 600;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.search-input {
  width: 100%;
  padding: 12px 45px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  color: white;
  font-family: var(--font-body);
  letter-spacing: 0.5px;
  font-size: 0.95rem;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(15px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.search-input:focus {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  box-shadow:
    0 0 25px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  outline: none;
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.clear-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.clear-icon:hover {
  color: white;
}

.filter-tabs {
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding-bottom: 5px;
  scrollbar-width: thin;
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateY(0);
}

/* 滑動淡入動画 */
.slide-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.filter-tabs::-webkit-scrollbar {
  height: 3px;
}

.filter-tabs::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.filter-tabs::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.filter-tab {
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-family: var(--font-body);
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: slideInTab 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  opacity: 0;
  transform: translateY(-20px) scale(0.8);
}

@keyframes slideInTab {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.8);
  }
  60% {
    opacity: 0.8;
    transform: translateY(5px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.filter-tab:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%);
  color: white;
  transform: translateY(-1px);
  box-shadow:
    0 4px 15px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.filter-tab.active {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(124, 58, 237, 0.3) 100%);
  border-color: rgba(59, 130, 246, 0.5);
  color: white;
  box-shadow:
    0 6px 20px rgba(59, 130, 246, 0.3),
    0 0 0 1px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: rgba(255, 255, 255, 0.5);
  gap: 10px;
}

.no-results i {
  font-size: 2rem;
  margin-bottom: 10px;
}

.no-results p {
  font-size: 1rem;
  font-family: var(--font-body);
}

.partner-logos {
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: visible;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  max-height: none;
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateY(0);
}

/* 展開淡入動画 */
.expand-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.expand-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.expand-fade-enter-from {
  opacity: 0;
  transform: translateY(-30px) scale(0.9);
  max-height: 0;
}

.expand-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
  max-height: 0;
}

.category-section {
  margin-bottom: 4px;
  position: relative;
  animation: slideInCategory 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes slideInCategory {
  0% {
    opacity: 0;
    transform: translateX(-30px) scale(0.95);
  }
  60% {
    opacity: 0.8;
    transform: translateX(5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.category-section::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.category-section:last-child::after {
  display: none;
}

.category-title {
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(124, 58, 237, 0.15) 100%);
  padding: 10px 16px;
  border-radius: 12px;
  display: inline-block;
  margin: 0 0 16px 0;
  width: fit-content;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  backdrop-filter: blur(15px);
  font-family: var(--font-heading);
  box-shadow:
    0 4px 15px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.category-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: categoryShine 3s ease-in-out infinite;
}

@keyframes categoryShine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

@keyframes buttonShine {
  0% { left: -100%; }
  50% { left: 100%; }
  100% { left: 100%; }
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
  gap: 4px;
  padding: 2px 1px;
}

@media (max-width: 768px) {
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }
}

.partner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  text-decoration: none;
  padding: 12px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  opacity: 0;
  transform: translateY(30px) scale(0.8);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.8);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-5px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.partner-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.partner-item:hover {
  transform: translateY(-4px) scale(1.05);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow:
    0 15px 35px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(59, 130, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.partner-item:hover::before {
  opacity: 1;
}

.partner-item:active {
  transform: translateY(-2px) scale(1.02);
  transition: all 0.1s ease;
}

.partner-logo-wrapper {
  position: relative;
  margin: 3px 0;
}

.partner-logo {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow:
    0 6px 20px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background-blend-mode: overlay;
  cursor: pointer;
  text-decoration: none;
  overflow: hidden;
}

.partner-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
  background: inherit;
  top: 0;
  left: 0;
  transform: scale(0.85);
}



.partner-logo i {
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
  transition: all 0.3s ease;
}

.partner-item:hover .partner-logo {
  transform: scale(1.1) rotate(5deg);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.partner-item:hover .partner-logo i {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.partner-item:hover .partner-glow {
  opacity: 0.6;
  animation: partnerPulse 2s ease-in-out infinite;
}

.partner-name {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.85rem;
  text-align: center;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 120px;
  letter-spacing: 0.3px;
  font-weight: 600;
  transition: all 0.3s ease;
  font-family: var(--font-body);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.partner-item:hover .partner-name {
  color: rgba(255, 255, 255, 1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}

@keyframes partnerPulse {
  0% {
    opacity: 0.6;
    transform: scale(0.85);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.95);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.85);
  }
}
</style> 