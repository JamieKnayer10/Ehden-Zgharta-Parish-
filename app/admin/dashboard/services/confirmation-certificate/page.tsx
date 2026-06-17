"use client"

import { Award } from "lucide-react"
import { ServiceRequestsManager } from "@/components/admin/service-requests-manager"

export default function ConfirmationCertificateAdminPage() {
  return (
    <ServiceRequestsManager
      slug="confirmation-certificate"
      icon={Award}
      badge="Certificate Request"
    />
  )
}
