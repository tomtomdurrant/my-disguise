import * as fs from "node:fs/promises";
import { db } from "~/db/drizzle";
import { SingleOscCommand, oscCommands } from "~/db/schema";

export default defineEventHandler(async (event) => {
  const commands: SingleOscCommand[] = db.select().from(oscCommands).all();
  // const commandsHandle = await fs.readFile("commands.json", "utf-8");
  // return JSON.parse(commandsHandle) as Array<{
  //   address: string;
  //   args: Array<{
  //     type: string;
  //     value: string;
  //   }>;
  // }>;
  return commands.map((command) => {
    command.args = JSON.parse(command.args);
    return command;
  });
});
