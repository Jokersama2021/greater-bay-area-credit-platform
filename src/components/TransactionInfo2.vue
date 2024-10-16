<template>
    <div class="modal">
      <div class="modal-content">
        <button class="close-btn" @click="close">X</button>
        <h2>交易信息-bcos</h2>
        <form @submit.prevent="submitTransaction2">
          <input type="text" v-model="transactionDetails.company_name" placeholder="公司名称" required>
          <input type="text" v-model="transactionDetails.tx_hash" placeholder="交易哈希" required>
          <input type="text" v-model="transactionDetails.username" placeholder="用户名" required>
          <input type="text" v-model="transactionDetails.tx_id" placeholder="交易ID" required>
          <input type="number" v-model="transactionDetails.block_number" placeholder="区块编号" required>
          <input type="text" v-model="transactionDetails.path" placeholder="路径" required>
          <input type="text" v-model="transactionDetails.method" placeholder="方法" required>
          <input type="text" v-model="transactionDetails.xa_transaction_id" placeholder="XA交易ID" required>
          <input type="number" v-model="transactionDetails.xa_transaction_seq" placeholder="XA交易序列" required>
          <input type="text" v-model="transactionDetails.by_proxy" placeholder="代理" required>
          <input type="number" v-model="transactionDetails.error_code" placeholder="错误代码" required>
          <textarea v-model="transactionDetails.message" placeholder="消息" required></textarea>
  
          <!-- properties 相关字段 -->
          <input type="text" v-model="transactionDetails.properties_path" placeholder="属性路径" required>
          <input type="text" v-model="transactionDetails.properties_username" placeholder="属性用户名" required>
          <input type="number" v-model="transactionDetails.properties_block_number" placeholder="属性区块编号" required>
          <input type="text" v-model="transactionDetails.properties_tx_hash" placeholder="属性交易哈希" required>
          <input type="text" v-model="transactionDetails.properties_xa_transaction_id" placeholder="属性XA交易ID" required>
          <input type="number" v-model="transactionDetails.properties_xa_transaction_seq" placeholder="属性XA交易序列" required>
          <input type="text" v-model="transactionDetails.properties_method" placeholder="属性方法" required>
          <textarea v-model="transactionDetails.properties_args" placeholder="属性参数" required></textarea>
          <textarea v-model="transactionDetails.properties_result" placeholder="属性结果" required></textarea>
          <input type="text" v-model="transactionDetails.properties_by_proxy" placeholder="属性代理" required>
          <input type="number" v-model="transactionDetails.properties_error_code" placeholder="属性错误代码" required>
          <textarea v-model="transactionDetails.properties_message" placeholder="属性消息" required></textarea>
  
          <button type="submit">提交</button>
        </form>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  
  const emits = defineEmits(['close']);
  const transactionDetails = ref({
    company_name: '',
    tx_hash: '',
    username: '',
  tx_id: '',
  block_number: '',
  path: '',
  method: '',
  xa_transaction_id: '',
  xa_transaction_seq: '',
  by_proxy: '',
  error_code: '',
  message: '',
  properties_path: '',
  properties_username: '',
  properties_block_number: '',
  properties_tx_hash: '',
  properties_xa_transaction_id: '',
  properties_xa_transaction_seq: '',
  properties_method: '',
  properties_args: JSON.stringify([], null, 2),
  properties_result: JSON.stringify([], null, 2),
  properties_by_proxy: '',
  properties_error_code: '',
  properties_message: ''
  });
  
  const submitTransaction2 = async () => {
  try {
  const response = await axios.post('http://localhost:3000/api/submitTransaction2', transactionDetails.value);
  if (response.data.success) {
  alert('交易信息提交成功');
  emits('close'); // Close modal on success
  } else {
  alert('交易信息提交失败: ' + response.data.message);
  }
  } catch (error) {
  console.error('交易信息提交错误:', error);
  }
  };
  
  const close = () => {
  emits('close');
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .modal-content {
    background: white;
    padding: 20px;
    width: 30%; /* Adjusted to 1/3rd of the viewport width for better readability */
    position: relative;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;
  }
  
  </style>