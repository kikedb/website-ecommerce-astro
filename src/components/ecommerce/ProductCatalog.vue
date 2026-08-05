<script setup lang="ts">
import { ref } from 'vue';
import { useCatalog } from '@/composables/useCatalog';
import FilterToolbar from '@/components/ecommerce/FilterToolbar.vue';
import FilterChipBar, { type ActiveFilter } from '@/components/ecommerce/FilterChipBar.vue';
import ProductCard from '@/components/ecommerce/ProductCard.vue';
import PaginationControls from '@/components/ui/PaginationControls.vue';
import EmptyState from '@/components/ui/EmptyState.vue';

// Uso del composable que encapsula el estado y cálculos de filtrado y paginación
const {
  categories,
  minPrice,
  maxPrice,
  currentPage,
  totalPages,
  filteredProducts,
  paginatedProducts,
  activeFilters,
  handleFilterChange,
  resetFilters,
  setPage
} = useCatalog(8);

// Referencia al componente FilterToolbar para manipular estado ante remoción de chips
const toolbarRef = ref<any>(null);

function onRemoveFilter(filter: ActiveFilter) {
  if (!toolbarRef.value) return;

  if (filter.key === 'category') {
    // Buscar la categoría entre las opciones para hallar su value
    const catGroup = categories.find(c => c.id === 'category');
    const opt = catGroup?.options.find(o => o.label === filter.value || o.value === filter.value);
    if (opt) {
      toolbarRef.value.toggleOption('category', opt.value);
    }
  } else if (filter.key === 'price') {
    toolbarRef.value.priceRange = [minPrice, maxPrice];
    toolbarRef.value.notifyChange();
  } else if (filter.key === 'inStock') {
    toolbarRef.value.onlyInStock = false;
    toolbarRef.value.notifyChange();
  }
}

function onClearAll() {
  if (toolbarRef.value && typeof toolbarRef.value.clearAll === 'function') {
    toolbarRef.value.clearAll();
  } else {
    resetFilters();
  }
}

function onProductAction(slugOrId: string | number) {
  if (typeof window !== 'undefined') {
    window.location.href = `/productos/${slugOrId}`;
  }
}
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 font-bilbola">
    <div class="flex flex-col lg:flex-row gap-8 items-start">
      <!-- Barra de Filtros Lateral (Desktop) y Botón Drawer (Mobile) -->
      <div class="w-full lg:w-auto shrink-0">
        <FilterToolbar
          ref="toolbarRef"
          :categories="categories"
          :min-price="minPrice"
          :max-price="maxPrice"
          :total-results="filteredProducts.length"
          @filter-change="handleFilterChange"
          @clear-all="resetFilters"
        />
      </div>

      <!-- Sección Principal de Exhibición de Productos -->
      <div class="flex-1 w-full space-y-6">
        <!-- Barra de Chips Activos -->
        <FilterChipBar
          :filters="activeFilters"
          @remove="onRemoveFilter"
          @clear-all="onClearAll"
        />

        <!-- Grilla y Controles (Si hay resultados) -->
        <div v-if="filteredProducts.length > 0" class="space-y-10">
          <transition-group
            name="list-fade"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 min-h-[480px]"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :id="product.id"
              :slug="product.slug"
              :name="product.name"
              :price="product.price"
              :original-price="product.originalPrice"
              :image-url="product.imageUrl"
              :in-stock="product.inStock"
              :is-customizable="product.isCustomizable"
              :badges="product.badges"
              :product-url="`/productos/${product.slug || product.id}`"
              cta-label="Ver detalles"
              @action="onProductAction(product.slug || product.id)"
            />
          </transition-group>

          <!-- Controles de Paginación -->
          <div v-if="totalPages > 1" class="pt-6 border-t border-bilbola-gray-light/30">
            <PaginationControls
              :current-page="currentPage"
              :total-pages="totalPages"
              mode="numbered"
              @change-page="setPage"
            />
          </div>
        </div>

        <!-- Estado Vacío (Sin resultados con la combinación de filtros) -->
        <EmptyState
          v-else
          title="No encontramos productos con tus filtros"
          description="Parece que ninguna pieza coincide exactamente con tu búsqueda. Intenta limpiando o ajustando los filtros para explorar más alternativas del catálogo."
          @action="onClearAll"
        >
          <template #action>
            <button
              type="button"
              @click="onClearAll"
              class="mt-4 px-6 py-3 bg-bilbola-action-primary text-white font-bold rounded-bilbola-sm shadow-md hover:bg-bilbola-mint-depth transition-all text-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Reiniciar todos los filtros</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </template>
        </EmptyState>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Transiciones fluidas para cambios en la lista de productos (Frontend Design) */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
}
</style>
