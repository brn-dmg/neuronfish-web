import Link from "next/link"
import { ArrowRight, GraduationCap, Handshake, Plane, Headphones, Moon, Users } from "lucide-react"
import { DIKKHA_PLAY_STORE_URL, CHHAR_PLAY_STORE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { GridPattern } from "@/components/ui/GridPattern"
import { GlowCard } from "@/components/ui/GlowCard"

export const metadata = {
  title: "Products",
  description: "Explore our AI-powered products: DIKKHA for education and CHHAR for smart savings.",
}

const UPCOMING = [
  {
    title: "Dhara",
    desc: "Trusted booking service specifically designed for NGO facilities.",
    icon: Handshake,
    emoji: "🌿",
  },
  {
    title: "Study Abroad Assistant",
    desc: "AI + curated university, scholarship, and visa processing assistant for Bangladeshi students.",
    icon: GraduationCap,
    emoji: "🎓",
  },
  {
    title: "Travel Partner",
    desc: "AI-powered domestic and international travel planning assistant for Bangladeshi travelers.",
    icon: Plane,
    emoji: "✈️",
  },
  {
    title: "EZ-IELTS",
    desc: "AI-powered IELTS preparation platform with multi-speaker audio, full mock tests, and personalized feedback.",
    icon: Headphones,
    emoji: "🎧",
  },
  {
    title: "Noor (نور)",
    desc: "AI Islamic knowledge companion and Quran study app. Sunni-aligned, closed-corpus RAG.",
    icon: Moon,
    emoji: "☪️",
  },
  {
    title: "Nexus",
    desc: "Professional matchmaking platform for Dhaka's startup and tech community. Anti-recruitment, built for collaboration.",
    icon: Users,
    emoji: "🤝",
  },
]

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 section-gradient-light">
        <GridPattern className="opacity-30" />
        <Container className="relative">
          <SectionHeading
            title="Our Products"
            subtitle="Innovative solutions powered by AI to enhance your daily life."
            className="mb-14"
          />

          <div className="grid gap-10 lg:grid-cols-2">
            {/* DIKKHA Card */}
            <GlowCard className="flex flex-col overflow-hidden">
              <div className="relative h-52 bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center">
                <div className="device-phone scale-[0.38] origin-center">
                  <div className="flex h-full items-center justify-center bg-gradient-to-b from-[#8b38bc]/10 via-[#8b38bc]/5 to-transparent">
                    <div className="rounded-xl border border-[#8b38bc]/30 bg-background/70 p-4 shadow-sm backdrop-blur">
                      <img
                        src="/products/dikkha/dikkha-logo.svg"
                        alt="Dikkha AI logo"
                        className="h-16 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-3">
                  <span className="inline-flex items-center rounded-full bg-[#8b38bc]/12 px-2.5 py-0.5 text-xs font-medium text-[#c786e0]">
                    Education
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/products/dikkha/dikkha-logo.svg"
                    alt="Dikkha AI logo"
                    className="h-6 w-6 rounded"
                  />
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Official app</span>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-foreground">Dikkha AI</h2>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  An efficient AI study assistant for all Class 9-10 students in Bangladesh. Dikkha AI blends textbook-first learning with AI Explain, flashcards, formula support, and infographic generation.
                </p>
                <ul className="mb-8 space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "Built for Class 9-10 across Science, Commerce, and Arts",
                    "Selection-based AI Explain with contextual answers",
                    "Flashcards generated from highlighted textbook content",
                    "Formula chart with AI and math explain support",
                    "Topic/prompt-based infographic generation",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8b38bc] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="btn-get-app group/btn bg-[#8b38bc] text-white hover:bg-[#7b2ea8] hover:shadow-[0_0_32px_rgba(139,56,188,0.5)]"
                  >
                    <a
                      href={DIKKHA_PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Get the App <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group/btn border-[#8b38bc]/40 bg-transparent text-[#c786e0] hover:bg-[#8b38bc]/15 hover:border-[#8b38bc]/60 hover:scale-[1.02] transition-all duration-200"
                  >
                    <Link href="/products/dikkha" className="flex items-center gap-2">
                      View Details <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </GlowCard>

            {/* CHHAR Card */}
            <GlowCard className="flex flex-col overflow-hidden">
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(217,255,59,0.05) 0%, rgba(217,255,59,0.14) 100%)",
                }}
              >
                <div className="device-phone scale-[0.38] origin-center">
                  <div className="h-full w-full overflow-hidden" style={{ backgroundColor: "#08090A" }}>
                    <img
                      src="/products/chhar/consumer/ss-01.png"
                      alt="CHHAR app — editorial home feed"
                      className="h-full w-full object-cover object-top block"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="mb-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={{ backgroundColor: "rgba(217,255,59,0.1)", color: "#D9FF3B" }}
                  >
                    Deals Marketplace
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-2">
                  <img
                    src="/products/chhar/chhar_logo.svg"
                    alt="CHHAR logo"
                    className="h-6 w-auto"
                  />
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Official app</span>
                </div>
                <h2 className="mb-3 text-2xl font-semibold text-foreground">
                  CHHAR <span className="font-medium">— ছাড়</span>
                </h2>
                <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
                  Two-sided deals marketplace live in Dhaka, Chittagong, Rajshahi, and Khulna. Consumers find flash deals nearby. Vendors reach active deal-seekers.
                </p>
                <ul className="mb-8 space-y-2.5 text-sm text-muted-foreground">
                  {[
                    "Live in 4 cities",
                    "Flash deals with countdowns",
                    "Vendor analytics dashboard",
                    "4 redemption types",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#D9FF3B" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="btn-get-app group/btn font-bold text-[#08090A] hover:opacity-90 hover:shadow-[0_0_32px_rgba(217,255,59,0.4)]"
                    style={{ backgroundColor: "#D9FF3B" }}
                  >
                    <a
                      href={CHHAR_PLAY_STORE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      Get the App <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group/btn bg-transparent hover:scale-[1.02] transition-all duration-200"
                    style={{
                      borderColor: "rgba(217,255,59,0.35)",
                      color: "#D9FF3B",
                    }}
                  >
                    <Link href="/products/chhar" className="flex items-center gap-2">
                      View Details <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </GlowCard>
          </div>
        </Container>
      </section>

      {/* Upcoming Products */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Upcoming Products"
            subtitle="Six AI products in planning and development."
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {UPCOMING.map((product, i) => (
              <GlowCard key={i} className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    Upcoming
                  </span>
                  <product.icon className="h-4 w-4 text-primary" />
                </div>
                {/* Emoji placeholder — no broken image tags */}
                <div
                  className="mb-3 flex h-20 items-center justify-center overflow-hidden rounded-xl"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="text-4xl leading-none" role="img" aria-label={product.title}>
                    {product.emoji}
                  </span>
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{product.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{product.desc}</p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
