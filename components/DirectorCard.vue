<script setup lang="ts">
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import type { ConsolidatedSystemInfo } from "~/lib/disguise/consolidate";
import { RefreshCwIcon, ChevronsUpDown, PowerOff, Power } from "lucide-vue-next";
import { settings } from "~/lib/settings";
import type { ListProjectsResponse } from "~/lib/disguise/schema";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "~/components/ui/collapsible";

const { server, projectInfo } = defineProps<{
  server: ConsolidatedSystemInfo;
  projectInfo: ListProjectsResponse["result"][number] | undefined;
}>();
const serverStatus = ref<string>("Offline");
const isOpen = ref(false);
const serverInfo = computed(() => {
  return [
    {
      title: "IP Address",
      value: server.ipAddress,
    },
    {
      title: "Machine Name",
      value: server.name,
    },
    {
      title: "Status",
      value: server.isServiceRunning ? "Online" : "Offline",
    },
    {
      title: "Average FPS",
      value: server.health?.averageFPS,
    },
    {
      title: "FPS Dropped",
      value: server.health?.videoDroppedFrames,
    },
    {
      title: "Currently Active Project",
      value: server.runningProject,
      error: "Error returning project",
    },
    {
      title: "Last Project",
      value: projectInfo?.lastProject,
    },
  ];
});
</script>

<template>
  <Card class="">
    <ClientOnly>
      <CardHeader>
        <CardTitle class="flex items-center justify-between">
          <span>{{ server.hostname }} - Director</span>
          <span v-if="settings.statsForNerds" class="text-sm font-mono"
            >{{ server.version?.major }}.{{ server.version?.minor }}.{{ server.version?.hotfix }}.{{
              server.version?.revision
            }}</span
          >
        </CardTitle>
        <p class="text-muted-foreground">{{ server.type }}</p>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div v-for="info in serverInfo">
            <p class="text-sm font-medium text-muted-foreground">{{ info.title }}</p>
            <p>{{ info.value }}</p>
            <p v-if="info.error" class="text-red-500">{{ info.error }}</p>
          </div>
        </div>
        <Collapsible v-model:open="isOpen" class="w-[350px] space-y-2">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-semibold">All Projects</h4>
            <CollapsibleTrigger as-child>
              <Button variant="ghost" size="sm" class="w-9 p-0">
                <ChevronsUpDown class="h-4 w-4" />
                <span class="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent class="space-y-2">
            <div v-for="project in projectInfo?.projects" class="rounded-md border px-4 py-3 font-mono text-sm">
              {{ project.path }}
            </div>
          </CollapsibleContent>
        </Collapsible>
        <div v-if="server.status.details.length > 0" class="">
          <p>Errors:</p>
          <p v-for="details in server.status.details" class="text-sm">
            {{ details.message }}
          </p>
        </div>
        <div class="flex space-x-2">
          <div class="flex items-center">
            <Button variant="destructive"
              >Restart
              <RefreshCwIcon class="size-4 ml-2" />
            </Button>
          </div>
          <div class="flex items-center justify-between">
            <Button variant="destructive"
              >Shutdown
              <PowerOff class="size-4 ml-2" />
            </Button>
          </div>
          <div class="flex items-center">
            <Button variant="secondary">
              Power On
              <Power class="size-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
      <div class="flex items-center justify-between">
        <div></div>
        <!--        <div class="flex items-center gap-2">-->
        <!--          <span-->
        <!--            v-if="serverStatus === 'Offline'"-->
        <!--            class="px-2 py-1 rounded-full bg-red-500 text-red-50 text-xs font-medium"-->
        <!--          >-->
        <!--            {{ serverStatus }}-->
        <!--          </span>-->
        <!--          <span-->
        <!--            v-else-if="serverStatus === 'Waiting'"-->
        <!--            class="px-2 py-1 rounded-full bg-violet-500 text-violet-50 text-xs font-medium"-->
        <!--          >-->
        <!--            {{ serverStatus }}-->
        <!--          </span>-->
        <!--          <span v-else class="px-2 py-1 rounded-full bg-green-500 text-green-50 text-xs font-medium">-->
        <!--            {{ serverStatus }}-->
        <!--          </span>-->
        <!--          <Button variant="ghost" size="icon" class="rounded-full">-->
        <!--            <RefreshCwIcon class="w-5 h-5" />-->
        <!--            <span class="sr-only">Refresh</span>-->
        <!--          </Button>-->
        <!--        </div>-->
      </div>
      <CardContent class="grid gap-3">
        <!--        <div class="flex flex-col">-->
        <!--          <p class="text-primary-foreground/80">IP Address</p>-->
        <!--        </div>-->
        <!--        <div class="flex flex-col">-->
        <!--          <p class="text-primary-foreground/80">Machine Name:</p>-->
        <!--          <p>{{ server.name }}</p>-->
        <!--        </div>-->

        <!--        <div class="">-->
        <!--          <p class="text-primary-foreground/80">Status:</p>-->
        <!--          <p>{{ server.isServiceRunning ? "Online" : "Offline" }}</p>-->
        <!--        </div>-->
        <!--        <div class="">-->
        <!--          <p class="text-primary-foreground/80">Average FPS:</p>-->
        <!--          <p>{{ server.health?.averageFPS }}</p>-->
        <!--        </div>-->
        <!--        <div class="">-->
        <!--          <p class="text-primary-foreground/80">FPS Dropped:</p>-->
        <!--          <p>{{ server.health?.videoDroppedFrames }}</p>-->
        <!--        </div>-->
        <!--        <div class="">-->
        <!--          <p class="text-primary-foreground/80">Currently Active Project:</p>-->
        <!--          <p v-if="server.runningProject">-->
        <!--            {{ server.runningProject }}-->
        <!--          </p>-->
        <!--          <p class="text-red-300 underline underline-offset-2" v-else>Error returning project</p>-->
        <!--        </div>-->
        <!--        <div class="">-->
        <!--          <p class="text-primary-foreground/80">Last Project:</p>-->
        <!--          <p v-if="projectInfo" class="">-->
        <!--            {{ projectInfo.lastProject }}-->
        <!--          </p>-->
        <!--          <p v-else class="text-red-300 underline underline-offset-2">Error returning last project</p>-->
        <!--        </div>-->
        <div class="">
          <!--        <p class="text-primary-foreground/80">All projects</p>-->
          <!--        <ul v-if="projectInfo?.projects.length && projectInfo.projects.length > 0" class="">-->
          <!--          <li v-for="project in projectInfo.projects">-->
          <!--            <p>{{ project.path }}</p>-->
          <!--            <p v-if="settings.statsForNerds">{{ project.lastModified }}</p>-->
          <!--          </li>-->
          <!--        </ul>-->
          <!--        <p v-else>Error returning project</p>-->
        </div>
      </CardContent>
    </ClientOnly>
  </Card>
</template>
