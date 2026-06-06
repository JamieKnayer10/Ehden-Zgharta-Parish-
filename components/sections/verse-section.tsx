import { Quote } from "lucide-react"

export function VerseSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <div className="relative bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-8 md:p-12 text-center border border-border/50">
          {/* Decorative Elements */}
          <div className="absolute top-6 left-6 text-secondary/20">
            <Quote className="h-12 w-12" />
          </div>
          <div className="absolute bottom-6 right-6 text-secondary/20 rotate-180">
            <Quote className="h-12 w-12" />
          </div>
          
          {/* Cross Icon */}
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <svg className="h-6 w-6 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 2v7H4v2h7v11h2V11h7V9h-7V2z"/>
              </svg>
            </div>
          </div>
          
          {/* Verse Content */}
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
                Verse of the Day
              </p>
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed">
                &ldquo;I am the resurrection and the life. The one who believes in me will live, even though they die.&rdquo;
              </blockquote>
            </div>
            
            <div className="pt-4 border-t border-border/50" dir="rtl">
              <blockquote className="font-serif text-lg md:text-xl text-muted-foreground leading-relaxed">
                &ldquo;أَنَا القِيَامَةُ وَالحَيَاة. مَنْ آمَنَ بِي وَلَوْ مَاتَ فَسَيَحْيَا.&rdquo;
              </blockquote>
            </div>
            
            <cite className="block text-sm text-muted-foreground not-italic">
              John 11:25 | يوحنا 11:25
            </cite>
          </div>
        </div>
      </div>
    </section>
  )
}
