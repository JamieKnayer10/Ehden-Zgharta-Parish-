import type { Metadata } from "next"
import { LoginForm } from "@/components/admin/login-form"

export const metadata: Metadata = {
  title: "Admin Sign In | Ehden-Zgharta Maronite Parish",
  description: "Sign in to manage news, photos, videos, and content for the Ehden-Zgharta Maronite Parish website.",
}

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-sidebar px-4 py-12">
      <LoginForm />
    </main>
  )
}
