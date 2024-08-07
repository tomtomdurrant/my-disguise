<script setup lang="ts">

import {oscData} from "~/lib/ws/socket";
</script>

<template>

  <ClientOnly>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="(value, key) in oscData" key={key} class="bg-white p-4 rounded-md shadow">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ key }}</h3>
        <p class="text-xl text-gray-900">
          {{ value !== null ? value?.toString() : "N/A" }}
        </p>
      </div>
    </div>
  </ClientOnly>
</template>
