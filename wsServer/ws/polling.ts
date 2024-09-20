import { Server as SocketIOServer } from "socket.io";
import { D3 } from "d3-disguise-sdk";
import { logger } from "../index";
import { readFileSync } from "node:fs";
import * as fs from "node:fs/promises";
// import {
//   detectSystemsResponseSchema,
//   statusGetSessionResponseSchema,
// } from "~/lib/disguise/schemas";

type PollingFunction = (io: SocketIOServer, d3: D3) => Promise<void>;

const createPollingFunction = <T>(
  fetchFunction: (d3: D3) => Promise<T>,
  emitEvent: string,
  errorMessage: string
): PollingFunction => {
  return async (io: SocketIOServer, d3: D3) => {
    try {
      const data = await fetchFunction(d3);
      io.emit(emitEvent, data);
    } catch (error) {
      logger.error("ws", `${errorMessage}`, error);
    }
  };
};

export const pollSystems: PollingFunction = createPollingFunction(
  async (d3) => {
    const systems = await d3.systems.getAll();
    // const systems = detectSystemsResponseSchema.parse(
    //   JSON.parse(await fs.readFile(`System_DetectSystems.json`, "utf8"))
    // );

    logger.debug("ws", "Retrieved system information");
    logger.silly("ws", `Retrieved Systems`, systems);
    return systems;
  },
  "systems",
  "Failed to retrieve systems"
);

export const pollSession: PollingFunction = createPollingFunction(
  async (d3) => {
    // const session = statusGetSessionResponseSchema.parse(
    //   JSON.parse(await fs.readFile(`Status_GetSession.json`, "utf8"))
    // );

    const session = await d3.session.getSessionInfo();
    logger.debug("ws", "Retrieved session");
    logger.silly("ws", "Retrieved Session", session);
    return session;
  },
  "session",
  "Failed to retrieve session"
);

export const pollTracks: PollingFunction = createPollingFunction(
  async (d3) => {
    const tracks = await d3.showControl.listTracks();
    logger.debug("ws", "Retrieved tracks");
    logger.silly("ws", "Retrieved Tracks", tracks);
    return tracks;
  },
  "tracks",
  "Failed to retrieve tracks"
);

export const pollActiveTransports: PollingFunction = createPollingFunction(
  async (d3) => {
    const activeTransports = await d3.showControl.getActiveTransports();
    logger.debug("ws", "Retrieved active transports");
    logger.silly("ws", "Retrieved Active Transports", activeTransports);
    return activeTransports;
  },
  "active",
  "Failed to get active showControl"
);

export const pollHealth: PollingFunction = createPollingFunction(
  async (d3) => {
    const health = await d3.session.getHealth();
    logger.debug("ws", "Retrieved health");
    logger.silly("ws", "Retrieved health info", health);
    return health;
  },
  "health",
  "Failed to get health"
);

export const pollProjects: PollingFunction = createPollingFunction(
  async (d3) => {
    const projects = await d3.systems.listProjects();
    logger.debug("ws", "Retrieved projects");
    logger.silly("ws", "Retrieved projects", projects);
    return projects;
  },
  "projects",
  "Failed to list projects"
);

export const pollAnnotations: PollingFunction = async (
  io: SocketIOServer,
  d3: D3
) => {
  try {
    const tracks = await d3.showControl.listTracks();
    const annotations = await Promise.all(
      tracks.result.map(async (track) => {
        return d3.showControl.listAnnotations({
          trackName: track.name,
          trackUid: track.uid,
        });
      })
    );
    io.emit("annotations", annotations);
  } catch (error) {
    logger.error("ws", `Failed to retrieve annotations`, error);
  }
};

export function setupPolling(
  io: SocketIOServer,
  d3: D3,
  interval: number
): void {
  const pollingFunctions: PollingFunction[] = [
    pollSystems,
    pollSession,
    pollTracks,
    pollActiveTransports,
    pollHealth,
    pollProjects,
    pollAnnotations,
  ];

  pollingFunctions.forEach((func) => {
    setInterval(() => func(io, d3), interval);
  });
}
