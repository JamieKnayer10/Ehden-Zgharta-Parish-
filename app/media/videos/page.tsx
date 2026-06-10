"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ChevronRight, 
  Play,
  Clock,
  Eye,
  Calendar,
  X,
  ExternalLink,
  Video,
  Church,
  Mountain,
  PartyPopper,
  History
} from "lucide-react"

const categories = [
  { id: "all", name: "All Videos", nameAr: "جميع الفيديوهات", icon: Video },
  { id: "liturgy", name: "Liturgy", nameAr: "الليتورجيا", icon: Church },
  { id: "documentary", name: "Documentary", nameAr: "وثائقي", icon: History },
  { id: "events", name: "Events", nameAr: "الفعاليات", icon: PartyPopper },
  { id: "nature", name: "Nature & Heritage", nameAr: "الطبيعة والتراث", icon: Mountain },
]

const videos = [
  {
    id: 1,
    title: "Easter Celebration 2025 - Ehden Parish",
    titleAr: "احتفالات عيد الفصح 2025 - رعية إهدن",
    thumbnail: "/images/easter-procession.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "45:32",
    views: "12.5K",
    date: "April 2025",
    category: "liturgy",
    description: "Full coverage of the Easter celebrations at the Maronite Parish of Ehden, including the Holy Week processions and Easter Sunday Mass.",
    featured: true,
  },
  {
    id: 2,
    title: "Horsh Ehden Nature Reserve - Drone Tour",
    titleAr: "محمية حرش إهدن - جولة جوية",
    thumbnail: "/images/horsh-ehden.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12:45",
    views: "28.3K",
    date: "October 2025",
    category: "nature",
    description: "Breathtaking aerial footage of the famous Horsh Ehden nature reserve, showcasing the ancient cedar forests and stunning autumn colors.",
    featured: true,
  },
  {
    id: 3,
    title: "History of Mar Mama Church",
    titleAr: "تاريخ كنيسة مار ماما",
    thumbnail: "/images/mar-mama-church.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "22:18",
    views: "8.7K",
    date: "March 2025",
    category: "documentary",
    description: "Documentary exploring the rich history of Mar Mama Church, one of the oldest churches in Lebanon dating back to 749 AD.",
    featured: false,
  },
  {
    id: 4,
    title: "Summer Festival Ehden 2025",
    titleAr: "مهرجان إهدن الصيفي 2025",
    thumbnail: "/images/summer-festival.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1:15:42",
    views: "45.2K",
    date: "August 2025",
    category: "events",
    description: "Highlights from the annual Ehden Summer Festival featuring traditional Lebanese music, dabke performances, and cultural celebrations.",
    featured: true,
  },
  {
    id: 5,
    title: "Walking Tour of Old Ehden",
    titleAr: "جولة سير في إهدن القديمة",
    thumbnail: "/images/ehden-old-town.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "18:33",
    views: "15.8K",
    date: "June 2025",
    category: "nature",
    description: "Take a virtual walking tour through the charming streets of old Ehden, discovering hidden gems and traditional architecture.",
    featured: false,
  },
  {
    id: 6,
    title: "Christmas Mass - St. George Cathedral",
    titleAr: "قداس عيد الميلاد - كاتدرائية مار جرجس",
    thumbnail: "/images/st-george-cathedral.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1:32:15",
    views: "21.4K",
    date: "December 2024",
    category: "liturgy",
    description: "Full Christmas Mass celebration from St. George Cathedral in Zgharta with traditional Maronite hymns and carols.",
    featured: false,
  },
  {
    id: 7,
    title: "Qadisha Valley - Sacred Heritage",
    titleAr: "وادي قاديشا - التراث المقدس",
    thumbnail: "/images/qadisha-valley.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "35:20",
    views: "32.1K",
    date: "May 2025",
    category: "documentary",
    description: "Explore the UNESCO World Heritage site of Qadisha Valley, home to ancient monasteries and the spiritual heart of Maronite Christianity.",
    featured: true,
  },
  {
    id: 8,
    title: "Youth Retreat 2025",
    titleAr: "خلوة الشباب 2025",
    thumbnail: "/images/youth-gathering.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:45",
    views: "5.2K",
    date: "March 2025",
    category: "events",
    description: "Highlights from the annual parish youth retreat at Mar Sarkis Monastery, featuring workshops, prayers, and fellowship.",
    featured: false,
  },
  {
    id: 9,
    title: "Saydet el Hosn Pilgrimage",
    titleAr: "حج سيدة الحصن",
    thumbnail: "/images/saydet-el-hosn.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "25:10",
    views: "18.9K",
    date: "August 2025",
    category: "liturgy",
    description: "Annual pilgrimage to Saydet el Hosn shrine celebrating the Assumption of the Virgin Mary.",
    featured: false,
  },
  {
    id: 10,
    title: "Winter in Ehden - Snow Season",
    titleAr: "الشتاء في إهدن - موسم الثلج",
    thumbnail: "/images/ehden-winter.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "10:22",
    views: "42.7K",
    date: "January 2025",
    category: "nature",
    description: "Beautiful footage of Ehden covered in snow, showcasing the magical winter wonderland of North Lebanon.",
    featured: false,
  },
  {
    id: 11,
    title: "Blessed Patriarch Douaihy Documentary",
    titleAr: "وثائقي البطريرك المطوّب اسطفان الدويهي",
    thumbnail: "/images/church-interior.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "48:55",
    views: "25.6K",
    date: "August 2024",
    category: "documentary",
    description: "Documentary about the life and legacy of Blessed Patriarch Stephane Douaihy, the son of Ehden who was beatified in 2024.",
    featured: true,
  },
  {
    id: 12,
    title: "Zgharta Panoramic Views",
    titleAr: "إطلالات بانورامية على زغرتا",
    thumbnail: "/images/zgharta-panorama.jpg",
    youtubeId: "dQw4w9WgXcQ",
    duration: "6:18",
    views: "9.3K",
    date: "July 2025",
    category: "nature",
    description: "Stunning panoramic drone footage of Zgharta city and its surrounding mountains at sunset.",
    featured: false,
  },
]

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null)

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === selectedCategory)

  const featuredVideos = videos.filter(v => v.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-primary">
          <div className="absolute inset-0 bg-[url('/images/mountain-sunset.jpg')] bg-cover bg-center opacity-20" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 bg-accent text-accent-foreground">
              <Video className="mr-2 h-4 w-4" />
              Media Gallery
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
              Video Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-secondary">
              معرض الفيديوهات
            </p>
            <p className="mx-auto mt-2 max-w-2xl text-primary-foreground/70">
              Watch videos from our parish, community events, and the beautiful landscapes of Ehden and Zgharta
            </p>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/media" className="hover:text-primary">Media</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Videos</span>
            </nav>
          </div>
        </div>

        {/* Featured Videos */}
        <section className="py-12 bg-muted/20">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl mb-8">
              Featured Videos
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredVideos.slice(0, 3).map((video) => (
                <Card 
                  key={video.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-full bg-primary/90 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-1 text-xs text-white">
                      {video.duration}
                    </div>
                    <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{video.titleAr}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {video.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="border-b bg-background py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
                <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-2 text-sm flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </TabsTrigger>
                    )
                  })}
                </TabsList>
              </Tabs>
              <span className="text-sm text-muted-foreground">{filteredVideos.length} videos</span>
            </div>
          </div>
        </section>

        {/* All Videos Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl mb-8">
              {selectedCategory === "all" ? "All Videos" : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredVideos.map((video) => (
                <Card 
                  key={video.id}
                  className="group cursor-pointer overflow-hidden border transition-all duration-300 hover:shadow-lg hover:border-primary/50"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="rounded-full bg-primary p-3 shadow-lg">
                        <Play className="h-6 w-6 text-primary-foreground fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{video.titleAr}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {video.views}
                      </span>
                      <span>{video.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Video Player Dialog */}
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-5xl border-0 bg-black p-0 overflow-hidden">
            <DialogTitle className="sr-only">
              {selectedVideo?.title || "Video"}
            </DialogTitle>
            {selectedVideo && (
              <div>
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-50 text-white hover:bg-white/20"
                  onClick={() => setSelectedVideo(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Video Embed */}
                <div className="aspect-video bg-black">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Video Info */}
                <div className="bg-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-semibold text-foreground">{selectedVideo.title}</h3>
                      <p className="text-lg text-muted-foreground">{selectedVideo.titleAr}</p>
                      <p className="mt-3 text-sm text-muted-foreground">{selectedVideo.description}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {selectedVideo.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {selectedVideo.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {selectedVideo.date}
                        </span>
                        <Badge variant="secondary">
                          {categories.find(c => c.id === selectedVideo.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <a 
                        href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Watch on YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Subscribe Section */}
        <section className="border-t bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
              Subscribe to Our Channel
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Stay updated with the latest videos from our parish. Subscribe to Zgharta Channel on YouTube 
              for liturgical broadcasts, documentaries, and community events.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg" asChild>
                <a 
                  href="https://www.youtube.com/@ZghartaChannel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Subscribe on YouTube
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="border-white bg-white/10 text-white hover:bg-white hover:text-primary">
                <Link href="/media/gallery">
                  View Photo Gallery
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
