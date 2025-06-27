import axios from 'axios'

// 區块链API服務 - 使用代理路径避免CORS問題
const BLOCKCHAIN_API_BASE = '/api/blockchain'

// 創建專用的axios實例
const blockchainApi = axios.create({
  baseURL: BLOCKCHAIN_API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 响應拦截器
blockchainApi.interceptors.response.use(
  (response) => {
    // 保持axios的原始响應结構，讓组件統一處理
    return response
  },
  (error) => {
    console.error('區块链API调用错误:', error)
    return Promise.reject(error)
  }
)

/**
 * 區块链服務类
 */
export class BlockchainService {
  
  /**
   * 获取公钥信息 - 使用fetch作為備用方案
   * @returns {Promise} 返回公钥數據
   */
  static async getPublicKeyWithFetch() {
    try {
      console.log('使用fetch请求API:', BLOCKCHAIN_API_BASE + '/auth/pub')
      
      const response = await fetch(BLOCKCHAIN_API_BASE + '/auth/pub', {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      console.log('Fetch API响應成功:', data)
      return data
    } catch (error) {
      console.error('Fetch API请求失败:', error)
      throw error
    }
  }
  
  /**
   * 获取公钥信息
   * @returns {Promise} 返回公钥數據
   */
  static async getPublicKey() {
    try {
      console.log('正在请求API:', BLOCKCHAIN_API_BASE + '/auth/pub')
      
      const response = await blockchainApi.get('/auth/pub')
      console.log('API响應成功:', response)
      return response
    } catch (error) {
      console.error('Axios请求失败，尝试使用fetch:', error)
      
      // 如果axios失败，尝试使用fetch
      try {
        const fallbackResponse = await this.getPublicKeyWithFetch()
        // 包装為axios風格的响應格式
        return { data: fallbackResponse }
      } catch (fetchError) {
        console.error('Fetch请求也失败:', fetchError)
        
        // 提供更具体的错误信息
        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          throw new Error('網絡連接失败，请检查網絡或API服務状态')
        } else if (error.response?.status === 403) {
          throw new Error('访問被拒絕，可能是CORS問題')
        } else if (error.response?.status === 404) {
          throw new Error('API接口不存在')
        } else if (error.response?.status >= 500) {
          throw new Error('服務器内部错误')
        } else {
          throw new Error(`获取公钥失败: ${error.message}`)
        }
      }
    }
  }

  /**
   * 解析公钥信息
   * @param {string} pubKey - 公钥字符串
   * @returns {Object} 解析后的公钥信息
   */
  static parsePublicKey(pubKey) {
    if (!pubKey) return null
    
    try {
      // 基本信息提取
      const keyLength = pubKey.length
      const keyType = pubKey.startsWith('MII') ? 'RSA公钥' : 'Unknown'
      
      // 根據密钥長度判断密钥大小 (Base64编碼的RSA公钥長度)
      let keySize = '未知'
      if (keyLength > 800) {
        keySize = '4096位'
      } else if (keyLength > 550) {
        keySize = '2048位' 
      } else if (keyLength > 350) {
        keySize = '1024位'
      } else if (keyLength > 200) {
        keySize = '512位'
      }
      
      // 生成摘要（前16位和后16位，更詳細一些）
      const digest = `${pubKey.substring(0, 16)}...${pubKey.substring(pubKey.length - 16)}`
      
      // 計算简单哈希值用于顯示
      let hash = 0
      for (let i = 0; i < pubKey.length; i++) {
        const char = pubKey.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // 转换為32位整數
      }
      const hashHex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')
      
      return {
        type: keyType,
        size: keySize,
        length: keyLength,
        digest,
        hash: hashHex,
        fullKey: pubKey
      }
    } catch (error) {
      console.error('解析公钥失败:', error)
      return null
    }
  }

  /**
   * 验證公钥格式
   * @param {string} pubKey - 公钥字符串
   * @returns {boolean} 是否為有效格式
   */
  static validatePublicKey(pubKey) {
    if (!pubKey || typeof pubKey !== 'string') return false
    
    // 基本格式验證
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/
    return base64Regex.test(pubKey) && pubKey.length > 100
  }

  /**
   * 格式化時間戳
   * @param {number} timestamp - 時間戳
   * @returns {string} 格式化的時間字符串
   */
  static formatTimestamp(timestamp) {
    if (!timestamp) return new Date().toLocaleString('zh-CN')
    return new Date(timestamp).toLocaleString('zh-CN')
  }
}

export default BlockchainService
