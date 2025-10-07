<template>
  <div class="employee-edit">
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">
        <span class="material-icons-outlined breadcrumb-icon">home</span>
        Startseite
      </router-link>
      <span class="breadcrumb-separator">
        <span class="material-icons-outlined">chevron_right</span>
      </span>
      <router-link to="/employees" class="breadcrumb-item">
        Personenübersicht
      </router-link>
      <span class="breadcrumb-separator">
        <span class="material-icons-outlined">chevron_right</span>
      </span>
      <router-link :to="`/employees/${$route.params.id}`" class="breadcrumb-item">
        Personendetails
      </router-link>
      <span class="breadcrumb-separator">
        <span class="material-icons-outlined">chevron_right</span>
      </span>
      <span class="breadcrumb-current">Bearbeiten</span>
    </nav>

    <!-- Object Header -->
    <ObjectHeader v-if="employee" :firstName="employee.Vorname" :lastName="employee.Nachname"
      :employeeNumber="employee.Personalnummer" :status="employee.Status" />

    <!-- Loading State -->
    <div v-if="!employee" class="loading">
      <p>⏳ Mitarbeiterdaten werden geladen...</p>
    </div>

    <!-- Edit Form -->
    <div v-if="employee" class="form-container">
      <div class="form-wrapper">
        <form @submit.prevent="saveChanges" class="edit-form">
          <div class="form-header">
            <h2 class="form-title">
              <span class="material-icons-outlined">{{ getSectionIcon(section) }}</span>
              {{ getSectionTitle(section) }} bearbeiten
            </h2>
          </div>

          <div class="form-content">
            <!-- Persönliche Daten -->
            <div v-if="section === 'personal'" class="form-section">
              <div class="form-grid">
                <div class="form-group">
                  <label for="vorname" class="form-label">Vorname *</label>
                  <input id="vorname" v-model="editData.Vorname" type="text" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="nachname" class="form-label">Nachname *</label>
                  <input id="nachname" v-model="editData.Nachname" type="text" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="titel" class="form-label">Titel</label>
                  <input id="titel" v-model="editData.Titel" type="text" class="form-input" />
                </div>
                <div class="form-group">
                  <label for="geburtsdatum" class="form-label">Geburtsdatum *</label>
                  <input id="geburtsdatum" v-model="editData.Geburtsdatum" type="date" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="geschlecht" class="form-label">Geschlecht *</label>
                  <select id="geschlecht" v-model="editData.Geschlecht" class="form-select" required>
                    <option value="">Bitte wählen</option>
                    <option value="Männlich">Männlich</option>
                    <option value="Weiblich">Weiblich</option>
                    <option value="Divers">Divers</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="familienstand" class="form-label">Familienstand *</label>
                  <select id="familienstand" v-model="editData.Familienstand" class="form-select" required>
                    <option value="">Bitte wählen</option>
                    <option value="Ledig">Ledig</option>
                    <option value="Verheiratet">Verheiratet</option>
                    <option value="Geschieden">Geschieden</option>
                    <option value="Verwitwet">Verwitwet</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="staatsangehoerigkeit" class="form-label">Staatsangehörigkeit *</label>
                  <input id="staatsangehoerigkeit" v-model="editData.Staatsangehörigkeit" type="text" class="form-input"
                    required />
                </div>
              </div>
            </div>

            <!-- Beschäftigung -->
            <div v-if="section === 'employment'" class="form-section">
              <div class="form-grid">
                <div class="form-group">
                  <label for="personalnummer" class="form-label">Personalnummer *</label>
                  <input id="personalnummer" v-model="editData.Personalnummer" type="text" class="form-input" readonly
                    disabled />
                  <small class="form-hint">Personalnummer kann nicht geändert werden</small>
                </div>
                <div class="form-group">
                  <label for="status" class="form-label">Status *</label>
                  <select id="status" v-model="editData.Status" class="form-select" required>
                    <option value="">Bitte wählen</option>
                    <option value="Aktiv">Aktiv</option>
                    <option value="Inaktiv">Inaktiv</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="arbeitgeber" class="form-label">Arbeitgeber *</label>
                  <input id="arbeitgeber" v-model="editData.Arbeitgeber" type="text" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="abrechnungskreis" class="form-label">Abrechnungskreis *</label>
                  <input id="abrechnungskreis" v-model="editData.Abrechnungskreis" type="text" class="form-input"
                    required />
                </div>
                <div class="form-group">
                  <label for="eintritt" class="form-label">Eintrittsdatum *</label>
                  <input id="eintritt" v-model="editData.Eintritt" type="date" class="form-input" required />
                </div>
                <div class="form-group">
                  <label for="austritt" class="form-label">Austrittsdatum</label>
                  <input id="austritt" v-model="editData.Austritt" type="date" class="form-input" />
                </div>
              </div>
            </div>

            <!-- Kontakt & Wohnort -->
            <div v-if="section === 'contact'" class="form-section">
              <div class="form-grid">
                <div class="form-group full-width">
                  <label for="wohnort" class="form-label">Wohnort *</label>
                  <input id="wohnort" v-model="editData.Wohnort" type="text" class="form-input" required />
                </div>
              </div>
            </div>

            <!-- Status & Fehlzeiten -->
            <div v-if="section === 'status'" class="form-section">
              <div class="form-grid">
                <div class="form-group">
                  <label for="statusField" class="form-label">Aktueller Status *</label>
                  <select id="statusField" v-model="editData.Status" class="form-select" required>
                    <option value="">Bitte wählen</option>
                    <option value="Aktiv">Aktiv</option>
                    <option value="Inaktiv">Inaktiv</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="fehlzeit" class="form-label">Aktuelle Fehlzeit</label>
                  <input id="fehlzeit" v-model="editData.AktuelleFehlzeit" type="text" class="form-input"
                    placeholder="z.B. Krank, Urlaub" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Fixed Footer -->
    <div class="footer-actions">
      <div class="footer-content">
        <div class="button-group">
          <button @click="cancelEdit" type="button" class="btn btn-cancel">
            <span class="material-icons-outlined">close</span>
            Abbrechen
          </button>
          <button @click="saveChanges" type="button" class="btn btn-save">
            <span class="material-icons-outlined">save</span>
            Speichern
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Modal -->
    <ConfirmModal :isVisible="showConfirmModal" @confirm="confirmLeave" @cancel="cancelLeave" />
  </div>
</template>

<script>
import ConfirmModal from '@/components/ConfirmModal.vue';
import ObjectHeader from '@/components/ObjectHeader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EmployeeEditView',
  components: {
    ObjectHeader,
    ConfirmModal
  },
  data() {
    return {
      employee: null,
      editData: {},
      originalData: {},
      section: null,
      showConfirmModal: false,
      pendingNavigation: null
    }
  },
  computed: {
    ...mapGetters(['getAllEmployees']),
    hasChanges() {
      if (!this.originalData || !this.editData) return false

      return JSON.stringify(this.originalData) !== JSON.stringify(this.editData)
    }
  },
  created() {
    this.loadEmployee()
    this.section = this.$route.params.section
  },
  mounted() {
    // Verhindere das Schließen der Seite bei ungespeicherten Änderungen
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload)
  },
  watch: {
    '$route'() {
      this.loadEmployee()
      this.section = this.$route.params.section
    }
  },
  methods: {
    loadEmployee() {
      const employeeNumber = this.$route.params.id
      this.employee = this.getAllEmployees.find(emp => emp.Personalnummer === employeeNumber)

      if (this.employee) {
        // Erstelle eine Kopie der Mitarbeiterdaten zum Bearbeiten
        this.editData = { ...this.employee }
        // Speichere originale Daten für Vergleich
        this.originalData = { ...this.employee }
      }
    },
    getSectionIcon(section) {
      const icons = {
        personal: 'person',
        employment: 'work',
        contact: 'contact_mail',
        status: 'info'
      }
      return icons[section] || 'edit'
    },
    getSectionTitle(section) {
      const titles = {
        personal: 'Persönliche Daten',
        employment: 'Beschäftigung',
        contact: 'Kontakt & Wohnort',
        status: 'Status & Fehlzeiten'
      }
      return titles[section] || 'Daten'
    },
    cancelEdit() {
      if (this.hasChanges) {
        this.pendingNavigation = () => {
          this.$router.push(`/employees/${this.employee.Personalnummer}`)
        }
        this.showConfirmModal = true
      } else {
        this.$router.push(`/employees/${this.employee.Personalnummer}`)
      }
    },
    saveChanges() {
      // Validierung
      if (!this.validateForm()) {
        return
      }

      // Speichere Änderungen im Vuex Store (und damit in localStorage)
      this.$store.dispatch('updateEmployee', this.editData)

      // Aktualisiere die ursprünglichen Daten, damit hasChanges false wird
      this.originalData = { ...this.editData }

      // Zurück zur Detailseite mit Toast-Trigger
      this.$router.push({
        path: `/employees/${this.employee.Personalnummer}`,
        query: { saved: 'true' }
      })
    },
    validateForm() {
      // Basis-Validierung für Pflichtfelder
      const requiredFields = {
        personal: ['Vorname', 'Nachname', 'Geburtsdatum', 'Geschlecht', 'Familienstand', 'Staatsangehörigkeit'],
        employment: ['Personalnummer', 'Status', 'Arbeitgeber', 'Abrechnungskreis', 'Eintritt'],
        contact: ['Wohnort'],
        status: ['Status']
      }

      const sectionFields = requiredFields[this.section] || []

      for (const field of sectionFields) {
        if (!this.editData[field] || this.editData[field].trim() === '') {
          alert(`Bitte füllen Sie das Feld "${field}" aus.`)
          return false
        }
      }

      return true
    },
    confirmLeave() {
      this.showConfirmModal = false

      // Setze die Änderungen zurück, damit hasChanges false wird
      this.editData = { ...this.originalData }

      // Führe die ausstehende Navigation aus
      if (this.pendingNavigation) {
        this.pendingNavigation()
        this.pendingNavigation = null
      }
    },
    cancelLeave() {
      this.showConfirmModal = false
      this.pendingNavigation = null
    },
    handleBeforeUnload(event) {
      if (this.hasChanges) {
        event.preventDefault()
        event.returnValue = 'Sie haben ungespeicherte Änderungen. Möchten Sie die Seite wirklich verlassen?'
        return event.returnValue
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasChanges) {
      this.pendingNavigation = () => next()
      this.showConfirmModal = true
    } else {
      next()
    }
  }
}
</script>

<style scoped>
.employee-edit {
  position: absolute;
  top: 64px;
  /* AppHeader height */
  left: 60px;
  /* Sidebar width */
  right: 0;
  bottom: 0;
  background: #f8fafc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* Breadcrumb Navigation */
.breadcrumb {
  display: flex;
  align-items: center;
  padding: 15px 32px;
  font-size: 14px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
  z-index: 100;
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

/* Loading State */
.loading {
  text-align: center;
  padding: 60px;
  color: #64748b;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Form Container */
.form-container {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px 80px;
  /* Bottom padding for footer */
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

.edit-form {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.form-header {
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e2e8f0;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.form-title .material-icons-outlined {
  font-size: 24px;
  color: #1976d2;
}

.form-content {
  padding: 24px;
}

.form-section {
  margin-bottom: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 4px;
}

.form-input,
.form-select {
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
  background: white;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
}

.form-input:disabled {
  background: #f3f4f6;
  color: #6b7280;
  cursor: not-allowed;
}

.form-hint {
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
}

/* Fixed Footer */
.footer-actions {
  position: fixed;
  bottom: 0;
  left: 60px;
  /* Sidebar width */
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.footer-content {
  padding: 16px 32px;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
}

.button-group {
  display: flex;
  gap: 12px;
}

.btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-cancel {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-cancel:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.btn-save {
  background: #1976d2;
  color: white;
}

.btn-save:hover {
  background: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
}

.btn .material-icons-outlined {
  font-size: 18px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .employee-edit {
    left: 60px;
    /* Sidebar bleibt sichtbar */
  }

  .breadcrumb,
  .form-container {
    padding-left: 16px;
    padding-right: 16px;
  }

  .form-container {
    padding-bottom: 100px;
    /* Mehr Platz für Footer auf Mobile */
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .form-content {
    padding: 16px;
  }

  .form-header {
    padding: 16px;
  }

  .form-title {
    font-size: 18px;
  }

  .footer-actions {
    left: 60px;
  }

  .footer-content {
    padding: 12px 16px;
  }

  .button-group {
    width: 100%;
    justify-content: space-between;
  }

  .btn {
    flex: 1;
    justify-content: center;
    padding: 12px 16px;
  }
}
</style>