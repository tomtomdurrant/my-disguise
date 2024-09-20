import {
  SystemsResponse,
  SessionResponse,
  TransportListTracksResponse,
  TransportListAnnotations,
  ActiveTransport,
  HealthResponse,
  ListProjectsResponse,
} from "~/lib/disguise/schemas";
import { Logger } from "../../lib/logging";

export type ServerToClientEvents = ReturnType<
  typeof createServerToClientEvents
>;
export function createServerToClientEvents(logger: Logger) {
  return {
    systems: (systems: SystemsResponse) => {
      logger.debug("ws", "Systems:");
    },
    session: (session: SessionResponse) => {
      logger.debug("ws", "Session:");
    },
    tracks: (tracks: TransportListTracksResponse) => {
      logger.debug("ws", "Tracks:");
    },
    annotations: (annotations: Array<TransportListAnnotations>) => {
      logger.debug("ws", "Annotations:");
    },
    active: (active: ActiveTransport) => {
      logger.debug("ws", "Active:");
    },
    health: (health: HealthResponse) => {
      logger.debug("ws", "Health:");
    },
    projects: (projects: ListProjectsResponse) => {
      logger.debug("ws", "Projects:");
    },
    confirmation: (confirmation: "connected!") => {
      logger.debug("ws", "Confirmation:");
    },
    engageStatus: (status: "engaged" | "disengaged") => {
      logger.debug("ws", "Engage Status:");
    },
    osc_trackposition: (data: string | number) => {
      logger.debug("ws", "Track Position:");
    },
    osc_timecodeposition: (data: string) => {
      logger.debug("ws", "Timecode Position:");
    },
    osc_sectionhint: (data: string) => {
      logger.debug("ws", "Section Hint:");
    },
    osc_heartbeat: (data: number) => {
      logger.debug("ws", "Heartbeat:");
    },
    osc_trackname: (data: string) => {
      logger.debug("ws", "Track Name:");
    },
    osc_currentsectionname: (data: string) => {
      logger.debug("ws", "Current Section Name:");
    },
    osc_nextsectionname: (data: string) => {
      logger.debug("ws", "Next Section Name:");
    },
    osc_playmode: (data: string) => {
      logger.debug("ws", "Play Mode:");
    },
    osc_brightness: (data: string) => {
      logger.debug("ws", "Brightness:");
    },
    osc_volume: (data: string) => {
      logger.debug("ws", "Volume:");
    },
    osc_bpm: (data: string) => {
      logger.debug("ws", "BPM:");
    },
  } as const;
}
