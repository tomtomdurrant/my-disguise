<!-- OSCCommandForm.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { toast } from "~/components/ui/toast";
import { settings } from "~/lib/settings";

const formSchema = toTypedSchema(
  z.object({
    address: z.string(),
    args: z.preprocess((value) => {
      if (!value) {
        return [];
      }
      if (typeof value !== "string") {
        throw new Error("I don't know what you've done but somehow this input isn't a string. Refresh maybe?");
      }
      if (value.startsWith(" ")) {
        throw new Error("Starts with a space");
      }
      return value.split(",").map((arg) => arg.trim());
    }, z.array(z.string())),
    targetIp: z.string().optional(),
    targetPort: z.number({
      coerce: true,
    }),
    title: z.string(),
    notes: z.string().optional(),
    // targetMachineName: z.string(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits(["submit-command"]);
const onSubmit = handleSubmit((values) => {
  if (settings.statsForNerds) {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    });
  }
  emit("submit-command", values);
});
</script>

<template>
  <form class="w-2/3" @submit="onSubmit">
    <div class="grid grid-cols-2 gap-4 py-6">
      <FormField v-slot="{ componentField }" name="title">
        <FormItem>
          <FormLabel>The name of this command</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Send failover request" v-bind="componentField" />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="notes">
        <FormItem>
          <FormLabel>Any info about the command</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Some notes about the command" v-bind="componentField" />
          </FormControl>
          <FormDescription></FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="address">
        <FormItem>
          <FormLabel>OSC Address</FormLabel>
          <FormControl>
            <Input type="text" placeholder="/example/osc" v-bind="componentField" />
          </FormControl>
          <FormDescription> The OSC address to send the command to</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="args">
        <FormItem>
          <FormLabel>Arguments</FormLabel>
          <FormControl>
            <Input type="text" placeholder="123,hello" v-bind="componentField" />
          </FormControl>
          <FormDescription> Comma seperated list of arguments</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="targetIp">
        <FormItem>
          <FormLabel>Target IP Address</FormLabel>
          <FormControl>
            <Input type="text" placeholder="127.0.0.1" v-bind="componentField" />
          </FormControl>
          <FormDescription>The IP address of the machine you're sending the command to</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="targetPort">
        <FormItem>
          <FormLabel>Target Port</FormLabel>
          <FormControl>
            <Input type="text" placeholder="7401" v-bind="componentField" />
          </FormControl>
          <FormDescription>The port on the machine</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Button type="submit"> Submit</Button>
  </form>
</template>
