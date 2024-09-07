import type {
  StatusGetSessionResponse,
  DetectSystemsResponse,
  StatusListHealthResponse,
  ConsolidatedInfo,
  ConsolidatedSystemInfo,
} from "./types";
import { detailsArraySchema } from "./utils";
import { z } from "zod"; // Add this import

// Define a type for the common system properties
type CommonSystemProps = {
  uid: string;
  name: string;
  hostname: string;
  type: string;
};

// Create a more specific type for the role
type SystemRole = "director" | "actor" | "understudy";

export function consolidateSystemInfo(
  sessionResponse: StatusGetSessionResponse,
  systemsResponse: DetectSystemsResponse,
  healthResponse: StatusListHealthResponse
): ConsolidatedInfo {
  const systemsMap = new Map(systemsResponse.result.map((s) => [s.hostname.toLowerCase(), s]));
  const healthMap = new Map(healthResponse.result.map((h) => [h.machine.hostname.toLowerCase(), h]));

  function findSoloSystem(): ConsolidatedSystemInfo | null {
    const soloSystem = systemsResponse.result.find((s) => s.isDesignerRunning);
    if (soloSystem == null) {
      return null;
    }
    const processed = processSystem(
      {
        uid: soloSystem.hostname,
        name: soloSystem.hostname,
        hostname: soloSystem.hostname,
        type: soloSystem.type,
      },
      "director"
    );
    return processed;
  }

  function processSystem(system: CommonSystemProps, role: SystemRole): ConsolidatedSystemInfo {
    const lowercaseHostname = system.hostname.toLowerCase();
    const systemInfo = systemsMap.get(lowercaseHostname);
    const healthInfo = healthMap.get(lowercaseHostname);

    const getFilteredDetails = (response: { status: { details: unknown } }) =>
      detailsArraySchema.parse(response.status.details).filter((d) => d.uid === system.hostname);

    const sessionDetails = getFilteredDetails(sessionResponse);
    const systemDetails = getFilteredDetails(systemsResponse);
    const healthDetails = getFilteredDetails(healthResponse);

    // TODO this is a mess.
    // if we don't have the system info then there should be an error response in the details

    const sys = systemInfo
      ? {
          version: systemInfo.version,
          ipAddress: systemInfo.ipAddress,
          runningProject: systemInfo.runningProject,
          isDesignerRunning: systemInfo.isDesignerRunning,
          isServiceRunning: systemInfo.isServiceRunning,
          isManagerRunning: systemInfo.isManagerRunning,
          isNotchHostRunning: systemInfo.isNotchHostRunning,
        }
      : {
          systemError: "something went wrong with the system info",
        };

    const healthy = healthInfo
      ? {
          health: {
            averageFPS: healthInfo.status.averageFPS,
            videoDroppedFrames: healthInfo.status.videoDroppedFrames,
            videoMissedFrames: healthInfo.status.videoMissedFrames,
            states: healthInfo.status.states,
          },
        }
      : {
          health: {
            error: "something went wrong with the health info",
          },
        };
    return {
      ...system,
      role,
      ...sys,
      ...healthy,
      status: {
        message: [sessionResponse.status.message, systemsResponse.status.message, healthResponse.status.message]
          .filter(Boolean)
          .join("; "),
        details: [...sessionDetails, ...systemDetails, ...healthDetails],
      },
    };
  }

  if (sessionResponse.result.isRunningSolo) {
    const soloSystem = findSoloSystem();
    if (soloSystem == null) {
      throw new Error("Solo system not found even though session is running solo");
    }
    return {
      director: {
        ...soloSystem,
        isDirectorDedicated: false,
      },
      actors: [],
      understudies: [],
      isRunningSolo: true,
    };
  }

  const director = processSystem(sessionResponse.result.director!, "director");
  const actors = sessionResponse.result.actors.map((a) => processSystem(a, "actor"));
  const understudies = sessionResponse.result.understudies.map((u) => processSystem(u, "understudy"));
  return {
    director: {
      ...director,
      isDirectorDedicated: sessionResponse.result.isDirectorDedicated,
    },
    actors,
    understudies,
    isRunningSolo: false,
  };
}
