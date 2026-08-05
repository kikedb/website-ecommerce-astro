<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '@/composables/useCart';
import CheckoutStepsTracker from '@/components/ecommerce/CheckoutStepsTracker.vue';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard.vue';
import Step1Cart from '@/components/checkout/steps/Step1Cart.vue';
import Step2BuyerInfo, { type BuyerData } from '@/components/checkout/steps/Step2BuyerInfo.vue';

const { items, totalPrice } = useCart();

const currentStep = ref(1);

// Discount & Shipping state
const discountCode = ref('');
const discountPercentage = ref(0);
const shippingCost = ref<number | null>(null);

// Buyer & Order info state
const buyerData = ref<BuyerData | null>(null);

const discountAmount = computed(() => {
  if (!discountPercentage.value || totalPrice.value <= 0) return 0;
  return Math.round(totalPrice.value * (discountPercentage.value / 100));
});

function handleApplyDiscount(code: string, percentage: number) {
  discountCode.value = code;
  discountPercentage.value = percentage;
}

function handleRemoveDiscount() {
  discountCode.value = '';
  discountPercentage.value = 0;
}

function handleSaveBuyer(data: BuyerData) {
  buyerData.value = data;
}

function goToStep(stepNumber: number) {
  if (stepNumber >= 1 && stepNumber <= 4) {
    currentStep.value = stepNumber;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<template>
  <div class="font-bilbola space-y-8">
    
    <!-- BARRA INTERACTIVA DEL PROGRESO DE LOS 4 PASOS -->
    <div class="bg-white rounded-bilbola-lg p-4 sm:p-6 border border-bilbola-gray-light/30 shadow-xs">
      <CheckoutStepsTracker :current-step="currentStep" />
    </div>

    <!-- GRID DE 2 COLUMNAS (CONTENIDO DEL PASO A LA IZQUIERDA / RESUMEN A LA DERECHA) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- COLUMNA IZQUIERDA: Flujo del Paso Actual -->
      <div class="lg:col-span-7 xl:col-span-8">
        
        <!-- PASO 1: Resumen y Carrito -->
        <Step1Cart
          v-if="currentStep === 1"
          @next-step="goToStep(2)"
          @apply-discount="handleApplyDiscount"
          @remove-discount="handleRemoveDiscount"
        />

        <!-- PASO 2: Datos del Comprador & Nota Mágica -->
        <Step2BuyerInfo
          v-else-if="currentStep === 2"
          @prev-step="goToStep(1)"
          @next-step="goToStep(3)"
          @save-buyer="handleSaveBuyer"
        />

        <!-- PLACEHOLDER TEMPORAL PARA PASO 3 (Pronto a construirse) -->
        <div 
          v-else-if="currentStep === 3" 
          class="bg-white rounded-bilbola-lg border border-bilbola-gray-light/30 p-8 shadow-sm text-center space-y-6 animate-fadeIn"
        >
          <div class="w-14 h-14 rounded-full bg-bilbola-mint-light/40 mx-auto flex items-center justify-center text-bilbola-action-focus text-2xl font-black">
            3
          </div>
          <h2 class="text-xl font-extrabold text-bilbola-text-primary">
            Paso 3: Selección de Despacho a Domicilio o Retiro en Bodega
          </h2>
          <p class="text-sm text-bilbola-text-secondary max-w-md mx-auto leading-relaxed">
            Los datos de contacto y dedicatoria de regalo de <strong v-if="buyerData" class="text-bilbola-text-primary">{{ buyerData.firstName }}</strong> han sido guardados con éxito en memoria transaccional. Este paso 3 (selección de región/comuna, cálculo del flete y opción de retiro en punto $0) será implementado en el siguiente hito de nuestro plan de checkout.
          </p>
          
          <div class="pt-4 border-t border-bilbola-gray-light/30 flex justify-center gap-4">
            <button
              type="button"
              class="px-6 py-3 rounded-bilbola-sm bg-bilbola-surface-neutral text-bilbola-text-primary font-bold text-xs hover:bg-bilbola-gray-light/40 transition-colors"
              @click="goToStep(2)"
            >
              🡠 Volver al Paso 2 (Datos del Comprador)
            </button>
          </div>
        </div>

      </div>

      <!-- COLUMNA DERECHA: Tarjeta de Resumen en Vivo -->
      <div class="lg:col-span-5 xl:col-span-4 sticky top-24 z-20">
        <OrderSummaryCard
          :discount-amount="discountAmount"
          :discount-code="discountCode"
          :shipping-cost="shippingCost"
          :current-step="currentStep"
        />
      </div>

    </div>

  </div>
</template>
