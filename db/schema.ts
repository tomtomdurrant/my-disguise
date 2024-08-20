import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const oscCommands = sqliteTable("oscCommands", {
  id: integer("id").primaryKey(),
  title: text("title"),
  notes: text("description"),
  targetIp: text("targetIp"),
  targetPort: integer("targetPort"),
  targetMachineName: text("targetMachineName"),
  address: text("address"),
  args: text("args", {
    mode: "json",
  }),
  created: text("created")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export type InsertOscCommand = typeof oscCommands.$inferInsert;
//   args: Array<{
//     type: string;
//     value: string;
//   }>
// }
export type SingleOscCommand = typeof oscCommands.$inferSelect;
