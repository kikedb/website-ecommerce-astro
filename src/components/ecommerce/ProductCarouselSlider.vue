<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  title?: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Completa el Dormitorio de tus Sueños ✨',
  subtitle: 'Productos complementarios con el sello artesanal Bílbola'
});

const scrollContainer = ref<HTMLElement | null>(null);

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -280, behavior: 'smooth' });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 280, behavior: 'smooth' });
  }
}
</script>

<template>
  <section class="my-12 font-bilbola space-y-6">
    <!-- Cabecera responsive: en móvil en columna para no chocar con flechas -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-bilbola-gray-light/30 pb-4">
      <div>
        <h3 class="text-2xl md:text-3xl font-black text-bilbola-text-primary tracking-wide leading-snug">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-bilbola-text-secondary mt-1 font-light">
          {{ subtitle }}
        </p>
      </div>

      <!-- Scroll Controls -->
      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <button
          type="button"
          @click="scrollLeft"
          aria-label="Anterior"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-bilbola-gray-light/60 text-bilbola-text-primary shadow-xs hover:bg-bilbola-mint-light/40 hover:text-bilbola-action-focus transition-all focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus cursor-pointer"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          @click="scrollRight"
          aria-label="Siguiente"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-bilbola-gray-light/60 text-bilbola-text-primary shadow-xs hover:bg-bilbola-mint-light/40 hover:text-bilbola-action-focus transition-all focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus cursor-pointer"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Snap Scroll Track -->
    <div
      ref="scrollContainer"
      class="scroll-track flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 px-1 no-scrollbar scroll-smooth"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <slot />
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Aplicar ancho fijo estrictamente al contenido del track del carrusel */
.scroll-track > *,
.scroll-track :deep(astro-island),
.scroll-track :deep(.group) {
  flex: 0 0 260px !important;
  width: 260px !important;
  max-width: 85vw;
  scroll-snap-align: start;
  display: flex;
}
@media (min-width: 640px) {
  .scroll-track > *,
  .scroll-track :deep(astro-island),
  .scroll-track :deep(.group) {
    flex: 0 0 300px !important;
    width: 300px !important;
    max-width: none;
  }
}
</style>
