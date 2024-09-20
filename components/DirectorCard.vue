<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { RefreshCwIcon, ChevronsUpDown, PowerOff, Power } from "lucide-vue-next";
import type { ListProjectsResponse } from "~/lib/disguise/schema";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "~/components/ui/collapsible";
import type { ConsolidatedSystemInfo } from "~/lib/disguise/types";
import Stats from "~/components/Stats.vue";

const props = defineProps<{
  server: ConsolidatedSystemInfo;
  projectInfo?: ListProjectsResponse["result"][number];
}>();

const isOpen = ref(false);
const serverInfo = computed(() => {
  return [
    {
      title: "IP Address",
      value: props.server.ipAddress,
    },
    {
      title: "Machine Name",
      value: props.server.name,
    },
    {
      title: "Status",
      value: props.server.isServiceRunning ? "Online" : "Offline",
    },
    {
      title: "Average FPS",
      value: props.server.health?.averageFPS,
    },
    {
      title: "FPS Dropped",
      value: props.server.health?.videoDroppedFrames,
    },
    {
      title: "Currently Active Project",
      value: props.server.runningProject,
      error: "Error returning project",
    },
    {
      title: "Last Project",
      value: props.projectInfo?.lastProject,
    },
  ];
});
</script>

<template>
  <Card class="col-span-2">
    <ClientOnly>
      <CardHeader>
        <div class="flex justify-between items-center">
          <CardTitle class="flex items-end space-x-2">
            <div>
              {{ props.server.hostname }} - Director
              <Stats v-if="props.server.version" :uid="props.server.uid" :version="props.server.version" />
            </div>
          </CardTitle>
          <Badge class="" variant="outline">{{ props.server.type }}</Badge>
        </div>
      </CardHeader>
      <CardContent class="space-y-6">
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div v-for="info in serverInfo" class="space-y-1">
            <p class="font-medium text-muted-foreground">{{ info.title }}</p>
            <p>{{ info.value }}</p>
            <p v-if="info.error" class="text-destructive">{{ info.error }}</p>
          </div>
        </div>
        <Collapsible v-model:open="isOpen" class="space-y-2 border-t pt-4">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold">All Projects</h4>
            <CollapsibleTrigger as-child>
              <Button variant="ghost" size="sm" class="w-9 p-0">
                <ChevronsUpDown class="h-4 w-4" />
                <span class="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent class="space-y-2 overflow-x-scroll">
            <div v-for="project in projectInfo?.projects" class="rounded-md border px-4 py-3 font-mono text-sm">
              {{ project.path }}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div v-if="props.server.status.details.length > 0" class="space-y-2">
          <p class="font-medium">Errors:</p>
          <p v-for="details in props.server.status.details" class="text-sm text-destructive">
            {{ details.message }}
          </p>
        </div>
        <div class="flex space-x-2">
          <Button variant="destructive">
            <RefreshCwIcon class="size-4 mr-2" />
            Restart
          </Button>
          <Button variant="destructive">
            <PowerOff class="size-4 mr-2" />
            Shutdown
          </Button>
          <Button variant="secondary">
            <Power class="size-4 mr-2" />
            Power On
          </Button>
        </div>
      </CardContent>
    </ClientOnly>
  </Card>
</template>
