<script setup lang="ts">
import { Toaster } from 'vue-sonner';

export interface Props {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

withDefaults(defineProps<Props>(), {
  position: 'top-right'
});
</script>

<template>
  <Toaster
    :position="position"
    :toast-options="{
      style: {
        backgroundColor: 'var(--color-bilbola-surface-page, #FFFFFF)',
        color: 'var(--color-bilbola-text-primary, #4A4441)',
        border: '1px solid var(--color-bilbola-mint-depth, #96CFBE)',
        borderRadius: '16px',
        fontFamily: 'var(--font-bilbola, Source Serif 4, serif)',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
      },
      className: 'bilbola-toast-container font-bilbola text-sm'
    }"
  />
</template>
