import type { ReactNode } from "react"
import { DashboardShell } from "@/components/admin/dashboard-shell"
import { getAllAdminData } from "@/lib/db/queries"

export const dynamic = "force-dynamic"

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const initialData = await getAllAdminData()

  return <DashboardShell initialData={initialData}>{children}</DashboardShell>
}
