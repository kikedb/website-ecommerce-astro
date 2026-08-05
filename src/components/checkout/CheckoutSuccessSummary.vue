<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCart } from '@/composables/useCart';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import { 
  Sparkles, 
  CheckCircle2, 
  Package, 
  Calendar, 
  Copy, 
  ArrowRight, 
  Home, 
  Heart,
  Truck,
  User,
  ShieldCheck,
  Check
} from 'lucide-vue-next';

const orderData = ref<any>(null);
const isCopied = ref(false);

const { clearCart } = useCart();

onMounted(() => {
  // 1. Obtener la última orden simulada en localStorage
  const saved = localStorage.getItem('bilbola_last_order');
  if (saved) {
    try {
      orderData.value = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing order data:', e);
    }
  } else {
    // Orden de fallback para visualización si acceden directamente
    orderData.value = {
      order_id: `BIL-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: 49990,
      created_at: new Date().toISOString(),
      buyer: { firstName: 'Familia', lastName: 'Bílbola', email: 'cliente@bilbola.cl' },
      shipping: { type: 'delivery', address: 'Av. Providencia 1234', commune: 'Providencia', region: 'rm' },
      items: [
        { name: 'Cajita Mágica de Peluches Bílbola', quantity: 1, price: 49990 }
      ],
      status: 'approved'
    };
  }

  // 2. Limpieza obligatoria del estado para reanudar la experiencia del usuario (Fase 3 - A)
  clearCart();
  sessionStorage.removeItem('bilbola_checkout_buyer');
  sessionStorage.removeItem('bilbola_checkout_shipping');
});

function copyOrderId() {
  if (!orderData.value?.order_id) return;
  navigator.clipboard.writeText(orderData.value.order_id);
  isCopied.value = true;
  setTimeout(() => { isCopied.value = false; }, 2500);
}
</script>

<template>
  <div class="max-w-3xl mx-auto font-bilbola space-y-8 animate-fadeIn py-4">
    
    <!-- CABECERA DE CELEBRACIÓN -->
    <div class="text-center space-y-4">
      <div class="relative w-24 h-24 mx-auto">
        <!-- Círculo animado de éxito -->
        <div class="w-24 h-24 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center text-green-600 shadow-lg animate-bounce">
          <CheckCircle2 class="w-14 h-14 stroke-[2.2]" />
        </div>
        <Sparkles class="w-8 h-8 text-bilbola-support-pink absolute -top-2 -right-2 animate-spin duration-3000" />
      </div>

      <div class="space-y-2 max-w-xl mx-auto">
        <h1 class="text-2xl sm:text-3xl font-black text-bilbola-text-primary tracking-tight">
          🎉 ¡Tu pedido está confirmado y los peluches están bailando de felicidad!
        </h1>
        <p class="text-xs sm:text-sm text-bilbola-text-secondary leading-relaxed">
          Hemos enviado la boleta electrónica y el comprobante oficial de Flow al correo 
          <strong v-if="orderData?.buyer?.email" class="text-bilbola-action-focus font-extrabold underline decoration-2">{{ orderData.buyer.email }}</strong>
          <strong v-else class="text-bilbola-action-focus font-extrabold">tu correo electrónico</strong>.
        </p>
      </div>
    </div>

    <!-- FICHA OFICIAL DEL PEDIDO (Crema Suave Brandbook) -->
    <div v-if="orderData" class="bg-bilbola-surface-warm border-2 border-bilbola-support-pink rounded-bilbola-lg p-6 sm:p-8 shadow-md space-y-7 relative overflow-hidden">
      
      <!-- Sello flotante decorativo -->
      <div class="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/40 pointer-events-none" />

      <!-- Cabecera de la ficha: Número de orden y badge verde -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-bilbola-support-pink/60 pb-5">
        <div>
          <span class="text-[11px] font-black text-bilbola-text-secondary uppercase tracking-widest block">
            Código de Adopción &amp; Orden Mágica
          </span>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-2xl sm:text-3xl font-black text-bilbola-text-primary tracking-wider font-mono">
              {{ orderData.order_id }}
            </span>
            <button
              type="button"
              class="px-2.5 py-1.5 rounded-sm bg-white border border-bilbola-support-pink text-xs font-bold text-bilbola-text-primary hover:bg-bilbola-mint-light transition-all flex items-center gap-1 shadow-2xs focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus"
              title="Copiar código al portapapeles"
              @click="copyOrderId"
            >
              <Check v-if="isCopied" class="w-4 h-4 text-green-600 shrink-0" />
              <Copy v-else class="w-4 h-4 text-bilbola-action-focus shrink-0" />
              <span v-if="isCopied" class="text-[10px] text-green-700 font-extrabold uppercase">¡Copiado!</span>
              <span v-else class="text-[10px]">Copiar</span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-white font-black text-xs uppercase tracking-wider shadow-sm shrink-0">
          <span>✔ Aprobado por Flow / Webpay</span>
        </div>
      </div>

      <!-- Grid de antecedentes: Comprador y Envío -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-white/70 p-5 rounded-bilbola-md border border-bilbola-support-pink/40">
        
        <div class="space-y-1.5">
          <span class="font-black text-bilbola-text-primary uppercase flex items-center gap-1.5 border-b border-bilbola-gray-light/30 pb-1.5">
            <User class="w-4 h-4 text-bilbola-action-focus" />
            Datos de Contacto:
          </span>
          <p class="font-extrabold text-bilbola-text-primary text-sm pt-1">
            {{ orderData.buyer?.firstName }} {{ orderData.buyer?.lastName }}
          </p>
          <p class="text-bilbola-text-secondary">{{ orderData.buyer?.phone || 'Sin teléfono' }}</p>
          <p v-if="orderData.buyer?.isGift" class="text-[11px] font-bold text-bilbola-support-pink bg-bilbola-surface-warm px-2 py-0.5 rounded-sm inline-block mt-1">
            🎁 Incluye Tarjeta de Regalo Física
          </p>
        </div>

        <div class="space-y-1.5">
          <span class="font-black text-bilbola-text-primary uppercase flex items-center gap-1.5 border-b border-bilbola-gray-light/30 pb-1.5">
            <Truck class="w-4 h-4 text-bilbola-action-focus" />
            Modalidad &amp; Plazo de Entrega:
          </span>
          <template v-if="orderData.shipping?.type === 'delivery'">
            <p class="font-bold text-bilbola-text-primary text-xs sm:text-sm pt-1">🚚 Despacho a Domicilio</p>
            <p class="text-bilbola-text-secondary">{{ orderData.shipping.address }} ({{ orderData.shipping.commune }})</p>
            <p class="text-[11px] text-green-700 font-extrabold bg-green-50 px-2 py-0.5 rounded-sm inline-block mt-1">
              Plazo estimado: 2 a 4 días hábiles
            </p>
          </template>
          <template v-else>
            <p class="font-bold text-bilbola-text-primary text-xs sm:text-sm pt-1">🏬 Retiro en Bodega Bílbola</p>
            <p class="text-bilbola-text-secondary">General Holley 2345, Providencia, Santiago.</p>
            <p class="text-[11px] text-green-700 font-extrabold bg-green-50 px-2 py-0.5 rounded-sm inline-block mt-1">
              Listo para retirar en 24 Hrs hábiles
            </p>
          </template>
        </div>

      </div>

      <!-- Resumen de ítems adquiridos -->
      <div class="space-y-3">
        <span class="text-xs font-black text-bilbola-text-primary uppercase tracking-wider block">
          🧸 Amigos y Decoración en tu Caja Mágica:
        </span>
        
        <div class="divide-y divide-bilbola-support-pink/40 bg-white/80 rounded-bilbola-md p-4 border border-bilbola-support-pink/50">
          <div 
            v-for="(item, idx) in (orderData.items || [])" 
            :key="idx" 
            class="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full bg-bilbola-mint-light/50 text-bilbola-action-focus font-black flex items-center justify-center shrink-0">
                {{ item.quantity }}x
              </span>
              <span class="font-extrabold text-bilbola-text-primary">{{ item.name }}</span>
            </div>
            <span class="font-black text-bilbola-text-primary shrink-0">
              ${{ ((item.price || 0) * item.quantity).toLocaleString('es-CL') }}
            </span>
          </div>
        </div>

        <div class="flex justify-between items-baseline pt-2 px-2 text-bilbola-text-primary">
          <span class="text-base font-black uppercase">Total Autorizado en Flow:</span>
          <span class="text-2xl sm:text-3xl font-black text-bilbola-action-focus font-mono">
            ${{ Number(orderData.amount || 0).toLocaleString('es-CL') }} CLP
          </span>
        </div>
      </div>

    </div>

    <!-- BOTONES DE ACCIONES POSTERIORES -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
      <a
        href="/productos"
        class="w-full sm:w-auto px-8 py-4 bg-bilbola-action-primary text-white text-sm font-black rounded-bilbola-sm tracking-wide uppercase shadow-lg hover:bg-bilbola-action-focus hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <Heart class="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform duration-200" />
        <span>Volver al Catálogo Mágico</span>
      </a>

      <a
        href="/contacto"
        class="w-full sm:w-auto px-6 py-4 bg-white border-2 border-bilbola-gray-light/80 text-bilbola-text-primary hover:border-bilbola-action-focus hover:text-bilbola-action-focus text-xs font-extrabold rounded-bilbola-sm transition-all text-center flex items-center justify-center gap-2"
      >
        <span>¿Dudas con el envío? Contactar Soporte</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

  </div>
</template>
