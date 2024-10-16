<template>
  <div class="charts-container">
    <h2 class="charts-title">会计数据（简版）</h2>
    <div class="chart-wrapper">
      <!-- 饼图部分 -->
      <div class="pie-chart">
        <PieChart :data="pieChartData" />
      </div>
      <!-- 圆环图部分 -->
      <div class="ring-chart">
        <div ref="chart" class="chart"></div>
      </div>
      <!-- 图例 -->
      <div class="legend">
        <ul>
          <li v-for="item in pieDatas" :key="item.name" class="legend-item">
            <span class="legend-color" :style="{ backgroundColor: item.color }"></span>
            <span class="legend-name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from 'vue';
import * as echarts from 'echarts';
import PieChart from './PieChart.vue';

const props = defineProps({
  data: Array
});

const chart = ref(null);
const pieChartData = computed(() => {
  const totals = {
    total_assets: 0,
    revenue_2022: 0,
    operating_costs: 0,
    net_profit_attributable: 0
  };
  
  props.data.forEach(item => {
    totals.total_assets += Number(item.total_assets);
    totals.revenue_2022 += Number(item.revenue_2022);
    totals.operating_costs += Number(item.operating_costs);
    totals.net_profit_attributable += Number(item.net_profit_attributable);
  });
  
  return totals;
});

onMounted(() => {
  const myChart = echarts.init(chart.value);
  const apiData = props.data.length > 0 ? props.data[0] : {
    earnings_per_share: "0",
    roa: "0",
    average_roe: "0",
    gross_margin: "0",
    net_margin: "0"
  };

  const pieDatas = [
    { value: parseFloat(apiData.earnings_per_share), name: "每股收益", color: "rgba(78, 167, 249, 1)" },
    { value: parseFloat(apiData.roa), name: "总资产收益率", color: "rgba(0, 255, 255, 1)" },
    { value: parseFloat(apiData.average_roe), name: "平均股本回报率", color: "rgba(255, 201, 95, 1)" },
    { value: parseFloat(apiData.gross_margin), name: "毛利率", color: "rgba(249, 78, 167, 1)" },
    { value: parseFloat(apiData.net_margin), name: "净利率", color: "rgba(167, 249, 78, 1)" }
  ];
  const maxRadius = 100;
  const barWidth = 5;
  const barGap = 10;
  const barColor = pieDatas.map(item => item.color);

  let series = [];
  pieDatas.forEach((item, i) => {
    series.push({
      type: 'pie',
      clockwise: false,
      hoverAnimation: false,
      radius: [
        `${maxRadius - i * (barGap + barWidth)}%`, 
        `${maxRadius - (i + 1) * barWidth - i * barGap}%`
      ],
      center: ["25%", "50%"], // 图左挪到一半
      label: { show: false },
      itemStyle: {
        borderWidth: 5,
      },
      data: [{
        value: item.value,
        name: item.name,
        itemStyle: { color: item.color }
      }, {
        value: 100 - item.value,
        name: '',
        itemStyle: { color: "transparent" }
      }]
    });
  });

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d})'
    },
    legend: {
      show: true,
      orient: 'horizontal',
      left: 'middle',
      top: 'middle', // 图例位置调整到上方
      formatter: name => {
        const item = pieDatas.find(item => item.name === name);
        return `${name} (${item.value})`; // 去掉百分号
      },
      textStyle: {
        fontSize: 14,
        color: '#fff'
      }
    },
    series: series
  };

  myChart.setOption(option);
});
</script>

<style scoped>
.charts-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #001F3F;
  padding: 10px;
  box-sizing: border-box;
}

.charts-title {
  padding-top: 20px; /* 顶部内边距 */
 
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #002040;
  padding: 0px 0;
}

.chart-wrapper {
  display: flex;
  flex: 1;
}

.pie-chart, .ring-chart {
  flex: 1;
  padding: 10px;
}

.chart {
  width: 100%;
  height: 100%;
}

.legend {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 确保所有子项右对齐 */
  width: 150px; /* 设置一个足够的宽度以适应最宽的图例项 */
  background: rgba(255, 255, 255, 0.1); /* 添加半透明背景以便观察图例容器的实际大小 */
}

.legend-item {
  display: flex;
  width: 100%; /* 使用100%宽度确保填充父容器 */
  justify-content: space-between; /* 在图例颜色和文本之间提供空间 */
  margin-bottom: 5px;
}

.legend-color {
  width: 20px;
  height: 20px; /* 增加高度使其更明显 */
}

.legend-name {
  color: #fff;
  flex-grow: 1; /* 允许文本扩展并填充剩余空间 */
  text-align: right; /* 文字右对齐 */
}
</style>
