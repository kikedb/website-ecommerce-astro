<script setup lang="ts">
import { computed } from 'vue';
import { useCart } from '@/composables/useCart';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import { Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-vue-next';

export interface Props {
  discountAmount?: number;
  discountCode?: string;
  shippingCost?: number | null;
  currentStep?: number;
}

const props = withDefaults(defineProps<Props>(), {
  discountAmount: 0,
  discountCode: '',
  shippingCost: null,
  currentStep: 1
});

const { items, totalPrice } = useCart();

const finalTotal = computed(() => {
  const base = totalPrice.value - props.discountAmount;
  const shipping = props.shippingCost || 0;
  return Math.max(0, base + shipping);
});
</script>

<template>
  <aside aria-label="Resumen de tu compra" class="w-full font-bilbola">
    <div class="bg-bilbola-surface-neutral rounded-bilbola-lg p-6 sm:p-7 border border-bilbola-gray-light/30 shadow-md transition-all">
      
      <!-- Cabecera y contador de ítems -->
      <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-4 mb-4">
        <h3 class="text-lg font-extrabold text-bilbola-text-primary flex items-center gap-2">
          <span>Tu Bolsa Mágica</span>
          <Sparkles class="h-5 w-5 text-bilbola-action-focus" />
        </h3>
        <span class="px-2.5 py-0.5 rounded-full bg-bilbola-mint-light/40 text-bilbola-action-focus text-xs font-black">
          {{ items.reduce((acc, i) => acc + i.quantity, 0) }} art.
        </span>
      </div>

      <!-- Lista resumida con scroll suave de ítems seleccionados -->
      <div class="max-h-64 overflow-y-auto space-y-3 pr-1 divide-y divide-bilbola-gray-light/15 mb-6">
        <div 
          v-for="item in items" 
          :key="`${item.id}-${item.variantText || ''}`"
          class="pt-3 first:pt-0 flex items-center gap-3"
        >
          <img 
            :src="item.imageUrl" 
            :alt="item.name" 
            class="h-12 w-12 rounded-bilbola-sm object-contain bg-white border border-bilbola-gray-light/30 p-1 shrink-0" 
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-bold text-bilbola-text-primary truncate">{{ item.name }}</h4>
            <p v-if="item.variantText" class="text-[11px] text-bilbola-text-secondary truncate">{{ item.variantText }}</p>
            <p class="text-[11px] font-semibold text-bilbola-text-secondary mt-0.5">Cant: {{ item.quantity }}</p>
          </div>
          <div class="text-right shrink-0">
            <span class="text-xs font-extrabold text-bilbola-text-primary">
              ${{ (item.price * item.quantity).toLocaleString('es-CL') }}
            </span>
          </div>
        </div>

        <div v-if="items.length === 0" class="py-6 text-center text-xs text-bilbola-text-secondary italic">
          No hay productos seleccionados.
        </div>
      </div>

      <!-- Desglose Económico -->
      <div class="space-y-3 pt-4 border-t border-bilbola-gray-light/30 text-sm">
        <div class="flex justify-between items-center text-bilbola-text-secondary font-semibold">
          <span>Subtotal</span>
          <span class="font-bold text-bilbola-text-primary">${{ totalPrice.toLocaleString('es-CL') }}</span>
        </div>

        <div v-if="discountAmount > 0" class="flex justify-between items-center text-bilbola-action-focus font-semibold bg-bilbola-mint-light/20 px-2.5 py-1.5 rounded-bilbola-sm">
          <span class="flex items-center gap-1">
            🎁 Cupón ({{ discountCode }}):
          </span>
          <span class="font-bold">-${{ discountAmount.toLocaleString('es-CL') }}</span>
        </div>

        <div class="flex justify-between items-center text-bilbola-text-secondary font-semibold">
          <span class="flex items-center gap-1.5">
            <Truck class="h-4 w-4 text-bilbola-text-secondary" />
            Despacho
          </span>
          <span v-if="shippingCost === null" class="text-xs font-bold italic text-bilbola-text-secondary/80 bg-bilbola-gray-light/20 px-2 py-0.5 rounded-sm">
            Calculado en Paso 3
          </span>
          <span v-else-if="shippingCost === 0" class="text-xs font-black text-bilbola-action-focus bg-bilbola-mint-light/40 px-2 py-0.5 rounded-sm">
            GRATIS
          </span>
          <span v-else class="font-bold text-bilbola-text-primary">
            ${{ shippingCost.toLocaleString('es-CL') }}
          </span>
        </div>

        <!-- Total Definido -->
        <div class="flex justify-between items-baseline pt-4 border-t-2 border-bilbola-gray-light/40 text-bilbola-text-primary">
          <span class="text-base font-black uppercase tracking-wide">Total a Pagar</span>
          <PriceDisplay :amount="finalTotal" size="xl" />
        </div>
        <p class="text-[10px] text-right text-bilbola-text-secondary font-medium">
          IVA (19%) incluido
        </p>
      </div>

      <!-- Garantía y Confianza (Sello de Paz Mental) -->
      <div class="mt-6 pt-5 border-t border-bilbola-gray-light/30 space-y-2.5 text-[11px] text-bilbola-text-secondary">
        <div class="flex items-start gap-2.5">
          <ShieldCheck class="w-4 h-4 text-bilbola-action-focus shrink-0 mt-0.5" />
          <p>
            <strong class="text-bilbola-text-primary font-bold">Resguardo Bancario SSL:</strong>
            Conexión encriptada con Flow, Webpay y bancos en tiempo real.
          </p>
        </div>
        <div class="flex items-start gap-2.5">
          <RotateCcw class="w-4 h-4 text-bilbola-action-focus shrink-0 mt-0.5" />
          <p>
            <strong class="text-bilbola-text-primary font-bold">30 Días de Garantía Mágica:</strong>
            Cambios o devoluciones sin preguntas ni trámites tediosos.
          </p>
        </div>
      </div>

    </div>
  </aside>
</template>
