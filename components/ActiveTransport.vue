<script setup lang="ts">
import { httpData, oscData, socket } from "~/lib/ws/socket";
import { Badge } from "~/components/ui/badge";
import { settings } from "~/lib/settings";

function engageStatus(setEngage: boolean) {
  console.log(setEngage);
  if (settings.safeMode) {
    alert("safe mode is enabled");
  } else {
    socket.emit(
      "/session/transport/engage",
      setEngage ? "engage" : "disengage",
    );
  }
}
</script>

<template>
  <ClientOnly>
    <div v-if="httpData.active != null">
      <h3>Currently active transport</h3>
      <p>{{ httpData.active.result[0].name }}</p>
      <template v-if="httpData.active.result[0].engaged">
        <Badge class="bg-green-500"> Engaged </Badge>
        <Button variant="destructive" @click="engageStatus(false)">
          Disengage
        </Button>
      </template>
      <template v-else>
        <Badge class="bg-red-500"> Disengaged </Badge>
        <Button variant="default" @click="engageStatus(true)"> Engage </Button>
      </template>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
