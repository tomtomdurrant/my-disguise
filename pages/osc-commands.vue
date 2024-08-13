<!-- pages/osc-commands.vue -->
<script setup lang="ts">
import { ref } from "vue";
import OSCCommandForm from "@/components/OSCCommandForm.vue";
import { Button } from "@/components/ui/button";

interface OSCCommand {
  address: string;
  args: string[];
}

const { data: commands } = await useFetch("/api/osc");

// const commands = ref<OSCCommand[]>([]);

// const addCommand = (command: OSCCommand) => {
//   commands.value.push(command);
// };

const sendCommand = (command: OSCCommand) => {
  // Here you would implement the logic to send the OSC command
  console.log("Sending command:", command);
};
watch(commands, (newCommands) => {
  console.log("Commands updated:", newCommands);
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Custom OSC Commands</h1>
    <OSCCommandForm @submit-command="addCommand" />
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-2">Created Commands</h2>
      <ul class="space-y-2">
        <li
          v-for="(command, index) in commands"
          :key="index"
          class="flex items-center justify-between bg-gray-100 p-2 rounded"
        >
          <span>{{ command.address }} ({{ command.args }})</span>
          <Button @click="sendCommand(command)">Send</Button>
        </li>
      </ul>
    </div>
  </div>
</template>
