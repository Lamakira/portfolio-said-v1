<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import MailIcon from '@/assets/icons/mail.svg';
import LinkIcon from '@/assets/icons/link.svg';
import GithubIcon from '@/assets/icons/github.svg';
import MapPinIcon from '@/assets/icons/map-pin.svg';

const sectionRef = ref(null);
const contentRef = ref(null);

const contactInfo = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'said.arikama-chabi@epitech.eu',
    link: 'mailto:said.arikama-chabi@epitech.eu',
    ariaLabel: 'Envoyer un email à Saïd Arikama Chabi'
  },
  {
    icon: LinkIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/saïd-arikama-chabi',
    link: 'https://linkedin.com/in/saïd-arikama-chabi',
    ariaLabel: 'Visiter le profil LinkedIn de Saïd Arikama Chabi'
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/Lamakira',
    link: 'https://github.com/Lamakira',
    ariaLabel: 'Visiter le profil GitHub de Saïd Arikama Chabi'
  },
  {
    icon: MapPinIcon,
    label: 'Localisation',
    value: 'Bénin',
    link: null,
    ariaLabel: null
  }
];

onMounted(() => {
  gsap.matchMedia().add({
    "(min-width: 1024px)": () => {
      gsap.from(contentRef.value.children, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    },
    "(max-width: 1023px)": () => {
      gsap.from(contentRef.value.children, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  });
});
</script>

<template>
  <section ref="sectionRef" class="w-full py-20 px-6 relative overflow-hidden" style="background: linear-gradient(to bottom right, var(--bg-surface), var(--bg), var(--bg-surface));">
    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl" style="background-color: var(--primary); opacity: 0.1;"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl" style="background-color: var(--success); opacity: 0.1;"></div>

    <div ref="contentRef" class="container mx-auto max-w-4xl text-center relative z-10">
      
      <!-- Heading -->
      <h2 class="text-4xl md:text-5xl font-bold mb-6" style="color: var(--text-primary);">
        Travaillons ensemble
      </h2>

      <!-- Description -->
      <p class="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style="color: var(--text-secondary);">
        Vous recherchez un profil polyvalent capable de naviguer entre Web, Data et Réseau ?<br>
        Vous avez un projet, une mission ou une opportunité ? Je serais ravi d'en discuter.
      </p>

      <!-- CTA Button -->
      <a 
        href="mailto:said.arikama-chabi@epitech.eu"
        class="inline-block px-8 py-4 font-semibold rounded-xl transition-all duration-300 mb-12 hover:-translate-y-1"
        style="background-color: var(--primary); color: white; box-shadow: 0 10px 25px var(--glow);"
        aria-label="Envoyer un email pour me contacter"
      >
        Me contacter
      </a>

      <!-- Contact Info Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="info in contactInfo" 
          :key="info.label"
          class="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
        >
          <img 
            :src="info.icon" 
            :alt="`Icône ${info.label}`"
            :aria-label="info.label"
            class="w-6 h-6 mb-3 mx-auto text-blue-600"
          />
          <div class="text-sm font-semibold text-slate-900 mb-1">{{ info.label }}</div>
          <a 
            v-if="info.link" 
            :href="info.link"
            :aria-label="info.ariaLabel"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-blue-600 hover:text-blue-700 hover:underline break-words"
          >
            {{ info.value }}
          </a>
          <span v-else class="text-sm text-slate-600">{{ info.value }}</span>
        </div>
      </div>

    </div>
  </section>
</template>
