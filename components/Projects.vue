<script setup lang="ts">
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { httpData } from "~/lib/ws/socket";

function convertPath(path: string) {
  return path.replace(/\\/g, "/").split("/d3 projects/")[1];
}

const formSchema = toTypedSchema(
  z.object({
    project: z.string({
      required_error: "Select a project",
    }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});
const projects = computed(() => {
  if (!httpData.projects) {
    return null;
  }
  return httpData.projects.result[0].projects.map((project) => convertPath(project.path));
})

const onSubmit = handleSubmit(async (values) => {
  const res = await fetch("http://192.168.0.18/api/service/project/startlocalproject", {
    method: "POST",
    body: JSON.stringify({
      projectPath: values.project,
      soloMode: true,
      allowUpgrade: true,
    }),
  });
  const body = await res.json();
  console.log(body);
  toast({
    title: "Response",
    description: JSON.stringify(body),
  });

  // toast({
  //   title: "You submitted the following values:",
  //   description: h(
  //     "pre",
  //     { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
  //     h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
  //   ),
  // });
});
</script>

<template>
    <form class="w-2/3 space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="project">
        <FormItem>
          <FormLabel>Project</FormLabel>

          <Select v-bind="componentField">
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a project to load" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="project in projects" :value="project">
                  {{ project }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormDescription> Select a project to load</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>

      <Button type="submit"> Submit</Button>
    </form>
</template>