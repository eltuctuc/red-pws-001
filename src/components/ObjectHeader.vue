<template>
  <div class="object-header">
    <div class="header-content">
      <div class="primary-info">
        <h1 class="full-name">
          <span class="material-icons-outlined person-icon">person</span>
          {{ fullName }}
        </h1>
        <p class="employee-number">Personalnummer: {{ employeeNumber }}</p>
      </div>
      <div class="status-info">
        <span :class="['status-badge', status.toLowerCase()]">
          {{ status }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectHeader',
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    employeeNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
}
</script>

<style scoped>
.object-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px 32px;
  position: relative;
  overflow: hidden;
}

.object-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.header-content {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.primary-info {
  flex: 1;
}

.full-name {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 600;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.person-icon {
  font-size: 36px;
  opacity: 0.9;
}

.employee-number {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.status-info {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 8px 16px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.status-badge.aktiv {
  background: rgba(34, 197, 94, 0.2);
  color: #dcfce7;
  border-color: rgba(34, 197, 94, 0.5);
}

.status-badge.inaktiv {
  background: rgba(239, 68, 68, 0.2);
  color: #fecaca;
  border-color: rgba(239, 68, 68, 0.5);
}

@media (max-width: 768px) {
  .object-header {
    padding: 20px 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .full-name {
    font-size: 24px;
    gap: 8px;
  }

  .person-icon {
    font-size: 28px;
  }

  .employee-number {
    font-size: 14px;
  }

  .status-info {
    align-self: flex-end;
  }
}
</style>