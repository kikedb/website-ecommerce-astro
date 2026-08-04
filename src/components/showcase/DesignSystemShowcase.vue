<script setup lang="ts">
import { ref, computed } from 'vue';
import { toast } from 'vue-sonner';

// Import all UI Components
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseCheckbox from '../ui/BaseCheckbox.vue';
import BaseRadio from '../ui/BaseRadio.vue';
import BaseBadge from '../ui/BaseBadge.vue';
import BaseModal from '../ui/BaseModal.vue';
import BaseDrawer from '../ui/BaseDrawer.vue';
import BaseAccordion from '../ui/BaseAccordion.vue';
import BaseTabs from '../ui/BaseTabs.vue';
import BaseDropdown from '../ui/BaseDropdown.vue';
import BaseToggle from '../ui/BaseToggle.vue';
import NotificationProvider from '../ui/NotificationProvider.vue';
import QuantitySelector from '../ui/QuantitySelector.vue';
import EmptyState from '../ui/EmptyState.vue';

// Import Ecommerce Components
import ProductCard from '../ecommerce/ProductCard.vue';
import PriceDisplay from '../ecommerce/PriceDisplay.vue';
import ColorSwatch from '../ecommerce/ColorSwatch.vue';
import CustomizationInput from '../ecommerce/CustomizationInput.vue';
import ProductSkeleton from '../ecommerce/ProductSkeleton.vue';
import CartItem from '../ecommerce/CartItem.vue';

// --- State for Live Interactive Demos ---
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

function triggerToast(type: 'success' | 'info' | 'error') {
  if (type === 'success') toast.success('¡Producto añadido al carrito con éxito!');
  else if (type === 'error') toast.error('Error de red: intenta nuevamente.');
  else toast.info('Notificación Bílbola con tokens oficiales.');
}
</script>

<template>
  <div class="container mx-auto px-4 py-12 font-bilbola space-y-16 max-w-6xl">
    <NotificationProvider />

    <!-- Header / Intro -->
    <header class="text-center space-y-4 border-b border-bilbola-gray-light/30 pb-10">
      <div class="inline-flex gap-2">
        <BaseBadge type="customizable" label="Design System v1.0" />
        <BaseBadge type="new" label="Tailwind v4 + Vue 3" />
      </div>
      <h1 class="text-4xl md:text-6xl font-black text-bilbola-text-primary font-bilbola">
        Showcase de Componentes <span class="text-bilbola-mint-depth">Bílbola</span>
      </h1>
      <p class="text-lg text-bilbola-text-secondary max-w-3xl mx-auto font-light leading-relaxed">
        Galería interactiva de los 20 componentes base del sistema de diseño para comercio electrónico, tematizados rigurosamente con los tokens oficiales, Headless UI Vue y Vue Sonner.
      </p>
    </header>

    <!-- Sección 1: Botones y Badges -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
        1. Botones, Acciones & Badges
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 01. BaseButton -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">01. BaseButton</h3>
            <p class="text-sm text-bilbola-text-secondary">Botones polifacéticos con soporte para variantes de marca, tamaños, carga (loading) y estados inhabilitados.</p>
          </div>
          <div class="flex flex-wrap gap-3 items-center">
            <BaseButton variant="primary">Primary Action</BaseButton>
            <BaseButton variant="secondary">Secondary Mint</BaseButton>
            <BaseButton variant="outline">Outline</BaseButton>
            <BaseButton variant="ghost">Ghost</BaseButton>
          </div>
          <div class="flex flex-wrap gap-3 items-center pt-2 border-t border-bilbola-gray-light/20">
            <BaseButton size="sm">Small</BaseButton>
            <BaseButton size="md">Medium</BaseButton>
            <BaseButton size="lg">Large CTA</BaseButton>
            <BaseButton loading>Cargando</BaseButton>
            <BaseButton disabled>Inhabilitado</BaseButton>
          </div>
        </div>

        <!-- 06. BaseBadge -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">06. BaseBadge</h3>
            <p class="text-sm text-bilbola-text-secondary">Etiquetas visuales de estado que consumen los colores de soporte oficiales (máximo 2 simultáneos por tarjeta).</p>
          </div>
          <div class="flex flex-wrap gap-3 items-center py-4">
            <BaseBadge type="customizable" label="Personalizable (Pink)" />
            <BaseBadge type="new" label="Nuevo (Mint Depth)" />
            <BaseBadge type="made-to-order" label="Hecho a Pedido (Yellow)" />
            <BaseBadge type="last-units" label="Últimas Unidades" />
            <BaseBadge type="discount" label="20% OFF" />
            <BaseBadge type="neutral" label="Neutral Gray" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección 2: Campos de Formulario y Controles -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
        2. Campos de Formulario & Selectores
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 02. BaseInput -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">02. BaseInput</h3>
            <p class="text-sm text-bilbola-text-secondary mb-4">Input con estados de foco accesible (#2F6F60), textos de ayuda y validación.</p>
          </div>
          <div class="space-y-3">
            <BaseInput v-model="sampleText" label="Nombre del Cliente" placeholder="Ej: Jorge" required hint="Foco con anillo verde bosque accesible." />
            <BaseInput label="Correo con Error" error="El formato de correo no es válido" placeholder="usuario@error" />
          </div>
        </div>

        <!-- 03. BaseSelect -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">03. BaseSelect (Headless UI)</h3>
            <p class="text-sm text-bilbola-text-secondary mb-4">Desplegable accesible gestionado con Listbox de Headless UI y transiciones suaves.</p>
          </div>
          <div class="space-y-3">
            <BaseSelect v-model="selectVal" :options="selectOptions" label="Comuna de Despacho" />
            <p class="text-xs text-bilbola-text-secondary">Comuna activa: <strong>{{ selectVal }}</strong></p>
          </div>
        </div>

        <!-- 04 & 05 & 13: Checkbox, Radio, Toggle -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-5">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">04, 05 & 13. Controles Booleanos</h3>
            <p class="text-sm text-bilbola-text-secondary">Checkbox, RadioGroup de variantes y Switch animados con contraste alto.</p>
          </div>
          
          <BaseCheckbox v-model="checkboxVal" label="Acepto recibir magia decokids en mi correo" />
          
          <div class="border-t border-b border-bilbola-gray-light/20 py-3">
            <BaseToggle v-model="toggleVal" label="Filtro: Sólo en stock" description="Oculta productos temporalmente agotados" />
          </div>

          <BaseRadio v-model="radioVal" :options="radioOptions" label="Variante de tamaño" />
        </div>
      </div>
    </section>

    <!-- Sección 3: E-commerce, Variantes y Personalización -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
        3. Componentes de E-commerce & Precios
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 07. ProductCard -->
        <div class="space-y-3">
          <h3 class="font-bold text-lg text-bilbola-text-primary">07. ProductCard</h3>
          <p class="text-sm text-bilbola-text-secondary">Tarjeta oficial de catálogo con relación de aspecto 1:1, badges superpuestos, precio y affordance de compra.</p>
          <ProductCard
            id="101"
            name="Lámpara Nube Flota Sueños con Luz Cálida"
            :price="24990"
            :original-price="29990"
            image-url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop"
            is-customizable
            :badges="[{ type: 'discount', label: '15% OFF' }]"
            @action="triggerToast('success')"
          />
        </div>

        <!-- 16 & 17 & 15: PriceDisplay, ColorSwatch, QuantitySelector -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">15, 16 & 17. Controles de Precio y Atributos</h3>
            <p class="text-sm text-bilbola-text-secondary">Muestra escalable de precios en CLP, selector numérico y paleta de colores interactiva.</p>
          </div>

          <div class="space-y-2 border-p py-2">
            <span class="text-xs font-bold uppercase text-bilbola-text-secondary">Escalas de PriceDisplay (16):</span>
            <div class="flex flex-col gap-1">
              <PriceDisplay :amount="19990" :original-amount="24990" size="sm" />
              <PriceDisplay :amount="19990" :original-amount="24990" size="md" />
              <PriceDisplay :amount="19990" :original-amount="24990" size="xl" />
            </div>
          </div>

          <ColorSwatch v-model="swatchVal" :options="swatchOptions" label="Color de Madera / Tela" />

          <div class="pt-3 border-t border-bilbola-gray-light/20 flex items-center justify-between">
            <span class="text-sm font-bold">QuantitySelector (15):</span>
            <QuantitySelector v-model="quantityVal" :min="1" :max="5" />
          </div>
        </div>

        <!-- 18 & 20: CustomizationInput & CartItem -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">18 & 20. Personalización y Ítem de Carrito</h3>
            <p class="text-sm text-bilbola-text-secondary">Campo con contador de caracteres, advertencia legal de marca y fila compacta de Cart Drawer.</p>
          </div>

          <CustomizationInput
            v-model="customText"
            :max-length="25"
            label="Bordado de Nombre (18)"
            warning-text="Por norma Bílbola, ítems personalizados no admiten cambios o devoluciones."
          />

          <div class="border-t border-bilbola-gray-light/30 pt-3">
            <span class="text-xs font-bold text-bilbola-text-secondary block mb-2">CartItem Condensa (20):</span>
            <CartItem
              id="99"
              name="Cojín Estrella Menta"
              :price="12900"
              :quantity="cartQuantity"
              image-url="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=300&auto=format&fit=crop"
              variant-text="Color: Menta Bílbola"
              customization-text="Bordado: Matías"
              @update:quantity="cartQuantity = $event"
              @remove="triggerToast('info')"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección 4: Navegación y Estructura -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
        4. Navegación, Menús & Acordeones
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- 10. BaseAccordion -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">10. BaseAccordion (Headless UI Disclosure)</h3>
            <p class="text-sm text-bilbola-text-secondary">Paneles colapsables para Preguntas Frecuentes (FAQ), detalles técnicos o guías de cuidado.</p>
          </div>
          <BaseAccordion :items="accordionItems" />
        </div>

        <!-- 11 & 12: BaseTabs & BaseDropdown -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-6">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">11 & 12. BaseTabs & BaseDropdown</h3>
            <p class="text-sm text-bilbola-text-secondary">Navegación por pestañas para organizar especificaciones de producto y menús flotantes accesibles.</p>
          </div>

          <BaseTabs :tabs="tabItems">
            <template #tab-0>
              <p class="text-sm py-2">Acabado suave en algodón de 300 hilos estampado a mano en nuestros talleres.</p>
            </template>
            <template #tab-1>
              <p class="text-sm py-2">Lavar a mano o máquina en ciclo delicado con agua fría. No usar blanqueador.</p>
            </template>
          </BaseTabs>

          <div class="border-t border-bilbola-gray-light/20 pt-4 flex items-center justify-between">
            <span class="text-sm font-semibold">Menú de Usuario / Opciones (12):</span>
            <BaseDropdown label="Acciones de Cuenta" :items="dropdownItems" align="right" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección 5: Modales, Drawers & Feedback -->
    <section class="space-y-8">
      <h2 class="text-2xl font-bold text-bilbola-text-primary border-l-4 border-bilbola-mint-depth pl-4">
        5. Overlays (Modales & Drawers) & Feedback UX
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 08 & 09 & 14: Overlays & Toasts -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">08, 09 & 14. Modales, Drawers & Toasts</h3>
            <p class="text-sm text-bilbola-text-secondary mb-6">Diálogos accesibles con atrapamiento de foco y sistema de notificaciones Vue Sonner.</p>
          </div>
          <div class="flex flex-col gap-3">
            <BaseButton variant="primary" @click="isModalOpen = true">
              Abrir Modal de Muestra (08)
            </BaseButton>
            <BaseButton variant="secondary" @click="isDrawerOpen = true">
              Abrir Cart Drawer Deslizante (09)
            </BaseButton>
            <div class="grid grid-cols-3 gap-2 pt-2 border-t border-bilbola-gray-light/20">
              <BaseButton size="sm" variant="outline" @click="triggerToast('success')">Toast ✔</BaseButton>
              <BaseButton size="sm" variant="outline" @click="triggerToast('info')">Toast ℹ</BaseButton>
              <BaseButton size="sm" variant="outline" @click="triggerToast('error')">Toast ✘</BaseButton>
            </div>
          </div>
        </div>

        <!-- 19a. EmptyState -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">19a. EmptyState</h3>
            <p class="text-sm text-bilbola-text-secondary">Pantalla de retroalimentación ante carritos o búsquedas vacías con invitación a actuar.</p>
          </div>
          <EmptyState
            title="Tu carrito está vacío"
            description="¡Llénalo de magia y sueños para el dormitorio infantil!"
            action-label="Ir a Productos"
            action-href="/productos"
          />
        </div>

        <!-- 19b. ProductSkeleton -->
        <div class="bg-white p-6 rounded-bilbola-md border border-bilbola-gray-light/30 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 class="font-bold text-lg text-bilbola-text-primary">19b. ProductSkeleton</h3>
            <p class="text-sm text-bilbola-text-secondary">Efecto de shimmer de carga suave para evitar saltos bruscos de maquetación (CLS).</p>
          </div>
          <div class="py-2">
            <ProductSkeleton :count="1" />
          </div>
        </div>
      </div>
    </section>

    <!-- Modals & Drawers Render Bounds -->
    <BaseModal v-model="isModalOpen" title="Confirmación Bílbola Deco Kids" max-width="md">
      <p class="text-sm leading-relaxed mb-4">
        Este modal utiliza <strong>Headless UI Dialog</strong> con desenfoque de fondo y bordes <code>rounded-bilbola-lg (24px)</code>. Reseta el foco de teclado automáticamente al cerrarse con Escape o al hacer clic fuera.
      </p>
      <template #footer>
        <BaseButton variant="ghost" @click="isModalOpen = false">Cancelar</BaseButton>
        <BaseButton variant="primary" @click="isModalOpen = false; triggerToast('success')">Entendido</BaseButton>
      </template>
    </BaseModal>

    <BaseDrawer v-model="isDrawerOpen" title="Carrito de Compras (1)" side="right">
      <div class="space-y-4 divide-y divide-bilbola-gray-light/30">
        <p class="text-sm text-bilbola-text-secondary">
          Panel deslizante optimizado para el carrito de compras. En móvil, la cabecera y el pie permanecen fijos para garantizar accesibility del botón de Checkout en todo momento.
        </p>
        <div class="pt-4">
          <CartItem
            id="101"
            name="Lámpara Nube Flota Sueños"
            :price="24990"
            :quantity="cartQuantity"
            image-url="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=300&auto=format&fit=crop"
            customization-text="Luz Cálida"
            @update:quantity="cartQuantity = $event"
            @remove="isDrawerOpen = false; triggerToast('info')"
          />
        </div>
      </div>

      <template #footer>
        <div class="space-y-4 w-full">
          <div class="flex justify-between items-center text-lg font-bold border-t border-bilbola-gray-light/20 pt-2">
            <span>Total Estimado:</span>
            <PriceDisplay :amount="24990 * cartQuantity" size="lg" />
          </div>
          <BaseButton variant="primary" size="lg" class="w-full shadow-md" @click="isDrawerOpen = false; triggerToast('success')">
            Iniciar Pago (Checkout)
          </BaseButton>
        </div>
      </template>
    </BaseDrawer>
  </div>
</template>
