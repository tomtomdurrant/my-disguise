<script setup lang="ts">
import { oscData } from "~/lib/ws/socket";
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-fit col-start-1 col-span-4">
      <Card v-for="(value, key) in oscData" key="{key}" class="bg-white p-4 rounded-md shadow">
        <CardHeader>
          <CardTitle class="text-lg font-semibold text-gray-700 mb-2">{{ key }}</CardTitle>
        </CardHeader>
        <CardContent>
          <p class="text-xl font-semibold">
            {{ value !== null ? value?.toString() : "N/A" }}
          </p>
        </CardContent>
      </Card>
    </div>
  </ClientOnly>
</template>
