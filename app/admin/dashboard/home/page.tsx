"use client"

import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { Quote, Home, BookOpen, ExternalLink, Image as ImageIcon } from "lucide-react"
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
import { DashboardHero } from "@/components/admin/dashboard-hero"

export default function HomePage() {
  const [verseEn, setVerseEn] = useState(
    "I am the resurrection and the life. The one who believes in me will live, even though they die."
  )
  const [verseAr, setVerseAr] = useState(
    "أَنَا القِيَامَةُ وَالحَيَاة. مَنْ آمَنَ بِي وَلَوْ مَاتَ فَسَيَحْيَا."
  )
  const [verseReference, setVerseReference] = useState("John 11:25 | يوحنا 11:25")

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    toast.success("Verse of the day saved successfully")
  }

  return (
    <div className="flex flex-col gap-8">
      <DashboardHero
        badge="Dashboard"
        title="Home"
        titleAr="الرئيسية"
        description="Manage the home page content and verse of the day."
        icon={Home}
        action={
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
          >
            <Link href="/" target="_blank">
              <ExternalLink className="h-4 w-4" />
              View on Website
            </Link>
          </Button>
        }
      />

      <form onSubmit={handleSave} className="flex flex-col gap-8">
        {/* Verse of the Day */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <CardTitle className="font-serif">Verse of the Day</CardTitle>
            </div>
            <CardDescription>The daily scripture verse displayed on the home page.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="verseEn">Verse (English)</Label>
              <Textarea
                id="verseEn"
                rows={3}
                value={verseEn}
                onChange={(e) => setVerseEn(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="verseAr">Verse (Arabic)</Label>
              <Textarea
                id="verseAr"
                dir="rtl"
                rows={3}
                value={verseAr}
                onChange={(e) => setVerseAr(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="verseReference">Reference</Label>
              <Input
                id="verseReference"
                value={verseReference}
                onChange={(e) => setVerseReference(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/90"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <CardTitle className="font-serif">Preview</CardTitle>
            </div>
            <CardDescription>See how the verse will appear on the home page.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 md:p-12 text-center border border-border/50">
              <div className="absolute top-6 left-6 text-secondary/20">
                <Quote className="h-12 w-12" />
              </div>
              <div className="absolute bottom-6 right-6 text-secondary/20 rotate-180">
                <Quote className="h-12 w-12" />
              </div>

              <div className="flex justify-center mb-6">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <svg className="h-6 w-6 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 2v7H4v2h7v11h2V11h7V9h-7V2z"/>
                  </svg>
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                    Verse of the Day
                  </p>
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed">
                    &ldquo;{verseEn}&rdquo;
                  </blockquote>
                </div>

                <div className="pt-4 border-t border-border/50" dir="rtl">
                  <blockquote className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed">
                    &ldquo;{verseAr}&rdquo;
                  </blockquote>
                </div>

                <cite className="block text-sm text-muted-foreground not-italic">
                  {verseReference}
                </cite>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
