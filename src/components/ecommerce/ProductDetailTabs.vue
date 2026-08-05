<script setup lang="ts">
import { ref } from 'vue';
import ProductReviewCard from '@/components/ecommerce/ProductReviewCard.vue';
import type { MockProduct, ReviewItem } from '@/lib/mockCatalog';

export interface Props {
  product: MockProduct;
}

const props = defineProps<Props>();

const activeTab = ref<'specs' | 'care' | 'reviews'>('specs');

const fallbackReviews: ReviewItem[] = [
  { author: 'Carla González', date: 'Hace 2 semanas', rating: 5, comment: 'Maravilloso producto. Los acabados artesanales de Bílbola marcan una diferencia enorme comparados con muebles industriales. Muy feliz.', verified: true, productVariant: 'Madera Natural' },
  { author: 'Felipe Morales', date: 'Hace 1 mes', rating: 5, comment: 'Llegó en el plazo acordado a Viña del Mar. Excelente embalaje y atención por WhatsApp muy cordial en todo momento.', verified: true },
  { author: 'Daniela Toro', date: 'Hace 1 mes', rating: 5, comment: 'Es nuestro segundo encargo al taller y siempre superan las expectativas. 100% recomendables para dormitorios Montessori.', verified: true }
];

function selectTab(tab: 'specs' | 'care' | 'reviews') {
  activeTab.value = tab;
}
</script>

<template>
  <section id="seccion-pestanas-detalle" class="py-12 font-bilbola">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <div class="bg-white rounded-bilbola-lg border border-bilbola-mint-light shadow-md overflow-hidden">
        
        <!-- Pestañas de Navegación: en móvil en grilla de 3 con iconos y texto compacto sin scroll lateral -->
        <div class="grid grid-cols-3 sm:flex sm:flex-wrap border-b border-bilbola-gray-light/30 bg-bilbola-surface-page/60">
          <button
            type="button"
            @click="selectTab('specs')"
            :class="[
              'py-3 sm:px-6 sm:py-4 font-extrabold text-xs sm:text-base transition-all border-b-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer text-center',
              activeTab === 'specs'
                ? 'border-bilbola-action-focus text-bilbola-action-focus bg-white shadow-2xs'
                : 'border-transparent text-bilbola-text-secondary hover:text-bilbola-text-primary hover:bg-white/50'
            ]"
          >
            <span class="text-lg sm:text-base">📐</span>
            <span class="block sm:hidden">Medidas</span>
            <span class="hidden sm:inline">Especificaciones y Materiales</span>
          </button>

          <button
            type="button"
            @click="selectTab('care')"
            :class="[
              'py-3 sm:px-6 sm:py-4 font-extrabold text-xs sm:text-base transition-all border-b-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer text-center',
              activeTab === 'care'
                ? 'border-bilbola-action-focus text-bilbola-action-focus bg-white shadow-2xs'
                : 'border-transparent text-bilbola-text-secondary hover:text-bilbola-text-primary hover:bg-white/50'
            ]"
          >
            <span class="text-lg sm:text-base">🧼</span>
            <span class="block sm:hidden">Cuidado</span>
            <span class="hidden sm:inline">Cuidado y Mantenimiento</span>
          </button>

          <button
            type="button"
            @click="selectTab('reviews')"
            :class="[
              'py-3 sm:px-6 sm:py-4 font-extrabold text-xs sm:text-base transition-all border-b-4 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer text-center',
              activeTab === 'reviews'
                ? 'border-bilbola-action-focus text-bilbola-action-focus bg-white shadow-2xs'
                : 'border-transparent text-bilbola-text-secondary hover:text-bilbola-text-primary hover:bg-white/50'
            ]"
          >
            <span class="text-lg sm:text-base">⭐</span>
            <span class="block sm:hidden">Reseñas ({{ product.reviews?.length || fallbackReviews.length }})</span>
            <span class="hidden sm:inline">Reseñas de Papás y Mamás ({{ product.reviews?.length || fallbackReviews.length }})</span>
          </button>
        </div>

        <!-- Contenido Pestaña 1: Especificaciones -->
        <div v-if="activeTab === 'specs'" class="p-5 sm:p-10 space-y-6">
          <div class="max-w-3xl">
            <h3 class="text-xl font-bold text-bilbola-text-primary mb-3 font-serif">
              Detalles Técnicos & Filosofía de Diseño
            </h3>
            <p class="text-bilbola-text-secondary leading-relaxed font-light mb-6">
              Todos nuestros muebles y accesorios decorativos son elaborados en Chile priorizando maderas nativas sostenibles, colas al agua hipoalergénicas y bordes redondeados para la máxima seguridad en el dormitorio infantil.
            </p>

            <div v-if="product.specifications" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(val, key) in product.specifications"
                :key="key"
                class="p-4 rounded-bilbola-sm bg-bilbola-surface-neutral border border-bilbola-gray-light/30 flex flex-col justify-between"
              >
                <span class="text-xs font-black uppercase tracking-wider text-bilbola-action-focus block mb-1">
                  {{ key }}
                </span>
                <span class="text-sm font-bold text-bilbola-text-primary">
                  {{ val }}
                </span>
              </div>
            </div>
            <div v-else class="p-4 rounded-bilbola-sm bg-bilbola-surface-neutral text-sm text-bilbola-text-secondary">
              Especificaciones de largo y ancho a medida disponibles consultando con nuestro taller de diseño.
            </div>
          </div>
        </div>

        <!-- Contenido Pestaña 2: Cuidado y Mantenimiento -->
        <div v-else-if="activeTab === 'care'" class="p-5 sm:p-10 space-y-6">
          <div class="max-w-3xl space-y-4">
            <h3 class="text-xl font-bold text-bilbola-text-primary mb-2 font-serif">
              Recomendaciones de Limpieza del Taller Bílbola
            </h3>
            <p class="text-base text-bilbola-text-primary leading-relaxed bg-bilbola-mint-light/20 p-5 rounded-bilbola-md border border-bilbola-mint-light/50">
              {{ product.careInstructions || 'Limpiar regularmente con un paño de microfibra ligeramente húmedo con agua tibia. Secar inmediatamente de manera prolija. No emplear químicos agresivos, cloro ni lustramuebles con siliconas abrasivas que obstruyan el poro de las maderas nativas o decoloren las tintas al agua.' }}
            </p>

            <ul class="list-disc list-inside text-sm text-bilbola-text-secondary space-y-2 pt-2">
              <li>Evitar la exposición directa y constante al sol tras ventanas sin cortina para preservar el tono original de la madera.</li>
              <li>Mantener el dormitorio ventilado regularmente en épocas invernales.</li>
              <li>En muebles con pernería y tornillos autoelementos, verificar y reapretar suavemente cada 6 a 12 meses.</li>
            </ul>
          </div>
        </div>

        <!-- Contenido Pestaña 3: Reseñas -->
        <div v-else-if="activeTab === 'reviews'" class="p-5 sm:p-10 space-y-6">
          <div class="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div>
              <h3 class="text-xl font-bold text-bilbola-text-primary font-serif">
                Experiencias Certificadas de Familias Bílbola
              </h3>
              <p class="text-sm text-bilbola-text-secondary font-light">
                Comentarios verídicos de padres y madres de todo Chile tras recibir sus piezas del taller.
              </p>
            </div>
            
            <span class="px-4 py-2 rounded-bilbola-sm bg-green-50 border border-green-200 text-green-800 font-extrabold text-xs inline-flex items-center gap-1.5 shadow-2xs">
              ★ 5.0 de 5.0 (Calificación general)
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductReviewCard
              v-for="(review, index) in (product.reviews || fallbackReviews)"
              :key="index"
              :author="review.author"
              :date="review.date"
              :rating="review.rating"
              :comment="review.comment"
              :verified="review.verified !== false"
              :product-variant="review.productVariant"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
