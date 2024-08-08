<script setup lang="ts">
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { settings } from "~/lib/settings";
</script>

<template>
  <div class="flex w-full flex-col bg-background">
    <header class="flex justify-between border-b px-4 py-3 bg-background sm:px-6">
      <h1 class="text-2xl font-bold">Server Monitoring Dashboard</h1>
      <ConnectionClient />
      <nav class="flex items-center">
        <ul class="flex space-x-4">
          <li>
            <div class="flex items-center space-x-2">
              <Switch v-model:checked="settings.safeMode" />
              <Label for="safe-mode">Safe mode</Label>
            </div>
          </li>
          <li>
            <div class="flex items-center space-x-2">
              <Switch v-model:checked="settings.statsForNerds" id="stats-for-nerds" />
              <Label for="stats-for-nerds">Stats for nerds</Label>
            </div>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </header>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
<!--      <aside class="-mx-4 lg:w-1/5">-->
<!--&lt;!&ndash;        <SidebarNav />&ndash;&gt;-->
<!--      </aside>-->
      <div class="flex-1">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
