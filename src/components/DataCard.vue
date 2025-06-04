<template>
  <div class="data-card">
    <h3 class="title">{{ title }}</h3>
    <div class="value-container">
      <span class="value">{{ value }}</span>
      <span class="unit">{{ unit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.data-card {
  background: var(--card-background);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
}

.data-card:hover {
  transform: translateY(-2px);
  background: var(--card-background-hover);
  border-color: var(--card-border-hover);
}

.title {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.value-container {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.value {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
}

.unit {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: white;
  letter-spacing: 0.5px;
}

.card-value {
  font-family: var(--font-digital);
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 5px;
  background: linear-gradient(120deg, #ffffff, #60cdff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  letter-spacing: 1px;
}

.card-subtitle {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.3px;
}
</style> 