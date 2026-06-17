"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  Inbox,
  AlertTriangle,
  CheckCircle2,
  Info,
  MessageSquare,
  FileText,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  useAdminData,
  type NotificationType,
} from "@/components/admin/admin-data"
import { DashboardHero } from "@/components/admin/dashboard-hero"

const typeConfig: Record<
  NotificationType,
  { icon: typeof Bell; label: string; color: string }
> = {
  info: { icon: Info, label: "Info", color: "text-blue-600" },
  success: { icon: CheckCircle2, label: "Success", color: "text-green-600" },
  warning: { icon: AlertTriangle, label: "Warning", color: "text-amber-600" },
  request: { icon: FileText, label: "Request", color: "text-primary" },
  contact: { icon: MessageSquare, label: "Contact", color: "text-purple-600" },
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hr ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default function NotificationsCenterPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
  } = useAdminData()

  const [readFilter, setReadFilter] = useState<"all" | "unread" | "read">(
    "all",
  )
  const [typeFilter, setTypeFilter] = useState<"all" | NotificationType>("all")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = notifications.filter((n) => {
    const matchesRead =
      readFilter === "all" ||
      (readFilter === "unread" && !n.read) ||
      (readFilter === "read" && n.read)
    const matchesType = typeFilter === "all" || n.type === typeFilter
    return matchesRead && matchesType
  })

  function handleMarkAllRead() {
    markAllNotificationsRead()
    toast.success("All notifications marked as read")
  }

  function confirmDelete() {
    if (deleteId) {
      deleteNotification(deleteId)
      toast.success("Notification deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Notifications"
        title="Notifications Center"
        titleAr="مركز الإشعارات"
        description="View all notifications, mark as read, filter by type, and manage your notification history."
        icon={Bell}
        action={
          unreadCount > 0 ? (
            <Button
              onClick={handleMarkAllRead}
              size="lg"
              className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
            >
              <CheckCheck className="h-4 w-4" />
              Mark All Read
            </Button>
          ) : undefined
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Bell, value: notifications.length, label: "Total" },
          { icon: Inbox, value: unreadCount, label: "Unread" },
          {
            icon: CheckCircle2,
            value: notifications.length - unreadCount,
            label: "Read",
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          Filter:
        </div>
        <Select
          value={readFilter}
          onValueChange={(v) =>
            setReadFilter(v as "all" | "unread" | "read")
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={typeFilter}
          onValueChange={(v) =>
            setTypeFilter(v as "all" | NotificationType)
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            {(Object.keys(typeConfig) as NotificationType[]).map((type) => (
              <SelectItem key={type} value={type}>
                {typeConfig[type].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notification list */}
      <div className="flex flex-col gap-3">
        {filtered.length > 0 ? (
          filtered.map((notif) => {
            const config = typeConfig[notif.type]
            const Icon = config.icon
            return (
              <Card
                key={notif.id}
                className={`transition-shadow hover:shadow-md ${
                  !notif.read ? "border-primary/20 bg-primary/5" : ""
                }`}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted ${config.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">
                            {notif.title}
                          </p>
                          {!notif.read ? (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notif.message}
                        </p>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {config.label}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(notif.date)}
                      </span>
                      {notif.href ? (
                        <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                          <Link
                            href={notif.href}
                            onClick={() => markNotificationRead(notif.id)}
                          >
                            <ExternalLink className="h-3 w-3" />
                            View
                          </Link>
                        </Button>
                      ) : null}
                      {!notif.read ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => {
                            markNotificationRead(notif.id)
                            toast.success("Marked as read")
                          }}
                        >
                          <CheckCheck className="h-3 w-3" />
                          Mark read
                        </Button>
                      ) : null}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-destructive hover:text-destructive"
                        onClick={() => setDeleteId(notif.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <div className="rounded-lg border border-dashed py-16 text-center">
            <Bell className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No notifications match your filters.
            </p>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">
              Delete notification?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This notification will be permanently removed from your history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
