<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

export interface SwatchOption {
  name: string;
  colorCode: string; // Hex e.g. #BEE9E7
  disabled?: boolean;
}

export interface Props {
  modelValue?: string;
  options: SwatchOption[];
  label?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<template>
  <RadioGroup
    :model-value="modelValue"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
    class="font-bilbola"
  >
    <RadioGroupLabel v-if="label" class="text-sm font-bold text-bilbola-text-primary block mb-2">
      {{ label }}: <span class="font-normal text-bilbola-text-secondary">{{ options.find(o => o.name === modelValue)?.name || 'Seleccione un color' }}</span>
    </RadioGroupLabel>

    <div class="flex items-center gap-3 flex-wrap">
      <RadioGroupOption
        v-for="option in options"
        :key="option.name"
        v-slot="{ active, checked, disabled }"
        :value="option.name"
        :disabled="option.disabled"
        as="template"
      >
        <div
          class="relative cursor-pointer rounded-full p-0.5 focus:outline-none transition-all"
          :class="[
            checked ? 'ring-2 ring-bilbola-action-focus ring-offset-2 scale-110' : 'hover:scale-105',
            active ? 'ring-2 ring-bilbola-action-focus' : '',
            disabled ? 'opacity-30 cursor-not-allowed pointer-events-none' : ''
          ]"
          :title="option.name"
        >
          <span
            class="block h-8 w-8 rounded-full border border-black/10 shadow-xs"
            :style="{ backgroundColor: option.colorCode }"
          />
          <!-- Checkmark icon inside active swatch -->
          <span
            v-if="checked"
            class="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg class="h-4 w-4 drop-shadow-xs" :class="option.colorCode.toUpperCase() === '#FFFFFF' || option.colorCode === '#FFF' ? 'text-bilbola-text-primary' : 'text-white'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
