"use client"

import Link from "next/link"
import {
  User,
  Mail,
  Phone,
  Shield,
  Settings,
  Bell,
  Pencil,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useAdminData } from "@/components/admin/admin-data"
import { DashboardHero } from "@/components/admin/dashboard-hero"

export default function ProfilePage() {
  const { userProfile, notifications } = useAdminData()
  const unreadNotifications = notifications.filter((n) => !n.read).length

  const initials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const quickLinks = [
    {
      label: "Profile Settings",
      description: "Update your name, email, and account details",
      href: "/admin/dashboard/profile/settings",
      icon: Settings,
    },
    {
      label: "Preferences",
      description: "Notification and display preferences",
      href: "/admin/dashboard/profile/preferences",
      icon: Bell,
    },
    {
      label: "Notifications",
      description: `${unreadNotifications} unread notification${unreadNotifications !== 1 ? "s" : ""}`,
      href: "/admin/dashboard/notifications",
      icon: Bell,
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Account"
        title="My Profile"
        titleAr="ملفي الشخصي"
        description="View your administrator profile and access account settings."
        icon={User}
        action={
          <Button asChild variant="outline" size="lg">
            <Link href="/admin/dashboard/profile/settings">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <Avatar className="h-24 w-24 border-4 border-border">
              {userProfile.avatar ? (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              ) : null}
              <AvatarFallback className="bg-primary text-2xl font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-serif text-xl font-bold text-foreground">
                {userProfile.name}
              </h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              <Badge className="mt-2" variant="secondary">
                {userProfile.role}
              </Badge>
            </div>
            {userProfile.bio ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {userProfile.bio}
              </p>
            ) : null}
            <Separator className="w-full" />
            <div className="flex w-full flex-col gap-2 text-left text-sm">
              {userProfile.phone ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 shrink-0" />
                  {userProfile.phone}
                </div>
              ) : null}
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                {userProfile.email}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4 shrink-0" />
                {userProfile.role}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick links */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Account Settings
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <Card
                key={link.href}
                className="group transition-shadow hover:shadow-md"
              >
                <Link href={link.href}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <link.icon className="h-5 w-5" />
                      </div>
                      <CardTitle className="font-serif text-base group-hover:text-primary">
                        {link.label}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{link.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-base">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest account notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {notifications.slice(0, 3).map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 rounded-lg border p-3"
                >
                  {!notif.read ? (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  ) : (
                    <span className="mt-1.5 h-2 w-2 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
              <Button asChild variant="ghost" size="sm" className="self-start">
                <Link href="/admin/dashboard/notifications">
                  View all notifications
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
