import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "~/lib/ws/types";
import { useSocketStore } from "~/stores/socketStore";
import { useDataStore } from "~/stores/dataStore";

export default defineNuxtPlugin((nuxtApp) => {
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");
  const socketStore = useSocketStore();
  const dataStore = useDataStore();

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
    dataStore.httpData.active = active;
    dataStore.inSession = true;
  });
  socket.on("systems", (systems) => {
    console.log("systems", systems);
    dataStore.httpData.systems = systems;
  });

  socket.on("annotations", (annotations) => {
    dataStore.httpData.annotations = annotations;
    dataStore.inSession = true;
  });

  socket.on("session", (session) => {
    dataStore.httpData.session = session;
    dataStore.inSession = true;
  });

  socket.on("health", (health) => {
    dataStore.$patch((state) => {
      state.httpData.health = health;
      state.inSession = true;
    });
  });

  socket.on("tracks", (tracks) => {
    dataStore.$patch((state) => {
      state.httpData.tracks = tracks;
      state.inSession = true;
    });
  });

  socket.on("projects", (projects) => {
    dataStore.$patch((state) => {
      state.httpData.projects = projects;
    });
  });

  // socket.on("connect_error", (error) => {
  //   addError({ message: error.message, name: error.name, stack: error.stack });
  // });
  //
  // export const socketState: SocketStateType = reactive({
  //   connected: false,
  //   transport: socket.io.engine.transport.name,
  //   lastMessageTime: null,
  // });
  // export const inSession = ref(false);
  //
  // export const httpData: HttpData = reactive({
  //   active: null,
  //   time: null,
  //   systems: null,
  //   session: null,
  //   tracks: null,
  //   annotations: null,
  //   health: null,
  //   projects: null,
  // });

  // export const oscData: OscData = reactive({
  //   osc_trackposition: null,
  //   osc_timecodeposition: null,
  //   osc_sectionhint: null,
  //   osc_heartbeat: null,
  //   osc_trackname: null,
  //   osc_currentsectionname: null,
  //   osc_brightness: null,
  // });
  // export const section: {
  //   current: string | null;
  //   next: string | null;
  // } = reactive({
  //   current: null,
  //   next: null,
  // });
  //

  socket.on("osc_brightness", (brightness) => {
    dataStore.oscData.osc_brightness = brightness;
  });

  socket.on("osc_trackposition", (trackPosition) => {
    dataStore.oscData.osc_trackposition = trackPosition.toString();
  });

  socket.on("osc_timecodeposition", (timecodePosition) => {
    dataStore.oscData.osc_timecodeposition = timecodePosition;
  });
  socket.on("osc_sectionhint", (sectionHint) => {
    dataStore.oscData.osc_sectionhint = sectionHint;
    const items = sectionHint.split("    ");
    const currentSection = items[1];
    const nextSection = items[2];
    dataStore.section.current = currentSection;
    dataStore.section.next = nextSection;
  });

  socket.on("osc_heartbeat", (heartbeat) => {
    dataStore.oscData.osc_heartbeat = heartbeat?.toString();
  });

  socket.on("osc_trackname", (trackName) => {
    dataStore.oscData.osc_trackname = trackName;
  });

  socket.on("osc_currentsectionname", (currentSectionName) => {
    dataStore.oscData.osc_currentsectionname = currentSectionName;
  });

  return {
    provide: {
      socket,
    },
  };
});
