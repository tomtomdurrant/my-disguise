<script setup lang="ts">
import { Control } from "~/lib/disguise/control";
import {
  Play,
  RefreshCw,
  StopCircle,
  SkipBack,
  SkipForward,
  CirclePause,
  ChevronFirst,
  ListVideo,
} from "lucide-vue-next";

const playHeadControls = [
  {
    name: "Play",
    function: Control.play,
    icon: Play,
  },
  {
    name: "Play Section",
    function: Control.playSection,
    icon: ListVideo,
  },
  {
    name: "Loop Section",
    function: Control.loopSection,
    icon: RefreshCw,
  },
  {
    name: "Stop",
    function: Control.stop,
    icon: StopCircle,
  },
  {
    name: "Previous",
    function: Control.previousSection,
    icon: SkipBack,
  },
  {
    name: "Next",
    function: Control.nextSection,
    icon: SkipForward,
  },
  {
    name: "Return to start",
    function: Control.returnToStart,
    icon: ChevronFirst,
  },
];
</script>

<template>
  <Card class="col-span-2">
    <CardHeader>
      <CardTitle>Disguise Controls</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          variant="outline"
          v-for="control in playHeadControls"
          :key="control.name"
          @click="control.function"
          class="flex justify-between"
        >
          <component :is="control.icon" class="size-5 mr-2" />
          {{ control.name }}
        </Button>
      </div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
