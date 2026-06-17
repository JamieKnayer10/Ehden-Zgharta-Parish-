"use client"

import type { ReactNode } from "react"
import { useState, useRef, useEffect } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminDataProvider, useAdminData } from "@/components/admin/admin-data"
import { Toaster } from "@/components/ui/sonner"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Settings,
  Bell,
  LogOut,
  SlidersHorizontal,
} from "lucide-react"

const SEARCH_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "About Overview", href: "/admin/dashboard/about" },
  { label: "Mass Times", href: "/admin/dashboard/mass-times" },
  { label: "News & Articles", href: "/admin/dashboard/news" },
  { label: "Churches", href: "/admin/dashboard/churches" },
  { label: "Services", href: "/admin/dashboard/services" },
  { label: "Media Overview", href: "/admin/dashboard/media" },
  { label: "Channels", href: "/admin/dashboard/media/channels" },
  { label: "Photo Gallery", href: "/admin/dashboard/gallery" },
  { label: "Videos", href: "/admin/dashboard/videos" },
  { label: "Contact", href: "/admin/dashboard/contact" },
  { label: "Notifications", href: "/admin/dashboard/notifications" },
  { label: "My Profile", href: "/admin/dashboard/profile" },
  { label: "Settings", href: "/admin/dashboard/settings" },
]

const ROUTE_LABELS: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/dashboard/about": "About Overview",
  "/admin/dashboard/about/parish": "The Parish",
  "/admin/dashboard/about/history": "History",
  "/admin/dashboard/about/vicar": "The Vicar",
  "/admin/dashboard/about/douaihy": "Blessed Patriarch Douaihy",
  "/admin/dashboard/mass-times": "Mass Times",
  "/admin/dashboard/yanabi3": "Yanabi3",
  "/admin/dashboard/news": "News & Articles",
  "/admin/dashboard/gallery": "Photo Gallery",
  "/admin/dashboard/videos": "Videos",
  "/admin/dashboard/churches": "Churches",
  "/admin/dashboard/services": "Services",
  "/admin/dashboard/services/first-sacrifice": "The First Sacrifice",
  "/admin/dashboard/services/marriage-certificate": "Marriage Certificate",
  "/admin/dashboard/services/confirmation-certificate": "Certificate of Confirmation",
  "/admin/dashboard/services/death-certificate": "Death Certificate",
  "/admin/dashboard/media": "Media Overview",
  "/admin/dashboard/media/channels": "Channels",
  "/admin/dashboard/contact": "Contact Management",
  "/admin/dashboard/notifications": "Notifications",
  "/admin/dashboard/profile": "My Profile",
  "/admin/dashboard/profile/settings": "Profile Settings",
  "/admin/dashboard/profile/preferences": "Preferences",
  "/admin/dashboard/settings": "Settings",
}

function formatNotifTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours} hr ago`
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function Breadcrumb() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <span className="font-serif text-base font-semibold text-foreground">Dashboard</span>
  }

  if (pathname === "/admin/dashboard" || pathname === "/admin") {
    return (
      <span className="font-serif text-base font-semibold text-foreground">
        Dashboard
      </span>
    )
  }

  const pageLabel = ROUTE_LABELS[pathname] ?? "Page"

  return (
    <span className="flex items-center gap-1.5 font-serif text-base font-semibold">
      <Link
        href="/admin/dashboard"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        Dashboard
      </Link>
      <svg
        className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
        xmlns="http://www.w3.org/2000/svg"
        fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
      </svg>
      <span className="text-foreground">{pageLabel}</span>
    </span>
  )
}

function DashboardHeader() {
  const router = useRouter()
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    userProfile,
  } = useAdminData()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filteredItems = searchQuery.trim().length > 0
    ? SEARCH_ITEMS.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter(n => !n.read).length

  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  const initials = userProfile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const profileMenuItems = [
    { label: "My Profile", href: "/admin/dashboard/profile", icon: User },
    { label: "Profile Settings", href: "/admin/dashboard/profile/settings", icon: Settings },
    { label: "Preferences", href: "/admin/dashboard/profile/preferences", icon: SlidersHorizontal },
    { label: "Notifications", href: "/admin/dashboard/notifications", icon: Bell, badge: unreadCount },
  ]

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
        setMobileSearchOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb />

      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div ref={searchRef} className="relative">
          <button
            onClick={() => {
              setMobileSearchOpen(p => {
                const next = !p
                if (next) setTimeout(() => searchInputRef.current?.focus(), 0)
                return next
              })
            }}
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:hidden"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
            </svg>
          </button>

          <div
            className={`${mobileSearchOpen ? "absolute right-0 top-full mt-1.5 w-64 z-50 rounded-md shadow-lg" : "hidden"} sm:static sm:mt-0 sm:block sm:w-auto sm:rounded-none sm:shadow-none`}
          >
            <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring">
              <svg className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0Z" />
              </svg>
              <input
                ref={searchInputRef}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground sm:w-56"
                placeholder="Search pages…"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setSearchOpen(true) }}
                onFocus={() => setSearchOpen(true)}
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setSearchOpen(false) }} className="text-muted-foreground hover:text-foreground">
                  <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {searchOpen && filteredItems.length > 0 && (
              <div className="absolute left-0 top-full mt-1.5 w-full min-w-[200px] rounded-md border bg-popover p-1 shadow-md">
                {filteredItems.map(item => (
                  <button
                    key={item.href}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => { router.push(item.href); setSearchOpen(false); setMobileSearchOpen(false); setSearchQuery("") }}
                  >
                    <svg className="h-3.5 w-3.5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {searchOpen && searchQuery.trim().length > 0 && filteredItems.length === 0 && (
              <div className="absolute left-0 top-full mt-1.5 w-full rounded-md border bg-popover px-3 py-4 text-center text-sm text-muted-foreground shadow-md">
                No results for &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(p => !p); setProfileOpen(false) }}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-80 rounded-md border bg-popover shadow-md">
              <div className="flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-sm font-semibold text-popover-foreground">Notifications</span>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={() => markAllNotificationsRead()}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Mark all read
                    </button>
                  )}
                  <Link
                    href="/admin/dashboard/notifications"
                    onClick={() => setNotifOpen(false)}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.slice(0, 6).map(n => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      markNotificationRead(n.id)
                      if (n.href) {
                        router.push(n.href)
                        setNotifOpen(false)
                      }
                    }}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/50 ${!n.read ? "bg-accent/20" : ""}`}
                  >
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.read ? "bg-transparent" : "bg-primary"}`} />
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium text-popover-foreground">{n.title}</p>
                      <p className="line-clamp-2 text-xs text-muted-foreground">{n.message}</p>
                      <p className="text-xs text-muted-foreground">{formatNotifTime(n.date)}</p>
                    </div>
                  </button>
                ))}
              </div>
              {notifications.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">No notifications</p>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false) }}
            aria-label="Profile menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-border transition-colors hover:border-primary"
          >
            <Avatar className="h-8 w-8">
              {userProfile.avatar ? (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              ) : null}
              <AvatarFallback className="bg-muted text-xs font-semibold text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 rounded-md border bg-popover shadow-md">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-semibold text-popover-foreground">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.email}</p>
              </div>
              <div className="p-1">
                {profileMenuItems.map(item => (
                  <button
                    key={item.href}
                    onClick={() => { router.push(item.href); setProfileOpen(false) }}
                    className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {item.badge > 9 ? "9+" : item.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="border-t p-1">
                <button
                  onClick={() => { router.push("/admin/login"); setProfileOpen(false) }}
                  className="flex w-full items-center gap-2 rounded-sm px-3 py-2 text-sm text-destructive hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AdminDataProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <DashboardHeader />
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </SidebarInset>
      </SidebarProvider>
      <Toaster position="top-right" richColors />
    </AdminDataProvider>
  )
}
