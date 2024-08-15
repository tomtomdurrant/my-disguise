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

// const address = ref("");
// const args = ref("");
// const targetIp = ref("");
// const targetPort = ref("");
// const targetMachineName = ref("");
const formSchema = toTypedSchema(
  z.object({
    address: z.string(),
    args: z.string().nullable(),
    targetIp: z.string().ip(),
    targetPort: z.string(),
    targetMachineName: z.string(),
  })
);
const form = useForm({ validationSchema: formSchema });

const emit = defineEmits(["submitCommand"]);

// const submitCommand = (event) => {
//   // emit("submitCommand", {
//   //   address: address.value,
//   //   args: args.value.split(","),
//   //   targetIp: targetIp.value,
//   //   targetPort: targetPort.value,
//   //   targetMachineName: targetMachineName.value,
//   // });
//   // address.value = "";
//   // args.value = "";
//   // targetIp.value = "";
//   // targetPort.value = "";
//   // targetMachineName.value = "";
// };
const onSubmit = form.handleSubmit((values) => {
  console.log("this happened");
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
});
</script>

<template>
  <form id="submitCommandForm" @submit.prevent="onSubmit" class="grid grid-cols-2 gap-6 py-4">
    <FormField v-slot="{ componentField }" name="address">
      <FormItem></FormItem>
      <Label for="address">OSC Address</Label>
      <Input id="address" placeholder="/example/address" required />
    </FormField>
    <div>
      <Label for="args">Arguments (comma-separated)</Label>
      <Input id="args" placeholder="1,2,3,hello" />
    </div>
    <div>
      <Label for="targetIp">Target IP</Label>
      <Input id="targetIp" placeholder="127.0.0.1" />
    </div>
    <div>
      <Label for="targetPort">Target Port</Label>
      <Input id="targetPort" placeholder="7401" />
    </div>
    <div>
      <Label for="targetMachineName">Machine Name</Label>
      <Input id="targetMachineName" placeholder="TomsPC" />
    </div>
    <Button type="submit" form="submitCommandForm">Create Command</Button>
  </form>
</template>
