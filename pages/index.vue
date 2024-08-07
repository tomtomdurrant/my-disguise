<script setup lang="ts">
import {httpData} from '~/lib/ws/socket';
import {consolidateSystemInfo} from "~/lib/disguise/consolidate";

const consolidateddata = computed(() => consolidateSystemInfo(httpData.session, httpData.systems, httpData.health));

console.log(consolidateddata.value)

</script>

<template>
  <div class="max-w-screen-xl py-12 mx-auto grid place-items-center min-h-full">
    <div class="grid w-full">
      <ConnectionClient/>
      <div class="grid w-full gap-14">
        <section class="grid grid-cols-2">
          <DirectorCard :server="consolidateddata.director"/>
        </section>

      </div>

      <!--  <ActiveTransport/>-->
      <Annotations/>
      <Systems/>
      <Health/>
      <OscDataGrid/>
    </div>
  </div>
</template>

<style scoped>

</style>