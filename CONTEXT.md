---
name: NeuronFish Web — Design Context
description: Canonical decisions and design language for the NeuronFish marketing site. Covers product definitions, page architecture, and redesign blueprints.
type: project
---

# NeuronFish Web — Design Context

## Products

### Dikkha AI
AI study assistant for Class 9–10 students (NCTB curriculum). Features agentic RAG, flashcards, formula sheet, SSC suggestions, infographics. Target: students in Bangladesh (Science, Commerce, Arts groups). Color palette: purple (`#8b38bc`) primary, indigo/magenta accents, dark background. Play Store: `com.dikkhaai.app`.

### CHHAR (ছাড়)
Two-sided location-based deals marketplace for Bangladesh. Live in **4 cities: Dhaka, Chittagong, Rajshahi, Khulna**. Revenue model: vendors pay per listing. Play Store: `dev.neuronfish.chhar`.

**Consumer side:** Dark editorial feed (EditorialTheme), flash deal countdowns, map view, contextual segments (Student Saver, Date Night, Family Feast, Eco), 4 redemption types (promo code, redeem link, store-only, BOGO), 8 deal categories.

**Vendor side:** Full business portal inside the Flutter app (vendor mode). 4-tab dashboard: Discounts, Insights, My Store, Profile. Features: performance analytics (impressions, engagement), spend ledger, pause/resume discounts, review responses, push notifications, setup wizard. Vendor web portal: not yet built — registration currently via WhatsApp interest form.

**CHHAR Design System (EditorialTheme):**
- Background: `#08090A` (near-black)
- Primary text: `#F2F2F3` (near-white)
- Signature accent: `#D9FF3B` (chartreuse) — headlines, discount %, CTAs
- Urgency color: `#FF5A36` (coral) — flash deals, countdowns
- The current codebase uses `#4C8E4F` forest green — this is WRONG and must be replaced in the redesign

---

## CHHAR Page Redesign Blueprint

> Decided: 2026-05-11. Supersedes the existing `src/app/(site)/products/chhar/page.tsx`.

### Design Principles
- **Two-sided marketplace page, not a pure app showcase or pure SaaS page**
- **60% vendor focus, 40% consumer focus** — vendors are the primary revenue conversion target
- **Two color zones** on the same page: chartreuse (consumer) → amber (vendor)
- No user/vendor metrics on page until numbers are worth showing — anchor trust on product facts

### Page Architecture (top → bottom)

```
1.  HERO
2.  PRODUCT FACTS STRIP       (consumer)
3.  SCREENSHOT MARQUEE        (consumer)
4.  FLASH DEALS SECTION       (consumer — dedicated, coral accent)
5.  CONTEXTUAL SEGMENTS       (consumer — dedicated, 4 cards)
6.  FEATURE GRID              (consumer — map + redemption types)
7.  CONSUMER CTA              (Play Store)
    ────── NARRATIVE PIVOT ──────
8.  VENDOR BRIDGE             ("You run a business?")
9.  VENDOR VALUE PROPS        (3 GlowCards, amber)
10. VENDOR DASHBOARD SCREENSHOTS (3 anchors: Insights, Discounts, My Store)
11. VENDOR TRUST STRIP
12. VENDOR CTA                (WhatsApp deep link)
    ────────────────────────────
13. FAQ                       (two groups: For Consumers / For Vendors)
14. FINAL CTA
```

### Color System

| Zone     | Background | Primary Accent     | Secondary         |
|----------|------------|--------------------|-------------------|
| Consumer | `#08090A`  | `#D9FF3B` chartreuse | `#FF5A36` coral |
| Vendor   | dark base  | `#F59E0B` amber    | —                 |

The color shift at section 8 signals to vendors "this part is for you" without splitting into two pages.

### Section Specs

**1. Hero**
- Left: headline in chartreuse gradient — e.g. *"The deals platform Dhaka runs on"* (speaks to both audiences)
- Right: best consumer screenshot (dark editorial feed)
- Dual CTAs: `Download Free` (ghost) + `List Your Business` (chartreuse primary)
- No "Live in Dhaka" badge — it's 4 cities
- Logo: `public/products/chhar/chhar-logo.svg` (to be added)

**2. Product Facts Strip**
- Content: `4 cities · 8 deal categories · 4 redemption types · 4 contextual segments`
- Thin bar, chartreuse text, border in `#D9FF3B/15`

**3. Screenshot Marquee**
- New component: `src/components/chhar/ScreenshotMarquee.tsx`
- ~7–9 consumer screenshots, editorial dark aesthetic
- Pattern matches Dikkha's `ScreenshotMarquee` but reskinned

**4. Flash Deals Section**
- Accent: coral `#FF5A36`
- Hardcoded countdown timer element (visual prop, not live) communicates urgency mechanic
- Screenshot of flash deal screen
- Copy direction: *"Time-limited. Always nearby."*

**5. Contextual Segments Section**
- 4 cards: Student Saver · Date Night · Family Feast · Eco
- Each: icon/emoji, name, 1-line description
- No screenshot required — cards are the visual
- Chartreuse highlight on hover

**6. Feature Grid**
- Supporting proof points: Map view · Promo code · Redeem link · Store-only · BOGO
- GlowCard pattern, chartreuse icon tint

**7. Consumer CTA**
- Play Store button, chartreuse variant

**8. Vendor Bridge**
- Hard visual break — dark gradient wash, no chartreuse
- Headline: *"You run a business in Dhaka, Chittagong, Rajshahi, or Khulna?"*
- Subhead: *"CHHAR puts your offers in front of deal-seekers actively looking in your city."*
- Amber accent begins here

**9. Vendor Value Props**
- 3 GlowCards in amber:
  - **Reach** — 4 cities, segment targeting, thousands of active deal-seekers
  - **Control** — pause/resume anytime, spend ledger, no lock-in
  - **Insight** — impressions dashboard, engagement metrics, know your ROI

**10. Vendor Dashboard Screenshots**
- Layout: 1 large hero (Insights tab) + 2 secondary flanking (Discounts + My Store)
- Placeholder slots until assets arrive (ETA: 1–2 days from 2026-05-11)
- Amber glow backdrop behind screenshots
- Asset paths (to be filled):
  - `public/products/chhar/vendor/insights.png`
  - `public/products/chhar/vendor/discounts.png`
  - `public/products/chhar/vendor/my-store.png`

**11. Vendor Trust Strip**
- Content: `Setup in minutes · Full analytics dashboard · Pause anytime · Push to customers`
- Amber text, dark bg

**12. Vendor CTA**
- Button: `Apply to List Your Business` → WhatsApp deep link
- Pre-filled message: `"Hi, I'd like to list my business on CHHAR. Business: [name], City: [city]"`
- Secondary text: email fallback
- Resend/inline form: deferred until CHHAR gets a dedicated Resend domain

**13. FAQ**
- Two labeled groups: *For Consumers* / *For Vendors*
- Consumer FAQs: free download, redemption flow, offline access, city coverage
- Vendor FAQs: pricing model, how listing works, analytics access, how to get started, pause/resume

**14. Final CTA**
- Dual CTA mirroring the hero — one block, both audiences

---

### Assets Checklist

**Must exist before build:**
- [ ] `public/products/chhar/chhar-logo.svg`
- [ ] `public/products/chhar/consumer/` — 7–9 store-listing-quality screenshots

**ETA 1–2 days (2026-05-12/13):**
- [ ] `public/products/chhar/vendor/insights.png`
- [ ] `public/products/chhar/vendor/discounts.png`
- [ ] `public/products/chhar/vendor/my-store.png`

**Retire on redesign:**
- `public/products/chhar/chhar-mock.png` — old hero mock, wrong palette
- `public/products/chhar/chhar-homepage.jpeg` — rough screenshot, wrong palette
- `public/products/chhar/chhar-map.jpeg` — rough screenshot, wrong palette
- `public/products/chhar/chhar-discount-details.jpeg` — rough screenshot, wrong palette

---

### New Files to Create

```
src/components/chhar/
  ScreenshotMarquee.tsx     # Consumer screenshot carousel (chartreuse skin)
src/app/(site)/products/chhar/
  page.tsx                  # Full rewrite (replaces current)
```

**Reuse from codebase:** `GlowCard`, `Container`, `SectionHeading`, `FAQAccordion`, `GridPattern`, `Badge`, `Button` — all carry over with new color tokens.

---

### What the Current Page Gets Wrong

1. **Wrong palette** — `#4C8E4F` forest green was never CHHAR's brand
2. **Consumer-only** — zero vendor presence; misses the primary revenue audience
3. **Wrong city count** — says "Live in Dhaka"; CHHAR is live in 4 cities
4. **City roadmap section** — shows Chittagong/Khulna as "upcoming"; they are live
5. **Only 3 screenshots** — rough jpegs; no marquee, no grid, no feature showcase
6. **No editorial aesthetic** — flat layout, nothing communicates the dark editorial feed
7. **No flash deal urgency** — core product differentiator not represented
8. **No contextual segments** — Student Saver / Date Night / Family Feast / Eco not mentioned
9. **No redemption types** — BOGO, promo code, etc. not mentioned
10. **No "How it works" for vendors** — vendor journey not explained

---

## Upcoming Products (reference)

- **Dhara** — NGO bookings platform (placeholder live)
- **Study Abroad Assistant** — in planning
- **Travel Partner** — in planning
