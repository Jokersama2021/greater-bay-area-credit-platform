<template>
  <div class="pie-chart-container">
    <canvas ref="pieChartCanvas"></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
  data: Object
});

const pieChartCanvas = ref(null);
let pieChartInstance = null;

const createPieChart = () => {
  const ctx = pieChartCanvas.value.getContext('2d');
  if (pieChartInstance) {
    pieChartInstance.destroy();
  }
  pieChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['總資產', '营業收入', '营業成本', '净利润'],
      datasets: [{
        data: [
          props.data.total_assets,
          props.data.revenue_2022,
          props.data.operating_costs,
          props.data.net_profit_attributable
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 40,
            padding: 20
          },
          align: 'center'
        }
      }
    }
  });
};

onMounted(() => {
  createPieChart();
});

watch(() => props.data, () => {
  createPieChart();
}, { deep: true });
</script>
<style scoped>
.pie-chart-container {
  position: relative;
  height: 160px; /* Increase the height */
  width: 400px; /* Increase the width to allow 70% space for the chart and 30% for the legend */
}
</style>
