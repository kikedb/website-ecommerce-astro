<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseDrawer from '@/components/ui/BaseDrawer.vue';
import BaseToggle from '@/components/ui/BaseToggle.vue';
import PriceRangeSlider from '@/components/ui/PriceRangeSlider.vue';

export interface FilterCategory {
  id: string;
  name: string;
  options: { label: string; value: string; count?: number }[];
}

export interface Props {
  categories?: FilterCategory[];
  minPrice?: number;
  maxPrice?: number;
  totalResults?: number;
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [
    {
      id: 'type',
      name: 'Categoría Deco',
      options: [
        { label: 'Lámparas y Nubes', value: 'lampara', count: 12 },
        { label: 'Cojines y Textiles', value: 'cojin', count: 18 },
        { label: 'Repisas de Madera', value: 'repisa', count: 8 },
        { label: 'Murales y Adornos', value: 'mural', count: 6 }
      ]
    }
  ],
  minPrice: 0,
  maxPrice: 80000,
  totalResults: 44
});

const emit = defineEmits<{
  (e: 'filterChange', filters: any): void;
  (e: 'clearAll'): void;
}>();

const selectedOptions = ref<Record<string, string[]>>({});
const priceRange = ref<[number, number]>([props.minPrice, props.maxPrice]);
const onlyInStock = ref(false);
const isMobileDrawerOpen = ref(false);

function toggleOption(catId: string, val: string) {
  if (!selectedOptions.value[catId]) {
    selectedOptions.value[catId] = [];
  }
  const idx = selectedOptions.value[catId].indexOf(val);
  if (idx === -1) {
    selectedOptions.value[catId].push(val);
  } else {
    selectedOptions.value[catId].splice(idx, 1);
  }
  notifyChange();
}

function notifyChange() {
  emit('filterChange', {
    options: selectedOptions.value,
    price: priceRange.value,
    inStock: onlyInStock.value
  });
}

function clearAll() {
  selectedOptions.value = {};
  priceRange.value = [props.minPrice, props.maxPrice];
  onlyInStock.value = false;
  emit('clearAll');
}
</script>

<template>
  <div class="font-bilbola">
    <!-- Desktop Sidebar View & Mobile Trigger Header -->
    <div class="flex items-center justify-between lg:hidden mb-4 p-3 bg-white rounded-bilbola-sm border border-bilbola-gray-light/40 shadow-2xs">
      <span class="font-bold text-bilbola-text-primary text-sm">{{ totalResults }} Productos</span>
      <BaseButton variant="outline" size="sm" @click="isMobileDrawerOpen = true">
        <svg class="w-4 h-4 mr-1.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110 4m0 4v2m0-6V4" />
        </svg>
        Filtrar y Ordenar
      </BaseButton>
    </div>

    <!-- Desktop Persistent Sidebar -->
    <aside class="hidden lg:block space-y-6 w-64 p-5 bg-white rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs">
      <div class="flex items-center justify-between border-b border-bilbola-gray-light/20 pb-3">
        <h3 class="font-black text-lg text-bilbola-text-primary">Filtros</h3>
        <button type="button" @click="clearAll" class="text-xs font-bold text-bilbola-action-focus hover:underline">
          Limpiar todos
        </button>
      </div>

      <!-- Categories Checkboxes -->
      <div v-for="cat in categories" :key="cat.id" class="space-y-3 border-b border-bilbola-gray-light/20 pb-4">
        <h4 class="font-bold text-sm text-bilbola-text-primary">{{ cat.name }}</h4>
        <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
          <label
            v-for="opt in cat.options"
            :key="opt.value"
            class="flex items-center justify-between text-sm text-bilbola-text-secondary hover:text-bilbola-text-primary cursor-pointer transition-colors"
          >
            <span class="flex items-center gap-2">
              <input
                type="checkbox"
                :checked="selectedOptions[cat.id]?.includes(opt.value)"
                @change="toggleOption(cat.id, opt.value)"
                class="rounded-sm border-bilbola-gray-light text-bilbola-action-focus focus:ring-bilbola-action-focus h-4 w-4"
              />
              {{ opt.label }}
            </span>
            <span v-if="opt.count !== undefined" class="text-xs text-bilbola-text-secondary/60 font-semibold">({{ opt.count }})</span>
          </label>
        </div>
      </div>

      <!-- Price Range Slider -->
      <div class="space-y-3 border-b border-bilbola-gray-light/20 pb-4">
        <h4 class="font-bold text-sm text-bilbola-text-primary">Rango de Precio</h4>
        <PriceRangeSlider v-model="priceRange" :min="minPrice" :max="maxPrice" @change="notifyChange" />
      </div>

      <!-- Toggle In Stock -->
      <div class="pt-1">
        <BaseToggle v-model="onlyInStock" label="Solo con Stock disponible" @update:model-value="notifyChange" />
      </div>
    </aside>

    <!-- Mobile Drawer Offcanvas Filters -->
    <BaseDrawer v-model="isMobileDrawerOpen" title="Filtros de Catálogo" side="right">
      <div class="space-y-6 py-2">
        <div v-for="cat in categories" :key="cat.id" class="space-y-3 border-b border-bilbola-gray-light/20 pb-4">
          <h4 class="font-bold text-base text-bilbola-text-primary">{{ cat.name }}</h4>
          <div class="space-y-2">
            <label
              v-for="opt in cat.options"
              :key="opt.value"
              class="flex items-center justify-between text-sm text-bilbola-text-secondary cursor-pointer py-1"
            >
              <span class="flex items-center gap-2 font-medium">
                <input
                  type="checkbox"
                  :checked="selectedOptions[cat.id]?.includes(opt.value)"
                  @change="toggleOption(cat.id, opt.value)"
                  class="rounded-sm border-bilbola-gray-light text-bilbola-action-focus focus:ring-bilbola-action-focus h-5 w-5"
                />
                {{ opt.label }}
              </span>
              <span v-if="opt.count !== undefined" class="text-xs text-bilbola-text-secondary/60">({{ opt.count }})</span>
            </label>
          </div>
        </div>

        <div class="space-y-3 border-b border-bilbola-gray-light/20 pb-4">
          <h4 class="font-bold text-base text-bilbola-text-primary">Rango de Precio</h4>
          <PriceRangeSlider v-model="priceRange" :min="minPrice" :max="maxPrice" @change="notifyChange" />
        </div>

        <div class="pt-2">
          <BaseToggle v-model="onlyInStock" label="Solo con Stock disponible" @update:model-value="notifyChange" />
        </div>
      </div>

      <template #footer>
        <div class="flex gap-3 w-full">
          <BaseButton variant="ghost" class="w-1/3" @click="clearAll; isMobileDrawerOpen = false">Limpiar</BaseButton>
          <BaseButton variant="primary" class="w-2/3 shadow-md" @click="isMobileDrawerOpen = false">
            Ver {{ totalResults }} Productos
          </BaseButton>
        </div>
      </template>
    </BaseDrawer>
  </div>
</template>
