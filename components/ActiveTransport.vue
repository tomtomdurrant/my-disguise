<script setup lang="ts">
import { httpData, oscData, socket } from "~/lib/ws/socket";
import { Badge } from "~/components/ui/badge";
import { Control } from "~/lib/disguise/control";
import { settings } from "~/lib/settings";
</script>

<template>
  <ClientOnly>
    <Card>
      <CardHeader>
        <CardTitle>Engage Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="httpData.active != null">
          <div class="flex items-center justify-between">
            <p class="text-lg font-semibold">{{ httpData.active.result[0].name }}</p>
            <span v-if="settings.statsForNerds" class="font-mono text-sm">uid: {{ httpData.active.result[0].uid }}</span>
          </div>
          <p class="text-sm font-medium text-muted-foreground">Current Active Transport</p>
          <div class="flex items-center space-x-2">
            <template v-if="httpData.active.result[0].engaged">
              <Badge class="bg-green-500 p-2"> Engaged</Badge>
              <Button variant="destructive" @click="Control.disengage(httpData.active.result[0].uid)">
                Disengage
              </Button>
            </template>
            <template v-else>
              <Badge class="bg-red-500"> Disengaged</Badge>
              <Button variant="default" @click="Control.engage(httpData.active.result[0].uid)"> Engage</Button>
            </template>
          </div>
        </div>
      </CardContent>
    </Card>
  </ClientOnly>
</template>

<style scoped></style>
