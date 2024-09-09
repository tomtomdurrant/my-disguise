<script setup lang="ts">
import { useSocketStore } from "~/stores/socketStore";

const socketStore = useSocketStore();
</script>

<template>
  <div class="flex flex-col items-start  text-xs ">
    <h2 class="font-bold">Connection status</h2>
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex items-center">
        <span>Connected:</span>
        <span
          class="font-bold ml-1"
          :class="{
            'text-green-500': socketStore.connected,
            'text-red-500': !socketStore.connected,
          }"
        >
          {{ socketStore.connected ? "Yes" : "No" }}
        </span>
      </div>
      <div>
        <span>Transport:</span>
        <span class="font-bold ml-1">{{ socketStore.transport }}</span>
      </div>
      <div>
        <span>Last Message Time:</span>
        <span class="font-bold ml-1">{{ socketStore.lastMessageTime?.toISOString() }}</span>
      </div>
    </div>
  </div>
</template>
