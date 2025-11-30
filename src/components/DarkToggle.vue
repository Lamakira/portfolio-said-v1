<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from '@/composables/useTheme';

const { isDark, toggleTheme } = useTheme();
const isHovered = ref(false);

// Icon rotation animation
const iconRotation = ref(0);

const handleToggle = () => {
  // Add rotation animation
  iconRotation.value += 180;
  toggleTheme();
};

onMounted(() => {
  // Smooth entrance animation
  setTimeout(() => {
    iconRotation.value = 0;
  }, 100);
});
</script>

<template>
  <button
    @click="handleToggle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Activer le mode clair' : 'Activer le mode sombre'"
    class="fixed top-6 right-6 z-50 p-3 rounded-full glass hover:scale-110 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group"
    :class="isDark ? 'bg-slate-800/60' : 'bg-white/60'"
  >
    <!-- Sun Icon (Light Mode) -->
    <svg
      v-if="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-amber-500 transition-transform duration-500"
      :style="{ transform: `rotate(${iconRotation}deg)` }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon Icon (Dark Mode) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-blue-300 transition-transform duration-500"
      :style="{ transform: `rotate(${iconRotation}deg)` }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>

    <!-- Tooltip (Desktop only) -->
    <span
      class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden md:block"
      :class="isDark ? 'bg-slate-700' : 'bg-slate-900'"
    >
      {{ isDark ? 'Mode clair' : 'Mode sombre' }}
    </span>
  </button>
</template>

<style scoped>
.glass {
  background: var(--glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 4px 6px var(--shadow);
}
</style>
