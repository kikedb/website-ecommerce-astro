<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue';

export interface Props {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Nada por aquí aún',
  description: 'Parece que esta sección está vacía. ¡Explora nuestro catálogo para descubrir magia decokids!'
});

const emit = defineEmits<{
  (e: 'action'): void;
}>();
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto rounded-bilbola-lg border-2 border-dashed border-bilbola-gray-light/60 bg-bilbola-surface-neutral/40 font-bilbola my-8">
    <!-- Illustration placeholder with soft Bilbola colors -->
    <div class="w-20 h-20 rounded-full bg-bilbola-mint-light/50 flex items-center justify-center text-bilbola-mint-depth mb-4 shadow-inner">
      <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    </div>

    <h3 class="text-xl font-bold text-bilbola-text-primary font-bilbola mb-2">
      {{ title }}
    </h3>
    <p class="text-sm text-bilbola-text-secondary leading-relaxed mb-6">
      {{ description }}
    </p>

    <slot name="action">
      <BaseButton
        v-if="actionLabel"
        :href="actionHref"
        variant="secondary"
        size="md"
        @click="emit('action')"
      >
        {{ actionLabel }}
      </BaseButton>
    </slot>
  </div>
</template>
