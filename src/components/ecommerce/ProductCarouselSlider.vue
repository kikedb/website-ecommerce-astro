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
    scrollContainer.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
}
</script>

<template>
  <section class="my-12 font-bilbola space-y-6">
    <div class="flex items-end justify-between border-b border-bilbola-gray-light/30 pb-4">
      <div>
        <h3 class="text-2xl md:text-3xl font-black text-bilbola-text-primary tracking-wide">
          {{ title }}
        </h3>
        <p v-if="subtitle" class="text-sm text-bilbola-text-secondary mt-1 font-light">
          {{ subtitle }}
        </p>
      </div>

      <!-- Scroll Controls -->
      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          @click="scrollLeft"
          aria-label="Anterior"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-bilbola-gray-light/60 text-bilbola-text-primary shadow-xs hover:bg-bilbola-mint-light/40 hover:text-bilbola-action-focus transition-all focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          @click="scrollRight"
          aria-label="Siguiente"
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-bilbola-gray-light/60 text-bilbola-text-primary shadow-xs hover:bg-bilbola-mint-light/40 hover:text-bilbola-action-focus transition-all focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus"
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
      class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 pt-2 px-1 no-scrollbar scroll-smooth"
      style="scrollbar-width: none; -ms-overflow-style: none;"
    >
      <!-- Expect ProductCard items directly in default slot or iterated -->
      <slot />
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Style individual card slot items to snap accurately */
:deep(> *) {
  flex: 0 0 280px;
  scroll-snap-align: start;
}
@media (min-width: 768px) {
  :deep(> *) {
    flex: 0 0 320px;
  }
}
</style>
