<script setup lang="ts">
export interface Step {
  id: number;
  label: string;
  shortLabel?: string;
}

export interface Props {
  currentStep: number; // 1 to 4
  steps?: Step[];
}

withDefaults(defineProps<Props>(), {
  currentStep: 2,
  steps: () => [
    { id: 1, label: '1. Carrito de Compras', shortLabel: 'Carrito' },
    { id: 2, label: '2. Datos y Despacho', shortLabel: 'Despacho' },
    { id: 3, label: '3. Pago Seguro (Flow)', shortLabel: 'Pago Flow' },
    { id: 4, label: '4. Confirmación', shortLabel: 'Confirmación' }
  ]
});
</script>

<template>
  <nav aria-label="Progreso de la compra" class="w-full font-bilbola my-6">
    <ol class="flex items-center justify-between w-full relative max-w-3xl mx-auto">
      <!-- Connecting background bar -->
      <div class="absolute top-4 inset-x-0 h-1 bg-bilbola-gray-light/40 -z-10 mx-8" />
      <div
        class="absolute top-4 left-8 h-1 bg-bilbola-action-focus -z-10 transition-all duration-500"
        :style="{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }"
      />

      <li
        v-for="step in steps"
        :key="step.id"
        class="flex flex-col items-center text-center px-1"
      >
        <!-- Circle Indicator -->
        <div
          :class="[
            'flex h-9 w-9 items-center justify-center rounded-full text-sm font-black transition-all shadow-sm border-2',
            step.id < currentStep
              ? 'bg-bilbola-action-focus text-white border-bilbola-mint-depth scale-105'
              : step.id === currentStep
              ? 'bg-white text-bilbola-action-focus border-bilbola-action-focus ring-4 ring-bilbola-mint-light/50 scale-110'
              : 'bg-white text-bilbola-text-secondary border-bilbola-gray-light/60'
          ]"
        >
          <span v-if="step.id < currentStep">✔</span>
          <span v-else>{{ step.id }}</span>
        </div>

        <!-- Label -->
        <span
          :class="[
            'mt-2 text-xs sm:text-sm transition-colors',
            step.id === currentStep ? 'font-black text-bilbola-text-primary underline decoration-2 decoration-bilbola-mint-depth underline-offset-4' : 'font-bold text-bilbola-text-secondary/70'
          ]"
        >
          <span class="hidden sm:inline">{{ step.label }}</span>
          <span class="sm:hidden">{{ step.shortLabel || step.label }}</span>
        </span>
      </li>
    </ol>
  </nav>
</template>
