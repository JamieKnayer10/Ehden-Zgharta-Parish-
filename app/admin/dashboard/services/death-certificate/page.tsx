"use client"

import { FileText } from "lucide-react"
import { ServiceRequestsManager } from "@/components/admin/service-requests-manager"

export default function DeathCertificateAdminPage() {
  return (
    <ServiceRequestsManager
      slug="death-certificate"
      icon={FileText}
      badge="Certificate Request"
    />
  )
}
