<template>
  <aside class="app-sidebar">
    <nav class="sidebar-nav">
      <router-link to="/" class="nav-item" title="Home">
        <span class="material-icons-outlined">
          home
        </span>
      </router-link>

      <router-link to="/employees" class="nav-item" title="Personenübersicht">
        <span class="material-icons-outlined">
          people
        </span>
      </router-link>

      <router-link to="/about" class="nav-item" title="About">
        <span class="material-icons-outlined">
          info
        </span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>

<style scoped>
.app-sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  /* Header height */
  height: calc(100vh - 64px);
  width: 60px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 10px;
}

.nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  margin: 0 8px;
  border-radius: 8px;
  text-decoration: none;
  color: #666;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-item:hover {
  background-color: #f5f5f5;
  color: #1976d2;
}

.nav-item.router-link-active {
  background-color: #e3f2fd;
  color: #1976d2;
}

.nav-item .material-icons-outlined {
  font-size: 24px;
}
</style>