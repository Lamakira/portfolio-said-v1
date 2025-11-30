<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { useScrollAnimation } from '@/composables/useScrollAnimation';
import { useUniverseState } from '@/composables/useUniverseState';

const { createScene, gsap } = useScrollAnimation();
const { state } = useUniverseState();
const sectionRef = ref(null);
const cardsRef = ref(null);
const orbRef = ref(null);
const titleRef = ref(null);
const descRef = ref(null);
const skillsRef = ref(null);
const techStackRef = ref(null);
const eduRef = ref(null);

const projects = resumeData.projects.web;
const skills = resumeData.skills.web;

// ... (Tilt Logic remains same)

onMounted(() => {
  // Use matchMedia for responsive animation durations
  gsap.matchMedia().add({
    // Desktop animations (full duration)
    "(min-width: 1024px)": () => {
      const tl = createScene(sectionRef.value, {
        start: 'top center',
        end: 'bottom bottom',
      });

      if (tl) {
        tl.from(titleRef.value, { y: 50, opacity: 0, duration: 1, ease: 'power3.out' })
          .from(descRef.value, { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
          .from(orbRef.value, { scale: 0, opacity: 0, rotation: -180, duration: 1.2, ease: 'back.out(1.7)' }, '-=0.6')
          .from(techStackRef.value.children, { 
            y: 30, 
            opacity: 0, 
            stagger: 0.2, 
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.4')
          .from(cardsRef.value.children, {
            y: 100,
            opacity: 0,
            rotationX: 15,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
          }, '-=0.2')
          .from(eduRef.value, { y: 50, opacity: 0, duration: 1 }, '-=0.8');
      }
    },

    // Mobile animations (faster, 50% duration reduction)
    "(max-width: 1023px)": () => {
      const tl = createScene(sectionRef.value, {
        start: 'top center',
        end: 'bottom bottom',
      });

      if (tl) {
        tl.from(titleRef.value, { y: 30, opacity: 0, duration: 0.5, ease: 'power2.out' })
          .from(descRef.value, { y: 20, opacity: 0, duration: 0.4 }, '-=0.3')
          .from(orbRef.value, { scale: 0, opacity: 0, rotation: -90, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.3')
          .from(techStackRef.value.children, { 
            y: 20, 
            opacity: 0, 
            stagger: 0.1, 
            duration: 0.4,
            ease: 'power2.out'
          }, '-=0.2')
          .from(cardsRef.value.children, {
            y: 50,
            opacity: 0,
            rotationX: 0, // No 3D rotation on mobile
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
          }, '-=0.15')
          .from(eduRef.value, { y: 30, opacity: 0, duration: 0.5 }, '-=0.4');
      }
    }
  });
});
</script>

<template>
  <section 
    ref="sectionRef" 
    class="relative w-full py-32 px-6 overflow-hidden" style="background-color: var(--bg-surface);"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- 1. Futuristic Grid Background -->
    <div class="absolute inset-0 pointer-events-none perspective-grid">
      <div class="grid-lines"></div>
    </div>

    <!-- 2. Glow Halos -->
    <div class="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-slow pointer-events-none" style="background-color: var(--accent); opacity: 0.15;"></div>
    <div class="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow delay-1000 pointer-events-none" style="background-color: var(--primary); opacity: 0.12;"></div>

    <!-- 3. Web Particles -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="n in 20" :key="n" 
           class="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
           :style="{ 
             top: Math.random() * 100 + '%', 
             left: Math.random() * 100 + '%', 
             animationDelay: Math.random() * 5 + 's',
             animationDuration: (Math.random() * 10 + 10) + 's'
           }">
      </div>
    </div>

    <div class="container mx-auto relative z-10">
      
      <!-- Header -->
      <div class="text-center">
        <!-- Title -->
        <h2 ref="titleRef" class="text-5xl md:text-6xl font-bold mb-8 text-center" style="color: var(--text-primary);">
          Univers <span style="color: var(--primary);">Web</span>
        </h2>
        <div ref="descRef" class="max-w-3xl mx-auto min-h-[80px]">
          <transition name="fade-slide">
            <p v-if="state.isWebActive" class="text-xl font-light leading-relaxed whitespace-pre-line p-6 rounded-xl border-l-4" 
               style="color: var(--text-secondary); background-color: var(--bg-surface); border-color: var(--primary); box-shadow: 0 4px 12px var(--shadow);">
              {{ resumeData.universes.web }}
            </p>
          </transition>
        </div>
      </div>

      <!-- Main Illustration: Glass Code Orb -->
      <div ref="orbRef" class="flex justify-center mb-20 relative">
        <div class="w-64 h-64 relative">
          <!-- Outer Glow -->
          <div class="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
          
          <!-- Glass Sphere -->
          <div class="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)] overflow-hidden flex items-center justify-center group">
            <!-- Inner Rings -->
            <svg class="w-full h-full absolute animate-spin-slow opacity-30" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="0.5" class="text-purple-300" stroke-dasharray="10 5" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="0.5" class="text-blue-300" stroke-dasharray="5 5" />
            </svg>
            
            <!-- Code Particles -->
            <div class="text-center space-y-2 opacity-80 font-mono text-xs text-purple-200">
              <div class="animate-code-float">&lt;Vue /&gt;</div>
              <div class="animate-code-float delay-100">{ API }</div>
              <div class="animate-code-float delay-200">Laravel</div>
            </div>
            
            <!-- Shine -->
            <div class="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full"></div>
          </div>
        </div>
      </div>

      <!-- Skills (Legacy - Hidden or Removed if redundant, keeping for safety but Tech Stack replaces it visually) -->
      <!-- <div ref="skillsRef" ... > ... </div> -->

      <!-- Premium Tech Stack Section -->
      <div ref="techStackRef" class="mb-32 relative z-20">
        <h3 class="text-3xl font-bold text-white mb-12 text-center">
          <span class="border-b-2 border-purple-500/50 pb-2">Technologies & Outils</span>
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Frontend Panel -->
          <div class="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/30 transition-colors group">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white">Frontend & UI</h4>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="tech in resumeData.techStack.web.frontend" :key="tech" 
                   class="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-300 text-center hover:bg-purple-500/20 hover:text-white hover:border-purple-500/50 transition-all cursor-default">
                {{ tech }}
              </div>
            </div>
          </div>

          <!-- Backend Panel -->
          <div class="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-blue-500/30 transition-colors group">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white">Backend & Arch</h4>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="tech in resumeData.techStack.web.backend" :key="tech" 
                   class="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-300 text-center hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 transition-all cursor-default">
                {{ tech }}
              </div>
            </div>
          </div>

          <!-- Tools Panel -->
          <div class="glass-panel p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl hover:border-green-500/30 transition-colors group">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 class="text-xl font-bold text-white">Tools & Workflow</h4>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="tech in resumeData.techStack.web.tools" :key="tech" 
                   class="px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-sm text-slate-300 text-center hover:bg-green-500/20 hover:text-white hover:border-green-500/50 transition-all cursor-default">
                {{ tech }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projects Grid -->
      <h3 class="text-3xl font-bold text-white mb-10 border-b border-purple-500/30 pb-4 inline-block">Projets</h3>
      <div ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        <div v-for="(project, index) in projects" :key="index" class="project-card group relative h-full">
          <!-- Glow Effect on Hover -->
          <div class="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style="background: linear-gradient(to bottom right, var(--accent), var(--primary)); opacity: 0.1;"></div>
          
          <div class="relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 overflow-hidden"
               style="background-color: var(--bg-surface); border: 1px solid var(--glass-border); box-shadow: 0 4px 12px var(--shadow);">
            
            <!-- Shimmer Effect -->
            <div class="shimmer absolute w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style="background-color: var(--primary); opacity: 0.05;"></div>

            <h3 class="text-2xl font-bold mb-3 group-hover:opacity-80 transition-colors relative z-10" style="color: var(--text-primary);">{{ project.title }}</h3>
            <p class="mb-6 flex-grow leading-relaxed relative z-10" style="color: var(--text-secondary);">{{ project.description }}</p>
            
            <div class="flex flex-wrap gap-2 mb-6 relative z-10">
              <span v-for="tech in project.tech" :key="tech" class="text-xs font-mono px-3 py-1 rounded" style="color: var(--primary); background-color: var(--glass); border: 1px solid var(--glass-border);">
                {{ tech }}
              </span>
            </div>

            <router-link 
              :to="{ path: `/project/${project.slug}`, query: { from: 'web' } }"
              class="inline-flex items-center gap-2 font-semibold group/link relative z-10 transition-colors"
              style="color: var(--primary);"
            >
              Voir le projet
              <svg class="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Education & Certifications -->
      <div ref="eduRef" class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Education -->
        <div class="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span class="w-2 h-8 bg-purple-500 rounded-full"></span>
            Education
          </h3>
          <div class="space-y-6">
            <div v-for="(edu, index) in resumeData.education.web" :key="index" class="group">
              <div class="text-purple-300 font-bold text-xl mb-1 group-hover:text-purple-200 transition-colors">{{ edu.degree }}</div>
              <div class="text-white text-lg">{{ edu.school }}</div>
              <div class="text-sm text-slate-400 mt-2 font-mono bg-slate-800/50 inline-block px-2 py-1 rounded">{{ edu.year }}</div>
            </div>
          </div>
        </div>

        <!-- Certifications -->
        <div class="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm">
          <h3 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span class="w-2 h-8 bg-blue-500 rounded-full"></span>
            Certifications
          </h3>
          <div class="space-y-6">
            <div v-for="(cert, index) in resumeData.certifications.web" :key="index" 
                 class="flex items-center gap-6 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-purple-500/30 transition-all group cursor-pointer">
              <div class="relative">
                <div class="absolute inset-0 bg-purple-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <img :src="cert.image" alt="Certification Badge" class="w-20 h-20 object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <div class="text-purple-300 font-bold text-lg leading-tight mb-1">{{ cert.title }}</div>
                <div class="text-slate-400 text-sm">{{ cert.issuer }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.perspective-container {
  perspective: 2000px;
}

.perspective-grid {
  transform: rotateX(60deg) scale(2);
  transform-origin: top center;
  opacity: 0.3;
}

.grid-lines {
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}

.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.project-card {
  transform-style: preserve-3d;
  will-change: transform;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 10s ease-in-out infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes code-float {
  0%, 100% { transform: translateY(0); opacity: 0.8; }
  50% { transform: translateY(-5px); opacity: 0.4; }
}

.animate-code-float {
  animation: code-float 3s ease-in-out infinite;
}

@keyframes shimmer {
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 300%;
  animation: gradient 8s ease infinite;
}

.bg-300\% {
  background-size: 300%;
}

.animate-pulse-slow {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Transition Styles */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.8s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
