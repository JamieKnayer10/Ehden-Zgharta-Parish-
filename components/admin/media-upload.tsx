"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Upload, LinkIcon, X, ImageIcon, Video as VideoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type MediaKind = "image" | "video"

interface MediaUploadProps {
  /** Current value (URL or data URL). */
  value: string
  /** Called with the new value. */
  onChange: (value: string) => void
  /** Whether to preview as an image or a video. Defaults to "image". */
  kind?: MediaKind
  label?: string
  /** Placeholder shown in the URL input. */
  placeholder?: string
  id?: string
}

/**
 * Lets an admin provide media either by pasting a URL or uploading a file
 * from their device. Uploaded files are read as data URLs so they preview
 * instantly (backend persistence can be wired in later).
 */
export function MediaUpload({
  value,
  onChange,
  kind = "image",
  label,
  placeholder,
  id,
}: MediaUploadProps) {
  const [mode, setMode] = useState<"url" | "device">("url")
  const [fileName, setFileName] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  const accept = kind === "video" ? "video/*" : "image/*"

  function handleFile(file: File | undefined) {
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const isVideoValue = kind === "video"

  return (
    <div className="flex flex-col gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}

      {/* Preview */}
      {value ? (
        <div className="relative w-full overflow-hidden rounded-lg border bg-muted">
          {isVideoValue ? (
            value.startsWith("data:") ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video src={value} controls className="aspect-video w-full object-cover" />
            ) : (
              <div className="flex aspect-video w-full items-center justify-center gap-2 text-sm text-muted-foreground">
                <VideoIcon className="h-5 w-5" />
                <span className="max-w-[80%] truncate">{value}</span>
              </div>
            )
          ) : (
            <div className="relative aspect-video w-full">
              <Image src={value || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
            </div>
          )}
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 h-7 w-7"
            onClick={() => {
              onChange("")
              setFileName("")
            }}
            aria-label="Remove media"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/40 text-muted-foreground">
          {isVideoValue ? <VideoIcon className="h-8 w-8" /> : <ImageIcon className="h-8 w-8" />}
        </div>
      )}

      {/* Mode toggle */}
      <div className="inline-flex w-full rounded-md border p-0.5">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-medium transition-colors",
            mode === "url"
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <LinkIcon className="h-3.5 w-3.5" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setMode("device")}
          className={cn(
            "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-sm font-medium transition-colors",
            mode === "device"
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Upload className="h-3.5 w-3.5" />
          Upload
        </button>
      </div>

      {mode === "url" ? (
        <Input
          id={id}
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ?? (isVideoValue ? "https://youtube.com/watch?v=..." : "/images/... or https://...")}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
            <Upload className="h-4 w-4" />
            Choose {isVideoValue ? "video" : "image"} from device
          </Button>
          {fileName && (
            <p className="truncate text-xs text-muted-foreground">Selected: {fileName}</p>
          )}
        </div>
      )}
    </div>
  )
}
