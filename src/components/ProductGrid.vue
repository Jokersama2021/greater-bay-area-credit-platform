<template>
  <div class="product-grid">
    <div v-for="(product, index) in products" :key="product.id" class="product-item bounce-in-card" :style="{ animationDelay: `${index * 0.08}s` }" @click="navigateToProduct(product.route, $event)">
      <div class="product-icon" :style="{ backgroundColor: product.bgColor }">
        <i :class="product.icon"></i>
      </div>
      <div class="product-info">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-description">{{ product.description }}</span>
      </div>
      <div class="product-arrow">
        <i class="fas fa-chevron-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'ProductGrid',
  setup() {
    const router = useRouter()

    const products = [
      {
        id: 1,
        name: '发票贷',
        icon: 'fas fa-file-invoice-dollar',
        bgColor: 'rgba(0, 122, 255, 0.15)',
        description: '基于发票的融资服务',
        route: '/invoice-loan'
      },
      {
        id: 2,
        name: '订单贷',
        icon: 'fas fa-shopping-cart',
        bgColor: 'rgba(255, 149, 0, 0.15)',
        description: '订单融资解决方案',
        route: '/order-loan'
      },
      {
        id: 3,
        name: '资产贷',
        icon: 'fas fa-landmark',
        bgColor: 'rgba(52, 199, 89, 0.15)',
        description: '资产抵押融资',
        route: '/asset-loan'
      },
      {
        id: 4,
        name: '供应链金融',
        icon: 'fas fa-link',
        bgColor: 'rgba(88, 86, 214, 0.15)',
        description: '供应链融资服务',
        route: '/supply-chain-finance'
      },
      {
        id: 5,
        name: '跨境结算',
        icon: 'fas fa-globe',
        bgColor: 'rgba(255, 59, 48, 0.15)',
        description: '跨境支付结算',
        route: '/cross-border-settlement'
      },
      {
        id: 6,
        name: '信用担保',
        icon: 'fas fa-shield-alt',
        bgColor: 'rgba(175, 82, 222, 0.15)',
        description: '信用担保服务',
        route: '/credit-guarantee'
      }
    ]

    const navigateToProduct = (route, event) => {
      const item = event.currentTarget

      // 添加点击动画
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
      item.style.opacity = '0.6'
      item.style.transform = 'translateY(-4px) scale(0.95)'

      // 延迟后恢复并跳转
      setTimeout(() => {
        item.style.opacity = '1'
        item.style.transform = 'translateY(-4px) scale(1.02)'

        // 再延迟一点跳转页面
        setTimeout(() => {
          router.push(route)
        }, 100)
      }, 200)
    }

    return {
      products,
      navigateToProduct
    }
  }
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

/* 弹出动画 */
.bounce-in-card {
  opacity: 0;
  transform: scale(0.8) translateY(20px);
  animation: bounceInCard 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes bounceInCard {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.product-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.product-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.product-item:hover {
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.product-item:hover::before {
  opacity: 1;
}

.product-item:hover .product-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.product-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.product-icon::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-item:hover .product-icon::before {
  opacity: 1;
}

.product-icon i {
  font-size: 20px;
  color: white;
  position: relative;
  z-index: 1;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
}

.product-name {
  color: rgba(255, 255, 255, 0.95);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.product-description {
  color: rgba(255, 255, 255, 0.65);
  font-size: 13px;
  line-height: 1.4;
  letter-spacing: 0.01em;
}

.product-arrow {
  margin-left: auto;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  transform: translateX(-4px);
}

/* 响应式调整 - 适应不同屏幕尺寸 */
@media (max-width: 1400px) {
  .product-grid {
    gap: 10px;
  }

  .product-item {
    padding: 14px;
    gap: 14px;
  }

  .product-icon {
    width: 44px;
    height: 44px;
  }

  .product-icon i {
    font-size: 18px;
  }

  .product-name {
    font-size: 15px;
  }

  .product-description {
    font-size: 12px;
  }
}

/* 中等尺寸屏幕 */
@media (max-width: 1024px) {
  .product-grid {
    gap: 10px;
  }

  .product-item {
    padding: 14px;
    gap: 14px;
  }

  .product-icon {
    width: 44px;
    height: 44px;
  }

  .product-icon i {
    font-size: 18px;
  }

  .product-name {
    font-size: 15px;
  }

  .product-description {
    font-size: 12px;
  }
}

@media (max-width: 768px) {
  .product-grid {
    gap: 10px;
  }

  .product-item {
    padding: 14px;
    gap: 14px;
  }

  .product-icon {
    width: 42px;
    height: 42px;
  }

  .product-icon i {
    font-size: 18px;
  }

  .product-name {
    font-size: 15px;
  }

  .product-description {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .product-grid {
    gap: 8px;
  }

  .product-item {
    padding: 12px;
    gap: 12px;
  }

  .product-icon {
    width: 38px;
    height: 38px;
  }

  .product-icon i {
    font-size: 16px;
  }

  .product-name {
    font-size: 14px;
  }

  .product-description {
    font-size: 11px;
  }
}
</style>