<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { gsap } from 'gsap';
import photoUrl from '@/assets/images/me.jpg';

const heroRef = ref(null);
const photoRef = ref(null);
const contentRef = ref(null);
const scrollCtaRef = ref(null);

onMounted(() => {
  // Subtle Photo Floating Animation
  gsap.to(photoRef.value, {
    y: 10,
    duration: 3,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });

  // Entrance Timeline - Subtle
  const tl = gsap.timeline({ delay: 0.2 });
  
  tl.from(photoRef.value, {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })
  .from(contentRef.value.children, {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')
  .from(scrollCtaRef.value, {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  }, '-=0.3');
  
  // Subtle pulsation for scroll CTA
  gsap.to(scrollCtaRef.value, {
    opacity: 0.7,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut'
  });
});
</script>

<template>
  <section ref="heroRef" class="relative w-full max-w-none min-h-screen flex flex-col justify-between overflow-hidden py-12 md:py-0" style="background-color: var(--bg-surface);">
    
    <!-- Subtle Background -->
    <div class="absolute inset-0" style="background: linear-gradient(to bottom right, var(--bg-surface), var(--bg), var(--bg-surface));"></div>
    <div class="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" style="background-color: var(--primary); opacity: 0.05;"></div>
    <div class="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" style="background-color: var(--accent); opacity: 0.05;"></div>

    <!-- Main Content - Photo Left, Text Right (Top Section) -->
    <div class="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 flex-grow md:flex-grow-0 md:my-auto">
      
      <!-- Photo - Left Side -->
      <div class="flex-shrink-0">
        <div ref="photoRef" class="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px]">
          <!-- Subtle Glow -->
          <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          
          <!-- Photo Circle -->
          <div class="relative w-full h-full rounded-full overflow-hidden border-2 border-blue-400/30 shadow-2xl">
            <img 
              :src="photoUrl" 
              alt="Saïd ARIKAMA CHABI" 
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Text Content - Right Side -->
      <div ref="contentRef" class="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl">
        
        <!-- Name -->
        <h1 ref="titleRef" class="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight leading-tight">
          <span style="color: var(--text-primary);">Saïd</span> <span style="color: var(--primary);">ARIKAMA CHABI</span>
        </h1>
        
        <!-- Subtitle -->
        <h2 class="text-lg md:text-xl lg:text-2xl text-teal-400 font-light mb-6">
          Data Analyst & Développeur Web / Administrateur Réseau
        </h2>
        
        <!-- Description -->
        <p ref="subtitleRef" class="text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed" style="color: var(--text-secondary);">
          Passionné par l'ingénierie logicielle, l'analyse de données et l'infrastructure réseau, je conçois des solutions qui connectent, transforment et donnent vie aux expériences numériques.
        </p>
        
        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 items-center mb-8 md:mb-0">
          <a 
            :href="resumeData.assets.cvUrl" 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Télécharger le CV de Saïd Arikama Chabi"
            class="px-8 py-3 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Télécharger mon CV
          </a>
          
          <div class="flex gap-4">
            <a :href="resumeData.contact.github" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
            </a>
            <a :href="resumeData.contact.linkedin" target="_blank" rel="noopener noreferrer" class="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
              <span class="sr-only">LinkedIn</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Section: Scroll CTA + Arrow (Always at Bottom) -->
    <div class="relative z-10 flex flex-col items-center gap-6 pb-8 md:pb-10">
      <!-- Scroll Call-to-Action -->
      <div class="w-full max-w-4xl px-6">
        <p ref="scrollCtaRef" class="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-center text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.5)] leading-relaxed">
          💬 Explorez les trois piliers de mon savoir-faire : l'ingénierie réseau, le développement web et l'analyse de données.
        </p>
      </div>

      <!-- Scroll Indicator -->
      <div class="animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 2s ease-in-out infinite;
}
</style>
