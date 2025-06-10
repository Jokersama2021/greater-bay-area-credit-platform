<template>
  <div class="data-container">
    <!-- 添加一個頂部操作區 -->
    <div class="action-bar">
      <div v-for="(item, index) in data" :key="index">
        <button v-if="!transactionInProgress && !transactionCompleted && !transactionSubmitted" 
                @click="fetchCompanyData(item.stock_name)" 
                class="transaction-button">
          <span class="button-icon">🔍</span>
          跨链事務進度查詢
        </button>
      </div>
    </div>

    <div class="total-data-section">
      <div v-for="(item, index) in data" :key="index" class="data-item">
        <!-- 基本信息部分 -->
        <div class="info-section">
          <h3 class="section-title">基本信息</h3>
          <div class="info-grid">
            <div class="info-row">
              <span class="label">證券代碼:</span>
              <span class="value code">{{ item.stock_code }}</span>
            </div>
            <div class="info-row">
              <span class="label">證券简称:</span>
              <span class="value name">{{ item.stock_name }}</span>
            </div>
            <div class="info-row">
              <span class="label">企業規模:</span>
              <span class="value">{{ item.company_size }}</span>
            </div>
            <div class="info-row">
              <span class="label">注册資本:</span>
              <span class="value">{{ formatNumber(item.registered_capital) }}元</span>
            </div>
            <div class="info-row">
              <span class="label">成立日期:</span>
              <span class="value">{{ item.establishment_date }}</span>
            </div>
            <div class="info-row">
              <span class="label">注册地址:</span>
              <span class="value address">{{ item.registered_address }}</span>
            </div>
            <div class="info-row">
              <span class="label">董事長:</span>
              <span class="value">{{ item.chairman_name }}</span>
            </div>
            <div class="info-row">
              <span class="label">總經理:</span>
              <span class="value">{{ item.general_manager_name }}</span>
            </div>
            <div class="info-row">
              <span class="label">財務總監:</span>
              <span class="value">{{ item.financial_director_name }}</span>
            </div>
            <div class="info-row">
              <span class="label">董事會秘書:</span>
              <span class="value">{{ item.board_secretary_name }}</span>
            </div>
          </div>
        </div>
        
        <!-- 財務指標部分 -->
        <div class="finance-section">
          <h3 class="section-title">財務指標</h3>
          <div class="finance-grid">
            <div class="finance-row">
              <span class="label">每股收益:</span>
              <span class="value highlight">{{ formatNumber(item.earnings_per_share) }}元</span>
            </div>
            <div class="finance-row">
              <span class="label">净利润:</span>
              <span class="value highlight">{{ formatNumber(item.net_profit_attributable) }}元</span>
            </div>
            <div class="finance-row">
              <span class="label">總資產收益率:</span>
              <span class="value">{{ formatNumber(item.roa) }}%</span>
            </div>
            <div class="finance-row">
              <span class="label">净資產收益率:</span>
              <span class="value">{{ formatNumber(item.average_roe) }}%</span>
            </div>
            <div class="finance-row">
              <span class="label">毛利率:</span>
              <span class="value">{{ formatNumber(item.gross_margin) }}%</span>
            </div>
            <div class="finance-row">
              <span class="label">净利率:</span>
              <span class="value">{{ formatNumber(item.net_margin) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 進度展示區域移到這里 -->
    <div class="transaction-progress-container" v-if="transactionInProgress || transactionCompleted || transactionSubmitted">
      <!-- 進度条 -->
      <div class="progress-bar">
        <div class="progress-step" :class="{ active: transactionInProgress, completed: transactionCompleted || transactionSubmitted }">
          <div class="step-icon">1</div>
          <div class="step-label">開启跨链事務</div>
        </div>
        <div class="progress-line" :class="{ active: transactionCompleted || transactionSubmitted }"></div>
        <div class="progress-step" :class="{ active: transactionCompleted, completed: transactionSubmitted }">
          <div class="step-icon">2</div>
          <div class="step-label">执行事務交易</div>
        </div>
        <div class="progress-line" :class="{ active: transactionSubmitted }"></div>
        <div class="progress-step" :class="{ active: transactionSubmitted }">
          <div class="step-icon">3</div>
          <div class="step-label">提交事務完成</div>
        </div>
      </div>

      <!-- 事務詳情展示 -->
      <div class="transaction-details" v-if="companyRecords.length">
        <div class="detail-card" v-if="transactionInProgress">
          <h4>跨链事務已開启</h4>
          <div class="detail-item">
            <span class="detail-label">公司名称:</span>
            <span class="detail-value">{{ companyRecords[0].company_name }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">交易哈希:</span>
            <span class="detail-value hash">{{ companyRecords[0].tx_hash }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">交易ID:</span>
            <span class="detail-value">{{ companyRecords[0].tx_id }}</span>
          </div>
          <button @click="nextStep" class="next-button">下一步</button>
        </div>

        <div class="detail-card" v-if="transactionCompleted">
          <h4>跨链事務执行成功</h4>
          <div class="detail-item">
            <span class="detail-label">區块编号:</span>
            <span class="detail-value">{{ companyRecords[0].block_number }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">路径:</span>
            <span class="detail-value">{{ companyRecords[0].path }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">方法:</span>
            <span class="detail-value">{{ companyRecords[0].method }}</span>
          </div>
          <button @click="nextStep" class="next-button">完成提交</button>
        </div>

        <div class="detail-card success" v-if="transactionSubmitted">
          <h4>事務提交成功</h4>
          <div class="detail-item">
            <span class="detail-label">执行结果:</span>
            <span class="detail-value">{{ companyRecords[0].properties_result }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">状态消息:</span>
            <span class="detail-value">{{ companyRecords[0].properties_message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { defineProps, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  data: Array
});

const companyRecords = ref([]);

const fetchCompanyData = async (stockName) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/company-details/${encodeURIComponent(stockName)}`);
    if (response.data.success) {
      companyRecords.value = response.data.data; // Store the fetched data
      transactionInProgress.value = true;
    } else {
      alert(response.data.message); // Show an error message if not successful
    }
  } catch (error) {
    console.error('Error fetching company data:', error);
    alert('Failed to fetch company data');
  }
};

const fetchCompanyRecords = async (companyName) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/transactions/${companyName}`);
    if (response.data.success) {
      companyRecords.value = response.data.data;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('Error fetching company records:', error);
  }
};

const transactionDetails = ref({
  company_name: '',
  tx_hash: '',
});
const showData = ref(false);
const currentStep = ref(0);

const transactionInProgress = ref(false);
const transactionCompleted = ref(false);
const transactionSubmitted = ref(false);

const nextStep = () => {
  if (transactionInProgress.value) {
    transactionInProgress.value = false;
    transactionCompleted.value = true;
  } else if (transactionCompleted.value) {
    transactionCompleted.value = false;
    transactionSubmitted.value = true;
  }
};

const formatNumber = (num) => {
  if (!num) return '0';
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

</script>
<style scoped>
.data-container {
  padding: 20px;
  background-color: #001F3F;
  border-radius: 12px;
  height: 100%;
}

.total-data-section {
  height: 100%;
  overflow-y: auto;
}

.info-section, .finance-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.section-title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 25px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Montserrat', sans-serif;
}

.info-grid, .finance-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.info-row, .finance-row {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-row:hover, .finance-row:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.label {
  min-width: 120px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-family: 'Open Sans', sans-serif;
}

.value {
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-family: 'Roboto', sans-serif;
  padding-left: 15px;
}

.value.code {
  color: #4FC6FF;
  font-weight: 500;
}

.value.name {
  color: #FFB74D;
  font-weight: 600;
}

.value.highlight {
  color: #66BB6A;
  font-weight: 600;
}

.value.address {
  font-family: 'Open Sans', sans-serif;
  line-height: 1.4;
}

/* 美化滚動条 */
.total-data-section::-webkit-scrollbar {
  width: 6px;
}

.total-data-section::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.total-data-section::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.total-data-section::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .info-grid, .finance-grid {
    grid-template-columns: 1fr;
  }
  
  .label {
    min-width: 100px;
    font-size: 13px;
  }
  
  .value {
    font-size: 13px;
  }
}

.action-bar {
  margin-bottom: 20px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  display: flex;
  justify-content: flex-end;
}

.transaction-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: linear-gradient(135deg, #36A2EB 0%, #4BC0C0 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(54, 162, 235, 0.2);
}

.transaction-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(54, 162, 235, 0.3);
}

.button-icon {
  margin-right: 8px;
  font-size: 20px;
}

.transaction-progress-container {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-weight: bold;
  transition: all 0.3s ease;
}

.step-label {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.progress-line {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 15px;
  transition: all 0.3s ease;
}

.progress-step.active .step-icon {
  background: #36A2EB;
  color: white;
}

.progress-step.completed .step-icon {
  background: #4BC0C0;
  color: white;
}

.progress-line.active {
  background: #36A2EB;
}

.detail-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
}

.detail-card h4 {
  color: white;
  margin-bottom: 15px;
  font-size: 18px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-label {
  color: rgba(255, 255, 255, 0.5);
  width: 100px;
  flex-shrink: 0;
}

.detail-value {
  color: white;
  word-break: break-all;
}

.detail-value.hash {
  color: #36A2EB;
  font-family: monospace;
}

.next-button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #36A2EB;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-button:hover {
  background: #4BC0C0;
}

.detail-card.success {
  background: rgba(75, 192, 192, 0.1);
  border: 1px solid rgba(75, 192, 192, 0.3);
}
</style>
