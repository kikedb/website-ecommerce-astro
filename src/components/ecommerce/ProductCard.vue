<script setup lang="ts">
import { computed } from 'vue';
import BaseBadge, { type BadgeType } from '@/components/ui/BaseBadge.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

export interface ProductBadge {
  type: BadgeType;
  label: string;
}

export interface Props {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  productUrl?: string;
  badges?: ProductBadge[];
  inStock?: boolean;
  isCustomizable?: boolean;
  ctaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  inStock: true,
  isCustomizable: false,
  ctaLabel: 'Ver producto'
});

const emit = defineEmits<{
  (e: 'action', id: string | number): void;
}>();

const formattedPrice = computed(() => {
  return `$${props.price.toLocaleString('es-CL')}`;
});

const formattedOriginalPrice = computed(() => {
  if (!props.originalPrice || props.originalPrice <= props.price) return null;
  return `$${props.originalPrice.toLocaleString('es-CL')}`;
});

const displayBadges = computed(() => {
  const list: ProductBadge[] = [];
  if (!props.inStock) {
    list.push({ type: 'last-units', label: 'Sin Stock' });
  } else if (props.isCustomizable) {
    list.push({ type: 'customizable', label: 'Personalizable' });
  }
  if (props.badges) {
    list.push(...props.badges);
  }
  // Brand rule: Maximum 2 badges per card
  return list.slice(0, 2);
});

function onCtaClick(event: MouseEvent) {
  event.preventDefault();
  emit('action', props.id);
}
</script>

<template>
  <div class="group bg-white rounded-bilbola-md shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-bilbola-mint-light/60 flex flex-col font-bilbola">
    <!-- Image container with consistent aspect ratio -->
    <a :href="productUrl || `/productos/${id}`" class="aspect-square relative overflow-hidden bg-bilbola-surface-neutral p-6 flex items-center justify-center block">
      <!-- Badges overlay, positioned so they do not obstruct core visual elements -->
      <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
        <BaseBadge
          v-for="(badge, index) in displayBadges"
          :key="index"
          :type="badge.type"
          :label="badge.label"
        />
      </div>

      <!-- Out of stock dimmed overlay -->
      <div v-if="!inStock" class="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-20 flex items-center justify-center">
        <span class="bg-white/90 text-bilbola-text-primary px-4 py-2 rounded-bilbola-sm font-bold text-sm shadow-md">
          Agotada Temporalmente
        </span>
      </div>

      <img
        :src="imageUrl"
        :alt="name"
        class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
        :class="{ 'opacity-60 grayscale': !inStock }"
        loading="lazy"
      />
    </a>

    <!-- Content Area -->
    <div class="p-5 flex-grow flex flex-col justify-between gap-4">
      <div>
        <a :href="productUrl || `/productos/${id}`" class="hover:text-bilbola-mint-depth transition-colors block">
          <h3 class="font-bold text-lg text-bilbola-text-primary line-clamp-2 leading-snug" :title="name">
            {{ name }}
          </h3>
        </a>

        <!-- Price block -->
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-bilbola-text-primary font-black text-xl">
            {{ formattedPrice }}
          </span>
          <span
            v-if="formattedOriginalPrice"
            class="text-bilbola-text-secondary text-sm line-through font-normal"
          >
            {{ formattedOriginalPrice }}
          </span>
        </div>
      </div>

      <!-- Action Button / Affordance -->
      <BaseButton
        variant="secondary"
        size="md"
        class="w-full mt-2 font-bold"
        :disabled="!inStock"
        @click="onCtaClick"
      >
        {{ inStock ? ctaLabel : 'Sin Stock' }}
      </BaseButton>
    </div>
  </div>
</template>
