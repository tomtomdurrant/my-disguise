<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { settings } from "~/lib/settings";
import { useDataStore } from "~/stores/dataStore";

const dataStore = useDataStore();
const { oscData, currentSection, nextSection } = storeToRefs(dataStore);

const data = computed(() => {
  return [
    {
      title: "Current Section",
      value: currentSection.value,
      show: true
    },
    {
      title: "Next Section",
      value: nextSection.value,
      show: true
    },
    {
      title: "Track Position",
      value: oscData.value.osc_trackname,
      show: true
    },
    {
      title: "Timecode Position",
      value: oscData.value.osc_timecodeposition,
      show: true
    },
    {
      title: "Track Name",
      value: oscData.value.osc_trackname,
      show: true
    },
    {
      title: "Current Section Name",
      value: oscData.value.osc_currentsectionname,
      show: true
    },
    {
      title: "Heartbeat",
      value: oscData.value.osc_heartbeat,
      show: settings.statsForNerds,
    },
    {
      title: "Full section hint",
      value: oscData.value.osc_sectionhint,
      show: settings.statsForNerds,
    },
  ];
});
</script>

<template>
  <ClientOnly>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 col-span-4">
      <!--      <Card class="h-32">-->
      <!--        <CardHeader>-->
      <!--          <CardTitle class="text-lg font-semibold text-gray-700 mb-2">Current Section</CardTitle>-->
      <!--        </CardHeader>-->
      <!--        <CardContent>-->
      <!--          <p class="text-lg font-semibold">-->
      <!--            {{ section.current }}-->
      <!--          </p>-->
      <!--        </CardContent>-->
      <!--      </Card>-->
      <!--      <Card class="bg-white p-4 rounded-md shadow h-56">-->
      <!--        <CardHeader>-->
      <!--          <CardTitle class="text-lg font-semibold text-gray-700 mb-2">Next Section</CardTitle>-->
      <!--        </CardHeader>-->
      <!--        <CardContent>-->
      <!--          <p class="text-xl font-semibold">-->
      <!--            {{ section.next }}-->
      <!--          </p>-->
      <!--        </CardContent>-->
      <!--      </Card>-->
      <template v-for="value in data" >
        <Card v-if="value.show" class="h-36">
          <CardHeader>
            <CardTitle class="text-lg font-semibold text-gray-700">{{ value.title }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-sm text-foreground">
              {{ value.value !== null ? value?.value.toString() : "N/A" }}
            </p>
          </CardContent>
        </Card>
      </template>
    </div>
  </ClientOnly>
</template>
