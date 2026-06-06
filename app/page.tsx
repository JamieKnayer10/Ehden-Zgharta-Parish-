import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { MassTimesSection } from "@/components/sections/mass-times-section"
import { Yanabi3Section } from "@/components/sections/yanabi3-section"
import { NewsSection } from "@/components/sections/news-section"
import { MediaPlatformsSection } from "@/components/sections/media-platforms-section"
import { PatriarchDouaihySection } from "@/components/sections/patriarch-douaihy-section"
import { VerseSection } from "@/components/sections/verse-section"
import { ChurchesSection } from "@/components/sections/churches-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Section 1: Hero Slider */}
        <HeroSection />

        {/* Section 2: Mass Schedule */}
        <MassTimesSection />

        {/* Section 3: Yanabi3 Bulletins */}
        <Yanabi3Section />

        {/* Section 4: News */}
        <NewsSection />

        {/* Section 5: Media Platforms */}
        <MediaPlatformsSection />

        {/* Section 6: Blessed Patriarch Douaihy */}
        <PatriarchDouaihySection />

        {/* Section 7: Verse of the Day */}
        <VerseSection />

        {/* Section 8: Churches & Holy Sites */}
        <ChurchesSection />
      </main>

      <Footer />
    </div>
  )
}
