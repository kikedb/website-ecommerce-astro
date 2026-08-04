<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export interface Props {
  modelValue?: any;
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccione una opción',
  disabled: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void;
}>();

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || null;
});

function onUpdate(val: any) {
  emit('update:modelValue', val);
}
</script>

<template>
  <div class="flex flex-col gap-1 w-full font-bilbola">
    <label
      v-if="label"
      class="text-sm font-semibold text-bilbola-text-primary"
    >
      {{ label }}
    </label>

    <Listbox
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="onUpdate"
    >
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default rounded-bilbola-sm border bg-bilbola-surface-page py-2.5 pl-3.5 pr-10 text-left text-sm shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus disabled:cursor-not-allowed disabled:opacity-50"
          :class="[
            error ? 'border-red-500 text-red-900' : 'border-bilbola-gray-light hover:border-bilbola-gray-depth text-bilbola-text-primary'
          ]"
        >
          <span class="block truncate" :class="{ 'text-bilbola-text-secondary/50': !selectedOption }">
            {{ selectedOption ? selectedOption.label : placeholder }}
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-bilbola-text-secondary">
            <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
            </svg>
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-bilbola-md bg-white py-1 text-sm shadow-lg border border-bilbola-gray-light ring-1 ring-black/5 focus:outline-none"
          >
            <ListboxOption
              v-for="option in options"
              :key="option.label"
              v-slot="{ active, selected, disabled }"
              :value="option.value"
              :disabled="option.disabled"
              as="template"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4 transition-colors"
                :class="[
                  active ? 'bg-bilbola-mint-light/40 text-bilbola-text-primary font-medium' : 'text-bilbola-text-primary',
                  disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                ]"
              >
                <span class="block truncate" :class="{ 'font-bold text-bilbola-action-focus': selected, 'font-normal': !selected }">
                  {{ option.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-bilbola-action-focus"
                >
                  <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                  </svg>
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

    <p v-if="error" class="text-xs font-semibold text-red-600 mt-0.5">{{ error }}</p>
  </div>
</template>
