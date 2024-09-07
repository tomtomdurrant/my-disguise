<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Badge } from "~/components/ui/badge";
import { settings } from "~/lib/settings";
import { useDataStore } from "~/stores/dataStore";
import { useControl } from "~/composables/useControl";

const dataStore = useDataStore();
const { httpData } = storeToRefs(dataStore);
const control = useControl();
</script>

<template>
  <ClientOnly>
    <Card>
      <CardHeader>
        <CardTitle>Engage Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="httpData.active?.result?.length && httpData.active.result[0]" class="space-y-2">
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold">{{ httpData.active.result[0].name }}</p>
            <span v-if="settings.statsForNerds" class="font-mono text-sm"
              >uid: {{ httpData.active.result[0].uid }}</span
            >
          </div>
          <p class="text-sm font-medium text-muted-foreground">Current Active Transport</p>
          <div class="flex items-center space-x-2">
            <template v-if="httpData.active.result[0].engaged">
              <p class="bg-green-800 py-2 px-4 rounded-md text-green-200 underline underline-offset-2 font-semibold">
                Engaged
              </p>
              <Button variant="destructive" @click="control.disengage(httpData.active.result[0].uid)">
                Disengage
              </Button>
            </template>
            <template v-else>
              <p
                class="bg-red-700 py-2 px-4 rounded-md text-red-200 underline underline-offset-2 font-semibold animate-pulse"
              >
                Disengaged
              </p>
              <Button variant="secondary" @click="control.engage(httpData.active.result[0].uid)"> Engage</Button>
            </template>
          </div>
        </div>
        <div v-else-if="settings.statsForNerds" class="text-sm text-muted-foreground space-y-2">
          <p>No active transport data available.</p>
<!--          <p v-if="httpData.active?.error" class="text-red-500">Error: {{ httpData.active.error }}</p>-->
        </div>
        <div v-else class="text-sm text-muted-foreground">Engage status not available.</div>
      </CardContent>
    </Card>
  </ClientOnly>
</template>

