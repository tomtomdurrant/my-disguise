<script setup lang="ts">
import { Toaster } from "~/components/ui/toast";
import { onMounted } from "vue";
import { socket } from "~/lib/ws/socket";
import { addError } from "~/lib/errorStore";

onMounted(() => {
  // loadErrorsFromLocalStorage();

  socket.on("error", (errorMessage: string) => {
    // addError(errorMessage);
  });

  window.addEventListener("error", (event) => {
    // addError(`Unhandled exception: ${event.message}`);
    addError(event.message);
  });
});
</script>
<template>
  <div>
    <NuxtLayout>
      <Toaster />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>