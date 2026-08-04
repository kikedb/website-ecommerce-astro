<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

export interface DropdownItem {
  label: string;
  icon?: string;
  action?: () => void;
  href?: string;
  disabled?: boolean;
  dividerBefore?: boolean;
}

export interface Props {
  label?: string;
  items: DropdownItem[];
  align?: 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  align: 'right'
});

const emit = defineEmits<{
  (e: 'select', item: DropdownItem): void;
}>();

function onItemClick(item: DropdownItem) {
  if (item.disabled) return;
  if (item.action) item.action();
  emit('select', item);
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left font-bilbola">
    <div>
      <slot name="trigger">
        <MenuButton class="inline-flex w-full justify-center items-center gap-1.5 rounded-bilbola-sm bg-white px-4 py-2 text-sm font-semibold text-bilbola-text-primary shadow-xs border border-bilbola-gray-light hover:bg-bilbola-mint-light/20 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus">
          {{ label }}
          <svg class="h-4 w-4 text-bilbola-text-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
          </svg>
        </MenuButton>
      </slot>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="[
          'absolute z-50 mt-2 w-56 origin-top-right rounded-bilbola-md bg-white shadow-lg border border-bilbola-gray-light/40 py-1 focus:outline-none',
          align === 'right' ? 'right-0' : 'left-0'
        ]"
      >
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.dividerBefore" class="my-1 border-t border-bilbola-gray-light/30" />
          <MenuItem v-slot="{ active, disabled }" :disabled="item.disabled">
            <component
              :is="item.href ? 'a' : 'button'"
              :href="item.href"
              :class="[
                active ? 'bg-bilbola-mint-light/40 text-bilbola-action-focus font-bold' : 'text-bilbola-text-primary',
                disabled ? 'opacity-50 cursor-not-allowed' : '',
                'group flex w-full items-center px-4 py-2 text-sm transition-colors text-left'
              ]"
              @click="onItemClick(item)"
            >
              {{ item.label }}
            </component>
          </MenuItem>
        </template>
      </MenuItems>
    </transition>
  </Menu>
</template>
