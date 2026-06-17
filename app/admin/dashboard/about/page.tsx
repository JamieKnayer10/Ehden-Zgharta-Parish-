"use client"

import Link from "next/link"
import {
  Info,
  Church,
  BookOpen,
  User,
  Star,
  ArrowRight,
  ExternalLink,
  Heart,
  Users,
  Calendar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHero } from "@/components/admin/dashboard-hero"

const aboutSections = [
  {
    title: "The Parish",
    titleAr: "الرعية",
    href: "/admin/dashboard/about/parish",
    publicHref: "/about",
    icon: Church,
    summary:
      "The Ehden-Zgharta parish serves the Maronite faithful across two historic towns in North Lebanon. Rooted in faith, community, service, and education, the parish celebrates the Holy Liturgy and sacraments while building strong bonds between families and generations.",
    highlights: ["749 AD founding", "6+ churches", "Maronite tradition"],
    status: "Published",
  },
  {
    title: "History",
    titleAr: "التاريخ",
    href: "/admin/dashboard/about/history",
    publicHref: "/about/history",
    icon: BookOpen,
    summary:
      "From the first Christian communities in the 4th century through the Ottoman era to modern times, the parish history spans over 1,300 years. Key milestones include the founding of Mar Mama Church (1283) and St. George Cathedral (1516).",
    highlights: ["Early Christianity", "Medieval period", "Modern parish"],
    status: "Published",
  },
  {
    title: "The Vicar",
    titleAr: "الخوري",
    href: "/admin/dashboard/about/vicar",
    publicHref: "/about/vicar",
    icon: User,
    summary:
      "The Patriarchal Vicar of Ehden-Zgharta leads the faithful in this historic region. Appointed in 2010, he oversees liturgical life, youth ministry, charitable works, and the spiritual formation of parishioners across all churches.",
    highlights: ["Pastoral care", "Youth ministry", "Community outreach"],
    status: "Published",
  },
  {
    title: "Blessed Patriarch Douaihy",
    titleAr: "البطريرك المبارك دويهي",
    href: "/admin/dashboard/about/douaihy",
    publicHref: "/patriarch-douaihy",
    icon: Star,
    summary:
      "Stephane Douaihy (1630–1704), born in Ehden, became the 57th Patriarch of Antioch. A historian and scholar, he documented Maronite history and was beatified in 1996. His legacy remains central to the parish identity.",
    highlights: ["Born 1630 in Ehden", "57th Patriarch", "Beatified 1996"],
    status: "Published",
  },
]

const coreValues = [
  { icon: Church, title: "Faith", titleAr: "الإيمان" },
  { icon: Users, title: "Community", titleAr: "المجتمع" },
  { icon: Heart, title: "Service", titleAr: "الخدمة" },
  { icon: BookOpen, title: "Education", titleAr: "التعليم" },
]

const milestones = [
  { year: "749 AD", event: "Founding of the first church in Ehden" },
  { year: "1283", event: "Establishment of Mar Mama Church" },
  { year: "1516", event: "Construction of St. George Cathedral in Zgharta" },
  { year: "2000", event: "Launch of Radio Ehden" },
  { year: "2015", event: "Establishment of Zgharta Channel" },
]

export default function AboutOverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="About Section"
        title="About Overview"
        titleAr="نظرة عامة"
        description="A complete summary of all About content on the parish website — The Parish, History, The Vicar, and Blessed Patriarch Douaihy."
        icon={Info}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Link href="/about" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View on Website
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "About pages", value: "4", hint: "All published" },
          { label: "Core values", value: "4", hint: "Faith pillars" },
          { label: "Historical milestones", value: "6+", hint: "Key dates" },
          { label: "Languages", value: "2", hint: "English & Arabic" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-md">
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Core values */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Core Values
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {coreValues.map((value) => (
            <Card key={value.title} className="border-none shadow-md">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{value.title}</p>
                  <p className="text-sm text-secondary" dir="rtl">
                    {value.titleAr}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Section cards */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            All About Pages
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {aboutSections.map((section) => (
            <Card
              key={section.title}
              className="group border-none shadow-lg transition-shadow hover:shadow-xl"
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <section.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary">{section.status}</Badge>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="mt-1 text-sm text-secondary" dir="rtl">
                    {section.titleAr}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {section.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {section.highlights.map((h) => (
                    <Badge key={h} variant="outline" className="text-xs">
                      {h}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={section.publicHref} target="_blank">
                      <ExternalLink className="h-3.5 w-3.5" />
                      Public page
                    </Link>
                  </Button>
                  <Link
                    href={section.href}
                    className="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2"
                  >
                    Manage
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline preview */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Key Milestones
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
        </div>
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    {i < milestones.length - 1 ? (
                      <div className="mt-1 h-full min-h-6 w-px bg-border" />
                    ) : null}
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-semibold text-secondary">
                      {m.year}
                    </p>
                    <p className="text-sm text-muted-foreground">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
