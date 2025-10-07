import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store).use(router);

// Daten beim App-Start laden
store
  .dispatch('loadEmployeesData')
  .then(() => {
    console.log('App initialisiert - Mitarbeiterdaten geladen');
    app.mount('#app');
  })
  .catch((error) => {
    console.error('Fehler beim Initialisieren der App:', error);
    // App trotzdem mounten, auch wenn Daten nicht geladen werden konnten
    app.mount('#app');
  });
