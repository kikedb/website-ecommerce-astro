<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCart } from '@/composables/useCart';
import { 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  ShoppingBag,
  Truck,
  User,
  Check,
  Gift,
  Store,
  ShieldCheck,
  Package
} from 'lucide-vue-next';

const orderData = ref<any>(null);
const isCopied = ref(false);

const { clearCart } = useCart();

onMounted(() => {
  const saved = localStorage.getItem('bilbola_last_order');
  if (saved) {
    try {
      orderData.value = JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing order data:', e);
    }
  } else {
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
  <div class="max-w-3xl mx-auto font-bilbola space-y-8 animate-fadeIn py-6 px-2">
    
    <!-- CABECERA DE CONFIRMACIÓN -->
    <div class="text-center space-y-4 max-w-xl mx-auto">
      <div class="w-20 h-20 rounded-full bg-emerald-50 border border-green-500/40 mx-auto flex items-center justify-center text-green-600 shadow-xs">
        <CheckCircle2 class="w-11 h-11 stroke-[2.2]" />
      </div>

      <div class="space-y-2">
        <h1 class="text-2xl sm:text-3xl font-black text-bilbola-text-primary tracking-tight font-serif">
          Tu pedido ha sido confirmado con éxito
        </h1>
        <p class="text-xs sm:text-sm text-bilbola-text-secondary leading-relaxed font-semibold">
          Hemos procesado tu compra y enviado la boleta electrónica junto al comprobante oficial a la dirección 
          <strong v-if="orderData?.buyer?.email" class="text-bilbola-action-focus font-extrabold underline decoration-2">{{ orderData.buyer.email }}</strong>
          <strong v-else class="text-bilbola-action-focus font-extrabold">tu correo electrónico</strong>.
        </p>
      </div>
    </div>

    <!-- FICHA DE VOUCHER DIGITAL -->
    <div v-if="orderData" class="bg-white border border-green-500/30 rounded-bilbola-lg p-6 sm:p-8 shadow-sm space-y-7 relative overflow-hidden">
      
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-bilbola-gray-light/40 pb-5">
        <div>
          <span class="text-[10px] font-black text-bilbola-text-secondary uppercase tracking-widest block">
            Código de Orden &amp; Comprobante Electrónico
          </span>
          <div class="flex items-center gap-3 mt-1">
            <span class="text-2xl sm:text-3xl font-black text-bilbola-text-primary tracking-wider font-mono">
              {{ orderData.order_id }}
            </span>
            <button
              type="button"
              class="px-3 py-1.5 rounded-sm bg-bilbola-surface-neutral border border-bilbola-gray-light/60 text-xs font-extrabold text-bilbola-text-primary hover:bg-bilbola-mint-light/40 hover:border-bilbola-action-focus transition-all flex items-center gap-1.5 shadow-2xs focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus"
              title="Copiar código al portapapeles"
              @click="copyOrderId"
            >
              <Check v-if="isCopied" class="w-3.5 h-3.5 text-green-600 shrink-0" />
              <Copy v-else class="w-3.5 h-3.5 text-bilbola-action-focus shrink-0" />
              <span v-if="isCopied" class="text-[10px] text-green-700 font-extrabold uppercase">Copiado</span>
              <span v-else class="text-[10px] uppercase tracking-wide">Copiar</span>
            </button>
          </div>
        </div>

        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-green-500/40 text-green-800 font-black text-xs uppercase tracking-wider shrink-0 shadow-2xs">
          <Check class="w-3.5 h-3.5 text-green-600 stroke-[3]" />
          <span>Aprobado en Pasarela de Pagos</span>
        </div>
      </div>

      <!-- Grid de antecedentes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs bg-bilbola-surface-neutral/40 p-5 rounded-bilbola-md border border-bilbola-gray-light/30">
        
        <div class="space-y-2">
          <div class="flex items-center gap-1.5 border-b border-bilbola-gray-light/40 pb-2">
            <User class="w-4 h-4 text-bilbola-action-focus" />
            <span class="font-black text-bilbola-text-primary uppercase tracking-wide text-[11px]">Datos de Contacto</span>
          </div>
          <p class="font-black text-bilbola-text-primary text-sm pt-1">
            {{ orderData.buyer?.firstName }} {{ orderData.buyer?.lastName }}
          </p>
          <p class="text-bilbola-text-secondary font-semibold">{{ orderData.buyer?.phone || 'Sin teléfono' }}</p>
          <div v-if="orderData.buyer?.isGift" class="pt-1">
            <span class="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-bilbola-action-focus bg-white px-2.5 py-1 rounded-sm border border-bilbola-gray-light/60 shadow-2xs">
              <Gift class="w-3.5 h-3.5 text-bilbola-action-focus" />
              <span>Incluye Tarjeta de Regalo Física</span>
            </span>
          </div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-1.5 border-b border-bilbola-gray-light/40 pb-2">
            <Truck v-if="orderData.shipping?.type === 'delivery'" class="w-4 h-4 text-bilbola-action-focus" />
            <Store v-else class="w-4 h-4 text-bilbola-action-focus" />
            <span class="font-black text-bilbola-text-primary uppercase tracking-wide text-[11px]">Modalidad de Entrega</span>
          </div>
          
          <template v-if="orderData.shipping?.type === 'delivery'">
            <p class="font-black text-bilbola-text-primary text-sm pt-1">Despacho a Domicilio</p>
            <p class="text-bilbola-text-secondary font-semibold">{{ orderData.shipping.address }} ({{ orderData.shipping.commune }})</p>
            <div class="pt-1">
              <span class="inline-flex items-center gap-1.5 text-[11px] text-green-800 font-extrabold bg-emerald-50/80 px-2.5 py-1 rounded-sm border border-green-500/30">
                <ShieldCheck class="w-3.5 h-3.5 text-green-600 shrink-0" />
                <span>Plazo estimado: 2 a 4 días hábiles</span>
              </span>
            </div>
          </template>
          
          <template v-else>
            <p class="font-black text-bilbola-text-primary text-sm pt-1">Retiro en Taller Bílbola</p>
            <p class="text-bilbola-text-secondary font-semibold">General Holley 2345, Providencia, Santiago.</p>
            <div class="pt-1">
              <span class="inline-flex items-center gap-1.5 text-[11px] text-green-800 font-extrabold bg-emerald-50/80 px-2.5 py-1 rounded-sm border border-green-500/30">
                <Check class="w-3.5 h-3.5 text-green-600 shrink-0 stroke-[3]" />
                <span>Listo para retirar en 24 Hrs hábiles</span>
              </span>
            </div>
          </template>
        </div>

      </div>

      <!-- Resumen del Carrito -->
      <div class="space-y-3 pt-2">
        <div class="flex items-center gap-2">
          <Package class="w-4 h-4 text-bilbola-action-focus" />
          <span class="text-xs font-black text-bilbola-text-primary uppercase tracking-wider block">
            Detalle de Artículos Adquiridos
          </span>
        </div>
        
        <div class="divide-y divide-bilbola-gray-light/30 bg-bilbola-surface-neutral/20 rounded-bilbola-md p-4 border border-bilbola-gray-light/40">
          <div 
            v-for="(item, idx) in (orderData.items || [])" 
            :key="idx" 
            class="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full bg-bilbola-mint-light/40 text-bilbola-action-focus font-black flex items-center justify-center shrink-0 border border-bilbola-action-focus/30">
                {{ item.quantity }}x
              </span>
              <span class="font-bold text-bilbola-text-primary">{{ item.name }}</span>
            </div>
            <span class="font-black text-bilbola-text-primary shrink-0 font-mono text-sm">
              ${{ ((item.price || 0) * item.quantity).toLocaleString('es-CL') }}
            </span>
          </div>
        </div>

        <div class="flex justify-between items-baseline pt-4 px-2 border-t border-bilbola-gray-light/40 text-bilbola-text-primary">
          <span class="text-sm font-black uppercase tracking-wider">Total Autorizado:</span>
          <span class="text-2xl sm:text-3xl font-black text-green-700 font-mono">
            ${{ Number(orderData.amount || 0).toLocaleString('es-CL') }} CLP
          </span>
        </div>
      </div>

    </div>

    <!-- BOTONES DE ACCIONES POSTERIORES -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
      <a
        href="/productos"
        class="w-full sm:w-auto px-8 py-4 bg-bilbola-action-primary hover:bg-bilbola-action-focus text-white text-xs sm:text-sm font-black rounded-bilbola-sm tracking-wide uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 group"
      >
        <ShoppingBag class="w-4 h-4 stroke-[2.2] group-hover:scale-110 transition-transform" />
        <span>Volver al Catálogo de Productos</span>
      </a>

      <a
        href="/contacto"
        class="w-full sm:w-auto px-6 py-4 bg-white border border-bilbola-gray-light/80 text-bilbola-text-primary hover:border-bilbola-action-focus hover:text-bilbola-action-focus text-xs font-extrabold rounded-bilbola-sm transition-all text-center flex items-center justify-center gap-2"
      >
        <span>¿Dudas con el envío? Mesa de Ayuda</span>
        <ArrowRight class="w-4 h-4" />
      </a>
    </div>

  </div>
</template>
