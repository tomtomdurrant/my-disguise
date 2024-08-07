<script setup lang="ts">
import {httpData, oscData} from '~/lib/ws/socket';
console.log('active transport client component')
</script>

<template>
  <ClientOnly>
    <div v-if="httpData.active != null">
      <pre>{{ JSON.stringify(httpData.active, null, 2) }}</pre>
    </div>
  </ClientOnly>


</template>

<style scoped>

</style>