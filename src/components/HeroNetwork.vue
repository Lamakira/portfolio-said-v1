<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { createScene } = useScrollAnimation();
const sectionRef = ref(null);
const terminalRef = ref(null);

const experiences = resumeData.experiences.network;
const skills = resumeData.skills.network;

onMounted(() => {
  // Create a timeline that reveals the terminal lines one by one
  const tl = createScene(sectionRef.value, {
    start: 'top center',
    end: 'bottom bottom',
  });

  if (tl && terminalRef.value) {
    const lines = terminalRef.value.querySelectorAll('.terminal-line');
    tl.from(lines, {
      opacity: 0,
      x: -20,
      stagger: 0.5,
      duration: 1,
      ease: 'power2.out',
    });
  }
});
</script>

<template>
  <section ref="sectionRef" class="w-full! max-w-none! min-h-screen bg-black text-green-500 font-mono p-8 flex items-center justify-center relative overflow-hidden">
    <!-- CRT Scanline Effect -->
    <div class="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
    
    <!-- Terminal Container -->
    <div ref="terminalRef" class="w-full max-w-4xl border border-green-800 bg-black/90 p-6 rounded shadow-[0_0_20px_rgba(0,255,0,0.2)] z-20">
      <div class="flex gap-2 mb-4 border-b border-green-900 pb-2">
        <div class="w-3 h-3 rounded-full bg-red-500"></div>
        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div class="w-3 h-3 rounded-full bg-green-500"></div>
        <span class="ml-2 text-xs text-green-700">root@portfolio:~</span>
      </div>

      <div class="space-y-4">
        <!-- Universe Description -->
        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">echo $UNIVERSE_DESC</span>
          <div class="pl-4 mt-1 text-green-100 italic opacity-90">
            "{{ resumeData.universeDescriptions.network }}"
          </div>
        </div>

        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">whoami</span>
          <div class="pl-4 mt-1 text-green-100">
            {{ resumeData.profile.name }}<br>
            {{ resumeData.profile.title }}
          </div>
        </div>

        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">cat skills.txt</span>
          <div class="pl-4 mt-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-green-100">
            <span v-for="skill in skills" :key="skill" class="bg-green-900/30 px-2 py-1 rounded border border-green-800/50">
              {{ skill }}
            </span>
          </div>
        </div>

        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">cat education.txt</span>
          <div class="pl-4 mt-1 space-y-2 text-green-100">
            <div v-for="(edu, index) in resumeData.education.network" :key="index">
              <span class="text-green-400 font-bold">{{ edu.degree }}</span>
              <span class="text-green-600"> @ {{ edu.school }}</span>
              <span class="text-green-700 text-sm ml-2">[{{ edu.year }}]</span>
            </div>
          </div>
        </div>

        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">cat experience.log</span>
          <div class="pl-4 mt-1 space-y-4 text-green-100">
            <div v-for="(exp, index) in experiences" :key="index" class="border-l-2 border-green-700 pl-4">
              <div class="font-bold text-green-400">{{ exp.role }} @ {{ exp.company }}</div>
              <div class="text-sm text-green-600">{{ exp.period }}</div>
              <p class="text-sm mt-1 opacity-80">{{ exp.description }}</p>
            </div>
          </div>
        </div>

        <div class="terminal-line">
          <span class="text-green-300">➜</span> <span class="text-blue-400">~</span> <span class="text-yellow-300">./init_web_universe.sh</span>
          <div class="pl-4 mt-1 animate-pulse">
            Loading Web Module... <span class="inline-block w-2 h-4 bg-green-500 ml-1 animate-ping"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add a slight flicker animation to the text */
@keyframes flicker {
  0% { opacity: 0.9; }
  50% { opacity: 1; }
  100% { opacity: 0.95; }
}
.terminal-line {
  animation: flicker 0.1s infinite;
}
</style>
