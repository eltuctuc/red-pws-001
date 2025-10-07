<template>
  <div class="employee-detail">
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
      <span class="breadcrumb-current">Personendetails</span>
    </nav>

    <!-- Object Header -->
    <ObjectHeader v-if="employee" :firstName="employee.Vorname" :lastName="employee.Nachname"
      :employeeNumber="employee.Personalnummer" :status="employee.Status" />

    <!-- Loading State -->
    <div v-if="!employee" class="loading">
      <p>⏳ Mitarbeiterdaten werden geladen...</p>
    </div>

    <!-- Anchor Navigation -->
    <div v-if="employee" class="anchor-navigation">
      <div class="anchor-content">
        <h3 class="anchor-title">Schnellnavigation</h3>
        <div class="anchor-links">
          <a @click="scrollToSection('personal')" class="anchor-link">
            <span class="material-icons-outlined">person</span>
            Persönliche Daten
          </a>
          <a @click="scrollToSection('employment')" class="anchor-link">
            <span class="material-icons-outlined">work</span>
            Beschäftigung
          </a>
          <a @click="scrollToSection('contact')" class="anchor-link">
            <span class="material-icons-outlined">contact_mail</span>
            Kontakt & Wohnort
          </a>
          <a @click="scrollToSection('status')" class="anchor-link">
            <span class="material-icons-outlined">info</span>
            Status & Fehlzeiten
          </a>
        </div>
      </div>
    </div>

    <!-- Scrollable Content Sections -->
    <div v-if="employee" class="content-sections">
      <!-- Persönliche Daten -->
      <section id="personal" class="data-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="material-icons-outlined">person</span>
            Persönliche Daten
          </h2>
          <button @click="editSection('personal')" class="edit-button">
            <span class="material-icons-outlined">edit</span>
            Bearbeiten
          </button>
        </div>
        <div class="section-content">
          <div class="data-grid">
            <div class="data-item">
              <label class="data-label">Vorname</label>
              <span class="data-value">{{ employee.Vorname }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Nachname</label>
              <span class="data-value">{{ employee.Nachname }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Titel</label>
              <span class="data-value">{{ employee.Titel || '-' }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Geburtsdatum</label>
              <span class="data-value">{{ formatDate(employee.Geburtsdatum) }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Geschlecht</label>
              <span class="data-value">{{ employee.Geschlecht }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Familienstand</label>
              <span class="data-value">{{ employee.Familienstand }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Staatsangehörigkeit</label>
              <span class="data-value">{{ employee.Staatsangehörigkeit }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Beschäftigung -->
      <section id="employment" class="data-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="material-icons-outlined">work</span>
            Beschäftigung
          </h2>
          <button @click="editSection('employment')" class="edit-button">
            <span class="material-icons-outlined">edit</span>
            Bearbeiten
          </button>
        </div>
        <div class="section-content">
          <div class="data-grid">
            <div class="data-item">
              <label class="data-label">Personalnummer</label>
              <span class="data-value highlight">{{ employee.Personalnummer }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Status</label>
              <span :class="['data-value', 'status-badge', employee.Status.toLowerCase()]">
                {{ employee.Status }}
              </span>
            </div>
            <div class="data-item">
              <label class="data-label">Arbeitgeber</label>
              <span class="data-value">{{ employee.Arbeitgeber }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Abrechnungskreis</label>
              <span class="data-value">{{ employee.Abrechnungskreis }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Eintrittsdatum</label>
              <span class="data-value">{{ formatDate(employee.Eintritt) }}</span>
            </div>
            <div class="data-item">
              <label class="data-label">Austrittsdatum</label>
              <span class="data-value">{{ employee.Austritt ? formatDate(employee.Austritt) : '-' }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Kontakt & Wohnort -->
      <section id="contact" class="data-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="material-icons-outlined">contact_mail</span>
            Kontakt & Wohnort
          </h2>
          <button @click="editSection('contact')" class="edit-button">
            <span class="material-icons-outlined">edit</span>
            Bearbeiten
          </button>
        </div>
        <div class="section-content">
          <div class="data-grid">
            <div class="data-item full-width">
              <label class="data-label">Wohnort</label>
              <span class="data-value">{{ employee.Wohnort }}</span>
            </div>
            <!-- Hier könnten weitere Kontaktdaten hinzugefügt werden, falls verfügbar -->
          </div>
        </div>
      </section>

      <!-- Status & Fehlzeiten -->
      <section id="status" class="data-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="material-icons-outlined">info</span>
            Status & Fehlzeiten
          </h2>
          <button @click="editSection('status')" class="edit-button">
            <span class="material-icons-outlined">edit</span>
            Bearbeiten
          </button>
        </div>
        <div class="section-content">
          <div class="data-grid">
            <div class="data-item">
              <label class="data-label">Aktueller Status</label>
              <span :class="['data-value', 'status-badge', employee.Status.toLowerCase()]">
                {{ employee.Status }}
              </span>
            </div>
            <div class="data-item">
              <label class="data-label">Aktuelle Fehlzeit</label>
              <span :class="['data-value', employee.AktuelleFehlzeit ? 'fehlzeit' : '']">
                {{ employee.AktuelleFehlzeit || 'Keine' }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import ObjectHeader from '@/components/ObjectHeader.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'EmployeeDetailView',
  components: {
    ObjectHeader
  },
  data() {
    return {
      employee: null
    }
  },
  computed: {
    ...mapGetters(['getAllEmployees'])
  },
  created() {
    this.loadEmployee()
  },
  watch: {
    '$route'() {
      this.loadEmployee()
    }
  },
  methods: {
    loadEmployee() {
      const employeeNumber = this.$route.params.id
      this.employee = this.getAllEmployees.find(emp => emp.Personalnummer === employeeNumber)
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId)
      const scrollContainer = document.querySelector('.content-sections')

      if (element && scrollContainer) {
        const elementTop = element.offsetTop
        const containerTop = scrollContainer.offsetTop
        const scrollPosition = elementTop - containerTop - 20 // 20px padding

        scrollContainer.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        })
      }
    },
    editSection(sectionName) {
      // Navigiere zur Bearbeitungsseite
      this.$router.push(`/employees/${this.employee.Personalnummer}/edit/${sectionName}`)
    },
    formatDate(dateString) {
      if (!dateString) return '-'
      const date = new Date(dateString)
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
.employee-detail {
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

/* Anchor Navigation */
.anchor-navigation {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 8px 32px;
  flex-shrink: 0;
  z-index: 99;
}

.anchor-content {
  max-width: 1200px;
  margin: 0 auto;
}

.anchor-title {
  display: none;
  /* Verstecke den Titel für mehr Platz */
}

.anchor-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.anchor-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b;
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.anchor-link:hover {
  background: #1976d2;
  color: white;
  border-color: #1976d2;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(25, 118, 210, 0.2);
}

.anchor-link .material-icons-outlined {
  font-size: 16px;
}

/* Scrollable Content */
.content-sections {
  flex: 1;
  overflow-y: auto;
  padding: 24px 32px;
}

.data-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-bottom: 1px solid #e2e8f0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
}

.section-title .material-icons-outlined {
  font-size: 24px;
  color: #1976d2;
}

.edit-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.edit-button:hover {
  background: #1565c0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
}

.edit-button:active {
  transform: translateY(0);
}

.edit-button .material-icons-outlined {
  font-size: 18px;
}

.section-content {
  padding: 24px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.data-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.data-item.full-width {
  grid-column: 1 / -1;
}

.data-label {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-value {
  font-size: 16px;
  font-weight: 500;
  color: #1e293b;
  padding: 8px 0;
}

.data-value.highlight {
  color: #1976d2;
  font-weight: 600;
  font-size: 18px;
}

.status-badge {
  padding: 6px 12px !important;
  border-radius: 20px;
  font-size: 12px !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  display: inline-block;
  width: fit-content;
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
  color: #dc2626 !important;
  font-weight: 600 !important;
}

@media (max-width: 768px) {
  .employee-detail {
    left: 60px;
    /* Sidebar bleibt sichtbar */
  }

  .breadcrumb,
  .anchor-navigation,
  .content-sections {
    padding-left: 16px;
    padding-right: 16px;
  }

  .anchor-navigation {
    padding-top: 6px;
    padding-bottom: 6px;
  }

  .anchor-links {
    gap: 8px;
  }

  .anchor-link {
    font-size: 12px;
    padding: 4px 8px;
    gap: 4px;
  }

  .anchor-link .material-icons-outlined {
    font-size: 14px;
  }

  .data-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .section-content {
    padding: 16px;
  }

  .section-header {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .section-title {
    font-size: 18px;
  }

  .edit-button {
    align-self: flex-end;
    font-size: 13px;
    padding: 6px 12px;
  }

  .edit-button .material-icons-outlined {
    font-size: 16px;
  }
}
</style>