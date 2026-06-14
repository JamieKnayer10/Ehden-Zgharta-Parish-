"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, ExternalLink, Save, LayoutTemplate } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { useAdminData, type SiteItem, type SiteSection } from "@/components/admin/admin-data"
import { MediaUpload } from "@/components/admin/media-upload"

const uid = () => Math.random().toString(36).slice(2, 10)

const MEDIA_KEYS = ["image", "thumbnail", "src", "icon", "photo"]
const LONG_KEYS = ["description", "text", "excerpt", "body", "content"]

function fieldLabel(key: string) {
  // turn camelCase / "titleAr" into readable labels
  const withSpaces = key.replace(/([A-Z])/g, " $1")
  const label = withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
  return label.replace(/ Ar$/, " (Arabic)")
}

function isMedia(key: string) {
  return MEDIA_KEYS.some((k) => key.toLowerCase().includes(k))
}
function isLong(key: string) {
  return LONG_KEYS.includes(key.toLowerCase())
}
function isArabic(key: string) {
  return key.endsWith("Ar")
}

/* ---- Field input that adapts to the key ---- */
function FieldInput({
  fieldKey,
  value,
  onChange,
}: {
  fieldKey: string
  value: string
  onChange: (v: string) => void
}) {
  if (isMedia(fieldKey)) {
    return <MediaUpload label={fieldLabel(fieldKey)} value={value} onChange={onChange} kind="image" />
  }
  return (
    <div className="flex flex-col gap-2">
      <Label>{fieldLabel(fieldKey)}</Label>
      {isLong(fieldKey) ? (
        <Textarea
          value={value}
          dir={isArabic(fieldKey) ? "rtl" : undefined}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      ) : (
        <Input
          value={value}
          dir={isArabic(fieldKey) ? "rtl" : undefined}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}

/* ---- Section card with item CRUD ---- */
function SectionEditor({ slug, section }: { slug: string; section: SiteSection }) {
  const { addSectionItem, updateSectionItem, deleteSectionItem } = useAdminData()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<SiteItem>({ id: "" })
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function openCreate() {
    const blank: SiteItem = { id: uid() }
    section.fields.forEach((f) => (blank[f] = ""))
    setDraft(blank)
    setEditingId(null)
    setDialogOpen(true)
  }

  function openEdit(item: SiteItem) {
    setDraft({ ...item })
    setEditingId(item.id)
    setDialogOpen(true)
  }

  function save() {
    if (editingId) {
      updateSectionItem(slug, section.id, draft)
      toast.success("Item updated")
    } else {
      addSectionItem(slug, section.id, draft)
      toast.success("Item added")
    }
    setDialogOpen(false)
  }

  const primaryKey = section.fields[0]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="font-serif text-lg">{section.title}</CardTitle>
          <CardDescription>{section.items.length} item{section.items.length !== 1 ? "s" : ""}</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {section.items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-3 rounded-lg border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-foreground">{item[primaryKey] || "Untitled"}</p>
              <p className="truncate text-xs text-muted-foreground">
                {section.fields.slice(1, 3).map((f) => item[f]).filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" onClick={() => openEdit(item)} aria-label="Edit item">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setDeleteId(item.id)} aria-label="Delete item" className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {section.items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">No items yet.</p>
        )}
      </CardContent>

      {/* Item dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif">{editingId ? "Edit Item" : "Add Item"}</DialogTitle>
            <DialogDescription>{section.title}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {section.fields.map((f) => (
              <FieldInput
                key={f}
                fieldKey={f}
                value={draft[f] ?? ""}
                onChange={(v) => setDraft((d) => ({ ...d, [f]: v }))}
              />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save}>{editingId ? "Save Changes" : "Add Item"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteId) {
                  deleteSectionItem(slug, section.id, deleteId)
                  toast.success("Item deleted")
                  setDeleteId(null)
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}

export default function PageContentEditor() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug
  const { pages, updatePageHero } = useAdminData()
  const page = pages.find((p) => p.slug === slug)

  const [hero, setHero] = useState(page?.hero)

  if (!page) {
    return (
      <div className="rounded-lg border border-dashed py-16 text-center">
        <LayoutTemplate className="mx-auto mb-3 h-12 w-12 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">Page not found.</p>
      </div>
    )
  }

  // keep local hero in sync if the page changes (e.g. navigating between slugs)
  const currentHero = hero && hero === page.hero ? hero : (hero ?? page.hero)
  const pageSlug = page.slug

  function saveHero() {
    if (currentHero) {
      updatePageHero(pageSlug, currentHero)
      toast.success("Page header saved")
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">{page.name}</h1>
          <p className="mt-1 text-muted-foreground">
            Edit the content shown on this page. Changes are stored in the dashboard.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={page.path} target="_blank">
            <ExternalLink className="h-4 w-4" />
            View Page
          </Link>
        </Button>
      </div>

      {/* Hero / header editor */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Page Header</CardTitle>
          <CardDescription>The hero badge, title, and intro text.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="badge">Badge</Label>
              <Input id="badge" value={currentHero.badge} onChange={(e) => setHero({ ...currentHero, badge: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={currentHero.title} onChange={(e) => setHero({ ...currentHero, title: e.target.value })} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="titleAr">Title / Subtitle (Arabic)</Label>
            <Input id="titleAr" dir="rtl" value={currentHero.titleAr} onChange={(e) => setHero({ ...currentHero, titleAr: e.target.value })} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} value={currentHero.description} onChange={(e) => setHero({ ...currentHero, description: e.target.value })} />
          </div>
          <MediaUpload
            label="Header image (optional)"
            value={currentHero.image}
            onChange={(v) => setHero({ ...currentHero, image: v })}
            kind="image"
          />
          <div>
            <Button onClick={saveHero}>
              <Save className="h-4 w-4" />
              Save Header
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Section editors */}
      {page.sections.map((section) => (
        <SectionEditor key={section.id} slug={page.slug} section={section} />
      ))}
    </div>
  )
}
