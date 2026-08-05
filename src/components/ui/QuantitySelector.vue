<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 1,
  min: 1,
  max: 99,
  disabled: false,
  size: 'md'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
  (e: 'change', value: number): void;
}>();

const isMin = computed(() => props.modelValue <= props.min);
const isMax = computed(() => props.modelValue >= props.max);

function decrease() {
  if (props.disabled || isMin.value) return;
  const val = Math.max(props.min, props.modelValue - 1);
  emit('update:modelValue', val);
  emit('change', val);
}

function increase() {
  if (props.disabled || isMax.value) return;
  const val = Math.min(props.max, props.modelValue + 1);
  emit('update:modelValue', val);
  emit('change', val);
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 px-2 text-xs';
    case 'lg':
      return 'h-12 px-4 text-base';
    case 'md':
    default:
      return 'h-10 px-3 text-sm';
  }
});
</script>

<template>
  <div class="inline-flex items-center justify-between rounded-bilbola-sm border border-bilbola-gray-light bg-white p-1 shadow-2xs font-bilbola">
    <button
      type="button"
      :disabled="disabled || isMin"
      :aria-label="'Disminuir cantidad'"
      class="flex items-center justify-center rounded-sm bg-bilbola-surface-neutral hover:bg-bilbola-mint-light/40 text-bilbola-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-bilbola-action-focus aspect-square cursor-pointer shrink-0"
      :class="sizeClasses"
      @click="decrease"
    >
      <span class="font-black text-lg leading-none">-</span>
    </button>

    <span
      class="flex-1 min-w-[3.5rem] text-center font-extrabold text-bilbola-text-primary select-none px-3"
      :class="{ 'opacity-50': disabled }"
    >
      {{ modelValue }}
    </span>

    <button
      type="button"
      :disabled="disabled || isMax"
      :aria-label="'Aumentar cantidad'"
      class="flex items-center justify-center rounded-sm bg-bilbola-surface-neutral hover:bg-bilbola-mint-light/40 text-bilbola-text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-bilbola-action-focus aspect-square cursor-pointer shrink-0"
      :class="sizeClasses"
      @click="increase"
    >
      <span class="font-black text-lg leading-none">+</span>
    </button>
  </div>
</template>
