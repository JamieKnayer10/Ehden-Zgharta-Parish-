"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowLeft, Baby, Heart, Award, FileText } from "lucide-react"

const services = [
  {
    id: "first-sacrifice",
    title: "The First Sacrifice",
    titleAr: "القربانة الأولى",
    description: "Request a certificate or registration for the First Holy Communion sacrament.",
    icon: Baby,
    color: "bg-blue-500",
    href: "/services/first-sacrifice",
  },
  {
    id: "marriage-certificate",
    title: "Marriage Certificate",
    titleAr: "شهادة زواج",
    description: "Request a marriage certificate from parish records.",
    icon: Heart,
    color: "bg-pink-500",
    href: "/services/marriage-certificate",
  },
  {
    id: "confirmation-certificate",
    title: "Certificate of Accreditation and Confirmation",
    titleAr: "شهادة تثبيت",
    description: "Request a certificate for the Sacrament of Confirmation.",
    icon: Award,
    color: "bg-amber-500",
    href: "/services/confirmation-certificate",
  },
  {
    id: "death-certificate",
    title: "Death Certificate",
    titleAr: "شهادة وفاة",
    description: "Request a death certificate from parish records.",
    icon: FileText,
    color: "bg-gray-500",
    href: "/services/death-certificate",
  },
]

export default function ServicesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20">
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8 text-center text-primary-foreground">
            <Badge variant="secondary" className="mb-4">Parish Services</Badge>
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Services</h1>
            <p className="mt-2 text-2xl font-light text-secondary" dir="rtl">
              خدمات الرعية
            </p>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Request certificates and documents from the parish. Fill out the appropriate
              form and we will process your request.
            </p>
          </div>
        </section>

        {/* Back Navigation */}
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 py-4">
            <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <Card key={service.id} className="group border-none shadow-lg hover:shadow-xl transition-all">
                  <Link href={service.href}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${service.color} text-white shrink-0`}>
                          <service.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-secondary mt-1" dir="rtl">{service.titleAr}</p>
                          <p className="text-muted-foreground mt-2">{service.description}</p>
                          <p className="mt-4 text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                            Fill Form
                            <ArrowRight className="h-4 w-4" />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground">
                Need help with a service not listed here?
              </p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/contact">Contact the Parish Office</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
