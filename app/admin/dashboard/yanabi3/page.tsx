"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search, BookOpen, Calendar, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import {
  useAdminData,
  bulletinSeasons,
  type Bulletin,
} from "@/components/admin/admin-data"

type FormState = Omit<Bulletin, "id">

const emptyForm: FormState = {
  title: "",
  titleAr: "",
  season: bulletinSeasons[0],
  date: "",
  year: new Date().getFullYear(),
  fileUrl: "",
}

const seasonLabels: Record<string, string> = {
  resurrection: "Resurrection",
  pentecost: "Pentecost",
  cross: "Cross",
  christmas: "Christmas",
  epiphany: "Epiphany",
  lent: "Lent",
}

export default function Yanabi3AdminPage() {
  const { bulletins, addBulletin, updateBulletin, deleteBulletin } = useAdminData()
  const [search, setSearch] = useState("")
  const [seasonFilter, setSeasonFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = bulletins.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) || b.titleAr.includes(search)
    const matchesSeason = seasonFilter === "all" || b.season === seasonFilter
    return matchesSearch && matchesSeason
  })

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: Bulletin) {
    setEditingId(item.id)
    const { id, ...rest } = item
    setForm(rest)
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.title.trim()) {
      toast.error("Title is required")
      return
    }
    if (editingId) {
      updateBulletin(editingId, form)
      toast.success("Bulletin updated")
    } else {
      addBulletin(form)
      toast.success("Bulletin added")
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      deleteBulletin(deleteId)
      toast.success("Bulletin deleted")
      setDeleteId(null)
    }
  }

  function handleFile(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") setForm((f) => ({ ...f, fileUrl: reader.result as string }))
    }
    reader.readAsDataURL(file)
    toast.success(`Attached ${file.name}`)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Yanabi3 Bulletins</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the weekly pastoral bulletin archive shown on the Yanabi3 page.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Bulletin
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search bulletins..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={seasonFilter} onValueChange={setSeasonFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Seasons</SelectItem>
            {bulletinSeasons.map((s) => (
              <SelectItem key={s} value={s}>{seasonLabels[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground sm:ml-auto">
          {filtered.length} bulletin{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((b) => (
            <Card key={b.id} className="group">
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div className="min-w-0 flex-1">
                  <Badge variant="outline" className="mb-2">{seasonLabels[b.season]}</Badge>
                  <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground" dir="rtl">{b.titleAr}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {b.date}
                    {b.fileUrl && (
                      <span className="ml-2 inline-flex items-center gap-1 text-secondary">
                        <FileText className="h-3 w-3" />
                        File attached
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(b)} aria-label="Edit bulletin">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleteId(b.id)} aria-label="Delete bulletin" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <BookOpen className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No bulletins found.</p>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">{editingId ? "Edit Bulletin" : "Add Bulletin"}</DialogTitle>
            <DialogDescription>Add the bulletin details and optionally attach a PDF file.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Third Sunday of Resurrection" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="titleAr">Title (Arabic)</Label>
              <Input id="titleAr" dir="rtl" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} placeholder="الأحد الثالث من القيامة" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Season</Label>
                <Select value={form.season} onValueChange={(v) => setForm({ ...form, season: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {bulletinSeasons.map((s) => (
                      <SelectItem key={s} value={s}>{seasonLabels[s]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="April 6, 2026" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="file">Bulletin file (PDF — optional)</Label>
              <Input id="file" type="file" accept="application/pdf,.pdf" onChange={(e) => handleFile(e.target.files?.[0])} />
              <Input
                value={form.fileUrl.startsWith("data:") ? "" : form.fileUrl}
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
                placeholder="…or paste a file URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Bulletin"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this bulletin?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The bulletin will be permanently removed from the archive.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
