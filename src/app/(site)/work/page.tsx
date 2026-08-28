import Link from "next/link"
import { ArrowUpRight, Boxes, GitBranch, Rocket } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { GridPattern } from "@/components/ui/GridPattern"
import { GlowCard } from "@/components/ui/GlowCard"
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll"
import { PARTNERS } from "@/content/partners"

export const metadata = {
  title: "Work",
  description:
    "NeuronFish runs engineering for a portfolio of companies, building internal agentic AI systems, agentic ERPs, and the platforms their customers use.",
}

const HOW_WE_WORK = [
  {
    icon: GitBranch,
    title: "We own the stack",
    body: "From data and infrastructure to the models and the interface, one team is accountable for the whole system.",
  },
  {
    icon: Boxes,
    title: "Embedded, not outsourced",
    body: "We work as the partner's engineering team, in their tools and their roadmap, not as a vendor at arm's length.",
  },
  {
    icon: Rocket,
    title: "We ship, not spec",
    body: "Every engagement is measured by what runs in production, not by documents delivered.",
  },
]

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-16 md:pt-24 pb-10 md:pb-14">
        <GridPattern className="absolute inset-0 -z-10 opacity-[0.08]" />
        <Container className="relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Work</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              NeuronFish runs engineering for a portfolio of companies. We build the
              internal agentic AI systems, the automation, and the platforms their
              customers use.
            </p>
          </div>

          {/* Logo wall */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((p) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-xl border border-border bg-card/40 p-6 transition-colors hover:border-foreground/25"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-14 max-w-[80%] object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagements */}
      <section className="border-t border-border bg-muted/20 py-12 md:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {PARTNERS.map((p) => (
              <AnimateOnScroll key={p.id}>
                <GlowCard className="h-full p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-background p-2"
                        style={{ boxShadow: `0 0 0 1px ${p.accent}22` }}
                      >
                        <img src={p.logo} alt={p.name} className="max-h-8 w-auto" />
                      </span>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">{p.name}</h2>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          {p.sector}
                        </p>
                      </div>
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {p.host}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="py-16 md:py-24">
        <Container>
          <AnimateOnScroll>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              How we work with partners
            </h2>
          </AnimateOnScroll>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HOW_WE_WORK.map((item) => (
              <AnimateOnScroll key={item.title}>
                <div className="h-full rounded-xl border border-border bg-card/40 p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-28">
        <Container>
          <AnimateOnScroll variant="scale-in">
            <div className="cta-dark relative overflow-hidden rounded-2xl border border-white/[0.08] px-6 py-16 text-center">
              <GridPattern className="opacity-[0.06] fill-white" />
              <div className="relative">
                <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  Have a company that needs an engineering team?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-zinc-400">
                  We take on a small number of partners at a time. Tell us what you are
                  building.
                </p>
                <Button size="lg" variant="glow" asChild className="mt-8">
                  <Link href="/contact?subject=Partnership">Start a conversation</Link>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  )
}
