<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <router-link 
    :to="`/data/${project.slug}`"
    class="group block bg-white rounded-2xl shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100"
  >
    <!-- Cover Image -->
    <div class="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-[#F5F7FA] to-white">
      <img 
        :src="project.cover" 
        :alt="project.title"
        class="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>

    <!-- Content -->
    <div class="p-6 md:p-8">
      <!-- Title -->
      <h3 class="text-xl md:text-2xl font-bold text-[#0A1A2F] mb-4 group-hover:text-[#3B82F6] transition-colors leading-tight">
        {{ project.title }}
      </h3>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="(tag, index) in project.tags.slice(0, 5)" 
          :key="tag"
          :class="[
            'px-3 py-1.5 text-xs font-medium rounded-full',
            index < 3 ? 'bg-blue-50 text-[#3B82F6] border border-blue-200' : 'bg-gray-50 text-[#4B5563] border border-gray-200'
          ]"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Description -->
      <p class="text-[#4B5563] text-sm md:text-base leading-relaxed mb-6 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- CTA -->
      <div class="flex items-center text-[#3B82F6] font-semibold text-sm md:text-base group-hover:text-[#0A1A2F] transition-colors">
        Voir le projet
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
