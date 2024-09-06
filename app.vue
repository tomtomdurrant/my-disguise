<script setup lang="ts">
import { Toaster } from "~/components/ui/toast";
import { onMounted } from "vue";
// import { socket } from "~/lib/ws/socket";
// import { addError } from "~/lib/errorStore";
import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, HttpData, OscData, ServerToClientEvents, SocketStateType } from "~/lib/ws/types";
import { toast } from "~/components/ui/toast";
import { addError } from "~/lib/errorStore";

//
// const socketState: SocketStateType = reactive({
//   connected: false,
//   transport: $socket.io.engine.transport.name,
//   lastMessageTime: null,
// });
// const inSession = ref(false);
//
// const httpData: HttpData = reactive({
//   active: null,
//   time: null,
//   systems: null,
//   session: null,
//   tracks: null,
//   annotations: null,
//   health: null,
//   projects: null,
// });
//
// const oscData: OscData = reactive({
//   osc_trackposition: null,
//   osc_timecodeposition: null,
//   osc_sectionhint: null,
//   osc_heartbeat: null,
//   osc_trackname: null,
//   osc_currentsectionname: null,
//   osc_brightness: null,
// });
// const section: {
//   current: string | null;
//   next: string | null;
// } = reactive({
//   current: null,
//   next: null,
// });
//
// $socket.onAny(() => {
//   socketState.lastMessageTime = new Date();
// });
//
// $socket.on("connect", () => {
//   console.log("connected");
//   socketState.connected = true;
// });
//
// $socket.on("disconnect", () => {
//   console.log("disconnected");
//   socketState.connected = false;
//   socketState.transport = "N/A";
// });
//
// $socket.io.engine.on("upgrade", (rawTransport) => {
//   socketState.transport = rawTransport.name;
// });
//
// $socket.on("active", (value) => {
//   httpData.active = value;
//   inSession.value = true;
// });
//
// $socket.on("annotations", (annotations) => {
//   httpData.annotations = annotations;
//
//   inSession.value = true;
// });
//
// $socket.on("time", (value) => {
//   httpData.time = value;
// });
//
// $socket.on("systems", (systems) => {
//   httpData.systems = systems;
// });
//
// $socket.on("session", (session) => {
//   httpData.session = session;
//   inSession.value = true;
// });
//
// $socket.on("health", (health) => {
//   httpData.health = health;
//   inSession.value = true;
// });
// $socket.on("tracks", (tracks) => {
//   httpData.tracks = tracks;
//   inSession.value = true;
// });
// $socket.on("projects", (projects) => {
//   httpData.projects = projects;
// });
//
// $socket.on("osc_brightness", (brightness) => {
//   oscData.osc_brightness = brightness;
// });
//
// $socket.on("osc_trackposition", (trackPosition) => {
//   oscData.osc_trackposition = trackPosition.toString();
// });
//
// $socket.on("osc_timecodeposition", (timecodePosition) => {
//   oscData.osc_timecodeposition = timecodePosition;
// });
// $socket.on("osc_sectionhint", (sectionHint) => {
//   oscData.osc_sectionhint = sectionHint;
//   const items = sectionHint.split("    ");
//   const currentSection = items[1];
//   const nextSection = items[2];
//   section.current = currentSection;
//   section.next = nextSection;
// });
//
// $socket.on("osc_heartbeat", (heartbeat) => {
//   oscData.osc_heartbeat = heartbeat?.toString();
// });
//
// $socket.on("osc_trackname", (trackName) => {
//   oscData.osc_trackname = trackName;
// });
//
// $socket.on("osc_currentsectionname", (currentSectionName) => {
//   oscData.osc_currentsectionname = currentSectionName;
// });
//
// $socket.on("error", (error) => {
//   toast({
//     title: "Error",
//     description: error,
//     variant: "destructive",
//   });
// });

</script>
<template>
  <div>
    <NuxtLayout>
      <Toaster />
      <NuxtPage  />
    </NuxtLayout>
  </div>
</template>
