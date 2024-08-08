<script setup lang="ts">
import { httpData } from "~/lib/ws/socket";
</script>

<template>
  <ClientOnly>
    <div v-if="httpData.tracks != null">
      <pre>{{ JSON.stringify(httpData.tracks, null, 2) }}</pre>
    </div>
  </ClientOnly>
</template>
