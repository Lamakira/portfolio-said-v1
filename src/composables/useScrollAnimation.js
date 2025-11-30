import { onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation() {
  const triggers = [];

  // Animate an element when it enters the viewport
  const animateOnEnter = (element, vars = {}) => {
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 50, ...vars.from },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', ...vars.to }
        );
      },
      once: true, // Only animate once
    });
    triggers.push(trigger);
  };

  // Create a complex scene with a timeline
  const createScene = (triggerElement, timelineVars = {}) => {
    if (!triggerElement) return null;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        ...timelineVars,
      },
    });
    
    // We don't push timeline triggers to the array because they are managed by the timeline itself usually,
    // but if we need cleanup we might want to track the ScrollTrigger instance if accessible.
    // For simplicity, we'll rely on GSAP's global cleanup or return the timeline for manual control.
    return tl;
  };

  // Create a portal transition effect
  const createPortalTransition = (container, fromClass, toClass) => {
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Example transition logic (customizable)
    tl.to(container, {
      backgroundColor: '#000', // Example
      duration: 1,
    });

    return tl;
  };

  // Cleanup all triggers when component is unmounted
  onUnmounted(() => {
    triggers.forEach((t) => t.kill());
    ScrollTrigger.getAll().forEach(t => t.kill()); // Be careful with this if multiple components use it
  });

  return {
    gsap,
    ScrollTrigger,
    animateOnEnter,
    createScene,
    createPortalTransition,
  };
}
