<script setup lang="ts">
import { settings } from "~/lib/settings";
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()

</script>

<template>
  <header class="border-b px-6 py-4">
    <div class="flex flex-col space-y-2">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-2xl font-bold whitespace-nowrap">Server Monitoring Dashboard</h1>
        <nav class="flex flex-wrap items-center gap-4">
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

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline">
                <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span class="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="colorMode.preference = 'light'">
                Light
              </DropdownMenuItem>
              <DropdownMenuItem @click="colorMode.preference = 'dark'">
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem @click="colorMode.preference = 'system'">
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
      <LazyConnectionClient v-if="settings.statsForNerds" />
    </div>
  </header>
</template>

<style scoped></style>
