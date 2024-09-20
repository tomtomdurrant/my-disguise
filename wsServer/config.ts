import * as fs from "node:fs";
import * as path from "node:path";
import * as z from "zod";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const d3Config = z.object({ host: z.string(), oscPort: z.number() });
const httpServerConfig = z.object({ port: z.number(), host: z.string() });
const oscServerConfig = z.object({ port: z.number(), host: z.string() });
const loggingConfig = z.object({
  level: z.enum(["debug", "silly", "error", "warn", "info"]),
});

export const schema = z.object({
  d3Servers: z.array(d3Config),
  httpServer: httpServerConfig,
  oscServer: oscServerConfig,
  logging: loggingConfig,
});

export type Config = z.infer<typeof schema>;

export function readConfig() {
  const config = fs.readFileSync(
    path.resolve(__dirname, "../config.json"),
    "utf-8"
  );
  return schema.parse(JSON.parse(config));
}
