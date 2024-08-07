<script setup lang="ts">
import {Switch} from "~/components/ui/switch";
import {Label} from "~/components/ui/label";
import {statsForNerds} from "~/lib/statsForNerds";
</script>

<template>
  <div class="flex w-full flex-col bg-background">
    <header class="flex justify-between border-b px-4 py-3 bg-background sm:px-6">
      <h1 class="text-2xl font-bold">Server Monitoring Dashboard</h1>
      <nav class="flex items-center">
        <ul class="flex space-x-4">
          <li>
            <div class="flex items-center space-x-2">
              <Switch @update:checked="(v) =>{
                statsForNerds.stats = v;
              } " :checked="statsForNerds.stats" id="stats-for-nerds"/>
              <Label for="stats-for-nerds">Stats for nerds</Label>
            </div>
          </li>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </header>
      <slot/>
  </div>
</template>

