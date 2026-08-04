<script setup lang="ts">
import { ref } from 'vue';

export interface Props {
  content?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  position: 'top'
});

const isHovered = ref(false);
const isFocused = ref(false);
</script>

<template>
  <div
    class="relative inline-block font-bilbola"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @focus="isFocused = true"
    @blur="isFocused = false"
  >
    <!-- Target slot -->
    <div tabindex="0" class="focus:outline-none focus:ring-1 focus:ring-bilbola-action-focus inline-block">
      <slot />
    </div>

    <!-- Tooltip bubble -->
    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isHovered || isFocused"
        :class="[
          'absolute z-50 px-3 py-1.5 text-xs font-bold text-white bg-bilbola-text-primary rounded-bilbola-sm shadow-lg whitespace-nowrap pointer-events-none border border-bilbola-mint-depth/40',
          position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 -translate-y-2' : '',
          position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 translate-y-2' : '',
          position === 'left' ? 'right-full top-1/2 -translate-y-1/2 -translate-x-2' : '',
          position === 'right' ? 'left-full top-1/2 -translate-y-1/2 translate-x-2' : ''
        ]"
      >
        {{ content }}
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>
