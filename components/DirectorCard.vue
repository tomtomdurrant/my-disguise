<script setup lang="ts">
import {Card, CardContent, CardFooter, CardHeader} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import type {ConsolidatedSystemInfo} from "~/lib/disguise/consolidate";
import {RefreshCwIcon} from "lucide-vue-next";

const {server} = defineProps<{ server: ConsolidatedSystemInfo }>();
const serverStatus = ref<string>("Offline");
</script>

<template>
  <Card class="bg-primary text-primary-foreground">
    <CardHeader>
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            {{ server.hostname }} - Director
          </h2>
          <p>{{ server.type }}</p>
        </div>
        <div class="flex items-center gap-2">
          <span v-if="serverStatus === 'Offline'"
                class="px-2 py-1 rounded-full bg-red-500 text-red-50 text-xs font-medium">
                {{ serverStatus }}
          </span>
          <span v-else-if="serverStatus === 'Waiting'"
                class="px-2 py-1 rounded-full bg-violet-500 text-violet-50 text-xs font-medium">
                {{ serverStatus }}
          </span>
          <span v-else class="px-2 py-1 rounded-full bg-green-500 text-green-50 text-xs font-medium">
                {{ serverStatus }}
          </span>
          <Button variant="ghost" size="icon" class="rounded-full">
            <RefreshCwIcon class="w-5 h-5"/>
            <span class="sr-only">Refresh</span>
          </Button>
        </div>
      </div>
    </CardHeader>
    <CardContent class="grid gap-3">
      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">IP Address</span>
        <span>{{ server.ipAddress }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">Machine Name:</span>
        <span>{{ server.name }}</span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">Status:</span>
        <span>{{ server.isServiceRunning ? "Online" : "Offline" }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">Average FPS:</span>
        <span>{{ server.health?.averageFPS }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">FPS Dropped:</span>
        <span>{{ server.health?.videoDroppedFrames }}</span>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-primary-foreground/80">Project:</span>
        <span v-if="server.runningProject" class="text-red-300 underline underline-offset-2">
          {{ server.runningProject }}
        </span>
        <span v-else>
                Error returning project
        </span>
      </div>

      <div v-if="server.status.details.length >0" class="flex items-center">
        <p>Errors:</p>
        <pre v-for="x in server.status.details" class="text-xs">
                {{ x.message }}
        </pre>
      </div>
    </CardContent>
    <CardFooter className="flex justify-around items-center pb-8">
      <Button variant="destructive">
        Restart
      </Button>
      <Button variant="destructive"
      >
        Shutdown
      </Button>
      <Button variant="secondary">
        Power On
      </Button>
    </CardFooter>
  </Card>
</template>
