<script setup>
import { onMounted, ref } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';
import { useUniverseState } from '@/composables/useUniverseState';

const { gsap, ScrollTrigger } = useScrollAnimation();
const { setWebActive } = useUniverseState();

const portalRef = ref(null);
const textRef = ref(null);
const scanlinesRef = ref(null);
const flashRef = ref(null);
const gridRef = ref(null);
const glassRef = ref(null);

onMounted(() => {
  // Use matchMedia for responsive animations
  ScrollTrigger.matchMedia({
    // Desktop animations (full complexity)
    "(min-width: 1024px)": function() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portalRef.value,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
          onLeave: () => {
            setWebActive(true);
          },
        },
      });

      // 1. Glitch & Distortion
      tl.to(textRef.value, {
        skewX: 20,
        scale: 1.1,
        opacity: 0.8,
        textShadow: '5px 0px 0px #00ff00, -5px 0px 0px #ff00ff',
        duration: 0.3,
        ease: 'power4.inOut',
      })
      .to(textRef.value, {
        skewX: -20,
        scale: 0.9,
        opacity: 0.5,
        textShadow: '-5px 0px 0px #00ff00, 5px 0px 0px #ff00ff',
        duration: 0.2,
        ease: 'steps(5)',
      }, '<0.1');

      // 2. Scanlines Intensify
      tl.to(scanlinesRef.value, {
        opacity: 1,
        backgroundSize: '100% 2px',
        duration: 0.3,
        ease: 'none',
      }, '<');

      // 3. Green Flash
      tl.to(flashRef.value, {
        opacity: 1,
        duration: 0.1,
        ease: 'power4.in',
      }, '>');

      // 4. Clear Terminal
      tl.set(portalRef.value, { backgroundColor: 'transparent' }, '>');
      tl.set(textRef.value, { opacity: 0 }, '<');
      tl.set(scanlinesRef.value, { opacity: 0 }, '<');

      // 5. Flash Fade Out
      tl.to(flashRef.value, {
        opacity: 0,
        duration: 0.2,
        ease: 'power4.out',
      });

      // 6. Grid Appearance
      tl.to(gridRef.value, {
        opacity: 0.4,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.1');

      // 7. Glassmorphism Morph
      tl.to(glassRef.value, {
        opacity: 1,
        backdropFilter: 'blur(10px)',
        duration: 0.4,
        ease: 'power2.inOut',
      }, '<');
    },

    // Mobile animations (simplified and faster)
    "(max-width: 1023px)": function() {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: portalRef.value,
          start: 'top top',
          end: '+=80%', // Shorter scroll distance
          pin: true,
          scrub: 0.3, // Faster response
          onLeave: () => {
            setWebActive(true);
          },
        },
      });

      // 1. Simple glitch (reduced complexity)
      tl.to(textRef.value, {
        skewX: 10, // Less extreme
        scale: 1.05,
        opacity: 0.7,
        textShadow: '3px 0px 0px #00ff00, -3px 0px 0px #ff00ff', // Lighter
        duration: 0.2,
        ease: 'power2.inOut',
      });

      // 2. Light scanlines (less intense)
      tl.to(scanlinesRef.value, {
        opacity: 0.6, // Less visible
        duration: 0.2,
        ease: 'none',
      }, '<');

      // 3. Quick flash
      tl.to(flashRef.value, {
        opacity: 0.8, // Less intense
        duration: 0.08,
        ease: 'power2.in',
      }, '>');

      // 4. Clear terminal
      tl.set(portalRef.value, { backgroundColor: 'transparent' }, '>');
      tl.set(textRef.value, { opacity: 0 }, '<');
      tl.set(scanlinesRef.value, { opacity: 0 }, '<');

      // 5. Flash fade
      tl.to(flashRef.value, {
        opacity: 0,
        duration: 0.15,
        ease: 'power2.out',
      });

      // 6. Simple grid reveal (no scale)
      tl.to(gridRef.value, {
        opacity: 0.3,
        duration: 0.2,
        ease: 'power2.out',
      }, '-=0.05');

      // 7. Light glass overlay (no blur on mobile for performance)
      tl.to(glassRef.value, {
        opacity: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      }, '<');
    }
  });
});
</script>

<template>
  <section ref="portalRef" class="w-full! max-w-none! h-screen flex items-center justify-center bg-black relative overflow-hidden">
    
    <!-- 1. Base Terminal Grid (fades out) -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

    <!-- 2. Glitch Text -->
    <div class="z-10 text-center px-4">
      <h2 ref="textRef" class="text-2xl md:text-4xl lg:text-6xl font-bold text-white font-mono tracking-widest glitch-text">
        INITIALIZING WEB PROTOCOLS...
      </h2>
    </div>

    <!-- 3. Scanlines Overlay (lighter on mobile) -->
    <div ref="scanlinesRef" class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-50"></div>

    <!-- 4. Green Flash Overlay -->
    <div ref="flashRef" class="absolute inset-0 bg-green-500 pointer-events-none opacity-0 z-50 mix-blend-hard-light"></div>

    <!-- 5. Luminous Grid (Web Universe) -->
    <div ref="gridRef" class="absolute inset-0 bg-[linear-gradient(to_right,#a855f720_1px,transparent_1px),linear-gradient(to_bottom,#a855f720_1px,transparent_1px)] bg-[size:40px_40px] opacity-0 lg:scale-150 pointer-events-none z-20"></div>

    <!-- 6. Glassmorphism Overlay (no blur on mobile) -->
    <div ref="glassRef" class="absolute inset-0 bg-slate-900/90 opacity-0 z-30 pointer-events-none transition-all"></div>

  </section>
</template>

<style scoped>
.glitch-text {
  position: relative;
  will-change: transform, opacity, text-shadow;
}
</style>
