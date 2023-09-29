<script setup lang="ts">
import GroupSettingsRoute from "./routes/GroupSettingsRoute.vue";
</script>

<template>
  <main class="container">
    <div class="view-container">
      <group-settings-route></group-settings-route>
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.view {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.view-container {
  flex: 1;
  position: relative;
}
</style>
