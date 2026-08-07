<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button'
});

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-bilbola-action-primary text-bilbola-text-inverse hover:opacity-90 shadow-sm border border-transparent';
    case 'secondary':
      return 'bg-bilbola-action-secondary text-bilbola-text-primary hover:brightness-95 shadow-sm border border-transparent font-medium';
    case 'outline':
      return 'bg-transparent border-2 border-bilbola-action-primary text-bilbola-action-primary hover:bg-bilbola-action-primary hover:text-bilbola-text-inverse';
    case 'ghost':
      return 'bg-transparent text-bilbola-text-primary hover:bg-bilbola-mint-light/30 border border-transparent';
    default:
      return '';
  }
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-xs font-semibold rounded-bilbola-sm';
    case 'lg':
      return 'px-8 py-4 text-base font-bold rounded-bilbola-md';
    case 'md':
    default:
      return 'px-5 py-2.5 text-sm font-semibold rounded-bilbola-sm';
  }
});

function onClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
}
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="disabled || loading ? undefined : href"
    :type="!href ? type : undefined"
    :disabled="!href ? (disabled || loading) : undefined"
    class="inline-flex items-center justify-center font-bilbola transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-bilbola-action-focus focus:ring-offset-2 select-none"
    :class="[
      variantClasses,
      sizeClasses,
      { 'opacity-50 cursor-not-allowed pointer-events-none': disabled || loading }
    ]"
    @click="onClick"
  >
    <svg
      v-if="loading"
      class="-ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </component>
</template>
