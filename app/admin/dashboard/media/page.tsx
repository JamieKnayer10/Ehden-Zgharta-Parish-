"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Clapperboard,
  Tv,
  Radio,
  Camera,
  Video,
  ArrowRight,
  ExternalLink,
  Upload,
  Eye,
  TrendingUp,
  Plus,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardHero } from "@/components/admin/dashboard-hero"
import { useAdminData } from "@/components/admin/admin-data"

export default function MediaOverviewPage() {
  const { photos, videos, channels } = useAdminData()

  const publishedVideos = videos.filter((v) => v.status === "published").length
  const publishedChannels = channels.filter((c) => c.status === "published").length
  const albums = [...new Set(photos.map((p) => p.album))]

  const recentPhotos = [...photos]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4)
  const recentVideos = [...videos]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)

  const quickActions = [
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
    {
      label: "New Channel",
      href: "/admin/dashboard/media/channels",
      icon: Tv,
    },
  ]

  const mediaSections = [
    {
      title: "Channels",
      titleAr: "القنوات",
      href: "/admin/dashboard/media/channels",
      icon: Clapperboard,
      count: channels.length,
      hint: `${publishedChannels} published`,
      description: "Manage Zgharta Channel, Radio Ehden, and other broadcast platforms.",
    },
    {
      title: "Photo Gallery",
      titleAr: "معرض الصور",
      href: "/admin/dashboard/gallery",
      icon: Camera,
      count: photos.length,
      hint: `${albums.length} albums`,
      description: "Organize parish photos across churches, events, and heritage albums.",
    },
    {
      title: "Videos",
      titleAr: "الفيديو",
      href: "/admin/dashboard/videos",
      icon: Video,
      count: videos.length,
      hint: `${publishedVideos} published`,
      description: "Manage liturgy recordings, documentaries, and community broadcasts.",
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Media Management"
        title="Media Overview"
        titleAr="نظرة عامة على الوسائط"
        description="Media statistics, recent uploads, activity insights, and quick actions for managing all parish media content."
        icon={Clapperboard}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Link href="/media" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View on Website
            </Link>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: Clapperboard,
            value: channels.length,
            label: "Channels",
            hint: `${publishedChannels} live`,
          },
          {
            icon: Camera,
            value: photos.length,
            label: "Photos",
            hint: `${albums.length} albums`,
          },
          {
            icon: Video,
            value: videos.length,
            label: "Videos",
            hint: `${publishedVideos} published`,
          },
          {
            icon: TrendingUp,
            value: photos.length + videos.length + channels.length,
            label: "Total assets",
            hint: "All media items",
          },
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
          <Button asChild>
            <Link href="/admin/dashboard/media/channels">
              <Plus className="h-4 w-4" />
              Create Channel
            </Link>
          </Button>
        </div>
      </div>

      {/* Media sections */}
      <div className="grid gap-6 md:grid-cols-3">
        {mediaSections.map((section) => (
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

      {/* Channels preview */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              Active Channels
            </h2>
            <div className="mt-2 h-1 w-16 rounded-full bg-secondary" />
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/dashboard/media/channels">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map((channel) => (
            <Card key={channel.id} className="overflow-hidden border-none shadow-md">
              <div className="relative h-24 bg-primary/10">
                {channel.cover ? (
                  <Image
                    src={channel.cover}
                    alt={channel.name}
                    fill
                    className="object-cover opacity-60"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-background shadow-sm">
                    {channel.logo ? (
                      <Image
                        src={channel.logo}
                        alt={channel.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                        {channel.type === "tv" ? (
                          <Tv className="h-5 w-5" />
                        ) : (
                          <Radio className="h-5 w-5" />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{channel.name}</p>
                    <Badge
                      variant={
                        channel.status === "published" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {channel.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-bold text-foreground">
              Recent Photos
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {recentPhotos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden border-none shadow-md">
                <div className="relative aspect-video">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <p className="truncate text-sm font-medium">{photo.title}</p>
                  <p className="text-xs text-muted-foreground">{photo.album}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-lg font-bold text-foreground">
              Recent Videos
            </h2>
          </div>
          <div className="flex flex-col gap-3">
            {recentVideos.map((video) => (
              <Card key={video.id} className="border-none shadow-md">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{video.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {video.category} · {video.date}
                    </p>
                    <Badge
                      variant={
                        video.status === "published" ? "default" : "secondary"
                      }
                      className="mt-1 text-xs"
                    >
                      {video.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
