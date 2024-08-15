import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./db/schema.ts",
  dialect: 'sqlite',
  out: 'drizzle',
  dbCredentials: {
    url: "./db/db.sqlite"
  }
})