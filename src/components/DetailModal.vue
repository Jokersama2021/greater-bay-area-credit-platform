<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <div class="modal-title-section">
              <div class="modal-icon" :style="{ backgroundColor: iconColor + '20', color: iconColor }">
                <i :class="icon"></i>
              </div>
              <div>
                <h2 class="modal-title">{{ title }}</h2>
                <p class="modal-subtitle" v-if="subtitle">{{ subtitle }}</p>
              </div>
            </div>
            <button class="modal-close" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-content">
            <slot></slot>
          </div>
          
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'DetailModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'fas fa-info-circle'
    },
    iconColor: {
      type: String,
      default: '#007AFF'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscape)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape)
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    handleEscape(e) {
      if (e.key === 'Escape' && this.visible) {
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-title-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 4px 0;
  line-height: 1.3;
}

.modal-subtitle {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.4;
}

.modal-close {
  width: 36px;
  height: 36px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.modal-content {
  padding: 24px;
  max-height: 60vh;
  overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-footer {
  padding: 20px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(20px);
}

.modal-enter-to .modal-container,
.modal-leave-from .modal-container {
  transform: scale(1) translateY(0);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 16px;
  }
  
  .modal-container {
    max-height: 90vh;
    border-radius: 16px;
  }
  
  .modal-header {
    padding: 20px;
  }
  
  .modal-title-section {
    gap: 12px;
  }
  
  .modal-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .modal-title {
    font-size: 1.1rem;
  }
  
  .modal-subtitle {
    font-size: 0.85rem;
  }
  
  .modal-content {
    padding: 20px;
    max-height: 70vh;
  }
  
  .modal-footer {
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 12px;
  }
  
  .modal-header {
    padding: 16px;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  
  .modal-content {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 12px 16px;
    flex-direction: column;
  }
}
</style>
