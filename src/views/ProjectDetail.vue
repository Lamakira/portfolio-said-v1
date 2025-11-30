<script setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projectsData } from '@/data/projects';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BackButton from '@/components/BackButton.vue';
import ProjectCarousel from '@/components/ProjectCarousel.vue';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const router = useRouter();
const project = computed(() => projectsData.find(p => p.slug === route.params.slug));

const heroRef = ref(null);
const overviewRef = ref(null);
const carouselContainerRef = ref(null);
const techRef = ref(null);
const featuresRef = ref(null);
const metadataRef = ref(null);

// Dynamic Image Loading
const images = ref([]);

const loadImages = async () => {
  if (!project.value) return;
  
  const imageModules = import.meta.glob('/src/assets/images/**/*.{png,jpg,jpeg,webp}');
  
  const projectImages = [];
  for (const path in imageModules) {
    if (path.includes(`/${project.value.slug}/`)) {
      const mod = await imageModules[path]();
      projectImages.push(mod.default);
    }
  }
  images.value = projectImages;
}
// Watch for route changes and force scroll to top
watch(() => route.params.slug, () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}, { immediate: true });

onMounted(async () => {
  // 1. FORCE SCROLL TO TOP - MULTIPLE METHODS FOR RELIABILITY
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  
  if (!project.value) {
    router.push('/');
    return;
  }

  await loadImages();
  await nextTick();
  
  // Refresh ScrollTrigger after DOM updates
  ScrollTrigger.refresh();

  // Hero Animation
  const tl = gsap.timeline();
  tl.from(heroRef.value.querySelector('h1'), { y: 100, opacity: 0, duration: 1, ease: 'power4.out' })
    .from(heroRef.value.querySelector('.baseline'), { y: 50, opacity: 0, duration: 1 }, '-=0.8')
    .from(heroRef.value.querySelectorAll('.tag-chip'), { y: 20, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.6');

  // Overview Reveal
  gsap.from(overviewRef.value, {
    scrollTrigger: { trigger: overviewRef.value, start: 'top 80%' },
    y: 50, opacity: 0, duration: 1, ease: 'power2.out'
  });

  // Carousel Reveal
  if (carouselContainerRef.value && images.value.length > 0) {
    gsap.from(carouselContainerRef.value, {
      scrollTrigger: { trigger: carouselContainerRef.value, start: 'top 80%' },
      y: 100, opacity: 0, duration: 1, ease: 'power3.out'
    });
  }

  // Tech Grid Reveal
  if (techRef.value) {
    gsap.fromTo(techRef.value.querySelectorAll('.tech-card'), 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: techRef.value, start: 'top 90%' },
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      }
    );
  }

  // Features Reveal
  if (featuresRef.value) {
    gsap.from(featuresRef.value.children, {
      scrollTrigger: { trigger: featuresRef.value, start: 'top 80%' },
      x: -50, opacity: 0, stagger: 0.2, duration: 1, ease: 'power2.out'
    });
  }
});
</script>

<template>
  <div v-if="project" class="min-h-screen bg-slate-950 text-white overflow-x-hidden selection:bg-purple-500/30">
    
    <!-- A. Hero Section -->
    <section ref="heroRef" class="relative h-[80vh] flex flex-col justify-center items-center px-6 overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950"></div>
        <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        <!-- Grid -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
          {{ project.title }}
        </h1>
        <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {{ project.baseline }}
        </p>
        
        <!-- Tags -->
        <div class="flex flex-wrap justify-center gap-3 mb-8">
          <span 
            v-for="tag in project.tags" 
            :key="tag"
            class="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm hover:bg-purple-500/20 transition-colors"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Back Button -->
        <div class="mt-6">
          <BackButton />
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- B. Project Overview -->
    <section ref="overviewRef" class="py-20 px-6 relative z-10">
      <div class="container mx-auto max-w-4xl">
        <div class="glass-panel p-10 md:p-16 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <h2 class="text-3xl font-bold mb-8 text-white flex items-center gap-4">
            <span class="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
            À propos du projet
          </h2>
          <div class="prose prose-invert prose-lg max-w-none text-slate-300 leading-loose whitespace-pre-line">
            {{ project.description }}
          </div>
        </div>
      </div>
    </section>

    <!-- C. Project Carousel -->
    <section v-if="images.length > 0" ref="carouselContainerRef" class="py-20 px-6">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl font-bold mb-12 text-center" style="color: var(--text-primary);">Galerie du Projet</h2>
        
        <ProjectCarousel :images="images" :project-title="project.title" />
      </div>
    </section>

    <!-- D. Technical Breakdown -->
    <section ref="techRef" class="py-20 px-6 bg-slate-900/50 relative">
      <div class="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
      
      <div class="container mx-auto relative z-10">
        <h2 class="text-3xl font-bold mb-16 text-center text-white">Stack Technique</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Frontend -->
          <div class="tech-card p-8 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-purple-500/30 transition-all duration-300">
            <h3 class="text-xl font-bold text-purple-300 mb-6 border-b border-white/5 pb-4">Frontend</h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in project.techStack.frontend" :key="tech" class="px-3 py-1 rounded bg-purple-500/10 text-purple-200 text-sm border border-purple-500/20">
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Backend -->
          <div class="tech-card p-8 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-blue-500/30 transition-all duration-300">
            <h3 class="text-xl font-bold text-blue-300 mb-6 border-b border-white/5 pb-4">Backend</h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in project.techStack.backend" :key="tech" class="px-3 py-1 rounded bg-blue-500/10 text-blue-200 text-sm border border-blue-500/20">
                {{ tech }}
              </span>
            </div>
          </div>
          
          <!-- Tools -->
          <div class="tech-card p-8 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-green-500/30 transition-all duration-300">
            <h3 class="text-xl font-bold text-green-300 mb-6 border-b border-white/5 pb-4">Outils</h3>
            <div class="flex flex-wrap gap-3">
              <span v-for="tech in project.techStack.tools" :key="tech" class="px-3 py-1 rounded bg-green-500/10 text-green-200 text-sm border border-green-500/20">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- E. Features Flow -->
    <section ref="featuresRef" class="py-20 px-6">
      <div class="container mx-auto max-w-5xl">
        <h2 class="text-3xl font-bold mb-16 text-center text-white">Fonctionnalités Clés</h2>
        
        <div class="space-y-8">
          <div v-for="(feature, index) in project.features" :key="index" 
               class="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors items-start">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shrink-0 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">{{ feature.title }}</h3>
              <p class="text-slate-400 leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- F. Metadata & Challenges -->
    <section ref="metadataRef" class="py-20 px-6 bg-slate-900">
      <div class="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <!-- Metadata -->
        <div class="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5">
          <h3 class="text-2xl font-bold text-white mb-6">Détails du Projet</h3>
          <ul class="space-y-4 text-slate-300">
            <li class="flex justify-between border-b border-white/5 pb-2">
              <span>Date</span> <span class="text-white font-mono">{{ project.metadata.date }}</span>
            </li>
            <li class="flex justify-between border-b border-white/5 pb-2">
              <span>Durée</span> <span class="text-white font-mono">{{ project.metadata.duration }}</span>
            </li>
            <li class="flex justify-between border-b border-white/5 pb-2">
              <span>Rôle</span> <span class="text-white font-mono">{{ project.metadata.role }}</span>
            </li>
          </ul>
          
          <div class="mt-8 flex gap-4">
            <a v-if="project.metadata.github" :href="project.metadata.github" target="_blank" class="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-center font-medium transition-colors flex items-center justify-center gap-2 border border-white/10">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
              GitHub
            </a>
            <a v-if="project.metadata.link && project.metadata.link !== '#'" :href="project.metadata.link" target="_blank" class="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-center font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20">
              Voir le site
            </a>
          </div>
        </div>

        <!-- Challenges & Learnings -->
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span class="text-red-400">⚡</span> Challenges
            </h3>
            <ul class="space-y-3">
              <li v-for="(challenge, i) in project.challenges" :key="i" class="flex gap-3 text-slate-300">
                <span class="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 shrink-0"></span>
                {{ challenge }}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span class="text-green-400">💡</span> Apprentissages
            </h3>
            <ul class="space-y-3">
              <li v-for="(learning, i) in project.learnings" :key="i" class="flex gap-3 text-slate-300">
                <span class="w-1.5 h-1.5 rounded-full bg-green-400 mt-2.5 shrink-0"></span>
                {{ learning }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>

    <!-- G. Footer -->
    <footer class="py-20 text-center">
      <BackButton />
    </footer>


  </div>
</template>

<style scoped>
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.animate-pulse-slow {
  animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.perspective-1000 {
  perspective: 1000px;
}

/* Lightbox Transition */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active img,
.lightbox-leave-active img {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.lightbox-enter-from img {
  transform: scale(0.9);
  opacity: 0;
}

.lightbox-leave-to img {
  transform: scale(0.9);
  opacity: 0;
}
</style>
