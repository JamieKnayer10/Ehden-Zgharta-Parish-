"use client"

import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Newspaper,
  Camera,
  Video,
  Clock,
  ArrowRight,
  Plus,
  CheckCircle2,
  PencilLine,
  ExternalLink,
} from "lucide-react"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHero } from "@/components/admin/dashboard-hero"
import { useAdminData } from "@/components/admin/admin-data"

export default function DashboardOverviewPage() {
  const { news, photos, videos, massChurches, channels, serviceRequests } = useAdminData()

  const publishedNews = news.filter((n) => n.status === "published").length
  const draftNews = news.filter((n) => n.status === "draft").length
  const publishedVideos = videos.filter((v) => v.status === "published").length
  const publishedChannels = channels.filter((c) => c.status === "published").length
  const pendingRequests = serviceRequests.filter((r) => r.status === "pending").length

  const stats = [
    {
      icon: LayoutDashboard,
      value: massChurches.length,
      label: "Churches",
      hint: "Mass schedules",
    },
    {
      icon: Newspaper,
      value: news.length,
      label: "News Articles",
      hint: `${publishedNews} published · ${draftNews} drafts`,
    },
    {
      icon: Camera,
      value: photos.length,
      label: "Photos",
      hint: "Across all albums",
    },
    {
      icon: Video,
      value: videos.length,
      label: "Videos",
      hint: `${publishedVideos} published`,
    },
  ]

  const quickActions = [
    {
      label: "New Article",
      href: "/admin/dashboard/news",
      icon: Plus,
    },
    {
      label: "Add Photo",
      href: "/admin/dashboard/gallery",
      icon: Camera,
    },
    {
      label: "Add Video",
      href: "/admin/dashboard/videos",
      icon: Video,
    },
  ]

  const dashboardSections = [
    {
      title: "Mass Times",
      titleAr: "أوقات القداس",
      href: "/admin/dashboard/mass-times",
      icon: Clock,
      count: massChurches.length,
      hint: "Church schedules",
      description: "Manage mass times across all churches in the parish.",
    },
    {
      title: "News & Articles",
      titleAr: "الأخبار والمقالات",
      href: "/admin/dashboard/news",
      icon: Newspaper,
      count: news.length,
      hint: `${publishedNews} published`,
      description: "Create and publish parish news, announcements, and articles.",
    },
    {
      title: "Photo Gallery",
      titleAr: "معرض الصور",
      href: "/admin/dashboard/gallery",
      icon: Camera,
      count: photos.length,
      hint: "Organize albums",
      description: "Upload and organize parish photos into themed albums.",
    },
    {
      title: "Videos",
      titleAr: "الفيديو",
      href: "/admin/dashboard/videos",
      icon: Video,
      count: videos.length,
      hint: `${publishedVideos} published`,
      description: "Manage liturgy recordings, documentaries, and event videos.",
    },
  ]

  const recentNews = news.slice(0, 3)

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Dashboard"
        title="Overview"
        titleAr="نظرة عامة"
        description="Welcome to the parish administration dashboard. Manage content, media, and services from one central location."
        icon={LayoutDashboard}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Link href="/" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View Website
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.hint}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-serif text-xl font-bold text-foreground">
            Quick Actions
          </h2>
          <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
        </div>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} asChild variant="outline">
              <Link href={action.href}>
                <action.icon className="h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>

      {/* Dashboard sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {dashboardSections.map((section) => (
          <Card
            key={section.title}
            className="group border-none shadow-lg transition-shadow hover:shadow-xl"
          >
            <Link href={section.href}>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <section.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-primary">
                    {section.title}
                  </h3>
                  <p className="text-sm text-secondary" dir="rtl">
                    {section.titleAr}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="text-sm text-muted-foreground">
                    {section.count} items · {section.hint}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                    Manage
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Recent News */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Recent Articles
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/dashboard/news">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        {recentNews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentNews.map((item) => (
              <Card key={item.id} className="overflow-hidden border-none shadow-md">
                <div className="relative h-32 bg-primary/10">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60"
                  />
                  <Badge
                    variant={item.status === "published" ? "default" : "secondary"}
                    className="absolute right-3 top-3"
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="line-clamp-2 font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.category} · {item.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-md">
            <CardContent className="py-12 text-center">
              <Newspaper className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                No articles yet. Create your first article to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
