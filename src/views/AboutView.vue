<template>
  <div class="about">
    <h1>Mitarbeiterdaten Verwaltung</h1>

    <div class="actions-section">
      <h2>Aktionen</h2>
      <div class="action-buttons">
        <button @click="resetData" class="btn btn-warning">
          🔄 Daten zurücksetzen
        </button>
        <button @click="clearLocalStorage" class="btn btn-danger">
          🗑️ LocalStorage löschen
        </button>
        <button @click="reloadData" class="btn btn-primary">
          ⬇️ Daten neu laden
        </button>
      </div>
    </div>

    <div class="employee-preview" v-if="isDataLoaded">
      <h2>Erste 5 Mitarbeiter (Vorschau)</h2>
      <div class="employee-list">
        <div v-for="employee in firstFiveEmployees" :key="employee.Personalnummer" class="employee-card">
          <div class="employee-info">
            <h3>{{ employee.Vorname }} {{ employee.Nachname }}</h3>
            <p><strong>Personalnummer:</strong> {{ employee.Personalnummer }}</p>
            <p><strong>Arbeitgeber:</strong> {{ employee.Arbeitgeber }}</p>
            <p><strong>Status:</strong>
              <span :class="['status', employee.Status.toLowerCase()]">
                {{ employee.Status }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="storage-info">
      <h2>Storage Information</h2>
      <p>Die Mitarbeiterdaten werden beim ersten App-Start aus der JSON-Datei geladen und im localStorage gespeichert.
      </p>
      <p>Alle Änderungen werden automatisch im localStorage persistiert, so dass sie beim nächsten App-Start wieder
        verfügbar sind.</p>
      <p><strong>Storage-Key:</strong> <code>akdb_employees_data</code></p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AboutView',
  computed: {
    ...mapGetters(['getAllEmployees', 'isDataLoaded']),
    firstFiveEmployees() {
      return this.getAllEmployees.slice(0, 5)
    }
  },
  methods: {
    ...mapActions(['resetToOriginalData', 'clearLocalStorage', 'loadEmployeesData']),
    async resetData() {
      if (confirm('Möchten Sie wirklich alle Daten auf die ursprünglichen Werte zurücksetzen?')) {
        await this.resetToOriginalData()
        alert('Daten wurden zurückgesetzt!')
      }
    },
    async clearLocalStorage() {
      if (confirm('Möchten Sie wirklich den localStorage löschen? Beim nächsten Reload werden die ursprünglichen Daten geladen.')) {
        await this.clearLocalStorage()
        alert('LocalStorage wurde geleert!')
      }
    },
    async reloadData() {
      await this.loadEmployeesData()
      alert('Daten wurden neu geladen!')
    }
  }
}
</script>

<style scoped>
.about {
  padding: 40px;
  max-width: 1000px;
  margin: 0 auto;
}

.actions-section {
  margin: 30px 0;
  padding: 20px;
  background: #f8fafc;
  border-radius: 8px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-warning {
  background: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background: #d97706;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.employee-preview {
  margin: 30px 0;
}

.employee-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.employee-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.employee-info h3 {
  margin: 0 0 10px 0;
  color: #1e293b;
}

.employee-info p {
  margin: 5px 0;
  color: #64748b;
}

.status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.status.aktiv {
  background: #dcfce7;
  color: #166534;
}

.status.inaktiv {
  background: #fee2e2;
  color: #991b1b;
}

.storage-info {
  margin: 30px 0;
  padding: 20px;
  background: #f1f5f9;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.storage-info code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
}
</style>
