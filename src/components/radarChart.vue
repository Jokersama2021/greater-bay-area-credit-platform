<template>
  <div class="charts-container">
    <h2 class="charts-title">会计数据（简版）</h2>
    <div class="chart-wrapper">
      <div class="charts-section">
        <!-- 左侧：资产构成（饼图） -->
        <div class="pie-section">
          <div ref="pieChart" class="chart"></div>
        </div>
        <!-- 右侧：财务指标（雷达图） -->
        <div class="radar-section">
          <div ref="radarChart" class="chart"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: Array
});

const pieChart = ref(null);
const radarChart = ref(null);
let pieInstance = null;
let radarInstance = null;

// 格式化金额（转换为亿元）
const formatMoney = (value) => {
  const amount = value / 100000000;
  return amount.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + '亿元';
};

// 格式化一般数值
const formatValue = (value) => {
  return Number(value).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// 初始化饼图
const initPieChart = (apiData) => {
  const pieDatas = [
    { 
      value: apiData.total_assets, 
      name: "总资产", 
      color: "#36A2EB",
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: '#36A2EB' },
        { offset: 1, color: '#4BC0C0' }
      ])}
    },
    { 
      value: apiData.revenue_2022, 
      name: "营业收入", 
      color: "#FF9F43",
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: '#FF9F43' },
        { offset: 1, color: '#FFB480' }
      ])}
    },
    { 
      value: apiData.operating_costs, 
      name: "营业成本", 
      color: "#FF6B6B",
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: '#FF6B6B' },
        { offset: 1, color: '#FF8E8E' }
      ])}
    },
    { 
      value: apiData.net_profit_attributable, 
      name: "净利润", 
      color: "#4ECB73",
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: '#4ECB73' },
        { offset: 1, color: '#7EE79D' }
      ])}
    }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const value = formatMoney(params.value);
        const percent = params.percent.toFixed(1);
        return `<div style="font-weight:500">${params.name}</div>
                <div style="margin-top:5px">
                  金额：${value}<br/>
                  占比：${percent}%
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
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 15,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: (params) => {
          return `${params.name}\n${params.percent.toFixed(1)}%`;
        },
        color: '#fff',
        fontSize: 14,
        fontWeight: 500,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: [4, 8],
        borderRadius: 4
      },
      labelLine: {
        show: true,
        length: 20,
        length2: 15,
        smooth: true,
        lineStyle: {
          width: 2,
          color: 'rgba(255, 255, 255, 0.3)'
        }
      },
      emphasis: {
        scale: true,
        scaleSize: 10,
        itemStyle: {
          shadowBlur: 20,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      },
      data: pieDatas.map(item => ({
        value: item.value,
        name: item.name,
        itemStyle: item.itemStyle
      }))
    }]
  };

  if (!pieInstance) {
    pieInstance = echarts.init(pieChart.value);
  }
  pieInstance.setOption(option);
};

// 初始化雷达图
const initRadarChart = (apiData) => {
  const radarDatas = [
    { value: apiData.earnings_per_share, name: "每股收益", color: "#4FC6FF", unit: "元" },
    { value: apiData.roa, name: "资产收益率", color: "#FFB74D", unit: "%" },
    { value: apiData.average_roe, name: "股本回报率", color: "#FF7043", unit: "%" },
    { value: apiData.gross_margin, name: "毛利率", color: "#66BB6A", unit: "%" },
    { value: apiData.net_margin, name: "净利率", color: "#EC407A", unit: "%" }
  ];

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        if (Array.isArray(params.value)) {
          return params.marker + '<b>财务指标</b><br/>' +
            radarDatas.map((item, index) => 
              `${item.name}：${formatValue(params.value[index])}${item.unit}`
            ).join('<br/>');
        }
      },
      backgroundColor: 'rgba(0,0,0,0.8)',
      padding: [15, 20],
      textStyle: {
        fontSize: 14
      }
    },
    radar: {
      shape: 'polygon',
      splitNumber: 5,
      radius: '65%',
      center: ['50%', '50%'],
      name: {
        textStyle: { color: '#fff', fontSize: 12 }
      },
      indicator: radarDatas.map(item => ({
        name: item.name,
        max: Math.max(100, item.value * 1.2)
      })),
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.4)' } },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)', type: 'dashed' } },
      splitArea: { 
        areaStyle: { color: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.01)'] } 
      }
    },
    series: [{
      type: 'radar',
      symbol: 'circle',
      symbolSize: 8,
      lineStyle: { width: 3, color: '#4FC6FF' },
      itemStyle: {
        color: '#4FC6FF',
        borderColor: '#fff',
        borderWidth: 2,
        shadowBlur: 8,
        shadowColor: 'rgba(0,0,0,0.3)'
      },
      areaStyle: {
        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
          { offset: 0, color: 'rgba(79,198,255,0.4)' },
          { offset: 1, color: 'rgba(79,198,255,0.1)' }
        ])
      },
      data: [{
        value: radarDatas.map(item => item.value),
        name: '财务指标'
      }]
    }]
  };

  if (!radarInstance) {
    radarInstance = echarts.init(radarChart.value);
  }
  radarInstance.setOption(option);
};

onMounted(() => {
  if (props.data && props.data.length > 0) {
    const apiData = props.data[0];
    initPieChart(apiData);
    initRadarChart(apiData);
    
    // 监听窗口大小变化
    window.addEventListener('resize', () => {
      pieInstance?.resize();
      radarInstance?.resize();
    });
  }
});
</script>

<style scoped>
.charts-container {
  height: 100%;
  background-color: #001F3F;
  padding: 20px;
  border-radius: 12px;
}

.charts-title {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.chart-wrapper {
  display: flex;
  height: calc(100% - 60px);
  width: 100%;
}

.charts-section {
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.pie-section, .radar-section {
  flex: 1;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.chart {
  width: 100%;
  height: 100%;
}

/* 若需要添加图例，可在此处增加对应样式 */
</style>
