<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { createScene } = useScrollAnimation();
const sectionRef = ref(null);
const cardsRef = ref(null);

const projects = resumeData.projects.web;
const skills = resumeData.skills.web;

onMounted(() => {
  const tl = createScene(sectionRef.value, {
    start: 'top center',
    end: 'bottom bottom',
  });

  if (tl && cardsRef.value) {
    const cards = cardsRef.value.querySelectorAll('.project-card');
    tl.from(cards, {
      y: 100,
      opacity: 0,
      rotationX: 45,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out',
    });
  }
});
</script>

<template>
  <section ref="sectionRef" class="w-full! max-w-none! min-h-screen bg-slate-900 py-20 px-6 relative overflow-hidden">
    <!-- Background Blobs -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div>

    <div class="container mx-auto relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-16 tracking-tight">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Web Universe
        </span>
      </h2>

      <!-- Universe Description -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <p class="text-lg text-slate-300 italic border-l-4 border-purple-500 pl-4 inline-block text-left">
          "{{ resumeData.universeDescriptions.web }}"
        </p>
      </div>

      <!-- Skills -->
      <div class="flex flex-wrap justify-center gap-4 mb-16">
        <span v-for="skill in skills" :key="skill" class="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium hover:bg-white/20 transition-all">
          {{ skill }}
        </span>
      </div>

      <!-- Projects Grid -->
      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in projects" :key="index" class="project-card group relative">
          <!-- Glass Card -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl blur-sm transform group-hover:scale-105 transition-transform duration-500"></div>
          <div class="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 h-full flex flex-col hover:border-white/40 transition-colors duration-300 shadow-xl">
            <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{{ project.title }}</h3>
            <p class="text-slate-300 mb-4 flex-grow">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.tech" :key="tech" class="text-xs text-purple-200 bg-purple-500/20 px-2 py-1 rounded">
                {{ tech }}
              </span>
            </div>

            <a :href="project.link" class="inline-flex items-center text-purple-300 hover:text-white transition-colors">
              View Project 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-card {
  perspective: 1000px;
}
</style>
