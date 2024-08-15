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
    // args: z.preprocess((value) => {
    //   console.log({value});
    //   return value.split(",");
    // }),
    args: z.preprocess((value) => {
      if (!value) {
        return [];
      }
      // if (typeof value !== "string") {
      //   throw new Error("wtf");
      // }
      return value.split(",");
    }, z.array(z.string())),
    targetIp: z.string().ip(),
    targetPort: z.number({
      coerce: true,
    }),
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
            <Input type="text" placeholder="" v-bind="componentField" />
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
