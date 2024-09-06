// stores/socket.ts
import { defineStore } from "pinia";

interface State {
  connected: boolean;
  errors: string[];
  transport: string;
  lastMessageTime: Date | null;
}

export const useSocketStore = defineStore("socket", {
  state: (): State => ({
    connected: false,
    errors: [],
    transport: "N/A",
    lastMessageTime: null,
  }),
  actions: {
    addError(error: string) {
      this.errors.push(error);
    },
  },
});
