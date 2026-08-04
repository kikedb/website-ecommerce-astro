<script setup lang="ts">
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';

// --- FASE 1: Import UI Components ---
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseSelect from '@/components/ui/BaseSelect.vue';
import BaseCheckbox from '@/components/ui/BaseCheckbox.vue';
import BaseRadio from '@/components/ui/BaseRadio.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';
import BaseModal from '@/components/ui/BaseModal.vue';
import BaseDrawer from '@/components/ui/BaseDrawer.vue';
import BaseAccordion from '@/components/ui/BaseAccordion.vue';
import BaseTabs from '@/components/ui/BaseTabs.vue';
import BaseDropdown from '@/components/ui/BaseDropdown.vue';
import BaseToggle from '@/components/ui/BaseToggle.vue';
import NotificationProvider from '@/components/ui/NotificationProvider.vue';
import QuantitySelector from '@/components/ui/QuantitySelector.vue';
import EmptyState from '@/components/ui/EmptyState.vue';
import ProductCard from '@/components/ecommerce/ProductCard.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import ColorSwatch from '@/components/ecommerce/ColorSwatch.vue';
import CustomizationInput from '@/components/ecommerce/CustomizationInput.vue';
import ProductSkeleton from '@/components/ecommerce/ProductSkeleton.vue';
import CartItem from '@/components/ecommerce/CartItem.vue';

// --- FASE 2: Import Advanced & E-commerce Components ---
import GlobalSearchModal from '@/components/ecommerce/GlobalSearchModal.vue';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav.vue';
import AnnouncementBanner from '@/components/ui/AnnouncementBanner.vue';
import FilterToolbar from '@/components/ecommerce/FilterToolbar.vue';
import FilterChipBar, { type ActiveFilter } from '@/components/ecommerce/FilterChipBar.vue';
import PaginationControls from '@/components/ui/PaginationControls.vue';
import ProductMediaGallery from '@/components/ecommerce/ProductMediaGallery.vue';
import StickyAddToCartBar from '@/components/ecommerce/StickyAddToCartBar.vue';
import BaseTooltip from '@/components/ui/BaseTooltip.vue';
import BasePopover from '@/components/ui/BasePopover.vue';
import ProductCarouselSlider from '@/components/ecommerce/ProductCarouselSlider.vue';
import ShareProductButtons from '@/components/ecommerce/ShareProductButtons.vue';
import StarRatingDisplay from '@/components/ecommerce/StarRatingDisplay.vue';
import ProductReviewCard from '@/components/ecommerce/ProductReviewCard.vue';
import FavoriteHeartButton from '@/components/ecommerce/FavoriteHeartButton.vue';
import CheckoutStepsTracker from '@/components/ecommerce/CheckoutStepsTracker.vue';
import ChileShippingSelector from '@/components/ecommerce/ChileShippingSelector.vue';

// --- State for Live Interactive Demos ---
const activeTabSection = ref<'fase1' | 'fase2'>('fase1');

// Fase 1 State
const sampleText = ref('Magia y Deco');
const selectVal = ref('stgo');
const checkboxVal = ref(true);
const radioVal = ref('md');
const toggleVal = ref(true);
const quantityVal = ref(2);
const isModalOpen = ref(false);
const isDrawerOpen = ref(false);
const customText = ref('Matías (Dormitorio)');
const swatchVal = ref('Rosa Pastel');
const cartQuantity = ref(1);

// Fase 2 State
const isSearchOpen = ref(false);
const currentPage = ref(2);
const checkoutStep = ref(2);
const activeChips = ref<ActiveFilter[]>([
  { key: 'cat', label: 'Categoría', value: 'Lámparas' },
  { key: 'col', label: 'Color', value: 'Menta Bílbola' },
  { key: 'mat', label: 'Material', value: 'Madera Orgánica' }
]);

// Options Data
const selectOptions = [
  { label: 'Santiago Centro', value: 'stgo' },
  { label: 'Providencia', value: 'prov' },
  { label: 'Las Condes (Sin Despacho)', value: 'lc', disabled: true },
  { label: 'Viña del Mar', value: 'vdm' }
];

const radioOptions = [
  { label: 'Tamaño Pequeño (S)', description: '30x40 cm - Ideal repisas', value: 'sm' },
  { label: 'Tamaño Mediano (M)', description: '50x70 cm - Pared principal', value: 'md' },
  { label: 'Tamaño Mural (L)', description: 'Agotado temporalmente', value: 'lg', disabled: true }
];

const dropdownItems = [
  { label: 'Ver Mi Perfil', action: () => toast.info('Navegando a perfil...') },
  { label: 'Historial de Pedidos', action: () => toast.success('Mostrando pedidos recientes') },
  { label: 'Ayuda y Contacto', dividerBefore: true, action: () => toast('Soporte Bílbola Activo') }
];

const accordionItems = [
  { title: '¿Cuáles son los tiempos de fabricación?', content: 'Todos nuestros productos hechos a pedido toman entre 5 a 7 días hábiles con amor e infinitos cuidados.', defaultOpen: true },
  { title: '¿Puedo devolver un ítem personalizado?', content: 'Según el Brandbook Bílbola, los ítems con bordados o nombres únicos no admiten cambios ni devoluciones excepto por fallas de origen.' }
];

const tabItems = [
  { label: 'Descripción', badge: 'New' },
  { label: 'Materiales & Cuidado' },
  { label: 'Envíos (Inactivo)', disabled: true }
];

const swatchOptions = [
  { name: 'Menta Bílbola', colorCode: '#BEE9E7' },
  { name: 'Rosa Pastel', colorCode: '#F6DFE0' },
  { name: 'Azul Sueño', colorCode: '#B1C9E8' },
  { name: 'Amarillo Sol', colorCode: '#FAF1BA' },
  { name: 'Gris Neutro', colorCode: '#978C87' }
];

const sampleMedia = [
  { id: 1, url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', alt: 'Lámpara Nube' },
  { id: 2, url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop', alt: 'Detalle Tela' },
  { id: 3, url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop', alt: 'Ambiente Dormitorio' }
];

const sampleSearchResults = [
  { id: 101, name: 'Lámpara Nube Flota Sueños', category: 'Iluminación', price: 24990, originalPrice: 29990, imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop' },
  { id: 102, name: 'Cojín Estrella Menta Bílbola', category: 'Textil', price: 12900, imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=200&auto=format&fit=crop' },
  { id: 103, name: 'Repisa Flotante Madera Sueños', category: 'Muebles', price: 34990, imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop' }
];

function triggerToast(type: 'success' | 'info' | 'error') {
  if (type === 'success') toast.success('¡Producto añadido al carrito con éxito!');
  else if (type === 'error') toast.error('Error de red: intenta nuevamente.');
  else toast.info('Notificación Bílbola con tokens oficiales.');
}

function removeChip(chip: ActiveFilter) {
  const idx = activeChips.value.indexOf(chip);
  if (idx !== -1) activeChips.value.splice(idx, 1);
}
</script>

<template>
  <div class="font-bilbola pb-24">
    <!-- Announcement Banner at very top -->
    <AnnouncementBanner id="showcase-banner" message="🌟 Sistema de Diseño Bílbola v2: 35 Componentes interactivos habilitados." cta-label="Ver GitHub Docs" cta-href="/docs" />

    <div class="container mx-auto px-4 py-8 space-y-12 max-w-6xl">
      <NotificationProvider />

      <!-- Header / Intro -->
      <header class="text-center space-y-4 border-b border-bilbola-gray-light/30 pb-8">
        <BreadcrumbNav :items="[{ label: 'Sistema de Diseño', current: true }]" />
        <div class="inline-flex gap-2">
          <BaseBadge type="customizable" label="Design System v2.0" />
          <BaseBadge type="new" label="35 Componentes Total" />
        </div>
        <h1 class="text-4xl md:text-6xl font-black text-bilbola-text-primary">
          Showcase de Componentes <span class="text-bilbola-mint-depth">Bílbola</span>
        </h1>
        <p class="text-lg text-bilbola-text-secondary max-w-3xl mx-auto font-light leading-relaxed">
          Galería interactiva con los 35 componentes de comercio electrónico (Fase 1 Base + Fase 2 Avanzados), tematizados con los tokens oficiales del Brand System.
        </p>

        <!-- Phase Switcher Tabs -->
        <div class="flex justify-center pt-4">
          <div class="inline-flex p-1 bg-bilbola-surface-neutral rounded-bilbola-md border border-bilbola-gray-light/40">
            <button
              type="button"
              @click="activeTabSection = 'fase1'"
              :class="['px-6 py-2 rounded-bilbola-sm font-black text-sm transition-all', activeTabSection === 'fase1' ? 'bg-bilbola-action-focus text-white shadow-md' : 'text-bilbola-text-secondary hover:text-bilbola-text-primary']"
            >
              📦 Fase 1: Componentes Base (1 - 20)
            </button>
            <button
              type="button"
              @click="activeTabSection = 'fase2'"
              :class="['px-6 py-2 rounded-bilbola-sm font-black text-sm transition-all', activeTabSection === 'fase2' ? 'bg-bilbola-action-focus text-white shadow-md' : 'text-bilbola-text-secondary hover:text-bilbola-text-primary']"
            >
              🚀 Fase 2: E-commerce Avanzado (21 - 35)
            </button>
          </div>
        </div>
      </header>

      <!-- =========================================================================
           FASE 1: COMPONENTES BASE (1 al 20)
           ========================================================================= -->
      <div v-show="activeTabSection === 'fase1'" class="space-y-16">
        <!-- Sección 1: Botones y Badges -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            1. Botones, Acciones & Badges (01 & 06)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg text-bilbola-text-primary">01. BaseButton</h3>
              <p class="text-sm text-bilbola-text-secondary">Botones polifacéticos con soporte para variantes de marca y estados de carga.</p>
              <div class="flex flex-wrap gap-3 items-center">
                <BaseButton variant="primary">Primary</BaseButton>
                <BaseButton variant="secondary">Secondary</BaseButton>
                <BaseButton variant="outline">Outline</BaseButton>
                <BaseButton variant="ghost">Ghost</BaseButton>
              </div>
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg text-bilbola-text-primary">06. BaseBadge</h3>
              <p class="text-sm text-bilbola-text-secondary">Etiquetas visuales que consumen la paleta de soporte oficial.</p>
              <div class="flex flex-wrap gap-2 items-center py-2">
                <BaseBadge type="customizable" label="Personalizable" />
                <BaseBadge type="new" label="Nuevo" />
                <BaseBadge type="made-to-order" label="Hecho a Pedido" />
                <BaseBadge type="last-units" label="Últimas Unidades" />
                <BaseBadge type="discount" label="20% OFF" />
              </div>
            </div>
          </div>
        </section>

        <!-- Sección 2: Campos y Selectores -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            2. Controles y Formularios (02, 03, 04, 05 & 13)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg">02. BaseInput</h3>
              <BaseInput v-model="sampleText" label="Nombre del Cliente" placeholder="Ej: Jorge" required hint="Anillo de foco verde bosque." />
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg">03. BaseSelect</h3>
              <BaseSelect v-model="selectVal" :options="selectOptions" label="Comuna de Despacho" />
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg">04, 05 & 13. Controles Booleanos</h3>
              <BaseCheckbox v-model="checkboxVal" label="Recibir newsletter decokids" />
              <div class="py-2 border-t border-b border-bilbola-gray-light/20">
                <BaseToggle v-model="toggleVal" label="Filtro: Sólo stock" />
              </div>
              <BaseRadio v-model="radioVal" :options="radioOptions" label="Variante de tamaño" />
            </div>
          </div>
        </section>

        <!-- Sección 3: E-commerce Base -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            3. E-commerce & Variantes (07, 15, 16, 17, 18 & 20)
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="space-y-3">
              <h3 class="font-bold text-lg">07. ProductCard</h3>
              <ProductCard
                id="101"
                name="Lámpara Nube Flota Sueños"
                :price="24990"
                :original-price="29990"
                image-url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop"
                is-customizable
                :badges="[{ type: 'discount', label: '15% OFF' }]"
                @action="triggerToast('success')"
              />
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-lg">15, 16 & 17. Precios y Variantes</h3>
                <div class="my-4 space-y-2">
                  <PriceDisplay :amount="19990" :original-amount="24990" size="lg" />
                </div>
                <ColorSwatch v-model="swatchVal" :options="swatchOptions" label="Color de Madera" />
              </div>
              <div class="pt-3 border-t border-bilbola-gray-light/20 flex items-center justify-between">
                <span class="text-sm font-bold">QuantitySelector:</span>
                <QuantitySelector v-model="quantityVal" :min="1" :max="5" />
              </div>
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-lg">18 & 20. Personalización y CartItem</h3>
                <CustomizationInput v-model="customText" :max-length="20" label="Bordado de Nombre" />
              </div>
              <div class="border-t border-bilbola-gray-light/30 pt-3">
                <CartItem id="99" name="Cojín Estrella Menta" :price="12900" :quantity="cartQuantity" image-url="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=300&auto=format&fit=crop" @update:quantity="cartQuantity = $event" @remove="triggerToast('info')" />
              </div>
            </div>
          </div>
        </section>

        <!-- Sección 4 & 5: Overlays y Navegación Base -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            4 & 5. Overlays, Menús & Feedback (08, 09, 10, 11, 12, 14, 19a & 19b)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg">08, 09 & 14. Overlays & Toasts</h3>
              <BaseButton variant="primary" class="w-full" @click="isModalOpen = true">Abrir Modal (08)</BaseButton>
              <BaseButton variant="secondary" class="w-full" @click="isDrawerOpen = true">Abrir Drawer (09)</BaseButton>
              <div class="grid grid-cols-2 gap-2 pt-2">
                <BaseButton size="sm" variant="outline" @click="triggerToast('success')">Toast ✔</BaseButton>
                <BaseButton size="sm" variant="outline" @click="triggerToast('info')">Toast ℹ</BaseButton>
              </div>
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
              <h3 class="font-bold text-lg">10, 11 & 12. Tabs & Acordeones</h3>
              <BaseTabs :tabs="tabItems">
                <template #tab-0><p class="text-xs py-2">Algodón 300 hilos estampado a mano.</p></template>
                <template #tab-1><p class="text-xs py-2">Lavar en ciclo delicado con agua fría.</p></template>
              </BaseTabs>
              <div class="pt-2 border-t border-bilbola-gray-light/20 flex justify-between items-center">
                <span class="text-xs font-bold">Menú (12):</span>
                <BaseDropdown label="Opciones" :items="dropdownItems" align="right" />
              </div>
            </div>
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs flex flex-col justify-between">
              <h3 class="font-bold text-lg mb-2">19a & 19b. Skeletons & EmptyState</h3>
              <ProductSkeleton :count="1" />
            </div>
          </div>
        </section>
      </div>

      <!-- =========================================================================
           FASE 2: COMPONENTES AVANZADOS E-COMMERCE (21 al 35)
           ========================================================================= -->
      <div v-show="activeTabSection === 'fase2'" class="space-y-16 animate-fadeIn">
        <!-- Sección 6: Búsqueda y Navegación Avanzada -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            6. Búsqueda Instantánea & Navegación SEO (21, 22 & 23)
          </h2>
          <div class="bg-white p-8 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6">
            <div>
              <h3 class="font-bold text-xl text-bilbola-text-primary">21. GlobalSearchModal (Command Palette)</h3>
              <p class="text-sm text-bilbola-text-secondary mb-4">Búsqueda predictiva con autocompletado de Headless UI Combobox, miniaturas de producto en tiempo real y etiquetas de tendencias.</p>
              <BaseButton variant="primary" size="lg" class="shadow-md" @click="isSearchOpen = true">
                🔍 Abrir Búsqueda Predictiva Bílbola
              </BaseButton>
            </div>

            <div class="border-t border-bilbola-gray-light/30 pt-4">
              <h3 class="font-bold text-base text-bilbola-text-primary">22 & 23. BreadcrumbNav & AnnouncementBanner</h3>
              <p class="text-sm text-bilbola-text-secondary">BreadcrumbNav inyecta microdatos Schema.org (JSON-LD) para posicionamiento SEO. El AnnouncementBanner (arriba en la barra del sitio) gestiona estado de cierre con LocalStorage.</p>
              <div class="p-3 bg-bilbola-surface-neutral rounded-bilbola-sm mt-3">
                <BreadcrumbNav :items="[{ label: 'Catálogo', href: '/productos' }, { label: 'Iluminación Infantil', href: '/productos/iluminacion' }, { label: 'Lámpara Nube Flota Sueños', current: true }]" />
              </div>
            </div>
          </div>
        </section>

        <!-- Sección 7: Catálogo, Filtros & Paginación -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            7. Herramientas de Catálogo & Filtros (24, 25 & 26)
          </h2>
          <div class="bg-white p-8 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6">
            <div>
              <h3 class="font-bold text-xl text-bilbola-text-primary">26. FilterChipBar (Pastillas Activas)</h3>
              <p class="text-sm text-bilbola-text-secondary mb-3">Muestra pastillas de filtros en uso con botón de borrado individual o limpieza masiva.</p>
              <FilterChipBar :filters="activeChips" @remove="removeChip" @clear-all="activeChips = []" />
              <BaseButton v-if="activeChips.length === 0" size="sm" variant="outline" class="mt-2" @click="activeChips = [{ key: 'cat', label: 'Cat', value: 'Lámparas' }, { key: 'col', label: 'Color', value: 'Menta' }]">Restaurar Filtros Demo</BaseButton>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-bilbola-gray-light/30 pt-6">
              <div>
                <h3 class="font-bold text-base text-bilbola-text-primary mb-2">24. FilterToolbar & PriceRangeSlider</h3>
                <p class="text-xs text-bilbola-text-secondary mb-4">Sidebar de escritorio y drawer de móvil con slider dual interactivo de precio.</p>
                <FilterToolbar :total-results="44" />
              </div>
              <div class="flex flex-col justify-between">
                <div>
                  <h3 class="font-bold text-base text-bilbola-text-primary mb-2">25. PaginationControls</h3>
                  <p class="text-xs text-bilbola-text-secondary mb-4">Soporta modo numérico con elipses o botón "Cargar más" progresivo.</p>
                  <PaginationControls :current-page="currentPage" :total-pages="5" @change-page="currentPage = $event" />
                </div>
                <div class="pt-2 border-t border-bilbola-gray-light/20">
                  <PaginationControls mode="load-more" :current-page="2" :total-pages="5" @load-more="triggerToast('info')" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Sección 8: Experiencia Inmersiva de Producto (PDP) -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            8. Página de Producto Inmersiva & Conversión (27, 28, 29, 30 & 31)
          </h2>
          
          <div class="bg-white p-8 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-8">
            <div>
              <div class="flex justify-between items-start flex-wrap gap-4 mb-4">
                <div>
                  <h3 class="font-bold text-xl text-bilbola-text-primary">27. ProductMediaGallery & 31. ShareProductButtons</h3>
                  <p class="text-sm text-bilbola-text-secondary">Visor principal con selector de miniaturas y modal amplificado a pantalla completa + botones sociales.</p>
                </div>
                <ShareProductButtons product-name="Lámpara Nube Flota Sueños" />
              </div>
              <ProductMediaGallery :media="sampleMedia" product-name="Lámpara Nube Flota Sueños" />
            </div>

            <div class="border-t border-bilbola-gray-light/30 pt-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 class="font-bold text-base text-bilbola-text-primary">29. BaseTooltip & BasePopover (Información en línea)</h3>
                <p class="text-xs text-bilbola-text-secondary">Explican dudas de materiales o despachos sin interrumpir la compra.</p>
              </div>
              <div class="flex gap-4 items-center">
                <BaseTooltip content="Algodón orgánico sin tintes tóxicos" position="top">
                  <span class="underline font-bold text-sm cursor-help text-bilbola-action-focus">¿Qué tela usamos?</span>
                </BaseTooltip>

                <BasePopover label="Guía de Tallas y Medidas" align="right">
                  <h5 class="font-bold text-sm mb-2">Medidas Estándar Deco Kids:</h5>
                  <ul class="list-disc pl-4 text-xs space-y-1">
                    <li><strong>Lámparas Nube:</strong> 35 x 22 cm (Luz cálida LED)</li>
                    <li><strong>Cojines:</strong> 40 x 40 cm rellenos con fibra siliconada</li>
                    <li><strong>Repisas:</strong> 60 x 15 cm en madera de pino noble</li>
                  </ul>
                </BasePopover>
              </div>
            </div>
          </div>

          <!-- 30. ProductCarouselSlider -->
          <div class="bg-white p-8 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs">
            <h3 class="font-bold text-xl text-bilbola-text-primary mb-2">30. ProductCarouselSlider (Cross-Sell / Relacionados)</h3>
            <ProductCarouselSlider title="Completa el Dormitorio Infantil ✨">
              <ProductCard
                v-for="p in sampleSearchResults"
                :key="p.id"
                :id="p.id"
                :name="p.name"
                :price="p.price"
                :original-price="p.originalPrice"
                :image-url="p.imageUrl"
                @action="triggerToast('success')"
              />
            </ProductCarouselSlider>
          </div>
        </section>

        <!-- Sección 9: Social Proof & Checkout Flow -->
        <section class="space-y-8">
          <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
            9. Confianza, Lista de Deseos & Checkout Flow (32, 33, 34 & 35)
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- 32 & 33: Reviews & Heart Favs -->
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h3 class="font-bold text-lg text-bilbola-text-primary">32 & 33. Reseñas y Wishlist ♥</h3>
                  <div class="flex items-center gap-2">
                    <span class="text-xs text-bilbola-text-secondary">Fav (33):</span>
                    <FavoriteHeartButton :product-id="101" product-name="Lámpara Nube Flota Sueños" />
                  </div>
                </div>
                <p class="text-sm text-bilbola-text-secondary mb-4">StarRatingDisplay y ProductReviewCard con fotos de clientes y compra verificada.</p>
                <div class="p-2 bg-bilbola-surface-neutral rounded-sm flex items-center justify-between mb-4">
                  <span class="font-bold text-sm">Promedio General:</span>
                  <StarRatingDisplay :rating="4.8" :review-count="24" size="md" />
                </div>
              </div>
              <ProductReviewCard
                author="Valentina M."
                date="2 de Agosto, 2026"
                :rating="5"
                comment="¡A mi hijo Matías le encantó su lámpara de nube! La luz es súper suave para la noche y la madera está terminada a la perfección."
                product-variant="Luz Cálida - Menta"
                :photos="['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=200&auto=format&fit=crop']"
              />
            </div>

            <!-- 34 & 35: Checkout Tracker & Shipping Calculator -->
            <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
              <div>
                <h3 class="font-bold text-lg text-bilbola-text-primary mb-2">34 & 35. Checkout Steps & Despachos en Chile</h3>
                <p class="text-sm text-bilbola-text-secondary">Barra de progreso visual para el pago en Flow (34) y selectores encadenados de Región/Comuna (35) con plazos de entrega.</p>

                <div class="my-6">
                  <CheckoutStepsTracker :current-step="checkoutStep" />
                  <div class="flex justify-center gap-2 mt-2">
                    <BaseButton size="sm" variant="outline" :disabled="checkoutStep <= 1" @click="checkoutStep--">&larr; Paso Ant</BaseButton>
                    <BaseButton size="sm" variant="secondary" :disabled="checkoutStep >= 4" @click="checkoutStep++">Siguiente Paso &rarr;</BaseButton>
                  </div>
                </div>
              </div>

              <ChileShippingSelector />
            </div>
          </div>
        </section>
      </div>

      <!-- Overlays, Modals, Drawers & Sticky Bars Render -->
      <GlobalSearchModal v-model="isSearchOpen" :products="sampleSearchResults" @select="triggerToast('info')" />

      <StickyAddToCartBar product-name="Lámpara Nube Flota Sueños" :price="24990" :original-price="29990" image-url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop" @add-to-cart="triggerToast('success')" />

      <BaseModal v-model="isModalOpen" title="Confirmación Bílbola Deco Kids" max-width="md">
        <p class="text-sm leading-relaxed mb-4">
          Este modal utiliza <strong>Headless UI Dialog</strong> con desenfoque de fondo y bordes <code>rounded-bilbola-lg (24px)</code>.
        </p>
        <template #footer>
          <BaseButton variant="ghost" @click="isModalOpen = false">Cancelar</BaseButton>
          <BaseButton variant="primary" @click="isModalOpen = false; triggerToast('success')">Entendido</BaseButton>
        </template>
      </BaseModal>

      <BaseDrawer v-model="isDrawerOpen" title="Carrito de Compras (1)" side="right">
        <div class="space-y-4 divide-y divide-bilbola-gray-light/30">
          <p class="text-sm text-bilbola-text-secondary">Panel deslizante optimizado para el carrito con cabecera y pie fijos.</p>
          <div class="pt-4">
            <CartItem id="101" name="Lámpara Nube Flota Sueños" :price="24990" :quantity="cartQuantity" image-url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop" customization-text="Luz Cálida" @update:quantity="cartQuantity = $event" @remove="isDrawerOpen = false; triggerToast('info')" />
          </div>
        </div>
        <template #footer>
          <div class="space-y-4 w-full">
            <div class="flex justify-between items-center text-lg font-bold border-t border-bilbola-gray-light/20 pt-2">
              <span>Total Estimado:</span>
              <PriceDisplay :amount="24990 * cartQuantity" size="lg" />
            </div>
            <BaseButton variant="primary" size="lg" class="w-full shadow-md" @click="isDrawerOpen = false; triggerToast('success')">Iniciar Pago (Checkout)</BaseButton>
          </div>
        </template>
      </BaseDrawer>
    </div>
  </div>
</template>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
