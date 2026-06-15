"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Church,
  Upload,
  Star,
  MapPin,
  Landmark,
  ImageIcon,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
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
  type ChurchItem,
  type ChurchType,
} from "@/components/admin/admin-data"
import { DashboardHero } from "@/components/admin/dashboard-hero"

type FormState = Omit<ChurchItem, "id">

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
  slug: "",
  featured: false,
}

const typeLabels: Record<ChurchType, string> = {
  church: "Church",
  monastery: "Monastery",
  chapel: "Chapel",
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function ChurchesAdminPage() {
  const { churches, addChurch, updateChurch, deleteChurch } = useAdminData()
  const [search, setSearch] = useState("")
  const [locationFilter, setLocationFilter] = useState<"all" | string>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = churches.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr.includes(search) ||
      c.patronSaint.toLowerCase().includes(search.toLowerCase())
    const matchesLocation =
      locationFilter === "all" || c.location === locationFilter
    return matchesSearch && matchesLocation
  })

  const ehdenCount = churches.filter((c) => c.location === "Ehden").length
  const zghartaCount = churches.filter((c) => c.location === "Zgharta").length
  const featuredCount = churches.filter((c) => c.featured).length

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: ChurchItem) {
    setEditingId(item.id)
    const { id, ...rest } = item
    setForm({ ...emptyForm, ...rest })
    setDialogOpen(true)
  }

  function handleImageFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }))
      toast.success("Image uploaded")
    }
    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (!form.name.trim()) {
      toast.error("Name is required")
      return
    }
    if (!form.description.trim()) {
      toast.error("Description is required")
      return
    }
    const payload: FormState = {
      ...form,
      slug: form.slug.trim() ? slugify(form.slug) : slugify(form.name),
      image: form.image || "/images/mar-mama-church.jpg",
    }
    if (editingId) {
      updateChurch(editingId, payload)
      toast.success("Church updated")
    } else {
      addChurch(payload)
      toast.success("Church added")
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      deleteChurch(deleteId)
      toast.success("Church deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Our Heritage"
        title="Churches & Holy Sites"
        titleAr="الكنائس والمواقع المقدسة"
        description="Manage the historic churches, monasteries, and chapels of Ehden and Zgharta shown on the website."
        icon={Church}
        action={
          <Button
            onClick={openCreate}
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Plus className="h-4 w-4" />
            Add Church
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Landmark, value: churches.length, label: "Total sites" },
          { icon: MapPin, value: ehdenCount, label: "In Ehden" },
          { icon: MapPin, value: zghartaCount, label: "In Zgharta" },
          { icon: Star, value: featuredCount, label: "Featured" },
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
          {(["all", ...massLocations] as const).map((loc) => (
            <Button
              key={loc}
              variant={locationFilter === loc ? "default" : "outline"}
              size="sm"
              onClick={() => setLocationFilter(loc)}
              className="capitalize"
            >
              {loc === "all" ? "All locations" : loc}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search churches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Card grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="group flex flex-col overflow-hidden border-none p-0 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 flex gap-2">
                  <Badge className="gap-1 bg-background/90 text-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </Badge>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {typeLabels[item.type]}
                  </Badge>
                </div>
                {item.featured ? (
                  <Badge className="absolute right-3 top-3 gap-1 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </Badge>
                ) : null}
              </div>
              <CardContent className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-semibold leading-tight text-foreground">
                  {item.name}
                </h3>
                {item.nameAr ? (
                  <p className="mt-1 text-sm text-muted-foreground" dir="rtl">
                    {item.nameAr}
                  </p>
                ) : null}
                {item.patronSaint ? (
                  <p className="mt-2 text-xs font-medium text-primary">
                    {item.patronSaint}
                  </p>
                ) : null}
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-auto flex justify-end gap-1 pt-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(item)}
                    aria-label="Edit church"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(item.id)}
                    aria-label="Delete church"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
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
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingId ? "Edit Church" : "Add Church"}
            </DialogTitle>
            <DialogDescription>
              Add the holy site details, upload a photo, and describe its
              heritage.
            </DialogDescription>
          </DialogHeader>

          {/* Image uploader */}
          <div className="flex flex-col gap-2">
            <Label>Photo</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleImageFile(file)
                e.target.value = ""
              }}
            />
            {form.image ? (
              <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-lg border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.image || "/placeholder.svg"}
                  alt="Church preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Replace
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    onClick={() => setForm({ ...form, image: "" })}
                  >
                    <X className="h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition-colors hover:border-primary hover:bg-muted"
              >
                <ImageIcon className="h-8 w-8" />
                <span className="text-sm font-medium">
                  Click to upload a photo
                </span>
                <span className="text-xs">PNG or JPG, up to 5MB</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <Separator className="flex-1" />
              <span className="text-xs text-muted-foreground">
                or paste a URL
              </span>
              <Separator className="flex-1" />
            </div>
            <Input
              value={form.image.startsWith("data:") ? "" : form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="/images/... or https://..."
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Mar Mama Church"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="nameAr">Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  dir="rtl"
                  value={form.nameAr}
                  onChange={(e) => setForm({ ...form, nameAr: e.target.value })}
                  placeholder="الاسم بالعربية"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label>Location</Label>
                <Select
                  value={form.location}
                  onValueChange={(v) => setForm({ ...form, location: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {massLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm({ ...form, type: v as ChurchType })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {churchTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="patronSaint">Patron Saint</Label>
                <Input
                  id="patronSaint"
                  value={form.patronSaint}
                  onChange={(e) =>
                    setForm({ ...form, patronSaint: e.target.value })
                  }
                  placeholder="e.g. St. Mama"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="patronSaintAr">Patron Saint (Arabic)</Label>
                <Input
                  id="patronSaintAr"
                  dir="rtl"
                  value={form.patronSaintAr}
                  onChange={(e) =>
                    setForm({ ...form, patronSaintAr: e.target.value })
                  }
                  placeholder="القديس الشفيع"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the history and significance of this holy site..."
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="massSchedule">Mass Schedule</Label>
              <Input
                id="massSchedule"
                value={form.massSchedule}
                onChange={(e) =>
                  setForm({ ...form, massSchedule: e.target.value })
                }
                placeholder="Sunday: 8:00 AM, 10:30 AM | Weekdays: 7:00 AM"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated from name if left blank"
              />
              <p className="text-xs text-muted-foreground">
                Used in the page address: /churches/{form.slug || "..."}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex flex-col">
                <Label htmlFor="featured" className="cursor-pointer">
                  Featured site
                </Label>
                <span className="text-xs text-muted-foreground">
                  Highlight this site in the featured section of the website.
                </span>
              </div>
              <Switch
                id="featured"
                checked={!!form.featured}
                onCheckedChange={(v) => setForm({ ...form, featured: v })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Church"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this church?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The holy site will be permanently
              removed from the website.
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
