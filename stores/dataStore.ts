import { io, Socket } from "socket.io-client";
import type { ClientToServerEvents, HttpData, OscData, ServerToClientEvents, SocketStateType } from "~/lib/ws/types";
import { toast } from "~/components/ui/toast";
import { addError } from "~/lib/errorStore";
import { defineStore } from "pinia";
import { consolidateSystemInfo } from "~/lib/disguise/consolidate";

type State = {
  httpData: HttpData;
  oscData: OscData;
  section: {
    current: string | null;
    next: string | null;
  };
  inSession: boolean;
};

export const useDataStore = defineStore("data", {
  state: (): State => ({
    httpData: {
      active: null,
      time: null,
      systems: null,
      session: null,
      tracks: null,
      annotations: null,
      health: null,
      projects: null,
    },
    oscData: {
      osc_trackposition: null,
      osc_timecodeposition: null,
      osc_sectionhint: null,
      osc_heartbeat: null,
      osc_trackname: null,
      osc_currentsectionname: null,
      osc_brightness: null,
    },
    section: {
      current: null,
      next: null,
    },
    inSession: false,
  }),
  getters: {
  },
  actions: {},
});

// socket.on("error", (error) => {
//   toast({
//     title: "Error",
//     description: error,
//     variant: "destructive",
//   });
// });
