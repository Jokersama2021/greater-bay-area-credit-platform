<template>
  <div class="blockchain-query-container">
    <!-- 頭部標題 -->
    <div class="module-header">
      <div class="header-title">
        <div class="header-icon-container">
          <svg class="blockchain-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
          <div class="icon-pulse"></div>
        </div>
        <div class="title-content">
          <h3>區块链信息查詢</h3>
          <p class="title-subtitle">實時获取區块链公钥信息</p>
        </div>
      </div>
      <div class="header-actions">
        <button 
          @click="testDirectAPI" 
          :disabled="loading"
          class="test-btn"
          style="margin-right: 8px;"
        >
          测试API
        </button>
        <button 
          @click="refreshData" 
          :disabled="loading"
          class="refresh-btn"
          :class="{ 'loading': loading }"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4V10H7M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M3.51 15A9 9 0 0 0 18.36 18.36L23 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          刷新
        </button>
      </div>
    </div>

    <!-- 状态指示器 -->
    <div class="status-bar">
      <div class="status-item" :class="connectionStatus">
        <div class="status-dot"></div>
        <span>{{ statusText }}</span>
      </div>
      <div class="last-update">
        最后更新: {{ lastUpdateTime }}
      </div>
    </div>

    <!-- 主要内容區域 -->
    <div class="content-area">
      <!-- 加載状态 -->
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
        <p>正在获取區块链信息...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <div class="error-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        <h4>获取數據失败</h4>
        <p>{{ error }}</p>
        <button @click="refreshData" class="retry-btn">重试</button>
      </div>

      <!-- 數據展示 -->
      <div v-else-if="publicKeyInfo" class="data-container">
        <!-- 公钥基本信息 -->
        <div class="info-grid">
          <div class="info-card">
            <div class="info-label">密钥类型</div>
            <div class="info-value">{{ publicKeyInfo.type }}</div>
          </div>
          <div class="info-card">
            <div class="info-label">密钥長度</div>
            <div class="info-value">{{ publicKeyInfo.size }}</div>
          </div>
          <div class="info-card">
            <div class="info-label">字符長度</div>
            <div class="info-value">{{ publicKeyInfo.length }}</div>
          </div>
          <div class="info-card">
            <div class="info-label">哈希值</div>
            <div class="info-value hash-value">{{ publicKeyInfo.hash }}</div>
          </div>
        </div>

        <!-- 公钥摘要 -->
        <div class="key-digest-section">
          <div class="section-title">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2"/>
            </svg>
            公钥摘要
          </div>
          <div class="key-digest">
            <code>{{ publicKeyInfo.digest }}</code>
            <button @click="copyDigest" class="copy-btn" title="复制摘要">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                <path d="M5 15H4A2 2 0 0 1 2 13V4A2 2 0 0 1 4 2H13A2 2 0 0 1 15 4V5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 完整公钥（可展開） -->
        <div class="full-key-section">
          <div class="section-title" @click="toggleFullKey">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 16V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8V16A2 2 0 0 0 5 18H19A2 2 0 0 0 21 16Z" stroke="currentColor" stroke-width="2"/>
              <path d="M7 2V6M17 2V6" stroke="currentColor" stroke-width="2"/>
            </svg>
            完整公钥
            <svg 
              class="expand-icon" 
              :class="{ 'expanded': showFullKey }"
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div v-if="showFullKey" class="full-key-content">
            <div class="key-container">
              <pre class="full-key-text">{{ publicKeyInfo.fullKey }}</pre>
              <button @click="copyFullKey" class="copy-btn full-key-copy" title="复制完整公钥">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M5 15H4A2 2 0 0 1 2 13V4A2 2 0 0 1 4 2H13A2 2 0 0 1 15 4V5" stroke="currentColor" stroke-width="2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { BlockchainService } from '../services/blockchainService'

export default {
  name: 'BlockchainQueryModule',
  setup() {
    // 响應式數據
    const loading = ref(false)
    const error = ref(null)
    const publicKeyInfo = ref(null)
    const lastUpdateTime = ref('')
    const showFullKey = ref(false)
    const connectionStatus = ref('disconnected')
    
    // 自動刷新定時器
    let refreshTimer = null
    
    // 計算属性
    const statusText = ref('未連接')
    
    // 获取區块链數據
    const fetchBlockchainData = async () => {
      loading.value = true
      error.value = null
      
      try {
        console.log('開始获取區块链公钥數據...')
        const response = await BlockchainService.getPublicKey()
        console.log('API响應:', response)
        
        // axios會把API响應包装在response.data中
        // 所以實際的API數據在response.data
        const apiData = response.data
        console.log('實際API數據:', apiData)
        
        // 检查WeCross API响應结構：{version, errorCode, message, data: {errorCode, message, pub}}
        if (apiData && apiData.errorCode === 0 && apiData.data && apiData.data.errorCode === 0 && apiData.data.pub) {
          console.log('成功获取公钥數據，長度:', apiData.data.pub.length)
          const parsedKey = BlockchainService.parsePublicKey(apiData.data.pub)
          console.log('解析后的公钥信息:', parsedKey)
          
          if (parsedKey) {
            publicKeyInfo.value = parsedKey
            connectionStatus.value = 'connected'
            statusText.value = '已連接'
            lastUpdateTime.value = new Date().toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit', 
              second: '2-digit'
            })
            console.log('✅ 區块链數據更新成功')
          } else {
            throw new Error('公钥解析失败')
          }
        } else {
          const errorMsg = apiData?.data?.message || apiData?.message || '获取數據失败'
          console.error('API响應结構检查失败:', {
            hasApiData: !!apiData,
            apiErrorCode: apiData?.errorCode,
            hasData: !!apiData?.data,
            dataErrorCode: apiData?.data?.errorCode,
            hasPub: !!apiData?.data?.pub
          })
          throw new Error(`API错误: ${errorMsg}`)
        }
      } catch (err) {
        error.value = err.message
        connectionStatus.value = 'error'
        statusText.value = '連接错误'
        console.error('获取區块链數據失败:', err)
      } finally {
        loading.value = false
      }
    }
    
    // 刷新數據
    const refreshData = () => {
      fetchBlockchainData()
    }
    
    // 测试API連接
    const testDirectAPI = async () => {
      console.log('手動测试API連接...')
      
      // 尝试多种方法
      const methods = [
        {
          name: 'Proxy API',
          fn: async () => {
            const response = await fetch('/api/blockchain/auth/pub', {
              method: 'GET'
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            return await response.json()
          }
        },
        {
          name: 'Direct API (CORS)',
          fn: async () => {
            const response = await fetch('https://e99c-120-239-205-225.ngrok-free.app/auth/pub', {
              method: 'GET',
              mode: 'cors',
              headers: {
                'ngrok-skip-browser-warning': 'true'
              }
            })
            if (!response.ok) throw new Error(`HTTP ${response.status}`)
            return await response.json()
          }
        }
      ]
      
      for (const method of methods) {
        try {
          console.log(`尝试方法: ${method.name}`)
          const data = await method.fn()
          console.log(`${method.name} 成功:`, data)
          
          if (data.version && data.errorCode === 0) {
            alert(`API测试成功！方法：${method.name}`)
            return
          }
        } catch (error) {
          console.error(`${method.name} 失败:`, error)
        }
      }
      
      alert('所有测试方法都失败了。這可能是CORS限制导致的。')
    }
    
    // 切换完整公钥顯示
    const toggleFullKey = () => {
      showFullKey.value = !showFullKey.value
    }
    
    // 复制摘要
    const copyDigest = async () => {
      if (publicKeyInfo.value?.digest) {
        try {
          await navigator.clipboard.writeText(publicKeyInfo.value.digest)
          console.log('公钥摘要已复制到剪貼板')
          // 可以在這里添加toast提示
        } catch (err) {
          console.error('复制摘要失败:', err)
          // 降級方案：尝试手動選择文本
          try {
            const textArea = document.createElement('textarea')
            textArea.value = publicKeyInfo.value.digest
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            console.log('使用降級方案复制成功')
          } catch (fallbackErr) {
            console.error('降級复制也失败:', fallbackErr)
          }
        }
      }
    }
    
    // 复制完整公钥
    const copyFullKey = async () => {
      if (publicKeyInfo.value?.fullKey) {
        try {
          await navigator.clipboard.writeText(publicKeyInfo.value.fullKey)
          console.log('完整公钥已复制到剪貼板')
          // 可以在這里添加toast提示
        } catch (err) {
          console.error('复制完整公钥失败:', err)
          // 降級方案：尝试手動選择文本
          try {
            const textArea = document.createElement('textarea')
            textArea.value = publicKeyInfo.value.fullKey
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            console.log('使用降級方案复制成功')
          } catch (fallbackErr) {
            console.error('降級复制也失败:', fallbackErr)
          }
        }
      }
    }
    
    // 启動自動刷新
    const startAutoRefresh = () => {
      refreshTimer = setInterval(() => {
        fetchBlockchainData()
      }, 30000) // 30秒刷新一次
    }
    
    // 停止自動刷新
    const stopAutoRefresh = () => {
      if (refreshTimer) {
        clearInterval(refreshTimer)
        refreshTimer = null
      }
    }
    
    // 生命周期
    onMounted(() => {
      fetchBlockchainData()
      startAutoRefresh()
    })
    
    onUnmounted(() => {
      stopAutoRefresh()
    })
    
    return {
      loading,
      error,
      publicKeyInfo,
      lastUpdateTime,
      showFullKey,
      connectionStatus,
      statusText,
      refreshData,
      testDirectAPI,
      toggleFullKey,
      copyDigest,
      copyFullKey
    }
  }
}
</script>

<style scoped>
.blockchain-query-container {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(30, 41, 59, 0.6);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(20px);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 頭部樣式 */
.module-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.blockchain-icon {
  width: 24px;
  height: 24px;
  color: white;
  z-index: 2;
}

.icon-pulse {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #06b6d4 100%);
  animation: pulse-glow 2s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes pulse-glow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

.title-content h3 {
  font-size: 20px;
  font-weight: 600;
  color: #f8fafc;
  margin: 0 0 4px 0;
}

.title-subtitle {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.test-btn, .refresh-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  color: #3b82f6;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-btn {
  background: rgba(34, 197, 94, 0.1);
  border-color: rgba(34, 197, 94, 0.3);
  color: #22c55e;
}

.test-btn:hover {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
}

.refresh-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.test-btn:disabled, .refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-btn.loading svg {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.refresh-btn svg {
  width: 16px;
  height: 16px;
}

/* 状态栏樣式 */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid rgba(51, 65, 85, 0.3);
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #64748b;
}

.status-item.connected .status-dot {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  animation: pulse-dot 2s ease-in-out infinite;
}

.status-item.error .status-dot {
  background: #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.last-update {
  font-size: 12px;
  color: #64748b;
}

/* 内容區域樣式 */
.content-area {
  min-height: 200px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #94a3b8;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.error-icon {
  width: 48px;
  height: 48px;
  color: #ef4444;
  margin-bottom: 16px;
}

.error-container h4 {
  color: #f8fafc;
  margin: 0 0 8px 0;
  font-size: 18px;
}

.error-container p {
  color: #94a3b8;
  margin: 0 0 20px 0;
}

.retry-btn {
  padding: 10px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: #dc2626;
}

/* 數據展示樣式 */
.data-container {
  space-y: 20px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.info-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 12px;
  padding: 16px;
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(59, 130, 246, 0.3);
}

.info-label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-value {
  font-size: 16px;
  font-weight: 600;
  color: #f8fafc;
}

.hash-value {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  color: #06b6d4;
}

/* 公钥摘要樣式 */
.key-digest-section, .full-key-section {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(51, 65, 85, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 16px;
  cursor: pointer;
  user-select: none;
}

.section-title svg {
  width: 20px;
  height: 20px;
  color: #3b82f6;
}

.expand-icon {
  margin-left: auto;
  transition: transform 0.3s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.key-digest {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.4);
  border-radius: 8px;
  padding: 12px 16px;
}

.key-digest code {
  flex: 1;
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  font-size: 14px;
  color: #06b6d4;
  background: none;
  border: none;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 6px;
  color: #3b82f6;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

.copy-btn svg {
  width: 16px;
  height: 16px;
}

/* 完整公钥樣式 */
.full-key-content {
  margin-top: 16px;
}

.key-container {
  position: relative;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.4);
  border-radius: 8px;
  padding: 16px;
}

.full-key-text {
  font-family: 'SF Mono', 'Monaco', 'Cascadia Code', monospace;
  font-size: 12px;
  color: #06b6d4;
  line-height: 1.5;
  margin: 0;
  word-break: break-all;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 40px;
}

.full-key-copy {
  position: absolute;
  top: 12px;
  right: 12px;
}

/* 响應式设計 */
@media (max-width: 768px) {
  .blockchain-query-container {
    padding: 16px;
  }

  .module-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .status-bar {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
}
</style>
