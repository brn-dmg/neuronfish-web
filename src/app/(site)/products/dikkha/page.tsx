import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarClock,
  NotebookPen,
  ScanText,
  Sparkles,
  Zap,
  Users,
  Star,
  CheckCircle2,
} from "lucide-react"
import { DIKKHA_PLAY_STORE_URL } from "@/lib/constants"
import { SOCIALS } from "@/lib/social"
import { SocialLinks } from "@/components/site/SocialLinks"
import { FAQAccordion } from "@/components/ui/FAQAccordion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { GridPattern } from "@/components/ui/GridPattern"
import { GlowCard } from "@/components/ui/GlowCard"
import { ScreenshotMarquee } from "@/components/dikkha/ScreenshotMarquee"
import { VideoShowcase } from "@/components/dikkha/VideoShowcase"

export const metadata = {
  title: "Dikkha AI: AI Study Assistant for Class 9-10",
  description:
    "Dikkha AI is the smartest study companion for Class 9-10 students in Bangladesh. Textbook-based AI explanations, flashcards, formula sheet, SSC suggestions, and infographics, all in one app.",
}

const FEATURE_SLIDES = [
  { slide: "slide1.png", label: "Launch & Onboarding", desc: "Simple setup, all groups" },
  { slide: "slide2.png", label: "Subject Library", desc: "All NCTB books in one place" },
  { slide: "slide3.png", label: "Smart Selection", desc: "Highlight → AI or Flashcard" },
  { slide: "slide4.png", label: "AI Explain", desc: "Bangla answers with math" },
  { slide: "slide5.png", label: "SSC 2026 Suggestions", desc: "Chapter-by-chapter prep" },
  { slide: "slide6.png", label: "Flashcard Mode", desc: "Active recall from any text" },
  { slide: "slide7.png", label: "Formula Sheet", desc: "Every formula, searchable" },
  { slide: "slide8.png", label: "AI Infographics", desc: "Visual concepts on demand" },
]

const STATS = [
  { label: "Class 9-10 textbooks", value: "16+" },
  { label: "Subjects covered", value: "8+" },
  { label: "Study groups", value: "Science · Commerce · Arts" },
  { label: "AI language", value: "Bangla & English" },
]

export default function DikkhaPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden py-20 md:py-28">
        {/* Background - artsy mesh gradient */}
        <div className="absolute inset-0 -z-10">
          {/* Primary purple sweep from top */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_70%_at_55%_-15%,rgba(122,44,180,0.32),transparent_60%)]" />
          {/* Blue-indigo bloom bottom-left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_-5%_90%,rgba(79,70,229,0.18),transparent_58%)]" />
          {/* Warm magenta whisper top-right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_105%_10%,rgba(192,60,180,0.10),transparent_55%)]" />
          {/* Teal accent centre-bottom */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_110%,rgba(20,184,166,0.08),transparent_55%)]" />
          <GridPattern className="opacity-[0.12]" />
        </div>

        <Container className="relative w-full">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div className="max-w-xl">
              <div className="mb-5 flex items-center gap-3">
                <img
                  src="/products/dikkha/dikkha-logo.svg"
                  alt="Dikkha AI"
                  className="h-10 w-auto rounded-lg"
                />
                <span className="text-sm font-semibold tracking-widest text-[#c786e0] uppercase">Dikkha AI</span>
              </div>

              <h1 className="mb-6 text-5xl font-extrabold tracking-tight leading-[1.08] sm:text-6xl lg:text-[64px]">
                Your 24/7{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[#a252d0] via-[#d09be8] to-[#8b38bc] bg-clip-text text-transparent">
                    AI study
                  </span>
                </span>
                <br />companion
              </h1>

              <p className="mb-8 text-lg text-muted-foreground leading-relaxed max-w-md">
                Built for Class 9-10 students in Bangladesh. Read your NCTB textbooks, select any text, and instantly get AI explanations, flashcards, formulas, and infographics, in Bangla.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row mb-10">
                <Button
                  size="lg"
                  variant="glow"
                  className="btn-get-app group/btn bg-[#8b38bc] text-white hover:bg-[#7b2ea8] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,56,188,0.45)] transition-all duration-200"
                  asChild
                >
                  <a
                    href={DIKKHA_PLAY_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Download Free
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#video">Watch Demo</Link>
                </Button>
              </div>
              <SocialLinks links={SOCIALS.dikkha} name="Dikkha" />

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: CheckCircle2, text: "NCTB aligned" },
                  { icon: Star, text: "SSC 2026 ready" },
                  { icon: Users, text: "All 3 study groups" },
                  { icon: Zap, text: "Bangla AI answers" },
                ].map(({ icon: Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#8b38bc]/30 bg-[#8b38bc]/10 px-3 py-1 text-xs font-medium text-[#e8d5f3]"
                  >
                    <Icon className="h-3 w-3 text-[#c786e0]" />
                    {text}
                  </span>
                ))}
              </div>
            </div>

            {/* Right - floating store listing image */}
            <div className="flex items-center justify-center">
              <div className="relative animate-float-slow">
                {/* Deep glow pool beneath */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 h-48 w-56 rounded-full bg-[#8b38bc]/40 blur-[70px]" />
                {/* Secondary colour bloom - indigo */}
                <div className="absolute -top-6 -right-8 h-32 w-32 rounded-full bg-indigo-500/20 blur-[50px]" />
                {/* Magenta accent - left */}
                <div className="absolute top-1/2 -left-8 h-28 w-28 rounded-full bg-fuchsia-500/15 blur-[45px]" />


                {/* The hero image - store listing slide */}
                <img
                  src="/products/dikkha/slides/slide2.png"
                  alt="Dikkha AI, My Library showing all Class 9-10 subjects"
                  className="relative z-10 w-[260px] sm:w-[300px] lg:w-[320px] rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(139,56,188,0.2)]"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── STATS TICKER ── */}
      <section className="border-y border-[#8b38bc]/20 bg-[#8b38bc]/[0.04] py-4">
        <Container>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-extrabold text-[#d09be8]">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SCREENSHOT MARQUEE ── */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,56,188,0.08),transparent)]" />
        </div>

        <Container className="mb-12 text-center">
          <Badge className="mb-4 border-[#8b38bc]/40 bg-[#8b38bc]/15 text-[#d9b5ed]">
            8 Screens. One Powerful App.
          </Badge>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Everything a student needs,{" "}
            <span className="bg-gradient-to-r from-[#a252d0] to-[#d09be8] bg-clip-text text-transparent">
              beautifully designed
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every screen is built around how Class 9-10 students actually study, not how an AI chatbot works.
          </p>
        </Container>

        <ScreenshotMarquee />
      </section>

      {/* ── PROMO VIDEO ── */}
      <section id="video" className="relative overflow-hidden py-20 md:py-28 border-t border-white/[0.06]">
        <div className="absolute inset-0 -z-10">
          {/* Rich layered gradient - purple core, indigo spill, magenta blush */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(109,40,217,0.28),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_10%_80%,rgba(59,130,246,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_90%_80%,rgba(168,85,247,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_100%,rgba(20,184,166,0.07),transparent_50%)]" />
          {/* Subtle noise-like grid */}
          <GridPattern className="opacity-[0.06]" />
        </div>

        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 border-[#8b38bc]/40 bg-[#8b38bc]/15 text-[#d9b5ed]">
              Product Demo
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              See Dikkha AI{" "}
              <span className="bg-gradient-to-r from-[#a252d0] to-[#d09be8] bg-clip-text text-transparent">
                in action
              </span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Watch how a student reads, selects, and gets AI-powered help, all within seconds.
            </p>
          </div>

          <VideoShowcase />
        </Container>
      </section>

      {/* ── AGENTIC RAG POSITIONING ── */}
      <section className="relative overflow-hidden border-t border-[#8b38bc]/15 bg-gradient-to-b from-[#1b1322]/60 via-background to-background py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 h-72 w-72 rounded-full bg-[#8b38bc]/10 blur-[130px]" />
        </div>
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-14">
            <Badge className="mb-4 border-[#8b38bc]/35 bg-[#8b38bc]/15 text-[#d9b5ed]">
              Powered by Agentic RAG
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
              Built for real textbook learning,{" "}
              <span className="bg-gradient-to-r from-[#a252d0] to-[#c786e0] bg-clip-text text-transparent">
                not generic chat
              </span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Dikkha AI understands student intent, rewrites unclear queries, and answers only from curriculum-aligned sources. Every feature is designed around how Class 9-10 students actually study.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "Intent Understanding", desc: "Interprets what a student actually means from their selected textbook context." },
              { icon: Sparkles, title: "Smart Query Rewriting", desc: "Refines unclear prompts before retrieval, better questions, better answers." },
              { icon: ScanText, title: "Selection-Based", desc: "Every AI action flows from what the student highlighted, zero context-loss." },
              { icon: BookOpen, title: "NCTB-First Context", desc: "Grounded in Class 9-10 curriculum language, not generic internet knowledge." },
            ].map((item, i) => (
              <GlowCard key={i} className="group relative overflow-hidden p-6 text-center border-[#8b38bc]/25 bg-gradient-to-b from-card to-[#8b38bc]/[0.06]">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#8b38bc]/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <item.icon className="h-6 w-6 mx-auto mb-3 text-[#b26ed4]" />
                <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURE GRID ── */}
      <section id="features" className="relative overflow-hidden py-20 md:py-24 border-t border-white/[0.05]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(109,40,217,0.07),transparent_65%)]" />
        </div>

        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-4 border-[#8b38bc]/40 bg-[#8b38bc]/15 text-[#d9b5ed]">
              Feature Walkthrough
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              What students can do with{" "}
              <span className="bg-gradient-to-r from-[#a252d0] to-[#d09be8] bg-clip-text text-transparent">
                Dikkha AI
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Every screen is purpose-built for how Class 9-10 students actually study.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {FEATURE_SLIDES.map((f, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-[#8b38bc]/20 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-[#8b38bc]/50 hover:shadow-[0_0_30px_rgba(139,56,188,0.18)]"
              >
                {/* Slide image */}
                <div className="relative overflow-hidden">
                  <img
                    src={`/products/dikkha/slides/${f.slide}`}
                    alt={f.label}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  {/* Gradient fade into label area */}
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card/90 to-transparent" />
                </div>

                {/* Label */}
                <div className="px-3 py-3">
                  <p className="text-xs font-semibold text-foreground leading-tight">{f.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── SSC 2026 CALLOUT ── */}
      <section className="relative overflow-hidden py-20 md:py-24 border-t border-amber-500/15">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-background to-[#1b1322]/40" />
          <div className="absolute top-0 right-1/4 h-80 w-80 rounded-full bg-amber-500/8 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#8b38bc]/12 blur-[130px]" />
          <GridPattern className="opacity-[0.08]" />
        </div>

        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge className="mb-4 border-amber-500/40 bg-amber-500/10 text-amber-300">
                SSC 2026 Exam Prep
              </Badge>
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-4">
                SSC ২০২৬ সাজেশন:{" "}
                <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
                  chapter by chapter
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Dikkha AI provides curated SSC 2026 suggestions mapped directly to NCTB chapters. Know which topics are most important, which question types to expect, and where to focus your revision time.
              </p>
              <ul className="space-y-3">
                {[
                  "Subject-wise suggestion lists",
                  "Important topics per chapter marked",
                  "Question type breakdown (MCQ, short, broad)",
                  "Exam countdown built in",
                ].map((point) => (
                  <li key={point} className="flex items-center gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="bg-amber-500 text-black font-bold hover:bg-amber-400 hover:scale-[1.02] transition-all duration-200"
                  asChild
                >
                  <a href={DIKKHA_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Start SSC Prep <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-amber-500/10 blur-[40px]" />
                <div className="relative device-phone">
                  <div className="h-full overflow-hidden">
                    <img
                      src="/products/dikkha/slides/slide5.png"
                      alt="SSC 2026 suggestions in Dikkha AI"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative overflow-hidden border-t border-[#8b38bc]/15 bg-gradient-to-b from-background via-[#1a1220]/40 to-background py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#8b38bc]/10 blur-[140px]" />
        </div>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-extrabold sm:text-4xl mb-3">How it works</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Three steps. From reading to understanding in seconds.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(33.33%+24px)] right-[calc(33.33%+24px)] h-px bg-gradient-to-r from-[#8b38bc]/40 via-[#b26ed4]/60 to-[#8b38bc]/40" />

            {[
              { step: "01", title: "Read from your book", desc: "Open any NCTB chapter and focus on the exact line or paragraph you need to understand." },
              { step: "02", title: "Select and choose action", desc: "Highlight the text and pick, AI Explain, Flashcards, Formula help, or Infographics." },
              { step: "03", title: "Learn and revise smarter", desc: "Get a clear Bangla answer, save key content, and keep your study flow going." },
            ].map((item, i) => (
              <GlowCard key={i} className="flex flex-col items-center text-center p-8 border-[#8b38bc]/20">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b38bc]/15 text-xl font-black text-[#c786e0] border border-[#8b38bc]/25">
                  {item.step}
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlowCard>
            ))}
          </div>
        </Container>
      </section>

      {/* ── ROADMAP ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-[#8b38bc]/10 blur-[130px]" />
          <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#b26ed4]/8 blur-[120px]" />
        </div>
        <Container>
          <div className="text-center mb-14">
            <Badge className="mb-4 border-[#8b38bc]/35 bg-[#8b38bc]/15 text-[#d9b5ed]">
              What&apos;s coming
            </Badge>
            <h2 className="text-3xl font-extrabold sm:text-4xl">Future updates</h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">Major features planned to make Dikkha AI an even stronger study ecosystem.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Board Question Bank Solver", desc: "Practice from board-style question banks with guided solving and explanations.", icon: BookOpen },
              { title: "AI Study Planner", desc: "Generate personalised study schedules based on chapter load, exam date, and weak areas.", icon: CalendarClock },
              { title: "Smart Note-taker", desc: "Capture, organise, and summarise notes from textbook content and AI sessions automatically.", icon: NotebookPen },
              { title: "And more", desc: "Ongoing improvements across revision workflows, exam prep, and student productivity.", icon: Sparkles },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl border border-dashed border-[#8b38bc]/30 bg-gradient-to-br from-card to-[#8b38bc]/[0.04] p-6 transition-all duration-300 hover:border-[#b26ed4]/50 hover:bg-[#8b38bc]/[0.06]">
                <div className="mb-4 inline-flex rounded-xl bg-[#8b38bc]/15 p-2.5 text-[#c786e0]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="mb-3 text-xs border-[#8b38bc]/30 bg-[#8b38bc]/15 text-[#d9b5ed]">Coming Soon</Badge>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-[#8b38bc]/15 bg-gradient-to-b from-[#1a1220]/50 to-background py-20 md:py-28">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion
            items={[
              {
                question: "Who can use Dikkha AI?",
                answer: "Dikkha AI is built for all Class 9-10 students in Bangladesh, Science, Commerce, and Arts/Humanities groups. Every feature is designed for this exact curriculum and student level."
              },
              {
                question: "How does AI Explain work?",
                answer: "Students drag-highlight any section of their NCTB textbook and tap 'Explain this'. Dikkha AI retrieves curriculum-aligned context and generates a clear, student-friendly explanation in Bangla, with math where relevant."
              },
              {
                question: "Can students generate revision materials automatically?",
                answer: "Yes. From any selected text, students can instantly generate flashcards for active recall, view formula sheets with AI explanations, or create infographic visuals for topics they find difficult."
              },
              {
                question: "What is SSC 2026 Suggestions?",
                answer: "A dedicated section inside Dikkha AI that maps curated exam suggestions to NCTB chapters, helping students know which topics are most important, what question types to expect, and where to focus revision before the SSC 2026 exam."
              },
              {
                question: "Why use Dikkha AI instead of a generic AI chatbot?",
                answer: "Dikkha AI is textbook-first, not chat-first. It's built around the selection-based learning flow that Class 9-10 students actually use, reading a chapter, encountering a difficult concept, and wanting immediate help from that exact context. Generic chatbots don't have NCTB curriculum knowledge or the structured revision tools Dikkha provides."
              },
            ]}
          />
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-3xl px-8 py-20 text-center max-w-3xl mx-auto border border-[#b26ed4]/30 bg-gradient-to-br from-[#251530] via-[#1e1426] to-[#120b17]">
            <GridPattern className="opacity-[0.05] fill-white" />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-[#8b38bc]/30 blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#b26ed4]/20 blur-[110px]" />
            </div>
            <div className="relative">
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8b38bc]/20 border border-[#8b38bc]/30">
                <img src="/products/dikkha/dikkha-logo.svg" alt="Dikkha AI" className="h-8 w-auto" />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl text-white">
                Ready to study smarter?
              </h2>
              <p className="mb-8 text-zinc-400 max-w-md mx-auto">
                Join students across Bangladesh who are using Dikkha AI to understand more, revise faster, and walk into SSC 2026 prepared.
              </p>
              <Button
                size="lg"
                variant="glow"
                className="btn-get-app group/btn bg-[#8b38bc] text-white hover:bg-[#7b2ea8] hover:shadow-[0_0_50px_rgba(139,56,188,0.55)] transition-all duration-200"
                asChild
              >
                <a
                  href={DIKKHA_PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Download Free on Play Store
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
