<script setup lang="ts">
import { ref, computed } from 'vue';
import { Dialog, DialogPanel, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, TransitionRoot, TransitionChild } from '@headlessui/vue';
import PriceDisplay from '@/components/ecommerce/PriceDisplay.vue';

export interface SearchResultItem {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  imageUrl: string;
  url?: string;
}

export interface Props {
  modelValue: boolean;
  products?: SearchResultItem[];
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  placeholder: 'Buscar lámparas, cojines, repisas decokids...',
  products: () => []
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
  (e: 'select', item: SearchResultItem): void;
}>();

const query = ref('');

const filteredProducts = computed(() => {
  if (!query.value) return props.products.slice(0, 5); // Show suggestions by default
  const q = query.value.toLowerCase();
  return props.products.filter(p => 
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );
});

function close() {
  emit('update:modelValue', false);
  query.value = '';
}

function onSelect(item: SearchResultItem) {
  if (!item) return;
  emit('select', item);
  close();
  if (item.url) {
    window.location.href = item.url;
  }
}
</script>

<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" class="relative z-50 font-bilbola" @close="close">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto p-4 pt-20">
        <div class="flex items-start justify-center text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95 -translate-y-4"
            enter-to="opacity-100 scale-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100 translate-y-0"
            leave-to="opacity-0 scale-95 -translate-y-4"
          >
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-bilbola-lg bg-white shadow-2xl transition-all border border-bilbola-gray-light/40 text-left">
              <Combobox @update:model-value="onSelect" nullable>
                <div class="relative flex items-center border-b border-bilbola-gray-light/30 px-4">
                  <svg class="h-5 w-5 text-bilbola-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <ComboboxInput
                    class="w-full bg-transparent p-4 text-base font-bold text-bilbola-text-primary placeholder:text-bilbola-text-secondary/60 focus:outline-none"
                    :placeholder="placeholder"
                    @change="query = $event.target.value"
                  />
                  <button type="button" @click="close" class="rounded-full p-1 text-bilbola-text-secondary hover:bg-bilbola-mint-light/30 hover:text-bilbola-text-primary transition-colors">
                    <span class="sr-only">Cerrar</span>
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <ComboboxOptions v-if="filteredProducts.length > 0" static class="max-h-96 overflow-y-auto p-2 divide-y divide-bilbola-gray-light/20">
                  <ComboboxOption
                    v-for="item in filteredProducts"
                    :key="item.id"
                    :value="item"
                    v-slot="{ active }"
                    as="template"
                  >
                    <li :class="['flex items-center gap-4 p-3 rounded-bilbola-sm cursor-pointer transition-colors', active ? 'bg-bilbola-mint-light/30 text-bilbola-action-focus' : 'text-bilbola-text-primary']">
                      <img :src="item.imageUrl" :alt="item.name" class="h-12 w-12 rounded-sm object-contain bg-bilbola-surface-neutral p-1 border border-bilbola-gray-light/30 shrink-0" />
                      <div class="flex-grow">
                        <p class="text-sm font-bold leading-tight">{{ item.name }}</p>
                        <span class="text-xs text-bilbola-text-secondary uppercase tracking-wider">{{ item.category }}</span>
                      </div>
                      <PriceDisplay :amount="item.price" :original-amount="item.originalPrice" size="sm" />
                    </li>
                  </ComboboxOption>
                </ComboboxOptions>
                <div v-else class="p-8 text-center text-sm text-bilbola-text-secondary font-bilbola">
                  No se encontraron productos decokids coincidentes con "<strong>{{ query }}</strong>".
                </div>

                <!-- Quick footer tags -->
                <div class="border-t border-bilbola-gray-light/30 bg-bilbola-mint-light/10 p-3 px-4 flex flex-wrap gap-2 items-center text-xs text-bilbola-text-secondary">
                  <span class="font-bold">Tendencias:</span>
                  <button type="button" @click="query = 'Lámpara'" class="bg-white px-2 py-1 rounded-sm border border-bilbola-gray-light/50 hover:bg-bilbola-mint-light transition-colors">✨ Lámparas Nube</button>
                  <button type="button" @click="query = 'Cojín'" class="bg-white px-2 py-1 rounded-sm border border-bilbola-gray-light/50 hover:bg-bilbola-mint-light transition-colors">🌙 Cojines Estelares</button>
                  <button type="button" @click="query = 'Repisa'" class="bg-white px-2 py-1 rounded-sm border border-bilbola-gray-light/50 hover:bg-bilbola-mint-light transition-colors">🪵 Repisas Madera</button>
                </div>
              </Combobox>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
