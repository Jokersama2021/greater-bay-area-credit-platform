<template>
  <div class="data-container">
    <div class="total-data-section">
      <!-- 现有数据展示 -->
      <div v-for="(item, index) in data" :key="index" class="data-item">
        <div class="data-item">证券代码: {{ item.stock_code }}</div>
        <div class="data-item">证券简称: {{ item.stock_name }}</div>
        <div class="data-item">企业规模: {{ item.registered_capital }}</div>
        <div class="data-item">注册资本[单位] 元: {{ item.revenue_2022 }}</div>
        <div class="data-item">成立日期: {{ item.establishment_date }}</div>
        <div class="data-item">注册地址: {{ item.registered_address }}</div>
        <div class="data-item">董事长: {{ item.chairman_name }}</div>
        <div class="data-item">总经理: {{ item.general_manager_name }}</div>
        <div class="data-item">财务总监: {{ item.financial_director_name }}</div>
        <div class="data-item">董事会秘书: {{ item.board_secretary_name }}</div>
      </div>
    </div>
    <div class="transaction-section">
      <!-- 跨链事务进度查询按钮 -->
      <div v-for="(item, index) in data" :key="index" class="data-item">
        <button v-if="!transactionInProgress && !transactionCompleted && !transactionSubmitted" @click="fetchCompanyData(item.stock_name)" class="rounded-button">跨链事务进度查询</button>
        <!-- 显示跨链事务进度 -->
        <div v-if="transactionInProgress" class="status-message">
          跨链事务已开启
          <div v-for="record in companyRecords" :key="record.id">
            <div>公司名称: {{ record.company_name }}</div>
            <div>交易哈希: {{ record.tx_hash }}</div>
            <div>交易ID: {{ record.tx_id }}</div>
            <button @click="nextStep" class="rounded-button">执行事务交易进度查询</button>
          </div>
        </div>
        <!-- 显示跨链事务交易成功 -->
        <div v-if="transactionCompleted" class="status-message">
          跨链事务交易成功
          <div v-for="record in companyRecords" :key="record.id">
            <div>区块编号: {{ record.block_number }}</div>
            <div>路径: {{ record.path }}</div>
            <div>方法: {{ record.method }}</div>
            <button @click="nextStep" class="rounded-button">提交事务进度查询</button>
          </div>
        </div>
        <!-- 显示提交事务进度成功 -->
        <div v-if="transactionSubmitted" class="status-message">
          提交事务进度成功
          <div v-for="record in companyRecords" :key="record.id">
            <div>属性结果: {{ record.properties_result }}</div>
            <div>属性消息: {{ record.properties_message }}</div>
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

</script>
<style scoped>
.data-container {
  padding: 20px;
  border-radius: 8px;
  height: 720px; /* 调整容器高度自适应 */
}

.total-data-section {
  margin-bottom: 20px; /* 增加总数据部分与交易部分之间的间距 */
}

.data-item {
  color: rgb(255, 254, 254); /* 白色 */
  margin-bottom: 10px; /* 保持条目之间的间距 */
}

.transaction-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 确保内容顶部和底部分开 */
  align-items: center; /* 水平居中对齐所有元素 */
  background-color: #222a96; /* 更深蓝色的背景 */
  border-radius: 8px; /* 圆角效果 */
  padding: 20px; /* 内边距 */
  color: #ffffff; /* 字体颜色为白色 */
  height: auto; /* 调整容器高度自适应 */
}

.status-message {
  text-align: center; /* 文本居中显示 */
  width: 100%; /* 宽度充满容器 */
}

.rounded-button {
  padding: 10px 20px; /* 按钮内边距 */
  background-color: #007bff; /* 按钮背景颜色 */
  color: white; /* 按钮文字颜色 */
  border: none; /* 去除边框 */
  border-radius: 20px; /* 按钮圆角 */
  cursor: pointer; /* 鼠标悬停时显示手型图标 */
  margin-top: 10px; /* 与状态消息之间的距离 */
}

.rounded-button:hover {
  background-color: #0056b3; /* 鼠标悬停时的背景颜色变化 */
}
</style>
