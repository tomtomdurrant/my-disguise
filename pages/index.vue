<script setup lang="ts">
import { httpData, inSession, socket } from "~/lib/ws/socket";
import { consolidateSystemInfo } from "~/lib/disguise/consolidate";

const consolidated = computed(() => {
  if (!httpData.session || !httpData.systems || !httpData.health) {
    return null;
  }
  return consolidateSystemInfo(httpData.session, httpData.systems, httpData.health);
});

const directorProjects = computed(() => {
  if (!httpData.projects?.result || !consolidated.value?.director?.hostname) {
    return undefined;
  }
  return httpData.projects.result.find(
    (machine) => machine.hostname.toUpperCase() === consolidated?.value?.director.hostname.toUpperCase()
  );
});

function getServerProjectInfo(hostname: string): typeof httpData.projects.result[number] | undefined {
  if (!httpData.projects?.result || !hostname) {
    return undefined;
  }
  return httpData.projects.result.find((machine) => machine.hostname.toUpperCase() === hostname.toUpperCase());
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
    <!-- <Button @click="() =>{
      socket.emit('/project')
    }">Click</Button> -->
    <template v-if="!inSession">
      <Projects />
    </template>
    <template v-else-if="inSession && consolidated?.director">
      <DirectorCard :server="consolidated.director" :project-info="directorProjects" />
      <ServerCard v-for="server in consolidated.understudies" :key="server.uid" :server="server"
        :project-info="getServerProjectInfo(server.hostname)" />
    </template>
    <template v-else-if="inSession && !consolidated?.director">
      <div class="col-span-full bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
        <p class="font-bold">No Director Available</p>
        <p>There is currently no director system connected. Please check your network connection or system status.</p>
      </div>
    </template>
    <ActiveTransport />
    <DisguiseControls />
    <Annotations />
    <OscDataGrid />
  </div>
</template>

<style scoped></style>
