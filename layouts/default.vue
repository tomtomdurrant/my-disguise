<script setup lang="ts">
import { settings } from "~/lib/settings.js";
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <Header />
    <main class="space-y-6 p-6">
      <DevOnly v-if="settings.devtools">
        <LazyDevTools />
      </DevOnly>
      <slot />
    </main>
  </div>
</template>
