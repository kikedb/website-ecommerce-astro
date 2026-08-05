<script setup lang="ts">
import { ref } from 'vue';
import { useCart } from '@/composables/useCart';
import CartItem from '@/components/ecommerce/CartItem.vue';
import { ShoppingBag, ArrowRight, Sparkles, Tag, CheckCircle, AlertCircle } from 'lucide-vue-next';

export interface Emits {
  (e: 'next-step'): void;
  (e: 'apply-discount', code: string, percentage: number): void;
  (e: 'remove-discount'): void;
}

const emit = defineEmits<Emits>();

const { items, totalItems, updateQuantity, removeItem, clearCart } = useCart();

// Local state for Discount Coupon
const inputCode = ref('');
const appliedCode = ref('');
const couponError = ref('');
const isApplying = ref(false);

const validCoupons: Record<string, number> = {
  'CLUBBILBOLA': 10,
  'MAGIA15': 15,
  'BIENVENIDA': 10
};

function handleApplyCoupon() {
  couponError.value = '';
  const cleanCode = inputCode.value.trim().toUpperCase();
  if (!cleanCode) return;

  isApplying.value = true;
  setTimeout(() => {
    isApplying.value = false;
    if (validCoupons[cleanCode]) {
      appliedCode.value = cleanCode;
      emit('apply-discount', cleanCode, validCoupons[cleanCode]);
      inputCode.value = '';
    } else {
      couponError.value = 'El cupón ingresado no es válido o ha expirado. (Pista: usa CLUBBILBOLA)';
    }
  }, 400);
}

function handleRemoveCoupon() {
  appliedCode.value = '';
  couponError.value = '';
  emit('remove-discount');
}

function proceedNext() {
  if (items.value.length > 0) {
    emit('next-step');
  }
}
</script>

<template>
  <div class="font-bilbola space-y-6 animate-fadeIn">
    
    <!-- Banner de Hidratación y Reserva de Stock -->
    <div class="p-4 rounded-bilbola-sm bg-bilbola-mint-light/30 border border-bilbola-mint-depth/50 flex items-start gap-3.5 shadow-xs">
      <Sparkles class="w-5 h-5 text-bilbola-action-focus shrink-0 mt-0.5" />
      <div>
        <h4 class="text-xs font-black text-bilbola-text-primary uppercase tracking-wide">
          Reserva Mágica Asegurada
        </h4>
        <p class="text-xs text-bilbola-text-secondary mt-0.5 leading-relaxed">
          Los precios e inventarios de tu bolsa han sido sincronizados y reservados en tiempo real. Tienes 30 minutos para completar tu compra con tranquilidad.
        </p>
      </div>
    </div>

    <!-- ESTADO VACÍO DE LA BOLSA -->
    <div 
      v-if="items.length === 0" 
      class="p-12 rounded-bilbola-lg bg-white border border-bilbola-gray-light/30 shadow-sm text-center max-w-md mx-auto my-8"
    >
      <div class="w-16 h-16 rounded-full bg-bilbola-surface-warm mx-auto flex items-center justify-center text-bilbola-text-secondary mb-4 shadow-inner">
        <ShoppingBag class="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 class="text-lg font-extrabold text-bilbola-text-primary">
        Tu bolsa mágica está vacía
      </h3>
      <p class="text-xs text-bilbola-text-secondary mt-2 leading-relaxed">
        Antes de continuar con el checkout, necesitas elegir algunos peluches, camas o decoración infantil del catálogo.
      </p>
      <a 
        href="/productos" 
        class="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-bilbola-sm bg-bilbola-action-primary text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-bilbola-action-focus transition-colors"
      >
        <span>Explorar Catálogo Mágico</span>
      </a>
    </div>

    <!-- LISTADO DE ARTÍCULOS EN LA BOLSA -->
    <div v-else class="bg-white rounded-bilbola-lg border border-bilbola-gray-light/30 p-5 sm:p-7 shadow-sm space-y-6">
      
      <!-- Cabecera y botón de vaciar -->
      <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-4">
        <div>
          <h2 class="text-xl font-extrabold text-bilbola-text-primary">
            1. Revisión de Artículos ({{ totalItems }})
          </h2>
          <p class="text-xs text-bilbola-text-secondary mt-0.5">
            Verifica las cantidades y opciones seleccionadas de tu compra.
          </p>
        </div>
        <button
          type="button"
          class="text-xs font-bold text-red-600 hover:text-red-700 hover:underline transition-all px-2.5 py-1.5 rounded-sm hover:bg-red-50"
          @click="clearCart"
        >
          Vaciar bolsa
        </button>
      </div>

      <!-- Ítems Renderizados usando CartItem.vue oficial del sistema de diseño -->
      <div class="divide-y divide-bilbola-gray-light/20">
        <CartItem
          v-for="item in items"
          :key="`${item.id}-${item.variantText || ''}`"
          :id="item.id"
          :name="item.name"
          :price="item.price"
          :quantity="item.quantity"
          :image-url="item.imageUrl"
          :variant-text="item.variantText"
          :customization-text="item.customizationText"
          :max-stock="item.maxStock"
          @update:quantity="updateQuantity(item.id, $event)"
          @remove="removeItem(item.id)"
        />
      </div>

      <!-- SECCIÓN DE CUPÓN DE DESCUENTO (Club Bílbola) -->
      <div class="pt-5 border-t border-bilbola-gray-light/30">
        <div class="bg-bilbola-surface-neutral/60 p-4 rounded-bilbola-sm border border-bilbola-gray-light/30">
          
          <div class="flex items-center gap-2 mb-2">
            <Tag class="w-4 h-4 text-bilbola-action-focus" />
            <span class="text-xs font-black text-bilbola-text-primary uppercase tracking-wide">
              ¿Tienes un cupón mágico de descuento?
            </span>
          </div>

          <!-- Input y Botón de Cupón -->
          <div v-if="!appliedCode" class="flex flex-col sm:flex-row items-stretch gap-2.5 max-w-md">
            <div class="relative flex-1">
              <input
                v-model="inputCode"
                type="text"
                placeholder="Ej: CLUBBILBOLA"
                aria-label="Código de descuento o cupón"
                class="w-full text-xs font-bold text-bilbola-text-primary bg-white border border-bilbola-gray-light/60 rounded-bilbola-sm px-3.5 py-2.5 uppercase focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:border-bilbola-action-focus transition-all placeholder:text-bilbola-text-secondary/50"
                @keyup.enter="handleApplyCoupon"
              />
            </div>
            <button
              type="button"
              :disabled="!inputCode.trim() || isApplying"
              class="px-5 py-2.5 bg-bilbola-action-focus text-white font-bold text-xs rounded-bilbola-sm uppercase tracking-wider hover:bg-bilbola-mint-depth hover:text-bilbola-text-primary disabled:opacity-50 transition-colors shadow-2xs shrink-0 flex items-center justify-center gap-1.5"
              @click="handleApplyCoupon"
            >
              <span v-if="isApplying">Validando...</span>
              <span v-else>Aplicar Cupón</span>
            </button>
          </div>

          <!-- Cupón Exitoso Aplicado -->
          <div v-else class="flex items-center justify-between bg-bilbola-mint-light/30 border border-bilbola-mint-depth p-3 rounded-bilbola-sm text-xs font-bold text-bilbola-text-primary">
            <div class="flex items-center gap-2">
              <CheckCircle class="w-4 h-4 text-bilbola-action-focus" />
              <span>Cupón <strong class="text-bilbola-action-focus">{{ appliedCode }}</strong> aplicado exitosamente al subtotal.</span>
            </div>
            <button
              type="button"
              class="text-red-600 hover:text-red-800 hover:underline ml-2 text-[11px] font-extrabold"
              @click="handleRemoveCoupon"
            >
              Quitar
            </button>
          </div>

          <!-- Mensaje de Error de Cupón -->
          <p v-if="couponError" class="text-[11px] text-red-600 font-bold mt-2 flex items-center gap-1.5 animate-pulse">
            <AlertCircle class="w-3.5 h-3.5 shrink-0" />
            <span>{{ couponError }}</span>
          </p>

        </div>
      </div>

    </div>

    <!-- BOTONES DE ACCIÓN INFERIOR -->
    <div v-if="items.length > 0" class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
      <a 
        href="/productos"
        class="inline-flex items-center gap-2 text-xs font-bold text-bilbola-text-secondary hover:text-bilbola-action-focus transition-colors order-2 sm:order-1 px-4 py-3 rounded-bilbola-sm hover:bg-bilbola-gray-light/20"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Seguir buscando peluches</span>
      </a>

      <button
        type="button"
        :disabled="items.length === 0"
        class="w-full sm:w-auto px-8 py-4 bg-bilbola-action-primary text-white text-sm font-black rounded-bilbola-sm tracking-wide uppercase shadow-lg hover:bg-bilbola-action-focus hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 group order-1 sm:order-2"
        @click="proceedNext"
      >
        <span>Continuar a Datos de Contacto</span>
        <ArrowRight class="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1.5" />
      </button>
    </div>

  </div>
</template>
