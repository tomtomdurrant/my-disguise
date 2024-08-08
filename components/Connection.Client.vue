<script setup lang="ts">
import { socketState } from "~/lib/ws/socket";
import { settings } from "~/lib/settings";
</script>

<template>
  <div v-if="settings.statsForNerds">
    <div class="flex flex-col items-center justify-center text-xs">
      <h2 class="font-bold">Connection status</h2>
      <div class="flex items-center space-x-2">
        <div>
          <span>Connected:</span>
          <span
            class="font-bold"
            :class="{
              'text-green-500': socketState.connected,
              'text-red-500': !socketState.connected,
            }"
          >
            {{ socketState.connected ? "Yes" : "No" }}
          </span>
        </div>
        <div>
          <span>Transport: </span>
          <span class="font-bold">{{ socketState.transport }}</span>
        </div>
        <div>
          <span>Last Message Time </span>
          <span class="font-bold">{{ socketState.lastMessageTime?.toISOString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
