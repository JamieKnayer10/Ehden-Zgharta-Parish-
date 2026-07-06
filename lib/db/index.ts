import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// search_path resolves Better Auth's unqualified tables (user/account/session/
// verification) to the Neon-managed `neon_auth` schema, while the app's own
// content tables continue to resolve from `public`.
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  options: "-c search_path=neon_auth,public",
})
export const db = drizzle(pool, { schema })
