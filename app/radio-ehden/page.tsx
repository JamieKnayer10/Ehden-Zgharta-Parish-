"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { 
  Play, 
  Pause,
  Radio, 
  Calendar, 
  Clock, 
  Share2, 
  Volume2,
  VolumeX,
  Music,
  Mic,
  Heart,
  ChevronRight,
  Facebook,
  Instagram
} from "lucide-react"

const podcastArchive = [
  {
    id: 1,
    title: "Holy Week Reflections 2026",
    titleAr: "تأملات أسبوع الآلام ٢٠٢٦",
    host: "Fr. Georges Kamal",
    description: "A special series of spiritual reflections during Holy Week",
    duration: "45 min",
    date: "April 2026",
    image: "https://images.unsplash.com/photo-1445633743309-b60418bedbba?w=600&q=80",
    category: "Spiritual",
    plays: 2340,
  },
  {
    id: 2,
    title: "History of Ehden Churches",
    titleAr: "تاريخ كنائس إهدن",
    host: "Dr. Antoine Khoury",
    description: "Documentary series exploring the rich heritage of Ehden churches",
    duration: "1 hr 20 min",
    date: "March 2026",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=600&q=80",
    category: "Documentary",
    plays: 1856,
  },
  {
    id: 3,
    title: "Christmas Hymns Collection",
    titleAr: "مجموعة ترانيم الميلاد",
    host: "Mar Mama Choir",
    description: "Beautiful collection of traditional Maronite Christmas hymns",
    duration: "1 hr 5 min",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80",
    category: "Music",
    plays: 4521,
  },
  {
    id: 4,
    title: "Youth Faith Discussion",
    titleAr: "حوار الشباب والإيمان",
    host: "Tony Moawad",
    description: "Young voices discussing faith challenges in modern times",
    duration: "55 min",
    date: "February 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    category: "Talk Show",
    plays: 1234,
  },
]

const schedule = [
  { time: "06:00", program: "Morning Prayer", programAr: "صلاة الصباح", isLive: false },
  { time: "07:00", program: "Morning Reflections", programAr: "تأملات الصباح", isLive: false },
  { time: "08:00", program: "Religious Music", programAr: "موسيقى دينية", isLive: false },
  { time: "10:00", program: "Community Hour", programAr: "ساعة المجتمع", isLive: false },
  { time: "12:00", program: "Ehden News", programAr: "أخبار إهدن", isLive: true },
  { time: "14:00", program: "Afternoon Mix", programAr: "مزيج بعد الظهر", isLive: false },
  { time: "16:00", program: "Youth Corner", programAr: "ركن الشباب", isLive: false },
  { time: "18:00", program: "Evening News", programAr: "أخبار المساء", isLive: false },
  { time: "20:00", program: "Evening Hymns", programAr: "ترانيم المساء", isLive: false },
  { time: "22:00", program: "Night Prayer", programAr: "صلاة الليل", isLive: false },
]

const recentlyPlayed = [
  { title: "Ave Maria", artist: "Church Choir", time: "3 min ago" },
  { title: "Ya Oum Allah", artist: "Fairuz", time: "8 min ago" },
  { title: "Psalm 23", artist: "Fr. Georges", time: "15 min ago" },
]

export default function RadioEhdenPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState([75])
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-950 to-sky-900">
      <Header />
      
      <main className="flex-1">
        {/* Hero Player Section */}
        <section className="relative py-16 lg:py-24">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-sky-600/10 blur-3xl" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-green-600/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center mb-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/radio%20ehden%20logo-b7zXcUIR3maHfovbEt0keF4lm9v1L8.jpg"
                alt="Radio Ehden"
                width={160}
                height={160}
                className="mx-auto rounded-2xl bg-white p-4 shadow-2xl"
              />
              <h1 className="mt-6 font-serif text-4xl md:text-5xl font-bold text-white">Radio Ehden</h1>
              <p className="mt-2 text-xl text-sky-200">Voice of Wisdom & Faith</p>
              <p className="text-sky-300" dir="rtl">صوت الحكمة والإيمان</p>
            </div>

            {/* Main Player Card */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
                <CardContent className="p-8">
                  {/* On Air Badge */}
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Badge className="bg-green-500 text-white border-0 px-4 py-1.5">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      ON AIR
                    </Badge>
                    <span className="text-white/60 text-sm">{currentTime}</span>
                  </div>

                  {/* Now Playing */}
                  <div className="text-center mb-8">
                    <p className="text-sky-300 text-sm uppercase tracking-wider mb-2">Now Playing</p>
                    <h2 className="text-2xl font-bold text-white">Ehden News</h2>
                    <p className="text-sky-200 mt-1" dir="rtl">أخبار إهدن</p>
                    <p className="text-sky-400 text-sm mt-2">with Rima Frangieh</p>
                  </div>

                  {/* Audio Visualizer Placeholder */}
                  <div className="flex items-end justify-center gap-1 h-16 mb-8">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-gradient-to-t from-green-500 to-sky-400 rounded-full transition-all duration-150 ${
                          isPlaying ? "animate-pulse" : ""
                        }`}
                        style={{
                          height: isPlaying ? `${Math.random() * 100}%` : "20%",
                          animationDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Play Controls */}
                  <div className="flex items-center justify-center gap-6 mb-8">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-white/10"
                    >
                      <Heart className="h-6 w-6" />
                    </Button>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg transition-transform group-hover:scale-105 group-active:scale-95">
                        {isPlaying ? (
                          <Pause className="h-8 w-8" />
                        ) : (
                          <Play className="h-8 w-8 ml-1" />
                        )}
                      </div>
                    </button>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white hover:bg-white/10"
                    >
                      <Share2 className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-white/60 hover:bg-white/10 hover:text-white"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                    <Slider
                      value={isMuted ? [0] : volume}
                      onValueChange={setVolume}
                      max={100}
                      step={1}
                      className="w-32"
                    />
                    <span className="text-white/60 text-sm w-8">{isMuted ? 0 : volume[0]}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Schedule & Recently Played */}
        <section className="py-16 bg-sky-950/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Today's Schedule */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-2xl font-bold text-white">{"Today's"} Schedule</h2>
                  <Badge variant="outline" className="border-sky-600 text-sky-300">
                    <Calendar className="h-3 w-3 mr-1" />
                    April 9, 2026
                  </Badge>
                </div>
                <Card className="bg-sky-900/30 border-sky-800/50">
                  <CardContent className="p-0">
                    <div className="divide-y divide-sky-800/50">
                      {schedule.map((item, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-4 p-4 transition-colors ${
                            item.isLive ? "bg-green-600/10" : "hover:bg-sky-800/20"
                          }`}
                        >
                          <span className={`text-sm font-mono w-14 shrink-0 ${item.isLive ? "text-green-400" : "text-sky-500"}`}>
                            {item.time}
                          </span>
                          <p className={`font-medium flex-1 ${item.isLive ? "text-white" : "text-sky-200"}`}>
                            {item.program}
                          </p>
                          <p className="text-sm text-sky-500 flex-1 text-center" dir="rtl">{item.programAr}</p>
                          <div className="w-14 shrink-0 flex justify-end">
                            {item.isLive && (
                              <Badge className="bg-green-500 text-white">LIVE</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recently Played */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-white mb-6">Recently Played</h2>
                <Card className="bg-sky-900/30 border-sky-800/50">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {recentlyPlayed.map((track, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-800/50">
                            <Music className="h-5 w-5 text-sky-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white truncate">{track.title}</p>
                            <p className="text-sm text-sky-400">{track.artist}</p>
                          </div>
                          <span className="text-xs text-sky-500">{track.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Request Song */}
                <Card className="mt-4 bg-gradient-to-br from-green-600/20 to-sky-600/20 border-green-500/30">
                  <CardContent className="p-4 text-center">
                    <Mic className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-semibold text-white mb-1">Request a Song</h3>
                    <p className="text-sm text-sky-300 mb-3">Send us your favorite hymn or song request</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Make a Request
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Archive Section */}
        <section className="py-16 bg-sky-900/30">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl font-bold text-white">Podcast Archive</h2>
                <p className="text-sky-300 mt-1">Past recordings of popular shows available on-demand</p>
              </div>
              <Button variant="outline" className="border-sky-600 text-sky-900 bg-sky-100 hover:bg-sky-200 hover:text-sky-950">
                Browse All Episodes
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {podcastArchive.map((podcast) => (
                <Card key={podcast.id} className="bg-sky-900/50 border-sky-800/50 overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={podcast.image}
                      alt={podcast.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/50 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-sky-800/80">{podcast.category}</Badge>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs text-sky-300 bg-sky-950/70 px-2 py-1 rounded">{podcast.duration}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="h-5 w-5 ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-green-400 transition-colors line-clamp-1">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-sky-500 mt-1" dir="rtl">{podcast.titleAr}</p>
                    <p className="text-sm text-sky-300 mt-2 line-clamp-2">{podcast.description}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-sky-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {podcast.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Play className="h-3 w-3" />
                        {podcast.plays.toLocaleString()} plays
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-12 bg-sky-950 border-t border-sky-800/50">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Radio Ehden</h3>
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" className="border-sky-600 bg-sky-900/50 text-sky-300 hover:bg-sky-800 hover:text-white" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5 mr-2 text-blue-400" />
                  Facebook
                </a>
              </Button>
              <Button variant="outline" className="border-sky-600 bg-sky-900/50 text-sky-300 hover:bg-sky-800 hover:text-white" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 mr-2 text-pink-400" />
                  Instagram
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
