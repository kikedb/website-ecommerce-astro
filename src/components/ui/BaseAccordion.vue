<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

export interface AccordionItem {
  title: string;
  content: string;
  defaultOpen?: boolean;
}

export interface Props {
  items: AccordionItem[];
}

defineProps<Props>();
</script>

<template>
  <div class="w-full divide-y divide-bilbola-gray-light/30 border-t border-b border-bilbola-gray-light/30 font-bilbola">
    <Disclosure
      v-for="(item, index) in items"
      :key="index"
      v-slot="{ open }"
      :default-open="item.defaultOpen"
      as="div"
      class="py-4"
    >
      <DisclosureButton class="flex w-full justify-between items-center text-left font-bold text-lg text-bilbola-text-primary hover:text-bilbola-mint-depth focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus rounded-bilbola-sm transition-colors py-1">
        <span>{{ item.title }}</span>
        <span
          class="ml-6 flex h-7 w-7 items-center justify-center rounded-full bg-bilbola-mint-light/40 text-bilbola-text-primary transition-transform duration-200"
          :class="{ 'rotate-180 bg-bilbola-mint-depth text-white': open }"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel class="pt-3 pb-2 text-base text-bilbola-text-secondary leading-relaxed">
          <!-- Allow slots per index or fallback to plain content string -->
          <slot :name="`item-${index}`" :item="item">
            {{ item.content }}
          </slot>
        </DisclosurePanel>
      </transition>
    </Disclosure>
  </div>
</template>
