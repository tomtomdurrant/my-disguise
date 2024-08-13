import * as fs from "node:fs/promises";

export default defineEventHandler(async () => {
  const commandsHandle = await fs.readFile("commands.json", "utf-8");
  console.log(commandsHandle);
  return JSON.parse(commandsHandle) as Array<{
    address: string;
    args: string[];
  }>;
});
