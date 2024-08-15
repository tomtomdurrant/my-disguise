<script setup lang="ts">
import { Button } from "~/components/ui/button";
import type { SingleOscCommand } from "~/db/schema";
import { ArrowUpDown } from "lucide-vue-next";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
} from "~/components/ui/alert-dialog";
import { getMachineName } from "../lib/osc";

const { command, sendCommand } = defineProps({
  command: {
    type: Object as () => SingleOscCommand,
    required: true,
  },
  sendCommand: Function,
});

const open = ref(false);

function getType(arg: SingleOscCommand["args"][number]) {
  let type = "string";
  switch (arg.type) {
    case "string": {
      type = "string";
      break;
    }
    case "integer": {
      type = "integer";
      break;
    }
    case "float": {
      type = "float";
      break;
    }
    default: {
      throw new Error(`Invalid argument type ${arg.type}`);
    }
  }
  return type;
}

async function remove() {
  const res = await $fetch(`/api/osc/${command.id}`, {
    method: "DELETE",
    onResponse: async () => {
      await refreshNuxtData("commands");
    },
  });

  console.log(res);
}
</script>

<template>
  <div class="grid">
    <Collapsible v-model:open="open" class="flex flex-col justify-between">
      <div class="flex w-full justify-between">
        <div class="flex items-center">
          {{ command.address }}
          <span class="font-thin" v-for="arg in command.args">({{ arg.value }}/{{ getType(arg) }}) {{ " " }}</span>
          <CollapsibleTrigger>
            <Button variant="ghost" size="sm" class="w-9 p-0">
              <ArrowUpDown class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div class="flex gap-4">
          <!--          <Popover>-->
          <!--            <PopoverTrigger as-child>-->
          <!--              <Button variant="outline">Edit</Button>-->
          <!--            </PopoverTrigger>-->
          <!--            <PopoverContent class="w-80">-->
          <!--              <div class="grid gap-4">-->
          <!--                <div class="space-y-2">-->
          <!--                  <h4 class="font-medium leading-none">Information</h4>-->
          <!--                  <p class="text-sm text-muted-foreground">Set the info for the command</p>-->
          <!--                </div>-->
          <!--                <div class="grid gap-2">-->
          <!--                  <div class="grid grid-cols-3 items-center gap-4">-->
          <!--                    <Label for="targetIp">Target IP</Label>-->
          <!--                    <Input id="targetIp" type="text" v-model:model-value="command.targetIp" class="col-span-2 h-8" />-->
          <!--                  </div>-->
          <!--                  <div class="grid grid-cols-3 items-center gap-4">-->
          <!--                    <Label for="targetPort">Max. width</Label>-->
          <!--                    <Input id="targetPort" type="text" v-model:model-value="command.targetPort" class="col-span-2 h-8" />-->
          <!--                  </div>-->
          <!--                  <div class="grid grid-cols-3 items-center gap-4">-->
          <!--                    <Label for="height">Height</Label>-->
          <!--                    <Input id="height" type="text" default-value="25px" class="col-span-2 h-8" />-->
          <!--                  </div>-->
          <!--                  <div class="grid grid-cols-3 items-center gap-4">-->
          <!--                    <Label for="maxHeight">Max. height</Label>-->
          <!--                    <Input id="maxHeight" type="text" default-value="none" class="col-span-2 h-8" />-->
          <!--                  </div>-->
          <!--                </div>-->
          <!--              </div>-->
          <!--            </PopoverContent>-->
          <!--          </Popover>-->
          <AlertDialog>
            <AlertDialogTrigger as-child>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete the command entirely.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction @click="remove">Continue </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button @click="sendCommand(command)">Send</Button>
        </div>
      </div>
      <CollapsibleContent>
        <Separator class="my-6" />
        <div class="grid w-64 grid-cols-2 gap-4">
          <div class="font-bold">Machine Name</div>
          <div class="text-right">{{ getMachineName(command.targetIp) }}</div>
          <div class="font-bold">Target IP</div>
          <div class="text-right">{{ command.targetIp }}</div>
          <div class="font-bold">Target Port</div>
          <div class="text-right">{{ command.targetPort }}</div>
        </div>
        <!--        <p>Target Ip: {{ command.targetIp}}</p>-->
        <!--        <p>Target Port: {{ command.targetPort}}</p>-->
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<style scoped></style>
