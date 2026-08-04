<script setup lang="ts">
export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

export interface Props {
  filters: ActiveFilter[];
}

withDefaults(defineProps<Props>(), {
  filters: () => []
});

const emit = defineEmits<{
  (e: 'remove', filter: ActiveFilter): void;
  (e: 'clearAll'): void;
}>();
</script>

<template>
  <div v-if="filters.length > 0" class="flex flex-wrap items-center gap-2 font-bilbola py-3 border-b border-bilbola-gray-light/30">
    <span class="text-xs font-extrabold text-bilbola-text-secondary uppercase tracking-wider mr-1">
      Filtros Activos ({{ filters.length }}):
    </span>

    <!-- Chip list -->
    <transition-group name="chip" tag="div" class="flex flex-wrap items-center gap-2">
      <span
        v-for="item in filters"
        :key="`${item.key}-${item.value}`"
        class="inline-flex items-center gap-1.5 rounded-full bg-bilbola-mint-light/50 border border-bilbola-mint-depth/60 px-3 py-1 text-xs font-bold text-bilbola-action-focus shadow-2xs transition-all hover:bg-bilbola-mint-light"
      >
        <span><strong class="text-bilbola-text-primary/70 font-medium">{{ item.label }}:</strong> {{ item.value }}</span>
        <button
          type="button"
          :aria-label="`Remover filtro ${item.label} ${item.value}`"
          @click="emit('remove', item)"
          class="rounded-full p-0.5 text-bilbola-action-focus hover:bg-white hover:text-red-700 transition-colors focus:outline-none focus:ring-1 focus:ring-bilbola-action-focus"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </span>
    </transition-group>

    <!-- Clear All CTA -->
    <button
      type="button"
      @click="emit('clearAll')"
      class="text-xs font-bold text-bilbola-text-secondary hover:text-bilbola-text-primary underline ml-2 transition-colors focus:outline-none"
    >
      Limpiar Todos
    </button>
  </div>
</template>

<style scoped>
.chip-enter-active, .chip-leave-active {
  transition: all 0.2s ease;
}
.chip-enter-from, .chip-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
