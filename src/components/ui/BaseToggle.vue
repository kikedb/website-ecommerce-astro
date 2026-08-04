<script setup lang="ts">
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';

export interface Props {
  modelValue?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();
</script>

<template>
  <SwitchGroup as="div" class="flex items-center justify-between gap-4 font-bilbola">
    <span class="flex flex-col flex-grow">
      <SwitchLabel as="span" class="text-sm font-bold text-bilbola-text-primary cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
        {{ label }}
      </SwitchLabel>
      <span v-if="description" class="text-xs text-bilbola-text-secondary">
        {{ description }}
      </span>
    </span>
    <Switch
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="emit('update:modelValue', $event)"
      :class="[
        modelValue ? 'bg-bilbola-action-focus' : 'bg-bilbola-gray-light',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
        'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:ring-offset-2'
      ]"
    >
      <span class="sr-only">{{ label }}</span>
      <span
        aria-hidden="true"
        :class="[
          modelValue ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out'
        ]"
      />
    </Switch>
  </SwitchGroup>
</template>
