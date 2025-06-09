<template>
  <div class="bar-chart">
    <h2 class="chart-title">资产情况（简版）</h2>
    <div class="chart-container">
      <div ref="chart" class="chart"></div>
      <div class="legend-section">
        <div v-for="(item, index) in legendData" :key="index" class="legend-item">
          <span class="legend-color" :style="{ background: getGradientBackground(item.colors) }"></span>
          <span class="legend-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: Array
});

const chart = ref(null);
let chartInstance = null;

// 定义所有要展示的数据项
const dataItems = [
  // 流动资产
  { key: 'cash_and_cash_equivalents', name: '货币资金', colors: ['#36A2EB', '#4BC0C0'] },
  { key: 'notes_receivable', name: '应收票据', colors: ['#FF9F43', '#FFB480'] },
  { key: 'accounts_receivable', name: '应收账款', colors: ['#FF6B6B', '#FF8E8E'] },
  { key: 'prepaid_expenses', name: '预付账款', colors: ['#4ECB73', '#7EE79D'] },
  { key: 'inventories', name: '存货', colors: ['#9B66FF', '#B794F6'] },
  { key: 'other_current_assets', name: '其他流动资产', colors: ['#FF66B3', '#FF99CC'] },
  
  // 非流动资产
  { key: 'credit_investments', name: '债权投资', colors: ['#FFD93D', '#FFE69C'] },
  { key: 'fixed_assets', name: '固定资产', colors: ['#4FACFE', '#00F2FE'] },
  { key: 'development_expenditures', name: '开发支出', colors: ['#6E45E1', '#88D3CE'] },
  { key: 'deferred_tax_assets', name: '递延所得税资产', colors: ['#FF9A9E', '#FAD0C4'] },
  
  // 负债
  { key: 'employee_benefits_payable', name: '应付职工薪酬', colors: ['#43E97B', '#38F9D7'] },
  { key: 'taxes_payable', name: '应交税费', colors: ['#FA709A', '#FEE140'] },
  { key: 'noncurrent_liabilities_within_one_year', name: '一年内到期非流动负债', colors: ['#6236FF', '#8F9FFE'] },
  
  // 收入和利润
  { key: 'revenue_2022', name: '营业收入', colors: ['#FF6B6B', '#FFA07A'] },
  { key: 'operating_costs', name: '营业成本', colors: ['#4169E1', '#87CEEB'] },
  { key: 'net_profit_attributable', name: '净利润', colors: ['#32CD32', '#98FB98'] }
];

const legendData = ref(dataItems);

const getGradientBackground = (colors) => {
  return `linear-gradient(to right, ${colors[0]}, ${colors[1]})`;
};

const initChart = () => {
  if (!props.data || props.data.length === 0) return;
  
  const apiData = props.data[0];
  const chartData = dataItems.map(item => ({
    value: apiData[item.key],
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: item.colors[0] },
        { offset: 1, color: item.colors[1] }
      ])
    }
  }));

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        const data = params[0];
        return `<div style="font-weight:500">${dataItems[data.dataIndex].name}</div>
                <div style="margin-top:5px">
                金额：${(data.value / 100000000).toFixed(2)}亿元
                </div>`;
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      borderColor: 'rgba(255,255,255,0.2)',
      textStyle: {
        fontSize: 14,
        color: '#fff'
      },
      padding: [15, 20]
    },
    grid: {
      top: '5%',
      left: '3%',
      right: '3%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dataItems.map(item => item.name),
      axisLabel: {
        interval: 0,
        rotate: 45,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 12,
        formatter: (value) => {
          return (value / 100000000).toFixed(1) + '亿';
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.1)',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    series: [{
      type: 'bar',
      barWidth: '60%',
      data: chartData,
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.3)'
        }
      },
      animation: true,
      animationDuration: 1500,
      animationEasing: 'cubicInOut'
    }]
  };

  if (!chartInstance) {
    chartInstance = echarts.init(chart.value);
  }
  chartInstance.setOption(option);
};

onMounted(() => {
  nextTick(() => {
    initChart();
    
    window.addEventListener('resize', () => {
      chartInstance?.resize();
    });
  });
});
</script>

<style scoped>
.bar-chart {
  height: 100%;
  background-color: #001F3F;
  padding: 20px;
  border-radius: 12px;
}

.chart-title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-container {
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1;
  min-height: 280px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  padding: 12px;
}

.legend-section {
  margin-top: -30px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
}

.legend-color {
  width: 20px;
  height: 8px;
  border-radius: 4px;
}

.legend-name {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  white-space: nowrap;
}
</style>


