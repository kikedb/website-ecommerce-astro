<script setup lang="ts">
import { reactive, computed, onMounted, ref, watch } from 'vue';
import { useCart } from '@/composables/useCart';
import ChileShippingSelector from '@/components/ecommerce/ChileShippingSelector.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { 
  Truck, 
  Store, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  Home, 
  Navigation,
  ShieldCheck
} from 'lucide-vue-next';

export interface ShippingData {
  type: 'delivery' | 'pickup';
  region: string;
  commune: string;
  address: string;
  apartment: string;
  instructions: string;
  estimatedCost: number;
  finalCost: number;
  isFreeShipping: boolean;
}

export interface Emits {
  (e: 'prev-step'): void;
  (e: 'next-step', payload: ShippingData): void;
  (e: 'save-shipping', payload: ShippingData): void;
  (e: 'update-shipping-cost', cost: number): void;
}

const emit = defineEmits<Emits>();

const { totalPrice } = useCart();

const form = reactive<ShippingData>({
  type: 'delivery',
  region: 'rm',
  commune: 'Providencia',
  address: '',
  apartment: '',
  instructions: '',
  estimatedCost: 3500,
  finalCost: 3500,
  isFreeShipping: false
});

const selectorValue = ref({
  region: 'rm',
  commune: 'Providencia',
  estimatedCost: 3500
});

const touchedAddress = ref(false);
const isSubmitted = ref(false);

const calculatedShipping = computed(() => {
  if (form.type === 'pickup') {
    return { cost: 0, isFree: true };
  }
  const isRM = form.region === 'rm';
  const overThreshold = totalPrice.value >= 49990;
  if (isRM && overThreshold) {
    return { cost: 0, isFree: true };
  }
  return { cost: form.estimatedCost, isFree: false };
});

watch(
  [() => form.type, () => form.region, () => form.estimatedCost, () => totalPrice.value],
  () => {
    const { cost, isFree } = calculatedShipping.value;
    form.finalCost = cost;
    form.isFreeShipping = isFree;
    emit('update-shipping-cost', cost);
    saveSession();
  },
  { immediate: true }
);

function handleSelectorChange(val: { region: string; commune: string; estimatedCost: number }) {
  form.region = val.region;
  form.commune = val.commune;
  form.estimatedCost = val.estimatedCost;
}

onMounted(() => {
  const saved = sessionStorage.getItem('bilbola_checkout_shipping');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(form, parsed);
      selectorValue.value = {
        region: form.region || 'rm',
        commune: form.commune || 'Providencia',
        estimatedCost: form.estimatedCost || 3500
      };
      emit('update-shipping-cost', calculatedShipping.value.cost);
    } catch (e) {
      console.error('Error hydrating shipping info from session:', e);
    }
  } else {
    emit('update-shipping-cost', calculatedShipping.value.cost);
  }
});

function saveSession() {
  sessionStorage.setItem('bilbola_checkout_shipping', JSON.stringify(form));
  emit('save-shipping', form);
}

watch(
  [() => form.address, () => form.apartment, () => form.instructions],
  () => {
    saveSession();
  }
);

const addressError = computed(() => {
  if (form.type === 'pickup') return '';
  if (!form.address.trim() || form.address.trim().length < 4) {
    return 'Ingresa la calle y numeración para el despacho (mínimo 4 caracteres).';
  }
  return '';
});

const isValid = computed(() => {
  if (form.type === 'pickup') return true;
  return !addressError.value;
});

function handleNext() {
  isSubmitted.value = true;
  touchedAddress.value = true;

  if (isValid.value) {
    saveSession();
    emit('next-step', form);
  }
}
</script>

<template>
  <div class="font-bilbola space-y-6 animate-fadeIn">
    
    <!-- TARJETA PRINCIPAL DEL PASO 3 -->
    <div class="bg-white rounded-bilbola-lg border border-bilbola-gray-light/30 p-5 sm:p-8 shadow-sm space-y-7">
      
      <!-- Cabecera -->
      <div class="border-b border-bilbola-gray-light/30 pb-4">
        <h2 class="text-xl font-extrabold text-bilbola-text-primary flex items-center gap-2">
          <span>3. Selección de Modalidad de Entrega</span>
        </h2>
        <p class="text-xs text-bilbola-text-secondary mt-0.5">
          Elige si deseas recibir tu pedido en casa por empresa de transporte o retirar en nuestro taller en Providencia.
        </p>
      </div>

      <!-- SELECTOR RADIAL: TARJETAS DE MODO DE ENTREGA -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        <!-- Tarjeta A: Despacho a Domicilio -->
        <label
          :class="[
            'relative flex flex-col p-5 rounded-bilbola-md border-2 cursor-pointer transition-all duration-200 select-none overflow-hidden group',
            form.type === 'delivery'
              ? 'border-bilbola-action-focus bg-bilbola-mint-light/20 shadow-md scale-[1.01]'
              : 'border-bilbola-gray-light/50 bg-white hover:border-bilbola-gray-light hover:bg-bilbola-surface-neutral/30'
          ]"
          @click="form.type = 'delivery'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0',
                form.type === 'delivery' ? 'bg-bilbola-action-focus text-white' : 'bg-bilbola-surface-neutral text-bilbola-text-secondary'
              ]">
                <Truck class="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span class="text-xs font-black uppercase tracking-wider block text-bilbola-text-primary">
                  Despacho a Domicilio
                </span>
                <span class="text-[11px] font-semibold text-bilbola-action-focus">
                  Envío a todo Chile (Currier Asegurado)
                </span>
              </div>
            </div>

            <!-- Indicador Radio -->
            <div :class="[
              'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1',
              form.type === 'delivery' ? 'border-bilbola-action-focus bg-bilbola-action-focus' : 'border-bilbola-gray-light/80 bg-white'
            ]">
              <span v-if="form.type === 'delivery'" class="w-2 h-2 rounded-full bg-white block" />
            </div>
          </div>

          <p class="text-[11px] text-bilbola-text-secondary mt-3 leading-relaxed border-t border-bilbola-gray-light/20 pt-2.5">
            Empresa de transportes especializada con seguro ante pérdidas o daños durante la ruta.
          </p>

          <div v-if="form.type === 'delivery'" class="mt-2 text-right">
            <span class="inline-block bg-bilbola-action-focus text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm shadow-2xs">
              Recomendado
            </span>
          </div>
        </label>

        <!-- Tarjeta B: Retiro en Bodega / Taller Bílbola ($0) -->
        <label
          :class="[
            'relative flex flex-col p-5 rounded-bilbola-md border-2 cursor-pointer transition-all duration-200 select-none overflow-hidden group',
            form.type === 'pickup'
              ? 'border-bilbola-action-focus bg-bilbola-mint-light/20 shadow-md scale-[1.01]'
              : 'border-bilbola-gray-light/50 bg-white hover:border-bilbola-gray-light hover:bg-bilbola-surface-neutral/30'
          ]"
          @click="form.type = 'pickup'"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div :class="[
                'w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0',
                form.type === 'pickup' ? 'bg-bilbola-action-focus text-white' : 'bg-bilbola-surface-neutral text-bilbola-text-secondary'
              ]">
                <Store class="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <span class="text-xs font-black uppercase tracking-wider block text-bilbola-text-primary">
                  Retiro en Taller Bílbola
                </span>
                <span class="text-[11px] font-extrabold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-sm inline-block mt-0.5">
                  $0 CLP (Sin Costo)
                </span>
              </div>
            </div>

            <!-- Indicador Radio -->
            <div :class="[
              'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1',
              form.type === 'pickup' ? 'border-bilbola-action-focus bg-bilbola-action-focus' : 'border-bilbola-gray-light/80 bg-white'
            ]">
              <span v-if="form.type === 'pickup'" class="w-2 h-2 rounded-full bg-white block" />
            </div>
          </div>

          <p class="text-[11px] text-bilbola-text-secondary mt-3 leading-relaxed border-t border-bilbola-gray-light/20 pt-2.5">
            Pasa a buscar tu bolsa mágica directamente por nuestro showroom en Providencia, Santiago.
          </p>

          <div v-if="form.type === 'pickup'" class="mt-2 text-right">
            <span class="inline-block bg-green-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-sm shadow-2xs">
              ★ Gratis de inmediato
            </span>
          </div>
        </label>

      </div>

      <!-- SECCIÓN A: FORMULARIO Y CALCULADOR PARA DESPACHO A DOMICILIO -->
      <div v-if="form.type === 'delivery'" class="space-y-6 pt-5 border-t border-bilbola-gray-light/30 animate-fadeIn">
        
        <div class="space-y-2">
          <label class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            1. Ubicación y Cálculo de Tarifa
          </label>
          <ChileShippingSelector
            v-model="selectorValue"
            @change="handleSelectorChange"
          />
        </div>

        <!-- Banner de Envío GRATIS en Región Metropolitana sobre $49.990 -->
        <div v-if="form.isFreeShipping && form.region === 'rm'" class="p-3.5 rounded-bilbola-sm bg-green-50 border border-green-500 text-green-800 text-xs font-bold flex items-center gap-2.5 shadow-2xs">
          <Sparkles class="w-5 h-5 text-green-600 shrink-0" />
          <span>¡Felicidades! Tu bolsa supera los $49.990 en Región Metropolitana, tienes <strong>Envío a Domicilio 100% GRATIS</strong>.</span>
        </div>

        <!-- Formulario de Dirección Postal -->
        <div class="space-y-5 pt-3">
          <label class="block text-xs font-black text-bilbola-text-primary uppercase tracking-wider">
            2. Detalle del Domicilio de Entrega
          </label>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            <div class="sm:col-span-2 space-y-1.5">
              <label for="ship-address" class="block text-[11px] font-black text-bilbola-text-primary uppercase">
                Calle y Número <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
                  <Navigation class="w-4 h-4" />
                </div>
                <input
                  id="ship-address"
                  v-model="form.address"
                  type="text"
                  placeholder="Ej: Av. Providencia 1234, casa 5"
                  :class="[
                    'w-full pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold rounded-bilbola-sm transition-all focus:outline-none focus:ring-2',
                    (touchedAddress || isSubmitted) && addressError
                      ? 'border-red-500 text-red-900 placeholder:text-red-300 focus:ring-red-200 border-2'
                      : 'border-bilbola-gray-light/60 text-bilbola-text-primary focus:border-bilbola-action-focus focus:ring-bilbola-action-focus border'
                  ]"
                  @blur="touchedAddress = true"
                />
                <div v-if="(touchedAddress || isSubmitted) && !addressError" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-green-600">
                  <CheckCircle2 class="w-4 h-4" />
                </div>
              </div>
              <p v-if="(touchedAddress || isSubmitted) && addressError" class="text-[11px] text-red-600 font-bold flex items-center gap-1 mt-1">
                <AlertCircle class="w-3.5 h-3.5 shrink-0" />
                <span>{{ addressError }}</span>
              </p>
            </div>

            <div class="space-y-1.5">
              <label for="ship-apt" class="block text-[11px] font-black text-bilbola-text-primary uppercase">
                Depto / Oficina <span class="text-bilbola-text-secondary font-normal">(Opcional)</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-bilbola-text-secondary/60">
                  <Home class="w-4 h-4" />
                </div>
                <input
                  id="ship-apt"
                  v-model="form.apartment"
                  type="text"
                  placeholder="Ej: Depto 402"
                  class="w-full pl-10 pr-3 py-3 text-xs sm:text-sm font-semibold border border-bilbola-gray-light/60 rounded-bilbola-sm text-bilbola-text-primary focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:border-bilbola-action-focus transition-all"
                />
              </div>
            </div>

          </div>

          <div class="space-y-1.5">
            <label for="ship-instructions" class="block text-[11px] font-black text-bilbola-text-primary uppercase">
              Instrucciones para el repartidor <span class="text-bilbola-text-secondary font-normal">(Opcional)</span>
            </label>
            <textarea
              id="ship-instructions"
              v-model="form.instructions"
              rows="2"
              placeholder="Ej: Dejar en conserjería con el guardia del edificio. Si el timbre no funciona, favor llamar al celular."
              class="w-full p-3.5 text-xs font-semibold border border-bilbola-gray-light/60 rounded-bilbola-sm text-bilbola-text-primary focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:border-bilbola-action-focus transition-all placeholder:text-bilbola-text-secondary/50"
            />
          </div>

        </div>

      </div>

      <!-- SECCIÓN B: TARJETA DE INFORMACIÓN PARA RETIRO EN BODEGA ($0) -->
      <div v-else class="space-y-6 pt-5 border-t border-bilbola-gray-light/30 animate-fadeIn">
        <div class="bg-bilbola-surface-warm/60 border-2 border-bilbola-action-focus/40 rounded-bilbola-md p-6 shadow-sm space-y-4">
          
          <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-3">
            <span class="text-sm font-black text-bilbola-text-primary flex items-center gap-2">
              <MapPin class="w-5 h-5 text-bilbola-action-focus" />
              <span>Centro de Adopción &amp; Bodega Bílbola Deco Kids</span>
            </span>
            <span class="px-2.5 py-1 bg-green-600 text-white font-black text-[11px] rounded-sm uppercase tracking-wide shadow-2xs">
              Listo en 24 Hrs hábiles
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="space-y-1">
              <strong class="font-black text-bilbola-text-primary uppercase tracking-wide text-[11px] block">
                📍 Dirección Física:
              </strong>
              <p class="text-bilbola-text-primary font-bold">General Holley 2345, Oficina 301</p>
              <p class="text-bilbola-text-secondary">Providencia, Santiago (Cercano a Metro Los Leones).</p>
            </div>

            <div class="space-y-1">
              <strong class="font-black text-bilbola-text-primary uppercase tracking-wide text-[11px] flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5 text-bilbola-action-focus" />
                Horarios de Entrega:
              </strong>
              <p class="text-bilbola-text-primary font-semibold">Lunes a Viernes: 10:00 a 18:30 hrs.</p>
              <p class="text-bilbola-text-secondary">Sábados: 10:30 a 14:00 hrs (Domingos cerrado).</p>
            </div>
          </div>

          <div class="p-3 bg-white rounded-bilbola-sm border border-bilbola-gray-light/40 text-xs text-bilbola-text-secondary flex items-start gap-2.5">
            <ShieldCheck class="w-4 h-4 text-bilbola-action-focus shrink-0 mt-0.5" />
            <p>
              <strong>Estacionamiento de visita disponible sin costo.</strong> Apenas terminemos de preparar y perfumar mágicamente tu caja de peluches y mobiliario, te enviaremos un correo para que pases a retirarlo cuando gustes.
            </p>
          </div>

        </div>
      </div>

    </div>

    <!-- BOTONES DE NAVEGACIÓN DEL WIZARD -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <button
        type="button"
        class="inline-flex items-center gap-2 text-xs font-bold text-bilbola-text-secondary hover:text-bilbola-action-focus transition-colors order-2 sm:order-1 px-4 py-3 rounded-bilbola-sm hover:bg-bilbola-gray-light/20"
        @click="emit('prev-step')"
      >
        <ArrowLeft class="w-4 h-4" />
        <span>Volver a Datos del Comprador (Paso 2)</span>
      </button>

      <BaseButton
        size="lg"
        class="w-full sm:w-auto px-8 py-4 shadow-lg group order-1 sm:order-2 tracking-wide uppercase"
        @click="handleNext"
      >
        <span>Revisar y Pagar</span>
        <ArrowRight class="w-5 h-5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5" />
      </BaseButton>
    </div>

  </div>
</template>
