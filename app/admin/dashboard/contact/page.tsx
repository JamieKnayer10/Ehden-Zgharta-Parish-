"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Trash2,
  Eye,
  Reply,
  Archive,
  Facebook,
  Instagram,
  ExternalLink,
  Inbox,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  contactSubmissionStatuses,
  type ContactSubmission,
  type ContactSubmissionStatus,
} from "@/components/admin/admin-data"
import { DashboardHero } from "@/components/admin/dashboard-hero"

const subjectLabels: Record<string, string> = {
  general: "General Inquiry",
  mass: "Mass & Sacraments",
  baptism: "Baptism Request",
  wedding: "Wedding Request",
  funeral: "Funeral Services",
  certificate: "Certificate Request",
  donation: "Donations",
  volunteer: "Volunteer",
  other: "Other",
}

const statusIcons: Record<ContactSubmissionStatus, typeof Eye> = {
  new: Inbox,
  read: Eye,
  replied: Reply,
  archived: Archive,
}

export default function ContactManagementPage() {
  const {
    contactInfo,
    updateContactInfo,
    contactSubmissions,
    updateContactSubmissionStatus,
    deleteContactSubmission,
  } = useAdminData()

  const [infoForm, setInfoForm] = useState(contactInfo)
  const [statusFilter, setStatusFilter] = useState<"all" | ContactSubmissionStatus>("all")
  const [selectedSubmission, setSelectedSubmission] =
    useState<ContactSubmission | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = contactSubmissions.filter(
    (s) => statusFilter === "all" || s.status === statusFilter,
  )

  const newCount = contactSubmissions.filter((s) => s.status === "new").length
  const repliedCount = contactSubmissions.filter(
    (s) => s.status === "replied",
  ).length

  function handleSaveInfo(e: React.FormEvent) {
    e.preventDefault()
    updateContactInfo(infoForm)
    toast.success("Contact information updated")
  }

  function openSubmission(sub: ContactSubmission) {
    setSelectedSubmission(sub)
    if (sub.status === "new") {
      updateContactSubmissionStatus(sub.id, "read")
    }
  }

  function confirmDelete() {
    if (deleteId) {
      deleteContactSubmission(deleteId)
      toast.success("Submission deleted")
      setDeleteId(null)
      if (selectedSubmission?.id === deleteId) setSelectedSubmission(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Contact"
        title="Contact Management"
        titleAr="إدارة التواصل"
        description="Manage parish contact information, social links, location details, and review contact form submissions."
        icon={Phone}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <a href="/contact" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              View on Website
            </a>
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Inbox, value: contactSubmissions.length, label: "Total submissions" },
          { icon: MessageSquare, value: newCount, label: "New messages" },
          { icon: Reply, value: repliedCount, label: "Replied" },
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

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact info form */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveInfo} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="phone">
                  <Phone className="mr-1 inline h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={infoForm.phone}
                  onChange={(e) =>
                    setInfoForm((p) => ({ ...p, phone: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                  <Mail className="mr-1 inline h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={infoForm.email}
                  onChange={(e) =>
                    setInfoForm((p) => ({ ...p, email: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="address">
                  <MapPin className="mr-1 inline h-4 w-4" />
                  Address (English)
                </Label>
                <Input
                  id="address"
                  value={infoForm.address}
                  onChange={(e) =>
                    setInfoForm((p) => ({ ...p, address: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="addressAr">Address (Arabic)</Label>
                <Input
                  id="addressAr"
                  dir="rtl"
                  value={infoForm.addressAr}
                  onChange={(e) =>
                    setInfoForm((p) => ({ ...p, addressAr: e.target.value }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="hours">
                  <Clock className="mr-1 inline h-4 w-4" />
                  Office Hours
                </Label>
                <Input
                  id="hours"
                  value={infoForm.officeHours}
                  onChange={(e) =>
                    setInfoForm((p) => ({ ...p, officeHours: e.target.value }))
                  }
                />
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <Label htmlFor="facebook">
                  <Facebook className="mr-1 inline h-4 w-4" />
                  Facebook URL
                </Label>
                <Input
                  id="facebook"
                  value={infoForm.socialFacebook}
                  onChange={(e) =>
                    setInfoForm((p) => ({
                      ...p,
                      socialFacebook: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="instagram">
                  <Instagram className="mr-1 inline h-4 w-4" />
                  Instagram URL
                </Label>
                <Input
                  id="instagram"
                  value={infoForm.socialInstagram}
                  onChange={(e) =>
                    setInfoForm((p) => ({
                      ...p,
                      socialInstagram: e.target.value,
                    }))
                  }
                />
              </div>
              <Button type="submit">Save Contact Info</Button>
            </form>
          </CardContent>
        </Card>

        {/* Submissions list */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-foreground">
              Form Submissions
            </h2>
            <Select
              value={statusFilter}
              onValueChange={(v) =>
                setStatusFilter(v as "all" | ContactSubmissionStatus)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {contactSubmissionStatuses.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.length > 0 ? (
              filtered.map((sub) => {
                const StatusIcon = statusIcons[sub.status]
                return (
                  <Card
                    key={sub.id}
                    className={`cursor-pointer transition-shadow hover:shadow-md ${
                      sub.status === "new" ? "border-primary/30 bg-primary/5" : ""
                    }`}
                    onClick={() => openSubmission(sub)}
                  >
                    <CardContent className="flex items-start gap-4 p-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          sub.status === "new"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <StatusIcon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-foreground">
                              {sub.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sub.email}
                            </p>
                          </div>
                          <Badge variant="outline" className="shrink-0 text-xs">
                            {subjectLabels[sub.subject] ?? sub.subject}
                          </Badge>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {sub.message}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {sub.date}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">
                  No submissions found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission detail dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="sm:max-w-lg">
          {selectedSubmission ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif">
                  {selectedSubmission.name}
                </DialogTitle>
                <DialogDescription>
                  {subjectLabels[selectedSubmission.subject] ??
                    selectedSubmission.subject}{" "}
                  · {selectedSubmission.date}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3 text-sm">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p>{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p>{selectedSubmission.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Message</p>
                  <p className="mt-1 leading-relaxed">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>
              <DialogFooter className="flex-col gap-2 sm:flex-row">
                <Select
                  value={selectedSubmission.status}
                  onValueChange={(v) => {
                    updateContactSubmissionStatus(
                      selectedSubmission.id,
                      v as ContactSubmissionStatus,
                    )
                    setSelectedSubmission((p) =>
                      p ? { ...p, status: v as ContactSubmissionStatus } : p,
                    )
                    toast.success("Status updated")
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contactSubmissionStatuses.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.location.href = `mailto:${selectedSubmission.email}?subject=Re: ${subjectLabels[selectedSubmission.subject] ?? selectedSubmission.subject}`
                    }}
                  >
                    <Reply className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setDeleteId(selectedSubmission.id)
                      setSelectedSubmission(null)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">
              Delete submission?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This contact form submission will be permanently removed.
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
