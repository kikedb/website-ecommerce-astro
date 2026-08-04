<script setup lang="ts">
import { useId } from 'vue';

export interface Props {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', checked: boolean): void;
}>();

const checkboxId = useId();

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
}
</script>

<template>
  <div class="flex flex-col gap-1 font-bilbola">
    <label
      :for="checkboxId"
      class="inline-flex items-center gap-2.5 select-none text-sm font-medium text-bilbola-text-primary"
      :class="{ 'cursor-pointer hover:text-bilbola-action-focus': !disabled, 'opacity-50 cursor-not-allowed': disabled }"
    >
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="h-5 w-5 rounded-sm border-2 border-bilbola-gray-depth bg-white text-bilbola-action-focus transition-colors focus:ring-2 focus:ring-bilbola-action-focus focus:ring-offset-1 disabled:cursor-not-allowed cursor-pointer"
        @change="onChange"
      />
      <span v-if="label">{{ label }}</span>
      <slot v-else />
    </label>
    <p v-if="error" class="text-xs font-semibold text-red-600 ml-7">{{ error }}</p>
  </div>
</template>
