<script setup lang="ts">
import { httpData, oscData, socket } from "~/lib/ws/socket";
import { Badge } from "~/components/ui/badge";
import { Control } from "~/lib/disguise/control";
import { settings } from "~/lib/settings";
</script>

<template>
  <ClientOnly>
    <div v-if="httpData.active != null">
      <h3>Currently active transport</h3>
      <p>{{ httpData.active.result[0].name }}</p>
      <p v-if="settings.statsForNerds">{{ httpData.active.result[0].uid}}</p>
      <template v-if="httpData.active.result[0].engaged">
        <Badge class="bg-green-500"> Engaged</Badge>
        <Button variant="destructive" @click="Control.disengage()"> Disengage</Button>
      </template>
      <template v-else>
        <Badge class="bg-red-500"> Disengaged</Badge>
        <Button variant="default" @click="Control.engage()"> Engage</Button>
      </template>
    </div>
  </ClientOnly>
</template>

<style scoped></style>
