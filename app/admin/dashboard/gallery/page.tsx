"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search, Camera } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
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
  photoAlbums,
  type PhotoItem,
} from "@/components/admin/admin-data"
import { ViewToggle, type ViewMode } from "@/components/admin/view-toggle"

type FormState = Omit<PhotoItem, "id">

const emptyForm: FormState = {
  title: "",
  album: photoAlbums[0],
  image: "/images/ehden-landscape.jpg",
  date: new Date().toISOString().slice(0, 10),
}

export default function GalleryAdminPage() {
  const { photos, addPhoto, updatePhoto, deletePhoto } = useAdminData()
  const [search, setSearch] = useState("")
  const [albumFilter, setAlbumFilter] = useState("all")
  const [view, setView] = useState<ViewMode>("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = photos.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesAlbum = albumFilter === "all" || p.album === albumFilter
    return matchesSearch && matchesAlbum
  })

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: PhotoItem) {
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
      updatePhoto(editingId, form)
      toast.success("Photo updated")
    } else {
      addPhoto(form)
      toast.success("Photo added")
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      deletePhoto(deleteId)
      toast.success("Photo deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Photo Gallery
          </h1>
          <p className="mt-1 text-muted-foreground">
            Upload and organize parish photos into albums.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Photo
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search photos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={albumFilter} onValueChange={setAlbumFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Album" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Albums</SelectItem>
            {photoAlbums.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground sm:ml-auto">
          {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
        </p>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {/* Grid / List */}
      {filtered.length > 0 ? (
        view === "grid" ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openEdit(item)}
                      aria-label="Edit photo"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeleteId(item.id)}
                      aria-label="Delete photo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-3 pt-0">
                  <Badge variant="outline" className="text-xs">
                    {item.album}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.date}
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-3"
              >
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {item.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.album}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(item)}
                    aria-label="Edit photo"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(item.id)}
                    aria-label="Delete photo"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <Camera className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No photos found.</p>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingId ? "Edit Photo" : "Add Photo"}
            </DialogTitle>
            <DialogDescription>
              Provide an image URL and organize it into an album.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {form.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={form.image || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Photo title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Album</Label>
                <Select
                  value={form.album}
                  onValueChange={(v) => setForm({ ...form, album: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {photoAlbums.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Photo"}
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
            <AlertDialogTitle>Delete this photo?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The photo will be permanently
              removed from the gallery.
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
