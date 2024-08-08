<script setup lang="ts">

import {httpData} from "~/lib/ws/socket";
</script>

<template>
  <div>
    <h1>Projects</h1>
  </div>

  <ClientOnly>
    <div v-if="httpData.projects != null">
      <pre>{{ JSON.stringify(httpData.projects, null, 2) }}</pre>
    </div>
  </ClientOnly>
</template>
