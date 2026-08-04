<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface Props {
  items: BreadcrumbItem[];
  homeLabel?: string;
  homeHref?: string;
}

const props = withDefaults(defineProps<Props>(), {
  homeLabel: 'Inicio',
  homeHref: '/'
});

const jsonLd = computed(() => {
  const allItems = [
    { name: props.homeLabel, item: props.homeHref },
    ...props.items.map(i => ({ name: i.label, item: i.href || '' }))
  ];

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((el, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": el.name,
      ...(el.item ? { "item": typeof window !== 'undefined' ? new URL(el.item, window.location.origin).href : el.item } : {})
    }))
  });
});

let scriptElement: HTMLScriptElement | null = null;

onMounted(() => {
  if (typeof document !== 'undefined') {
    scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'application/ld+json');
    scriptElement.textContent = jsonLd.value;
    document.head.appendChild(scriptElement);
  }
});

watch(jsonLd, (newVal) => {
  if (scriptElement) {
    scriptElement.textContent = newVal;
  }
});

onUnmounted(() => {
  if (scriptElement && scriptElement.parentNode) {
    scriptElement.parentNode.removeChild(scriptElement);
  }
});
</script>

<template>
  <nav aria-label="Navegación de ruta (Breadcrumbs)" class="font-bilbola text-xs sm:text-sm my-3">
    <ol class="flex flex-wrap items-center gap-1.5 text-bilbola-text-secondary">
      <li>
        <a :href="homeHref" class="font-semibold hover:text-bilbola-mint-depth transition-colors flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          {{ homeLabel }}
        </a>
      </li>
      <li v-for="(item, index) in items" :key="index" class="flex items-center gap-1.5">
        <span class="text-bilbola-text-secondary/40 select-none font-bold">/</span>
        <a
          v-if="item.href && !item.current"
          :href="item.href"
          class="hover:text-bilbola-mint-depth transition-colors"
        >
          {{ item.label }}
        </a>
        <span
          v-else
          class="font-extrabold text-bilbola-text-primary"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
