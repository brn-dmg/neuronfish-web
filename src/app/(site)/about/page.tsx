import Link from "next/link"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TeamCard } from "@/components/site/TeamCard"
import { GlowCard } from "@/components/ui/GlowCard"
import { GridPattern } from "@/components/ui/GridPattern"
import { MadeInBangladesh } from "@/components/site/MadeInBangladesh"
import { TEAM_MEMBERS } from "@/content/team"

export const metadata = {
  title: "About Us",
  description:
    "NeuronFish, Inc. is a technology company building enterprise AI systems and next-gen apps. Meet the team.",
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 section-gradient-light">
        <GridPattern className="opacity-30" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              We are <span className="text-gradient">NeuronFish</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A technology company that designs and builds enterprise AI systems and
              modern applications. We ship our own products, and we run the technology
              for the companies we partner with.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80">
              NeuronFish, Inc. is a Delaware corporation. Our engineering team is based
              in Dhaka, Bangladesh.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <GlowCard className="p-8">
              <h2 className="mb-3 text-xl font-semibold text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To build software that puts advanced technology to practical use,
                solving real problems for the people and companies who rely on it.
              </p>
            </GlowCard>
            <GlowCard className="p-8">
              <h2 className="mb-3 text-xl font-semibold text-foreground">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the engineering team that ambitious companies trust with their
                hardest technical problems, and to grow a portfolio of products used by
                millions.
              </p>
            </GlowCard>
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title="Our Journey" className="mb-14" />
          <div className="relative mx-auto max-w-4xl">
            {/* Animated connecting line */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </div>
            <div className="grid gap-8 md:grid-cols-5">
              {[
                { year: "2025", title: "Inception", desc: "NeuronFish was founded with a small team and a big goal." },
                { year: "January 2026", title: "Dikkha Pilot", desc: "Launched the pilot of our AI study assistant." },
                { year: "February 2026", title: "Chhar Pilot", desc: "Started pilot testing the deals platform." },
                { year: "2026", title: "Partner Engineering", desc: "Became the technology team for a portfolio of companies." },
                { year: "Future", title: "Growth", desc: "Scaling our products and partnerships to reach millions." },
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-background relative z-10">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="mb-1 block text-sm font-semibold text-primary">{item.year}</span>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Where we build */}
      <section className="border-t border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Built in Dhaka
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Our engineering team works from Dhaka, Bangladesh. It is where the
                company started and where every product and partner system is built.
              </p>
            </div>
            <MadeInBangladesh />
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Meet the Team"
            subtitle="The people building it."
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </Container>
      </section>

      {/* Hiring & Press */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <GlowCard className="flex flex-col items-center justify-center border-dashed p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold text-foreground">We&apos;re Hiring</h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Want to build products people love and systems companies depend on? We
                are always looking for strong engineers and designers.
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact?subject=Careers">Contact Us</Link>
              </Button>
            </GlowCard>

            <GlowCard className="flex flex-col items-center justify-center p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold text-foreground">Media &amp; Press</h3>
              <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                Download our brand assets, logos, and official colors for media usage.
              </p>
              <Button variant="secondary" className="gap-2">
                <Download className="h-4 w-4" /> Download Press Kit
              </Button>
            </GlowCard>
          </div>
        </Container>
      </section>
    </>
  )
}
