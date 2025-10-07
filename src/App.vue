<template>
  <div id="app">
    <AppHeader />
    <AppSidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppSidebar
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

body {
  margin: 0;
  padding: 0;
}

.main-content {
  margin-left: 60px;
  /* Sidebar width */
  min-height: calc(100vh - 64px);
  /* Full height minus header */
}
</style>
