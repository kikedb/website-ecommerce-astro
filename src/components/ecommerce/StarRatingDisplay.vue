<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  rating: number; // 0 to 5
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rating: 5,
  size: 'md',
  showNumber: true
});

const roundedRating = computed(() => Math.min(5, Math.max(0, Number(props.rating.toFixed(1)))));

const stars = computed(() => {
  const list: ('full' | 'half' | 'empty')[] = [];
  const val = roundedRating.value;
  for (let i = 1; i <= 5; i++) {
    if (val >= i) {
      list.push('full');
    } else if (val >= i - 0.5) {
      list.push('half');
    } else {
      list.push('empty');
    }
  }
  return list;
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'h-3.5 w-3.5 text-xs';
    case 'lg': return 'h-6 w-6 text-base';
    case 'md':
    default:
      return 'h-4 w-4 text-sm';
  }
});
</script>

<template>
  <div class="inline-flex items-center gap-1.5 font-bilbola" :title="`Calificación: ${roundedRating} de 5 estrellas`">
    <div class="flex items-center text-amber-500 gap-0.5">
      <template v-for="(star, index) in stars" :key="index">
        <!-- Full Star -->
        <svg v-if="star === 'full'" :class="sizeClass.split(' ').slice(0,2).join(' ')" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <!-- Half Star -->
        <svg v-else-if="star === 'half'" :class="sizeClass.split(' ').slice(0,2).join(' ')" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient :id="`half-star-${index}`">
              <stop offset="50%" stop-color="currentColor" />
              <stop offset="50%" stop-color="#E5E7EB" />
            </linearGradient>
          </defs>
          <path :fill="`url(#half-star-${index})`" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <!-- Empty Star -->
        <svg v-else :class="sizeClass.split(' ').slice(0,2).join(' ')" class="text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </template>
    </div>

    <!-- Number and Count -->
    <span v-if="showNumber" class="font-black text-bilbola-text-primary" :class="sizeClass.split(' ').pop()">
      {{ roundedRating }}
    </span>
    <span v-if="reviewCount !== undefined" class="text-bilbola-text-secondary font-normal" :class="sizeClass.split(' ').pop()">
      ({{ reviewCount }})
    </span>
  </div>
</template>
