<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dataProjects } from '@/data/dataProjects';
import { gsap } from 'gsap';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const router = useRouter();

const project = computed(() => 
  dataProjects.find(p => p.slug === route.params.slug)
);

const heroRef = ref(null);
const contentRef = ref(null);
const modalOpen = ref(false);
const modalImage = ref('');

const openModal = (image) => {
  modalImage.value = image;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  modalOpen.value = false;
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  
  if (!project.value) {
    router.push('/');
    return;
  }
  
  const tl = gsap.timeline({ delay: 0.2 });
  
  if (heroRef.value) {
    tl.from(heroRef.value.children, {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
  
  if (contentRef.value) {
    tl.from(contentRef.value.children, {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.4');
  }
});

watch(() => route.params.slug, () => {
  window.scrollTo({ top: 0, behavior: 'instant' });
});
</script>

<template>
  <div v-if="project" class="min-h-screen bg-white">
    
    <!-- Grid Pattern Background -->
    <div class="fixed inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none"></div>

    <!-- Hero Banner -->
    <section class="relative py-16 md:py-24 px-6 bg-gradient-to-b from-[#F5F7FA] to-white border-b border-gray-200">
      <div ref="heroRef" class="container mx-auto max-w-5xl text-center relative z-10">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1A2F] mb-6 leading-tight">
          {{ project.title }}
        </h1>
        <div class="flex flex-wrap justify-center gap-2 mb-6">
          <span 
            v-for="(tag, index) in project.tags" 
            :key="tag"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-full',
              index < 3 ? 'bg-blue-50 text-[#3B82F6] border border-blue-200' : 'bg-gray-50 text-[#4B5563] border border-gray-200'
            ]"
          >
            {{ tag }}
          </span>
        </div>
        <!-- Back Button -->
        <div class="mt-6">
          <BackButton />
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div ref="contentRef" class="container mx-auto max-w-6xl px-6 py-16 space-y-16 relative z-10">
      
      <!-- Summary -->
      <section class="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
        <h2 class="text-3xl font-bold text-[#0A1A2F] mb-6">À propos du projet</h2>
        <p class="text-lg text-[#4B5563] leading-relaxed whitespace-pre-line">
          {{ project.summary }}
        </p>
      </section>

      <!-- Gallery -->
      <section v-if="project.gallery && project.gallery.length > 0">
        <h2 class="text-3xl font-bold text-[#0A1A2F] mb-8 text-center">Galerie</h2>
        <div :class="[
          'grid gap-6',
          project.gallery.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        ]">
          <div 
            v-for="(image, index) in project.gallery" 
            :key="index"
            class="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
            @click="openModal(image)"
          >
            <div class="aspect-video bg-gradient-to-br from-[#F5F7FA] to-white flex items-center justify-center p-4">
              <img 
                :src="image" 
                :alt="`${project.title} - Image ${index + 1}`"
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- Steps -->
      <section v-if="project.steps && project.steps.length > 0">
        <h2 class="text-3xl font-bold text-[#0A1A2F] mb-8 text-center">Étapes du Projet</h2>
        <div class="space-y-6">
          <div 
            v-for="(step, index) in project.steps" 
            :key="index"
            class="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-[#3B82F6] text-white flex items-center justify-center font-bold text-lg">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-[#0A1A2F] mb-3">{{ step.title }}</h3>
                <p class="text-[#4B5563] leading-relaxed">{{ step.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Links -->
      <section class="bg-gradient-to-r from-[#F5F7FA] to-white rounded-2xl p-8 md:p-12 border border-gray-100">
        <h2 class="text-2xl font-bold text-[#0A1A2F] mb-6 text-center">Ressources</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            v-if="project.github && project.github !== '#'" 
            :href="project.github" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-8 py-3 bg-[#0A1A2F] hover:bg-[#1a2a3f] text-white rounded-xl font-semibold text-center transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Voir sur GitHub
          </a>
          <a 
            v-if="project.link" 
            :href="project.link" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563eb] text-white rounded-xl font-semibold text-center transition-colors shadow-sm"
          >
            Accéder au Projet
          </a>
        </div>
      </section>

      <!-- Back Button -->
      <div class="text-center pt-8">
        <BackButton />
      </div>
    </div>

    <!-- Image Modal -->
    <Transition name="modal">
      <div 
        v-if="modalOpen"
        class="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <button 
          class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          @click="closeModal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <img 
          :src="modalImage" 
          alt="Zoom"
          class="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active img,
.modal-leave-active img {
  transition: transform 0.3s ease;
}

.modal-enter-from img {
  transform: scale(0.9);
}

.modal-leave-to img {
  transform: scale(0.9);
}
</style>
