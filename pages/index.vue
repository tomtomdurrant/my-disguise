<script setup lang="ts">
import {httpData} from '~/lib/ws/socket';
import {consolidateSystemInfo} from "~/lib/disguise/consolidate";

const consolidated = computed(() => {
  if (!httpData.session || !httpData.systems || !httpData.health) {
    return null;
  }
  return consolidateSystemInfo(httpData.session, httpData.systems, httpData.health);
});

console.log(consolidated.value)

</script>

<template>
  <div class="max-w-screen-xl py-12 mx-auto grid place-items-center min-h-full">
    <div class="grid w-full">
      <ConnectionClient/>
      <div class="grid w-full gap-14">
        <section class="grid grid-cols-2">
          <template v-if="consolidated">
            <DirectorCard :server="consolidated.director"/>
            <ServerCard v-for="server in consolidated.understudies" :key="server.uid" :server="server"/>
          </template>
        </section>
      </div>

      <ActiveTransport/>
      <Annotations/>
      <Systems/>
      <Health/>
      <OscDataGrid/>
    </div>
  </div>
</template>

<style scoped>

</style>