"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Play, 
  Tv, 
  Calendar, 
  Clock, 
  Share2, 
  Maximize2, 
  Volume2,
  VolumeX,
  ChevronRight,
  Facebook,
  Youtube
} from "lucide-react"

const videoArchive = [
  {
    id: 1,
    title: "Palm Sunday Mass 2026",
    titleAr: "قداس أحد الشعانين ٢٠٢٦",
    description: "Full recording of Palm Sunday celebration from Mar Mama Church",
    duration: "1 hr 45 min",
    date: "April 6, 2026",
    image: "https://images.unsplash.com/photo-1445633743309-b60418bedbba?w=600&q=80",
    category: "Mass",
    views: 3420,
  },
  {
    id: 2,
    title: "The Saints of Ehden",
    titleAr: "قديسو إهدن",
    description: "Documentary about the patron saints of Ehden churches",
    duration: "52 min",
    date: "March 15, 2026",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&q=80",
    category: "Documentary",
    views: 2156,
  },
  {
    id: 3,
    title: "Easter Vigil 2025",
    titleAr: "سهرة الفصح ٢٠٢٥",
    description: "The beautiful Easter Vigil celebration with choir performances",
    duration: "2 hr 30 min",
    date: "April 19, 2025",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80",
    category: "Special Event",
    views: 5678,
  },
  {
    id: 4,
    title: "Feast of the Assumption",
    titleAr: "عيد انتقال السيدة العذراء",
    description: "Annual celebration of the Assumption from Our Lady of Zgharta",
    duration: "2 hr 10 min",
    date: "August 15, 2025",
    image: "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?w=600&q=80",
    category: "Special Event",
    views: 4231,
  },
]

const archiveCategories = ["All", "Mass", "Documentary", "Special Event"]

const schedule = [
  { time: "07:00", program: "Morning Prayer", programAr: "صلاة الصباح" },
  { time: "08:00", program: "Daily Mass", programAr: "القداس اليومي" },
  { time: "10:00", program: "Spiritual Reflection", programAr: "تأمل روحي" },
  { time: "12:00", program: "Angelus", programAr: "صلاة التبشير الملائكي" },
  { time: "14:00", program: "Documentary", programAr: "فيلم وثائقي" },
  { time: "16:00", program: "Youth Program", programAr: "برنامج الشباب" },
  { time: "18:00", program: "Evening Mass", programAr: "قداس المساء" },
  { time: "20:00", program: "Faith Talk", programAr: "حديث الإيمان" },
  { time: "22:00", program: "Night Prayer", programAr: "صلاة الليل" },
]

export default function ZghartaChannelPage() {
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      
      <main className="flex-1">
        {/* Live Stream Section */}
        <section className="relative bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
            <div className="grid gap-8 lg:grid-cols-5">
              {/* Video Player */}
              <div className="lg:col-span-3">
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  {/* Placeholder for live stream */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zgharta%20channel%20logo-rPVGuQhyx5iXVzOiX2ItOUKodL3gmo.jpg"
                      alt="Zgharta Channel"
                      width={200}
                      height={200}
                      className="opacity-30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="group relative">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:bg-white/30 transition-all scale-150" />
                        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform group-hover:scale-110">
                          <Play className="h-8 w-8 ml-1" />
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <Badge className="bg-red-600 text-white border-0 px-3 py-1">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      LIVE
                    </Badge>
                    <span className="text-white/80 text-sm">1,234 watching</span>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <div className="h-1 w-24 bg-white/30 rounded-full">
                          <div className="h-full w-3/4 bg-white rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                          <Share2 className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                          <Maximize2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Now Playing Info */}
                <div className="mt-6 flex items-start gap-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zgharta%20channel%20logo-rPVGuQhyx5iXVzOiX2ItOUKodL3gmo.jpg"
                    alt="Zgharta Channel"
                    width={64}
                    height={64}
                    className="rounded-lg bg-white p-2"
                  />
                  <div className="flex-1 min-w-0">
                    <h1 className="font-serif text-2xl font-bold text-white">Sunday Morning Mass</h1>
                    <p className="text-slate-400 mt-1">Live from Mar Mama Church, Ehden</p>
                    <div className="flex items-center gap-4 mt-3">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Play className="h-4 w-4 mr-2" />
                        Watch Live
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-500 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Sidebar */}
              <div className="lg:col-span-2 bg-slate-900/50 rounded-xl p-6 border border-slate-800">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-semibold text-white">{"Today's"} Schedule</h2>
                  <Badge variant="outline" className="border-slate-600 text-slate-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    April 9
                  </Badge>
                </div>
                <div className="space-y-1">
                  {schedule.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        index === 5 ? "bg-red-600/20 border border-red-600/30" : "hover:bg-slate-800/50"
                      }`}
                    >
                      <span className={`text-sm font-mono w-12 shrink-0 ${index === 5 ? "text-red-400" : "text-slate-500"}`}>
                        {item.time}
                      </span>
                      <p className={`text-sm font-medium flex-1 ${index === 5 ? "text-white" : "text-slate-300"}`}>
                        {item.program}
                      </p>
                      <p className="text-xs text-slate-500 flex-1 text-left" dir="rtl">{item.programAr}</p>
                      <div className="w-12 shrink-0 flex justify-end">
                        {index === 5 && (
                          <Badge className="bg-red-600 text-white text-xs">NOW</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4 border-slate-500 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white">
                  View Full Schedule
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Video Archive Section */}
        <section className="py-16 bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Tabs defaultValue="All" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-white">Video Archive</h2>
                  <p className="text-slate-400 mt-1">Past recordings organized by category</p>
                </div>
                <TabsList className="bg-slate-800">
                  {archiveCategories.map((cat) => (
                    <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="All" className="mt-0">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {videoArchive.map((video) => (
                    <Card key={video.id} className="bg-slate-800/50 border-slate-700 overflow-hidden group cursor-pointer">
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={video.image}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-slate-900/80">{video.category}</Badge>
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-xs text-slate-300 bg-slate-950/70 px-2 py-1 rounded">{video.duration}</span>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-5 w-5 ml-0.5" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                          {video.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1" dir="rtl">{video.titleAr}</p>
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {video.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            {video.views.toLocaleString()} views
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {archiveCategories.slice(1).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {videoArchive.filter(v => v.category === category).map((video) => (
                      <Card key={video.id} className="bg-slate-800/50 border-slate-700 overflow-hidden group cursor-pointer">
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={video.image}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <span className="text-xs text-slate-300 bg-slate-950/70 px-2 py-1 rounded">{video.duration}</span>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                              <Play className="h-5 w-5 ml-0.5" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-white group-hover:text-red-400 transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1" dir="rtl">{video.titleAr}</p>
                          <p className="text-sm text-slate-400 mt-2 line-clamp-2">{video.description}</p>
                          <div className="flex items-center justify-between mt-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {video.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Play className="h-3 w-3" />
                              {video.views.toLocaleString()} views
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-12 bg-slate-950 border-t border-slate-800">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Zgharta Channel</h3>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="border-slate-500 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 mr-2 text-blue-400" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" className="border-slate-500 bg-slate-800/80 text-slate-200 hover:bg-slate-700 hover:text-white" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5 mr-2 text-red-500" />
                  YouTube
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
