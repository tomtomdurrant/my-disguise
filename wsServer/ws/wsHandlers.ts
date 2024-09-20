import { D3 } from "d3-disguise-sdk";
import type { SocketIOServer } from "./types";
import { Logger } from "../../lib/logging";
export function setupWebSocketHandlers(
  io: SocketIOServer,
  d3: D3,
  logger: Logger
) {
  io.on("connection", (socket) => {
    // # Do not do this it is too clever
    // const clientToServerEvents = createClientToServerEvents(logger, socket, d3);
    // logger.info("ws", `WebSocket client connected: ${socket.id}`);
    // for (const [key, value] of Object.entries(clientToServerEvents)) {
    //   socket.on(key as keyof ClientToServerEvents, value);
    // }
    socket.on("/session/transport/engage", (data) => {
      try {
        d3.showControl.engage({
          uid: data,
        });
      } catch (error) {
        logger.error("osc", `Error engaging transport: ${error}`);
      }
    });
    socket.on("/session/transport/disengage", (data) => {
      try {
        d3.showControl.disengage({
          uid: data,
        });
      } catch (error) {
        logger.error("osc", `Error disengaging transport: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/cue", (cueNumber) => {
      const values = cueNumber
        .split(".")
        .map((x) => parseInt(x, 10))
        .filter((x) => !Number.isNaN(x));
      logger.debug("osc", `triggering cue ${values.join(".")}`);
      try {
        d3.osc.setCue(cueNumber);
      } catch (error) {
        logger.error("osc", `Error setting cue: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/play", () => {
      logger.debug("osc", `setting d3 status to play`);
      try {
        d3.osc.play();
      } catch (error) {
        logger.error("osc", `Error playing: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/playsection", () => {
      logger.debug("osc", `setting d3 status to play section`);
      try {
        d3.osc.playToEndOfSection();
      } catch (error) {
        logger.error("osc", `Error playing to end of section: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/loop", () => {
      logger.debug("osc", `setting d3 status to loop`);
      try {
        d3.osc.loopSection();
      } catch (error) {
        logger.error("osc", `Error looping section: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/stop", () => {
      logger.debug("osc", `setting d3 status to play section`);
      try {
        d3.osc.stop();
      } catch (error) {
        logger.error("osc", `Error stopping: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/previoussection", () => {
      logger.debug("osc", `setting d3 status to previous section`);
      try {
        d3.osc.previousSection();
      } catch (error) {
        logger.error("osc", `Error going to previous section: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/nextsection", () => {
      logger.debug("osc", `setting d3 status to previous section`);
      try {
        d3.osc.nextSection();
      } catch (error) {
        logger.error("osc", `Error going to next section: ${error}`);
      }
    });
    socket.on("/d3/showcontrol/returntostart", () => {
      logger.debug("osc", `setting d3 status to return to start`);
      try {
        d3.osc.returnToStart();
      } catch (error) {
        logger.error("osc", `Error returning to start: ${error}`);
      }
    });

    socket.on(
      "/d3/showcontrol/gotonote",
      (trackUid, noteText, transportName) => {
        logger.debug("osc", `setting d3 status to go to note ${noteText}`);
        try {
          d3.showControl.goToNote({
            noteText,
            transportUid: trackUid,
            playMode: "PlaySection",
            transportName,
          });
        } catch (error) {
          logger.error("osc", `Error going to note: ${error}`);
        }
      }
    );
    socket.on(
      "/d3/showcontrol/gototag",
      async (transportUid, noteText, transportName) => {
        logger.debug("osc", `setting d3 status to go to note`);
        try {
          await d3.showControl.goToNote({
            transportName,
            transportUid,
            noteText,
            playMode: "PlaySection",
          });
        } catch (error) {
          logger.error("osc", `Error going to tag: ${error}`);
        }
      }
    );
    // socket.on("error", (error) => {
    //   io.emit("error", error);
    // });

    socket.emit("confirmation", "connected!");
  });
}
