"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import {
  ArrowLeft,
  Search,
  Inbox,
  Clock,
  CheckCircle2,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Pencil,
  ExternalLink,
  type LucideIcon,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DashboardHero } from "@/components/admin/dashboard-hero"
import {
  useAdminData,
  serviceCatalog,
  requestStatuses,
  type ServiceSlug,
  type ServiceRequest,
  type RequestStatus,
} from "@/components/admin/admin-data"

const statusStyles: Record<RequestStatus, string> = {
  pending: "bg-amber-500 text-white",
  approved: "bg-blue-500 text-white",
  completed: "bg-green-600 text-white",
  rejected: "bg-destructive text-destructive-foreground",
}

const subjectLabels: Record<ServiceSlug, string> = {
  "first-sacrifice": "Child's Name",
  "marriage-certificate": "Couple's Names",
  "confirmation-certificate": "Full Name",
  "death-certificate": "Deceased's Name",
}

type EditForm = Omit<ServiceRequest, "id" | "service">

interface ServiceRequestsManagerProps {
  slug: ServiceSlug
  icon: LucideIcon
  badge: string
}

export function ServiceRequestsManager({
  slug,
  icon,
  badge,
}: ServiceRequestsManagerProps) {
  const {
    serviceRequests,
    updateServiceRequest,
    updateServiceRequestStatus,
    deleteServiceRequest,
  } = useAdminData()

  const info = serviceCatalog.find((s) => s.slug === slug)!
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatus>("all")
  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState<EditForm | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const requests = useMemo(
    () => serviceRequests.filter((r) => r.service === slug),
    [serviceRequests, slug],
  )

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.subjectName.toLowerCase().includes(search.toLowerCase()) ||
      r.requesterName.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || r.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const pending = requests.filter((r) => r.status === "pending").length
  const completed = requests.filter((r) => r.status === "completed").length

  function openEdit(item: ServiceRequest) {
    setEditId(item.id)
    const { id, service, ...rest } = item
    setForm(rest)
  }

  function handleSave() {
    if (!form || !editId) return
    if (!form.subjectName.trim()) {
      toast.error("Subject name is required")
      return
    }
    updateServiceRequest(editId, { ...form, service: slug })
    toast.success("Request updated")
    setEditId(null)
    setForm(null)
  }

  function confirmDelete() {
    if (deleteId) {
      deleteServiceRequest(deleteId)
      toast.success("Request deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-2 -ml-2 text-muted-foreground"
        >
          <Link href="/admin/dashboard/services">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
        </Button>
        <DashboardHero
          badge={badge}
          title={info.title}
          titleAr={info.titleAr}
          description={`Review and manage ${info.title} requests submitted through the website.`}
          icon={icon}
          action={
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
            >
              <Link href={`/services/${slug}`} target="_blank">
                <ExternalLink className="h-4 w-4" />
                View Form
              </Link>
            </Button>
          }
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Inbox, value: requests.length, label: "Total requests" },
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

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(["all", ...requestStatuses.map((s) => s.value)] as const).map(
            (status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                {status === "all" ? "All" : status}
              </Button>
            ),
          )}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Requests list */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filtered.map((request) => (
            <Card
              key={request.id}
              className="border-none shadow-md transition-shadow hover:shadow-lg"
            >
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold text-foreground">
                      {request.subjectName}
                    </h3>
                    <Badge className={statusStyles[request.status]}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Requested by {request.requesterName}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {request.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4" />
                      {request.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4" />
                      {request.email}
                    </span>
                  </div>
                  {request.notes ? (
                    <p className="mt-3 rounded-md bg-muted/50 p-3 text-sm text-muted-foreground">
                      {request.notes}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                  <Select
                    value={request.status}
                    onValueChange={(v) =>
                      updateServiceRequestStatus(request.id, v as RequestStatus)
                    }
                  >
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {requestStatuses.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(request)}
                      aria-label="Edit request"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(request.id)}
                      aria-label="Delete request"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <Inbox className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No requests found.</p>
        </div>
      )}

      {/* Edit dialog */}
      <Dialog
        open={editId !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditId(null)
            setForm(null)
          }
        }}
      >
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Edit Request
            </DialogTitle>
            <DialogDescription>
              Update the details for this {info.title} request.
            </DialogDescription>
          </DialogHeader>

          {form ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="subjectName">{subjectLabels[slug]}</Label>
                <Input
                  id="subjectName"
                  value={form.subjectName}
                  onChange={(e) =>
                    setForm({ ...form, subjectName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="requesterName">Requester Name</Label>
                <Input
                  id="requesterName"
                  value={form.requesterName}
                  onChange={(e) =>
                    setForm({ ...form, requesterName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) =>
                      setForm({ ...form, status: v as RequestStatus })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {requestStatuses.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          ) : null}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditId(null)
                setForm(null)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The request will be permanently
              removed.
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
