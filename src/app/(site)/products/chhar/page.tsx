import Image from "next/image"
import { MapPin, Tag, ArrowRight, BarChart2, Pause, Zap, Link2, Store, ShoppingBag } from "lucide-react"
import { CHHAR_PLAY_STORE_URL } from "@/lib/constants"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { FAQAccordion } from "@/components/ui/FAQAccordion"
import { GridPattern } from "@/components/ui/GridPattern"
import { GlowCard } from "@/components/ui/GlowCard"
import { ChharScreenshotMarquee } from "@/components/chhar/ScreenshotMarquee"
import { VendorDashboardShowcase } from "@/components/chhar/VendorDashboardShowcase"

export const metadata = {
  title: "CHHAR (ছাড়) — The deals platform Bangladesh runs on",
  description:
    "CHHAR is a two-sided deals marketplace live in Dhaka, Chittagong, Rajshahi, and Khulna. Consumers find flash deals near them. Vendors reach thousands of active deal-seekers.",
}

// WhatsApp pre-filled link — number to be confirmed with NeuronFish team before ship
const WHATSAPP_VENDOR_LINK =
  "https://wa.me/8801711000000?text=Hi%2C%20I%27d%20like%20to%20list%20my%20business%20on%20CHHAR.%20Business%3A%20%5Bname%5D%2C%20City%3A%20%5Bcity%5D"


const VENDOR_VALUE_PROPS = [
  {
    icon: MapPin,
    title: "Reach",
    desc: "Put your offers in front of deal-seekers across Dhaka, Chittagong, Rajshahi, and Khulna. Target by contextual segment and geography — Student Saver, Date Night, Family Feast, Eco.",
  },
  {
    icon: Pause,
    title: "Control",
    desc: "Pause or resume your discounts anytime. Manage your spend with a full ledger. No subscription, no lock-in — you decide what runs and when.",
  },
  {
    icon: BarChart2,
    title: "Insight",
    desc: "Track impressions, engagement rates, and performance trends for every listing. Know your ROI before your next campaign. Full analytics, zero guesswork.",
  },
]

const CONSUMER_FAQS = [
  {
    question: "Is CHHAR free to download and use?",
    answer:
      "Yes — completely free for consumers. Download from the Play Store, browse deals, and redeem offers. No subscription, no hidden charges.",
  },
  {
    question: "How do I redeem a deal?",
    answer:
      "CHHAR supports four redemption types. Promo code: a unique code appears in-app for use at checkout. Redeem link: tap once to claim via the vendor's site. Store-only: show the in-app voucher at the counter (works offline). BOGO: buy one, get one at participating stores.",
  },
  {
    question: "Which cities is CHHAR available in?",
    answer:
      "CHHAR is live in four cities: Dhaka, Chittagong, Rajshahi, and Khulna. More cities are on the roadmap.",
  },
  {
    question: "Does CHHAR work offline?",
    answer:
      "You need an internet connection to browse live deals and map data. However, saved offers — especially store-only vouchers — can be accessed offline for show-at-counter redemption.",
  },
  {
    question: "What deal categories does CHHAR cover?",
    answer:
      "Eight categories and four curated contextual segments: Student Saver, Date Night, Family Feast, and Eco. The editorial feed surfaces what's relevant to you based on category and context.",
  },
]

const VENDOR_FAQS = [
  {
    question: "How does listing on CHHAR work?",
    answer:
      "Submit your offer, set the deal type (promo code, redeem link, store-only, or BOGO), and CHHAR surfaces it to active deal-seekers in your city. Setup takes minutes via the vendor app — no web portal required.",
  },
  {
    question: "What is the pricing model?",
    answer:
      "Vendors pay per listing. No monthly subscription, no lock-in. You control your spend from the start.",
  },
  {
    question: "Can I pause or resume my discounts?",
    answer:
      "Yes. Full control from the vendor dashboard — pause, resume, or edit any listing at any time. Run a flash deal for one weekend, then pause. It's entirely up to you.",
  },
  {
    question: "What analytics do I get?",
    answer:
      "The Insights tab shows impressions, engagement rates, and performance trends per listing — so you can see exactly what's driving foot traffic and what isn't.",
  },
  {
    question: "How do I get started?",
    answer:
      "Tap 'Apply to List Your Business' on this page and send us a WhatsApp message. We'll onboard you personally with your first listing.",
  },
]

export default function ChharPage() {
  return (
    <div style={{ backgroundColor: "#08090A", color: "#F2F2F3" }}>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <GridPattern className="opacity-[0.04] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[#D9FF3B]/8 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-[#D9FF3B]/5 blur-[130px]" />
        </div>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Logo */}
              <div className="mb-6 flex items-center gap-3">
                <Image
                  src="/products/chhar/chhar_logo.svg"
                  alt="CHHAR logo"
                  width={120}
                  height={36}
                  className="h-9 w-auto"
                  priority
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
                The deals platform{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #D9FF3B 0%, #b8e600 60%, #99cc00 100%)",
                  }}
                >
                  Bangladesh runs on
                </span>
              </h1>

              <p className="mb-6 text-lg leading-relaxed text-[#F2F2F3]/70">
                Consumers find flash deals nearby. Businesses reach thousands of active deal-seekers
                across 4 cities. One platform — both sides win.
              </p>

              {/* Live city indicators */}
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Live in
                </span>
                {["Dhaka", "Chittagong", "Rajshahi", "Khulna"].map((city) => (
                  <span
                    key={city}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
                    style={{
                      borderColor: "rgba(217,255,59,0.22)",
                      backgroundColor: "rgba(217,255,59,0.06)",
                      color: "#D9FF3B",
                    }}
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full animate-gentle-pulse"
                      style={{ backgroundColor: "#D9FF3B" }}
                    />
                    {city}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group/btn font-bold"
                  style={{
                    backgroundColor: "#D9FF3B",
                    color: "#08090A",
                  }}
                  asChild
                >
                  <a
                    href={CHHAR_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Download Free
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#D9FF3B]/30 text-[#D9FF3B] hover:bg-[#D9FF3B]/10 hover:border-[#D9FF3B]/60"
                  asChild
                >
                  <a
                    href={WHATSAPP_VENDOR_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    List Your Business
                  </a>
                </Button>
              </div>
            </div>

            {/* Hero screenshot */}
            <div className="flex items-center justify-center">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-8 rounded-3xl blur-[60px]"
                  style={{ backgroundColor: "rgba(217,255,59,0.08)" }}
                />
                <div className="relative w-[240px] sm:w-[280px] overflow-hidden rounded-[2rem] border border-[#D9FF3B]/20 shadow-[0_0_60px_rgba(217,255,59,0.15)]">
                  <img
                    src="/products/chhar/consumer/ss-01.png"
                    alt="CHHAR app — editorial home feed"
                    className="w-full h-auto object-cover object-top block"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 2. PRODUCT FACTS STRIP ────────────────────────── */}
      <div
        className="border-y"
        style={{ borderColor: "rgba(217,255,59,0.12)" }}
      >
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4 text-sm font-semibold tracking-wide"
            style={{ color: "#D9FF3B" }}
          >
            {[
              "4 cities",
              "8 deal categories",
              "4 redemption types",
              "4 contextual segments",
            ].map((fact, i) => (
              <span key={fact} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="hidden sm:inline" style={{ color: "rgba(217,255,59,0.25)" }}>
                    ·
                  </span>
                )}
                {fact}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* ── 3. DEALS TICKER ──────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container className="mb-10">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(217,255,59,0.5)" }}>
              Live Deals
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "#F2F2F3" }}>
              What&apos;s running right now
            </h2>
            <p className="mt-1 max-w-lg text-base" style={{ color: "rgba(242,242,243,0.55)" }}>
              Real listings. Real discounts. Across all 4 cities.
            </p>
          </div>
        </Container>
        <ChharScreenshotMarquee />
      </section>

      {/* ── 4. FLASH DEALS SECTION ───────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#FF5A36]/10 blur-[120px]" />
        </div>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div
                className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest uppercase"
                style={{ borderColor: "rgba(255,90,54,0.35)", color: "#FF5A36", backgroundColor: "rgba(255,90,54,0.08)" }}
              >
                <Zap className="h-3 w-3" />
                Flash Deals
              </div>
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Time-limited.{" "}
                <span style={{ color: "#FF5A36" }}>Always nearby.</span>
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-[#F2F2F3]/65">
                Flash deals expire. CHHAR's countdown surface makes sure you never miss a window — every deal shows exactly how long you have left to act.
              </p>

              {/* Hardcoded countdown — visual prop */}
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-black tabular-nums"
                    style={{ backgroundColor: "rgba(255,90,54,0.15)", color: "#FF5A36", border: "1px solid rgba(255,90,54,0.3)" }}
                  >
                    02
                  </div>
                  <span className="mt-1 block text-[10px] font-medium text-[#F2F2F3]/40 uppercase tracking-wider">hrs</span>
                </div>
                <span className="mb-4 text-2xl font-black text-[#FF5A36]/50">:</span>
                <div className="text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-black tabular-nums"
                    style={{ backgroundColor: "rgba(255,90,54,0.15)", color: "#FF5A36", border: "1px solid rgba(255,90,54,0.3)" }}
                  >
                    47
                  </div>
                  <span className="mt-1 block text-[10px] font-medium text-[#F2F2F3]/40 uppercase tracking-wider">min</span>
                </div>
                <span className="mb-4 text-2xl font-black text-[#FF5A36]/50">:</span>
                <div className="text-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-xl text-2xl font-black tabular-nums"
                    style={{ backgroundColor: "rgba(255,90,54,0.15)", color: "#FF5A36", border: "1px solid rgba(255,90,54,0.3)" }}
                  >
                    13
                  </div>
                  <span className="mt-1 block text-[10px] font-medium text-[#F2F2F3]/40 uppercase tracking-wider">sec</span>
                </div>
              </div>
              <p className="mt-3 text-xs text-[#F2F2F3]/35">
                Flash deal countdowns are live in the app
              </p>
            </div>

            {/* Flash deal screenshot */}
            <div className="flex items-center justify-center">
              <div className="relative w-[240px] sm:w-[270px] overflow-hidden rounded-[2rem] border shadow-[0_0_50px_rgba(255,90,54,0.18)]"
                style={{ borderColor: "rgba(255,90,54,0.25)" }}
              >
                <img
                  src="/products/chhar/consumer/ss-02.png"
                  alt="CHHAR flash deal countdown screen"
                  className="w-full h-auto object-cover object-top block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 5. CONTEXTUAL SEGMENTS ───────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          {/* Left-aligned editorial header */}
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(217,255,59,0.5)" }}>
              Editorial Curation
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "#F2F2F3" }}>
              Deals curated for your moment
            </h2>
            <p className="mt-2 max-w-lg text-base" style={{ color: "rgba(242,242,243,0.55)" }}>
              Not just everything nearby — the right deal for the right context.
            </p>
          </div>

          {/* Magazine asymmetric grid — alternating large/compact per row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">

            {/* ── Student Saver — LARGE (row 1 left) ── */}
            <div
              className="group relative cursor-default overflow-hidden rounded-2xl p-8 md:col-span-7 md:p-10"
              style={{
                border: "1px solid rgba(217,255,59,0.22)",
                background: "linear-gradient(135deg, rgba(217,255,59,0.07) 0%, rgba(217,255,59,0.02) 55%, transparent 100%)",
              }}
            >
              <span
                className="pointer-events-none select-none absolute -bottom-5 -right-3 leading-none opacity-[0.07]"
                style={{ fontSize: "10rem" }}
                aria-hidden
              >🎓</span>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.1), transparent)" }}
              />
              <div className="relative">
                <span className="mb-5 block text-5xl leading-none">🎓</span>
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Segment 01
                </div>
                <h3
                  className="mb-2 text-[2rem] font-extrabold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#D9FF3B]"
                  style={{ color: "#F2F2F3" }}
                >
                  Student Saver
                </h3>
                <p className="text-base font-medium" style={{ color: "rgba(242,242,243,0.75)" }}>
                  Your budget&apos;s best friend on campus.
                </p>
                <p className="mt-2 text-sm" style={{ color: "rgba(242,242,243,0.4)" }}>
                  Food, tech, stationery — deals built for student wallets across all 4 cities.
                </p>
              </div>
            </div>

            {/* ── Date Night — COMPACT (row 1 right) ── */}
            <div
              className="group relative cursor-default overflow-hidden rounded-2xl p-7 md:col-span-5"
              style={{
                border: "1px solid rgba(217,255,59,0.12)",
                backgroundColor: "rgba(255,255,255,0.025)",
              }}
            >
              <span
                className="pointer-events-none select-none absolute -bottom-3 -right-2 leading-none opacity-[0.07]"
                style={{ fontSize: "8rem" }}
                aria-hidden
              >💫</span>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.07), transparent)" }}
              />
              <div className="relative">
                <span className="mb-4 block text-4xl leading-none">💫</span>
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Segment 02
                </div>
                <h3
                  className="mb-2 text-xl font-extrabold tracking-tight transition-colors duration-200 group-hover:text-[#D9FF3B]"
                  style={{ color: "#F2F2F3" }}
                >
                  Date Night
                </h3>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(242,242,243,0.75)" }}>
                  Make the night memorable, not expensive.
                </p>
                <p className="mt-1.5 text-xs" style={{ color: "rgba(242,242,243,0.4)" }}>
                  Curated restaurant and experience deals for two.
                </p>
              </div>
            </div>

            {/* ── Family Feast — COMPACT (row 2 left) ── */}
            <div
              className="group relative cursor-default overflow-hidden rounded-2xl p-7 md:col-span-5"
              style={{
                border: "1px solid rgba(217,255,59,0.12)",
                backgroundColor: "rgba(255,255,255,0.025)",
              }}
            >
              <span
                className="pointer-events-none select-none absolute -bottom-3 -right-2 leading-none opacity-[0.07]"
                style={{ fontSize: "8rem" }}
                aria-hidden
              >🍽️</span>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.07), transparent)" }}
              />
              <div className="relative">
                <span className="mb-4 block text-4xl leading-none">🍽️</span>
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Segment 03
                </div>
                <h3
                  className="mb-2 text-xl font-extrabold tracking-tight transition-colors duration-200 group-hover:text-[#D9FF3B]"
                  style={{ color: "#F2F2F3" }}
                >
                  Family Feast
                </h3>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "rgba(242,242,243,0.75)" }}>
                  Everyone eats well. No budget drama.
                </p>
                <p className="mt-1.5 text-xs" style={{ color: "rgba(242,242,243,0.4)" }}>
                  Family-sized offers at top dining spots across all 4 cities.
                </p>
              </div>
            </div>

            {/* ── Eco — LARGE (row 2 right) ── */}
            <div
              className="group relative cursor-default overflow-hidden rounded-2xl p-8 md:col-span-7 md:p-10"
              style={{
                border: "1px solid rgba(217,255,59,0.22)",
                background: "linear-gradient(135deg, rgba(217,255,59,0.06) 0%, rgba(217,255,59,0.015) 55%, transparent 100%)",
              }}
            >
              <span
                className="pointer-events-none select-none absolute -bottom-5 -right-3 leading-none opacity-[0.07]"
                style={{ fontSize: "10rem" }}
                aria-hidden
              >♻️</span>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.09), transparent)" }}
              />
              <div className="relative">
                <span className="mb-5 block text-5xl leading-none">♻️</span>
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Segment 04
                </div>
                <h3
                  className="mb-2 text-[2rem] font-extrabold leading-tight tracking-tight transition-colors duration-200 group-hover:text-[#D9FF3B]"
                  style={{ color: "#F2F2F3" }}
                >
                  Eco
                </h3>
                <p className="text-base font-medium" style={{ color: "rgba(242,242,243,0.75)" }}>
                  Good for your wallet. Good for Dhaka.
                </p>
                <p className="mt-2 text-sm" style={{ color: "rgba(242,242,243,0.4)" }}>
                  Sustainable brands and ethical choices at honest prices.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── 6. FEATURE GRID ──────────────────────────────── */}
      <section className="py-20 md:py-24">
        <Container>
          {/* Left-aligned editorial header */}
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(217,255,59,0.5)" }}>
              How it works
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "#F2F2F3" }}>
              Built for how deals actually work
            </h2>
            <p className="mt-2 max-w-lg text-base" style={{ color: "rgba(242,242,243,0.55)" }}>
              Every redemption type. Every discovery method. One app.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-12">

            {/* ── Map View — featured discovery card ── */}
            <div
              className="group relative cursor-default overflow-hidden rounded-2xl p-8 md:col-span-5 md:p-10"
              style={{
                border: "1px solid rgba(217,255,59,0.22)",
                background: "linear-gradient(135deg, rgba(217,255,59,0.07) 0%, rgba(217,255,59,0.02) 60%, transparent 100%)",
                minHeight: "280px",
              }}
            >
              {/* Radar rings — purely decorative */}
              <div className="pointer-events-none absolute -bottom-10 -right-10" aria-hidden>
                <div className="relative h-20 w-20">
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(217,255,59,0.22)", transform: "scale(1.8)" }} />
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(217,255,59,0.13)", transform: "scale(3.2)" }} />
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(217,255,59,0.07)", transform: "scale(4.8)" }} />
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(217,255,59,0.03)", transform: "scale(6.5)" }} />
                </div>
              </div>
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.1), transparent)" }}
              />
              <div className="relative">
                <div
                  className="mb-5 inline-flex rounded-xl p-3"
                  style={{ backgroundColor: "rgba(217,255,59,0.12)", border: "1px solid rgba(217,255,59,0.2)" }}
                >
                  <MapPin className="h-7 w-7" style={{ color: "#D9FF3B" }} />
                </div>
                <div className="mb-1 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "rgba(217,255,59,0.45)" }}>
                  Discovery
                </div>
                <h3
                  className="mb-3 text-2xl font-extrabold tracking-tight transition-colors duration-200 group-hover:text-[#D9FF3B]"
                  style={{ color: "#F2F2F3" }}
                >
                  Map View
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(242,242,243,0.65)" }}>
                  Every active deal clustered on a live map. Tap any pin to see the offer — and claim it without leaving the spot.
                </p>
              </div>
            </div>

            {/* ── 4 redemption types — 2×2 grid ── */}
            <div className="grid grid-cols-2 gap-4 md:col-span-7">

              {/* Promo Code */}
              <div
                className="group relative cursor-default overflow-hidden rounded-2xl p-6"
                style={{ border: "1px solid rgba(217,255,59,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.08), transparent)" }}
                />
                <div className="relative">
                  <Tag className="mb-3 h-5 w-5" style={{ color: "#D9FF3B" }} />
                  <div
                    className="mb-3 font-black leading-none tracking-tighter select-none"
                    style={{ fontSize: "2.4rem", color: "rgba(217,255,59,0.13)" }}
                    aria-hidden
                  >
                    CODE
                  </div>
                  <h3 className="mb-1 text-sm font-bold" style={{ color: "#F2F2F3" }}>Promo Code</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(242,242,243,0.5)" }}>
                    Unique code at checkout unlocks the discount instantly.
                  </p>
                </div>
              </div>

              {/* Redeem Link */}
              <div
                className="group relative cursor-default overflow-hidden rounded-2xl p-6"
                style={{ border: "1px solid rgba(217,255,59,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.08), transparent)" }}
                />
                <div className="relative">
                  <Link2 className="mb-3 h-5 w-5" style={{ color: "#D9FF3B" }} />
                  <div
                    className="mb-3 font-black leading-none tracking-tighter select-none"
                    style={{ fontSize: "2.4rem", color: "rgba(217,255,59,0.13)" }}
                    aria-hidden
                  >
                    TAP ↗
                  </div>
                  <h3 className="mb-1 text-sm font-bold" style={{ color: "#F2F2F3" }}>Redeem Link</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(242,242,243,0.5)" }}>
                    One tap to claim via the vendor&apos;s site. No counter visit needed.
                  </p>
                </div>
              </div>

              {/* Store-Only */}
              <div
                className="group relative cursor-default overflow-hidden rounded-2xl p-6"
                style={{ border: "1px solid rgba(217,255,59,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.08), transparent)" }}
                />
                <div className="relative">
                  <Store className="mb-3 h-5 w-5" style={{ color: "#D9FF3B" }} />
                  <div
                    className="mb-3 font-black leading-none tracking-tighter select-none"
                    style={{ fontSize: "2.4rem", color: "rgba(217,255,59,0.13)" }}
                    aria-hidden
                  >
                    SHOW
                  </div>
                  <h3 className="mb-1 text-sm font-bold" style={{ color: "#F2F2F3" }}>Store-Only</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(242,242,243,0.5)" }}>
                    Flash the in-app voucher at the counter. Works offline too.
                  </p>
                </div>
              </div>

              {/* BOGO */}
              <div
                className="group relative cursor-default overflow-hidden rounded-2xl p-6"
                style={{ border: "1px solid rgba(217,255,59,0.12)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(to bottom, rgba(217,255,59,0.08), transparent)" }}
                />
                <div className="relative">
                  <ShoppingBag className="mb-3 h-5 w-5" style={{ color: "#D9FF3B" }} />
                  <div
                    className="mb-3 font-black leading-none tracking-tighter select-none"
                    style={{ fontSize: "2.4rem", color: "rgba(217,255,59,0.13)" }}
                    aria-hidden
                  >
                    1+1
                  </div>
                  <h3 className="mb-1 text-sm font-bold" style={{ color: "#F2F2F3" }}>BOGO</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(242,242,243,0.5)" }}>
                    Buy one, get one free at participating stores.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* ── 7. CONSUMER CTA ──────────────────────────────── */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="text-sm font-medium" style={{ color: "rgba(217,255,59,0.7)" }}>
              Free to download · No sign-up required to browse
            </p>
            <Button
              size="lg"
              className="group/btn h-14 px-8 text-base font-bold"
              style={{ backgroundColor: "#D9FF3B", color: "#08090A" }}
              asChild
            >
              <a
                href={CHHAR_PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Get CHHAR on Play Store
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </a>
            </Button>
          </div>
        </Container>
      </section>

      {/* ────────── NARRATIVE PIVOT ────────── */}

      {/* ── 8. VENDOR BRIDGE ─────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background: "linear-gradient(180deg, #08090A 0%, #0d0b07 40%, #100e05 100%)",
          borderTop: "1px solid rgba(245,158,11,0.12)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F59E0B]/8 blur-[160px]" />
        </div>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
              style={{ borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B", backgroundColor: "rgba(245,158,11,0.08)" }}
            >
              For Business Owners
            </div>
            <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              You run a business in{" "}
              <span style={{ color: "#F59E0B" }}>
                Dhaka, Chittagong, Rajshahi, or Khulna?
              </span>
            </h2>
            <p className="text-xl leading-relaxed" style={{ color: "rgba(242,242,243,0.65)" }}>
              CHHAR puts your offers in front of deal-seekers actively looking in your city.
              Control your listings. Know your ROI. No lock-in.
            </p>
          </div>
        </Container>
      </section>

      {/* ── 9. VENDOR VALUE PROPS ────────────────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#0a0900" }}>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {VENDOR_VALUE_PROPS.map((prop) => (
              <GlowCard
                key={prop.title}
                className="p-8 border-[#F59E0B]/25 bg-gradient-to-br from-[#F59E0B]/[0.04] to-transparent"
              >
                <div
                  className="mb-4 inline-flex rounded-xl p-3"
                  style={{ backgroundColor: "rgba(245,158,11,0.12)" }}
                >
                  <prop.icon className="h-6 w-6" style={{ color: "#F59E0B" }} />
                </div>
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: "#F59E0B" }}
                >
                  {prop.title}
                </h3>
                <p className="leading-relaxed" style={{ color: "rgba(242,242,243,0.65)" }}>
                  {prop.desc}
                </p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 10. VENDOR DASHBOARD SCREENSHOTS ─────────────── */}
      <section className="py-20 md:py-24" style={{ backgroundColor: "#0a0900" }}>
        <Container>
          <div className="mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(245,158,11,0.5)" }}>
              The Vendor Dashboard
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "#F2F2F3" }}>
              Run your listings from the app
            </h2>
            <p className="mt-2 max-w-lg text-base" style={{ color: "rgba(242,242,243,0.55)" }}>
              Everything you need — analytics, discount control, store profile — inside CHHAR.
            </p>
          </div>
          <VendorDashboardShowcase
            screens={[
              {
                src: "/products/chhar/vendor/insight1.jpeg",
                alt: "CHHAR vendor Insights tab — impressions and engagement analytics",
                label: "Insights",
              },
              {
                src: "/products/chhar/vendor/add_discount.png",
                alt: "CHHAR vendor Discount Management tab",
                label: "Discount Management",
              },
              {
                src: "/products/chhar/vendor/my_store.png",
                alt: "CHHAR vendor My Store tab — store profile as customers see it",
                label: "My Store",
              },
            ]}
          />
        </Container>
      </section>

      {/* ── 11. VENDOR TRUST STRIP ───────────────────────── */}
      <div
        style={{
          backgroundColor: "#0a0900",
          borderTop: "1px solid rgba(245,158,11,0.12)",
          borderBottom: "1px solid rgba(245,158,11,0.12)",
        }}
      >
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-sm font-semibold"
            style={{ color: "#F59E0B" }}
          >
            {[
              "Setup in minutes",
              "Full analytics dashboard",
              "Pause anytime",
              "Push to customers",
            ].map((fact, i) => (
              <span key={fact} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="hidden sm:inline" style={{ color: "rgba(245,158,11,0.25)" }}>
                    ·
                  </span>
                )}
                {fact}
              </span>
            ))}
          </div>
        </Container>
      </div>

      {/* ── 12. VENDOR CTA (WhatsApp) ─────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#0a0900" }}>
        <Container>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl p-10 text-center"
            style={{
              border: "1px solid rgba(245,158,11,0.3)",
              background: "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-[#F59E0B]/10 blur-[80px]" />
              <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-[#F59E0B]/8 blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="mb-3 text-2xl font-extrabold sm:text-3xl" style={{ color: "#F2F2F3" }}>
                Ready to list your business?
              </h2>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "rgba(242,242,243,0.6)" }}>
                Send us a WhatsApp message and we'll onboard you personally. Dhaka B2B runs on WhatsApp — so do we.
              </p>
              <a
                href={WHATSAPP_VENDOR_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)]"
                style={{ backgroundColor: "#F59E0B", color: "#08090A" }}
              >
                Apply to List Your Business
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-5 text-xs" style={{ color: "rgba(242,242,243,0.35)" }}>
                Or email us at{" "}
                <a
                  href="mailto:risad@neuronfish.dev"
                  className="underline hover:opacity-80"
                  style={{ color: "rgba(245,158,11,0.7)" }}
                >
                  risad@neuronfish.dev
                </a>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 13. FAQ ──────────────────────────────────────── */}
      <section
        id="faq"
        className="py-20 md:py-28"
        style={{
          backgroundColor: "#08090A",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Container className="max-w-3xl">
          <SectionHeading title="Frequently Asked Questions" className="mb-14" />

          {/* Consumer FAQ group */}
          <div className="mb-12">
            <div
              className="mb-6 flex items-center gap-3"
            >
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
                style={{ backgroundColor: "rgba(217,255,59,0.12)", color: "#D9FF3B" }}
              >
                For Consumers
              </span>
              <div className="flex-1 border-t" style={{ borderColor: "rgba(217,255,59,0.12)" }} />
            </div>
            <FAQAccordion items={CONSUMER_FAQS} />
          </div>

          {/* Vendor FAQ group */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
                style={{ backgroundColor: "rgba(245,158,11,0.12)", color: "#F59E0B" }}
              >
                For Vendors
              </span>
              <div className="flex-1 border-t" style={{ borderColor: "rgba(245,158,11,0.12)" }} />
            </div>
            <FAQAccordion items={VENDOR_FAQS} />
          </div>
        </Container>
      </section>

      {/* ── 14. FINAL CTA ────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "#08090A" }}>
        <Container>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl px-6 py-16 text-center"
            style={{ border: "1px solid rgba(217,255,59,0.15)", backgroundColor: "rgba(217,255,59,0.03)" }}
          >
            <GridPattern className="opacity-[0.04] fill-white" />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-[#D9FF3B]/8 blur-[100px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-[#F59E0B]/8 blur-[100px]" />
            </div>
            <div className="relative">
              <h2 className="mb-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: "#F2F2F3" }}>
                CHHAR is live in 4 cities.
              </h2>
              <p className="mb-10 text-lg" style={{ color: "rgba(242,242,243,0.6)" }}>
                Download free and find deals near you — or list your business and reach them first.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  size="lg"
                  className="group/btn h-12 px-8 font-bold"
                  style={{ backgroundColor: "#D9FF3B", color: "#08090A" }}
                  asChild
                >
                  <a
                    href={CHHAR_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Download Free
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
                <a
                  href={WHATSAPP_VENDOR_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-8 text-sm font-semibold transition-all duration-200 hover:bg-[#F59E0B]/10"
                  style={{ borderColor: "rgba(245,158,11,0.35)", color: "#F59E0B" }}
                >
                  List Your Business
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
