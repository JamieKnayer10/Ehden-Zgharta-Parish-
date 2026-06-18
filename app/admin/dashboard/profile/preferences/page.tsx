"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Bell, Globe, Mail, Zap, ArrowLeft } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useAdminData } from "@/components/admin/admin-data"

export default function PreferencesPage() {
  const { userPreferences, updateUserPreferences } = useAdminData()

  function handleToggle(
    key: keyof typeof userPreferences,
    value: boolean,
  ) {
    updateUserPreferences({ ...userPreferences, [key]: value })
    toast.success("Preference saved")
  }

  function handleSaveAll() {
    toast.success("All preferences saved")
  }

  const preferences = [
    {
      key: "emailNotifications" as const,
      icon: Mail,
      title: "Email notifications",
      description: "Receive email alerts for new contact submissions and service requests.",
      value: userPreferences.emailNotifications,
    },
    {
      key: "pushNotifications" as const,
      icon: Bell,
      title: "Push notifications",
      description: "Show in-app notifications in the dashboard bell icon.",
      value: userPreferences.pushNotifications,
    },
    {
      key: "weeklyDigest" as const,
      icon: Mail,
      title: "Weekly digest",
      description: "Receive a weekly summary of parish website activity.",
      value: userPreferences.weeklyDigest,
    },
    {
      key: "publishImmediately" as const,
      icon: Zap,
      title: "Publish new items immediately",
      description: "Skip the draft step when creating news, videos, and channels.",
      value: userPreferences.publishImmediately,
    },
    {
      key: "showArabicFields" as const,
      icon: Globe,
      title: "Show Arabic fields",
      description: "Display Arabic title and description fields in content editors.",
      value: userPreferences.showArabicFields,
    },
  ]

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2 text-muted-foreground"
        >
          <Link href="/admin/dashboard/profile">
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Preferences
        </h1>
        <p className="mt-1 text-muted-foreground">
          Control notifications, publishing defaults, and display options.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Notification Preferences</CardTitle>
          </div>
          <CardDescription>
            Choose how and when you receive alerts about parish activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {preferences.slice(0, 3).map((pref, i) => (
            <div key={pref.key}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-start gap-3 pr-4">
                  <pref.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{pref.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pref.value}
                  onCheckedChange={(v) => handleToggle(pref.key, v)}
                />
              </div>
              {i < 2 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif">Editor Preferences</CardTitle>
          </div>
          <CardDescription>
            Customize your content management experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          {preferences.slice(3).map((pref, i) => (
            <div key={pref.key}>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-start gap-3 pr-4">
                  <pref.icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{pref.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {pref.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pref.value}
                  onCheckedChange={(v) => handleToggle(pref.key, v)}
                />
              </div>
              {i < preferences.slice(3).length - 1 ? <Separator /> : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={handleSaveAll} className="self-start">
        Save All Preferences
      </Button>
    </div>
  )
}
