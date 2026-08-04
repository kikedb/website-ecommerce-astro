<script setup lang="ts">
import { computed } from 'vue';

export type BadgeType = 'customizable' | 'new' | 'made-to-order' | 'last-units' | 'discount' | 'neutral';

export interface Props {
  type?: BadgeType;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'neutral'
});

const badgeStyles = computed(() => {
  switch (props.type) {
    case 'customizable':
      return 'bg-bilbola-support-pink text-bilbola-text-primary font-bold shadow-xs';
    case 'new':
      return 'bg-bilbola-mint-depth text-white font-bold tracking-wider uppercase';
    case 'made-to-order':
      return 'bg-bilbola-support-yellow text-bilbola-text-primary font-semibold';
    case 'last-units':
      return 'bg-bilbola-support-gray text-white font-bold animate-pulse';
    case 'discount':
      return 'bg-bilbola-action-primary text-bilbola-text-inverse font-extrabold';
    case 'neutral':
    default:
      return 'bg-bilbola-surface-neutral border border-bilbola-gray-light text-bilbola-text-secondary';
  }
});
</script>

<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bilbola uppercase tracking-wide transition-all select-none"
    :class="badgeStyles"
  >
    <slot>{{ label }}</slot>
  </span>
</template>
