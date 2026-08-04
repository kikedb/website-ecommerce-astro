<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import QuantitySelector from '@/components/ui/QuantitySelector.vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';

export interface Props {
  productName: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  inStock?: boolean;
  thresholdId?: string; // HTML ID of the primary CTA on page to observe
}

const props = withDefaults(defineProps<Props>(), {
  inStock: true
});

const emit = defineEmits<{
  (e: 'addToCart', quantity: number): void;
}>();

const quantity = ref(1);
const isVisible = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  if (typeof window !== 'undefined' && props.thresholdId) {
    const target = document.getElementById(props.thresholdId);
    if (target) {
      observer = new IntersectionObserver(([entry]) => {
        // Show sticky bar when the primary button scrolls out of view above or below
        isVisible.value = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      }, { threshold: 0.1 });
      observer.observe(target);
    } else {
      // If no threshold ID found in DOM, default to active after slight scroll
      window.addEventListener('scroll', handleScroll);
    }
  } else if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
  }
});

function handleScroll() {
  if (typeof window !== 'undefined') {
    isVisible.value = window.scrollY > 400;
  }
}

onUnmounted(() => {
  if (observer && props.thresholdId) {
    const target = document.getElementById(props.thresholdId);
    if (target) observer.unobserve(target);
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-bilbola-gray-light/50 shadow-2xl p-3 sm:px-6 font-bilbola transition-all"
    >
      <div class="container mx-auto flex items-center justify-between gap-4 max-w-5xl">
        <!-- Product Quick Ident -->
        <div class="flex items-center gap-3 min-w-0">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="productName"
            class="h-12 w-12 rounded-bilbola-sm object-contain bg-bilbola-surface-neutral p-1 border border-bilbola-gray-light/30 shrink-0 hidden sm:block"
          />
          <div class="min-w-0">
            <h4 class="font-bold text-sm sm:text-base text-bilbola-text-primary truncate" :title="productName">
              {{ productName }}
            </h4>
            <PriceDisplay :amount="price" :original-amount="originalPrice" size="sm" />
          </div>
        </div>

        <!-- Conversion Controls -->
        <div class="flex items-center gap-3 shrink-0">
          <div class="hidden md:block">
            <QuantitySelector v-model="quantity" size="sm" :disabled="!inStock" />
          </div>
          <BaseButton
            variant="primary"
            size="md"
            :disabled="!inStock"
            class="shadow-md font-black px-6"
            @click="emit('addToCart', quantity)"
          >
            {{ inStock ? 'Añadir al Carrito ✨' : 'Sin Stock Temporal' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </transition>
</template>
