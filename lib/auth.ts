import { betterAuth } from "better-auth"
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
  },
  ...(process.env.NODE_ENV === "development"
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: "none" as const,
            secure: true,
          },
        },
      }
    : {}),
})
