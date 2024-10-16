<template>
  <div class="bar-chart">
    <h2 class="chart-title">资产情况（简版）</h2>
    <div class="chart-container">
      <div class="chart-section">
        <div ref="chart1" class="chart"></div>
        <div ref="chart2" class="chart"></div>
        <div ref="chart3" class="chart"></div>
      </div>
      <div class="legend-section">
        <ul v-for="(set, index) in labels" :key="index">
          <li v-for="label in set" :key="label" class="legend-item">
            <span class="legend-color" :style="{ backgroundColor: getLegendColor(index, label) }"></span>
            <span class="legend-name">{{ label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: Array
});

const loading = ref(true);
const chart1 = ref(null);
const chart2 = ref(null);
const chart3 = ref(null);
let myChart1 = null;
let myChart2 = null;
let myChart3 = null;

const dataSets = [
  ["notes_receivable", "accounts_receivable", "prepaid_expenses", "other_current_assets", "credit_investments", "development_expenditures"],
  ["cash_and_cash_equivalents", "inventories", "fixed_assets"],
  ["deferred_tax_assets", "employee_benefits_payable", "taxes_payable", "noncurrent_liabilities_within_one_year"]
];

const labels = [
  ["应收票据", "应收账款", "预付账款", "其他流动资产", "债权投资", "开发支出"],
  ["货币资金", "存货", "固定资产"],
  ["递延所得税资产", "应付职工薪酬", "应交税费", "一年内到期的非流动资产"]
];

const colors = [
  "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6",
  "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
  "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A",
  "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
  "#674EA7", "#B6A1F1", "#D5A6BD", "#EAD1DC", "#C27BA0",
  "#F4CCCC", "#E06666", "#C9DAF8", "#6FA8DC", "#3D85C6"
];


const getLegendColor = (setIndex, label) => {
  const labelIndex = labels[setIndex].indexOf(label);
  return colors[labelIndex + setIndex * labels[0].length]; // 确保不同组的标签使用不同的颜色块
};
const initCharts = () => {
  myChart1 = echarts.init(chart1.value);
  myChart2 = echarts.init(chart2.value);
  myChart3 = echarts.init(chart3.value);
};

const generateCharts = () => {
  if (!props.data || props.data.length === 0) {
    loading.value = true;
    return;
  }

  [myChart1, myChart2, myChart3].forEach((chart, index) => {
    const chartData = props.data.map(item => {
      return dataSets[index].map((key, idx) => ({
        value: parseFloat(item[key]) || 0,
        itemStyle: {
          color: getLegendColor(index, labels[index][idx]),
          borderRadius: 20  // 设置圆角柱
        }
      }));
    });

    const option = {
      tooltip: {
        trigger: 'item',
        axisPointer: { type: 'shadow' },
        formatter: '{b}: {c}',
        position: function (point, params, dom, rect, size) {
          // 计算提示框的位置，固定在鼠标右侧
          return [point[0] + 10, point[1] - 20];  // 鼠标右侧10px, 向上20px
        }
      },
      xAxis: {
        type: 'category',
        data: labels[index],
        show: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: chartData[0],
        type: 'bar',
        barWidth: 15,  // 减小柱子的宽度
        itemStyle: {
          borderRadius: 20  // 设置圆角柱
        }
      }]
    };

    chart.setOption(option);
  });

  loading.value = false;
};


onMounted(() => {
  nextTick(() => {
    initCharts();
    generateCharts();
  });
});

watch(() => props.data, () => {
  generateCharts();
}, { deep: true });
</script>
<style scoped>
.bar-chart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh; /* 可根据需要调整高度 */
  background-color: #002040;
}

.chart-title {
  height: 10%; /* 占总高度的10% */
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #002040;
  padding: 10px 0;
}

.chart-container {
  display: flex;
  width: 100%;
  height: 90%; /* 占剩余的90%高度 */
}

.chart-section {
  display: flex;
  width: 70%; /* 占容器宽度的70% */
}

.chart {
  flex: 1; /* 三个图表平等分配空间 */
  height: 100%;
}

.legend-section {
  width: 30%; /* 占容器宽度的30% */
  display: flex;
  flex-direction: column;
  padding-left: 15px; /* 增大内边距以防止内容紧靠边缘 */
  padding-top: 20px; /* 顶部内边距 */
  padding-bottom: 20px; /* 底部内边距 */
  align-items: flex-start; /* 保证图例项从左侧开始排列 */
  overflow: auto; /* 允许滚动，以防图例项过多 */
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 增大图例项之间的间距 */
  font-size: 16px; /* 增大字体大小 */
}

.legend-color {
  width: 20px; /* 增大图例颜色块的宽度 */
  height: 20px; /* 增大图例颜色块的高度 */
  margin-right: 10px; /* 增大图例颜色块和文本之间的间距 */
  border-radius: 50%; /* 可选：使颜色块呈圆形 */
}

.legend-name {
  color: #fff;
  margin-right: 5px; /* 适当增加右侧边距 */
}
</style>


