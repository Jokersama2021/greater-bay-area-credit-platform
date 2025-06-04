<template>
  <div class="chart-container glass-container">
    <h3 class="chart-title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<style scoped>
.chart-container {
  padding: 20px;
  margin-bottom: 20px;
  height: 100%;
}

.chart-title {
  font-size: 1.2rem;
  color: var(--text-light);
  margin-bottom: 1rem;
  font-weight: 500;
}
</style> 