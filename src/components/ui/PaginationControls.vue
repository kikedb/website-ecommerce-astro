<script setup lang="ts">
import { computed } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export interface Props {
  currentPage: number;
  totalPages?: number;
  mode?: 'numbered' | 'load-more';
  loading?: boolean;
  loadMoreText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  totalPages: 5,
  mode: 'numbered',
  loading: false,
  loadMoreText: 'Cargar más sueños e inspiración...'
});

const emit = defineEmits<{
  (e: 'changePage', page: number): void;
  (e: 'loadMore'): void;
}>();

const pages = computed(() => {
  const list: (number | string)[] = [];
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= 5) {
    for (let i = 1; i <= total; i++) list.push(i);
  } else {
    if (current <= 3) {
      list.push(1, 2, 3, 4, '...', total);
    } else if (current >= total - 2) {
      list.push(1, '...', total - 3, total - 2, total - 1, total);
    } else {
      list.push(1, '...', current - 1, current, current + 1, '...', total);
    }
  }
  return list;
});
</script>

<template>
  <div class="font-bilbola my-8 flex flex-col items-center justify-center gap-4">
    <!-- Load More Button Mode (for assisted infinite scrolling) -->
    <div v-if="mode === 'load-more'" class="w-full max-w-sm">
      <BaseButton
        variant="secondary"
        size="lg"
        class="w-full shadow-md text-base"
        :loading="loading"
        :disabled="currentPage >= totalPages"
        @click="emit('loadMore')"
      >
        {{ currentPage >= totalPages ? 'Has explorado todo el catálogo ✨' : loadMoreText }}
      </BaseButton>
    </div>

    <!-- Numbered Page Controls Mode -->
    <nav v-else aria-label="Paginación de productos" class="flex items-center space-x-1 sm:space-x-2">
      <!-- Previous Button -->
      <button
        type="button"
        :disabled="currentPage <= 1 || loading"
        @click="emit('changePage', currentPage - 1)"
        aria-label="Página anterior"
        class="flex h-10 w-10 items-center justify-center rounded-bilbola-sm border border-bilbola-gray-light/50 bg-white text-bilbola-text-primary hover:bg-bilbola-mint-light/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-black"
      >
        &larr;
      </button>

      <!-- Page Numbers -->
      <template v-for="(item, index) in pages" :key="index">
        <span
          v-if="typeof item === 'string'"
          class="px-2 text-bilbola-text-secondary select-none font-extrabold"
        >
          {{ item }}
        </span>
        <button
          v-else
          type="button"
          :aria-current="item === currentPage ? 'page' : undefined"
          :class="[
            'flex h-10 min-w-[2.5rem] px-3 items-center justify-center rounded-bilbola-sm font-bold text-sm transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus',
            item === currentPage
              ? 'bg-bilbola-action-focus text-white font-black scale-105 shadow-md border border-bilbola-mint-depth'
              : 'bg-white text-bilbola-text-primary border border-bilbola-gray-light/40 hover:bg-bilbola-mint-light/30'
          ]"
          @click="emit('changePage', item)"
        >
          {{ item }}
        </button>
      </template>

      <!-- Next Button -->
      <button
        type="button"
        :disabled="currentPage >= totalPages || loading"
        @click="emit('changePage', currentPage + 1)"
        aria-label="Página siguiente"
        class="flex h-10 w-10 items-center justify-center rounded-bilbola-sm border border-bilbola-gray-light/50 bg-white text-bilbola-text-primary hover:bg-bilbola-mint-light/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-black"
      >
        &rarr;
      </button>
    </nav>

    <span v-if="totalPages > 1" class="text-xs text-bilbola-text-secondary font-medium">
      Página {{ currentPage }} de {{ totalPages }}
    </span>
  </div>
</template>
