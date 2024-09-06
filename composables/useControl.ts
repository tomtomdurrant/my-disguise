import { settings } from "~/lib/settings";
// import { socket } from "~/lib/ws/socket";
import { toast } from "~/components/ui/toast";

export const useControl = () => {
  const { $socket } = useNuxtApp();

  function engage(uid: string) {
    if (settings.safeMode) {
      toast({
        title: "Safe mode is enabled",
        variant: "destructive",
      });
    } else {
      $socket.emit("/session/transport/engage", uid);
    }
  }

  function disengage(uid: string) {
    if (settings.safeMode) {
      toast({
        title: "Safe mode is enabled",
        variant: "destructive",
      });
    } else {
      $socket.emit("/session/transport/disengage", uid);
    }
  }

  function goToCue(cueNumber: string) {
    $socket.emit("/d3/showcontrol/cue", cueNumber);
  }

  function play() {
    $socket.emit("/d3/showcontrol/play");
  }

  function playSection() {
    $socket.emit("/d3/showcontrol/playsection");
  }

  function loopSection() {
    $socket.emit("/d3/showcontrol/loop");
  }

  function stop() {
    $socket.emit("/d3/showcontrol/stop");
  }

  function previousSection() {
    $socket.emit("/d3/showcontrol/previoussection");
  }

  function nextSection() {
    $socket.emit("/d3/showcontrol/nextsection");
  }

  function returnToStart() {
    $socket.emit("/d3/showcontrol/returntostart");
  }

  function goToNote(trackUid: string, noteText: string) {
    $socket.emit("/d3/showcontrol/gotonote", trackUid, noteText);
  }

  function goToTag() {
    // $socket.emit('/d3/showcontrol/gototag', )
  }

  return {
    engage,
    goToTag,
    goToNote,
    disengage,
    goToCue,
    play,
    playSection,
    loopSection,
    stop,
    previousSection,
    nextSection,
    returnToStart,
  };
};

// export * as Control from "./useControl";

// const app = useNuxtApp();
// console.log(app);

// export function engage(uid: string) {
//   if (settings.safeMode) {
//     toast({
//       title: "Safe mode is enabled",
//       variant: "destructive",
//     });
//   } else {
//     socket.emit("/session/transport/engage", uid);
//   }
// }

//
// export function disengage(uid: string) {
//   if (settings.safeMode) {
//     toast({
//       title: "Safe mode is enabled",
//       variant: "destructive",
//     });
//   } else {
//     socket.emit("/session/transport/disengage", uid);
//   }
// }
//
// export function goToCue(cueNumber: string) {
//   socket.emit("/d3/showcontrol/cue", cueNumber);
// }
//
// export function play() {
//   socket.emit("/d3/showcontrol/play");
// }
//
// export function playSection() {
//   socket.emit("/d3/showcontrol/playsection");
// }
//
// export function loopSection() {
//   socket.emit("/d3/showcontrol/loop");
// }
//
// export function stop() {
//   socket.emit("/d3/showcontrol/stop");
// }
//
// export function previousSection() {
//   socket.emit("/d3/showcontrol/previoussection");
// }
//
// export function nextSection() {
//   socket.emit("/d3/showcontrol/nextsection");
// }
//
// export function returnToStart() {
//   socket.emit("/d3/showcontrol/returntostart");
// }
//
// export function goToNote(trackUid: string, noteText: string) {
//   socket.emit("/d3/showcontrol/gotonote", trackUid, noteText);
// }
//
// export function goToTag() {
//   // socket.emit('/d3/showcontrol/gototag', )
// }
