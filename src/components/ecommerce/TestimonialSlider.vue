<script setup lang="ts">
import { shallowRef } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProductReviewCard, { type Props as ReviewProps } from '@/components/ecommerce/ProductReviewCard.vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface TestimonialItem extends ReviewProps {
  id: number | string;
}

const modules = shallowRef([Navigation, Pagination, Autoplay]);

const testimonials = shallowRef<TestimonialItem[]>([
  {
    id: 1,
    author: 'Carolina Mendoza',
    date: 'Hace 2 días',
    rating: 5,
    verified: true,
    productVariant: 'Cama Montessori Roble Natura - Plaza y media',
    comment: '¡Quedamos fascinados! El acabado de la madera es súper suave y seguro para nuestra hija de 3 años. El armado fue facilísimo y el diseño transformó completamente la pieza. ¡100% recomendado!',
    photos: ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=300&q=80']
  },
  {
    id: 2,
    author: 'Sebastián Valdés',
    date: 'Hace 1 semana',
    rating: 5,
    verified: true,
    productVariant: 'Lámpara de Noche Nube Mágica (LED cálida)',
    comment: 'Compramos la lámpara nube y el móvil colgante para la llegada de nuestro bebé. La luz cálida es ideal para la lactancia de noche y el diseño es simplemente precioso. Se nota la dedicación.',
    photos: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=300&q=80']
  },
  {
    id: 3,
    author: 'Daniela Retamal',
    date: 'Hace 2 semanas',
    rating: 5,
    verified: true,
    productVariant: 'Estante Infantil Oso Polar - Blanco Mate',
    comment: 'Excelente calidad. Buscábamos repisas a la altura de los niños y estas cumplen perfecto con la filosofía Montessori. Además el envío a regiones llegó impecable y muy rápido.',
    photos: []
  },
  {
    id: 4,
    author: 'Jorge Contreras',
    date: 'Hace 3 semanas',
    rating: 5,
    verified: true,
    productVariant: 'Set Textil Algodón Orgánico - Safari Mágico',
    comment: 'El algodón es súper suave para la piel delicada de los niños y las ilustraciones del estampado son hermosas. Sobrevive a los lavados en lavadora sin pander al color ni encogerse.',
    photos: []
  }
]);

const breakpoints = shallowRef({
  320: {
    slidesPerView: 1,
    spaceBetween: 20
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 24
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 32
  }
});
</script>

<template>
  <section class="py-20 bg-gradient-to-b from-bilbola-surface-page via-bilbola-mint-light/20 to-bilbola-surface-page font-bilbola overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span class="px-3 py-1 bg-bilbola-mint-light text-bilbola-action-focus rounded-full text-xs font-bold tracking-widest uppercase inline-block shadow-2xs">
          Testimonios Reales ✨
        </span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-bilbola-text-primary tracking-tight font-serif">
          Lo que dicen familias felices
        </h2>
        <p class="text-bilbola-text-secondary text-base md:text-lg font-light">
          Historias de magia, comodidad y diseño en los dormitorios infantiles de todo el país.
        </p>
      </div>

      <div class="relative px-2 md:px-6">
        <Swiper
          :modules="modules"
          :loop="false"
          :autoplay="{ delay: 5000, disableOnInteraction: false }"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :navigation="true"
          :breakpoints="breakpoints"
          class="testimonial-swiper !pb-14 pt-2"
        >
          <SwiperSlide v-for="item in testimonials" :key="item.id" class="h-auto flex">
            <ProductReviewCard
              :author="item.author"
              :date="item.date"
              :rating="item.rating"
              :comment="item.comment"
              :verified="item.verified"
              :product-variant="item.productVariant"
              :photos="item.photos"
              class="w-full h-full hover:shadow-lg transition-all duration-300 border-bilbola-mint-light/80 bg-white/95 backdrop-blur-xs flex flex-col justify-between"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #1a4f4c;
  background: rgba(255, 255, 255, 0.95);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  top: 45%;
  border: 1px solid rgba(136, 196, 184, 0.5);
  transition: all 0.25s ease;
}
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #1a4f4c;
  color: #ffffff;
  transform: scale(1.08);
}
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 16px;
  font-weight: 900;
}
:deep(.swiper-button-prev) {
  left: -4px;
}
:deep(.swiper-button-next) {
  right: -4px;
}
:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: #88c4b8;
  opacity: 0.6;
}
:deep(.swiper-pagination-bullet-active) {
  background: #1a4f4c;
  opacity: 1;
  width: 28px;
  border-radius: 5px;
}
@media (max-width: 768px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}
</style>
