<script setup lang="ts">
import StarRatingDisplay from '@/components/ecommerce/StarRatingDisplay.vue';

export interface Props {
  author: string;
  date: string;
  rating: number;
  comment: string;
  verified?: boolean;
  productVariant?: string;
  photos?: string[];
}

withDefaults(defineProps<Props>(), {
  verified: true
});
</script>

<template>
  <div class="p-5 rounded-bilbola-md bg-white border border-bilbola-gray-light/30 shadow-xs space-y-3 font-bilbola">
    <!-- Header: Author & Verified Badge -->
    <div class="flex items-center justify-between flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <div class="h-9 w-9 rounded-full bg-bilbola-mint-light flex items-center justify-center font-black text-bilbola-action-focus uppercase text-sm">
          {{ author.charAt(0) }}
        </div>
        <div>
          <h4 class="font-bold text-sm text-bilbola-text-primary flex items-center gap-1.5">
            {{ author }}
            <span v-if="verified" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-bilbola-mint-light/50 text-bilbola-action-focus font-extrabold text-[10px] border border-bilbola-mint-depth/40" title="Compra Verificada en Bílbola">
              ✔ Compra Verificada
            </span>
          </h4>
          <span class="text-xs text-bilbola-text-secondary font-light">{{ date }}</span>
        </div>
      </div>

      <StarRatingDisplay :rating="rating" size="sm" :show-number="false" />
    </div>

    <!-- Optional Variant Info -->
    <p v-if="productVariant" class="text-xs text-bilbola-text-secondary font-semibold italic bg-bilbola-surface-neutral px-2.5 py-1 rounded-sm inline-block">
      Variante: {{ productVariant }}
    </p>

    <!-- Review Comment Body -->
    <p class="text-sm text-bilbola-text-primary leading-relaxed">
      "{{ comment }}"
    </p>

    <!-- Attached Customer Photos -->
    <div v-if="photos && photos.length > 0" class="flex items-center gap-2 pt-2 overflow-x-auto">
      <img
        v-for="(url, idx) in photos"
        :key="idx"
        :src="url"
        :alt="`Foto enviada por ${author}`"
        class="h-16 w-16 rounded-bilbola-sm object-cover border border-bilbola-gray-light/40 hover:scale-105 transition-transform cursor-pointer shadow-2xs"
      />
    </div>
  </div>
</template>
