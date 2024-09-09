import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "~/lib/ws/types";

import { currentSection, httpData, inSession, nextSection, oscData } from "~/stores/dataStore";

export default defineNuxtPlugin((nuxtApp) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");
  const socketStore = useSocketStore();

  socket.on("connect", () => {
    console.log("connected");
    socketStore.connected = true;
  });

  socket.onAny(() => {
    socketStore.lastMessageTime = new Date();
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    socketStore.connected = false;
    socketStore.transport = "N/A";
  });

  socket.io.engine.on("upgrade", (rawTransport) => {
    socketStore.transport = rawTransport.name;
  });
  socket.on("connect_error", (error) => {
    socketStore.addError(error.message);
  });
  socket.on("active", (active) => {
    console.log("active", active);
    httpData.active = active;
    inSession.value = true;
  });
  socket.on("systems", (systems) => {
    console.log("systems", systems);
    httpData.systems = systems;
  });

  socket.on("annotations", (annotations) => {
    httpData.annotations = annotations;
    inSession.value = true;
  });

  socket.on("session", (session) => {
    httpData.session = session;
    inSession.value = true;
  });

  socket.on("health", (health) => {
    httpData.health = health;
    inSession.value = true;
  });

  socket.on("tracks", (tracks) => {
    httpData.tracks = tracks;
    inSession.value = true;
  });

  socket.on("projects", (newprojects) => {
    console.log("new projects ");
    httpData.projects = newprojects;
  });

  socket.on("osc_brightness", (brightness) => {
    oscData.osc_brightness = brightness;
  });

  socket.on("osc_trackposition", (trackPosition) => {
    oscData.osc_trackposition = trackPosition.toString();
  });

  socket.on("osc_timecodeposition", (timecodePosition) => {
    oscData.osc_timecodeposition = timecodePosition;
  });
  socket.on("osc_sectionhint", (sectionHint) => {
    oscData.osc_sectionhint = sectionHint;
    const items = sectionHint.split("    ");
    const newCurrentSection = items[1];
    const newNextSection = items[2];
    currentSection.value = newCurrentSection;
    nextSection.value = newNextSection;
  });

  socket.on("osc_heartbeat", (heartbeat) => {
    oscData.osc_heartbeat = heartbeat?.toString();
  });

  socket.on("osc_trackname", (trackName) => {
    oscData.osc_trackname = trackName;
  });

  socket.on("osc_currentsectionname", (currentSectionName) => {
    oscData.osc_currentsectionname = currentSectionName;
  });

  return {
    provide: {
      socket,
    },
  };
});
