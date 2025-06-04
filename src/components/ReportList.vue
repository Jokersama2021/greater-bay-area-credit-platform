<template>
  <div class="report-grid">
    <router-link 
      v-for="report in reports" 
      :key="report.id" 
      class="report-card"
      :to="`/report/${report.id}`"
    >
      <div class="report-icon">
        <i :class="report.icon"></i>
      </div>
      <div class="report-content">
        <h4>{{ report.title }}</h4>
        <p>{{ report.description }}</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ReportList',
  setup() {
    const reports = [
      {
        id: 1,
        title: '企业资信报告',
        description: '全面的企业信用评估报告',
        icon: 'fas fa-building'
      },
      {
        id: 2,
        title: '资产评估报告',
        description: '企业资产详细评估',
        icon: 'fas fa-chart-line'
      },
      {
        id: 3,
        title: '企业评分报告',
        description: '多维度信用评分分析',
        icon: 'fas fa-star'
      },
      {
        id: 4,
        title: '风控预警报告',
        description: '实时风险监控预警',
        icon: 'fas fa-exclamation-triangle'
      }
    ]

    return {
      reports
    }
  }
}
</script>

<style scoped>
.report-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.report-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  height: 100%;
  text-decoration: none;
}

.report-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.report-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(124, 58, 237, 0.2));
  border-radius: 10px;
  margin-bottom: 10px;
}

.report-icon i {
  background: linear-gradient(to right, #3b82f6, #7c3aed);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 1.4rem;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
}

.report-content {
  width: 100%;
}

.report-content h4 {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 4px;
  font-weight: 600;
  font-family: var(--font-heading);
  letter-spacing: 0.5px;
  background: linear-gradient(120deg, #ffffff, #60cdff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.report-content p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.75rem;
  line-height: 1.3;
  font-family: var(--font-body);
  letter-spacing: 0.3px;
}
</style> 