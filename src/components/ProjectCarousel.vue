<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true
  },
  projectTitle: {
    type: String,
    default: 'Project'
  }
});

const currentIndex = ref(0);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const carouselRef = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

// Carousel Navigation
const nextSlide = () => {
  if (props.images.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const prevSlide = () => {
  if (props.images.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

// Touch/Swipe Support
const handleTouchStart = (e) => {
  isDragging.value = true;
  startX.value = e.touches[0].pageX;
};

const handleTouchMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
};

const handleTouchEnd = (e) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  const endX = e.changedTouches[0].pageX;
  const diff = startX.value - endX;
  
  // Swipe threshold: 50px
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

// Mouse Drag Support (Desktop)
const handleMouseDown = (e) => {
  isDragging.value = true;
  startX.value = e.pageX;
  if (carouselRef.value) {
    carouselRef.value.style.cursor = 'grabbing';
  }
};

const handleMouseMove = (e) => {
  if (!isDragging.value) return;
  e.preventDefault();
};

const handleMouseUp = (e) => {
  if (!isDragging.value) return;
  isDragging.value = false;
  
  if (carouselRef.value) {
    carouselRef.value.style.cursor = 'grab';
  }
  
  const endX = e.pageX;
  const diff = startX.value - endX;
  
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

// Lightbox Functions
const openLightbox = (index) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightboxOpen.value = false;
  document.body.style.overflow = 'auto';
};

const nextLightboxImage = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % props.images.length;
};

const prevLightboxImage = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + props.images.length) % props.images.length;
};

// Keyboard Support
const handleKeydown = (e) => {
  if (!lightboxOpen.value) return;
  
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextLightboxImage();
  if (e.key === 'ArrowLeft') prevLightboxImage();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = 'auto';
});

const showArrows = computed(() => props.images.length > 1);
</script>

<template>
  <div v-if="images.length > 0" class="w-full">
    <!-- Carousel Container -->
    <div class="relative">
      <!-- Glow Background -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full blur-[100px] pointer-events-none" 
           style="background: linear-gradient(to right, var(--accent), var(--primary)); opacity: 0.15;"></div>
      
      <!-- Main Image Container -->
      <div 
        ref="carouselRef"
        class="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @mouseleave="handleMouseUp"
      >
        <!-- Images -->
        <div class="relative w-full aspect-video md:aspect-[16/10]">
          <TransitionGroup name="slide-fade">
            <div
              v-for="(img, index) in images"
              v-show="index === currentIndex"
              :key="index"
              class="absolute inset-0 flex items-center justify-center p-4 md:p-0"
              @click="openLightbox(index)"
            >
              <img
                :src="img"
                :alt="`${projectTitle} screenshot ${index + 1}`"
                class="max-w-full max-h-full object-contain rounded-xl shadow-2xl cursor-pointer transition-transform hover:scale-[1.02]"
                style="border: 1px solid var(--glass-border);"
                loading="lazy"
              />
            </div>
          </TransitionGroup>
        </div>
        
        <!-- Desktop Arrows (inside image, high contrast) -->
        <button
          v-if="showArrows"
          @click.stop="prevSlide"
          class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center transition-all hover:scale-110 shadow-xl"
          style="background-color: var(--bg-surface); border: 3px solid var(--primary); box-shadow: 0 4px 20px rgba(0,0,0,0.3);"
          aria-label="Image précédente"
        >
          <svg class="w-7 h-7" style="color: #000000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          v-if="showArrows"
          @click.stop="nextSlide"
          class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center transition-all hover:scale-110 shadow-xl"
          style="background-color: var(--bg-surface); border: 3px solid var(--primary); box-shadow: 0 4px 20px rgba(0,0,0,0.3);"
          aria-label="Image suivante"
        >
          <svg class="w-7 h-7" style="color: #000000;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Controls (below image) -->
      <div v-if="showArrows" class="flex md:hidden flex-col items-center gap-4 mt-6">
        <!-- Dots Indicator (Mobile) -->
        <div class="flex gap-2">
          <button
            v-for="(img, index) in images"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300 rounded-full"
            :class="index === currentIndex ? 'w-8 h-2' : 'w-2 h-2'"
            :style="{
              backgroundColor: index === currentIndex ? 'var(--primary)' : 'var(--text-muted)',
              opacity: index === currentIndex ? 1 : 0.4
            }"
            :aria-label="`Aller à l'image ${index + 1}`"
          ></button>
        </div>
        
        <!-- Arrow Buttons (Mobile) -->
        <div class="flex items-center gap-4">
          <button
            @click="prevSlide"
            class="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-md"
            style="background-color: var(--bg-surface); border: 2px solid var(--primary);"
            aria-label="Image précédente"
          >
            <svg class="w-6 h-6" style="color: var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            @click="nextSlide"
            class="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-md"
            style="background-color: var(--bg-surface); border: 2px solid var(--primary);"
            aria-label="Image suivante"
          >
            <svg class="w-6 h-6" style="color: var(--primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Image Counter Indicator (Mobile & Desktop) -->
      <div 
        v-if="images.length > 0"
        class="flex flex-col items-center gap-2 mt-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <!-- Counter Badge -->
        <div 
          class="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300"
          style="background-color: var(--glass); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); color: var(--text-primary); box-shadow: 0 2px 8px var(--shadow);"
        >
          <span class="tabular-nums">{{ currentIndex + 1 }}</span>
          <span class="mx-1.5 opacity-50">•</span>
          <span class="tabular-nums">{{ images.length }}</span>
        </div>
        
        <!-- Progress Bar -->
        <div 
          class="w-32 h-1 rounded-full overflow-hidden"
          style="background-color: var(--glass-border);"
        >
          <div 
            class="h-full rounded-full transition-all duration-300 ease-out"
            style="background-color: var(--primary);"
            :style="{ width: `${((currentIndex + 1) / images.length) * 100}%` }"
          ></div>
        </div>
      </div>
      
      <!-- Desktop Dots (hidden on mobile) -->
      <div v-if="showArrows" class="hidden md:flex justify-center gap-2 mt-6">
        <button
          v-for="(img, index) in images"
          :key="index"
          @click="goToSlide(index)"
          class="transition-all duration-300 rounded-full"
          :class="index === currentIndex ? 'w-8 h-2' : 'w-2 h-2'"
          :style="{
            backgroundColor: index === currentIndex ? 'var(--primary)' : 'var(--text-muted)',
            opacity: index === currentIndex ? 1 : 0.4
          }"
          :aria-label="`Aller à l'image ${index + 1}`"
        ></button>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
          v-if="lightboxOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          style="background-color: rgba(0, 0, 0, 0.95); backdrop-filter: blur(20px);"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style="background-color: var(--glass); backdrop-filter: blur(10px); border: 1px solid var(--glass-border);"
            aria-label="Fermer"
          >
            <svg class="w-6 h-6" style="color: var(--text-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image with Pinch-to-Zoom Support -->
          <div class="relative w-full h-full flex items-center justify-center touch-pan-x touch-pan-y">
            <img
              :src="images[lightboxIndex]"
              :alt="`${projectTitle} screenshot ${lightboxIndex + 1}`"
              class="max-w-full max-h-full object-contain select-none"
              style="touch-action: pan-x pan-y pinch-zoom;"
            />
          </div>

          <!-- Navigation Arrows -->
          <button
            v-if="images.length > 1"
            @click.stop="prevLightboxImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style="background-color: var(--glass); backdrop-filter: blur(10px); border: 1px solid var(--glass-border);"
            aria-label="Image précédente"
          >
            <svg class="w-6 h-6 md:w-7 md:h-7" style="color: var(--text-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            v-if="images.length > 1"
            @click.stop="nextLightboxImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style="background-color: var(--glass); backdrop-filter: blur(10px); border: 1px solid var(--glass-border);"
            aria-label="Image suivante"
          >
            <svg class="w-6 h-6 md:w-7 md:h-7" style="color: var(--text-primary);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image Counter -->
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium"
               style="background-color: var(--glass); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); color: var(--text-primary);">
            {{ lightboxIndex + 1 }} / {{ images.length }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* Slide Fade Transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Lightbox Fade Transition */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: all 0.3s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

/* Prevent text selection during drag */
.cursor-grabbing * {
  user-select: none;
  -webkit-user-select: none;
}

/* Touch action for pinch-to-zoom */
.touch-pan-x {
  touch-action: pan-x;
}

.touch-pan-y {
  touch-action: pan-y;
}
</style>
