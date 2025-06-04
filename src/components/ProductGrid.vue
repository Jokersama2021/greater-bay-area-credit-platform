<template>
  <div class="product-grid">
    <div v-for="product in products" :key="product.id" class="product-item">
      <div class="product-icon" :style="{ backgroundColor: product.bgColor }">
        <i :class="product.icon"></i>
      </div>
      <div class="product-info">
        <span class="product-name">{{ product.name }}</span>
        <span class="product-description">{{ product.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductGrid',
  setup() {
    const products = [
      {
        id: 1,
        name: '发票贷',
        icon: 'fas fa-file-invoice-dollar',
        bgColor: 'rgba(0, 122, 255, 0.15)',
        description: '基于发票的融资服务'
      },
      {
        id: 2,
        name: '订单贷',
        icon: 'fas fa-shopping-cart',
        bgColor: 'rgba(255, 149, 0, 0.15)',
        description: '订单融资解决方案'
      },
      {
        id: 3,
        name: '资产贷',
        icon: 'fas fa-landmark',
        bgColor: 'rgba(52, 199, 89, 0.15)',
        description: '资产抵押融资'
      },
      {
        id: 4,
        name: '供应链金融',
        icon: 'fas fa-link',
        bgColor: 'rgba(88, 86, 214, 0.15)',
        description: '供应链融资服务'
      },
      {
        id: 5,
        name: '跨境结算',
        icon: 'fas fa-globe',
        bgColor: 'rgba(255, 59, 48, 0.15)',
        description: '跨境支付结算'
      },
      {
        id: 6,
        name: '信用担保',
        icon: 'fas fa-shield-alt',
        bgColor: 'rgba(175, 82, 222, 0.15)',
        description: '信用担保服务'
      }
    ]

    return {
      products
    }
  }
}
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background-elevated);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s var(--ease-out-expo);
}

.product-item:hover {
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.product-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.product-icon i {
  font-size: 16px;
  color: white;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.product-name {
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
}

.product-description {
  color: var(--text-secondary);
  font-size: 12px;
  line-height: 1.2;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .product-item {
    padding: 10px;
    gap: 10px;
  }

  .product-icon {
    width: 32px;
    height: 32px;
  }

  .product-icon i {
    font-size: 14px;
  }

  .product-name {
    font-size: 13px;
  }

  .product-description {
    font-size: 11px;
  }
}
</style>