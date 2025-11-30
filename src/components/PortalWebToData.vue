<script setup>
import { onMounted, ref } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { createPortalTransition, gsap } = useScrollAnimation();
const portalRef = ref(null);
const pixelContainerRef = ref(null);

onMounted(() => {
  const tl = createPortalTransition(portalRef.value);
  
  if (tl) {
    // Transition from dark blue (Web) to white/light gray (Data)
    tl.to(portalRef.value, {
      backgroundColor: '#f8fafc', // Slate-50
      duration: 1,
    });

    // Matrix/Pixel effect
    if (pixelContainerRef.value) {
      const pixels = pixelContainerRef.value.querySelectorAll('.pixel');
      gsap.to(pixels, {
        scrollTrigger: {
          trigger: portalRef.value,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: (i) => Math.sin(i) * 100,
        x: (i) => Math.cos(i) * 100,
        opacity: 0,
        scale: 0,
        stagger: {
          amount: 1,
          from: 'center',
          grid: 'auto',
        },
      });
    }
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
