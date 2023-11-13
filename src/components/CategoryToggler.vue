<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: String,
});

const isVisible = ref(true);
</script>

<template>
  <div class="category-toggler" :class="isVisible ? '' : 'hidden'">
    <header @click="isVisible = !isVisible">
      <span class="hidden-arrow" :class="isVisible ? '' : 'hidden'"></span>
      <h1>{{ title }}</h1>
      <span class="hidden-arrow" :class="isVisible ? '' : 'hidden'"></span>
    </header>
    <div class="content-container" :class="isVisible ? '' : 'hidden'">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
div.category-toggler {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

div.content-container {
  display: flex;
  transition-property: height, opacity;
  transition-duration: 0.25s;
  transition-timing-function: ease-in-out;
  will-change: opacity, transform;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 1;
  overflow: hidden;
}

div.content-container.hidden {
  height: 0px;
  opacity: 0;
  transform: scale(98%);
}

header h1 {
  font-weight: normal;
  text-align: center;
  font-size: 1.5rem;
  flex: 1;
}

header {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.hidden-arrow {
  width: 1.75rem;
  height: 1.75rem;
  position: relative;
}

.hidden-arrow::after {
  content: "";
  position: absolute;

  transition-property: transform opacity;
  transition-duration: 0.2s;

  top: 15%;
  bottom: 15%;
  left: 15%;
  right: 15%;
  border-left: 2px solid transparent;
  border-bottom: 2px solid white;
  opacity: 0;
}

.hidden-arrow.hidden::after {
  border-left-color: white;
  transform: rotate(-45deg);
  opacity: 1;
}
</style>
