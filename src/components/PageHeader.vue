<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGroupStore } from "../stores/GroupStore";

const groupStore = useGroupStore();

onMounted(() => {});
</script>

<template>
  <header class="header">
    <h1>{{ groupStore.settingsLoaded ? groupStore.groupName : "Loading..." }}</h1>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: var(--foreground-level1);
  gap: 0.75rem;
  padding: 0.5rem;
  height: 2rem;
}

.header h1 {
  font-size: 1.5rem;
}

.back-button {
  border: none;
  background-color: transparent;
  color: inherit;
  font-size: 2rem;
  color: var(--tg-theme-link-color);
}
</style>
