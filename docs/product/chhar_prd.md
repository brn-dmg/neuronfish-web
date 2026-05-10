# Chhar — Product Requirements Document

> **App Name:** Chhar (ছাড়)
> **Platform:** Flutter (Android & iOS)
> **Region:** Bangladesh
> **Version:** 1.0 (Current)
> **Last Updated:** March 2026

---

## 1. Product Overview

Chhar is a mobile deal-discovery app for Bangladeshi consumers. It aggregates discount offers from stores across Bangladesh and surfaces them through a personalized, filterable feed with location-aware discovery, flash deal countdowns, and seamless redemption flows. Users authenticate via phone OTP, browse and filter deals, save favorites, and redeem discounts via promo codes, links, or in-store visits.

---

## 2. Goals

| Goal | Description |
|------|-------------|
| **Discovery** | Help users find relevant deals quickly through smart filters, categories, and search |
| **Engagement** | Drive repeat usage through flash deal urgency, expiry alerts, and saved deals |
| **Redemption** | Enable frictionless deal redemption (code copy, link redirect, in-store guidance) |
| **Retention** | Keep users returning via notifications for expiring saved deals and new offers |

---

## 3. User Types

### 3.1 Customer (Regular User)
Bangladeshi consumers seeking value — students, families, couples, eco-conscious shoppers, budget shoppers.

**Contextual Segments (filter-driven):**
- Student Saver — student-oriented discounts
- Family Feast — family dining/shopping deals
- Date Night — couple-friendly experiences
- Eco — sustainable/green product deals
- Flash Only — time-sensitive urgency buyers

### 3.2 Vendor (Shop Owner)
Business owners who register via the in-app **Vendor Portal** to self-manage their store presence and discount listings on Chhar.

**Capabilities:**
- Apply to join as a vendor from within the app
- Create and manage their store profile
- Add, edit, and delete their own discount listings
- View their active/expired deals

> **Status:** development done.

---

## 4. Authentication

- **Method:** JWT-based authentication with OTP via Reve bulk SMS, Bangladesh numbers only (`01[3-9]\d{8}`)
- **Flow:** Phone input → 6-digit OTP sent via Reve SMS → OTP verification → JWT issued → Profile completion (new users)
- **Session:** JWT token stored locally, used for all authenticated API requests
- **Re-auth:** Required for account deletion
- **Rate limiting:** OTP resend with cooldown enforced in-app

---

## 5. Core Features

### 5.1 Home Feed
- Paginated infinite-scroll feed (20 per page) from GCP backend
- Curated collections: Flash Deals, Eco Picks, Featured, Ending Soon, category-based
- Pull-to-refresh, skeleton shimmer loading, offline banner

### 5.2 Filtering & Sorting
| Filter Type | Options |
|---|---|
| **Category** | 11 Bangladesh-specific categories |
| **Contextual** | Student Saver, Family Feast, Date Night, Eco, Flash Only |
| **Budget** | Slider: ৳0–৳5,000 (persisted) |
| **Sort** | Relevance, Discount High/Low, Expiring Soon, Newest |

### 5.3 Search
- Debounced search with recent history (up to 10, persisted)
- Flash toggle in search, smart relevance sorting

### 5.4 Flash Deals
- Deals expiring within 24h flagged as flash
- 4-tier urgency: Extreme (<3h, red), High (3–12h, orange), Medium (12–24h, yellow), None
- Real-time per-card countdown timers

### 5.5 Eco Detection
- Auto-tagged via keyword heuristics on title/description (eco, sustainable, green, reusable, etc.)

### 5.6 Discount Detail
- Full deal info: description, terms, discount type
- Type-aware CTAs:
  - `promoCode` — copy to clipboard
  - `redeemLink` — open URL
  - `onlineOnly` — shop online link
  - `storeOnly` — visit store guidance
  - `bogo` — buy-one-get-one instructions
- Share deal via native share sheet

### 5.7 Store Directory
- Paginated store list with category filter and search
- Store detail: info, all store discounts, branch locations

### 5.8 Map
- Google Maps with store markers
- Nearby stores within 5km radius
- Heatmap-lite: density-colored markers
- Deal Analytics overlay: area-level deal/store stats, top categories per area

### 5.9 Saved / Favorites
- Save/unsave with haptic feedback (stored in SharedPreferences)
- Expiry alert banner for deals expiring within 24h
- Badge count on nav bar

### 5.10 Notifications (In-App)
- Alerts for expiring saved deals
- Alerts for recently added favorites

### 5.11 Profile & Account
- View/edit: name, email, gender, location
- Delete account with re-authentication
- Legal: Privacy Policy, Terms & Conditions (rendered as Markdown)

### 5.12 Onboarding
- 3-page animated onboarding (shown once on first install)
- Pages: Discover Deals → Save & Share → Never Miss Out

### 5.13 Vendor Portal *(In Development)*
An in-app self-service portal for shop owners to join and manage their presence on Chhar.

| Capability | Detail |
|---|---|
| **Join as Vendor** | Shop owners apply from within the app; account flagged as `vendor` role upon approval |
| **Store Management** | Create and update store profile (name, logo, description, category, branches) |
| **Discount Management** | Add, edit, delete their own discount listings |
| **Listing Control** | Set discount type, value, expiry date, and visibility |
| **Dashboard** | View active, scheduled, and expired deals |

**Access:** Vendor-specific screens are role-gated; customers do not see the vendor portal UI.

---

## 6. Navigation Structure

Bottom navigation bar with 5 tabs:

| Tab | Screen |
|-----|--------|
| Home | Feed, collections, category filter |
| Stores | Store directory |
| Map | Google Maps store finder |
| Saved | Favorited deals |
| Profile | User info, settings |

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Flutter 3.x / Dart 3.x |
| State Management | Riverpod 2.x |
| Auth | JWT + OTP via Reve Bulk SMS |
| User Data | Google Cloud Firestore |
| Primary Backend | GCP Cloud Run (`chhar-gatekeeper`, `asia-south1`) |
| Legacy CMS | Contentful (transitioning out) |
| Maps | Google Maps Flutter |
| Location | Geolocator + Geocoding |
| Local Storage | SharedPreferences |
| HTTP | `http` package with retry + exponential backoff |
| Images | `cached_network_image` |
| Animations | Lottie |
| Sharing | `share_plus` |
| Connectivity | `connectivity_plus` |
| Typography | Outfit (EN), HindSiliguri (BN) |
| Theme | Material 3, green/teal palette |

---

## 8. Backend API

**Base URL:** `https://chhar-gatekeeper-1072787713114.asia-south1.run.app`

| Endpoint | Purpose |
|----------|---------|
| `GET /feed` | Paginated discount feed |
| `GET /stores` | Paginated store list |
| `GET /stores/nearby` | Stores within radius (lat/lng) |
| `GET /categories` | Category list |

---

## 9. Data Models

### Discount
- `id`, `title`, `description`, `imageUrl`
- `discountType`: `promoCode | redeemLink | storeOnly | onlineOnly | bogo`
- `discountValue`: promo code string, URL, or null
- `expiryDate`, `isFlash` (computed: expires within 24h), `flashUrgency`
- `isEco` (computed via keyword heuristics)
- `storeId`, `categoryId`, `price`

### Store
- `id`, `name`, `logoUrl`, `description`, `categoryId`
- `branches`: list of `StoreBranch` (name, address, lat, lng, distance)

### User (Firestore: `users/{uid}`)
- `uid`, `name`, `email`, `gender`, `location`, `phoneNumber`, `createdAt`

---

## 10. Non-Functional Requirements

| Requirement | Detail |
|---|---|
| **Offline handling** | Connectivity banner shown; cached data served where possible |
| **Performance** | Pagination (20/page), image caching, shimmer loading states |
| **Reliability** | HTTP retry with exponential backoff |
| **Security** | Firestore rules: users access own document only; OTP rate-limiting |
| **Localization** | English primary; HindSiliguri font for Bangla text; full BN localization is roadmap |
| **Accessibility** | Material 3 semantics; haptic feedback on key actions |

---

## 11. Known Limitations (v1.0)

- Favorites stored locally only (SharedPreferences), not synced across devices
- ~66% of discounts lack actionable `discount_value` (data quality gap); CTA button hidden gracefully
- No push notifications yet (in-app only)
- Vendor Portal is in development; not yet available to users

---

## 12. Roadmap (Post v1.0)

| Feature | Priority |
|---|---|
| Push notifications for expiring deals | High |
| Sync favorites to Firestore | High |
| Full Bangla (BN) localization | Medium |
| Deal redemption with QR codes | Medium |
| User reviews and ratings | Medium |
| Discount history tracking per user | Medium |
| Vendor Portal (store & discount self-management) | **In Development** |
