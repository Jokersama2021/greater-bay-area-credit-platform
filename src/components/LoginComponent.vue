<template>
  <div class="modal">
    <div v-if="!showTransactionInfo && !showTransactionInfo2" class="modal-content">
      <button class="close-btn" @click="close">X</button>
      <h2>登录</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="loginDetails.username" placeholder="用户名" required>
        <input type="password" v-model="loginDetails.password" placeholder="密碼" required>
        <button type="submit">登录</button>
      </form>
    </div>
    <TransactionInfo v-if="showTransactionInfo" @completed="proceedToNextInfo" />
    <TransactionInfo2 v-if="showTransactionInfo2" @completed="close" />
    <div v-if="showTransactionInfo || showTransactionInfo2" class="controls">
      <button @click="proceedToNextInfo" class="switch-btn">切换到下一個信息</button>
      <button @click="close">關闭</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import TransactionInfo from './TransactionInfo.vue'; // 确保路径正确
import TransactionInfo2 from './TransactionInfo2.vue'; // 确保路径正确

const loginDetails = ref({
  username: '', 
  password: ''
});
const showTransactionInfo = ref(false);
const showTransactionInfo2 = ref(false);
const fabricSelected = ref(false); // 默認fabric未選择

const login = async () => {
  try {
    const response = await axios.post('http://120.24.45.115:3000/api/login', loginDetails.value);
    if (response.data.success) {
      alert('登录成功');
      const selectedOption = prompt("请選择交易詳情类型：\n1. Fabric\n2. bcos"); // 提示用户選择
      if (selectedOption === '1') {
        showTransactionInfo.value = true;  // 顯示第一個交易詳情组件
        showTransactionInfo2.value = false; // 不顯示第二個交易詳情组件
        fabricSelected.value = true; // 设置fabric選择為true
      } else {
        showTransactionInfo.value = false; // 不顯示第一個交易詳情组件
        showTransactionInfo2.value = true; // 顯示第二個交易詳情组件
        fabricSelected.value = false; // 设置fabric選择為false
      }
    } else {
      alert('登录失败: ' + response.data.message);
      showTransactionInfo.value = false;
      showTransactionInfo2.value = false;
    }
  } catch (error) {
    console.error('登录错误:', error);
  }
};

const proceedToNextInfo = () => {
  if (showTransactionInfo.value) {
    showTransactionInfo.value = false;
    showTransactionInfo2.value = true;
  } else {
    showTransactionInfo2.value = false;
    close(); // 關闭模态或進行其他操作
  }
};
const emits = defineEmits(['close']);
const close = () => {
  emits('close');
  showTransactionInfo.value = false;
  showTransactionInfo2.value = false;
  // 确保重置登录詳情
  loginDetails.value.username = '';
  loginDetails.value.password = '';
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
  width: 300px;
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
.controls {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center; /* 垂直居中 */
  padding: 10px;
  margin-right: 0; /* 取消右边距 */
}
.switch-btn {
  font-size: 16px; /* 更大的字体 */
  background-color: #007bff; /* 蓝色背景 */
  color: white; /* 白色字体 */
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
