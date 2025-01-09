<template>
  <nav class="top-nav">
    <div class="logo-placeholder"></div>
    <ul class="nav-links">
      <li><a href="#" @click="setViewToSelect">Home</a></li>
      <li><a href="#work">Work</a></li>
      <li><a href="#contact">Contact with Us</a></li>
      <li><a href="#login" @click="toggleLogin">Log In</a></li>
      <li><a href="#signup" @click="toggleSignup">Sign Up</a></li>
    </ul>
  </nav>
  <div v-if="view === 'select'" class="select-container">
    <div class="content">
      <div class="title">企业数据的跨链查询与调用</div>
      <div class="relative w-70">
        <input
          v-model="searchQuery"
          @input="updateFilteredTables"
          @blur="hideDropdown"
          class="p-4 border rounded mb-4 w-full"
          placeholder="Enter company name"
        />
        <ul v-if="showDropdown && filteredTables.length" class="absolute bg-white border rounded mt-1 w-full">
          <li
            v-for="table in filteredTables"
            :key="table.value"
            @mousedown.prevent="selectTable(table.value)"
            class="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {{ table.name }}
          </li>
        </ul>
      </div>
      <div class="table-container">
        <div class="table-list">
          <div v-for="table in tables" :key="table.value" @click="selectTable(table.value)" class="table-item">
            {{ table.name }}
          </div>
        </div>
        <div class="table-info">现已收录 {{ tables.length }} 个公司</div>
      </div>
    </div>
  </div>
  <div v-if="showLogin">
    <!-- 监听close事件 -->
    <LoginComponent @close="handleClose('login')" />
  </div>

  <div v-if="showSignup">
    <!-- 监听close事件 -->
    <SignupComponent @close="handleClose('signup')" />
  </div>

  <!-- Only show these components if a table has been selected and view is set to 'chart' -->
  <div v-if="view === 'chart'" class="data-display">
    <!-- 搜索条和结果显示 -->
<div class="top-bar">
  <input type="text" class="search-input" v-model="chartSearchTerm" @input="searchChartSections" placeholder="搜索部分...">
  <div class="search-results" v-if="chartSearchResults.length">
    <div v-for="result in chartSearchResults" :key="result" @click="scrollToChartSection(result)" class="result-item">
      {{ result }}
    </div>
  </div>
</div>

    <div class="main-container">
      <div class="total-data-section">
        <TotalData class="total-data-content" :data="selectedData" />
      </div>
      <div class="charts-section">
        <div class="chart radar" id="radarChart">
  <RadarChart v-if="selectedData" :data="selectedData" />
</div>
<div class="chart bar" id="barChart">
  <BarChart v-if="selectedData" :data="selectedData" />
</div>

      </div>
    </div>
  </div>
</template>

<style>
.bg-light-green {
  background-color: #90ee90;
}

.bg-light-blue {
  background-color: #add8e6;
}

.bg-light-purple {
  background-color: #dda0dd;
}

.bg-light-green, .bg-light-blue {
  border: 2px solid #ddd; /* Light grey border for visibility */
  margin: 5px; /* Spacing between sections */
  padding: 10px; /* Padding inside sections */
}

.flex-1 {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure each section uses the full available height */
}

.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  border: 2px solid #ccc; /* Adding borders to charts for better visibility */
}

.p-3 {
  padding: px; /* Consistent padding around the content */
}

/* More specific adjustments for better layout control */
.TotalData, .RadarChart, .BarChart {
  border: 2px solid #ccc; /* Each component gets a specific border */
  margin-bottom: 10px; /* Space between components */
}

/* Ensure the last item in a container does not have a bottom margin */
.TotalData:last-child, .RadarChart:last-child, .BarChart:last-child {
  margin-bottom: 0;
}

</style>



<script setup>
import { ref, computed } from 'vue';

import axios from 'axios';
import TotalData from './components/TotalData.vue';
import RadarChart from './components/radarChart.vue';
import BarChart from './components/BarChart.vue';
import LoginComponent from './components/LoginComponent.vue';
import SignupComponent from './components/SignupComponent.vue';

const selectedTable = ref(null);
const data = ref({});
const selectedData = ref([]);
const view = ref('select');
const searchQuery = ref('');
const showDropdown = ref(false);

const showLogin = ref(false);
const showSignup = ref(false);
const loginDetails = ref({ username: '', password: '' });
const signupDetails = ref({ username: '', email: '', password: '' });

const tables = ref([
  { name: '贵州茅台', value: 'table1' },
  { name: 'ST凯撒', value: 'table2' },
  { name: '腾讯', value: 'table3' }
]);



const setViewToSelect = () => {
  view.value = 'select';
};

const chartSearchTerm = ref(''); // 专门用于图表搜索的变量
const chartSearchResults = ref([]);
const sections = {
  '会计数据': 'radarChart',
  '资产情况': 'barChart'
};

const searchChartSections = () => {
  if (!chartSearchTerm.value) {
    chartSearchResults.value = [];
  } else {
    // 过滤出匹配的搜索结果
    chartSearchResults.value = Object.keys(sections).filter(section =>
      section.toLowerCase().includes(chartSearchTerm.value.toLowerCase())
    );
  }
};

// 滚动到指定部分
const scrollToChartSection = (sectionName) => {
  const sectionId = sections[sectionName];
  const sectionElement = document.getElementById(sectionId);
  if (sectionElement) {
    sectionElement.scrollIntoView({ behavior: 'smooth' });
    chartSearchResults.value = [];
    chartSearchTerm.value = '';
  }
};

const toggleLogin = () => {
  showLogin.value = !showLogin.value;
  showSignup.value = false;
};

const toggleSignup = () => {
  showSignup.value = !showSignup.value;
  showLogin.value = false;
};

const filteredTables = computed(() => {
  if (searchQuery.value) {
    return tables.value.filter(table =>
      table.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return tables.value;
});


const updateFilteredTables = () => {
  showDropdown.value = true;
};

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 100);
};


const selectTable = async (tableValue) => {
  selectedTable.value = tableValue;
  try {
    console.log('正在请求数据...');  // 添加日志
    const response = await axios.get(`http://localhost:3000/api/visualization/${tableValue}`);
    console.log('收到响应:', response.data);  // 添加日志
    
    if (response.data.success) {
      selectedData.value = response.data.data[selectedTable.value];  // 直接使用 data 数组
      view.value = 'chart';
    } else {
      console.error('获取数据失败');
      alert('获取数据失败');
    }
  } catch (error) {
    console.error('请求出错:', error);
    alert('请求出错,请检查后端服务是否正常运行');
  }
};

const loadData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/visualization/${selectedTable.value}`);
    data.value = response.data.data;
    selectedData.value = data.value[selectedTable.value];
    view.value = 'chart';
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const handleClose = (type) => {
  if (type === 'login') {
    showLogin.value = false;
  } else if (type === 'signup') {
    showSignup.value = false;
  }
};

const handleTableSelect = async (table) => {
  try {
    console.log('选择表格:', table);
    selectedTable.value = table;
    // 获取数据
    const response = await axios.get(`http://localhost:3000/api/data/${table.value}`);
    console.log('获取到的数据:', response.data);
    
    if (response.data.success) {
      selectedData.value = response.data.data;
      view.value = 'chart';
    } else {
      console.error('获取数据失败:', response.data.message);
      alert('获取数据失败');
    }
  } catch (error) {
    console.error('请求出错:', error);
    alert('请求出错,请检查后端服务是否正常运行');
  }
};

</script>
<style scoped>

.top-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: #f2f2f2;
}

.logo-placeholder {
  width: 50px;
  height: 20px;
  background-color: #ddd;
}

.nav-links {
  display: flex;
  justify-content: space-around;
  width: 100%;
  list-style: none;
  padding: 0;
}

.nav-links li {
  margin: 0;
}

.nav-links a {
  text-decoration: none;
  color: black;
}

/* General form styling */
form {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

form input[type="text"], form input[type="password"], form input[type="email"] {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

/* Background for select-container and enhanced styles for table items */
.select-container {
  background-image: url('assets/imgs/DA .webp');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px); /* 减去顶部导航栏的高度 */
  overflow: hidden; /* 防止此容器内部滚动 */
}

.content {
  width: 70%;
  margin-top: -5vh;
  position: relative;
}

.title {
  font-size: 76px;
  margin-bottom: -5px;
  text-align: center;
  color: #90ee90;
}

.table-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  width: 100%;
  max-height: 5vh;
  overflow-y: auto;
}

.table-item {
  padding: 2px;
  margin: 2px;
  font-size: 12px;
  min-width: 5px;
  background-color: rgba(255, 255, 255, 0.5);
}

.table-item:hover {
  background-color: transparent;
}

.table-container {
  background-color: rgba(242, 242, 242, 0.5);
  border: 1px solid #ccc;
  padding: 10px;
  height: 70vh;
}

.table-info {
  position: absolute;
  right: calc(100% + 10px);
  top: 5;
  font-size: 12px;
  color: #666;
  writing-mode: vertical-rl;
}

.data-display {
  height: calc(100vh - 50px); /* 减去顶部导航栏的高度 */
  overflow: hidden; /* 防止此容器外部滚动 */
  background-image: url('assets/imgs/DAL.webp');
  background-size: cover;
  background-position: center;
}
.top-bar {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  width: 50px; /* Adjust size as needed */
  height: 50px; /* Adjust size as needed */
  margin-right: 20px;
}

.search-input {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.main-container {
  display: flex;
  height: 100%; /* 使用父容器的剩余高度 */
  overflow: hidden; /* 允许在这个容器内部滚动 */
}

.total-data-section, .charts-section {
  padding: 20px;
  overflow: hidden;
}

.total-data-section {
  width: 30%;
  height: 100%; /* 充满父容器高度 */
}

.charts-section {
  width: 70%;
  height: 100%; /* 充满父容器高度 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart {
  flex: 1;
  margin-top: 10px;
  
}

.chart:first-child {
  margin-top: 0;
}

/* Styles for visual consistency and padding */
.total-data-content, .radar, .bar {
  padding: 20px;
  border-radius: 2px; /* Rounded corners */
  margin: 0px;
  background-color: #110a2e; /* Light grey background for content areas */
}

.data-display {
  width: 100%;
  height: 100%; /* Full viewport height */
  background-size: cover;
  background-position: center;
}


.main-container {
  display: flex;
  height: calc(100vh); /* Reduce height by the search bar height */
}

.total-data-section, .charts-section {
  padding: 10px; /* Padding inside sections */
  overflow: auto; /* Enables scrolling if content overflows */
}

.total-data-section {
  width: 30%; /* Reduced width for the data section */
}

.charts-section {
  width: 70%; /* Increased width for charts */
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1; /* Flex-grow to fill the space */
  margin-top: 10px; /* Margin between charts */
}

.chart:first-child {
  margin-top: 0; /* No margin for the first chart */
}

.top-bar {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-results {
  position: absolute;
  top: 100%; /* 定位到输入框的底部 */
  left: 10px;
  right: 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-top: none; /* 与输入框融合更自然 */
  z-index: 1000;
}

.result-item {
  padding: 8px 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee; /* 每项之间的分割线 */
}

.dropdown {
  position: absolute;
  width: calc(100% - px); /* 减去左右padding的宽度 */
  background: white;
  border: 1px solid #ccc; /* 添加边框以匹配搜索框 */
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 100;
  margin-top: 2px; /* 确保下拉列表与输入框之间有一小段间隔 */
  border-radius: 4px; /* 圆角边框 */
}

.dropdown-item {
  padding: 8px 10px;
  list-style: none; /* 去掉默认的列表符号 */
  cursor: pointer;
  border-bottom: 1px solid #eee; /* 项与项之间的分割线 */
}

.dropdown-item:last-child {
  border-bottom: none; /* 最后一项不需要分割线 */
}

.dropdown-item:hover {
  background-color: #f9f9f9; /* 鼠标悬停时的背景颜色 */
}
</style>
