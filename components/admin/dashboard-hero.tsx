import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

interface DashboardHeroProps {
  badge: string
  title: string
  titleAr?: string
  description: string
  icon: LucideIcon
  action?: ReactNode
}

export function DashboardHero({
  badge,
  title,
  titleAr,
  description,
  icon: Icon,
  action,
}: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-8 text-primary-foreground shadow-lg sm:px-10">
      <Icon
        className="pointer-events-none absolute -right-8 -top-8 h-48 w-48 rotate-12 opacity-10"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <Badge variant="secondary" className="mb-3">
            {badge}
          </Badge>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            {title}
          </h1>
          {titleAr ? (
            <p
              className="mt-1 text-left font-serif text-2xl text-secondary sm:text-3xl"
              dir="rtl"
            >
              {titleAr}
            </p>
          ) : null}
          <p className="mt-3 max-w-2xl text-sm text-primary-foreground/80">
            {description}
          </p>
        </div>
        {action ? <div className="shrink-0 lg:self-end">{action}</div> : null}
      </div>
    </div>
  )
}
