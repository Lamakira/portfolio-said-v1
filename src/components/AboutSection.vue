<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import GoalIcon from '@/assets/icons/goal.svg';
import BrainIcon from '@/assets/icons/brain.svg';
import WrenchIcon from '@/assets/icons/wrench.svg';
import RocketIcon from '@/assets/icons/rocket.svg';

const sectionRef = ref(null);
const bioRef = ref(null);
const valuesRef = ref(null);

const values = [
  {
    icon: GoalIcon,
    title: 'Précision',
    description: 'Je cherche toujours à comprendre en profondeur.'
  },
  {
    icon: BrainIcon,
    title: 'Analyse',
    description: 'Je résous les problèmes par la logique et la stratégie.'
  },
  {
    icon: WrenchIcon,
    title: 'Polyvalence',
    description: 'Dev, Data, Infra : je navigue naturellement entre les couches.'
  },
  {
    icon: RocketIcon,
    title: 'Curiosité',
    description: 'J\'apprends vite, j\'expérimente, je m\'adapte.'
  }
];

onMounted(() => {
  // Fade-up animations on scroll
  gsap.matchMedia().add({
    // Desktop
    "(min-width: 1024px)": () => {
      gsap.from(bioRef.value, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });

      gsap.from(valuesRef.value.children, {
        scrollTrigger: {
          trigger: valuesRef.value,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out'
      });
    },
    // Mobile (faster)
    "(max-width: 1023px)": () => {
      gsap.from(bioRef.value, {
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      });

      gsap.from(valuesRef.value.children, {
        scrollTrigger: {
          trigger: valuesRef.value,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out'
      });
    }
  });
});
</script>

<template>
  <section ref="sectionRef" class="w-full bg-white py-20 px-6 relative">
    <div class="container mx-auto max-w-6xl">
      
      <!-- Heading -->
      <h2 class="text-4xl md:text-5xl font-bold text-slate-900 mb-16 text-center">
        À propos de moi
      </h2>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        <!-- Bio -->
        <div ref="bioRef" class="space-y-6">
          <p class="text-lg text-slate-700 leading-relaxed">
            Je suis <span class="font-semibold text-slate-900">Saïd Arikama Chabi</span>, un ingénieur polyvalent à la croisée de trois mondes : l'infrastructure réseau, le développement web, et l'analyse de données & IA.
          </p>
          <p class="text-lg text-slate-700 leading-relaxed">
            Ce qui me motive : <span class="font-semibold text-blue-600">comprendre, créer, optimiser</span> — transformer les systèmes, les interfaces et les données en solutions concrètes.
          </p>
          <p class="text-lg text-slate-700 leading-relaxed">
            Curieux, rigoureux et passionné, j'aime autant explorer les couches invisibles d'une architecture que concevoir de belles expériences visibles par l'utilisateur.
          </p>
          <p class="text-lg text-slate-700 leading-relaxed">
            Aujourd'hui, je cherche à collaborer sur des projets où <span class="font-semibold text-slate-900">technologie, logique et créativité</span> se rencontrent pour créer de la valeur.
          </p>
        </div>

        <!-- Values -->
        <div>
          <h3 class="text-2xl font-bold text-slate-900 mb-8">Mes valeurs</h3>
          <div ref="valuesRef" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div 
              v-for="value in values" 
              :key="value.title"
              class="bg-gradient-to-br from-slate-50 to-white p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
            >
              <img 
                :src="value.icon" 
                :alt="`Icône ${value.title}`"
                class="w-8 h-8 mb-3 text-slate-700"
                aria-hidden="true"
              />
              <h4 class="text-lg font-bold text-slate-900 mb-2">{{ value.title }}</h4>
              <p class="text-sm text-slate-600 leading-relaxed">{{ value.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
