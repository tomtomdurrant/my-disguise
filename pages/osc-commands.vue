<!-- pages/osc-commands.vue -->
<script setup lang="ts">
import { ref } from "vue";
import OSCCommandForm from "@/components/OSCCommandForm.vue";
import SingleCommand from "@/components/OscCommand.vue";
import { Button } from "@/components/ui/button";
import type { InsertOscCommand, SingleOscCommand } from "~/db/schema";

const { data: commands } = await useFetch("/api/osc", {
  key: "commands",
});

async function sendCommand(command: SingleOscCommand) {
  // Here you would implement the logic to send the OSC command
  const res = await $fetch(`/api/osc/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commandId: command.id,
    }),
  });
}

watch(commands, (newCommands) => {
  console.log("Commands updated:", newCommands);
});

async function addCommand(command: InsertOscCommand) {
    const res = await $fetch("/api/osc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
    });
    await refreshNuxtData("commands");
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Custom OSC Commands</h1>
    <OSCCommandForm @submit-command="addCommand" />
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Created Commands</h2>
      <ul class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <li v-for="(command, index) in commands" :key="index" class="bg-gray-100 h-fit p-4 rounded dark:bg-secondary">
          <SingleCommand :command="command" @send-command="sendCommand" :ke="command.id" />
        </li>
      </ul>
    </div>
  </div>
</template>