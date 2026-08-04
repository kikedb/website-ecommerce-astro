<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';

export interface Props {
  modelValue?: string;
  maxLength?: number;
  label?: string;
  placeholder?: string;
  warningText?: string;
  confirmationLabel?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  maxLength: 20,
  label: 'Texto para personalizar',
  placeholder: 'Ej: Sofía (máx 20 caracteres)',
  warningText: 'Un producto personalizado no admite cambios o devoluciones a menos que presente falla de fábrica.',
  confirmationLabel: 'Confirmo que la ortografía y el texto ingresado son correctos.',
  required: true
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'confirmationChange', confirmed: boolean): void;
}>();

const confirmed = ref(false);

const charCount = computed(() => props.modelValue.length);
const isLimitExceeded = computed(() => charCount.value > props.maxLength);

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const val = target.value.slice(0, props.maxLength);
  emit('update:modelValue', val);
}

function onCheckboxChange(val: boolean) {
  confirmed.value = val;
  emit('confirmationChange', val);
}
</script>

<template>
  <div class="flex flex-col gap-3 rounded-bilbola-md border border-bilbola-mint-light bg-bilbola-surface-neutral p-4 font-bilbola shadow-2xs">
    <!-- Header with label & character counter -->
    <div class="flex items-center justify-between gap-2">
      <label class="text-sm font-bold text-bilbola-text-primary flex items-center gap-1">
        {{ label }}
        <span v-if="required" class="text-bilbola-action-focus">*</span>
      </label>
      <span
        class="text-xs font-mono font-semibold px-2 py-0.5 rounded-full"
        :class="isLimitExceeded || charCount === maxLength ? 'bg-bilbola-support-pink text-red-800' : 'bg-white text-bilbola-text-secondary'"
      >
        {{ charCount }}/{{ maxLength }}
      </span>
    </div>

    <!-- Text input field -->
    <input
      type="text"
      :value="modelValue"
      :maxlength="maxLength"
      :placeholder="placeholder"
      class="w-full rounded-bilbola-sm border border-bilbola-gray-light bg-white px-3.5 py-2.5 text-sm text-bilbola-text-primary placeholder:text-bilbola-text-secondary/50 focus:border-bilbola-action-focus focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus transition-colors font-bold tracking-wide"
      @input="onInput"
    />

    <!-- Brandbook mandatory warning banner for custom products -->
    <div class="flex items-start gap-2.5 rounded-bilbola-sm bg-bilbola-support-yellow/60 p-3 border border-bilbola-support-yellow text-xs text-bilbola-text-primary leading-relaxed">
      <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.63-1.515 2.63H3.72c-1.347 0-2.189-1.463-1.515-2.63L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      <span class="font-medium">{{ warningText }}</span>
    </div>

    <!-- Mandatory spelling confirmation checkbox -->
    <BaseCheckbox
      :model-value="confirmed"
      :label="confirmationLabel"
      @update:model-value="onCheckboxChange"
    />
  </div>
</template>
