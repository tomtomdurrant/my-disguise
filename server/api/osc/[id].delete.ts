import { db } from "~/db/drizzle";
import { oscCommands } from "~/db/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw new Error("No id provided");
  }
  console.log("deleting id", id);
  await db.delete(oscCommands).where(eq(oscCommands.id, id));
});
