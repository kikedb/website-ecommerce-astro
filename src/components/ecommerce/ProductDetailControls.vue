<script setup lang="ts">
import { ref } from 'vue';
import { useCart } from '@/composables/useCart';
import { toast } from 'vue-sonner';
import ColorSwatch, { type SwatchOption } from '@/components/ecommerce/ColorSwatch.vue';
import CustomizationInput from '@/components/ecommerce/CustomizationInput.vue';
import ChileShippingSelector from '@/components/ecommerce/ChileShippingSelector.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import FavoriteHeartButton from '@/components/ecommerce/FavoriteHeartButton.vue';
import ShareProductButtons from '@/components/ecommerce/ShareProductButtons.vue';
import StickyAddToCartBar from '@/components/ecommerce/StickyAddToCartBar.vue';
import StarRatingDisplay from '@/components/ecommerce/StarRatingDisplay.vue';
import QuantitySelector from '@/components/ui/QuantitySelector.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import type { MockProduct } from '@/lib/mockCatalog';

export interface Props {
  product: MockProduct;
}

const props = defineProps<Props>();

const { addItem } = useCart();

const selectedColor = ref(props.product.colors?.[0]?.name || '');
const customizationText = ref('');
const isCustomConfirmed = ref(false);
const quantity = ref(1);

function onCustomConfirmationChange(val: boolean) {
  isCustomConfirmed.value = val;
}

function handleAddToCart(addQty = quantity.value) {
  if (!props.product.inStock) {
    toast.error('Este producto se encuentra agotado temporalmente.');
    return;
  }
  if (props.product.isCustomizable && customizationText.value.trim() !== '' && !isCustomConfirmed.value) {
    toast.error('Por favor confirma la ortografía de tu texto personalizado marcando la casilla de verificación.');
    return;
  }

  const variantStr = selectedColor.value ? `Color: ${selectedColor.value}` : undefined;
  const customStr = customizationText.value.trim() ? `Grabado: "${customizationText.value.trim()}"` : undefined;

  addItem({
    id: String(props.product.id),
    name: props.product.name,
    price: props.product.price,
    quantity: addQty,
    imageUrl: props.product.imageUrl,
    variantText: variantStr,
    customizationText: customStr,
    maxStock: 10
  });

  toast.success(`✨ ¡"${props.product.name}" agregado al carrito de compra!`);
}

function scrollToReviews() {
  if (typeof document !== 'undefined') {
    const el = document.getElementById('seccion-pestanas-detalle');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<template>
  <div class="space-y-6 font-bilbola">
    <!-- Header: Categoría y Acciones Rápida -->
    <div class="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-bilbola-gray-light/30">
      <span class="inline-flex items-center px-3 py-1 bg-bilbola-mint-light/60 text-bilbola-action-focus rounded-full text-xs font-extrabold tracking-wider uppercase">
        {{ product.categoryLabel }}
      </span>

      <div class="flex items-center gap-3">
        <FavoriteHeartButton :product-id="product.id" :product-name="product.name" size="md" />
        <ShareProductButtons :product-name="product.name" :product-url="`/productos/${product.slug || product.id}`" />
      </div>
    </div>

    <!-- Título y Calificación -->
    <div class="space-y-3">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black text-bilbola-text-primary tracking-tight font-serif leading-tight">
        {{ product.name }}
      </h1>

      <div class="flex items-center gap-3 flex-wrap">
        <StarRatingDisplay :rating="5" size="md" :show-number="true" />
        <button type="button" @click="scrollToReviews" class="text-xs font-bold text-bilbola-action-focus hover:underline cursor-pointer">
          Ver reseñas certificadas ({{ product.reviews?.length || 3 }})
        </button>
      </div>
    </div>

    <!-- Precio y Estado de Stock -->
    <div class="p-4 rounded-bilbola-md bg-bilbola-surface-neutral/70 border border-bilbola-mint-light/50 flex items-center justify-between gap-4 flex-wrap">
      <div>
        <PriceDisplay :amount="product.price" :original-amount="product.originalPrice" size="lg" />
        <span class="text-xs text-bilbola-text-secondary block mt-0.5">Precio incluye IVA y garantía oficial Bílbola de 6 meses.</span>
      </div>

      <div class="flex flex-col gap-1.5 items-end">
        <span v-if="product.inStock" class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full font-extrabold text-xs shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
          Stock Disponible en Taller
        </span>
        <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-800 rounded-full font-extrabold text-xs shadow-2xs">
          🔴 Agotado Temporalmente
        </span>

        <div class="flex items-center gap-1.5 pt-1">
          <BaseBadge v-for="(badge, idx) in product.badges" :key="idx" :type="badge.type" :label="badge.label" />
          <BaseBadge v-if="product.isCustomizable" type="customizable" label="Personalizable" />
        </div>
      </div>
    </div>

    <!-- Descripción Corta -->
    <p class="text-bilbola-text-primary/90 text-base leading-relaxed font-normal pt-2">
      {{ product.description || 'Diseñado artesanalmente con amor, seguridad y respeto por la infancia feliz en nuestro taller familiar en Chile.' }}
    </p>

    <hr class="border-bilbola-gray-light/30" />

    <!-- Selector de Color / Acabado -->
    <div v-if="product.colors && product.colors.length > 0" class="space-y-3">
      <ColorSwatch
        v-model="selectedColor"
        :options="product.colors"
        label="Acabado / Color en Madera"
      />
    </div>

    <!-- Campo de Personalización (si aplica) -->
    <div v-if="product.isCustomizable" class="pt-2">
      <CustomizationInput
        v-model="customizationText"
        :max-length="25"
        label="Nombre o Grabado en Madera (Opcional)"
        placeholder="Ej: Tomás (máx 25 caracteres)"
        warning-text="Los muebles con grabado personalizado no admiten cambio ni devolución salvo por fallas de fabricación demostradas."
        confirmation-label="Confirmo que el texto escrito no tiene errores de ortografía."
        :required="false"
        @confirmation-change="onCustomConfirmationChange"
      />
    </div>

    <hr class="border-bilbola-gray-light/30" />

    <!-- Controles de Conversión Primarios -->
    <div class="space-y-4 pt-2">
      <label class="text-sm font-bold text-bilbola-text-primary block">Cantidad deseada:</label>
      <div class="flex items-center gap-4 flex-wrap sm:flex-nowrap">
        <QuantitySelector v-model="quantity" size="md" :disabled="!product.inStock" class="w-full sm:w-auto" />

        <BaseButton
          id="add-to-cart-btn"
          variant="primary"
          size="lg"
          :disabled="!product.inStock"
          @click="() => handleAddToCart(quantity)"
          class="flex-1 w-full text-center font-black shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 py-3.5 text-base justify-center gap-2"
        >
          <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>{{ product.inStock ? 'Añadir al Carrito ✨' : 'Sin Stock Temporal' }}</span>
        </BaseButton>
      </div>
    </div>

    <!-- Calculador de Despacho en Chile (Mandatorio según Brandbook antes de pagar) -->
    <div class="pt-4">
      <ChileShippingSelector />
    </div>

    <!-- Garantías de Seguridad Bílbola -->
    <div class="grid grid-cols-3 gap-3 pt-4 text-center text-xs font-semibold text-bilbola-text-primary border-t border-bilbola-gray-light/40">
      <div class="p-2.5 rounded-bilbola-sm bg-bilbola-mint-light/30 flex flex-col items-center gap-1.5">
        <span class="text-xl">🌿</span>
        <span>Materiales Eco & Hipoalergénicos</span>
      </div>
      <div class="p-2.5 rounded-bilbola-sm bg-bilbola-mint-light/30 flex flex-col items-center gap-1.5">
        <span class="text-xl">🛡️</span>
        <span>Garantía Oficial Taller 6 Meses</span>
      </div>
      <div class="p-2.5 rounded-bilbola-sm bg-bilbola-mint-light/30 flex flex-col items-center gap-1.5">
        <span class="text-xl">🚚</span>
        <span>Despacho Asegurado a Todo Chile</span>
      </div>
    </div>

    <!-- Sticky Bar al hacer scroll en móvil y escritorio -->
    <StickyAddToCartBar
      :product-name="product.name"
      :price="product.price"
      :original-price="product.originalPrice"
      :image-url="product.imageUrl"
      :in-stock="product.inStock"
      threshold-id="add-to-cart-btn"
      @add-to-cart="(qty) => handleAddToCart(qty)"
    />
  </div>
</template>
