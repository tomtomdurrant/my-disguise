<script setup lang="ts">
import { oscData, section } from "~/lib/ws/socket";
import { settings } from "~/lib/settings";

const data = computed(() => {
  // make a title for each one
  // make a value for each one
  return [
    {
      title: "Current Section",
      value: section.current,
      show: true
    },
    {
      title: "Next Section",
      value: section.next,
      show: true
    },
    {
      title: "Track Position",
      value: oscData.osc_trackname,
      show: true
    },
    {
      title: "Timecode Position",
      value: oscData.osc_timecodeposition,
      show: true
    },
    {
      title: "Track Name",
      value: oscData.osc_trackname,
      show: true
    },
    {
      title: "Current Section Name",
      value: oscData.osc_currentsectionname,
      show: true
    },
    {
      title: "Heartbeat",
      value: oscData.osc_heartbeat,
      show: settings.statsForNerds,
    },
    {
      title: "Full section hint",
      value: oscData.osc_sectionhint,
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
