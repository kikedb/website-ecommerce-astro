<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

export interface RadioOption {
  label: string;
  value: any;
  description?: string;
  disabled?: boolean;
}

export interface Props {
  modelValue?: any;
  options: RadioOption[];
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

function onUpdate(val: any) {
  emit('update:modelValue', val);
}
</script>

<template>
  <RadioGroup :model-value="modelValue" :disabled="disabled" @update:model-value="onUpdate" class="font-bilbola">
    <RadioGroupLabel v-if="label" class="text-sm font-semibold text-bilbola-text-primary mb-2 block">
      {{ label }}
    </RadioGroupLabel>

    <div class="space-y-2">
      <RadioGroupOption
        v-for="option in options"
        :key="option.label"
        v-slot="{ active, checked, disabled }"
        :value="option.value"
        :disabled="option.disabled"
        as="template"
      >
        <div
          class="relative flex cursor-pointer rounded-bilbola-sm px-4 py-3 border transition-all shadow-xs focus:outline-none"
          :class="[
            checked ? 'bg-bilbola-mint-light/30 border-bilbola-mint-depth ring-1 ring-bilbola-mint-depth' : 'bg-white border-bilbola-gray-light hover:border-bilbola-gray-depth',
            active ? 'ring-2 ring-bilbola-action-focus ring-offset-2' : '',
            disabled ? 'opacity-50 cursor-not-allowed pointer-events-none bg-bilbola-surface-neutral' : ''
          ]"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  class="font-medium"
                  :class="checked ? 'text-bilbola-action-focus font-bold' : 'text-bilbola-text-primary'"
                >
                  {{ option.label }}
                </RadioGroupLabel>
                <span
                  v-if="option.description"
                  class="inline"
                  :class="checked ? 'text-bilbola-text-primary' : 'text-bilbola-text-secondary'"
                >
                  {{ option.description }}
                </span>
              </div>
            </div>
            <div
              class="h-5 w-5 rounded-full border flex items-center justify-center transition-colors"
              :class="checked ? 'border-bilbola-action-focus bg-bilbola-action-focus text-white' : 'border-bilbola-gray-depth bg-white'"
            >
              <div v-if="checked" class="h-2 w-2 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
