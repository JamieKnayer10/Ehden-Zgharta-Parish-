/**
 * One-time bootstrap: create the first parish administrator.
 *
 * Public sign-up is disabled, so this seeds the initial admin directly through
 * Better Auth's server context (correct password hashing + linked credential
 * account). After this, that admin can create more users from the dashboard.
 *
 * Requires BETTER_AUTH_SECRET and DATABASE_URL to be set. Run with:
 *   set -a && source /vercel/share/.env.project && set +a && \
 *     npx tsx scripts/create-admin.ts <email> <password> "<name>"
 */
import { auth } from "@/lib/auth"

async function main() {
  const [email, password, name = "Parish Administrator"] = process.argv.slice(2)

  if (!email || !password) {
    console.error(
      'Usage: npx tsx scripts/create-admin.ts <email> <password> "<name>"',
    )
    process.exit(1)
  }
  if (password.length < 8) {
    console.error("Password must be at least 8 characters.")
    process.exit(1)
  }

  const ctx = await auth.$context

  const existing = await ctx.internalAdapter.findUserByEmail(email)
  if (existing?.user) {
    console.log(`User ${email} already exists — nothing to do.`)
    process.exit(0)
  }

  const hash = await ctx.password.hash(password)
  const user = await ctx.internalAdapter.createUser({
    email,
    name,
    emailVerified: true,
    role: "admin",
  })
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: hash,
  })

  console.log(`Created admin: ${email} (role: admin)`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
