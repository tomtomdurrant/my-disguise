<script setup lang="ts">

import {httpData} from "~/lib/ws/socket";
</script>

<template>
  <div>
    <h1>Health</h1>
  </div>

  <ClientOnly>
    <div v-if="httpData.health != null">
      <pre>{{ JSON.stringify(httpData.health, null, 2) }}</pre>
    </div>
  </ClientOnly>
</template>
