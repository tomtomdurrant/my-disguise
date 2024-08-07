import {io, Socket} from "socket.io-client";
import type {ClientToServerEvents, HttpData, OscData, ServerToClientEvents, SocketStateType} from "~/lib/ws/types";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3000");

export const socketState: SocketStateType = reactive({
    connected: false,
    transport: socket.io.engine.transport.name,
    lastMessageTime: null
});

export const httpData: HttpData = reactive({
    active: null,
    time: null,
    systems: null,
    session: null,
    tracks: null,
    annotations: null,
    health: null,
    projects: null
});

export const oscData: OscData = reactive({
    osc_trackposition: null,
    osc_timecodeposition: null,
    osc_sectionhint: null,
    osc_heartbeat: null,
    osc_trackname: null,
    osc_currentsectionname: null,
    osc_brightness: null,
})

socket.onAny(() => {
    socketState.lastMessageTime = new Date();
})

socket.on("connect", () => {
    console.log('connected')
    socketState.connected = true;
});

socket.on("disconnect", () => {
    console.log('disconnected')
    socketState.connected = false;
    socketState.transport = "N/A";
});

socket.io.engine.on("upgrade", (rawTransport) => {
    socketState.transport = rawTransport.name;
});

socket.on('active', (value) => {
    httpData.active = value;
})

socket.on('annotations', (annotations) => {
    httpData.annotations = annotations;
})

socket.on('time', (value) => {
    httpData.time = value;
})

socket.on('systems', (systems) => {
    httpData.systems = systems;
})

socket.on('session', (session) => {
    httpData.session = session;
})

socket.on('health', (health) => {
    httpData.health = health;
})
socket.on("tracks", (tracks) => {
    httpData.tracks = tracks;
});

socket.on("osc_brightness", (brightness) => {
    oscData.osc_brightness = brightness;
})

socket.on("osc_trackposition", (trackPosition) => {
    oscData.osc_trackposition = trackPosition.toString();
})

socket.on("osc_timecodeposition", (timecodePosition) => {
    oscData.osc_timecodeposition = timecodePosition;
})
socket.on("osc_sectionhint", (sectionHint) => {
    oscData.osc_sectionhint = sectionHint;
})

socket.on("osc_heartbeat", (heartbeat) => {
    oscData.osc_heartbeat = heartbeat?.toString();
})

socket.on("osc_trackname", (trackName) => {
    oscData.osc_trackname = trackName;
})

socket.on("osc_currentsectionname", (currentSectionName) => {
    oscData.osc_currentsectionname = currentSectionName;
})



