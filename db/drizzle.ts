import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { oscCommands } from "~/db/schema";

const sqlite = new Database('./db/db.sqlite');
export const db = drizzle(sqlite);
