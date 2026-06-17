"use client"

import { Heart } from "lucide-react"
import { ServiceRequestsManager } from "@/components/admin/service-requests-manager"

export default function MarriageCertificateAdminPage() {
  return (
    <ServiceRequestsManager
      slug="marriage-certificate"
      icon={Heart}
      badge="Certificate Request"
    />
  )
}
