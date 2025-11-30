<script setup>
import Hero from '@/components/Hero.vue';
import HeroNetwork from '@/components/HeroNetwork.vue';
import PortalNetworkToWeb from '@/components/PortalNetworkToWeb.vue';
import WebSection from '@/components/WebSection.vue';
import PortalWebToData from '@/components/PortalWebToData.vue';
import DataSection from '@/components/DataSection.vue';
import { resumeData } from '@/data/resumeData';
</script>

<template>
  <main class="w-full max-w-none overflow-x-hidden">
    <Hero />
    <HeroNetwork id="network" />
    <PortalNetworkToWeb />
    <WebSection id="web" />
    <PortalWebToData />
    <DataSection id="data" />
    
    <!-- Footer / Contact -->
    <footer class="bg-slate-900 text-white py-12 text-center border-t border-slate-800">
      <div class="container mx-auto px-6">
        <h3 class="text-2xl font-bold mb-6 text-emerald-400">Contactez-moi</h3>
        <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8 text-slate-300">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a :href="'mailto:' + resumeData.contact.email" class="hover:text-white transition-colors">{{ resumeData.contact.email }}</a>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{{ resumeData.contact.phone }}</span>
          </div>
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{{ resumeData.contact.location }}</span>
          </div>
        </div>
        <p class="text-slate-500 text-sm">© {{ new Date().getFullYear() }} {{ resumeData.profile.name }}. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>
