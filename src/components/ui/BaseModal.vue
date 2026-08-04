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
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  maxWidth: 'md'
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
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="close" class="relative z-50 font-bilbola">
      <!-- Backdrop -->
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity" />
      </TransitionChild>

      <!-- Modal Content -->
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full transform overflow-hidden rounded-bilbola-lg bg-white p-6 text-left align-middle shadow-2xl transition-all border border-bilbola-gray-light/30"
              :class="{
                'max-w-sm': maxWidth === 'sm',
                'max-w-md': maxWidth === 'md',
                'max-w-lg': maxWidth === 'lg',
                'max-w-xl': maxWidth === 'xl',
                'max-w-2xl': maxWidth === '2xl'
              }"
            >
              <div class="flex items-center justify-between border-b border-bilbola-gray-light/20 pb-3 mb-4">
                <DialogTitle
                  v-if="title"
                  as="h3"
                  class="text-xl font-bold text-bilbola-text-primary font-bilbola"
                >
                  {{ title }}
                </DialogTitle>
                <button
                  type="button"
                  class="rounded-full p-1 text-bilbola-text-secondary hover:bg-bilbola-mint-light/30 hover:text-bilbola-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus ml-auto"
                  @click="close"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Body Slot -->
              <div class="my-2 text-bilbola-text-primary">
                <slot />
              </div>

              <!-- Footer Slot if required -->
              <div v-if="$slots.footer" class="mt-6 border-t border-bilbola-gray-light/20 pt-4 flex justify-end gap-3">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
