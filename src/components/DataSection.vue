<script setup>
import { onMounted, ref } from 'vue';
import { resumeData } from '@/data/resumeData';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { createScene } = useScrollAnimation();
const sectionRef = ref(null);
const chartRef = ref(null);

const projects = resumeData.projects.data;
const skills = resumeData.skills.data;

onMounted(() => {
  const tl = createScene(sectionRef.value, {
    start: 'top center',
    end: 'bottom bottom',
  });

  if (tl && chartRef.value) {
    const bars = chartRef.value.querySelectorAll('.chart-bar');
    tl.from(bars, {
      scaleY: 0,
      transformOrigin: 'bottom',
      stagger: 0.1,
      duration: 1,
      ease: 'power4.out',
    });
  }
});
</script>

<template>
  <section ref="sectionRef" class="w-full! max-w-none! min-h-screen bg-slate-50 text-slate-800 py-20 px-6 relative overflow-hidden">
    <!-- Grid Background -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 pointer-events-none"></div>

    <div class="container mx-auto relative z-10">
      <h2 class="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 tracking-tight">
        Data & Intelligence
      </h2>

      <!-- Universe Description -->
      <div class="max-w-3xl mx-auto text-center mb-12">
        <p class="text-lg text-slate-600 italic border-l-4 border-blue-500 pl-4 inline-block text-left">
          "{{ resumeData.universeDescriptions.data }}"
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Visualization -->
        <div ref="chartRef" class="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 h-96 flex items-end justify-around gap-4">
          <div class="chart-bar w-full bg-blue-500 rounded-t-lg opacity-80" style="height: 40%"></div>
          <div class="chart-bar w-full bg-blue-600 rounded-t-lg opacity-80" style="height: 70%"></div>
          <div class="chart-bar w-full bg-blue-400 rounded-t-lg opacity-80" style="height: 50%"></div>
          <div class="chart-bar w-full bg-indigo-500 rounded-t-lg opacity-80" style="height: 85%"></div>
          <div class="chart-bar w-full bg-indigo-600 rounded-t-lg opacity-80" style="height: 60%"></div>
        </div>

        <!-- Content -->
        <div>
          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-4 text-blue-600">Formation</h3>
            <div class="space-y-3">
              <div v-for="(edu, index) in resumeData.education.data" :key="index" class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div class="font-bold text-slate-800">{{ edu.degree }}</div>
                <div class="text-blue-600">{{ edu.school }}</div>
                <div class="text-sm text-slate-500">{{ edu.year }}</div>
              </div>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="text-2xl font-bold mb-4 text-blue-600">Core Competencies</h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in skills" :key="skill" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {{ skill }}
              </span>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="(project, index) in projects" :key="index" class="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h4 class="text-xl font-bold text-slate-800 mb-2">{{ project.title }}</h4>
              <p class="text-slate-600 mb-3">{{ project.description }}</p>
              <div class="flex gap-2">
                <span v-for="tech in project.tech" :key="tech" class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
