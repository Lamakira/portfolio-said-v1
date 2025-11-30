<script setup>
import Hero from '@/components/Hero.vue';
import AboutSection from '@/components/AboutSection.vue';
import HeroNetwork from '@/components/HeroNetwork.vue';
import PortalNetworkToWeb from '@/components/PortalNetworkToWeb.vue';
import WebSection from '@/components/WebSection.vue';
import PortalWebToData from '@/components/PortalWebToData.vue';
import DataSection from '@/components/DataSection.vue';
import ContactCTA from '@/components/ContactCTA.vue';
import ScrollToTop from '@/components/ScrollToTop.vue';
import { resumeData } from '@/data/resumeData';
</script>

<template>
  <main role="main" class="w-full max-w-none overflow-x-hidden">
    <Hero />
    <AboutSection />
    <HeroNetwork id="network" />
    <PortalNetworkToWeb />
    <WebSection id="web" />
    <PortalWebToData />
    <DataSection id="data" />
    <ContactCTA />
    
    <!-- Footer -->
    <footer class="bg-slate-900 text-white py-8 text-center border-t border-slate-800">
      <div class="container mx-auto px-6">
        <p class="text-slate-400 text-sm">© {{ new Date().getFullYear() }} {{ resumeData.profile.name }}. All rights reserved.</p>
      </div>
    </footer>
    
    <!-- Scroll to Top Button -->
    <ScrollToTop />
  </main>
</template>
