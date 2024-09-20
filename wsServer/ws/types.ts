// import { DefaultEventsMap } from "node_modules/socket.io/dist/typed-events";
import { Server, Socket } from "socket.io";
import type {
  SystemsResponse,
  SessionResponse,
  TransportListTracksResponse,
  TransportListAnnotations,
  ActiveTransport,
  HealthResponse,
  ListProjectsResponse,
} from "../../lib/disguise/schema";

export interface ServerToClientEvents {
  systems: (systems: SystemsResponse) => void;
  session: (session: SessionResponse) => void;
  tracks: (tracks: TransportListTracksResponse) => void;
  annotations: (annotations: Array<TransportListAnnotations>) => void;
  active: (active: ActiveTransport) => void;
  health: (health: HealthResponse) => void;
  projects: (projects: ListProjectsResponse) => void;
  confirmation: (confirmation: "connected!") => void;
  engageStatus: (status: "engaged" | "disengaged") => void;
  osc_trackposition: (data: string | number) => void;
  osc_timecodeposition: (data: string) => void;
  osc_sectionhint: (data: string) => void;
  osc_heartbeat: (data: number) => void;
  osc_trackname: (data: string) => void;
  osc_currentsectionname: (data: string) => void;
  osc_nextsectionname: (data: string) => void;
  osc_playmode: (data: string) => void;
  osc_brightness: (data: string) => void;
  osc_volume: (data: string) => void;
  osc_bpm: (data: string) => void;
  timer: (time: string) => void;
}
export interface ClientToServerEvents {
  powerOn: (data: any) => void;
  disengage: (data: any) => void;
  "/session/transport/engage": (uid: string) => void;
  "/session/transport/disengage": (uid: string) => void;
  "/d3/showcontrol/cue": (cueNumber: string) => void;
  "/d3/showcontrol/play": () => void;
  "/d3/showcontrol/playsection": () => void;
  "/d3/showcontrol/loop": () => void;
  "/d3/showcontrol/stop": () => void;
  "/d3/showcontrol/previoussection": () => void;
  "/d3/showcontrol/nextsection": () => void;
  "/d3/showcontrol/returntostart": () => void;
  "/d3/showcontrol/gotonote": (
    transportUid: string,
    noteText: string,
    transportName: string
  ) => void;
  "/d3/showcontrol/gototag": (
    transportUid: string,
    noteText: string,
    transportName: string
  ) => void;
  disconnect: () => void;
}
export type SocketIOServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  // DefaultEventsMap,
  any
>;
