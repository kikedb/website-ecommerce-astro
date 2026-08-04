<script setup lang="ts">
import { ref, onMounted } from 'vue';

export interface Props {
  id?: string;
  message?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: 'mint' | 'yellow' | 'pink' | 'dark';
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: 'promo-banner-1',
  message: '¡Envío GRATIS en Región Metropolitana por compras superiores a $49.990! 🌟',
  variant: 'mint',
  dismissible: true
});

const isVisible = ref(true);

onMounted(() => {
  if (props.dismissible && typeof window !== 'undefined') {
    const closed = localStorage.getItem(`bilbola_banner_${props.id}`);
    if (closed === 'true') {
      isVisible.value = false;
    }
  }
});

function dismiss() {
  isVisible.value = false;
  if (typeof window !== 'undefined') {
    localStorage.setItem(`bilbola_banner_${props.id}`, 'true');
  }
}
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div
      v-if="isVisible"
      :class="[
        'relative flex items-center justify-between gap-4 px-4 py-2.5 text-xs sm:text-sm font-bold font-bilbola shadow-xs transition-colors',
        variant === 'mint' ? 'bg-bilbola-mint-depth text-white' : '',
        variant === 'yellow' ? 'bg-bilbola-support-yellow text-bilbola-text-primary border-b border-amber-300/40' : '',
        variant === 'pink' ? 'bg-bilbola-support-pink text-bilbola-text-primary' : '',
        variant === 'dark' ? 'bg-bilbola-text-primary text-bilbola-mint-light' : ''
      ]"
    >
      <!-- Spacer for centering when close button exists -->
      <div v-if="dismissible" class="w-6 hidden sm:block" />

      <div class="flex-grow flex items-center justify-center flex-wrap gap-2 text-center">
        <span>{{ message }}</span>
        <a
          v-if="ctaLabel"
          :href="ctaHref || '#'"
          class="underline decoration-2 underline-offset-2 font-black hover:opacity-80 transition-opacity ml-1"
        >
          {{ ctaLabel }}
        </a>
      </div>

      <button
        v-if="dismissible"
        type="button"
        @click="dismiss"
        aria-label="Cerrar anuncio"
        class="shrink-0 rounded-full p-1 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-white transition-colors"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </transition>
</template>
