<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  amount: number;
  originalAmount?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  currency: 'es-CL',
  size: 'md'
});

const formattedAmount = computed(() => {
  return `$${props.amount.toLocaleString(props.currency)}`;
});

const formattedOriginalAmount = computed(() => {
  if (!props.originalAmount || props.originalAmount <= props.amount) return null;
  return `$${props.originalAmount.toLocaleString(props.currency)}`;
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return { main: 'text-base font-extrabold', original: 'text-xs' };
    case 'lg':
      return { main: 'text-2xl font-black', original: 'text-base' };
    case 'xl':
      return { main: 'text-4xl font-black tracking-tight', original: 'text-lg' };
    case 'md':
    default:
      return { main: 'text-xl font-bold', original: 'text-sm' };
  }
});
</script>

<template>
  <div class="inline-flex items-baseline gap-2 font-bilbola">
    <span :class="['text-bilbola-text-primary transition-colors', sizeClasses.main]">
      {{ formattedAmount }}
    </span>
    <span
      v-if="formattedOriginalAmount"
      :class="['text-bilbola-text-secondary line-through font-normal', sizeClasses.original]"
    >
      {{ formattedOriginalAmount }}
    </span>
  </div>
</template>
