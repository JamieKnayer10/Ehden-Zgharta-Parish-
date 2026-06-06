"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Download, 
  Share2,
  ZoomIn,
  Grid3X3,
  LayoutGrid,
  Camera,
  MapPin,
  Calendar,
  Check,
  Loader2
} from "lucide-react"

const categories = [
  { id: "all", name: "All Photos", nameAr: "جميع الصور" },
  { id: "churches", name: "Churches", nameAr: "الكنائس" },
  { id: "landscapes", name: "Landscapes", nameAr: "المناظر الطبيعية" },
  { id: "events", name: "Events", nameAr: "الفعاليات" },
  { id: "heritage", name: "Heritage", nameAr: "التراث" },
  { id: "seasons", name: "Seasons", nameAr: "الفصول" },
]

const photos = [
  {
    id: 1,
    src: "/images/mar-mama-church.jpg",
    title: "Mar Mama Church",
    titleAr: "كنيسة مار ماما",
    location: "Ehden",
    category: "churches",
    date: "2026",
    description: "One of the oldest churches in Ehden, dating back to 749 AD",
  },
  {
    id: 2,
    src: "/images/st-george-cathedral.jpg",
    title: "St. George Cathedral",
    titleAr: "كاتدرائية مار جرجس",
    location: "Zgharta",
    category: "churches",
    date: "2026",
    description: "The main cathedral of Zgharta, a spiritual center of the town",
  },
  {
    id: 3,
    src: "/images/horsh-ehden.jpg",
    title: "Horsh Ehden Nature Reserve",
    titleAr: "محمية حرش إهدن",
    location: "Ehden",
    category: "landscapes",
    date: "2025",
    description: "The famous cedar forest and nature reserve with stunning autumn colors",
  },
  {
    id: 4,
    src: "/images/ehden-old-town.jpg",
    title: "Old Town Streets",
    titleAr: "شوارع البلدة القديمة",
    location: "Ehden",
    category: "heritage",
    date: "2025",
    description: "Traditional stone houses and narrow streets of old Ehden",
  },
  {
    id: 5,
    src: "/images/zgharta-panorama.jpg",
    title: "Zgharta Panoramic View",
    titleAr: "إطلالة بانورامية على زغرتا",
    location: "Zgharta",
    category: "landscapes",
    date: "2025",
    description: "Stunning view of Zgharta city with its churches and traditional architecture",
  },
  {
    id: 6,
    src: "/images/easter-procession.jpg",
    title: "Easter Procession",
    titleAr: "موكب عيد الفصح",
    location: "Ehden",
    category: "events",
    date: "2025",
    description: "Traditional Easter religious procession through the streets",
  },
  {
    id: 7,
    src: "/images/church-interior.jpg",
    title: "Church Interior",
    titleAr: "داخل الكنيسة",
    location: "Zgharta",
    category: "churches",
    date: "2025",
    description: "Beautiful interior of a historic Maronite church with ornate altar",
  },
  {
    id: 8,
    src: "/images/qadisha-valley.jpg",
    title: "Qadisha Valley",
    titleAr: "وادي قاديشا",
    location: "Near Ehden",
    category: "landscapes",
    date: "2025",
    description: "UNESCO World Heritage site with ancient monasteries",
  },
  {
    id: 9,
    src: "/images/saydet-el-hosn.jpg",
    title: "Saydet el Hosn",
    titleAr: "سيدة الحصن",
    location: "Ehden",
    category: "churches",
    date: "2026",
    description: "The iconic shrine overlooking the mountains of North Lebanon",
  },
  {
    id: 10,
    src: "/images/mar-sarkis-monastery.jpg",
    title: "Mar Sarkis Monastery",
    titleAr: "دير مار سركيس",
    location: "Ehden",
    category: "churches",
    date: "2026",
    description: "Ancient monastery dating to the 8th century with panoramic views",
  },
  {
    id: 11,
    src: "/images/ehden-winter.jpg",
    title: "Winter in Ehden",
    titleAr: "الشتاء في إهدن",
    location: "Ehden",
    category: "seasons",
    date: "2025",
    description: "Snow-covered streets and rooftops during winter season",
  },
  {
    id: 12,
    src: "/images/summer-festival.jpg",
    title: "Summer Festival",
    titleAr: "مهرجان الصيف",
    location: "Ehden",
    category: "events",
    date: "2025",
    description: "Annual summer festival with traditional music and dance",
  },
  {
    id: 13,
    src: "/images/youth-gathering.jpg",
    title: "Youth Gathering",
    titleAr: "لقاء الشباب",
    location: "Zgharta",
    category: "events",
    date: "2025",
    description: "Parish youth group meeting at the church courtyard",
  },
  {
    id: 14,
    src: "/images/mountain-sunset.jpg",
    title: "Mountain Sunset",
    titleAr: "غروب الشمس الجبلي",
    location: "Ehden",
    category: "landscapes",
    date: "2025",
    description: "Breathtaking sunset over Mount Lebanon from Ehden viewpoint",
  },
  {
    id: 15,
    src: "/images/our-lady-zgharta.jpg",
    title: "Our Lady of Zgharta",
    titleAr: "سيدة زغرتا",
    location: "Zgharta",
    category: "churches",
    date: "2026",
    description: "Beautiful church dedicated to the Virgin Mary",
  },
  {
    id: 16,
    src: "/images/ehden-landscape.jpg",
    title: "Ehden Village",
    titleAr: "قرية إهدن",
    location: "Ehden",
    category: "landscapes",
    date: "2026",
    description: "Panoramic view of Ehden village nestled in the mountains",
  },
]

export default function PhotoGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [shareCopied, setShareCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const filteredPhotos = selectedCategory === "all" 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory)

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1])
    }
  }

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url).then(() => {
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    })
  }

  const handleSharePlatform = (platform: string, photo: typeof photos[0]) => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(photo.title)
    const links: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
    }
    window.open(links[platform], "_blank", "noopener,noreferrer")
  }

  const handleDownload = async (photo: typeof photos[0]) => {
    setDownloading(true)
    try {
      const response = await fetch(photo.src)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${photo.title.replace(/\s+/g, "-").toLowerCase()}.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch {
      // fallback: open image in new tab
      window.open(photo.src, "_blank")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary">
          <div className="absolute inset-0 bg-[url('/images/ehden-landscape.jpg')] bg-cover bg-center opacity-20" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
              <Camera className="mr-2 h-4 w-4" />
              Media Gallery
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Photo Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              معرض الصور
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-primary-foreground/70">
              Explore the beauty of Ehden and Zgharta through our collection of photographs
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/media/gallery" className="hover:text-primary">Media</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Photo Gallery</span>
            </nav>
          </div>
        </div>

        {/* Gallery Controls */}
        <section className="border-b bg-background py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Category Tabs */}
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
                  {categories.map((category) => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm"
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{filteredPhotos.length} photos</span>
                <div className="flex rounded-lg border p-1">
                  <Button 
                    variant={viewMode === "grid" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "masonry" ? "default" : "ghost"} 
                    size="sm"
                    onClick={() => setViewMode("masonry")}
                    className="h-8 w-8 p-0"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
                : "columns-2 md:columns-3 lg:columns-4 space-y-4"
            }`}>
              {filteredPhotos.map((photo, index) => (
                <div 
                  key={photo.id}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl bg-muted ${
                    viewMode === "masonry" ? "break-inside-avoid mb-4" : "aspect-square"
                  }`}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    width={600}
                    height={viewMode === "masonry" ? (index % 3 === 0 ? 800 : 600) : 600}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                      viewMode === "grid" ? "h-full" : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-serif text-lg font-semibold">{photo.title}</h3>
                    <p className="text-sm text-white/80">{photo.titleAr}</p>
                    <div className="mt-2 flex items-center gap-3 text-xs text-white/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {photo.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {photo.date}
                      </span>
                    </div>
                  </div>
                  <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
                      <ZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto border-0 bg-[#0d1b3e] p-0">
            <DialogTitle className="sr-only">
              {selectedPhoto?.title || "Photo"}
            </DialogTitle>
            {selectedPhoto && (
              <div className="relative">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
                  onClick={() => setSelectedPhoto(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Image */}
                <div className="relative flex min-h-[40vh] items-center justify-center p-4 sm:p-8">
                  {currentIndex > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={goToPrevious}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                  )}
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    width={1200}
                    height={800}
                    className="max-h-[60vh] w-auto rounded-lg object-contain"
                  />
                  {currentIndex < filteredPhotos.length - 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 z-50 -translate-y-1/2 text-white hover:bg-white/20"
                      onClick={goToNext}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  )}
                </div>

                {/* Photo Info */}
                <div className="border-t border-white/10 bg-[#0a1628] p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-white">{selectedPhoto.title}</h3>
                      <p className="text-lg text-white/80">{selectedPhoto.titleAr}</p>
                      <p className="mt-2 text-sm text-white/70">{selectedPhoto.description}</p>
                      <div className="mt-3 flex items-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {selectedPhoto.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {selectedPhoto.date}
                        </span>
                        <Badge variant="outline" className="border-white/40 text-white/80">
                          {categories.find(c => c.id === selectedPhoto.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-white/60 bg-white/10 text-white hover:bg-white/25 hover:text-white hover:border-white/80 transition-all"
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 p-2 bg-[#0d1b3e] border border-white/20" side="top" align="end">
                          <p className="text-xs text-white/50 px-2 pb-2 font-medium uppercase tracking-wide">Share via</p>
                          <button
                            onClick={() => handleSharePlatform("facebook", selectedPhoto)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1877F2] text-white text-xs font-bold">f</span>
                            Facebook
                          </button>
                          <button
                            onClick={() => handleSharePlatform("whatsapp", selectedPhoto)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white text-xs font-bold">W</span>
                            WhatsApp
                          </button>
                          <button
                            onClick={() => handleSharePlatform("twitter", selectedPhoto)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs font-bold">𝕏</span>
                            X (Twitter)
                          </button>
                          <button
                            onClick={() => handleSharePlatform("telegram", selectedPhoto)}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#229ED9] text-white text-xs font-bold">✈</span>
                            Telegram
                          </button>
                          <div className="my-1 border-t border-white/10" />
                          <button
                            onClick={handleCopyLink}
                            className="flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            {shareCopied ? (
                              <><Check className="h-4 w-4 text-green-400 ml-1.5" /><span className="text-green-400">Link Copied!</span></>
                            ) : (
                              <><span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white text-xs">🔗</span>Copy Link</>
                            )}
                          </button>
                        </PopoverContent>
                      </Popover>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(selectedPhoto)}
                        disabled={downloading}
                        className={`border-white/60 text-white hover:text-white transition-all ${
                          downloading
                            ? "bg-white/30 border-white"
                            : "bg-white/10 hover:bg-white/25 hover:border-white/80"
                        }`}
                      >
                        {downloading ? (
                          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Downloading…</>
                        ) : (
                          <><Download className="mr-2 h-4 w-4" />Download</>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-white/50">
                    {currentIndex + 1} of {filteredPhotos.length}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="border-t bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Share Your Photos
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Have beautiful photos of Ehden or Zgharta? We&apos;d love to feature them in our gallery. 
              Contact us to share your memories with our community.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/media/videos">Watch Videos</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
