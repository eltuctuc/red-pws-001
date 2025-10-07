<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Logo links -->
      <div class="logo-section">
        <h1 class="logo">AKDB</h1>
      </div>

      <!-- Account Icon rechts -->
      <div class="account-section">
        <span class="material-icons-outlined account-icon">
          account_circle
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 64px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #1976d2;
  margin: 0;
  letter-spacing: 1px;
}

.account-section {
  display: flex;
  align-items: center;
}

.account-icon {
  font-size: 28px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s ease;
}

.account-icon:hover {
  color: #1976d2;
}
</style>