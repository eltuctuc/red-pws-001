<template>
  <div class="home">
    <div class="data-status">
      <div v-if="isDataLoaded" class="status-success">
        <h2>✅ Daten erfolgreich geladen</h2>
        <p><strong>{{ totalEmployees }}</strong> Mitarbeiter im System</p>
        <div class="data-summary">
          <div class="summary-item">
            <span class="label">Aktive Mitarbeiter:</span>
            <span class="value">{{ activeEmployees }}</span>
          </div>
          <div class="summary-item">
            <span class="label">Inaktive Mitarbeiter:</span>
            <span class="value">{{ inactiveEmployees }}</span>
          </div>
        </div>
        <p class="storage-info">Daten sind im localStorage verfügbar und können bearbeitet werden.</p>
      </div>
      <div v-else class="status-loading">
        <h2>⏳ Daten werden geladen...</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['getAllEmployees', 'getActiveEmployees', 'getInactiveEmployees', 'isDataLoaded']),
    totalEmployees() {
      return this.getAllEmployees.length
    },
    activeEmployees() {
      return this.getActiveEmployees.length
    },
    inactiveEmployees() {
      return this.getInactiveEmployees.length
    }
  }
}
</script>

<style scoped>
.home {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.data-status {
  text-align: center;
}

.status-success {
  background: #f0f9ff;
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 30px;
  color: #0c4a6e;
}

.status-loading {
  background: #fef3c7;
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 30px;
  color: #92400e;
}

.data-summary {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

.value {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
}

.storage-info {
  margin-top: 20px;
  font-size: 14px;
  color: #475569;
  font-style: italic;
}
</style>
