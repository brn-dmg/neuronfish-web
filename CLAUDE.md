# NeuronFish Web — Claude Guidance

## Project Overview

Marketing and product website for **NeuronFish** — a Bangladesh-based AI product company. The site promotes:

- **Dikkha AI** — AI study assistant for Class 9–10 students (NCTB curriculum), features agentic RAG, flashcards, formula help, infographics. Play Store: `com.dikkhaai.app`
- **CHHAR (ছাড়)** — Location-based deals/discounts app for Dhaka. Play Store: `dev.neuronfish.chhar`
- Upcoming: Dhara (NGO bookings), Study Abroad Assistant, Travel Partner

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (CSS-first, no `tailwind.config.*` — theme tokens in `globals.css`) |
| UI | Radix UI primitives, `cva`, `clsx`, `tailwind-merge` |
| Icons | lucide-react |
| Animation | motion/react |
| Theming | next-themes — **forced dark** across the site |
| Font | Plus Jakarta Sans (next/font/google) |
| Analytics | @vercel/analytics |
| Email | Resend (stub — env var present, not fully wired) |
| Deployment | Vercel |

## Project Structure

```
src/
  app/
    layout.tsx                  # Root layout — metadata, font, ThemeProvider, Analytics
    (site)/
      layout.tsx                # Navbar + Footer wrapper
      page.tsx                  # Home: hero, product bento, team preview, CTA
      about/page.tsx            # Mission, vision, timeline, team
      products/
        page.tsx                # Product cards + Play Store CTAs
        dikkha/page.tsx         # Full Dikkha product page
        chhar/page.tsx          # Full CHHAR product page
      contact/
        page.tsx                # Contact form (client component)
        actions.ts              # Server Action — Resend integration (TODO)
      blog/page.tsx             # Placeholder
      privacy/page.tsx          # NeuronFish privacy (from PRIVACY_POLICY.md)
      dikkha-ai/privacy|terms   # Dikkha-specific legal pages
      chhar/privacy|terms       # CHHAR-specific legal pages
  components/
    site/                       # Navbar, Footer, TeamCard, ProductCard
    ui/                         # Button, Card, GlowCard, Container, SectionHeading,
                                # GridPattern, AnimateOnScroll, FAQAccordion, SimpleMarkdown
  content/
    team.ts                     # Team members data
  lib/
    constants.ts                # Play Store URLs
    utils.ts                    # cn() utility
```

## Conventions

- **Server Components by default** — only use `'use client'` when interactivity or browser APIs are needed
- **Dark mode only** — ThemeProvider has `forcedTheme="dark"`; never design for light mode
- **Tailwind v4 CSS-first** — add new tokens in `globals.css` under `@theme`, not a config file
- **Path alias** — always use `@/` imports (maps to `src/`)
- **No API routes exist yet** — all backend logic lives in Server Actions under `actions.ts`
- **GlowCard / AnimateOnScroll** — preferred for product and feature sections
- **`Container`** — use for consistent page-width sections

## Environment Variables

```
RESEND_API_KEY=           # Email sending (stub — not fully active)
CONTACT_TO_EMAIL=risad@neuronfish.dev
CONTACT_FROM_EMAIL=onboarding@resend.dev
SITE_URL=http://localhost:3000
```

Chatbot (planned):
```
GEMINI_API_KEY=           # For Pluto chatbot (see Planned Enhancements)
```

---

## Planned Enhancements

### 1. Dikkha Promo Video + Play Store Images

**Goal:** Enrich the Dikkha product page (`products/dikkha/page.tsx`) and possibly the home page hero/bento section with:

- **Promo mockup video** — a short promotional video showcasing Dikkha in action. Should autoplay muted on desktop, with a play toggle. Use the `<video>` element or an embedded player (no YouTube dependency preferred). Display inside a styled device-frame mockup.
- **Play Store listing images** — high-quality app screenshots already produced for the Google Play Store listing. These should be used as a proper screenshot gallery/carousel on the Dikkha page, replacing or supplementing any current static images.

**Assets to add to `public/`:**
- Video: e.g. `public/dikkha/promo.mp4`
- Screenshots: e.g. `public/dikkha/screenshots/ss-01.png`, `ss-02.png`, etc.

**UX considerations:**
- Video should not block content — lazy-load or use `IntersectionObserver`
- Screenshot carousel should be touch-friendly (mobile-first)
- Maintain dark-mode aesthetic and existing GlowCard/gradient styling

---

### 2. Pluto — Website Chatbot ✓ SHIPPED

Floating chat widget live on all site pages. Files:
```
src/app/api/chat/route.ts        # Streaming Gemini endpoint
src/components/pluto/
  ChatWidget.tsx                 # Floating button + panel
  ChatMessages.tsx               # Message list with streaming
  ChatInput.tsx                  # Input bar
  system-prompt.ts               # Static knowledge context
```
API: Google Gemini (`GEMINI_API_KEY`). Integrated in `src/app/(site)/layout.tsx`.

---

## Agent skills

### Issue tracker

Issues live in GitHub Issues (`Risad-Raihan/neuronfish-web`) — use the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context repo — one `CONTEXT.md` at the root, `docs/adr/` for architectural decisions (created lazily). See `docs/agents/domain.md`.
