<template>
  <transition name="toast" appear>
    <div v-if="isVisible" class="toast-container">
      <div class="toast">
        <div class="toast-content">
          <div class="toast-icon">
            <span class="material-icons-outlined">check_circle</span>
          </div>
          <div class="toast-message">
            <h4 class="toast-title">{{ title }}</h4>
            <p class="toast-text">{{ message }}</p>
          </div>
          <button @click="close" class="toast-close">
            <span class="material-icons-outlined">close</span>
          </button>
        </div>
        <div class="toast-progress" :style="{ width: progressWidth + '%' }"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    title: {
      type: String,
      default: 'Erfolgreich'
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 10000 // 10 Sekunden
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  data() {
    return {
      isVisible: false,
      progressWidth: 100,
      timer: null,
      progressTimer: null
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.showToast()
        } else {
          this.hideToast()
        }
      }
    }
  },
  beforeUnmount() {
    this.clearTimers()
  },
  methods: {
    showToast() {
      this.isVisible = true
      this.progressWidth = 100

      // Auto-close Timer
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)

      // Progress Bar Animation
      this.progressTimer = setInterval(() => {
        this.progressWidth -= (100 / (this.duration / 100))
        if (this.progressWidth <= 0) {
          this.progressWidth = 0
          clearInterval(this.progressTimer)
        }
      }, 100)
    },
    hideToast() {
      this.isVisible = false
      this.clearTimers()
    },
    close() {
      this.hideToast()
      this.$emit('close')
    },
    clearTimers() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }
    }
  }
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 80px;
  /* Unterhalb des AppHeaders */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  pointer-events: none;
}

.toast {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  min-width: 400px;
  max-width: 500px;
  overflow: hidden;
  pointer-events: all;
  position: relative;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  gap: 12px;
}

.toast-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: #dcfce7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-icon .material-icons-outlined {
  font-size: 24px;
  color: #16a34a;
}

.toast-message {
  flex: 1;
  min-width: 0;
}

.toast-title {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.toast-text {
  margin: 0;
  font-size: 14px;
  color: #64748b;
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  border-radius: 6px;
  color: #64748b;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close:hover {
  background: #f1f5f9;
  color: #374151;
}

.toast-close .material-icons-outlined {
  font-size: 20px;
}

.toast-progress {
  height: 3px;
  background: linear-gradient(90deg, #16a34a 0%, #22c55e 100%);
  transition: width 0.1s linear;
  position: absolute;
  bottom: 0;
  left: 0;
}

/* Toast Animations */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px) scale(0.95);
}

/* Responsive Design */
@media (max-width: 480px) {
  .toast-container {
    left: 16px;
    right: 16px;
    transform: none;
  }

  .toast {
    min-width: auto;
    width: 100%;
  }

  .toast-content {
    padding: 12px 16px;
    gap: 10px;
  }

  .toast-icon {
    width: 32px;
    height: 32px;
  }

  .toast-icon .material-icons-outlined {
    font-size: 20px;
  }

  .toast-title {
    font-size: 14px;
  }

  .toast-text {
    font-size: 13px;
  }
}
</style>