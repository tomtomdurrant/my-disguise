<script setup lang="ts">
import { socket } from "~/lib/ws/socket";
</script>

<template>
  <Button
    @click="
      () => {
        socket.emit('error', 'this is an error message');
      }
    "
  >Send an error</Button>
</template>

<style scoped></style>
