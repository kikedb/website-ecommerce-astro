import { ref, computed } from 'vue';
import { MOCK_PRODUCTS, getMockCategories, type MockProduct } from '@/lib/mockCatalog';
import type { ActiveFilter } from '@/components/ecommerce/FilterChipBar.vue';

export function useCatalog(perPage = 8) {
  const categories = getMockCategories();
  const minPrice = 0;
  const maxPrice = 300000;

  // Estado reactivo mínimo y predecible (Vue Best Practices)
  const selectedCategoryValues = ref<string[]>([]);
  const currentPriceRange = ref<[number, number]>([minPrice, maxPrice]);
  const currentInStockOnly = ref(false);
  const currentPage = ref(1);

  // Propiedad computada para productos filtrados
  const filteredProducts = computed<MockProduct[]>(() => {
    return MOCK_PRODUCTS.filter(p => {
      // Filtro de categoría
      if (selectedCategoryValues.value.length > 0) {
        if (!selectedCategoryValues.value.includes(p.category)) return false;
      }
      // Filtro por rango de precio
      if (p.price < currentPriceRange.value[0] || p.price > currentPriceRange.value[1]) {
        return false;
      }
      // Filtro de solo en stock
      if (currentInStockOnly.value && !p.inStock) {
        return false;
      }
      return true;
    });
  });

  // Paginación calculada automáticamente
  const totalPages = computed(() => {
    const total = filteredProducts.value.length;
    return Math.max(1, Math.ceil(total / perPage));
  });

  const paginatedProducts = computed<MockProduct[]>(() => {
    const start = (currentPage.value - 1) * perPage;
    return filteredProducts.value.slice(start, start + perPage);
  });

  // Construcción reactiva de los chips para FilterChipBar
  const activeFilters = computed<ActiveFilter[]>(() => {
    const list: ActiveFilter[] = [];
    selectedCategoryValues.value.forEach(val => {
      const opt = categories[0]?.options.find(o => o.value === val);
      list.push({
        key: 'category',
        label: 'Categoría',
        value: opt ? opt.label : val
      });
    });

    if (currentPriceRange.value[0] > minPrice || currentPriceRange.value[1] < maxPrice) {
      list.push({
        key: 'price',
        label: 'Precio',
        value: `$${currentPriceRange.value[0].toLocaleString('es-CL')} - $${currentPriceRange.value[1].toLocaleString('es-CL')}`
      });
    }

    if (currentInStockOnly.value) {
      list.push({
        key: 'inStock',
        label: 'Stock',
        value: 'Solo disponibles'
      });
    }

    return list;
  });

  // Manejador del evento filterChange del FilterToolbar
  function handleFilterChange(filters: any) {
    selectedCategoryValues.value = filters.options?.category || [];
    currentPriceRange.value = filters.price || [minPrice, maxPrice];
    currentInStockOnly.value = !!filters.inStock;
    currentPage.value = 1;
  }

  // Reinicio total de filtros
  function resetFilters() {
    selectedCategoryValues.value = [];
    currentPriceRange.value = [minPrice, maxPrice];
    currentInStockOnly.value = false;
    currentPage.value = 1;
  }

  // Control de paginación
  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      // Scroll hacia la parte superior de los productos en caso de interactuar
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }
  }

  return {
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
  };
}
