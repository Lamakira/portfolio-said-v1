<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { dataProjects } from '@/data/dataProjects';
import { useUniverseState } from '@/composables/useUniverseState';
import { gsap } from 'gsap';
import DataProjectCard from './DataProjectCard.vue';

const { state } = useUniverseState();
const sectionRef = ref(null);
const headerRef = ref(null);
const descriptionRef = ref(null);
const educationRef = ref(null);
const projectsRef = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.2 });
  
  if (headerRef.value) {
    tl.from(headerRef.value.children, {
      y: -30,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out'
    });
  }
  
  if (descriptionRef.value) {
    tl.from(descriptionRef.value, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.6');
  }
  
  if (educationRef.value) {
    tl.from(educationRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  }
  
  setTimeout(() => {
    if (projectsRef.value && projectsRef.value.children.length > 0) {
      gsap.from(projectsRef.value.children, {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }, 100);
});
</script>

<template>
  <section ref="sectionRef" class="w-full! max-w-none! min-h-screen bg-white text-slate-900 py-20 px-6 relative overflow-hidden">
    <!-- Grid Pattern Background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

    <div class="container mx-auto relative z-10 max-w-7xl">
      
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-8">
        <h2 class="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A1A2F] mb-8 tracking-tight">
          Data & IA
        </h2>
      </div>

      <!-- Universe Description (conditional) -->
      <div class="max-w-3xl mx-auto text-center mb-16 min-h-[80px]">
        <transition name="fade-slide">
          <p 
            v-if="state.isDataActive" 
            ref="descriptionRef"
            class="text-lg text-[#4B5563] italic border-l-4 border-[#3B82F6] pl-4 inline-block text-left whitespace-pre-line"
          >
            "{{ resumeData.descriptions.data }}"
          </p>
        </transition>
      </div>

      <!-- Formation Section -->
      <div ref="educationRef" class="max-w-3xl mx-auto mb-20">
        <h3 class="text-3xl font-bold text-[#0A1A2F] mb-6 text-center">Formation</h3>
        <div class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h4 class="text-xl font-bold text-[#3B82F6] mb-1">Développeur Data & IA</h4>
              <p class="text-[#4B5563]">Coding Academy by EPITECH Bénin</p>
            </div>
            <div class="text-[#4B5563] font-mono text-sm md:text-right">
              2025
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div>
        <h3 class="text-4xl font-bold text-[#0A1A2F] mb-12 text-center">Projets</h3>
        
        <!-- Desktop/Tablet Grid -->
        <div ref="projectsRef" class="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DataProjectCard 
            v-for="project in dataProjects" 
            :key="project.slug"
            :project="project"
          />
        </div>

        <!-- Mobile Horizontal Scroll -->
        <div class="md:hidden overflow-x-auto snap-x snap-mandatory -mx-6 px-6">
          <div class="flex gap-6 pb-4">
            <div 
              v-for="project in dataProjects" 
              :key="project.slug"
              class="flex-shrink-0 w-[85vw] snap-center"
            >
              <DataProjectCard :project="project" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth scrolling on mobile */
.overflow-x-auto {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

/* Fade slide transition for description */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
