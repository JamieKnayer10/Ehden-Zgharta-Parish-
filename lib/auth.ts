import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { randomUUID } from "crypto"
import { pool } from "@/lib/db"

const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined
const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined
const runtimeUrl = process.env.V0_RUNTIME_URL

const baseURL =
  process.env.BETTER_AUTH_URL ?? productionUrl ?? vercelUrl ?? runtimeUrl

const trustedOrigins = Array.from(
  new Set(
    [runtimeUrl, vercelUrl, productionUrl, process.env.BETTER_AUTH_URL].filter(
      Boolean,
    ) as string[],
  ),
)

export const auth = betterAuth({
  baseURL,
  trustedOrigins,
  database: pool,
  emailAndPassword: {
    enabled: true,
    // Only an authenticated admin can create accounts (via the dashboard).
    // Public self sign-up is disabled.
    disableSignUp: true,
  },
  plugins: [admin()],
  advanced: {
    // The neon_auth.user.id column is a UUID, so ids must be valid UUIDs.
    database: {
      generateId: () => randomUUID(),
    },
    ...(process.env.NODE_ENV === "development"
      ? {
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        }
      : {}),
  },
})
