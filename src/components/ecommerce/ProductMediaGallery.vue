<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from '@/components/ui/BaseModal.vue';

export interface MediaItem {
  id: string | number;
  url: string;
  alt?: string;
  type?: 'image' | 'video';
}

export interface Props {
  media: MediaItem[];
  productName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  productName: 'Producto Bílbola',
  media: () => [
    { id: '1', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', alt: 'Vista frontal' },
    { id: '2', url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop', alt: 'Detalle textura' }
  ]
});

const activeIndex = ref(0);
const isZoomOpen = ref(false);
const isHovering = ref(false);

function selectMedia(idx: number) {
  activeIndex.value = idx;
}
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4 font-bilbola">
    <!-- Thumbnails Strip -->
    <div class="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[500px] p-1 shrink-0">
      <button
        v-for="(item, index) in media"
        :key="item.id"
        type="button"
        @click="selectMedia(index)"
        :class="[
          'relative h-20 w-20 shrink-0 rounded-bilbola-sm overflow-hidden border-2 transition-all bg-bilbola-surface-neutral p-1.5 flex items-center justify-center',
          activeIndex === index ? 'border-bilbola-action-focus ring-2 ring-bilbola-mint-depth/50 scale-105 shadow-md' : 'border-bilbola-gray-light/50 opacity-70 hover:opacity-100'
        ]"
      >
        <img :src="item.url" :alt="item.alt || `${productName} miniatura ${index + 1}`" class="w-full h-full object-contain" />
        <!-- Video badge icon if applicable -->
        <span v-if="item.type === 'video'" class="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>

    <!-- Main View Display -->
    <div
      class="relative flex-grow aspect-square bg-bilbola-surface-neutral rounded-bilbola-lg border border-bilbola-mint-light/60 overflow-hidden shadow-sm flex items-center justify-center group cursor-zoom-in p-8"
      @click="isZoomOpen = true"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
    >
      <img
        v-if="media[activeIndex]?.type !== 'video'"
        :src="media[activeIndex]?.url"
        :alt="media[activeIndex]?.alt || productName"
        class="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <video
        v-else
        :src="media[activeIndex]?.url"
        controls
        class="w-full h-full object-contain"
      />

      <!-- Zoom instruction pill -->
      <span class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-bold text-bilbola-text-primary shadow-md flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
        <svg class="h-4 w-4 text-bilbola-action-focus" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
        Ampliar vista
      </span>
    </div>

    <!-- Fullscreen Zoom Modal -->
    <BaseModal v-model="isZoomOpen" :title="`Vista ampliada - ${productName}`" max-width="2xl">
      <div class="aspect-square bg-bilbola-surface-neutral p-4 flex items-center justify-center rounded-bilbola-md overflow-hidden">
        <img
          :src="media[activeIndex]?.url"
          :alt="media[activeIndex]?.alt || productName"
          class="max-w-full max-h-[75vh] object-contain mx-auto"
        />
      </div>
    </BaseModal>
  </div>
</template>
