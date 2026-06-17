"use client"

import Link from "next/link"
import {
  FileText,
  Baby,
  Heart,
  Award,
  ArrowRight,
  Inbox,
  Clock,
  CheckCircle2,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHero } from "@/components/admin/dashboard-hero"
import {
  useAdminData,
  serviceCatalog,
  type ServiceSlug,
} from "@/components/admin/admin-data"

const serviceIcons: Record<ServiceSlug, typeof FileText> = {
  "first-sacrifice": Baby,
  "marriage-certificate": Heart,
  "confirmation-certificate": Award,
  "death-certificate": FileText,
}

export default function ServicesOverviewPage() {
  const { serviceRequests } = useAdminData()

  const total = serviceRequests.length
  const pending = serviceRequests.filter((r) => r.status === "pending").length
  const completed = serviceRequests.filter(
    (r) => r.status === "completed",
  ).length

  const countFor = (slug: ServiceSlug) =>
    serviceRequests.filter((r) => r.service === slug)
  const pendingFor = (slug: ServiceSlug) =>
    serviceRequests.filter((r) => r.service === slug && r.status === "pending")
      .length

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Parish Services"
        title="Services"
        titleAr="خدمات الرعية"
        description="Manage the certificate and sacrament request forms offered on the website, and review the requests submitted by parishioners."
        icon={FileText}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Link href="/services" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View on Website
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Inbox, value: total, label: "Total requests" },
          { icon: Clock, value: pending, label: "Pending review" },
          { icon: CheckCircle2, value: completed, label: "Completed" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Service cards */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            All Services
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {serviceCatalog.map((service) => {
            const Icon = serviceIcons[service.slug]
            const requests = countFor(service.slug)
            const pendingCount = pendingFor(service.slug)
            return (
              <Card
                key={service.slug}
                className="group border-none shadow-lg transition-shadow hover:shadow-xl"
              >
                <Link href={service.href}>
                  <CardContent className="flex flex-col gap-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </div>
                      {pendingCount > 0 ? (
                        <Badge className="bg-secondary text-secondary-foreground">
                          {pendingCount} pending
                        </Badge>
                      ) : null}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold leading-tight text-foreground group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-sm text-secondary" dir="rtl">
                        {service.titleAr}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t pt-4">
                      <span className="text-sm text-muted-foreground">
                        {requests.length}{" "}
                        {requests.length === 1 ? "request" : "requests"}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                        Manage
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
