import { settings } from "~/lib/settings";
import { socket } from "~/lib/ws/socket";

export * as Control from "./control";

function engageStatus(setEngage: boolean) {
  console.log(setEngage);
  if (settings.safeMode) {
    alert("safe mode is enabled");
  } else {
    socket.emit("/session/transport/engage", setEngage ? "engage" : "disengage");
  }
}

export function engage() {
  if (settings.safeMode) {
    alert("safe mode is enabled");
  } else {
    socket.emit("/session/transport/engage", "engage");
  }
}

export function disengage() {
  if (settings.safeMode) {
    alert("safe mode is enabled");
  } else {
    socket.emit("/session/transport/engage", "disengage");
  }
}

export function goToCue(cueNumber: string) {
  socket.emit("/d3/showcontrol/cue", cueNumber);
}

export async function goToNote(trackUid: string, noteText: string) {
  const res = await fetch("http://192.168.0.18/api/session/transport/gotonote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transports: [
        {
          transport: {
            uid: trackUid,
          },
          note: noteText,
          playmode: "Play",
        },
      ],
    }),
  });
  console.log(res);
  const body = await res.json();
  console.log(body);

}

export function play() {
  socket.emit("/d3/showcontrol/play");
}

export function playSection() {
  socket.emit("/d3/showcontrol/playsection");
}

export function loopSection() {
  socket.emit("/d3/showcontrol/loop");
}

export function stop() {
  socket.emit("/d3/showcontrol/stop");
}

export function previousSection() {
  socket.emit("/d3/showcontrol/previoussection");
}

export function nextSection() {
  socket.emit("/d3/showcontrol/nextsection");
}

export function returnToStart() {
  socket.emit("/d3/showcontrol/returntostart");
}
