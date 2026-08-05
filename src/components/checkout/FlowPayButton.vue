<script setup lang="ts">
import { ref } from 'vue';
import { Lock, Sparkles, Loader2 } from 'lucide-vue-next';
import { useCart } from '@/composables/useCart';

export interface Props {
  amount: number;
  buyer: any;
  shipping: any;
  paymentMethod: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  paymentMethod: 'flow_webpay'
});

const { items, totalPrice } = useCart();
const isConnecting = ref(false);

function startFlowPayment() {
  if (props.disabled || isConnecting.value) return;

  isConnecting.value = true;

  // Generar ID mágico de orden de prueba para Bílbola
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

  // Respaldo en localStorage de la última transacción para las pantallas de retorno
  try {
    localStorage.setItem('bilbola_last_order', JSON.stringify(payload));
  } catch (e) {
    console.error('Error saving order payload:', e);
  }

  // Simulamos el tiempo de handshake asíncrono con el backend de Laravel y Flow SSL
  setTimeout(() => {
    // En entorno local de desarrollo, redirigimos directamente al Simulador de Pasarela Flow
    const targetUrl = `/checkout/fake-gateway?order_id=${encodeURIComponent(orderId)}&amount=${props.amount}&method=${encodeURIComponent(props.paymentMethod)}`;
    window.location.href = targetUrl;
  }, 1800);
}
</script>

<template>
  <div class="w-full font-bilbola">
    
    <!-- BOTÓN PRINCIPAL DE PAGO FLOW -->
    <button
      type="button"
      :disabled="disabled || isConnecting"
      class="w-full py-5 px-6 rounded-bilbola-md bg-bilbola-action-primary text-white font-black text-base sm:text-lg tracking-wide uppercase shadow-xl hover:bg-bilbola-mint-depth hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-bilbola-mint-light/80 flex items-center justify-center gap-3 group relative overflow-hidden"
      @click="startFlowPayment"
    >
      <!-- Efecto de brillo -->
      <div class="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-300 transition-transform duration-1000 pointer-events-none" />

      <Lock v-if="!isConnecting" class="w-6 h-6 stroke-[2.2] shrink-0 text-bilbola-mint-light group-hover:scale-110 transition-transform duration-200" />
      <Loader2 v-else class="w-6 h-6 animate-spin shrink-0 text-white" />

      <span v-if="!isConnecting" class="flex items-center gap-2">
        <span>Confirmar y Pagar ${{ amount.toLocaleString('es-CL') }} en Flow</span>
        <span class="text-xs px-2 py-0.5 rounded-sm bg-black/20 font-bold lowercase">ssl 256-bit</span>
      </span>
      <span v-else class="animate-pulse">Conectando con servidores bancarios encriptados...</span>
    </button>

    <!-- OVERLAY MÁGICO DE CONEXIÓN BANCARIA (Se muestra mientras redirige) -->
    <Teleport to="body">
      <div 
        v-if="isConnecting" 
        class="fixed inset-0 z-50 bg-bilbola-surface-dark/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn font-bilbola"
      >
        <div class="bg-white rounded-bilbola-lg p-8 sm:p-10 max-w-md w-full shadow-2xl border-4 border-bilbola-action-focus space-y-6 relative overflow-hidden">
          
          <div class="w-20 h-20 rounded-full bg-bilbola-mint-light/40 border-2 border-bilbola-action-focus/50 mx-auto flex items-center justify-center relative shadow-inner animate-pulse">
            <Loader2 class="w-10 h-10 text-bilbola-action-focus animate-spin" />
            <Sparkles class="w-6 h-6 text-bilbola-support-pink absolute top-1 right-1 animate-bounce" />
          </div>

          <div class="space-y-2">
            <h3 class="text-xl font-extrabold text-bilbola-text-primary">
              ¡Conectando con el Banco! 🚀
            </h3>
            <p class="text-xs sm:text-sm text-bilbola-text-secondary leading-relaxed">
              Estamos abriendo tu canal seguro en milisegundos con los servidores encriptados de <strong>Flow y Transbank</strong>.
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
