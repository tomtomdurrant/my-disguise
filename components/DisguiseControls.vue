<script setup lang="ts">
import { Control } from "~/lib/disguise/control";
import { Play, RefreshCw, StopCircle, SkipBack, SkipForward, CirclePause, ChevronFirst  } from "lucide-vue-next";

const playHeadControls = [
  {
    name: "Play",
    function: Control.play,
    icon: Play,
  },
  {
    name: "PlaySection",
    function: Control.playSection,
    icon: CirclePause
  },
  {
    name: "Loop Section",
    function: Control.loopSection,
    icon: RefreshCw
  },
  {
    name: "Stop",
    function: Control.stop,
    icon: StopCircle
  },
  {
    name: "Previous Section",
    function: Control.previousSection,
    icon: SkipBack

  },
  {
    name: "Next Section",
    function: Control.nextSection,
    icon: SkipForward
  },
  {
    name: "Return to start",
    function: Control.returnToStart,
    icon: ChevronFirst
  },
];
</script>

<template>
  <Card class="col-span-2">
    <CardHeader>
      <CardTitle>Disguise Controls</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 gap-4">
        <Button variant="outline" v-for="control in playHeadControls" :key="control.name" @click="control.function" class="flex justify-between ">
          {{ control.name }}
          <component :is="control.icon" class="size-5 ml-2" />
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
