import "@total-typescript/ts-reset";

import express from "express";
import http from "node:http";
import { Server as SocketIOServer } from "socket.io";
import { Server as OscServer } from "node-osc";
import { D3 } from "d3-disguise-sdk";
import { Logger } from "../lib/logging";
import { readConfig } from "./config";
import { setupWebSocketHandlers } from "./ws/wsHandlers";
import { setupExpress } from "./httpServer";
import { setupOscHandlers } from "./oscHandlers";
import type { ClientToServerEvents, ServerToClientEvents } from "./ws/types";
// import { DefaultEventsMap } from "socket.io/dist/typed";
import { setupPolling } from "./ws/polling";
// import { MockD3 } from "./mockD3";

interface ServerComponents {
  httpServer: http.Server;
  io: SocketIOServer;
  oscServer: OscServer;
  d3: D3;
}
const config = readConfig();
export const logger = new Logger({
  level: config.logging.level ?? "debug",
});
logger.silly("server", "Using config", config);

function createExpressApp(): express.Application {
  return express();
}

function createHttpServer(app: express.Application): http.Server {
  return http.createServer(app);
}

function createSocketIOServer(httpServer: http.Server): SocketIOServer {
  return new SocketIOServer<
    ClientToServerEvents,
    ServerToClientEvents,
    any, any
    // DefaultEventsMap,
    // any
  >(httpServer, {
    cors: {
      origin: "*",
    },
  });
}

function createOscServer(): OscServer {
  return new OscServer(config.oscServer.port, config.oscServer.host, () => {
    logger.info(
      "osc",
      "OSC Server is listening on port " + config.oscServer.port
    );
  });
}

function createD3Instance(): D3 {
  // return new MockD3({ receivePort: 0, targetPort: 0, targetServer: "" });
  return new D3({
    targetServer: config.d3Servers[0].host,
    targetPort: config.d3Servers[0].oscPort,
  });
}
function setupShutdownHandler(components: ServerComponents) {
  process.on("SIGINT", () => {
    logger.info("server", "SIGINT received, shutting down");
    components.httpServer.close(() => {
      logger.info("server", "HTTP server closed");
    });
    components.io.close(() => {
      logger.info("ws", "Socket.IO server closed");
    });
    components.oscServer.close(() => {
      logger.info("osc", "OSC server closed");
    });
    process.exit(0);
  });
}

async function main() {
  const app = createExpressApp();
  const httpServer = createHttpServer(app);
  const io = createSocketIOServer(httpServer);
  const oscServer = createOscServer();
  const d3 = createD3Instance();
  setupExpress(app);
  setupWebSocketHandlers(io, d3, logger);
  setupOscHandlers(oscServer, io);
  setupPolling(io, d3, 1000);

  setupShutdownHandler({
    d3,
    io,
    oscServer,
    httpServer,
  });
  httpServer.listen(config.httpServer.port, config.httpServer.host, () => {
    logger.info(
      "server",
      `Server is listening on http://${config.httpServer.host}:${config.httpServer.port}`
    );
  });
}

main().catch((err) => {
  logger.error("server", err.message);
  process.exit(1);
});
