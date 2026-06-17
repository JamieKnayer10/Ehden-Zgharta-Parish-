"use client"

import { Baby } from "lucide-react"
import { ServiceRequestsManager } from "@/components/admin/service-requests-manager"

export default function FirstSacrificeAdminPage() {
  return (
    <ServiceRequestsManager
      slug="first-sacrifice"
      icon={Baby}
      badge="Sacrament Registration"
    />
  )
}
