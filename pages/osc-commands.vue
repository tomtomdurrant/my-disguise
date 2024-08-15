<!-- pages/osc-commands.vue -->
<script setup lang="ts">
import { ref } from "vue";
import OSCCommandForm from "@/components/OSCCommandForm.vue";
import SingleCommand from "@/components/OscCommand.vue";
import { Button } from "@/components/ui/button";
import type { InsertOscCommand, OscCommand } from "~/db/schema";

const { data: commands } = await useFetch("/api/osc", {
  key: "commands",
});

const sendCommand = (command: OscCommand) => {
  // Here you would implement the logic to send the OSC command
  console.log("Sending command:", command);
};
watch(commands, (newCommands) => {
  console.log("Commands updated:", newCommands);
});

async function addCommand(command: InsertOscCommand) {
  console.log("adding");
  console.log(command);
  await $fetch("/api/osc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    onResponse: async () => {
      await refreshNuxtData("commands");
    },
  });
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Custom OSC Commands</h1>
    <OSCCommandForm @submit-command="addCommand" />
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Created Commands</h2>
      <ul class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <li v-for="(command, index) in commands" :key="index" class="bg-gray-100 h-fit p-4 rounded">
          <SingleCommand :command="command" @send-command="sendCommand" />
        </li>
      </ul>
    </div>
  </div>
</template>
