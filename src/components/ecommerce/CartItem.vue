<script setup lang="ts">
import { computed } from 'vue';
import QuantitySelector from '../ui/QuantitySelector.vue';
import PriceDisplay from './PriceDisplay.vue';

export interface Props {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  variantText?: string;
  customizationText?: string;
  maxStock?: number;
  readOnly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxStock: 99,
  readOnly: false
});

const emit = defineEmits<{
  (e: 'update:quantity', value: number): void;
  (e: 'remove', id: string | number): void;
}>();

const totalSubtotal = computed(() => props.price * props.quantity);

function onQuantityChange(val: number) {
  emit('update:quantity', val);
}
</script>

<template>
  <div class="flex items-start gap-4 py-4 border-b border-bilbola-gray-light/30 font-bilbola last:border-b-0">
    <!-- Thumbnail Image -->
    <a :href="`/productos/${id}`" class="h-20 w-20 shrink-0 overflow-hidden rounded-bilbola-sm border border-bilbola-gray-light/40 bg-bilbola-surface-neutral p-1 flex items-center justify-center">
      <img
        :src="imageUrl"
        :alt="name"
        class="h-full w-full object-contain object-center hover:scale-105 transition-transform duration-300"
      />
    </a>

    <!-- Item Details -->
    <div class="flex flex-1 flex-col justify-between gap-1">
      <div class="flex justify-between items-start gap-2">
        <div>
          <h4 class="font-bold text-sm text-bilbola-text-primary line-clamp-1">
            <a :href="`/productos/${id}`" class="hover:text-bilbola-mint-depth transition-colors">
              {{ name }}
            </a>
          </h4>
          <p v-if="variantText" class="text-xs text-bilbola-text-secondary mt-0.5">
            {{ variantText }}
          </p>
          <p v-if="customizationText" class="text-xs font-semibold text-bilbola-action-focus bg-bilbola-mint-light/40 px-2 py-0.5 rounded-sm mt-1 inline-block">
            ✨ {{ customizationText }}
          </p>
        </div>

        <!-- Remove Button (inline removal without restarting flow per brandbook) -->
        <button
          v-if="!readOnly"
          type="button"
          class="text-bilbola-text-secondary hover:text-red-600 rounded-full p-1 transition-colors focus:outline-none focus:ring-1 focus:ring-bilbola-action-focus"
          title="Eliminar del carrito"
          @click="emit('remove', id)"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <!-- Quantity controls & Price calculation -->
      <div class="flex items-center justify-between gap-3 mt-2">
        <QuantitySelector
          v-if="!readOnly"
          :model-value="quantity"
          :max="maxStock"
          size="sm"
          @update:model-value="onQuantityChange"
        />
        <span v-else class="text-xs text-bilbola-text-secondary font-semibold">
          Cant: {{ quantity }}
        </span>

        <div class="text-right">
          <PriceDisplay :amount="totalSubtotal" size="sm" />
          <span v-if="quantity > 1" class="block text-[10px] text-bilbola-text-secondary">
            (${{ price.toLocaleString('es-CL') }} c/u)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
