"use client"

import { useState } from "react"
import Image from "next/image"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Search, Video, Play } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
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
  videoCategories,
  type VideoItem,
  type Status,
} from "@/components/admin/admin-data"
import { ViewToggle, type ViewMode } from "@/components/admin/view-toggle"

type FormState = Omit<VideoItem, "id">

const emptyForm: FormState = {
  title: "",
  category: videoCategories[0],
  url: "",
  thumbnail: "/images/mountain-sunset.jpg",
  date: new Date().toISOString().slice(0, 10),
  status: "draft",
}

export default function VideosAdminPage() {
  const { videos, addVideo, updateVideo, deleteVideo } = useAdminData()
  const [search, setSearch] = useState("")
  const [view, setView] = useState<ViewMode>("grid")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase()),
  )

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: VideoItem) {
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
    if (!form.url.trim()) {
      toast.error("Video URL is required")
      return
    }
    if (editingId) {
      updateVideo(editingId, form)
      toast.success("Video updated")
    } else {
      addVideo(form)
      toast.success("Video added")
    }
    setDialogOpen(false)
  }

  function confirmDelete() {
    if (deleteId) {
      deleteVideo(deleteId)
      toast.success("Video deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Videos
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage liturgical broadcasts, documentaries, and event recordings.
          </p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add Video
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <ViewToggle view={view} onChange={setView} />
      </div>

      {filtered.length > 0 ? (
        view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <Card key={item.id} className="group overflow-hidden">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                  <Badge
                    variant={item.status === "published" ? "default" : "secondary"}
                    className="absolute right-3 top-3"
                  >
                    {item.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <p className="line-clamp-2 font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {item.url}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(item)}
                      aria-label="Edit video"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      aria-label="Delete video"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
                <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={item.thumbnail || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 fill-current text-white" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.url}
                  </p>
                </div>
                <Badge variant="outline" className="hidden text-xs sm:inline-flex">
                  {item.category}
                </Badge>
                <Badge
                  variant={item.status === "published" ? "default" : "secondary"}
                  className="hidden sm:inline-flex"
                >
                  {item.status}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(item)}
                    aria-label="Edit video"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(item.id)}
                    aria-label="Delete video"
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
          <Video className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No videos found.</p>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">
              {editingId ? "Edit Video" : "Add Video"}
            </DialogTitle>
            <DialogDescription>
              Paste a YouTube or video URL and a thumbnail image.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {form.thumbnail && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={form.thumbnail || "/placeholder.svg"}
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
                placeholder="Video title"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">Video URL</Label>
              <Input
                id="url"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={form.thumbnail}
                onChange={(e) =>
                  setForm({ ...form, thumbnail: e.target.value })
                }
                placeholder="/images/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {videoCategories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
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
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm({ ...form, status: v as Status })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Video"}
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
            <AlertDialogTitle>Delete this video?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The video will be permanently
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
