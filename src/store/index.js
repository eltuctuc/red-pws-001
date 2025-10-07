import employeesData from '@/data/employees.json';
import { createStore } from 'vuex';

const STORAGE_KEY = 'akdb_employees_data';

export default createStore({
  state: {
    employees: [],
    isDataLoaded: false,
  },
  getters: {
    getAllEmployees: (state) => state.employees,
    getEmployeeById: (state) => (id) => {
      return state.employees.find((employee) => employee.Personalnummer === id);
    },
    getActiveEmployees: (state) => {
      return state.employees.filter((employee) => employee.Status === 'Aktiv');
    },
    getInactiveEmployees: (state) => {
      return state.employees.filter((employee) => employee.Status === 'Inaktiv');
    },
    isDataLoaded: (state) => state.isDataLoaded,
  },
  mutations: {
    SET_EMPLOYEES(state, employees) {
      state.employees = employees;
    },
    SET_DATA_LOADED(state, status) {
      state.isDataLoaded = status;
    },
    UPDATE_EMPLOYEE(state, updatedEmployee) {
      const index = state.employees.findIndex((emp) => emp.Personalnummer === updatedEmployee.Personalnummer);
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    ADD_EMPLOYEE(state, newEmployee) {
      state.employees.push(newEmployee);
    },
    DELETE_EMPLOYEE(state, personalnummer) {
      state.employees = state.employees.filter((emp) => emp.Personalnummer !== personalnummer);
    },
  },
  actions: {
    async loadEmployeesData({ commit, state }) {
      try {
        // Prüfen, ob Daten bereits im localStorage vorhanden sind
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (storedData) {
          // Daten aus localStorage laden
          const parsedData = JSON.parse(storedData);
          commit('SET_EMPLOYEES', parsedData);
          console.log('Mitarbeiterdaten aus localStorage geladen:', parsedData.length, 'Einträge');
        } else {
          // Daten aus JSON-Datei laden und in localStorage speichern
          const employees = employeesData.employees;
          commit('SET_EMPLOYEES', employees);

          // Daten im localStorage speichern
          localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
          console.log('Mitarbeiterdaten aus JSON-Datei geladen und im localStorage gespeichert:', employees.length, 'Einträge');
        }

        commit('SET_DATA_LOADED', true);
      } catch (error) {
        console.error('Fehler beim Laden der Mitarbeiterdaten:', error);
        commit('SET_DATA_LOADED', false);
      }
    },

    updateEmployee({ commit }, employee) {
      commit('UPDATE_EMPLOYEE', employee);
      // Aktualisierte Daten im localStorage speichern
      this.dispatch('saveToLocalStorage');
    },

    addEmployee({ commit }, employee) {
      commit('ADD_EMPLOYEE', employee);
      // Aktualisierte Daten im localStorage speichern
      this.dispatch('saveToLocalStorage');
    },

    deleteEmployee({ commit }, personalnummer) {
      commit('DELETE_EMPLOYEE', personalnummer);
      // Aktualisierte Daten im localStorage speichern
      this.dispatch('saveToLocalStorage');
    },

    saveToLocalStorage({ state }) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.employees));
        console.log('Daten im localStorage aktualisiert');
      } catch (error) {
        console.error('Fehler beim Speichern im localStorage:', error);
      }
    },

    clearLocalStorage() {
      localStorage.removeItem(STORAGE_KEY);
      console.log('localStorage-Daten gelöscht');
    },

    resetToOriginalData({ commit }) {
      // Daten auf ursprüngliche JSON-Daten zurücksetzen
      const originalEmployees = employeesData.employees;
      commit('SET_EMPLOYEES', originalEmployees);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(originalEmployees));
      console.log('Daten auf ursprüngliche Werte zurückgesetzt');
    },
  },
  modules: {},
});
