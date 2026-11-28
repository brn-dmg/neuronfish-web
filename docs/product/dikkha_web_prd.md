# Dikkha Web (J2) — Product Requirements Document

> **Section:** `neuronfish.dev/dikkha`
> **Owner:** Junaid · **Backend:** Mrittika · **Approver:** Risad
> **Status:** Approved by Risad (2026-11-27). Building.
> **API contract:** [`docs/checkout-api-contract.md`](../checkout-api-contract.md)

---

## 1. Problem

Dikkha has no web presence on neuronfish.dev, and Coins can only be bought on the web (never inside the app). Students and parents need a product page that explains Dikkha, and a checkout where they pay by bKash and have the Coins land on the same account the app uses.

## 2. Goals

1. A Dikkha product page at `/dikkha` with its own look, built from the grill decisions and landing mockups.
2. A web checkout at `/dikkha/checkout` where a signed-in student picks a Coin package, pays by bKash QR, submits the TrxID and payer number, and sees the result.
3. A checkout that is a shared, brandable component, so Poshra and BCS reuse it.
4. A route structure where `/poshra` and `/bcs` can be added later the same way, with no change to the main site.

## 3. Non-goals (J2)

- The Dikkha web app (lessons, practice, chat, CQ upload, Khata). Grill decisions Q111–Q115 and the mockups `web-app-shell`, `web-lesson`, `web-cq-upload` are out of scope.
- `/prices` as a separate page. The Prices section on the product page links to the checkout.
- Nagad. Only bKash now. Nagad is added later as another payment method.
- PostHog analytics (grill Q118). Follow-up, needs the project key and the student ID from the API.
- Parked grill decisions Q116 (public subject pages) and Q117 (launch timing).
- New legal pages (refund, contact). The footer links to the existing Dikkha privacy and terms pages.
- Changes to any existing main-site page.
- A payment history screen (the contract's `GET /api/checkout/payments`). Revisit after launch.
- Poshra and BCS pages themselves. Only the structure that allows them.

## 4. Source material

| Input | Where |
|---|---|
| Grill decisions Q106–Q118 | `Dikkha_AI_website/docs/DikkhaGrill.md` |
| Landing mockups | `Dikkha_AI_website/docs/mockups/web-landing-hero.html`, `web-landing-sections.html` |
| Design system (light theme) | `Dikkha_AI/docs/design/dikkha-design-system/` |
| Bangla copy | `Dikkha_AI_website/docs/copy/copy-deck.csv` |
| Brand and voice | `Dikkha_AI_website/docs/brand/` |

Decisions used from the grill: Q108 (hero), Q109 (sections), Q110 (SEO). Q106 does not apply as written: it places payment on `app.dikkha.ai`, whereas J2 places it on `neuronfish.dev/dikkha/checkout`.

## 5. Product page (`/dikkha`)

Sections in order (Q109, without "Proof"):

1. Hero: split layout, SSC 2027 countdown chip, headline, store buttons, sign-in, Baghu welcome and app preview (Q108).
2. Chat demo: a real-looking Banglish question and Bangla answer with a Topic tag.
3. How it works (3 steps).
4. Features: Explain, Chat with photo, Practice always free, CQ photo marking, Mistake book, Infographics.
5. Study Groups: Science, Business Studies, Humanities.
6. Prices: free every week, then Coins by bKash. Package list is read from the packages API. Shows packages only. No checkout link until the checkout goes live.
7. For parents: weekly report SMS.
8. FAQ.
9. Final call to action with store buttons.
10. Footer.

Baghu appears only in the hero and the final call to action (Q13). Header: Dikkha logo, Sign in. A Buy Coins link to the checkout is added only when the checkout goes live (see the release plan). Footer: links to the existing Dikkha privacy and terms pages, social links.

Constraints: Coins are never promoted inside the app, but the website may promote the Play Store app. The page makes no claim about verification time.

## 6. Checkout (`/dikkha/checkout`)

### 6.1 Flow

1. **Sign in first.** If there is no session, show sign-in (Google or phone OTP). After sign-in, show the student's name so they can confirm the right account gets the Coins.
2. **Pick a package** from `GET /api/checkout/packages`.
3. **Create the order** (`POST /api/checkout/orders`). Show:
   - one clear line above the QR: payment goes to our partner Apon Bazaar's verified bKash merchant account,
   - the QR image (`qr_image_url`), the merchant number, the order code, the amount and the expiry.
4. **Pay** in the bKash app (a parent may pay, from a different number).
5. **Submit** TrxID and the bKash number the payment came from (`POST .../orders/{code}/trx`).
6. **Confirmation**, with two variants on `payment.status`:
   - `unverified`: Coins were added now, verification is pending.
   - `pending`: no Coins yet, they are added once the payment is verified.

Show the new balance from `GET /api/coins/wallet`.

### 6.2 Copy rules from the contract

- Never state a verification time or show a countdown.
- Never promise an SMS to the payer's number. The SMS goes to the student's own phone.
- The client never sends an amount. The server takes it from the package.

### 6.3 States and errors

| State | Behaviour |
|---|---|
| Order expired (60 min) | "This order expired" and a button to start a new order |
| `trx_id_invalid` | Inline field error |
| `trx_id_duplicate` | Message that this TrxID was already used |
| `payment_in_progress` | Message that a payment is already waiting for verification |
| `too_many_attempts` | Message with retry later (retryable) |
| `order_not_open`, `order_not_found`, `invalid_package` | Return to package selection |
| `401` | Return to sign-in |
| Network failure | Retryable message, no lost input |

The `detail` code is mapped to localized copy. Limits (accepted): 5 failed TrxID tries per order, 10 per hour per student, 60-minute order expiry.

A student has one open order at a time. Creating a new one cancels the previous. On load, the page calls `GET /api/checkout/orders/open` to resume the current open order; a `404 order_not_found` means there is none. No order code is kept in browser storage.

### 6.4 Shared component and brand config

- `Checkout` is one shared component. It knows nothing about Dikkha.
- Each app passes a small brand config: name, logo, localized copy, and the API client. QR and merchant number come from the create-order response, not from config.
- Colors come from the layout (CSS variables), not from config, so a different layout re-themes the checkout.
- No `app` field is sent to the API yet. It is added when Poshra or BCS arrive.

## 7. Structure

```
src/app/
  (site)/                     # existing main site, untouched
  (dikkha)/
    dikkha/
      layout.tsx              # own fonts, colors, header, footer
      page.tsx                # product page
      checkout/page.tsx       # passes dikkhaConfig to <Checkout />
src/components/
  checkout/                   # shared Checkout + steps
  dikkha/                     # existing components, plus new section components
src/lib/checkout/             # typed API client, mock client, types
src/content/dikkha/           # brand config, copy (bn + en)
```

Adding Poshra later means a new `(poshra)/poshra/` group with its own layout and a config file. Nothing under `(site)` changes.

The root layout forces dark mode. The Dikkha layout uses its own light theme tokens scoped to the Dikkha wrapper and does not use `dark:` variants. Tokens are added under `@theme` in `globals.css`.

## 8. API client and mocks

- One typed client with two implementations: mock and live, chosen by env (`mock` by default).
- Packages carry `label` and `bonus_coins`; `coins` is the total. The page shows these fields and does not compute bonuses.
- `qr_image_url` and `merchant_number` are the same for every order today but can change (for example when NeuronFish's own merchant account replaces the partner). Always read them from each order response; never hardcode them.
- The contract's checkout error list is the full list.
- `/docs` is off in production. Mrittika will send `openapi.json` generated from the code once checkout is built, and mocks are checked against it then. Until then mocks follow the contract.
- Production base URL is `https://dikkha-api.neuronfish.dev`. There is no dev or staging backend. Production CORS excludes `localhost` and Vercel previews, so mocks are the only option until staging exists.
- Mock scenarios (switchable in dev): ordinary account, account with a past revoked payment, duplicate TrxID, expired order, rate limited.
- Placeholder QR and merchant number in mocks until the real values arrive (Sunday). Mock packages: ৳50 = 50, ৳100 = 110, ৳250 = 300 coins.
- Swapping to the live API changes the env, not the UI.

## 9. Auth

Google or phone OTP through the existing `/api/auth` endpoints, same Dikkha account as the app. The access token is sent as `Authorization: Bearer <token>`. Apple sign-in is not offered on web.

Confirmed by Mrittika (2026-11-27):

| Call | Request | Response |
|---|---|---|
| `POST /api/auth/send-otp` | `{ phone }` | `{ success, message }` |
| `POST /api/auth/verify-otp` | `{ phone, otp }` | `access_token`, `refresh_token`, `needs_profile`, `is_new`, and `user` when the profile is complete. Ignore the older `token` and `is_new_user` fields. |
| `POST /api/auth/google` | `{ id_token }` | `access_token`, `refresh_token`, `is_new`, `needs_profile` |
| `POST /api/auth/refresh` | `{ refresh_token }` | new `access_token`, `refresh_token`, `expires_in` |

- The access token lasts 1 hour. The refresh token lasts 90 days and rotates, so each refresh invalidates the old one.
- An expired access token gives `401` with `detail: "Token expired"`. The client refreshes once and retries the request. A failed refresh returns the user to sign-in.
- Auth errors use the same envelope as checkout errors: `code`, `retryable`, `charged`, `detail`.
- **Google on web waits on the authorized origins** (Mrittika is adding them). The backend accepts Google tokens for one configured web client ID only. Using it from `neuronfish.dev` needs that origin added to the OAuth client in Google Cloud, and Risad has said not to change GCP. Phone OTP works now and Google follows once the origins are added.
- Token storage (default, to confirm): browser storage with a single in-flight refresh, so two tabs don't both use the same rotating refresh token. Shortcut: tokens are readable by page scripts, so upgrade to HttpOnly cookies set by a server route if the risk matters.
- Accounts with `needs_profile: true` or `is_new: true` have not finished setup in the app. The checkout shows "finish setup in the app first" and creates no order.

## 10. Language

Bangla and English, with a language switch. Bangla text is taken from `copy-deck.csv`, not newly written. English is written during the build and reviewed by Junaid. Where no Bangla exists (checkout buttons, errors), an English placeholder ships until Bangla is supplied. All copy lives in one content file per language.

## 11. SEO and metadata

Bangla and AI SEO per Q110, applied to `/dikkha`: metadata, structured data, and a sitemap entry for `/dikkha`. The checkout page is `noindex`. Adding the sitemap entry is a one-line change in the shared `sitemap.ts`, not a page change.

## 12. Decisions from Risad (2026-11-27)

| Topic | Decision |
|---|---|
| Approval | PRD approved, start building |
| Coin packs | ৳50 = 50 coins, ৳100 = 110 coins, ৳250 = 300 coins (the API serves them; these are also the mock values) |
| Mockups | The 5 are the `web-*` ones. Use `web-landing-hero` and `web-landing-sections`. Ignore `web-app-shell`, `web-lesson`, `web-cq-upload` |
| Scope | Product page and checkout only (Q108–Q110). No `dikkha.ai` or `app.dikkha.ai`; everything lives on `neuronfish.dev`. PostHog later |
| Domains | `neuronfish.dev` and `www.neuronfish.dev` are both served |
| Staging | None for now. Build against mocks until Mrittika's API is live |
| Fonts | Hind Siliguri for Bangla, Outfit for Latin and numbers |
| Legal links | Link the existing privacy and terms pages. No refund or contact page for now |
| Google sign-in | Mrittika adds `neuronfish.dev` and `www.neuronfish.dev` as authorized origins on the existing web client. Until then, phone OTP only |
| Half-set-up accounts | Accounts with `needs_profile` or `is_new` see "finish setup in the app first" and no order is created |

### Release plan

- The `/dikkha` product page ships to production as soon as it is ready. Junaid pushes `neuronfish-web` to `main` himself.
- `/dikkha/checkout` stays hidden until Mrittika's API is live, so nobody pays on mocks:
  - nothing on the site links to it (header "Buy Coins" and the Prices section show no checkout link),
  - it is behind a flag, `NEXT_PUBLIC_CHECKOUT_ENABLED`; when off, the route returns 404,
  - the mock client refuses to run in production, so a flag flipped before the API is live cannot take a fake payment.
- Going live: set the API mode to live, set the flag, add the checkout links.

## 12a. Still open

| # | Item | Owner |
|---|---|---|
| 1 | Google sign-in on web, once the origins are added | Mrittika |
| 2 | Real QR image and merchant number (arrive Sunday) | Mrittika |
| 3 | `openapi.json` to check the mocks against | Mrittika |
| 4 | English copy review | Junaid |
| 5 | Token storage default (browser storage, single in-flight refresh) to confirm | Junaid |

## 13. Acceptance criteria

- `/dikkha` renders with its own header, footer, fonts and colors and shows nothing from the main NeuronFish nav or theme.
- No existing main-site page is modified.
- A signed-in user can complete the checkout flow end to end against mocks, including both confirmation variants, the expired order and each error state.
- The line about Apon Bazaar's verified bKash merchant account appears directly above the QR.
- The package list on the product page and the checkout come from the same client call.
- Switching `mock` to `live` requires no UI change.
- Adding `/poshra` needs a new route group, layout and config only.
- All user-facing copy is available in Bangla and English; the language switch works on both pages.
- The checkout page is `noindex`.
- Lint and type checks pass.

## 14. Follow-ups

PostHog (Q118), Nagad, a payment history view, Poshra and BCS sections, switching to the live API when staging is ready, and a payment gateway later behind the same API.
