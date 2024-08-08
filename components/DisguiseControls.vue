<script setup lang="ts">
import { Control } from "~/lib/disguise/control";

const playHeadControls = [
  {
    name: "Play",
    function: Control.play,
  },
  {
    name: "PlaySection",
    function: Control.playSection,
  },
  {
    name: "Loop Section",
    function: Control.loopSection,
  },
  {
    name: "Stop",
    function: Control.stop,
  },
  {
    name: "Previous Section",
    function: Control.previousSection,
  },
  {
    name: "Next Section",
    function: Control.nextSection,
  },
  {
    name: "Return to start",
    function: Control.returnToStart,
  },
];
</script>

<template>
  <div>
    <h1>Disguise Controls</h1>
  </div>
  <div>
    <Button variant="secondary" v-for="control in playHeadControls" :key="control.name" @click="control.function">
      {{ control.name }}
    </Button>
  </div>
</template>

<style scoped></style>
