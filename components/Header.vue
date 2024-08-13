<script setup lang="ts">
import { settings } from "~/lib/settings";

const isDev = import.meta.dev;
</script>

<template>
  <header class="border-b px-6 py-4">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
      <h1 class="text-2xl font-bold">Server Monitoring Dashboard</h1>
      <LazyConnectionClient v-if="settings.statsForNerds" />
      <nav class="flex items-center space-x-4">
        <DevOnly>
          <div class="flex items-center space-x-2">
            <Switch v-model:checked="settings.devtools" />
            <Label for="safe-mode" class="text-sm font-medium">Devtools</Label>
          </div>
        </DevOnly>
        <div class="flex items-center space-x-2">
          <Switch v-model:checked="settings.safeMode" />
          <Label for="safe-mode" class="text-sm font-medium">Safe mode</Label>
        </div>
        <div class="flex items-center space-x-2">
          <Switch v-model:checked="settings.statsForNerds" id="stats-for-nerds" />
          <Label for="stats-for-nerds" class="text-sm font-mono font-bold">Stats_for_nerds</Label>
        </div>
        <Button as="a" variant="link" href="/">Home</Button>
      </nav>
    </div>
  </header>
</template>

<style scoped></style>
