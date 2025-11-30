<script setup>
import { computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Determine the universe from the 'from' query parameter
const fromUniverse = computed(() => route.query.from || null);

// Universe display names
const universeNames = {
  web: 'Web',
  data: 'Data & IA',
  network: 'Réseau'
};

// Get display name for the universe
const universeName = computed(() => {
  return fromUniverse.value ? universeNames[fromUniverse.value] : 'Portfolio';
});

// Handle back navigation
const goBack = async () => {
  if (fromUniverse.value) {
    // Store the target section
    const targetSection = fromUniverse.value;
    
    // Navigate to home
    await router.push('/');
    
    // Wait for Vue to update the DOM
    await nextTick();
    
    // Use requestAnimationFrame to ensure rendering is complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          const yOffset = -20;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Element with id "${targetSection}" not found`);
        }
      });
    });
  } else {
    // Fallback to browser back
    router.back();
  }
};
</script>

<template>
  <button
    @click="goBack"
    class="inline-flex items-center gap-2 px-6 py-3 text-[#3B82F6] hover:text-[#0A1A2F] bg-white hover:bg-gray-50 rounded-xl font-semibold transition-all duration-300 border border-gray-200 hover:border-[#3B82F6] shadow-sm hover:shadow-md"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
    <span class="hidden sm:inline">Retour à {{ universeName }}</span>
    <span class="sm:hidden">Retour</span>
  </button>
</template>
