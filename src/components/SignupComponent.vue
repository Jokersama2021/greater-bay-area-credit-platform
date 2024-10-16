<template>
    <div class="modal">
      <div class="modal-content">
        <button class="close-btn" @click="close">X</button>
        <form @submit.prevent="signup">
          <input type="text" v-model="signupDetails.username" placeholder="用户名" required>
          <input type="email" v-model="signupDetails.email" placeholder="邮箱" required>
          <input type="password" v-model="signupDetails.password" placeholder="密码" required>
          <button type="submit">注册</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  import axios from 'axios';
  
  const emits = defineEmits(['close']);
  const signupDetails = ref({ username: '', email: '', password: '' });
  
  const signup = async () => {
    try {
      const response = await axios.post('http://120.24.45.115:3000/api/signup', {
        username: signupDetails.value.username,
        email: signupDetails.value.email,
        password: signupDetails.value.password
      });
      if (response.data.success) {
        alert('注册成功');
        emits('close'); // Close modal on success
      } else {
        alert('注册失败: ' + response.data.message);
      }
    } catch (error) {
      console.error('注册错误:', error);
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
    width: 20%; /* Adjusted to 1/5th of the viewport width */
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
  