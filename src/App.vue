<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';
import DarkToggle from '@/components/DarkToggle.vue';

const { initTheme, watchSystemTheme } = useTheme();

onMounted(() => {
  // Initialize theme from localStorage or system preference
  initTheme();
  
  // Watch for system theme changes
  watchSystemTheme();
});
</script>

<template>
  <DarkToggle />
  <RouterView />
</template>

<style>
/* Global styles if needed */
body {
  margin: 0;
  padding: 0;
  background-color: #000;
  color: #fff;
}
</style>
