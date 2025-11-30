<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);

const checkScroll = () => {
  // Show button when scrolled more than 75% from top
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // Calculate if we're past 75% of the page
  const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  isVisible.value = scrollPercentage > 75;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Transition name="fade-slide-up">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 z-50 p-4 bg-[#3B82F6] hover:bg-[#2563eb] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Retour en haut"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 transform group-hover:-translate-y-1 transition-transform" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.fade-slide-up-enter-active,
.fade-slide-up-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
