<script setup lang="ts">
import { httpData, inSession } from "~/lib/ws/socket";
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
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <template v-if="!inSession">
      <Projects />
    </template>
    <template v-if="inSession">
      <DirectorCard :server="consolidated.director" :project-info="directorProjects" />
      <ServerCard
        v-for="server in consolidated.understudies"
        :key="server.uid"
        :server="server"
        :project-info="getServerProjectInfo(server.hostname)"
      />
    </template>
    <ActiveTransport />
    <DisguiseControls />
    <Annotations />
    <OscDataGrid />
  </div>
</template>

<style scoped></style>
