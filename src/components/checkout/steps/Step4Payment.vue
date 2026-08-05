<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCart } from '@/composables/useCart';
import FlowPayButton from '@/components/checkout/FlowPayButton.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import { 
  CheckCircle2, 
  Edit2, 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Landmark, 
  Sparkles, 
  ArrowLeft, 
  AlertTriangle,
  User,
  Truck,
  ShoppingBag,
  Gift,
  Info
} from 'lucide-vue-next';
import type { BuyerData } from './Step2BuyerInfo.vue';
import type { ShippingData } from './Step3Shipping.vue';

export interface Emits {
  (e: 'prev-step'): void;
  (e: 'edit-step', stepNumber: number): void;
}

const emit = defineEmits<Emits>();

const { items, totalItems, totalPrice } = useCart();

const buyer = ref<BuyerData | null>(null);
const shipping = ref<ShippingData | null>(null);
const paymentMethod = ref('flow_webpay');

onMounted(() => {
  // Hidratar desde sessionStorage si está disponible
  const savedBuyer = sessionStorage.getItem('bilbola_checkout_buyer');
  if (savedBuyer) {
    try { buyer.value = JSON.parse(savedBuyer); } catch (e) {}
  }

  const savedShipping = sessionStorage.getItem('bilbola_checkout_shipping');
  if (savedShipping) {
    try { shipping.value = JSON.parse(savedShipping); } catch (e) {}
  }
});

const finalTotalToPay = computed(() => {
  const base = totalPrice.value;
  const ship = shipping.value?.finalCost || 0;
  return Math.max(0, base + ship);
});

function jumpToStep(step: number) {
  emit('edit-step', step);
}
</script>

<template>
  <div class="font-bilbola space-y-7 animate-fadeIn">
    
    <!-- CONTENEDOR MAESTRO DEL PASO 4 -->
    <div class="bg-white rounded-bilbola-lg border border-bilbola-gray-light/30 p-5 sm:p-8 shadow-sm space-y-8">
      
      <!-- Cabecera y Título -->
      <div class="border-b border-bilbola-gray-light/30 pb-4">
        <h2 class="text-xl font-extrabold text-bilbola-text-primary flex items-center gap-2">
          <span>4. Revisión Final y Conexión de Pago</span>
        </h2>
        <p class="text-xs text-bilbola-text-secondary mt-0.5">
          Verifica con tranquilidad los datos de tu pedido antes de proceder a la pasarela bancaria oficial de Flow.
        </p>
      </div>

      <!-- BLOQUE 1: RESUMEN DE CONSUMO (Solo Lectura con Enlaces Rápidos de Edición) -->
      <div class="space-y-4">
        <h3 class="text-xs font-black text-bilbola-text-primary uppercase tracking-wider block">
          📋 Resumen de tu Pedido Mágico
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Tarjeta 1: Datos del Comprador -->
          <div class="p-4 rounded-bilbola-md bg-bilbola-surface-neutral/60 border border-bilbola-gray-light/40 flex flex-col justify-between gap-3 shadow-2xs">
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-2">
                <span class="font-bold text-bilbola-text-primary flex items-center gap-1.5 text-xs">
                  <User class="w-4 h-4 text-bilbola-action-focus" />
                  Comprador
                </span>
                <button 
                  type="button"
                  class="text-[11px] font-black text-bilbola-action-focus hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded-sm border border-bilbola-gray-light/40 shadow-2xs"
                  title="Editar Datos del Comprador"
                  @click="jumpToStep(2)"
                >
                  <Edit2 class="w-3 h-3" />
                  <span>Editar</span>
                </button>
              </div>

              <div v-if="buyer" class="pt-1 space-y-1 leading-relaxed">
                <p class="font-extrabold text-bilbola-text-primary">{{ buyer.firstName }} {{ buyer.lastName }}</p>
                <p class="text-bilbola-text-secondary truncate">{{ buyer.email }}</p>
                <p class="text-bilbola-text-secondary font-semibold">{{ buyer.phone }}</p>
                
                <!-- Sello de regalo -->
                <div v-if="buyer.isGift" class="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bilbola-surface-warm border border-bilbola-support-pink text-bilbola-support-pink font-bold text-[10px]">
                  <Gift class="w-3 h-3" />
                  <span>Incluye Tarjeta de Regalo</span>
                </div>
              </div>
              <div v-else class="pt-1 text-bilbola-text-secondary italic">
                Sin datos guardados.
              </div>
            </div>
          </div>

          <!-- Tarjeta 2: Datos de Entrega -->
          <div class="p-4 rounded-bilbola-md bg-bilbola-surface-neutral/60 border border-bilbola-gray-light/40 flex flex-col justify-between gap-3 shadow-2xs">
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-2">
                <span class="font-bold text-bilbola-text-primary flex items-center gap-1.5 text-xs">
                  <Truck class="w-4 h-4 text-bilbola-action-focus" />
                  Despacho
                </span>
                <button 
                  type="button"
                  class="text-[11px] font-black text-bilbola-action-focus hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded-sm border border-bilbola-gray-light/40 shadow-2xs"
                  title="Editar Método de Entrega"
                  @click="jumpToStep(3)"
                >
                  <Edit2 class="w-3 h-3" />
                  <span>Editar</span>
                </button>
              </div>

              <div v-if="shipping" class="pt-1 space-y-1 leading-relaxed">
                <p class="font-extrabold text-bilbola-text-primary">
                  {{ shipping.type === 'delivery' ? '🚚 Despacho a Domicilio' : '🏬 Retiro en Taller Bílbola' }}
                </p>
                <template v-if="shipping.type === 'delivery'">
                  <p class="text-bilbola-text-primary font-semibold">{{ shipping.address }}</p>
                  <p v-if="shipping.apartment" class="text-[11px] text-bilbola-text-secondary">{{ shipping.apartment }}</p>
                  <p class="text-[11px] font-bold text-bilbola-action-focus uppercase mt-0.5">{{ shipping.commune }}, Región: {{ shipping.region }}</p>
                </template>
                <template v-else>
                  <p class="text-bilbola-text-secondary">General Holley 2345, Providencia.</p>
                  <p class="text-[10px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">
                    Costo: $0 (Gratis)
                  </p>
                </template>
              </div>
              <div v-else class="pt-1 text-bilbola-text-secondary italic">
                Sin entrega seleccionada.
              </div>
            </div>
          </div>

          <!-- Tarjeta 3: Detalle Rápido de la Bolsa -->
          <div class="p-4 rounded-bilbola-md bg-bilbola-surface-neutral/60 border border-bilbola-gray-light/40 flex flex-col justify-between gap-3 shadow-2xs">
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-2">
                <span class="font-bold text-bilbola-text-primary flex items-center gap-1.5 text-xs">
                  <ShoppingBag class="w-4 h-4 text-bilbola-action-focus" />
                  Artículos ({{ totalItems }})
                </span>
                <button 
                  type="button"
                  class="text-[11px] font-black text-bilbola-action-focus hover:underline flex items-center gap-1 bg-white px-2 py-0.5 rounded-sm border border-bilbola-gray-light/40 shadow-2xs"
                  title="Modificar Carrito de Compras"
                  @click="jumpToStep(1)"
                >
                  <Edit2 class="w-3 h-3" />
                  <span>Modificar</span>
                </button>
              </div>

              <div class="pt-1 space-y-1.5 leading-relaxed text-xs">
                <div class="flex justify-between font-semibold">
                  <span class="text-bilbola-text-secondary">Subtotal:</span>
                  <span class="text-bilbola-text-primary">${{ totalPrice.toLocaleString('es-CL') }}</span>
                </div>
                <div class="flex justify-between font-semibold">
                  <span class="text-bilbola-text-secondary">Flete:</span>
                  <span v-if="!shipping || shipping.finalCost === 0" class="text-green-600 font-black">GRATIS</span>
                  <span v-else class="text-bilbola-text-primary">${{ shipping.finalCost.toLocaleString('es-CL') }}</span>
                </div>
                <div class="border-t border-bilbola-gray-light/40 pt-1.5 flex justify-between font-black text-sm text-bilbola-text-primary">
                  <span>Total Final:</span>
                  <span class="text-bilbola-action-focus">${{ finalTotalToPay.toLocaleString('es-CL') }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- BLOQUE 2: SELECCIÓN DEL MEDIO EN PASARELA FLOW -->
      <div class="space-y-5 pt-6 border-t border-bilbola-gray-light/30">
        <div>
          <h3 class="text-xs font-black text-bilbola-text-primary uppercase tracking-wider block">
            💳 Elige tu Medio de Pago Seguro en Flow
          </h3>
          <p class="text-xs text-bilbola-text-secondary mt-0.5">
            Selecciona el canal bancario con el que prefieres autorizar el cobro en línea.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <!-- Webpay Plus (Tarjetas) -->
          <label
            :class="[
              'p-4 rounded-bilbola-md border-2 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden',
              paymentMethod === 'flow_webpay'
                ? 'border-bilbola-action-focus bg-bilbola-mint-light/20 shadow-sm'
                : 'border-bilbola-gray-light/50 bg-white hover:border-bilbola-gray-light'
            ]"
            @click="paymentMethod = 'flow_webpay'"
          >
            <div class="flex justify-between items-start gap-2">
              <div class="p-2 rounded-full bg-blue-50 text-blue-700 w-9 h-9 flex items-center justify-center">
                <CreditCard class="w-5 h-5 stroke-[2.2]" />
              </div>
              <span v-if="paymentMethod === 'flow_webpay'" class="text-[10px] bg-bilbola-action-focus text-white px-2 py-0.5 rounded-sm font-black uppercase">
                Seleccionada
              </span>
            </div>
            <div class="mt-3">
              <h4 class="text-xs font-extrabold text-bilbola-text-primary">Webpay Plus / Tarjetas</h4>
              <p class="text-[11px] text-bilbola-text-secondary mt-0.5">Crédito (hasta 6 cuotas) o Redcompra / Débito.</p>
            </div>
          </label>

          <!-- Billeteras Digitales -->
          <label
            :class="[
              'p-4 rounded-bilbola-md border-2 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden',
              paymentMethod === 'flow_wallets'
                ? 'border-bilbola-action-focus bg-bilbola-mint-light/20 shadow-sm'
                : 'border-bilbola-gray-light/50 bg-white hover:border-bilbola-gray-light'
            ]"
            @click="paymentMethod = 'flow_wallets'"
          >
            <div class="flex justify-between items-start gap-2">
              <div class="p-2 rounded-full bg-purple-50 text-purple-700 w-9 h-9 flex items-center justify-center">
                <Smartphone class="w-5 h-5 stroke-[2.2]" />
              </div>
              <span v-if="paymentMethod === 'flow_wallets'" class="text-[10px] bg-bilbola-action-focus text-white px-2 py-0.5 rounded-sm font-black uppercase">
                Seleccionada
              </span>
            </div>
            <div class="mt-3">
              <h4 class="text-xs font-extrabold text-bilbola-text-primary">Mach &amp; Billeteras</h4>
              <p class="text-[11px] text-bilbola-text-secondary mt-0.5">Pago instantáneo desde tu móvil (Mach, Khipu, Servipag).</p>
            </div>
          </label>

          <!-- Transferencia Bancaria Directa -->
          <label
            :class="[
              'p-4 rounded-bilbola-md border-2 cursor-pointer transition-all flex flex-col justify-between group relative overflow-hidden',
              paymentMethod === 'flow_transfer'
                ? 'border-bilbola-action-focus bg-bilbola-mint-light/20 shadow-sm'
                : 'border-bilbola-gray-light/50 bg-white hover:border-bilbola-gray-light'
            ]"
            @click="paymentMethod = 'flow_transfer'"
          >
            <div class="flex justify-between items-start gap-2">
              <div class="p-2 rounded-full bg-emerald-50 text-emerald-700 w-9 h-9 flex items-center justify-center">
                <Landmark class="w-5 h-5 stroke-[2.2]" />
              </div>
              <span v-if="paymentMethod === 'flow_transfer'" class="text-[10px] bg-bilbola-action-focus text-white px-2 py-0.5 rounded-sm font-black uppercase">
                Seleccionada
              </span>
            </div>
            <div class="mt-3">
              <h4 class="text-xs font-extrabold text-bilbola-text-primary">Transferencia en Línea</h4>
              <p class="text-[11px] text-bilbola-text-secondary mt-0.5">Conectado a todos los bancos nacionales vía Flow.</p>
            </div>
          </label>

        </div>
      </div>

      <!-- BLOQUE 3: BANNER DE SEGURIDAD SSL 256-BIT & BOTÓN DE GATILLO -->
      <div class="space-y-6 pt-6 border-t border-bilbola-gray-light/30">
        
        <!-- Banner de resguardo Menta Mágica -->
        <div class="p-4 rounded-bilbola-md bg-bilbola-mint-light/40 border border-bilbola-mint-depth/60 flex items-start gap-3.5 shadow-xs">
          <div class="w-9 h-9 rounded-full bg-white text-bilbola-action-focus flex items-center justify-center shrink-0 shadow-2xs">
            <Lock class="w-5 h-5 stroke-[2.2]" />
          </div>
          <div class="flex-1 text-xs">
            <h4 class="font-black text-bilbola-text-primary uppercase tracking-wide flex items-center gap-1.5">
              <span>Protección Bancaria Encriptada (SSL 256-Bit)</span>
              <ShieldCheck class="w-4 h-4 text-green-600 inline" />
            </h4>
            <p class="text-bilbola-text-secondary mt-0.5 leading-relaxed">
              Estás conectándote al servidor encriptado de grado militar de <strong>Flow y Transbank</strong>. Bílbola nunca accede ni almacena jamás los números de tus tarjetas bancarias.
            </p>
          </div>
        </div>

        <!-- Botón Gigante Transaccional -->
        <FlowPayButton
          :amount="finalTotalToPay"
          :buyer="buyer"
          :shipping="shipping"
          :payment-method="paymentMethod"
          :disabled="!buyer || !shipping || totalItems === 0"
        />

        <p v-if="!buyer || !shipping" class="text-[11px] text-amber-600 font-bold text-center flex items-center justify-center gap-1.5">
          <AlertTriangle class="w-3.5 h-3.5 shrink-0" />
          <span>Atención: Necesitamos que completes los datos de contacto y entrega antes de activar el pago en línea.</span>
        </p>

      </div>

    </div>

    <!-- BOTONES DE NAVEGACIÓN INFERIOR -->
    <div class="flex items-center justify-between pt-2">
      <button
        type="button"
        class="inline-flex items-center gap-2 text-xs font-bold text-bilbola-text-secondary hover:text-bilbola-action-focus transition-colors px-4 py-3 rounded-bilbola-sm hover:bg-bilbola-gray-light/20"
        @click="emit('prev-step')"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Volver a Opciones de Despacho (Paso 3)</span>
      </button>

      <span class="text-[11px] font-bold text-bilbola-text-secondary/70">
        🔒 Paso 4 de 4 — Finalizando Compra
      </span>
    </div>

  </div>
</template>
