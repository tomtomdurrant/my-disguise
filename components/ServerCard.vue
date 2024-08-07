<script setup lang="ts">
import type {ConsolidatedSystemInfo} from "~/lib/disguise/consolidate";
import {RefreshCwIcon} from "lucide-vue-next";
import {settings} from "~/lib/settings";
const {server} = defineProps<{ server: ConsolidatedSystemInfo }>();

</script>

<template>
  <Card class="h-fit bg-card text-card-foreground">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">{{ server.hostname }}</h2>
          <p>{{ server.type }}</p>
          <code v-if="settings.statsForNerds" class="text-sm">{{server.version?.major}}.{{server.version?.minor}}.{{server.version?.hotfix}}.{{server.version?.revision}}</code>
        </div>
        <div class="flex items-center gap-2">
            <span class="rounded-full bg-green-500 px-2 py-1 text-xs font-medium text-green-50">
              Online
            </span>
          <Button variant="ghost" size="icon" class="rounded-full">
            <RefreshCwIcon class="h-5 w-5"/>
            <span class="sr-only">Refresh</span>
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent class="grid gap-2">
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">IP Address:</span>
        <span>{{ server.ipAddress }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">Machine Name:</span>
        <span>{{ server.name }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">Status:</span>
        <span>
<!--          TODO bit ugly-->
          <span v-if="server.health?.states[0].detail === 'Connected'">
          <span v-if="server.health.states[1].detail === 'OK'"> - Synced</span>
          <span v-else> - Not Synced</span>
          </span>
          </span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">Average FPS:</span>
        <span>{{ server.health?.averageFPS.toFixed(2) }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">Frames Dropped:</span>
        <span>{{ server.health?.videoDroppedFrames }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground">Frames Missed</span>
        <span>{{ server.health?.videoMissedFrames }}</span>
      </div>

      <div class="flex items-center justify-between">
        <p class="text-muted-foreground">Status:</p>
        <div v-if="server.health?.videoDroppedFrames && server.health?.videoDroppedFrames > 5">
              <span class="rounded-full bg-red-600 px-2 py-1 text-sm text-red-100">
                Fluctuating
              </span>
        </div>
        <span v-else class="text-green-500">Normal</span>
      </div>
    </CardContent>

    <CardFooter class="flex gap-2">
      <Button variant="outline" size="sm">
        Restart
      </Button>
      <Button variant="outline" size="sm">
        Shutdown
      </Button>
      <Button variant="outline" size="sm">
        Power On
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>

</style>