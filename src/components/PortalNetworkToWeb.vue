<script setup>
import { onMounted, ref } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { createPortalTransition, gsap } = useScrollAnimation();
const portalRef = ref(null);
const textRef = ref(null);

onMounted(() => {
  const tl = createPortalTransition(portalRef.value);
  
  if (tl) {
    // Transition from black (Network) to dark blue/purple (Web)
    tl.to(portalRef.value, {
      backgroundColor: '#0f172a', // Slate-900
      duration: 1,
    });

    // Glitch effect on text
    gsap.to(textRef.value, {
      scrollTrigger: {
        trigger: portalRef.value,
        start: 'top center',
        end: 'center center',
        scrub: true,
      },
      textShadow: '2px 2px 0px #00ff00, -2px -2px 0px #ff00ff',
      scale: 1.1,
      opacity: 0,
    });
  }
});
</script>

<template>
  <section ref="portalRef" class="w-full! max-w-none! h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <!-- Grid Effect -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    
    <!-- Glitch Text -->
    <div class="z-10 text-center">
      <h2 ref="textRef" class="text-4xl md:text-6xl font-bold text-white font-mono tracking-widest glitch-text">
        INITIALIZING WEB PROTOCOLS...
      </h2>
    </div>

    <!-- Scanline Overlay -->
    <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50"></div>
  </section>
</template>

<style scoped>
.glitch-text {
  position: relative;
}
</style>
