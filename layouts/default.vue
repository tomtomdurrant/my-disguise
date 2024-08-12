<script setup lang="ts">
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { settings } from "~/lib/settings";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">Server Monitoring Dashboard</h1>
        <ConnectionClient />
        <nav class="flex items-center space-x-4">
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
    <div class="flex flex-col space-y-8 lg:space-x-12 lg:space-y-0 lg:flex-row">
      <!--      <aside class="-mx-4 lg:w-1/5">-->
      <!--&lt;!&ndash;        <SidebarNav />&ndash;&gt;-->
      <!--      </aside>-->
      <div class="flex-1">
        <div class="space-y-6 p-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
