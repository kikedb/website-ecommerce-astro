<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue';

export interface Props {
  modelValue: boolean;
  title?: string;
  side?: 'right' | 'left';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  side: 'right'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

function close() {
  emit('update:modelValue', false);
  emit('close');
}
</script>

<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog as="div" class="relative z-50 font-bilbola" @close="close">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 flex max-w-full pl-10"
            :class="side === 'right' ? 'right-0' : 'left-0 pl-0 pr-10'"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              :enter-from="side === 'right' ? 'translate-x-full' : '-translate-x-full'"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              :leave-to="side === 'right' ? 'translate-x-full' : '-translate-x-full'"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-white shadow-2xl">
                  <!-- Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-bilbola-gray-light/30 bg-bilbola-mint-light/20">
                    <DialogTitle as="h2" class="text-xl font-black text-bilbola-text-primary font-bilbola tracking-wide">
                      {{ title }}
                    </DialogTitle>
                    <button
                      type="button"
                      class="rounded-full p-2 text-bilbola-text-secondary hover:text-bilbola-text-primary hover:bg-bilbola-mint-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus"
                      @click="close"
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Scrollable Content Body -->
                  <div class="relative flex-1 px-6 py-4 overflow-y-auto">
                    <slot />
                  </div>

                  <!-- Sticky Footer (For Cart Checkout CTA or Navigation anchors) -->
                  <div v-if="$slots.footer" class="border-t border-bilbola-gray-light/30 px-6 py-5 bg-white">
                    <slot name="footer" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
