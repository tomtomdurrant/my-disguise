// import { z } from "zod";
// import {
//   detectSystemsResponseSchema,
//   statusListHealthResponseSchema,
//   statusListNotificationsResponseSchema,
//   transportGetActiveResponseSchema,
//   transportListAnnotationsResponseSchema,
// } from "~/lib/disguise/schemas";
// import * as fs from "node:fs/promises";
// import { systemListProjectsResponseSchema } from "~/lib/disguise/types/system";
// import {
//   statusGetProjectResponseSchema,
//   statusGetSessionResponseSchema,
// } from "~/lib/disguise/types/status";
//
// const playmodeEnum = z.enum([
//   "NotSet",
//   "Play",
//   "PlaySection",
//   "Loop",
//   "Stop",
//   "Unknown",
// ]);
// const tagTypeEnum = z.enum(["TagType_Unknown", "TC", "MIDI", "CUE"]);
//
// class MockD3OSCClient {
//   constructor({
//     targetServer,
//     targetPort,
//   }: {
//     targetServer: string;
//     targetPort?: number;
//   }) {
//     console.log(
//       `MockD3OSCClient initialized with server: ${targetServer}, port: ${targetPort}`
//     );
//   }
//
//   private send(address: string, args: any[]) {
//     console.log(`OSC message sent to ${address} with args:`, args);
//   }
//
//   setCue(cue: string) {
//     this.send("/d3/showcontrol/cue", [cue]);
//   }
//
//   play() {
//     this.send("/d3/showcontrol/play", []);
//   }
//
//   playToEndOfSection() {
//     this.send("/d3/showcontrol/playsection", []);
//   }
//
//   loopSection() {
//     this.send("/d3/showcontrol/loop", []);
//   }
//
//   stop() {
//     this.send("/d3/showcontrol/stop", []);
//   }
//
//   previousSection() {
//     this.send("/d3/showcontrol/previoussection", []);
//   }
//
//   nextSection() {
//     this.send("/d3/showcontrol/nextsection", []);
//   }
//
//   returnToStart() {
//     this.send("/d3/showcontrol/returntostart", []);
//   }
//
//   previousTrack() {
//     this.send("/d3/showcontrol/previoustrack", []);
//   }
//
//   nextTrack() {
//     this.send("/d3/showcontrol/nexttrack", []);
//   }
//
//   setTrackName(name: string) {
//     this.send("/d3/showcontrol/trackname", [name]);
//   }
//
//   setTrackID(id: number) {
//     this.send("/d3/showcontrol/trackid", [id]);
//   }
//
//   fadeUp() {
//     this.send("/d3/showcontrol/fadeup", []);
//   }
//
//   fadeDown() {
//     this.send("/d3/showcontrol/fadedown", []);
//   }
//
//   hold() {
//     this.send("/d3/showcontrol/hold", []);
//   }
//
//   setVolume(volume: number) {
//     this.send("/d3/showcontrol/volume", [volume]);
//   }
//
//   setBrightness(brightness: number) {
//     this.send("/d3/showcontrol/brightness", [brightness]);
//   }
// }
//
// class MockSystemsClient {
//   constructor(baseUrl: string) {
//     console.log(`MockSystemsClient initialized with baseUrl: ${baseUrl}`);
//   }
//
//   async getAll() {
//     return detectSystemsResponseSchema.parse(
//       JSON.parse(await fs.readFile(`System_DetectSystems.json`, "utf8"))
//     );
//     // return {
//     //   status: { code: 200, message: "Success", details: [] },
//     //   result: [
//     //     {
//     //       type: "Designer",
//     //       version: { major: 1, minor: 0, hotfix: 0, revision: 0 },
//     //       hostname: "mock-host",
//     //       runningProject: "mock-project",
//     //       ipAddress: "127.0.0.1",
//     //       isDesignerRunning: true,
//     //       isServiceRunning: true,
//     //       isManagerRunning: true,
//     //       isNotchHostRunning: false,
//     //     },
//     //   ],
//     // };
//   }
//
//   async listProjects() {
//     return systemListProjectsResponseSchema.parse(
//       JSON.parse(await fs.readFile(`System_ListProjects.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: [
//         {
//           hostname: "mock-host",
//           lastProject: "mock-last-project",
//           projects: [
//             {
//               path: "/path/to/mock/project",
//               lastModified: "2023-09-06T12:00:00Z",
//               version: { major: 1, minor: 0, hotfix: 0, revision: 0 },
//             },
//           ],
//         },
//       ],
//     };
//   }
// }
//
// class MockStatusClient {
//   constructor(baseUrl: string) {
//     console.log(`MockStatusClient initialized with baseUrl: ${baseUrl}`);
//   }
//
//   async getHealth() {
//     return statusListHealthResponseSchema.parse(
//       JSON.parse(await fs.readFile(`Status_ListHealth.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: [
//         {
//           status: {
//             averageFPS: 60,
//             videoDroppedFrames: 0,
//             videoMissedFrames: 0,
//             states: [],
//           },
//           machine: {
//             uid: "mock-uid",
//             name: "mock-machine",
//             hostname: "mock-host",
//           },
//           runningAsMachine: {
//             uid: "mock-uid",
//             name: "mock-machine",
//             hostname: "mock-host",
//           },
//         },
//       ],
//     };
//   }
//
//   async getNotifications() {
//     return statusListNotificationsResponseSchema.parse(
//       JSON.parse(await fs.readFile(`Status_ListNotifications.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: [
//         {
//           machine: {
//             uid: "mock-uid",
//             name: "mock-machine",
//             hostname: "mock-host",
//           },
//           notifications: [],
//         },
//       ],
//     };
//   }
//
//   async getCurrentProject() {
//     return statusGetProjectResponseSchema.parse(
//       JSON.parse(await fs.readFile(`Status_GetProject.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: {
//         version: { major: 1, minor: 0, hotfix: 0, revision: 0 },
//         projectPath: "/path/to/mock/current/project",
//       },
//     };
//   }
//
//   async getSessionInfo() {
//     return statusGetSessionResponseSchema.parse(
//       JSON.parse(await fs.readFile(`Status_GetSession.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: {
//         isRunningSolo: false,
//         isDirectorDedicated: true,
//         actors: [
//           {
//             type: "Designer",
//             uid: "mock-actor-uid",
//             name: "mock-actor",
//             hostname: "mock-host",
//           },
//         ],
//         understudies: [],
//         director: {
//           type: "Designer",
//           uid: "mock-director-uid",
//           name: "mock-director",
//           hostname: "mock-host",
//         },
//       },
//     };
//   }
// }
//
// class MockShowControlClient {
//   constructor(baseUrl: string) {
//     console.log(`MockShowControlClient initialized with baseUrl: ${baseUrl}`);
//   }
//
//   private async setEngaged(name: string, uid: string, engaged: boolean) {
//     console.log(`Setting ${name} (${uid}) engaged: ${engaged}`);
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async engage({ name, uid }: { name: string; uid: string }) {
//     return this.setEngaged(name, uid, true);
//   }
//
//   async disengage({ name, uid }: { name: string; uid: string }) {
//     return this.setEngaged(name, uid, false);
//   }
//
//   async play({ name, uid }: { name: string; uid: string }) {
//     console.log(`Playing ${name} (${uid})`);
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async stop({ name, uid }: { name: string; uid: string }) {
//     console.log(`Stopping ${name} (${uid})`);
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async getActiveTransports() {
//     return transportGetActiveResponseSchema.parse(
//       JSON.parse(
//         await fs.readFile(`Transport_GetActiveTransports.json`, "utf8")
//       )
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: [
//         {
//           uid: "mock-transport-uid",
//           name: "mock-transport",
//           engaged: true,
//           volume: 1,
//           brightness: 1,
//           playmode: "Play",
//           currentTrack: { uid: "mock-track-uid", name: "mock-track" },
//         },
//       ],
//     };
//   }
//
//   async setBrightness({
//     brightness,
//     name,
//     uid,
//   }: {
//     brightness: number;
//     name: string;
//     uid: string;
//   }) {
//     console.log(`Setting brightness to ${brightness} for ${name} (${uid})`);
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async listTracks() {
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: [
//         {
//           uid: "mock-track-uid",
//           name: "mock-track",
//           length: 60,
//           crossfade: "Fade",
//         },
//       ],
//     };
//   }
//
//   async listAnnotations({
//     trackName,
//     trackUid,
//   }: {
//     trackName: string;
//     trackUid: string;
//   }) {
//     return transportListAnnotationsResponseSchema.parse(
//       JSON.parse(await fs.readFile(`a.json`, "utf8"))
//     );
//     return {
//       status: { code: 200, message: "Success", details: [] },
//       result: {
//         uid: trackUid,
//         name: trackName,
//         annotations: {
//           notes: [{ time: 0, text: "Mock note" }],
//           tags: [{ value: "00:00:00:00", type: "TC", time: 0 }],
//           sections: [{ time: 0, index: "1" }],
//         },
//       },
//     };
//   }
//
//   async goToNote({
//     noteText,
//     transportUid,
//     transportName,
//     playMode,
//   }: {
//     noteText: string;
//     transportUid: string;
//     transportName: string;
//     playMode?: string;
//   }) {
//     console.log(
//       `Going to note "${noteText}" on transport ${transportName} (${transportUid}), playMode: ${playMode}`
//     );
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async goToTag({
//     transportUid,
//     transportName,
//     tagValue,
//     tagType,
//     playMode,
//   }: {
//     transportUid: string;
//     transportName: string;
//     tagValue: string;
//     tagType: z.infer<typeof tagTypeEnum>;
//     playMode?: z.infer<typeof playmodeEnum>;
//   }) {
//     console.log(
//       `Going to tag ${tagValue} (${tagType}) on transport ${transportName} (${transportUid}), playMode: ${playMode}`
//     );
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
//
//   async goToFrame({
//     frame,
//     playMode,
//     name,
//     uid,
//   }: {
//     frame: number;
//     playMode: z.infer<typeof playmodeEnum>;
//     name: string;
//     uid: string;
//   }) {
//     console.log(
//       `Going to frame ${frame} on transport ${name} (${uid}), playMode: ${playMode}`
//     );
//     return { status: { code: 200, message: "Success", details: [] } };
//   }
// }
//
// class MockD3 {
//   systems: MockSystemsClient;
//   session: MockStatusClient;
//   showControl: MockShowControlClient;
//   osc: MockD3OSCClient;
//
//   constructor({
//     targetServer = "localhost",
//     targetPort = 8000,
//     receivePort = 8001,
//   }) {
//     this.systems = new MockSystemsClient(
//       `http://${targetServer}:${targetPort}`
//     );
//     this.session = new MockStatusClient(`http://${targetServer}:${targetPort}`);
//     this.showControl = new MockShowControlClient(
//       `http://${targetServer}:${targetPort}`
//     );
//     this.osc = new MockD3OSCClient({ targetServer, targetPort });
//   }
//
//   async goToTime({
//     directorUrl,
//     transportUid,
//     time,
//     playMode,
//   }: {
//     directorUrl: string;
//     transportUid: string;
//     time: string;
//     playMode?: string;
//   }) {
//     console.log(
//       `Going to time ${time} on transport ${transportUid}, playMode: ${playMode}`
//     );
//     return new Response(null, { status: 200 });
//   }
//
//   async goToTimeCode({
//     directorUrl,
//     transportUid,
//     timeCode,
//     playMode,
//   }: {
//     directorUrl: string;
//     transportUid: string;
//     timeCode: string;
//     playMode?: string;
//   }) {
//     console.log(
//       `Going to timecode ${timeCode} on transport ${transportUid}, playMode: ${playMode}`
//     );
//     return new Response(null, { status: 200 });
//   }
//
//   async goToTrack({
//     directorUrl,
//     transportUid,
//     trackUid,
//     playMode,
//   }: {
//     directorUrl: string;
//     transportUid: string;
//     trackUid: string;
//     playMode?: string;
//   }) {
//     console.log(
//       `Going to track ${trackUid} on transport ${transportUid}, playMode: ${playMode}`
//     );
//     return new Response(null, { status: 200 });
//   }
// }
//
// export { MockD3 };
