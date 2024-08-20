import { db } from "~/db/drizzle";
import { oscCommands } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Client, Message } from "node-osc";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const command = await db.select().from(oscCommands).where(eq(oscCommands.id, body.commandId));
  console.log(command[0]);
  const oscClient = new Client(command[0].targetIp, command[0].targetPort);
  const args = JSON.parse(command[0].args);
  // if you pass the args in to the message, any numbers are interpreted as floats
  const message = new Message(command[0].address);
  for (const arg of args) {
    message.append(arg.value);
  }
  console.log(message);
  oscClient.send(message);
});
