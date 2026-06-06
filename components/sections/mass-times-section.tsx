import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, Church, ArrowRight } from "lucide-react"

const massSchedule = [
  {
    title: "Weekday Masses",
    icon: Calendar,
    times: [
      { label: "Morning Mass", time: "7:00 AM" },
      { label: "Evening Mass", time: "6:00 PM" },
    ],
  },
  {
    title: "Sunday Masses",
    icon: Church,
    times: [
      { label: "First Mass", time: "8:00 AM" },
      { label: "Main Mass", time: "10:00 AM" },
      { label: "Evening Mass", time: "6:00 PM" },
    ],
  },
  {
    title: "Confession",
    icon: Clock,
    times: [
      { label: "Saturday", time: "5:00 - 6:00 PM" },
      { label: "Before each Mass", time: "30 min prior" },
    ],
  },
]

export function MassTimesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Join Us in Prayer</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-foreground">Mass Schedule</h2>
          <div className="mt-4 mx-auto w-20 h-1 bg-secondary rounded-full" />
        </div>

        {/* Mass Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {massSchedule.map((schedule) => (
            <Card key={schedule.title} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <schedule.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">{schedule.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {schedule.times.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/mass-times" className="flex items-center gap-2">
              View Full Schedule
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
