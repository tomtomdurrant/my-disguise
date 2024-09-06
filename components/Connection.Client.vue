<script setup lang="ts">
// import { socketState } from "~/lib/ws/socket";
import { useSocketStore } from "~/stores/socketStore";

const socketStore = useSocketStore();
</script>

<template>
  <div class="flex flex-col items-start md:items-end text-xs">
    <h2 class="font-bold">Connection status</h2>
    <div class="flex items-center space-x-2">
      <div>
        <span>Connected:</span>
        <span
          class="font-bold"
          :class="{
            'text-green-500': socketStore.connected,
            'text-red-500': !socketStore.connected,
          }"
        >
          {{ socketStore.connected ? "Yes" : "No" }}
        </span>
      </div>
      <div>
        <span>Transport: </span>
        <span class="font-bold">{{ socketStore.transport }}</span>
      </div>
      <div>
        <span>Last Message Time </span>
        <span class="font-bold">{{ socketStore.lastMessageTime?.toISOString() }}</span>
      </div>
    </div>
  </div>
</template>
