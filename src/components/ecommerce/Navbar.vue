<script setup lang="ts">
import { useCart } from '@/composables/useCart';
import BaseDrawer from '@/components/ui/BaseDrawer.vue';
import CartItem from '@/components/ecommerce/CartItem.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';
import { 
  Menu, 
  ShoppingBag, 
  Home, 
  Smile, 
  Package, 
  ArrowRight, 
  Trash2, 
  Sparkles 
} from 'lucide-vue-next';

const {
  items,
  isCartOpen,
  isMobileMenuOpen,
  totalItems,
  totalPrice,
  openCart,
  openMobileMenu,
  closeMobileMenu,
  updateQuantity,
  removeItem,
  clearCart
} = useCart();

const navLinks = [
  { label: 'Inicio', href: '/', icon: Home },
  { label: 'Conócenos', href: '/conocenos', icon: Smile },
  { label: 'Productos', href: '/productos', icon: Package }
];
</script>

<template>
  <header class="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-bilbola-gray-light/30 shadow-xs transition-all font-bilbola">
    <div class="mx-auto px-6 lg:container lg:px-0 xl:px-8 py-3.5 md:py-5 lg:py-6 relative flex items-center justify-between min-h-[80px] md:min-h-[96px] transition-all">
      
      <!-- IZQUIERDA: Enlaces Desktop & Hamburguesa Mobile -->
      <div class="flex items-center justify-start z-10">
        <!-- Hamburguesa Mobile (Lucide Icon + Headless UI Drawer Trigger) -->
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-bilbola-sm text-bilbola-text-primary hover:bg-bilbola-mint-light/30 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus transition-colors"
          @click="openMobileMenu"
        >
          <Menu class="h-6 w-6 stroke-[2.2]" />
        </button>

        <!-- Navegación Desktop -->
        <nav class="hidden md:flex items-center space-x-7 text-bilbola-text-primary font-semibold text-sm tracking-wide">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="relative py-1 hover:text-bilbola-mint-depth transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-bilbola-action-focus hover:after:w-full after:transition-all after:duration-300"
          >
            {{ link.label }}
          </a>
        </nav>
      </div>

      <!-- CENTRO EXACTO: Logo Bílbola en el medio con posicionamiento absoluto -->
      <div class="absolute inset-x-0 mx-auto flex items-center justify-center pointer-events-none z-0">
        <a href="/" class="pointer-events-auto inline-flex items-center justify-center hover:opacity-90 transition-transform hover:scale-102 px-4" title="Bílbola - Inicio">
          <img src="/logo-bilbola.png" alt="Logo Bílbola" class="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-h-[48px] object-contain transition-all" />
        </a>
      </div>

      <!-- DERECHA: Botón y Badge de Carrito de Compras -->
      <div class="flex items-center justify-end z-10">
        <button
          type="button"
          aria-label="Ver carrito de compras"
          class="relative inline-flex items-center justify-center p-2 rounded-full text-bilbola-text-primary hover:text-bilbola-action-focus hover:bg-bilbola-mint-light/40 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus transition-all group"
          @click="openCart"
        >
          <ShoppingBag class="h-6 w-6 stroke-[2] group-hover:scale-110 transition-transform duration-200" />
          
          <!-- Badge de Cantidad Rebosante -->
          <span
            v-if="totalItems > 0"
            class="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-bilbola-action-focus px-1.5 text-[11px] font-black text-white shadow-md transition-transform duration-300 group-hover:scale-110"
          >
            {{ totalItems }}
          </span>
        </button>
      </div>

    </div>

    <!-- DRAwer IZQUIERDO: Menú Móvil (Headless UI a través de BaseDrawer) -->
    <BaseDrawer v-model="isMobileMenuOpen" side="left" width-class="w-[90vw] max-w-[340px]" title="Navegación">
      <nav class="flex flex-col space-y-2 pt-2">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="flex items-center gap-3 px-4 py-3.5 rounded-bilbola-sm text-bilbola-text-primary font-bold text-base hover:bg-bilbola-mint-light/30 hover:text-bilbola-action-focus transition-all group"
          @click="closeMobileMenu"
        >
          <component :is="link.icon" class="h-5 w-5 text-bilbola-text-secondary group-hover:text-bilbola-action-focus transition-colors" />
          <span>{{ link.label }}</span>
        </a>
      </nav>
      
      <template #footer>
        <div class="flex flex-col gap-3.5 text-center">
          <div class="p-3 bg-bilbola-surface-neutral rounded-bilbola-sm text-left text-xs text-bilbola-text-secondary shadow-2xs">
            <p class="font-bold text-bilbola-text-primary flex items-center gap-1.5 text-xs">
              <Sparkles class="h-4 w-4 text-bilbola-action-focus" />
              Diseño Mágico &amp; Sustentable
            </p>
            <p class="mt-1 leading-relaxed text-[11px]">Decoración y mobiliario artesanal para dormitorios llenos de magia.</p>
          </div>
          <p class="text-[11px] font-medium text-bilbola-text-secondary/70">
            &copy; {{ new Date().getFullYear() }} Bílbola Deco Kids
          </p>
        </div>
      </template>
    </BaseDrawer>

    <!-- DRAwer DERECHO: Carrito de Compras -->
    <BaseDrawer v-model="isCartOpen" side="right" :title="`Tu Carrito (${totalItems})`">
      <!-- Estado de Carrito Vacío -->
      <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-80 text-center px-4">
        <div class="w-16 h-16 rounded-full bg-bilbola-mint-light/40 flex items-center justify-center text-bilbola-action-focus mb-4 shadow-inner">
          <ShoppingBag class="h-8 w-8 stroke-[1.5]" />
        </div>
        <h3 class="text-base font-black text-bilbola-text-primary font-bilbola">Tu carrito está vacío</h3>
        <p class="text-xs text-bilbola-text-secondary mt-1.5 max-w-[220px] leading-relaxed">
          Descubre nuestra colección de camas y decoración para llenar este espacio de magia.
        </p>
        <a
          href="/productos"
          class="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-bilbola-sm bg-bilbola-action-primary text-white font-bold text-xs tracking-wide shadow-md hover:opacity-95 transition-opacity"
          @click="isCartOpen = false"
        >
          Explorar Productos
        </a>
      </div>

      <!-- Lista de Ítems -->
      <div v-else class="divide-y divide-bilbola-gray-light/20 -mx-2 px-2">
        <div class="flex justify-between items-center py-2 text-xs text-bilbola-text-secondary border-b border-bilbola-gray-light/30 mb-2 font-semibold">
          <span>Artículos seleccionados</span>
          <button
            type="button"
            class="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-semibold transition-colors py-1 px-2 rounded-sm hover:bg-red-50"
            @click="clearCart"
          >
            <Trash2 class="h-3.5 w-3.5" />
            Vaciar todo
          </button>
        </div>

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

      <!-- Footer con Subtotal y CTA de Pago -->
      <template v-if="items.length > 0" #footer>
        <div class="space-y-4 pt-1">
          <!-- Subtotal -->
          <div class="flex items-center justify-between border-b border-bilbola-gray-light/30 pb-3">
            <span class="text-sm font-extrabold text-bilbola-text-primary font-bilbola">Subtotal</span>
            <PriceDisplay :amount="totalPrice" size="lg" />
          </div>

          <p class="text-[11px] text-bilbola-text-secondary text-center font-medium">
            🔒 Envío y descuentos se calculan al finalizar la compra.
          </p>

          <!-- Botón CTA Checkout -->
          <button
            type="button"
            class="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-bilbola-sm bg-bilbola-action-primary text-white font-black text-sm tracking-wide shadow-lg hover:bg-bilbola-mint-depth transition-all duration-200 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:ring-offset-2 group"
            @click="isCartOpen = false"
          >
            <span>Proceder con el Pago</span>
            <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1.5 duration-200" />
          </button>
          
          <div class="text-center pt-0.5">
            <button
              type="button"
              class="text-xs font-bold text-bilbola-action-focus hover:underline"
              @click="isCartOpen = false"
            >
              Seguir explorando
            </button>
          </div>
        </div>
      </template>
    </BaseDrawer>

  </header>
</template>
