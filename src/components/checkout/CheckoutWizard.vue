<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCart } from '@/composables/useCart';
import CheckoutStepsTracker from '@/components/ecommerce/CheckoutStepsTracker.vue';
import OrderSummaryCard from '@/components/checkout/OrderSummaryCard.vue';
import Step1Cart from '@/components/checkout/steps/Step1Cart.vue';
import Step2BuyerInfo, { type BuyerData } from '@/components/checkout/steps/Step2BuyerInfo.vue';
import Step3Shipping, { type ShippingData } from '@/components/checkout/steps/Step3Shipping.vue';
import Step4Payment from '@/components/checkout/steps/Step4Payment.vue';

const { items, totalPrice } = useCart();

const currentStep = ref(1);

// Discount & Shipping state
const discountCode = ref('');
const discountPercentage = ref(0);
const shippingCost = ref<number | null>(null);

// Buyer & Shipping info state
const buyerData = ref<BuyerData | null>(null);
const shippingData = ref<ShippingData | null>(null);

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

function handleSaveShipping(data: ShippingData) {
  shippingData.value = data;
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

        <!-- PASO 3: Selección de Envío y Despacho -->
        <Step3Shipping
          v-else-if="currentStep === 3"
          @prev-step="goToStep(2)"
          @next-step="goToStep(4)"
          @save-shipping="handleSaveShipping"
          @update-shipping-cost="(val) => shippingCost = val"
        />

        <!-- PASO 4: Auditoría de Pedido & Pasarela de Pagos -->
        <Step4Payment
          v-else-if="currentStep === 4"
          @prev-step="goToStep(3)"
          @edit-step="goToStep"
        />

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
