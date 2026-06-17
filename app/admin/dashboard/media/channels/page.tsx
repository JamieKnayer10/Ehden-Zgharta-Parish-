"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Tv,
  Radio,
  Upload,
  Star,
  Globe,
  ExternalLink,
  Eye,
  EyeOff,
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
  channelTypes,
  type ChannelItem,
  type ChannelType,
} from "@/components/admin/admin-data"
import { DashboardHero } from "@/components/admin/dashboard-hero"

type FormState = Omit<ChannelItem, "id">

const emptyForm: FormState = {
  name: "",
  nameAr: "",
  slug: "",
  description: "",
  descriptionAr: "",
  type: "tv",
  logo: "",
  cover: "",
  streamUrl: "",
  websiteUrl: "",
  socialFacebook: "",
  socialYoutube: "",
  socialInstagram: "",
  status: "draft",
  featured: false,
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function ChannelsAdminPage() {
  const { channels, addChannel, updateChannel, deleteChannel } = useAdminData()
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | ChannelType>("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const filtered = channels.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.nameAr.includes(search) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === "all" || c.type === typeFilter
    return matchesSearch && matchesType
  })

  const tvCount = channels.filter((c) => c.type === "tv").length
  const radioCount = channels.filter((c) => c.type === "radio").length
  const publishedCount = channels.filter((c) => c.status === "published").length

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  function openEdit(item: ChannelItem) {
    setEditingId(item.id)
    const { id, ...rest } = item
    setForm({ ...emptyForm, ...rest })
    setDialogOpen(true)
  }

  function handleImageFile(
    file: File,
    field: "logo" | "cover",
  ) {
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
      setForm((prev) => ({ ...prev, [field]: reader.result as string }))
      toast.success(`${field === "logo" ? "Logo" : "Cover"} uploaded`)
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
      logo: form.logo || "/images/mar-mama-church.jpg",
      cover: form.cover || "/images/ehden-landscape.jpg",
    }
    if (editingId) {
      updateChannel(editingId, payload)
      toast.success("Channel updated")
    } else {
      addChannel(payload)
      toast.success("Channel created")
    }
    setDialogOpen(false)
  }

  function togglePublish(item: ChannelItem) {
    const newStatus = item.status === "published" ? "draft" : "published"
    const { id, ...rest } = item
    updateChannel(id, { ...rest, status: newStatus })
    toast.success(
      newStatus === "published" ? "Channel published" : "Channel unpublished",
    )
  }

  function confirmDelete() {
    if (deleteId) {
      deleteChannel(deleteId)
      toast.success("Channel deleted")
      setDeleteId(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Media Management"
        title="Channels"
        titleAr="القنوات"
        description="Create, edit, and manage broadcast channels — logos, covers, stream URLs, social links, and publish status."
        icon={Tv}
        action={
          <Button
            onClick={openCreate}
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Plus className="h-4 w-4" />
            Add Channel
          </Button>
        }
      />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Globe, value: channels.length, label: "Total channels" },
          { icon: Tv, value: tvCount, label: "Television" },
          { icon: Radio, value: radioCount, label: "Radio" },
          { icon: Eye, value: publishedCount, label: "Published" },
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
          {(["all", "tv", "radio"] as const).map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
              className="capitalize"
            >
              {type === "all" ? "All types" : type === "tv" ? "Television" : "Radio"}
            </Button>
          ))}
        </div>
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Card grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="group flex flex-col overflow-hidden border-none p-0 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[21/9] w-full overflow-hidden">
                <Image
                  src={item.cover || "/placeholder.svg"}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-background shadow-md">
                    <Image
                      src={item.logo || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="text-xs text-white/80" dir="rtl">
                      {item.nameAr}
                    </p>
                  </div>
                </div>
                <div className="absolute left-3 top-3 flex gap-2">
                  <Badge className="gap-1 bg-background/90 text-foreground">
                    {item.type === "tv" ? (
                      <Tv className="h-3 w-3" />
                    ) : (
                      <Radio className="h-3 w-3" />
                    )}
                    {item.type === "tv" ? "TV" : "Radio"}
                  </Badge>
                  <Badge
                    className={
                      item.status === "published"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {item.status}
                  </Badge>
                </div>
                {item.featured ? (
                  <Badge className="absolute right-3 top-3 gap-1 bg-secondary text-secondary-foreground">
                    <Star className="h-3 w-3 fill-current" />
                    Featured
                  </Badge>
                ) : null}
              </div>
              <CardContent className="flex flex-1 flex-col p-5">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {item.socialFacebook ? (
                    <span>Facebook</span>
                  ) : null}
                  {item.socialYoutube ? (
                    <span>YouTube</span>
                  ) : null}
                  {item.socialInstagram ? (
                    <span>Instagram</span>
                  ) : null}
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex gap-1">
                    {item.websiteUrl ? (
                      <Button asChild variant="ghost" size="sm">
                        <Link href={item.websiteUrl} target="_blank">
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePublish(item)}
                      aria-label={
                        item.status === "published" ? "Unpublish" : "Publish"
                      }
                    >
                      {item.status === "published" ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(item)}
                      aria-label="Edit channel"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      aria-label="Delete channel"
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
          <Tv className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No channels found.</p>
          <Button onClick={openCreate} variant="outline" className="mt-4">
            <Plus className="h-4 w-4" />
            Create your first channel
          </Button>
        </div>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              {editingId ? "Edit Channel" : "Create Channel"}
            </DialogTitle>
            <DialogDescription>
              Configure channel details, branding, stream URL, and social links.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Logo upload */}
            <div className="flex flex-col gap-2">
              <Label>Logo</Label>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageFile(file, "logo")
                }}
              />
              {form.logo ? (
                <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-lg border">
                  <Image
                    src={form.logo}
                    alt="Logo preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, logo: "" }))}
                    className="absolute right-1 top-1 rounded-full bg-background/80 p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  className="flex aspect-square w-full max-w-[120px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Upload logo</span>
                </button>
              )}
            </div>

            {/* Cover upload */}
            <div className="flex flex-col gap-2">
              <Label>Cover Image</Label>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageFile(file, "cover")
                }}
              />
              {form.cover ? (
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg border">
                  <Image
                    src={form.cover}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, cover: "" }))}
                    className="absolute right-2 top-2 rounded-full bg-background/80 p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="flex aspect-[21/9] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Upload className="h-6 w-6" />
                  <span className="text-xs">Upload cover</span>
                </button>
              )}
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name (English)</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="nameAr">Name (Arabic)</Label>
              <Input
                id="nameAr"
                dir="rtl"
                value={form.nameAr}
                onChange={(e) =>
                  setForm((p) => ({ ...p, nameAr: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="auto-generated from name"
                value={form.slug}
                onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, type: v as ChannelType }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {channelTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description (English)</Label>
            <Textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="descriptionAr">Description (Arabic)</Label>
            <Textarea
              id="descriptionAr"
              dir="rtl"
              rows={3}
              value={form.descriptionAr}
              onChange={(e) =>
                setForm((p) => ({ ...p, descriptionAr: e.target.value }))
              }
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Label htmlFor="streamUrl">Stream URL</Label>
            <Input
              id="streamUrl"
              placeholder="https://..."
              value={form.streamUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, streamUrl: e.target.value }))
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="websiteUrl">Website Page URL</Label>
            <Input
              id="websiteUrl"
              placeholder="/zgharta-channel"
              value={form.websiteUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, websiteUrl: e.target.value }))
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                placeholder="https://facebook.com/..."
                value={form.socialFacebook}
                onChange={(e) =>
                  setForm((p) => ({ ...p, socialFacebook: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                placeholder="https://youtube.com/..."
                value={form.socialYoutube}
                onChange={(e) =>
                  setForm((p) => ({ ...p, socialYoutube: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                placeholder="https://instagram.com/..."
                value={form.socialInstagram}
                onChange={(e) =>
                  setForm((p) => ({ ...p, socialInstagram: e.target.value }))
                }
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Publish immediately</Label>
                <p className="text-xs text-muted-foreground">
                  Make this channel visible on the website
                </p>
              </div>
              <Switch
                checked={form.status === "published"}
                onCheckedChange={(checked) =>
                  setForm((p) => ({
                    ...p,
                    status: checked ? "published" : "draft",
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Featured channel</Label>
                <p className="text-xs text-muted-foreground">
                  Highlight on the media page
                </p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm((p) => ({ ...p, featured: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Create Channel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif">
              Delete channel?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The channel and all its metadata will
              be permanently removed.
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
