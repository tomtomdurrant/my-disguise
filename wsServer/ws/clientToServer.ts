import { D3 } from "d3-disguise-sdk";
import { Logger } from "../../lib/logging";
import { Socket } from "socket.io";

// export function createClientToServerEvents(
//   logger: Logger,
//   socket: Socket,
//   d3: D3
// ) {
//   return {
//     powerOn: (arg0: any) => {
//       console.log("Power On:", arg0);
//     },
//     disengage: (arg0: any) => {
//       console.log("Disengage:", arg0);
//     },
//     "/session/transport/engage": (data: "engage" | "disengage") => {
//       if (data === "engage") {
//         d3.showControl.engage("");
//       } else {
//         d3.showControl.disengage();
//       }
//     },
//     "/d3/showcontrol/cue": (data: string) => {
//       console.log("Show Control Cue:", data);
//     },
//     "/d3/showcontrol/play": () => {
//       console.log("Show Control Play");
//     },
//     "/d3/showcontrol/playsection": () => {
//       console.log("Show Control Play Section");
//     },
//     "/d3/showcontrol/loop": () => {
//       console.log("Show Control Loop");
//     },
//     "/d3/showcontrol/stop": () => {
//       console.log("Show Control Stop");
//     },
//     "/d3/showcontrol/previoussection": () => {
//       console.log("Show Control Previous Section");
//     },
//     "/d3/showcontrol/nextsection": () => {
//       console.log("Show Control Next Section");
//     },
//     "/d3/showcontrol/returntostart": () => {
//       console.log("Show Control Return to Start");
//     },
//     "/d3/showcontrol/gotonote": (trackUid: string, noteText: string) => {
//       d3.showControl.goToNote({
//         noteText,
//         transportUid: trackUid,
//         playMode: "PlaySection",
//         transportName: "default",
//       });
//     },
//     disconnect: () => {
//       logger.info("ws", `WebSocket client disconnected: ${socket.id}`);
//     },
//   } as const;
// }

// export type ClientToServerEvents = ReturnType<
//   typeof createClientToServerEvents
// >;
