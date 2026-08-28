"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { CardContent } from "@/components/ui/Card"
import { GlowCard } from "@/components/ui/GlowCard"
import { GridPattern } from "@/components/ui/GridPattern"
import { COMPANY } from "@/lib/constants"

function ContactForm() {
  const searchParams = useSearchParams()
  const initialSubject = searchParams.get("subject") || ""
  const [sent, setSent] = useState(false)

  const inputClasses =
    "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get("name") || "")
    const email = String(data.get("email") || "")
    const subject = String(data.get("subject") || "")
    const message = String(data.get("message") || "")

    const body = `${message}\n\n—\nFrom: ${name} <${email}>`
    window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <GlowCard className="p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">
              Name
            </label>
            <input id="name" name="name" type="text" required placeholder="Your name" className={inputClasses} />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className={inputClasses}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-foreground">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            defaultValue={initialSubject}
            placeholder="How can we help?"
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            placeholder="Tell us more about your inquiry..."
            className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message <Send className="ml-2 h-4 w-4" />
        </Button>

        {sent && (
          <p className="text-center text-xs text-muted-foreground">
            Your email app should have opened. If it didn&apos;t, write to us directly at{" "}
            <a href={`mailto:${COMPANY.email}`} className="text-primary hover:underline">
              {COMPANY.email}
            </a>
            .
          </p>
        )}
      </form>
    </GlowCard>
  )
}

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <GridPattern className="opacity-20" />
      <Container className="relative">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have questions about DIKKHA or CHHAR? We'd love to hear from you."
          className="mb-12"
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <GlowCard className="p-0">
              <CardContent className="flex flex-col gap-6 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Email Us</h3>
                    <p className="mb-1.5 text-sm text-muted-foreground">
                      For support and general inquiries:
                    </p>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {COMPANY.email}
                    </a>
                    <p className="mt-1.5 text-sm text-muted-foreground">Phone:</p>
                    <a
                      href={`tel:${COMPANY.phone}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {COMPANY.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Registered Office</h3>
                    <address className="text-sm not-italic text-muted-foreground">
                      {COMPANY.legalName}
                      <br />
                      {COMPANY.address.street}
                      <br />
                      {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
                      <br />
                      {COMPANY.address.country}
                    </address>
                    <p className="mt-2 text-xs text-muted-foreground/70">{COMPANY.teamNote}</p>
                  </div>
                </div>
              </CardContent>
            </GlowCard>

            <div className="rounded-xl border border-border bg-muted/50 p-6">
              <h3 className="mb-3 text-base font-semibold text-foreground">Frequently Asked Questions</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Before sending a message, check if your question is answered in our FAQ sections.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <a href="/products/dikkha#faq">DIKKHA FAQ</a>
                </Button>
                <Button variant="outline" size="sm" asChild className="justify-start">
                  <a href="/products/chhar#faq">CHHAR FAQ</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Suspense fallback={<div className="rounded-xl border border-border bg-muted/50 p-8 h-[600px] animate-pulse" />}>
            <ContactForm />
          </Suspense>
        </div>
      </Container>
    </section>
  )
}
