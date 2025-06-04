<template>
  <div class="cross-chain-container">
    <div class="chain-header">
      <div class="header-title">
        <div class="header-icon-container">
          <svg class="chain-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <div class="icon-glow"></div>
        </div>
        <div class="title-content">
          <h3>跨境企业信用查询记录</h3>
          <p class="title-subtitle">实时监控跨链信用查询活动</p>
        </div>
      </div>
      <div class="header-stats">
        <div class="stat-item">
          <div class="stat-number">{{ totalQueries }}</div>
          <div class="stat-label">总查询数</div>
        </div>
        <div class="stat-divider"></div>
        <div class="sync-status">
          <div class="sync-indicator">
            <div class="sync-dot"></div>
            <span>实时同步</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chains-grid">
      <!-- Fabric链 (澳门方) -->
      <div class="chain-section fabric-chain">
        <div class="chain-title">
          <div class="chain-logo fabric-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M9 9H15M9 12H15M9 15H12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <div class="logo-shine"></div>
          </div>
          <div class="chain-info">
            <h4>Fabric链</h4>
            <span class="chain-region">澳门特别行政区</span>
            <div class="chain-metrics">
              <span class="metric-item">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                {{ fabricTransactions.length }} 条记录
              </span>
            </div>
          </div>
          <div class="chain-status-container">
            <div class="chain-status online">
              <div class="status-dot"></div>
              <span>在线</span>
            </div>
            <div class="chain-performance">
              <div class="performance-bar">
                <div class="performance-fill" style="width: 95%"></div>
              </div>
              <span class="performance-text">95%</span>
            </div>
          </div>
        </div>

        <div class="transactions-list">
          <div 
            v-for="tx in fabricTransactions" 
            :key="tx.id"
            class="transaction-item"
            @click="selectTransaction(tx, 'fabric')"
            :class="{ active: selectedTx?.id === tx.id && selectedChain === 'fabric' }"
          >
            <div class="tx-header">
              <div class="tx-id">
                <div class="tx-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="tx-id-content">
                  <span class="tx-label">查询ID</span>
                  <code class="tx-hash">{{ tx.id.substring(0, 16) }}...</code>
                </div>
              </div>
              <div class="tx-time-container">
                <div class="tx-time">{{ formatTime(tx.timestamp) }}</div>
                <div class="tx-status-indicator" :class="tx.creditStatus"></div>
              </div>
            </div>
            <div class="query-info">
              <div class="query-action">
                <div class="company-card company-a">
                  <span class="company-name">{{ tx.queryCompany }}</span>
                  <span class="company-role">查询方</span>
                </div>
                <div class="arrow-container">
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="arrow-trail"></div>
                </div>
                <div class="company-card company-b">
                  <span class="company-name">{{ tx.targetCompany }}</span>
                  <span class="company-role">被查询方</span>
                </div>
              </div>
              <div class="credit-result">
                <div class="result-content">
                  <span class="result-label">信用评估结果</span>
                  <div class="result-badge-container">
                    <span class="result-badge" :class="tx.creditStatus">
                      <svg class="result-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="tx.creditStatus === 'excellent'" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else-if="tx.creditStatus === 'qualified'" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else-if="tx.creditStatus === 'warning'" d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else d="M15 9L9 15M9 9L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ tx.creditStatusText }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tx-details">
              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">区块编号</span>
                  <span class="detail-value">#{{ tx.blockNumber }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 8H17M7 12H17M7 16H12M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">交易哈希</span>
                  <code class="detail-hash">{{ tx.txHash.substring(0, 12) }}...</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- BCOS链 (内地方) -->
      <div class="chain-section bcos-chain">
        <div class="chain-title">
          <div class="chain-logo bcos-logo">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/>
              <path d="M8 12L11 15L16 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="logo-shine"></div>
          </div>
          <div class="chain-info">
            <h4>BCOS链</h4>
            <span class="chain-region">中国内地</span>
            <div class="chain-metrics">
              <span class="metric-item">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                {{ bcosTransactions.length }} 条记录
              </span>
            </div>
          </div>
          <div class="chain-status-container">
            <div class="chain-status online">
              <div class="status-dot"></div>
              <span>在线</span>
            </div>
            <div class="chain-performance">
              <div class="performance-bar">
                <div class="performance-fill" style="width: 92%"></div>
              </div>
              <span class="performance-text">92%</span>
            </div>
          </div>
        </div>

        <div class="transactions-list">
          <div
            v-for="tx in bcosTransactions"
            :key="tx.id"
            class="transaction-item"
            @click="selectTransaction(tx, 'bcos')"
            :class="{ active: selectedTx?.id === tx.id && selectedChain === 'bcos' }"
          >
            <div class="tx-header">
              <div class="tx-id">
                <div class="tx-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="tx-id-content">
                  <span class="tx-label">查询ID</span>
                  <code class="tx-hash">{{ tx.id.substring(0, 16) }}...</code>
                </div>
              </div>
              <div class="tx-time-container">
                <div class="tx-time">{{ formatTime(tx.timestamp) }}</div>
                <div class="tx-status-indicator" :class="tx.creditStatus"></div>
              </div>
            </div>
            <div class="query-info">
              <div class="query-action">
                <div class="company-card company-a">
                  <span class="company-name">{{ tx.queryCompany }}</span>
                  <span class="company-role">查询方</span>
                </div>
                <div class="arrow-container">
                  <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <div class="arrow-trail"></div>
                </div>
                <div class="company-card company-b">
                  <span class="company-name">{{ tx.targetCompany }}</span>
                  <span class="company-role">被查询方</span>
                </div>
              </div>
              <div class="credit-result">
                <div class="result-content">
                  <span class="result-label">信用评估结果</span>
                  <div class="result-badge-container">
                    <span class="result-badge" :class="tx.creditStatus">
                      <svg class="result-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="tx.creditStatus === 'excellent'" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else-if="tx.creditStatus === 'qualified'" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else-if="tx.creditStatus === 'warning'" d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                        <path v-else d="M15 9L9 15M9 9L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      {{ tx.creditStatusText }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tx-details">
              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">区块编号</span>
                  <span class="detail-value">#{{ tx.blockNumber }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 8H17M7 12H17M7 16H12M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <div class="detail-content">
                  <span class="detail-label">交易哈希</span>
                  <code class="detail-hash">{{ tx.txHash.substring(0, 12) }}...</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 交易详情弹窗 -->
    <div v-if="selectedTx" class="transaction-modal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedChain === 'fabric' ? 'Fabric链' : 'BCOS链' }} 交易详情</h3>
          <button class="close-btn" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="detail-row">
            <label>查询ID:</label>
            <code class="full-hash">{{ selectedTx.id }}</code>
          </div>
          <div class="detail-row">
            <label>查询企业:</label>
            <span class="full-content">{{ selectedTx.queryCompany }}</span>
          </div>
          <div class="detail-row">
            <label>被查询企业:</label>
            <span class="full-content">{{ selectedTx.targetCompany }}</span>
          </div>
          <div class="detail-row">
            <label>信用查询结果:</label>
            <span class="result-badge" :class="selectedTx.creditStatus">{{ selectedTx.creditStatusText }}</span>
          </div>
          <div class="detail-row">
            <label>查询哈希:</label>
            <code class="full-hash">{{ selectedTx.txHash }}</code>
          </div>
          <div class="detail-row">
            <label>区块编号:</label>
            <span class="block-number">{{ selectedTx.blockNumber }}</span>
          </div>
          <div class="detail-row">
            <label>查询时间:</label>
            <span class="timestamp">{{ formatFullTime(selectedTx.timestamp) }}</span>
          </div>
          <div class="detail-row">
            <label>链类型:</label>
            <span class="chain-type">{{ selectedChain === 'fabric' ? 'Hyperledger Fabric' : 'FISCO BCOS' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'CrossChainInfo',
  setup() {
    const selectedTx = ref(null)
    const selectedChain = ref('')

    // 模拟Fabric链企业信用查询记录
    const fabricTransactions = ref([
      {
        id: '74d5d2946cbe43eb9843eaaa1ef69d41',
        queryCompany: '澳门科技有限公司',
        targetCompany: '珠海创新企业',
        creditStatus: 'qualified',
        creditStatusText: '信用合格',
        txHash: '841591a8e5bf668a4f7419a2cf9436e4d2ddceb0de1177842eed726d9fe64323',
        blockNumber: 11,
        timestamp: new Date('2024-01-15 14:30:25')
      },
      {
        id: '85e6e3a57dbf54fc9954fbb1b2f70e52',
        queryCompany: '澳门金融集团',
        targetCompany: '深圳贸易公司',
        creditStatus: 'excellent',
        creditStatusText: '信用优秀',
        txHash: '952602b9f6ce779b8f8a5c1e3f4d7a8b9c0e1f2a3b4c5d6e7f8a9b0c1d2e3f4',
        blockNumber: 12,
        timestamp: new Date('2024-01-15 15:45:10')
      },
      {
        id: 'a1b2c3d4e5f6789012345678901234ab',
        queryCompany: '澳门投资控股',
        targetCompany: '广州制造企业',
        creditStatus: 'qualified',
        creditStatusText: '信用合格',
        txHash: 'f1e2d3c4b5a6978563214789654123ab987654321fedcba0123456789abcdef',
        blockNumber: 13,
        timestamp: new Date('2024-01-15 16:20:33')
      }
    ])

    // 模拟BCOS链企业信用查询记录
    const bcosTransactions = ref([
      {
        id: '74d5d2946cbe43eb9843eaaa1ef69d41',
        queryCompany: '深圳科技集团',
        targetCompany: '澳门贸易公司',
        creditStatus: 'qualified',
        creditStatusText: '信用合格',
        txHash: '0x44146b8c7a2d4da8b0377e21b2589f07d61e9ebc5ce6e0e1f21405e792dcd9',
        blockNumber: 10,
        timestamp: new Date('2024-01-15 14:30:20')
      },
      {
        id: '96f7h8i9j0k1234567890123456789cd',
        queryCompany: '广州制造有限公司',
        targetCompany: '香港物流企业',
        creditStatus: 'warning',
        creditStatusText: '信用预警',
        txHash: '0x55257c9d8b3e5eb9c1488f32c3690g18e72f0fcd6df7f1f2g32516f803ede0',
        blockNumber: 11,
        timestamp: new Date('2024-01-15 15:12:45')
      },
      {
        id: 'ef9g0h1i2j3k456789012345678901de',
        queryCompany: '珠海投资控股',
        targetCompany: '澳门金融服务',
        creditStatus: 'excellent',
        creditStatusText: '信用优秀',
        txHash: '0x66368d0e9c4f6fc0d2599g43d4701h29f83g1gde7eg8g2g3h43627g914fef1',
        blockNumber: 12,
        timestamp: new Date('2024-01-15 16:05:18')
      }
    ])

    const selectTransaction = (tx, chain) => {
      selectedTx.value = tx
      selectedChain.value = chain
    }

    const closeModal = () => {
      selectedTx.value = null
      selectedChain.value = ''
    }

    const formatTime = (date) => {
      return date.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      })
    }

    const formatFullTime = (date) => {
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    // 计算总查询数
    const totalQueries = computed(() => {
      return fabricTransactions.value.length + bcosTransactions.value.length
    })

    // 模拟实时数据更新
    onMounted(() => {
      setInterval(() => {
        // 这里可以添加实时数据更新逻辑
      }, 5000)
    })

    return {
      fabricTransactions,
      bcosTransactions,
      selectedTx,
      selectedChain,
      totalQueries,
      selectTransaction,
      closeModal,
      formatTime,
      formatFullTime
    }
  }
}
</script>

<style scoped>
.cross-chain-container {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 20px;
  padding: 28px;
  border: 1px solid rgba(30, 41, 59, 0.6);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.chain-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.chain-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #007AFF, #5AC8FA);
  border-radius: 1px;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon-container {
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%);
  border-radius: 16px;
  box-shadow:
    0 8px 24px rgba(0, 122, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.chain-icon {
  width: 24px;
  height: 24px;
  color: white;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #007AFF, #5AC8FA);
  border-radius: 18px;
  opacity: 0;
  animation: iconGlow 3s ease-in-out infinite;
}

.title-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.02em;
}

.title-subtitle {
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  letter-spacing: 0.01em;
}

.header-stats {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 700;
  color: #007AFF;
  line-height: 1;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

.sync-status {
  display: flex;
  align-items: center;
}

.sync-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(52, 199, 89, 0.15);
  border: 1px solid rgba(52, 199, 89, 0.3);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #34C759;
  backdrop-filter: blur(10px);
}

.sync-dot {
  width: 8px;
  height: 8px;
  background: #34C759;
  border-radius: 50%;
  animation: syncPulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(52, 199, 89, 0.5);
}

.chains-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.chain-section {
  background: rgba(30, 41, 59, 0.4);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(51, 65, 85, 0.5);
  backdrop-filter: blur(10px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.chain-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.3) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.chain-section:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(51, 65, 85, 0.7);
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(51, 65, 85, 0.6);
}

.chain-section:hover::before {
  opacity: 1;
}

.chain-title {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
}

.chain-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 40px;
  height: 2px;
  border-radius: 1px;
}

.fabric-chain .chain-title::after {
  background: linear-gradient(90deg, #FF6B35, #F7931E);
}

.bcos-chain .chain-title::after {
  background: linear-gradient(90deg, #007AFF, #5856D6);
}

.chain-logo {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.fabric-logo {
  background: linear-gradient(135deg, #FF6B35, #F7931E);
}

.bcos-logo {
  background: linear-gradient(135deg, #007AFF, #5856D6);
}

.logo-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: rotate(45deg);
  transition: all 0.6s ease;
  opacity: 0;
}

.chain-logo:hover .logo-shine {
  animation: logoShine 1.5s ease-in-out;
}

.chain-logo:hover {
  transform: scale(1.05) rotate(5deg);
}

.chain-logo svg {
  width: 24px;
  height: 24px;
  z-index: 2;
}

.chain-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chain-info h4 {
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.01em;
}

.chain-region {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.01em;
}

.chain-metrics {
  display: flex;
  gap: 16px;
  margin-top: 4px;
}

.metric-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.metric-item svg {
  width: 14px;
  height: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.chain-status-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.chain-status {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

.chain-status.online {
  background: rgba(52, 199, 89, 0.15);
  color: #34C759;
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.status-dot {
  width: 6px;
  height: 6px;
  background: #34C759;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.chain-performance {
  display: flex;
  align-items: center;
  gap: 8px;
}

.performance-bar {
  width: 60px;
  height: 4px;
  background: rgba(71, 85, 105, 0.4);
  border-radius: 2px;
  overflow: hidden;
}

.performance-fill {
  height: 100%;
  background: linear-gradient(90deg, #34C759, #30D158);
  border-radius: 2px;
  transition: width 1s ease;
}

.performance-text {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  min-width: 30px;
}

.transactions-list {
  max-height: 450px;
  overflow-y: auto;
  padding-right: 4px;
}

.transactions-list::-webkit-scrollbar {
  width: 4px;
}

.transactions-list::-webkit-scrollbar-track {
  background: rgba(71, 85, 105, 0.2);
  border-radius: 2px;
}

.transactions-list::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.4);
  border-radius: 2px;
}

.transactions-list::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.6);
}

.transaction-item {
  background: rgba(51, 65, 85, 0.3);
  border: 1px solid rgba(71, 85, 105, 0.4);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.transaction-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(71, 85, 105, 0.3) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.transaction-item:hover {
  background: rgba(51, 65, 85, 0.5);
  border-color: rgba(0, 122, 255, 0.4);
  transform: translateY(-4px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(0, 122, 255, 0.2);
}

.transaction-item:hover::before {
  opacity: 1;
}

.transaction-item.active {
  background: rgba(0, 122, 255, 0.1);
  border-color: #007AFF;
  box-shadow:
    0 20px 40px rgba(0, 122, 255, 0.2),
    0 0 0 1px rgba(0, 122, 255, 0.3);
}

.tx-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.tx-id {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tx-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
}

.tx-icon svg {
  width: 16px;
  height: 16px;
}

.tx-id-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tx-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}

.tx-hash {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: #007AFF;
  background: rgba(0, 122, 255, 0.15);
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid rgba(0, 122, 255, 0.2);
  letter-spacing: 0.02em;
}

.tx-time-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tx-time {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

.tx-status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  animation: statusBlink 2s ease-in-out infinite;
}

.tx-status-indicator.excellent {
  background: #007AFF;
  box-shadow: 0 0 8px rgba(0, 122, 255, 0.6);
}

.tx-status-indicator.qualified {
  background: #34C759;
  box-shadow: 0 0 8px rgba(52, 199, 89, 0.6);
}

.tx-status-indicator.warning {
  background: #FF9500;
  box-shadow: 0 0 8px rgba(255, 149, 0, 0.6);
}

.tx-status-indicator.risk {
  background: #FF453A;
  box-shadow: 0 0 8px rgba(255, 69, 58, 0.6);
}

.query-info {
  margin-bottom: 12px;
}

.query-action {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  padding: 8px 12px;
  background: rgba(71, 85, 105, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(100, 116, 139, 0.3);
}

.company-a, .company-b {
  font-size: 13px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  white-space: nowrap;
}

.company-a {
  background: rgba(0, 122, 255, 0.1);
  color: var(--primary-color);
  border: 1px solid rgba(0, 122, 255, 0.2);
}

.company-b {
  background: rgba(52, 199, 89, 0.1);
  color: var(--success-color);
  border: 1px solid rgba(52, 199, 89, 0.2);
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.credit-result {
  display: flex;
  align-items: center;
  gap: 8px;
}

.result-label {
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 500;
}

.result-badge {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-badge.qualified {
  background: rgba(52, 199, 89, 0.15);
  color: var(--success-color);
  border: 1px solid rgba(52, 199, 89, 0.3);
}

.result-badge.excellent {
  background: rgba(0, 122, 255, 0.15);
  color: var(--primary-color);
  border: 1px solid rgba(0, 122, 255, 0.3);
}

.result-badge.warning {
  background: rgba(255, 149, 0, 0.15);
  color: var(--warning-color);
  border: 1px solid rgba(255, 149, 0, 0.3);
}

.result-badge.risk {
  background: rgba(255, 59, 48, 0.15);
  color: var(--error-color);
  border: 1px solid rgba(255, 59, 48, 0.3);
}

.tx-details {
  display: flex;
  gap: 16px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.detail-value {
  font-size: 12px;
  color: var(--text-primary);
  font-family: var(--font-mono);
}

/* 模态框样式 */
.transaction-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(20px);
  animation: modalFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content {
  background: rgba(15, 23, 42, 0.95);
  border-radius: 24px;
  padding: 32px;
  max-width: 700px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  border: 1px solid rgba(30, 41, 59, 0.8);
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(40px);
  animation: modalSlideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.modal-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

.modal-header::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, #007AFF, #5AC8FA);
  border-radius: 1px;
}

.modal-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 12px;
}

.modal-header h3::before {
  content: '';
  width: 6px;
  height: 6px;
  background: #007AFF;
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.close-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.close-btn:active {
  transform: scale(0.95);
}

.close-btn svg {
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;
}

.close-btn:hover svg {
  color: rgba(255, 255, 255, 1);
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  z-index: 2;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.detail-row::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #007AFF, #5AC8FA);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.detail-row:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.detail-row:hover::before {
  opacity: 1;
}

.detail-row label {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-row label::before {
  content: '';
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
}

.full-content, .block-number, .timestamp, .chain-type {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  word-break: break-all;
  font-weight: 500;
  line-height: 1.5;
}

.full-hash {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: #007AFF;
  background: rgba(0, 122, 255, 0.15);
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(0, 122, 255, 0.25);
  word-break: break-all;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.full-hash:hover {
  background: rgba(0, 122, 255, 0.25);
  border-color: rgba(0, 122, 255, 0.4);
  transform: scale(1.02);
}

/* 模态框中的特殊样式 */
.modal-body .result-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-body .result-badge:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.modal-body .result-badge.qualified {
  background: rgba(52, 199, 89, 0.2);
  color: #34C759;
  border-color: rgba(52, 199, 89, 0.4);
}

.modal-body .result-badge.excellent {
  background: rgba(0, 122, 255, 0.2);
  color: #007AFF;
  border-color: rgba(0, 122, 255, 0.4);
}

.modal-body .result-badge.warning {
  background: rgba(255, 149, 0, 0.2);
  color: #FF9500;
  border-color: rgba(255, 149, 0, 0.4);
}

.modal-body .result-badge.risk {
  background: rgba(255, 59, 48, 0.2);
  color: #FF3B30;
  border-color: rgba(255, 59, 48, 0.4);
}

/* 动画效果 */
@keyframes iconGlow {
  0%, 100% {
    opacity: 0;
  }
  50% {
    opacity: 0.8;
  }
}

@keyframes syncPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 8px rgba(52, 199, 89, 0.5);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
    box-shadow: 0 0 16px rgba(52, 199, 89, 0.8);
  }
}

@keyframes statusPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.3);
  }
}

@keyframes logoShine {
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

@keyframes statusBlink {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}

/* 新的交易项样式 */
.company-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: rgba(71, 85, 105, 0.2);
  border: 1px solid rgba(100, 116, 139, 0.3);
  border-radius: 12px;
  transition: all 0.3s ease;
  min-width: 120px;
}

.company-card:hover {
  background: rgba(71, 85, 105, 0.4);
  transform: translateY(-2px);
}

.company-card.company-a {
  border-color: rgba(0, 122, 255, 0.3);
  background: rgba(0, 122, 255, 0.08);
}

.company-card.company-a:hover {
  background: rgba(0, 122, 255, 0.15);
  border-color: rgba(0, 122, 255, 0.4);
}

.company-card.company-b {
  border-color: rgba(52, 199, 89, 0.3);
  background: rgba(52, 199, 89, 0.08);
}

.company-card.company-b:hover {
  background: rgba(52, 199, 89, 0.15);
  border-color: rgba(52, 199, 89, 0.4);
}

.company-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.3;
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.company-role {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-top: 2px;
}

.arrow-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin: 0 16px;
}

.arrow-icon {
  width: 20px;
  height: 20px;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;
}

.transaction-item:hover .arrow-icon {
  color: #007AFF;
  transform: translateX(4px);
}

.arrow-trail {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 122, 255, 0.3), transparent);
  border-radius: 1px;
  animation: arrowFlow 2s ease-in-out infinite;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.result-label {
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.result-badge-container {
  display: flex;
  align-items: center;
}

.result-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.result-icon {
  width: 14px;
  height: 14px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.detail-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.detail-icon {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
}

.detail-icon svg {
  width: 14px;
  height: 14px;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.detail-label {
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
}

.detail-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
}

.detail-hash {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.8rem;
  font-weight: 600;
  color: #007AFF;
  background: rgba(0, 122, 255, 0.15);
  padding: 2px 6px;
  border-radius: 6px;
  border: 1px solid rgba(0, 122, 255, 0.2);
}

@keyframes arrowFlow {
  0% {
    background: linear-gradient(90deg, transparent, transparent, transparent);
  }
  50% {
    background: linear-gradient(90deg, transparent, rgba(0, 122, 255, 0.6), transparent);
  }
  100% {
    background: linear-gradient(90deg, transparent, transparent, transparent);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(20px);
  }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.transaction-item {
  animation: slideInUp 0.3s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
}

.transaction-item:nth-child(1) { animation-delay: 0.1s; }
.transaction-item:nth-child(2) { animation-delay: 0.2s; }
.transaction-item:nth-child(3) { animation-delay: 0.3s; }

.transaction-modal {
  animation: fadeIn 0.3s ease-out;
}

.modal-content {
  animation: slideInUp 0.3s ease-out;
}

.chain-logo {
  transition: all 0.3s var(--ease-out-expo);
}

.chain-logo:hover {
  transform: scale(1.1) rotate(5deg);
}

.tx-hash, .detail-hash {
  position: relative;
  overflow: hidden;
}

.tx-hash:hover, .detail-hash:hover {
  background: linear-gradient(
    90deg,
    rgba(0, 122, 255, 0.1) 0%,
    rgba(0, 122, 255, 0.3) 50%,
    rgba(0, 122, 255, 0.1) 100%
  );
  background-size: 200px 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .chains-grid {
    grid-template-columns: 1fr;
  }

  .chain-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
