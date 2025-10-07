<template>
  <div class="employees">
    <div class="page-header">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb">
        <router-link to="/" class="breadcrumb-item">
          <span class="material-icons-outlined breadcrumb-icon">home</span>
          Startseite
        </router-link>
        <span class="breadcrumb-separator">
          <span class="material-icons-outlined">chevron_right</span>
        </span>
        <span class="breadcrumb-current">Personenübersicht</span>
      </nav>

      <!-- Haupt-Überschrift -->
      <div class="page-title">
        <h1>
          <span class="material-icons-outlined title-icon">people</span>
          Mitarbeiter-Verwaltung
        </h1>
        <p class="subtitle">Zentrale Übersicht aller Mitarbeiter im System</p>
      </div>
    </div>

    <div v-if="!isDataLoaded" class="loading">
      <p>⏳ Daten werden geladen...</p>
    </div>

    <div v-else class="employees-content">
      <!-- Filter und Statistiken -->
      <div class="controls">
        <div class="stats">
          <div class="stat-item">
            <span class="stat-number">{{ totalEmployees }}</span>
            <span class="stat-label">Gesamt</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ activeEmployees }}</span>
            <span class="stat-label">Aktiv</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">{{ inactiveEmployees }}</span>
            <span class="stat-label">Inaktiv</span>
          </div>
        </div>

        <div class="filters">
          <select v-model="statusFilter" class="filter-select">
            <option value="">Alle Status</option>
            <option value="Aktiv">Nur Aktive</option>
            <option value="Inaktiv">Nur Inaktive</option>
          </select>

          <input v-model="searchTerm" type="text" placeholder="Nach Name suchen..." class="search-input" />
        </div>
      </div>

      <!-- Mitarbeitertabelle -->
      <div class="table-wrapper">
        <div class="table-scroll-container">
          <table class="employees-table">
            <thead class="table-header">
              <tr>
                <th class="col-personalnummer sticky-col">#</th>
                <th class="col-vorname">Vorname</th>
                <th class="col-nachname">Nachname</th>
                <th class="col-status">Status</th>
                <th class="col-arbeitgeber">Arbeitgeber</th>
                <th class="col-abrechnungskreis">Abrechnungskreis</th>
                <th class="col-wohnort">Wohnort</th>
                <th class="col-eintritt">Eintritt</th>
                <th class="col-austritt">Austritt</th>
                <th class="col-geburtsdatum">Geburtsdatum</th>
                <th class="col-titel">Titel</th>
                <th class="col-geschlecht">Geschlecht</th>
                <th class="col-familienstand">Familienstand</th>
                <th class="col-staatsangehoerigkeit">Staatsangehörigkeit</th>
                <th class="col-fehlzeit">Aktuelle Fehlzeit</th>
              </tr>
            </thead>
            <tbody class="table-body">
              <tr v-for="employee in filteredEmployees" :key="employee.Personalnummer" class="table-row clickable-row"
                @click="goToEmployeeDetail(employee.Personalnummer)">
                <td class="cell col-personalnummer sticky-col">{{ employee.Personalnummer }}</td>
                <td class="cell col-vorname">{{ employee.Vorname }}</td>
                <td class="cell col-nachname">{{ employee.Nachname }}</td>
                <td class="cell col-status">
                  <span :class="['status-badge', employee.Status.toLowerCase()]">
                    {{ employee.Status }}
                  </span>
                </td>
                <td class="cell col-arbeitgeber">{{ employee.Arbeitgeber }}</td>
                <td class="cell col-abrechnungskreis">{{ employee.Abrechnungskreis }}</td>
                <td class="cell col-wohnort">{{ employee.Wohnort }}</td>
                <td class="cell col-eintritt">{{ employee.Eintritt }}</td>
                <td class="cell col-austritt">{{ employee.Austritt || '-' }}</td>
                <td class="cell col-geburtsdatum">{{ employee.Geburtsdatum }}</td>
                <td class="cell col-titel">{{ employee.Titel || '-' }}</td>
                <td class="cell col-geschlecht">{{ employee.Geschlecht }}</td>
                <td class="cell col-familienstand">{{ employee.Familienstand }}</td>
                <td class="cell col-staatsangehoerigkeit">{{ employee.Staatsangehörigkeit }}</td>
                <td class="cell col-fehlzeit">
                  <span v-if="employee.AktuelleFehlzeit" class="fehlzeit">{{ employee.AktuelleFehlzeit }}</span>
                  <span v-else>-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Keine Ergebnisse -->
      <div v-if="filteredEmployees.length === 0" class="no-results">
        <p>Keine Mitarbeiter gefunden.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'EmployeesView',
  data() {
    return {
      statusFilter: '',
      searchTerm: ''
    }
  },
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
    },
    filteredEmployees() {
      let employees = this.getAllEmployees

      // Status Filter
      if (this.statusFilter) {
        employees = employees.filter(emp => emp.Status === this.statusFilter)
      }

      // Such Filter
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        employees = employees.filter(emp =>
          emp.Vorname.toLowerCase().includes(term) ||
          emp.Nachname.toLowerCase().includes(term) ||
          emp.Personalnummer.includes(term)
        )
      }

      return employees
    }
  },
  methods: {
    goToEmployeeDetail(employeeNumber) {
      this.$router.push(`/employees/${employeeNumber}`)
    }
  }
}
</script>

<style scoped>
.employees {
  position: absolute;
  top: 64px;
  /* AppHeader Höhe */
  left: 60px;
  /* Sidebar width */
  right: 0;
  bottom: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8fafc;
}

.page-header {
  margin-bottom: 25px;
  flex-shrink: 0;
}

/* Breadcrumb Navigation */
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 14px;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  text-decoration: none;
  padding: 6px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.breadcrumb-item:hover {
  background-color: #f1f5f9;
  color: #1976d2;
}

.breadcrumb-icon {
  font-size: 18px;
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #94a3b8;
}

.breadcrumb-separator .material-icons-outlined {
  font-size: 16px;
}

.breadcrumb-current {
  color: #1e293b;
  font-weight: 500;
}

/* Haupt-Überschrift */
.page-title h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  color: #1e293b;
  font-size: 28px;
  font-weight: 600;
}

.title-icon {
  font-size: 32px;
  color: #1976d2;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 16px;
  font-weight: 400;
}

.loading {
  text-align: center;
  padding: 60px;
  color: #64748b;
}

.employees-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 15px;
  flex-shrink: 0;
}

.stats {
  display: flex;
  gap: 20px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #1e293b;
}

.stat-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 500;
}

.filters {
  display: flex;
  gap: 15px;
  align-items: center;
}

.filter-select,
.search-input {
  padding: 10px 15px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
}

.search-input {
  width: 250px;
}

.table-wrapper {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.table-scroll-container {
  flex: 1;
  overflow: auto;
  position: relative;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 1800px;
}

.table-header {
  background: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 15;
}

.table-header th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  border-right: 1px solid #e2e8f0;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
  background: #f8fafc;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  z-index: 15;
}

.table-header th.sticky-col {
  position: sticky !important;
}

.table-header th:last-child {
  border-right: none;
}

.table-body .table-row {
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.15s ease;
}

.table-body .table-row.clickable-row {
  cursor: pointer;
}

.table-body .table-row:hover {
  background-color: #f8fafc;
}

.table-body .table-row.clickable-row:hover {
  background-color: #e2e8f0;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-body .table-row:last-child {
  border-bottom: none;
}

.cell {
  padding: 12px 16px;
  font-size: 14px;
  color: #374151;
  border-right: 1px solid #f1f5f9;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cell:last-child {
  border-right: none;
}

/* Spezifische Spaltenbreiten */
.col-personalnummer {
  width: 100px;
}

.col-vorname,
.col-nachname {
  width: 120px;
}

.col-status {
  width: 100px;
}

.col-arbeitgeber {
  width: 180px;
}

.col-abrechnungskreis {
  width: 160px;
}

.col-wohnort {
  width: 120px;
}

.col-eintritt,
.col-austritt,
.col-geburtsdatum {
  width: 110px;
}

.col-titel {
  width: 80px;
}

.col-geschlecht {
  width: 100px;
}

.col-familienstand {
  width: 140px;
}

.col-staatsangehoerigkeit {
  width: 140px;
}

.col-fehlzeit {
  width: 160px;
}

/* Fixierte erste Spalte */
.sticky-col {
  position: sticky;
  left: 0;
  border-right: 2px solid #e2e8f0 !important;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.table-header .sticky-col {
  z-index: 25;
  background: #f8fafc !important;
}

.table-body .sticky-col {
  z-index: 11;
  background: white;
}

.table-body .table-row:hover .sticky-col {
  background: #f8fafc;
  z-index: 11;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  display: inline-block;
}

.status-badge.aktiv {
  background: #dcfce7;
  color: #166534;
}

.status-badge.inaktiv {
  background: #fee2e2;
  color: #991b1b;
}

.fehlzeit {
  color: #dc2626;
  font-weight: 500;
}

.no-results {
  text-align: center;
  padding: 60px;
  color: #64748b;
}

@media (max-width: 768px) {
  .employees {
    left: 60px;
    /* Sidebar bleibt auch auf mobile sichtbar */
    padding: 15px;
  }

  .controls {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;
    gap: 10px;
  }

  .stats {
    justify-content: center;
    gap: 10px;
  }

  .stat-item {
    padding: 10px 15px;
  }

  .filters {
    justify-content: center;
    gap: 10px;
  }

  .search-input {
    width: 100%;
  }

  .breadcrumb {
    font-size: 13px;
    margin-bottom: 12px;
  }

  .breadcrumb-item {
    padding: 4px 8px;
    gap: 4px;
  }

  .breadcrumb-icon {
    font-size: 16px;
  }

  .page-title h1 {
    font-size: 24px;
    gap: 8px;
  }

  .title-icon {
    font-size: 28px;
  }

  .subtitle {
    font-size: 14px;
  }

  .table-header th,
  .cell {
    padding: 6px 8px;
    font-size: 12px;
  }

  /* Kleinere Spaltenbreiten für mobile */
  .col-personalnummer {
    width: 80px;
  }

  .col-vorname,
  .col-nachname {
    width: 80px;
  }

  .col-arbeitgeber {
    width: 120px;
  }

  .col-abrechnungskreis {
    width: 110px;
  }

  .col-fehlzeit {
    width: 110px;
  }
}
</style>