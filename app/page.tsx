import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { IntroLoader } from "@/components/intro-loader"
import { Reveal } from "@/components/reveal"
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
      <IntroLoader />
      <Header />
      
      <main className="flex-1">
        {/* Section 1: Hero Slider */}
        <HeroSection />

        {/* Section 2: Mass Schedule */}
        <Reveal>
          <MassTimesSection />
        </Reveal>

        {/* Section 3: Yanabi3 Bulletins */}
        <Reveal>
          <Yanabi3Section />
        </Reveal>

        {/* Section 4: News */}
        <Reveal>
          <NewsSection />
        </Reveal>

        {/* Section 5: Media Platforms */}
        <Reveal>
          <MediaPlatformsSection />
        </Reveal>

        {/* Section 6: Blessed Patriarch Douaihy */}
        <Reveal>
          <PatriarchDouaihySection />
        </Reveal>

        {/* Section 7: Verse of the Day */}
        <Reveal>
          <VerseSection />
        </Reveal>

        {/* Section 8: Churches & Holy Sites */}
        <Reveal>
          <ChurchesSection />
        </Reveal>
      </main>

      <Footer />
    </div>
  )
}
