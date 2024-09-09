<script setup lang="ts">
import { ChevronsUpDown, RefreshCwIcon } from "lucide-vue-next";
import type { ListProjectsResponse } from "~/lib/disguise/schema";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import type { ConsolidatedSystemInfo } from "~/lib/disguise/types";
import Stats from "~/components/Stats.vue";

const { server, projectInfo } = defineProps<{
  server: ConsolidatedSystemInfo;
  projectInfo?: ListProjectsResponse["result"][number];
}>();
const isOpen = ref(false);
</script>

<template>
  <Card class="h-fit bg-card text-card-foreground">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">{{ server.hostname }}</h2>
          <p>{{ server.type }}</p>
          <Stats :uid="server.uid" :version="server.version" />
        </div>
        <div class="flex items-center gap-2">
          <p class="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-green-50">Online</p>
          <Button variant="ghost" size="icon" class="rounded-full">
            <RefreshCwIcon class="h-5 w-5" />
            <p class="sr-only">Refresh</p>
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent class="grid gap-2">
      <template v-if="server != null">
        <div class="">
          <p class="text-muted-foreground">IP Address:</p>
          <p>{{ server.ipAddress }}</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Machine Name:</p>
          <p>{{ server.name }}</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Status:</p>
          <!--          TODO bit ugly-->
          <p v-if="server.health?.states[0].detail === 'Connected'">
            {{ server.health.states[0].detail }}
            <template v-if="server.health.states[1].detail === 'OK'"> - Synced</template>
            <template v-else> - Not Synced</template>
          </p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Average FPS:</p>
          <p>{{ server.health?.averageFPS.toFixed(2) }}</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Frames Dropped:</p>
          <p>{{ server.health?.videoDroppedFrames }}</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Frames Missed</p>
          <p>{{ server.health?.videoMissedFrames }}</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Currently Active Project:</p>
          <p v-if="server.runningProject">
            {{ server.runningProject }}
          </p>
          <p class="text-red-500 underline underline-offset-2" v-else>Error returning project</p>
        </div>
        <div class="">
          <p class="text-muted-foreground">Last Project:</p>
          <p v-if="projectInfo" class="">
            {{ projectInfo.lastProject }}
          </p>
          <p v-else class="text-red-300 underline underline-offset-2">Error returning last project</p>
        </div>
        <div class="">
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
        </div>

        <div class="">
          <p class="text-muted-foreground">Status:</p>
          <div v-if="server.health?.videoDroppedFrames && server.health?.videoDroppedFrames > 5">
            <p class="">
              <span class="rounded-3xl bg-red-600 px-2 py-1 text-sm text-red-100">Fluctuating</span>
            </p>
          </div>
          <p v-else class="text-green-500">Normal</p>
        </div>
      </template>
    </CardContent>

    <CardFooter class="flex gap-2">
      <Button variant="outline" size="sm"> Restart</Button>
      <Button variant="outline" size="sm"> Shutdown</Button>
      <Button variant="outline" size="sm"> Power On</Button>
    </CardFooter>
  </Card>
</template>

<style scoped></style>
