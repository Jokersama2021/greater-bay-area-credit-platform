<template>
  <div class="icon-wrapper" :class="wrapperClass">
    <component :is="iconComponent" :class="iconClass" />
  </div>
</template>

<script>
import { computed } from 'vue'

// 高级SVG图标组件
const ShieldCheckIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const AnalyticsIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M22 12A10 10 0 0 0 12 2V12L22 12Z" fill="currentColor" opacity="0.2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  `
}

const UserProfileIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
      <path d="M14 7H16M14 5V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  `
}

const LocationIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="10" r="1" fill="currentColor"/>
    </svg>
  `
}

const DocumentIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const GlobalIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3"/>
    </svg>
  `
}

const CubeIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="7.5,4.21 12,6.81 16.5,4.21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="7.5,19.79 7.5,14.6 3,12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="21,12 16.5,14.6 16.5,19.79" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="12,22.08 12,17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const LayersIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `
}

const TrendingUpIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="17 6 23 6 23 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `
}

const BuildingIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V7L13 2L21 7V21M9 9V13M15 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="9" y="16" width="2" height="5" fill="currentColor" opacity="0.3"/>
      <rect x="13" y="16" width="2" height="5" fill="currentColor" opacity="0.3"/>
    </svg>
  `
}

const CreditCardIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="5" width="22" height="14" rx="7" stroke="currentColor" stroke-width="2"/>
      <path d="M8 11V13M12 9V15M16 11V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="19" cy="8" r="1" fill="currentColor"/>
    </svg>
  `
}

export default {
  name: 'PremiumIcons',
  props: {
    name: {
      type: String,
      required: true,
      validator: value => [
        'shield-check', 'analytics', 'user-profile', 'location', 
        'document', 'global', 'cube', 'layers', 'trending-up', 
        'building', 'credit-card'
      ].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg', 'xl'].includes(value)
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'error'].includes(value)
    }
  },
  setup(props) {
    const iconComponents = {
      'shield-check': ShieldCheckIcon,
      'analytics': AnalyticsIcon,
      'user-profile': UserProfileIcon,
      'location': LocationIcon,
      'document': DocumentIcon,
      'global': GlobalIcon,
      'cube': CubeIcon,
      'layers': LayersIcon,
      'trending-up': TrendingUpIcon,
      'building': BuildingIcon,
      'credit-card': CreditCardIcon
    }

    const iconComponent = computed(() => iconComponents[props.name])
    
    const wrapperClass = computed(() => [
      'premium-icon-wrapper',
      `size-${props.size}`,
      `variant-${props.variant}`
    ])

    const iconClass = computed(() => [
      'premium-icon',
      `icon-${props.size}`
    ])

    return {
      iconComponent,
      wrapperClass,
      iconClass
    }
  }
}
</script>

<style scoped>
.premium-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  transition: all 0.3s var(--ease-out-expo);
}

.premium-icon {
  transition: all 0.3s var(--ease-out-expo);
}

/* 尺寸变体 */
.size-sm {
  width: 32px;
  height: 32px;
}

.size-md {
  width: 40px;
  height: 40px;
}

.size-lg {
  width: 48px;
  height: 48px;
}

.size-xl {
  width: 56px;
  height: 56px;
}

.icon-sm {
  width: 16px;
  height: 16px;
}

.icon-md {
  width: 20px;
  height: 20px;
}

.icon-lg {
  width: 24px;
  height: 24px;
}

.icon-xl {
  width: 28px;
  height: 28px;
}

/* 颜色变体 */
.variant-default {
  background: var(--background-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-light);
}

.variant-primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-md);
}

.variant-success {
  background: var(--gradient-success);
  color: white;
  box-shadow: var(--shadow-md);
}

.variant-warning {
  background: linear-gradient(135deg, var(--warning-color), var(--accent-color));
  color: white;
  box-shadow: var(--shadow-md);
}

.variant-error {
  background: linear-gradient(135deg, var(--error-color), var(--warning-color));
  color: white;
  box-shadow: var(--shadow-md);
}

/* 悬停效果 */
.premium-icon-wrapper:hover {
  transform: scale(1.1) rotate(5deg);
}

.variant-primary:hover {
  box-shadow: var(--shadow-lg), 0 0 20px rgba(0, 122, 255, 0.4);
}

.variant-success:hover {
  box-shadow: var(--shadow-lg), 0 0 20px rgba(52, 199, 89, 0.4);
}

.variant-warning:hover {
  box-shadow: var(--shadow-lg), 0 0 20px rgba(255, 149, 0, 0.4);
}

.variant-error:hover {
  box-shadow: var(--shadow-lg), 0 0 20px rgba(255, 59, 48, 0.4);
}
</style>
