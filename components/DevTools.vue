<script setup lang="ts">
const {$socket} = useNuxtApp();
</script>

<template>
  <Button
    @click="
      () => {
        $socket.emit('error', 'this is an error message');
      }
    "
  >Send an error</Button>
</template>

<style scoped></style>
