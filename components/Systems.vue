<script setup lang="ts">
import {httpData} from "~/lib/ws/socket";
</script>

<template>
  <div>
    <h1>Systems</h1>
  </div>

  <ClientOnly>
    <div v-if="httpData.systems != null">
      <pre>{{ JSON.stringify(httpData.systems, null, 2) }}</pre>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>