"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search, Church, MapPin, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
  massLocations,
  churchTypes,
  type ChurchProfile,
} from "@/components/admin/admin-data"
import { MediaUpload } from "@/components/admin/media-upload"

type FormState = Omit<ChurchProfile, "id">

const emptyForm: FormState = {
  name: "",
  nameAr: "",
  location: massLocations[0],
  type: "church",
  patronSaint: "",
  patronSaintAr: "",
  description: "",
  massSchedule: "",
  image: "",
  featured: false,
}

const typeLabels: Record<string, string> = {
  church: "Church",
  monastery: "Monastery",
  chapel: "Chapel",
}

export default function ChurchesAdminPage() {
  const { churches, addChurch, updateChurch, deleteChurch } = useAdminData()
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = churches.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchesLocation = locationFilter === "all" || c.location === locationFilter
    return matchesSearch && matchesLocation
  })

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: ChurchProfile) {
    setEditingId(item.id)
    const { id, ...rest } = item
    setForm(rest)
    setDialogOpen(true)
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Church name is required")
      return
    }
    if (!form.image.trim()) {
      toast.error("Please add an image (URL or upload)")
      return
    }
    if (editingId) {
      updateChurch(editingId, form)
      toast.success("Church updated")
    } else {
      addChurch(form)
      toast.success("Church added")
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      deleteChurch(deleteId)
      toast.success("Church removed")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">Churches &amp; Holy Sites</h1>
          <p className="mt-1 text-muted-foreground">
            Manage the church profiles shown on the Churches page. Mass schedules are managed separately under Mass Times.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Church
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search churches..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {massLocations.map((l) => (
              <SelectItem key={l} value={l}>{l}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground sm:ml-auto">
          {filtered.length} site{filtered.length !== 1 ? "s" : ""}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((church) => (
            <Card key={church.id} className="group flex flex-col overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <Image src={church.image || "/placeholder.svg"} alt={church.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute left-3 top-3 flex gap-2">
                  <Badge className="gap-1 bg-background/90 text-foreground">
                    <MapPin className="h-3 w-3" />
                    {church.location}
                  </Badge>
                  {church.featured && (
                    <Badge className="gap-1 bg-secondary text-secondary-foreground">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="flex-1 p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-serif text-lg font-semibold leading-tight">{church.name}</h3>
                  <Badge variant="outline" className="shrink-0">{typeLabels[church.type]}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground" dir="rtl">{church.nameAr}</p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{church.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-1 p-4 pt-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(church)} aria-label="Edit church">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(church.id)} aria-label="Delete church" className="text-destructive hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <Church className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No churches found.</p>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">{editingId ? "Edit Church" : "Add Church"}</DialogTitle>
            <DialogDescription>These fields appear on the public Churches page.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <MediaUpload label="Image" value={form.image} onChange={(v) => setForm({ ...form, image: v })} kind="image" />
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name (English)</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Mar Mama Church" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nameAr">Name (Arabic)</Label>
              <Input id="nameAr" dir="rtl" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} placeholder="كنيسة مار ماما" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Location</Label>
                <Select value={form.location} onValueChange={(v) => setForm({ ...form, location: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {massLocations.map((l) => (
                      <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as ChurchProfile["type"] })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {churchTypes.map((t) => (
                      <SelectItem key={t} value={t}>{typeLabels[t]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="patron">Patron Saint</Label>
                <Input id="patron" value={form.patronSaint} onChange={(e) => setForm({ ...form, patronSaint: e.target.value })} placeholder="St. Mama" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="patronAr">Patron (Arabic)</Label>
                <Input id="patronAr" dir="rtl" value={form.patronSaintAr} onChange={(e) => setForm({ ...form, patronSaintAr: e.target.value })} placeholder="القديس ماما" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="History and significance..." rows={3} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="massSchedule">Mass Schedule (summary text)</Label>
              <Input id="massSchedule" value={form.massSchedule} onChange={(e) => setForm({ ...form, massSchedule: e.target.value })} placeholder="Sunday: 8:00 AM, 10:30 AM | Weekdays: 7:00 AM" />
            </div>
            <div className="flex items-center justify-between rounded-lg border px-3 py-2">
              <Label htmlFor="featured" className="cursor-pointer">Featured holy site</Label>
              <Switch id="featured" checked={form.featured} onCheckedChange={(c) => setForm({ ...form, featured: c })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Save Changes" : "Add Church"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this church?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The church profile will be permanently removed.
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
