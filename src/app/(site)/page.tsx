"use client"

import Link from "next/link"
import { useRef, useCallback, useState, type ElementType } from "react"
import { ArrowRight, Bot, Smartphone, GraduationCap, MapPin, ShieldCheck, Users, Sparkles, Play } from "lucide-react"
import { motion } from "motion/react"
import Lottie from "lottie-react"
import fishSplash from "@/../public/fish-splash.json"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "@/components/ui/AnimateOnScroll"
import { GridPattern } from "@/components/ui/GridPattern"
import { GlowCard } from "@/components/ui/GlowCard"
import { FounderCard } from "@/components/site/FounderCard"
import { TEAM_MEMBERS } from "@/content/team"
import { PartnerStrip } from "@/components/site/PartnerStrip"

const BG_SLIDES = [
  "/products/dikkha/slides/slide1.png",
  "/products/dikkha/slides/slide2.png",
  "/products/dikkha/slides/slide3.png",
  "/products/dikkha/slides/slide4.png",
  "/products/dikkha/slides/slide5.png",
  "/products/dikkha/slides/slide6.png",
  "/products/dikkha/slides/slide7.png",
  "/products/dikkha/slides/slide8.png",
]

const TEASER_SLIDES = [...BG_SLIDES, ...BG_SLIDES]

interface WhyCardItem {
  icon: ElementType
  title: string
  desc: string
  orb1: string
  orb2: string
  iconColor: string
  titleColor: string
  ring: string
  meshGradient: string
  decorColor: string
  spotlightRgb: string
  borderGlowRgb: string
}

function WhyCard({ item }: { item: WhyCardItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--spot-x", `${x}px`)
    el.style.setProperty("--spot-y", `${y}px`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className="why-card relative rounded-2xl bg-[#0c1018] h-full overflow-hidden will-change-transform"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.5 }}
      style={{
        "--spot-rgb": item.spotlightRgb,
        "--border-rgb": item.borderGlowRgb,
      } as React.CSSProperties}
    >
      {/* Cursor-tracking spotlight — uses CSS custom props for 60fps tracking */}
      <div
        className="why-card__spotlight absolute inset-0 pointer-events-none z-[1] opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Cursor-tracking border glow */}
      <div
        className="why-card__border-glow absolute inset-0 rounded-2xl pointer-events-none z-[2] opacity-0 transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      {/* Static border fallback */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.04] pointer-events-none z-[3]" />

      {/* Mesh gradient bg */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: item.meshGradient }}
        animate={{ opacity: isHovered ? 1 : 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Decorative geometry */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute -top-16 -right-16 w-48 h-48 rounded-full border ${item.decorColor}`}
          animate={{ opacity: isHovered ? 0.8 : 0.4, scale: isHovered ? 1.08 : 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
        <motion.div
          className={`absolute -top-20 -right-20 w-56 h-56 rounded-full border ${item.decorColor}`}
          animate={{ opacity: isHovered ? 0.5 : 0.2, scale: isHovered ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.03 }}
        />
        <div className={`absolute top-6 right-8 w-1 h-1 rounded-full ${item.orb1} opacity-60`} />
        <div className={`absolute top-12 right-16 w-1.5 h-1.5 rounded-full ${item.orb2} opacity-40`} />
        <div className={`absolute bottom-10 right-12 w-1 h-1 rounded-full ${item.orb1} opacity-30`} />
        <div className={`absolute top-0 right-24 w-px h-20 ${item.decorColor} border-l rotate-[25deg] origin-top opacity-50`} />
      </div>

      {/* Glowing icon orb */}
      <div className="relative pt-8 px-7 pb-0 flex justify-start z-[4]">
        <div className="relative">
          <motion.div
            className={`absolute inset-0 ${item.orb1} rounded-full blur-2xl pointer-events-none`}
            animate={{ scale: isHovered ? 3.5 : 2.5, opacity: isHovered ? 0.85 : 0.4 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
          />
          <div className={`absolute inset-0 scale-[1.5] ${item.orb2} rounded-full blur-xl opacity-40 pointer-events-none`} />
          <motion.div
            className={`relative h-14 w-14 rounded-2xl ${item.iconColor} ring-1 ${item.ring} bg-white/[0.04] backdrop-blur-sm flex items-center justify-center`}
            animate={{ scale: isHovered ? 1.15 : 1, rotate: isHovered ? -6 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
          >
            <item.icon className="h-7 w-7" strokeWidth={1.5} />
          </motion.div>
        </div>
      </div>

      {/* Text content */}
      <div className="relative px-7 pt-5 pb-7 z-[4]">
        <h3 className={`text-[17px] font-bold tracking-tight ${item.titleColor} mb-1.5`}>
          {item.title}
        </h3>
        <p className="text-[13px] text-zinc-500 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-24 md:py-32">

        {/* ── BG layer 1: rich mesh gradient ── */}
        <div className="absolute inset-0 -z-30 pointer-events-none">
          {/* Primary violet bloom — right side where phones live */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_75%_45%,rgba(120,40,200,0.26),transparent_60%)]" />
          {/* Indigo spill — bottom left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_-5%_85%,rgba(79,70,229,0.18),transparent_58%)]" />
          {/* Teal whisper — top right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_100%_5%,rgba(20,184,166,0.09),transparent_55%)]" />
          {/* Warm amber accent — far left centre */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_35%_at_0%_50%,rgba(251,146,60,0.05),transparent_55%)]" />
          {/* Deep magenta core — centre */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(168,85,247,0.06),transparent_60%)]" />
        </div>

        {/* ── BG layer 2: ghost slide marquee — pure atmosphere ── */}
        <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none opacity-[0.055]">
          <div className="absolute top-[5%] left-0 right-0 flex gap-5 animate-marquee-left-slow">
            {TEASER_SLIDES.map((s, i) => (
              <img key={i} src={s} alt="" aria-hidden className="shrink-0 w-[130px] rounded-xl object-cover" />
            ))}
          </div>
          <div className="absolute top-[38%] left-0 right-0 flex gap-5 animate-marquee-right-slow">
            {[...TEASER_SLIDES].reverse().map((s, i) => (
              <img key={i} src={s} alt="" aria-hidden className="shrink-0 w-[130px] rounded-xl object-cover" />
            ))}
          </div>
          <div className="absolute top-[68%] left-0 right-0 flex gap-5 animate-marquee-left-slow" style={{ animationDelay: "-30s" }}>
            {TEASER_SLIDES.map((s, i) => (
              <img key={i} src={s} alt="" aria-hidden className="shrink-0 w-[130px] rounded-xl object-cover" />
            ))}
          </div>
        </div>

        {/* ── BG layer 3: directional dark vignette so text is always crisp ── */}
        <div className="absolute inset-0 -z-10 pointer-events-none bg-[linear-gradient(to_right,rgba(11,15,20,0.97)_0%,rgba(11,15,20,0.88)_40%,rgba(11,15,20,0.30)_75%,transparent_100%)]" />
        {/* Bottom fade to page bg */}
        <div className="absolute inset-x-0 bottom-0 h-40 -z-10 pointer-events-none bg-gradient-to-t from-background to-transparent" />

        <GridPattern className="absolute inset-0 -z-10 opacity-[0.09] pointer-events-none" />

        <Container className="relative w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* ── Left: copy ── */}
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-sm"
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-gentle-pulse" />
                A technology company
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.06] mb-6"
              >
                <span className="bg-gradient-to-r from-[#a78bfa] via-[#c4b5fd] to-[#7c3aed] bg-clip-text text-transparent">
                  Enterprise AI systems
                </span>
                {" "}&{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  next-gen apps
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="text-lg leading-relaxed text-zinc-300 mb-8 max-w-md"
              >
                NeuronFish is a technology company. We design and build enterprise AI systems and modern applications, both as our own products and as the technology partner for the companies we work with.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="flex flex-col gap-3 sm:flex-row mb-10"
              >
                <Button size="lg" variant="glow" asChild className="bg-violet-600 hover:bg-violet-500 text-white">
                  <Link href="/products" className="flex items-center gap-2">
                    Explore Products <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/work">See our work</Link>
                </Button>
              </motion.div>

              {/* Product pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.4 }}
                className="flex flex-wrap gap-2.5"
              >
                <Link href="/products/dikkha" className="group inline-flex items-center gap-2 rounded-xl border border-[#8b38bc]/35 bg-[#8b38bc]/12 px-3 py-1.5 text-xs font-semibold text-[#d09be8] hover:border-[#8b38bc]/60 hover:bg-[#8b38bc]/20 transition-all duration-200">
                  <img src="/products/dikkha/dikkha-logo.svg" className="h-4 w-4 rounded" alt="" />
                  Dikkha AI
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
                <Link href="/products/chhar" className="group inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:border-emerald-500/55 hover:bg-emerald-500/18 transition-all duration-200">
                  <img src="/products/chhar/chhar_logo.svg" className="h-4 w-4 rounded" alt="" />
                  CHHAR
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </motion.div>
            </div>

            {/* ── Right: two tilted floating phones ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative w-[380px] h-[520px]">
                {/* Ambient colour pool */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-72 h-72 rounded-full bg-violet-600/30 blur-[90px]" />
                </div>
                <div className="absolute top-0 right-4 w-44 h-44 rounded-full bg-indigo-500/18 blur-[65px] pointer-events-none" />
                <div className="absolute bottom-0 left-4 w-36 h-36 rounded-full bg-fuchsia-500/15 blur-[55px] pointer-events-none" />

                {/* Back phone — CHHAR app, tilted right */}
                <div
                  className="absolute right-0 top-8 w-[195px] h-[390px] rounded-[30px] border border-white/10 overflow-hidden rotate-[9deg] opacity-80 z-0"
                  style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.65)" }}
                >
                  <img
                    src="/products/chhar/consumer/ss-01.png"
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Front phone — Library, tilted left, floating */}
                <img
                  src="/products/dikkha/slides/slide2.png"
                  alt="Dikkha AI subject library"
                  className="absolute left-2 top-10 w-[255px] rounded-3xl -rotate-[7deg] z-10 animate-float-slow"
                  style={{
                    boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(139,56,188,0.22), 0 0 60px rgba(120,40,200,0.15)",
                  }}
                />

                {/* Fish jumping between phones — Lottie has built-in arc from right→left */}
                <div
                  className="absolute z-20 pointer-events-none overflow-visible"
                  style={{
                    left: "50px",
                    top: "-180px",
                    width: "300px",
                    height: "300px",
                  }}
                >
                  <Lottie
                    animationData={fishSplash}
                    loop
                    autoplay
                    className="w-full h-full"
                    style={{ overflow: "visible" }}
                  />
                </div>

              </div>
            </motion.div>

          </div>
        </Container>
      </section>

      {/* ── Products Showcase ── */}
      <section className="py-20 md:py-28 section-gradient-bottom">
        <Container>
          <AnimateOnScroll>
            <SectionHeading
              title="Our Products"
              subtitle="The apps we build and run ourselves, from first commit to production."
              className="mb-14"
            />
          </AnimateOnScroll>
          <div className="grid gap-8 md:grid-cols-2">
            {/* Dikkha card */}
            <AnimateOnScroll delay={100}>
              <GlowCard className="flex flex-col h-full overflow-hidden">
                {/* 3-slide preview strip */}
                <div className="relative h-56 overflow-hidden flex gap-[3px] bg-[#0a0614]">
                  {[
                    { src: "/products/dikkha/slides/slide2.png", alt: "My Library" },
                    { src: "/products/dikkha/slides/slide5.png", alt: "SSC 2026" },
                    { src: "/products/dikkha/slides/slide6.png", alt: "Flashcards" },
                  ].map((slide, i) => (
                    <div key={i} className="flex-1 overflow-hidden">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  {/* Top tint */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#8b38bc]/15 to-transparent pointer-events-none" />
                  {/* Product badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl border border-[#8b38bc]/40 bg-background/85 px-2.5 py-1.5 backdrop-blur-sm">
                    <img src="/products/dikkha/dikkha-logo.svg" alt="Dikkha AI" className="h-5 w-5 rounded" />
                    <span className="text-xs font-bold text-[#d09be8]">Dikkha AI</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#8b38bc]/12 px-2.5 py-0.5 text-xs font-medium text-[#c786e0]">Education</span>
                    <span className="inline-flex items-center rounded-full bg-[#8b38bc]/12 px-2.5 py-0.5 text-xs font-medium text-[#c786e0]">AI</span>
                    <span className="inline-flex items-center rounded-full bg-amber-500/12 px-2.5 py-0.5 text-xs font-medium text-amber-400">SSC 2026</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">Dikkha AI</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    AI study assistant for all Class 9-10 groups with textbook-based AI Explain, flashcards, formula support, and infographic learning.
                  </p>
                  <div className="mt-auto pt-6 flex gap-3">
                    <Button
                      asChild
                      className="flex-1 group/btn bg-[#8b38bc] text-white hover:bg-[#7b2ea8]"
                    >
                      <Link href="/products/dikkha" className="flex items-center gap-2">
                        Discover Dikkha AI
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-[#8b38bc]/35 hover:border-[#8b38bc]/60">
                      <Link href="/products/dikkha#video" className="flex items-center gap-2">
                        <Play className="h-4 w-4 text-[#c786e0]" />
                        Demo
                      </Link>
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </AnimateOnScroll>

            {/* CHHAR card */}
            <AnimateOnScroll delay={200}>
              <GlowCard className="flex flex-col h-full overflow-hidden">
                <div className="relative h-56 overflow-hidden flex gap-[3px] bg-[#08090A]">
                  {[
                    { src: "/products/chhar/consumer/ss-01.png", alt: "CHHAR editorial home feed" },
                    { src: "/products/chhar/consumer/ss-02.png", alt: "Flash deal countdown" },
                    { src: "/products/chhar/consumer/ss-03.png", alt: "Deal discovery" },
                  ].map((slide, i) => (
                    <div key={i} className="flex-1 overflow-hidden">
                      <img
                        src={slide.src}
                        alt={slide.alt}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                  {/* Bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  {/* Top tint — chartreuse brand accent */}
                  <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#D9FF3B]/10 to-transparent pointer-events-none" />
                  {/* Product badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 rounded-xl border border-[#D9FF3B]/30 bg-background/85 px-2.5 py-1.5 backdrop-blur-sm">
                    <img src="/products/chhar/chhar_logo.svg" className="h-3.5 w-3.5" alt="" />
                    <span className="text-xs font-bold text-[#D9FF3B]">CHHAR</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#D9FF3B]/10 px-2.5 py-0.5 text-xs font-medium text-[#D9FF3B]">Deals</span>
                    <span className="inline-flex items-center rounded-full bg-[#D9FF3B]/10 px-2.5 py-0.5 text-xs font-medium text-[#D9FF3B]">4 Cities</span>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">CHHAR (ছাড়)</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Two-sided deals marketplace live in Dhaka, Chittagong, Rajshahi &amp; Khulna. Flash deals for consumers, listings for businesses.
                  </p>
                  <div className="mt-auto pt-6">
                    <Button
                      asChild
                      className="w-full group/btn font-bold text-[#08090A]"
                      style={{ backgroundColor: "#D9FF3B" }}
                    >
                      <Link href="/products/chhar" className="flex items-center gap-2">
                        Explore CHHAR
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </GlowCard>
            </AnimateOnScroll>
          </div>
        </Container>
      </section>

      {/* ── Partners ── */}
      <section className="border-t border-border py-20 md:py-24">
        <Container>
          <AnimateOnScroll>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Partners</h2>
                <p className="mt-3 max-w-md text-lg text-muted-foreground">
                  We run the technology for a portfolio of companies.
                </p>
              </div>
              <Button variant="outline" asChild className="group shrink-0">
                <Link href="/work" className="flex items-center gap-2">
                  See our work
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>

          <div className="mt-14">
            <PartnerStrip />
          </div>
        </Container>
      </section>

      {/* ── Why NeuronFish ── */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimateOnScroll>
            <SectionHeading
              title="Why NeuronFish?"
              subtitle="An engineering team that combines applied AI with a deep understanding of the people we build for."
              className="mb-14"
            />
          </AnimateOnScroll>
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {([
              {
                icon: Bot,
                title: "Advanced AI",
                desc: "State-of-the-art models. Intelligent, adaptive experiences.",
                orb1: "bg-cyan-500/30",
                orb2: "bg-teal-400/20",
                iconColor: "text-cyan-300",
                titleColor: "text-cyan-200",
                ring: "ring-cyan-400/10",
                meshGradient: "radial-gradient(ellipse 80% 60% at 20% 80%, rgba(6,182,212,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(20,184,166,0.12), transparent 55%)",
                decorColor: "border-cyan-500/[0.07]",
                spotlightRgb: "6, 182, 212",
                borderGlowRgb: "6, 182, 212",
              },
              {
                icon: MapPin,
                title: "Context First",
                desc: "Built around the real context and needs of the people who use it.",
                orb1: "bg-amber-500/30",
                orb2: "bg-orange-400/20",
                iconColor: "text-amber-300",
                titleColor: "text-amber-200",
                ring: "ring-amber-400/10",
                meshGradient: "radial-gradient(ellipse 70% 60% at 75% 75%, rgba(245,158,11,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 25%, rgba(251,146,60,0.10), transparent 50%)",
                decorColor: "border-amber-500/[0.07]",
                spotlightRgb: "245, 158, 11",
                borderGlowRgb: "245, 158, 11",
              },
              {
                icon: Smartphone,
                title: "User Centric",
                desc: "Intuitive, fast, and accessible for everyone.",
                orb1: "bg-rose-500/30",
                orb2: "bg-pink-400/20",
                iconColor: "text-rose-300",
                titleColor: "text-rose-200",
                ring: "ring-rose-400/10",
                meshGradient: "radial-gradient(ellipse 65% 55% at 30% 70%, rgba(244,63,94,0.18), transparent 60%), radial-gradient(ellipse 55% 45% at 85% 30%, rgba(236,72,153,0.10), transparent 50%)",
                decorColor: "border-rose-500/[0.07]",
                spotlightRgb: "244, 63, 94",
                borderGlowRgb: "244, 63, 94",
              },
              {
                icon: ShieldCheck,
                title: "Trust & Privacy",
                desc: "Data security and ethical AI, always.",
                orb1: "bg-emerald-500/30",
                orb2: "bg-green-400/20",
                iconColor: "text-emerald-300",
                titleColor: "text-emerald-200",
                ring: "ring-emerald-400/10",
                meshGradient: "radial-gradient(ellipse 75% 65% at 70% 80%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 20% 15%, rgba(52,211,153,0.08), transparent 50%)",
                decorColor: "border-emerald-500/[0.07]",
                spotlightRgb: "16, 185, 129",
                borderGlowRgb: "16, 185, 129",
              },
              {
                icon: GraduationCap,
                title: "Empowering Growth",
                desc: "Students learn better. Businesses grow faster.",
                orb1: "bg-violet-500/30",
                orb2: "bg-purple-400/20",
                iconColor: "text-violet-300",
                titleColor: "text-violet-200",
                ring: "ring-violet-400/10",
                meshGradient: "radial-gradient(ellipse 70% 60% at 25% 75%, rgba(139,92,246,0.18), transparent 60%), radial-gradient(ellipse 55% 45% at 80% 25%, rgba(168,85,247,0.10), transparent 50%)",
                decorColor: "border-violet-500/[0.07]",
                spotlightRgb: "139, 92, 246",
                borderGlowRgb: "139, 92, 246",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "Shaped by real feedback from real users.",
                orb1: "bg-sky-500/30",
                orb2: "bg-blue-400/20",
                iconColor: "text-sky-300",
                titleColor: "text-sky-200",
                ring: "ring-sky-400/10",
                meshGradient: "radial-gradient(ellipse 65% 60% at 80% 70%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 30%, rgba(56,189,248,0.10), transparent 50%)",
                decorColor: "border-sky-500/[0.07]",
                spotlightRgb: "14, 165, 233",
                borderGlowRgb: "14, 165, 233",
              },
            ] as const).map((item, i) => (
              <StaggerItem key={i}>
                <WhyCard item={item} index={i} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ── Our Approach ── */}
      <section className="border-t border-border py-20 md:py-28">
        <Container>
          <AnimateOnScroll>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
                Building technology responsibly
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We believe technology should serve people, not the other way around. Our work is grounded in:
              </p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {[
                  "Transparency in how our systems work",
                  "Inclusivity for diverse user groups",
                  "Continuous review of what we ship",
                  "Data protection as a fundamental right",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Team Preview ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(37,99,235,0.06),transparent_70%)]" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600/[0.04] rounded-full blur-[100px]" />
        </div>

        <Container className="relative">
          {/* Header */}
          <AnimateOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <motion.span
                  className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-zinc-400 tracking-wide uppercase"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="h-3 w-3 text-primary" />
                  Leadership
                </motion.span>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                  Meet the{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    Founders
                  </span>
                </h2>
                <p className="mt-3 text-muted-foreground text-lg max-w-md">
                  Who&apos;s behind all this? Just two guys who won&apos;t stop shipping.
                </p>
              </div>
              <Button variant="outline" asChild className="group shrink-0">
                <Link href="/about" className="flex items-center gap-2">
                  View Full Team
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </AnimateOnScroll>

          {/* Founder Cards */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {TEAM_MEMBERS.filter((m) => m.id === "risad" || m.id === "saif").map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FounderCard member={member} index={index} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <Container>
          <AnimateOnScroll variant="scale-in">
            <div className="cta-dark relative overflow-hidden rounded-2xl px-6 py-20 text-center border border-white/[0.08]">
              <GridPattern className="opacity-[0.06] fill-white" />
              <div className="relative">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white mb-4">
                  Let&apos;s build something
                </h2>
                <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Try one of our products, or talk to us about the technology your company needs.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button size="lg" variant="glow" asChild>
                    <Link href="/products">Explore Products</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact?subject=Partnership">Start a conversation</Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </Container>
      </section>
    </>
  )
}
