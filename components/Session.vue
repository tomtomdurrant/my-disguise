<script setup lang="ts">

import {httpData} from "~/lib/ws/socket";
</script>

<template>
  <div>
    <h1>session</h1>
  </div>

  <ClientOnly>
    <div v-if="httpData.session != null">
      <pre>{{ JSON.stringify(httpData.session, null, 2) }}</pre>
    </div>
  </ClientOnly>
</template>
