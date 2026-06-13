"use client"

import { LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"

export type ViewMode = "grid" | "list"

export function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode
  onChange: (view: ViewMode) => void
}) {
  return (
    <div className="inline-flex items-center rounded-md border p-0.5">
      <Button
        type="button"
        variant={view === "grid" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onChange("grid")}
        aria-label="Grid view"
        aria-pressed={view === "grid"}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant={view === "list" ? "secondary" : "ghost"}
        size="icon"
        className="h-8 w-8"
        onClick={() => onChange("list")}
        aria-label="List view"
        aria-pressed={view === "list"}
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}
