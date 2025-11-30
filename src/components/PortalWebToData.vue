<script setup>
import { onMounted, ref } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';
import { useUniverseState } from '@/composables/useUniverseState';

const { gsap, ScrollTrigger, createPortalTransition } = useScrollAnimation();
const { setDataActive } = useUniverseState();

const portalRef = ref(null);
const pixelContainerRef = ref(null);

onMounted(() => {
  // Use matchMedia for responsive animations
  ScrollTrigger.matchMedia({
    // Desktop animations (full pixel explosion)
    "(min-width: 1024px)": function() {
      const tl = createPortalTransition(portalRef.value, 'bg-slate-900', 'bg-slate-50', () => {
        setDataActive(true);
      });
      
      if (tl && pixelContainerRef.value) {
        const pixels = pixelContainerRef.value.querySelectorAll('.pixel');
        
        // Full pixel explosion effect
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
    },

    // Mobile animations (simplified and faster)
    "(max-width: 1023px)": function() {
      const tl = createPortalTransition(
        portalRef.value, 
        'bg-slate-900', 
        'bg-slate-50', 
        () => {
          setDataActive(true);
        },
        true // Mobile mode flag
      );
      
      if (tl && pixelContainerRef.value) {
        const pixels = pixelContainerRef.value.querySelectorAll('.pixel');
        
        // Simplified pixel effect for mobile (less movement, faster)
        tl.to(pixels, {
          x: () => (Math.random() - 0.5) * window.innerWidth * 0.5, // Less dispersion
          y: () => (Math.random() - 0.5) * window.innerHeight * 0.5,
          rotation: () => Math.random() * 180, // Less rotation
          scale: 0,
          opacity: 0,
          stagger: {
            amount: 0.5, // Faster stagger
            from: 'center',
          },
          duration: 0.8, // Much faster
          ease: 'power2.out', // Simpler easing
        }, '<');
      }
    }
  });
});
</script>

<template>
  <section ref="portalRef" class="w-full! max-w-none! h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
    <!-- Matrix/Pixel Container (fewer pixels on mobile) -->
    <div ref="pixelContainerRef" class="absolute inset-0 grid grid-cols-8 grid-rows-8 lg:grid-cols-12 lg:grid-rows-12 gap-1 pointer-events-none">
      <!-- Mobile: 64 pixels, Desktop: 144 pixels -->
      <div v-for="n in 64" :key="n" class="pixel bg-blue-500/30 w-full h-full rounded-sm lg:block" :class="{ 'hidden lg:block': n > 64 }"></div>
      <div v-for="n in 80" :key="`extra-${n}`" class="pixel bg-blue-500/30 w-full h-full rounded-sm hidden lg:block"></div>
    </div>

    <div class="z-10 text-center relative px-4">
      <h2 class="text-2xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
        PROCESSING DATA...
      </h2>
      <div class="w-16 lg:w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto rounded-full animate-pulse"></div>
    </div>
  </section>
</template>

<style scoped>
.pixel {
  transition: background-color 0.3s;
  will-change: transform, opacity;
}

/* Reduce pixel complexity on mobile */
@media (max-width: 1023px) {
  .pixel {
    background-color: rgba(59, 130, 246, 0.2); /* Lighter on mobile */
  }
}
</style>
