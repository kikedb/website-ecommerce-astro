<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { toast } from 'vue-sonner';

export interface Props {
  productId: string | number;
  productName?: string;
  initialFavorited?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  initialFavorited: false,
  size: 'md'
});

const emit = defineEmits<{
  (e: 'toggle', isFav: boolean, id: string | number): void;
}>();

const isFav = ref(props.initialFavorited);
const isAnimate = ref(false);

onMounted(() => {
  if (typeof window !== 'undefined') {
    const list = getLocalWishlist();
    if (list.includes(String(props.productId))) {
      isFav.value = true;
    }
  }
});

function getLocalWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem('bilbola_wishlist') || '[]');
  } catch {
    return [];
  }
}

function toggleFav() {
  isFav.value = !isFav.value;
  isAnimate.value = true;
  setTimeout(() => { isAnimate.value = false; }, 300);

  if (typeof window !== 'undefined') {
    const list = getLocalWishlist();
    const strId = String(props.productId);
    if (isFav.value) {
      if (!list.includes(strId)) list.push(strId);
      toast.success(`♥ ¡"${props.productName || 'Producto'}" añadido a tus favoritos!`);
    } else {
      const idx = list.indexOf(strId);
      if (idx !== -1) list.splice(idx, 1);
      toast.info(`"${props.productName || 'Producto'}" eliminado de tu lista de deseos.`);
    }
    localStorage.setItem('bilbola_wishlist', JSON.stringify(list));
  }

  emit('toggle', isFav.value, props.productId);
}
</script>

<template>
  <button
    type="button"
    @click.stop.prevent="toggleFav"
    :aria-label="isFav ? 'Eliminar de favoritos' : 'Añadir a favoritos'"
    :class="[
      'rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus border border-bilbola-gray-light/30',
      isAnimate ? 'scale-125' : 'hover:scale-110 active:scale-95',
      size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'
    ]"
  >
    <svg
      :class="[
        'transition-colors duration-200',
        isFav ? 'text-[#D94F70] fill-current drop-shadow-2xs' : 'text-bilbola-text-secondary hover:text-[#D94F70]',
        size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
      ]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      :stroke-width="isFav ? 0 : 2"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  </button>
</template>
