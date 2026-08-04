<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';

export interface Props {
  modelValue?: { region: string; commune: string; estimatedCost: number };
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: { region: string; commune: string; estimatedCost: number }): void;
  (e: 'change', value: { region: string; commune: string; estimatedCost: number }): void;
}>();

const regionsData: Record<string, { label: string; cost: number; days: string; communes: string[] }> = {
  'rm': {
    label: 'Región Metropolitana',
    cost: 3500,
    days: '2 a 4 días hábiles',
    communes: ['Santiago Centro', 'Providencia', 'Las Condes', 'Ñuñoa', 'Vitacura', 'La Reina', 'Maipú', 'Peñalolén', 'Colina']
  },
  'valpo': {
    label: 'Región de Valparaíso',
    cost: 5900,
    days: '3 a 6 días hábiles',
    communes: ['Valparaíso', 'Viña del Mar', 'Concón', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota']
  },
  'biobio': {
    label: 'Región del Biobío',
    cost: 6900,
    days: '4 a 7 días hábiles',
    communes: ['Concepción', 'Talcahuano', 'Chiguayante', 'San Pedro de la Paz', 'Los Ángeles', 'Coronel']
  },
  'coquimbo': {
    label: 'Región de Coquimbo',
    cost: 6500,
    days: '3 a 6 días hábiles',
    communes: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña']
  },
  'araucania': {
    label: 'Región de La Araucanía',
    cost: 7500,
    days: '5 a 8 días hábiles',
    communes: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol']
  }
};

const selectedRegion = ref('rm');
const selectedCommune = ref('Providencia');

const regionOptions = computed(() => {
  return Object.keys(regionsData).map(key => ({
    label: regionsData[key].label,
    value: key
  }));
});

const communeOptions = computed(() => {
  const reg = regionsData[selectedRegion.value];
  if (!reg) return [];
  return reg.communes.map(c => ({ label: c, value: c }));
});

const activeRate = computed(() => regionsData[selectedRegion.value] || null);

watch(selectedRegion, (newReg) => {
  const firstCommune = regionsData[newReg]?.communes[0] || '';
  selectedCommune.value = firstCommune;
  emitChange();
});

watch(selectedCommune, () => {
  emitChange();
});

function emitChange() {
  const data = {
    region: selectedRegion.value,
    commune: selectedCommune.value,
    estimatedCost: activeRate.value?.cost || 0
  };
  emit('update:modelValue', data);
  emit('change', data);
}
</script>

<template>
  <div class="p-5 rounded-bilbola-md bg-bilbola-surface-neutral border border-bilbola-mint-light/80 space-y-4 font-bilbola shadow-2xs">
    <h4 class="font-black text-base text-bilbola-text-primary flex items-center gap-2">
      <svg class="h-5 w-5 text-bilbola-action-focus" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Calculador de Despacho en Chile
    </h4>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <BaseSelect v-model="selectedRegion" :options="regionOptions" label="Región de Envío" />
      <BaseSelect v-model="selectedCommune" :options="communeOptions" label="Comuna" />
    </div>

    <div v-if="activeRate" class="mt-4 pt-3 border-t border-bilbola-gray-light/40 flex items-center justify-between flex-wrap gap-2 text-sm bg-white p-3 rounded-bilbola-sm">
      <div>
        <span class="font-bold text-bilbola-text-primary block">Costo estimado:</span>
        <span class="text-xs text-bilbola-text-secondary">Plazo: {{ activeRate.days }}</span>
      </div>
      <div class="text-right">
        <PriceDisplay :amount="activeRate.cost" size="md" />
        <span v-if="selectedRegion === 'rm'" class="block text-[10px] text-bilbola-action-focus font-bold">
          ★ Gratis en RM sobre $49.990
        </span>
      </div>
    </div>
  </div>
</template>
