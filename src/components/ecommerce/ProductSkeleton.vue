<script setup lang="ts">
export interface Props {
  count?: number;
}

withDefaults(defineProps<Props>(), {
  count: 1
});
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    <div
      v-for="n in count"
      :key="n"
      class="animate-pulse rounded-bilbola-md bg-white border border-bilbola-gray-light/30 overflow-hidden shadow-xs flex flex-col"
    >
      <!-- Image Skeleton -->
      <div class="aspect-square bg-bilbola-gray-light/30 w-full" />

      <!-- Content Skeleton -->
      <div class="p-5 flex flex-col justify-between gap-4 flex-grow">
        <div class="space-y-2">
          <div class="h-4 bg-bilbola-gray-light/40 rounded-sm w-3/4" />
          <div class="h-4 bg-bilbola-gray-light/40 rounded-sm w-1/2" />
        </div>

        <!-- Price skeleton -->
        <div class="h-6 bg-bilbola-mint-light/50 rounded-sm w-1/3 mt-2" />

        <!-- Button skeleton -->
        <div class="h-10 bg-bilbola-gray-light/30 rounded-bilbola-sm w-full mt-2" />
      </div>
    </div>
  </div>
</template>
