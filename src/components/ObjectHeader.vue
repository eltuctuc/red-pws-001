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
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #1e293b;
  padding: 16px 32px;
  position: relative;
  border-radius: 0 0 8px 8px;
}

.header-content {
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
  gap: 8px;
  margin: 0 0 4px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.person-icon {
  font-size: 22px;
  color: #64748b;
}

.employee-number {
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  color: #64748b;
}

.status-info {
  display: flex;
  align-items: center;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  display: inline-block;
  border: 1px solid transparent;
}

.status-badge.aktiv {
  background: #dcfce7;
  color: #166534;
  border-color: #bbf7d0;
}

.status-badge.inaktiv {
  background: #fee2e2;
  color: #991b1b;
  border-color: #fecaca;
}

@media (max-width: 768px) {
  .object-header {
    padding: 12px 16px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .full-name {
    font-size: 18px;
    gap: 6px;
  }

  .person-icon {
    font-size: 20px;
  }

  .employee-number {
    font-size: 12px;
  }

  .status-info {
    align-self: flex-end;
  }
}
</style>