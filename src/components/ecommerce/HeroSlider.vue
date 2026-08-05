<script setup lang="ts">
import { shallowRef, type Component } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Sparkles, Moon, Palette, ArrowRight } from 'lucide-vue-next';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseBadge from '@/components/ui/BaseBadge.vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export interface HeroSlide {
  id: number;
  tagline: string;
  icon: Component;
  titleLight: string;
  titleBold: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  imageUrl: string;
  badgeText?: string;
}

const modules = shallowRef([Navigation, Pagination, Autoplay, EffectFade]);
const autoplayConfig = shallowRef({ delay: 6000, disableOnInteraction: false });
const paginationConfig = shallowRef({ clickable: true, dynamicBullets: true });
const fadeEffectConfig = shallowRef({ crossFade: true });

const slides = shallowRef<HeroSlide[]>([
  {
    id: 1,
    tagline: 'Nueva Colección 2026',
    icon: Sparkles,
    titleLight: 'Descubre un mundo de',
    titleBold: 'magia y alegría',
    description: 'En cada rincón, encontrarás una conexión profunda con el niño interior, donde los sueños se hacen realidad con nuestro diseño artesanal y sustentable.',
    ctaLabel: 'Ver Catálogo Completo',
    ctaLink: '/productos',
    badgeText: 'Hecho a mano con amor',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 2,
    tagline: 'Dormitorios Soñados',
    icon: Moon,
    titleLight: 'Espacios mágicos para',
    titleBold: 'soñar y crecer',
    description: 'Camas estilo Montessori, textiles de algodón orgánico y muebles pensados para fomentar la imaginación y la autonomía con dulzura.',
    ctaLabel: 'Explorar Novedades',
    ctaLink: '/productos',
    badgeText: 'Diseño Seguro & Eco',
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: 3,
    tagline: 'Creaciones Únicas',
    icon: Palette,
    titleLight: 'Decoración infantil con',
    titleBold: 'sello personalizado',
    description: 'Diseñamos repisas mágicas, iluminación de ensueño y accesorios personalizados adaptados a la armonía de cada habitación infantil.',
    ctaLabel: 'Descubrir Colección',
    ctaLink: '/productos',
    badgeText: 'Calidad Premium',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80'
  }
]);
</script>

<template>
  <section class="relative font-bilbola w-full overflow-hidden bg-bilbola-surface-page border-b border-bilbola-mint-light/60">
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :loop="true"
      :effect="'fade'"
      :fade-effect="fadeEffectConfig"
      :speed="1000"
      :autoplay="autoplayConfig"
      :pagination="paginationConfig"
      :navigation="true"
      class="hero-swiper min-h-[620px] md:min-h-[700px]"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="String(slide.id)" :data-index="index" class="relative w-full h-full flex items-center">
        <!-- Fondo e Imagen con Overlay Estético -->
        <div class="absolute inset-0 z-0 overflow-hidden">
          <img
            :src="slide.imageUrl"
            :alt="slide.titleBold"
            class="w-full h-full object-cover object-center transform scale-105 duration-10000 transition-all filter brightness-[0.85]"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:w-3/4"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-bilbola-surface-page via-transparent to-transparent opacity-60"></div>
        </div>

        <!-- Contenido -->
        <div class="container mx-auto px-6 md:px-12 py-20 relative z-10 flex flex-col justify-center min-h-[620px] md:min-h-[700px] max-w-7xl">
          <div class="max-w-2xl space-y-6">
            <div class="flex items-center gap-3 flex-wrap">
              <span class="inline-flex items-center gap-1.5 px-3.5 py-1 bg-bilbola-mint-light text-bilbola-action-focus rounded-full text-sm font-bold tracking-wide shadow-2xs border border-bilbola-mint-depth/20 animate-pulse">
                <component :is="slide.icon" class="w-4 h-4 text-bilbola-action-focus shrink-0" />
                {{ slide.tagline }}
              </span>
              <BaseBadge v-if="slide.badgeText" type="customizable" :label="slide.badgeText" />
            </div>

            <h1 class="text-4xl sm:text-6xl md:text-7xl font-black text-bilbola-text-primary tracking-tight leading-none">
              <span class="block font-light text-3xl sm:text-4xl md:text-5xl text-bilbola-text-primary/90 mb-1 font-serif">
                {{ slide.titleLight }}
              </span>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-bilbola-mint-depth to-bilbola-action-primary">
                {{ slide.titleBold }}
              </span>
            </h1>

            <p class="text-lg md:text-xl text-bilbola-text-primary/80 font-normal max-w-xl leading-relaxed">
              {{ slide.description }}
            </p>

            <div class="pt-4 flex items-center gap-4 flex-wrap">
              <BaseButton :href="slide.ctaLink" variant="primary" size="lg" class="shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-base px-8 py-4 flex items-center">
                <span>{{ slide.ctaLabel }}</span>
                <ArrowRight class="w-5 h-5 ml-2.5 shrink-0 inline-block" />
              </BaseButton>
              <BaseButton href="/nosotros" variant="ghost" size="md" class="font-bold text-bilbola-action-primary hover:bg-white/60 backdrop-blur-xs">
                Conócenos
              </BaseButton>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
/* Personalización de flechas y paginación al estilo Bílbola */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  --swiper-navigation-size: 20px !important;
  color: #1a4f4c;
  background: rgba(255, 255, 255, 0.9);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(136, 196, 184, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: #2b706c;
  color: #ffffff;
  transform: scale(1.08);
}
:deep(.swiper-button-next svg),
:deep(.swiper-button-prev svg) {
  width: 20px !important;
  height: 20px !important;
  stroke-width: 2.5px;
}
:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  font-size: 20px !important;
  font-weight: 800;
  line-height: 1;
}
:deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  background: #88c4b8;
  opacity: 0.6;
  transition: all 0.3s ease;
}
:deep(.swiper-pagination-bullet-active) {
  background: #1a4f4c;
  opacity: 1;
  width: 32px;
  border-radius: 6px;
}
@media (max-width: 640px) {
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    display: none;
  }
}
</style>
