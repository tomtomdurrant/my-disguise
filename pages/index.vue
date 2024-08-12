<script setup lang="ts">
import { httpData } from "~/lib/ws/socket";
import { consolidateSystemInfo } from "~/lib/disguise/consolidate";

const consolidated = computed(() => {
  if (!httpData.session || !httpData.systems || !httpData.health) {
    return null;
  }
  return consolidateSystemInfo(httpData.session, httpData.systems, httpData.health);
});
const directorProjects = computed(() => {
  if (!httpData.projects) {
    return;
  }
  return httpData.projects.result.find(
    (machine) => machine.hostname.toUpperCase() === consolidated.value?.director.hostname.toUpperCase()
  );
});

function getServerProjectInfo(hostname: string) {
  if (!httpData.projects) {
    return;
  }
  return httpData.projects.result.find((machine) => machine.hostname.toUpperCase() === hostname.toUpperCase());
}
</script>

<template>
  <div class="grid gap-6 max-w-5xl mx-auto">
    <!--      <ConnectionClient />-->
    <div class="grid col-span-4 grid-cols-2 gap-4">
      <DirectorCard :server="consolidated.director" :project-info="directorProjects" />
      <ServerCard
        v-for="server in consolidated.understudies"
        :key="server.uid"
        :server="server"
        :project-info="getServerProjectInfo(server.hostname)"
      />
    </div>
    <!--            <Projects />-->
    <ActiveTransport />
    <DisguiseControls />
    <Annotations />
    <OscDataGrid />
  </div>
</template>

<style scoped></style>
