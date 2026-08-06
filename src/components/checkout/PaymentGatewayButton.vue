<script setup lang="ts">
import { ref } from 'vue';
import { Lock, Sparkles, Loader2 } from 'lucide-vue-next';
import { useCart } from '@/composables/useCart';
import BaseButton from '@/components/ui/BaseButton.vue';

export interface Props {
  amount: number;
  buyer: any;
  shipping: any;
  paymentMethod: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  paymentMethod: 'gateway_card'
});

const { items, totalPrice } = useCart();
const isConnecting = ref(false);

function startPayment() {
  if (props.disabled || isConnecting.value) return;

  isConnecting.value = true;

  // Generar ID de orden para la transacción
  const orderId = `BIL-${Math.floor(100000 + Math.random() * 900000)}`;

  const payload = {
    order_id: orderId,
    amount: props.amount,
    created_at: new Date().toISOString(),
    buyer: props.buyer,
    shipping: props.shipping,
    items: items.value,
    payment_method: props.paymentMethod,
    status: 'pending_payment'
  };

  // Respaldo en localStorage de la última transacción para las pantallas de conclusión
  try {
    localStorage.setItem('bilbola_last_order', JSON.stringify(payload));
  } catch (e) {
    console.error('Error saving order payload:', e);
  }

  // Simulamos el tiempo de handshake asíncrono con los servicios encriptados bancarios
  setTimeout(() => {
    // En entorno de desarrollo o QA, redirigimos al Simulador de Pasarela de Pagos
    const targetUrl = `/checkout/fake-gateway?order_id=${encodeURIComponent(orderId)}&amount=${props.amount}&method=${encodeURIComponent(props.paymentMethod)}`;
    window.location.href = targetUrl;
  }, 1800);
}
</script>

<template>
  <div class="w-full font-bilbola">
    
    <!-- BOTÓN PRINCIPAL DE PAGO EN LÍNEA -->
    <BaseButton
      size="lg"
      :disabled="disabled"
      :loading="isConnecting"
      class="w-full py-5 px-6 font-black text-base sm:text-lg tracking-wide uppercase shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group relative overflow-hidden"
      @click="startPayment"
    >
      <!-- Efecto de brillo -->
      <div class="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-300 transition-transform duration-1000 pointer-events-none" />

      <Lock v-if="!isConnecting" class="w-6 h-6 stroke-[2.2] shrink-0 text-bilbola-mint-light group-hover:scale-110 transition-transform duration-200" />

      <span v-if="!isConnecting" class="flex items-center gap-2">
        <span>Confirmar y Pagar ${{ amount.toLocaleString('es-CL') }} en Línea</span>
        <span class="text-xs px-2 py-0.5 rounded-sm bg-black/20 font-bold lowercase">ssl 256-bit</span>
      </span>
      <span v-else class="animate-pulse ml-2">Conectando con servidores bancarios encriptados...</span>
    </BaseButton>

    <!-- OVERLAY DE CONEXIÓN BANCARIA ENCRIPTADA -->
    <Teleport to="body">
      <div 
        v-if="isConnecting" 
        class="fixed inset-0 z-50 bg-bilbola-surface-dark/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn font-bilbola"
      >
        <div class="bg-white rounded-bilbola-lg p-8 sm:p-10 max-w-md w-full shadow-2xl border-2 border-bilbola-action-focus space-y-6 relative overflow-hidden">
          
          <div class="w-20 h-20 rounded-full bg-bilbola-mint-light/40 border border-bilbola-action-focus/50 mx-auto flex items-center justify-center relative shadow-inner">
            <Loader2 class="w-10 h-10 text-bilbola-action-focus animate-spin" />
          </div>

          <div class="space-y-2">
            <h3 class="text-xl font-black text-bilbola-text-primary">
              Conectando con la Pasarela de Pagos...
            </h3>
            <p class="text-xs sm:text-sm text-bilbola-text-secondary leading-relaxed font-semibold">
              Estamos abriendo tu canal seguro en milisegundos con los servidores encriptados de la <strong>Pasarela Bancaria</strong>.
            </p>
          </div>

          <div class="p-3 bg-bilbola-surface-neutral rounded-bilbola-sm border border-bilbola-gray-light/40 text-[11px] text-bilbola-text-secondary font-bold flex items-center justify-center gap-2">
            <Lock class="w-3.5 h-3.5 text-green-600 shrink-0" />
            <span>Por favor no cierres ni actualices esta ventana...</span>
          </div>

        </div>
      </div>
    </Teleport>

  </div>
</template>
