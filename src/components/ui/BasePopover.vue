<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel, TransitionRoot } from '@headlessui/vue';

export interface Props {
  label?: string;
  align?: 'left' | 'center' | 'right';
  width?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<Props>(), {
  align: 'center',
  width: 'md'
});
</script>

<template>
  <Popover v-slot="{ open }" class="relative inline-block text-left font-bilbola">
    <PopoverButton class="inline-flex items-center gap-1.5 rounded-bilbola-sm bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-bilbola-text-primary border border-bilbola-gray-light hover:bg-bilbola-mint-light/30 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus shadow-2xs transition-colors">
      <slot name="trigger">
        {{ label || 'Más información' }}
        <svg
          class="h-4 w-4 text-bilbola-text-secondary transition-transform duration-200"
          :class="{ 'rotate-180 text-bilbola-action-focus': open }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </slot>
    </PopoverButton>

    <TransitionRoot
      enter="transition ease-out duration-200"
      enter-from="opacity-0 translate-y-1"
      enter-to="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 translate-y-1"
    >
      <PopoverPanel
        :class="[
          'absolute z-50 mt-2 rounded-bilbola-md bg-white p-5 shadow-2xl border border-bilbola-gray-light/40 focus:outline-none text-left',
          align === 'left' ? 'left-0' : '',
          align === 'center' ? 'left-1/2 -translate-x-1/2' : '',
          align === 'right' ? 'right-0' : '',
          width === 'sm' ? 'w-64' : '',
          width === 'md' ? 'w-80' : '',
          width === 'lg' ? 'w-96' : ''
        ]"
      >
        <div class="text-sm text-bilbola-text-primary leading-relaxed">
          <slot />
        </div>
      </PopoverPanel>
    </TransitionRoot>
  </Popover>
</template>
