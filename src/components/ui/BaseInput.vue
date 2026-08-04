<script setup lang="ts">
import { computed, useId } from 'vue';

export interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number' | 'url';
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  disabled: false,
  required: false,
  readonly: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();

const inputId = useId();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}
</script>

<template>
  <div class="flex flex-col gap-1 w-full font-bilbola">
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-semibold text-bilbola-text-primary flex items-center gap-1"
    >
      {{ label }}
      <span v-if="required" class="text-bilbola-action-focus">*</span>
    </label>

    <div class="relative flex items-center">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :aria-invalid="!!error"
        class="w-full rounded-bilbola-sm border bg-bilbola-surface-page px-3.5 py-2.5 text-sm text-bilbola-text-primary placeholder:text-bilbola-text-secondary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus disabled:cursor-not-allowed disabled:opacity-50"
        :class="[
          error
            ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500'
            : 'border-bilbola-gray-light hover:border-bilbola-gray-depth focus:border-bilbola-action-focus'
        ]"
        @input="onInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />
    </div>

    <p
      v-if="error"
      class="text-xs font-semibold text-red-600 mt-0.5"
    >
      {{ error }}
    </p>
    <p
      v-else-if="hint"
      class="text-xs text-bilbola-text-secondary mt-0.5"
    >
      {{ hint }}
    </p>
  </div>
</template>
