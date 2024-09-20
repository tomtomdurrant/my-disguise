import * as z from "zod";
import { logger } from "./index";
import { Server as OscServer } from "node-osc";
import { Server as SocketIOServer } from "socket.io";

// Define the OSC message types
const OSCAddressPattern = z.enum([
  "/d3/showcontrol/trackposition",
  "/d3/showcontrol/timecodeposition",
  "/d3/showcontrol/sectionhint",
  "/d3/showcontrol/heartbeat",
  "/d3/showcontrol/trackname",
  "/d3/showcontrol/currentsectionname",
  "/d3/showcontrol/nextsectionname",
  "/d3/showcontrol/playmode",
  "/d3/showcontrol/volume",
  "/d3/showcontrol/brightness",
  "/d3/showcontrol/bpm",
]);
const oscMessageSchema = z.tuple([
  OSCAddressPattern,
  z.union([z.string(), z.number()]),
]);
// Define the schema for the lastSentValues object
const lastSentValuesSchema = z.object({
  trackposition: z.string().nullable(),
  timecodeposition: z.string().nullable(),
  sectionhint: z.string().nullable(),
  heartbeat: z.number().nullable(),
  trackname: z.string().nullable(),
  currentsectionname: z.string().nullable(),
  nextsectionname: z.string().nullable(),
  playmode: z.string().nullable(),
  volume: z.string().nullable(),
  brightness: z.string().nullable(),
  bpm: z.string().nullable(),
});

// Type for the lastSentValues object
export type LastSentValues = z.infer<typeof lastSentValuesSchema>;

export const lastSentValues: LastSentValues = {
  trackposition: null,
  timecodeposition: null,
  sectionhint: null,
  heartbeat: null,
  trackname: null,
  currentsectionname: null,
  nextsectionname: null,
  playmode: null,
  brightness: null,
  volume: null,
  bpm: null,
};

export function setupOscHandlers(oscServer: OscServer, io: SocketIOServer) {
  oscServer.on("message", function (msg) {
    const validatedMsg = oscMessageSchema.parse(msg);
    const [address, value] = validatedMsg;
    const cleanKey = address.split("/").pop() as keyof LastSentValues; // Remove '/d3/showcontrol/' prefix
    if (cleanKey === "heartbeat") {
      return;
    }
    if (lastSentValues[cleanKey] != value) {
      logger.debug("osc", `${cleanKey} value has changed. Emitting`);

      lastSentValues[cleanKey] = value as any;

      try {
        io.emit(`osc_${cleanKey}`, value);
      } catch (error) {}
    }
  });
}
export type OscEventsKey = `osc_${keyof typeof lastSentValues}`;
