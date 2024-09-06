<script setup lang="ts">
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
const controlRef = useControl();

const playHeadControls = [
  {
    name: "Play",
    function: controlRef.play,
    icon: Play,
  },
  {
    name: "Play Section",
    function: controlRef.playSection,
    icon: ListVideo,
  },
  {
    name: "Loop Section",
    function: controlRef.loopSection,
    icon: RefreshCw,
  },
  {
    name: "Stop",
    function: controlRef.stop,
    icon: StopCircle,
  },
  {
    name: "Previous",
    function: controlRef.previousSection,
    icon: SkipBack,
  },
  {
    name: "Next",
    function: controlRef.nextSection,
    icon: SkipForward,
  },
  {
    name: "Return to start",
    function: controlRef.returnToStart,
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
          class="flex items-center justify-between"
        >
          <component :is="control.icon" class="w-5 h-5 flex-shrink-0 mr-2" />
          <span class="text-sm">{{ control.name }}</span>
        </Button>
      </div>
    </CardContent>
  </Card>
</template>
