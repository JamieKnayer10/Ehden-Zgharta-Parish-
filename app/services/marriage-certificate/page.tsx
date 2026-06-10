"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Heart, CheckCircle, Send } from "lucide-react"

export default function MarriageCertificatePage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-12">
          <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/10">
                <Heart className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">
                  Marriage Certificate
                </h1>
                <p className="text-xl font-light text-secondary mt-1" dir="rtl">
                  شهادة زواج
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            {isSubmitted ? (
              <Card className="border-none shadow-xl">
                <CardContent className="py-16 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-foreground">Request Submitted!</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Thank you for your submission. Our parish office will review your request and 
                    contact you within 3-5 business days.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Button onClick={() => setIsSubmitted(false)}>Submit Another Request</Button>
                    <Button variant="outline" asChild>
                      <Link href="/services">Back to Services</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-xl">
                <CardHeader className="border-b bg-muted/50">
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">Form</Badge>
                    Marriage Certificate Request
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Husband Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground border-b pb-2">
                        Husband Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="husbandName">Full Name *</Label>
                        <Input id="husbandName" placeholder="Husband's full name" required />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="husbandFather">{"Father's"} Name *</Label>
                          <Input id="husbandFather" placeholder="Father's name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="husbandMother">{"Mother's"} Name *</Label>
                          <Input id="husbandMother" placeholder="Mother's maiden name" required />
                        </div>
                      </div>
                    </div>

                    {/* Wife Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground border-b pb-2">
                        Wife Information
                      </h3>
                      
                      <div className="space-y-2">
                        <Label htmlFor="wifeName">Full Name *</Label>
                        <Input id="wifeName" placeholder="Wife's full name (maiden name)" required />
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="wifeFather">{"Father's"} Name *</Label>
                          <Input id="wifeFather" placeholder="Father's name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="wifeMother">{"Mother's"} Name *</Label>
                          <Input id="wifeMother" placeholder="Mother's maiden name" required />
                        </div>
                      </div>
                    </div>

                    {/* Marriage Details */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground border-b pb-2">
                        Marriage Details
                      </h3>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="marriageDate">Date of Marriage *</Label>
                          <Input id="marriageDate" type="date" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="marriageChurch">Church of Marriage *</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select church" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mar-mama">Mar Mama Church - Ehden</SelectItem>
                              <SelectItem value="st-george">St. George Cathedral - Zgharta</SelectItem>
                              <SelectItem value="our-lady">Our Lady of Zgharta</SelectItem>
                              <SelectItem value="mar-sarkis">Mar Sarkis Monastery - Ehden</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-foreground border-b pb-2">
                        Contact Information
                      </h3>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input id="phone" type="tel" placeholder="+961 XX XXX XXX" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input id="email" type="email" placeholder="email@example.com" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Request *</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="official">Official Documentation</SelectItem>
                            <SelectItem value="immigration">Immigration Purposes</SelectItem>
                            <SelectItem value="replacement">Replacement Copy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Any additional information..."
                          rows={3}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>Submitting...</>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
