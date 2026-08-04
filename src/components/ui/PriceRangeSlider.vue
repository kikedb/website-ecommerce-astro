<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';

export interface Props {
  modelValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [0, 80000],
  min: 0,
  max: 100000,
  step: 1000
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: [number, number]): void;
  (e: 'change', value: [number, number]): void;
}>();

const minVal = ref(props.modelValue[0]);
const maxVal = ref(props.modelValue[1]);

watch(() => props.modelValue, (newVal) => {
  minVal.value = newVal[0];
  maxVal.value = newVal[1];
});

function onMinInput(event: Event) {
  const val = Number((event.target as HTMLInputElement).value);
  if (val > maxVal.value - props.step) return;
  minVal.value = val;
  emit('update:modelValue', [minVal.value, maxVal.value]);
}

function onMaxInput(event: Event) {
  const val = Number((event.target as HTMLInputElement).value);
  if (val < minVal.value + props.step) return;
  maxVal.value = val;
  emit('update:modelValue', [minVal.value, maxVal.value]);
}

function onChange() {
  emit('change', [minVal.value, maxVal.value]);
}

const leftPercent = computed(() => ((minVal.value - props.min) / (props.max - props.min)) * 100);
const rightPercent = computed(() => 100 - ((maxVal.value - props.min) / (props.max - props.min)) * 100);
</script>

<template>
  <div class="space-y-4 font-bilbola">
    <!-- Visual Track & Dual Range Inputs -->
    <div class="relative h-2 rounded-full bg-bilbola-gray-light/50 my-4">
      <div
        class="absolute inset-y-0 bg-bilbola-action-focus rounded-full transition-all"
        :style="{ left: `${leftPercent}%`, right: `${rightPercent}%` }"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="minVal"
        @input="onMinInput"
        @change="onChange"
        class="pointer-events-none absolute -top-1 w-full appearance-none bg-transparent accent-bilbola-action-focus focus:outline-none"
      />

      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="maxVal"
        @input="onMaxInput"
        @change="onChange"
        class="pointer-events-none absolute -top-1 w-full appearance-none bg-transparent accent-bilbola-action-focus focus:outline-none"
      />
    </div>

    <!-- Values formatting -->
    <div class="flex items-center justify-between text-xs font-bold text-bilbola-text-primary">
      <span class="px-2 py-1 rounded-sm bg-bilbola-surface-neutral border border-bilbola-gray-light/40">
        <PriceDisplay :amount="minVal" size="sm" />
      </span>
      <span class="text-bilbola-text-secondary">—</span>
      <span class="px-2 py-1 rounded-sm bg-bilbola-surface-neutral border border-bilbola-gray-light/40">
        <PriceDisplay :amount="maxVal" size="sm" />
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Ensure custom thumbs remain accessible and styled per brand */
input[type="range"]::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid #2F6F60;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.15s ease;
}
input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}
input[type="range"]::-moz-range-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 3px solid #2F6F60;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
