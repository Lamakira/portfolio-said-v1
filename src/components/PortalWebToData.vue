<script setup>
import { onMounted, ref } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';
import { useUniverseState } from '@/composables/useUniverseState';
import gsap from 'gsap';

const { createPortalTransition } = useScrollAnimation();
const { setDataActive } = useUniverseState();
const portalRef = ref(null);
const pixelContainerRef = ref(null);

onMounted(() => {
  const tl = createPortalTransition(portalRef.value, 'bg-slate-900', 'bg-slate-50', () => {
    setDataActive(true);
  });
  
  if (tl && pixelContainerRef.value) {
    const pixels = pixelContainerRef.value.querySelectorAll('.pixel');
    
    // Pixel explosion/reassembly effect
    // Pixel explosion effect (Dispersion)
    tl.to(pixels, {
      x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
      y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
      rotation: () => Math.random() * 360,
      scale: 0,
      opacity: 0,
      stagger: {
        amount: 1,
        from: 'center',
      },
      duration: 1.5,
      ease: 'power3.out',
    }, '<');
  }
});
</script>

<template>
  <section ref="portalRef" class="w-full! max-w-none! h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
    <!-- Matrix/Pixel Container -->
    <div ref="pixelContainerRef" class="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-1 pointer-events-none">
      <div v-for="n in 144" :key="n" class="pixel bg-blue-500/30 w-full h-full rounded-sm"></div>
    </div>

    <div class="z-10 text-center relative">
      <h2 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
        PROCESSING DATA...
      </h2>
      <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto rounded-full animate-pulse"></div>
    </div>
  </section>
</template>

<style scoped>
.pixel {
  transition: background-color 0.3s;
}
</style>
