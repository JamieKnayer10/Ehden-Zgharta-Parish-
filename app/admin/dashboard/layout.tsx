import type { ReactNode } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminDataProvider } from "@/components/admin/admin-data"
import { Toaster } from "@/components/ui/sonner"

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <AdminDataProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold leading-none text-foreground">
                Content Management
              </span>
              <span className="text-xs text-muted-foreground">
                Maronite Parish of Ehden &amp; Zgharta
              </span>
            </div>
          </header>
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-right" richColors />
    </AdminDataProvider>
  )
}
