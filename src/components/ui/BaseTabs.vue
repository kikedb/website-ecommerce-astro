<script setup lang="ts">
import { ref } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

export interface TabItem {
  label: string;
  badge?: string | number;
  disabled?: boolean;
}

export interface Props {
  tabs: TabItem[];
  defaultIndex?: number;
}

withDefaults(defineProps<Props>(), {
  defaultIndex: 0
});

const emit = defineEmits<{
  (e: 'change', index: number): void;
}>();
</script>

<template>
  <TabGroup :default-index="defaultIndex" @change="emit('change', $event)" as="div" class="w-full font-bilbola">
    <TabList class="flex space-x-2 border-b border-bilbola-gray-light/30 pb-2">
      <Tab
        v-for="tab in tabs"
        :key="tab.label"
        v-slot="{ selected }"
        :disabled="tab.disabled"
        as="template"
      >
        <button
          :class="[
            'flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all rounded-bilbola-sm focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus',
            selected
              ? 'bg-bilbola-mint-light text-bilbola-action-focus shadow-xs border-b-2 border-bilbola-mint-depth'
              : 'text-bilbola-text-secondary hover:bg-bilbola-mint-light/30 hover:text-bilbola-text-primary',
            tab.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
          ]"
        >
          <span>{{ tab.label }}</span>
          <span
            v-if="tab.badge"
            :class="[
              'rounded-full px-2 py-0.5 text-xs font-semibold',
              selected ? 'bg-bilbola-action-focus text-white' : 'bg-bilbola-gray-light/40 text-bilbola-text-primary'
            ]"
          >
            {{ tab.badge }}
          </span>
        </button>
      </Tab>
    </TabList>

    <TabPanels class="mt-4">
      <TabPanel
        v-for="(tab, idx) in tabs"
        :key="idx"
        class="focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus rounded-bilbola-sm p-2 text-bilbola-text-primary"
      >
        <slot :name="`tab-${idx}`" :tab="tab" />
      </TabPanel>
    </TabPanels>
  </TabGroup>
</template>
