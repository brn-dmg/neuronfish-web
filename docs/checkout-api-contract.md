# Web checkout API contract (Dikkha)

> Copied from `Dikkha_AI_Backend` branch `origin/prd-m1-m2-m3` (`docs/checkout-api-contract.md`) on 2026-11-27. The backend repo is the source of truth; update this copy when it changes.

**Status:** agreed with Junaid on 2026-11-27 except the items under "To confirm". Built to the manual QR + TrxID flow, which Risad (the CTO) decided in the Dev Tasks brief. Junaid's design assumed a gateway redirect, so he adjusts to this flow. A gateway comes later as another provider behind the same API.
**For:** Junaid (neuronfish-web, `/dikkha/checkout`). **Backend:** Mrittika. See `docs/PRD-m1-m2-m3.md`.

All endpoints are under `/api` and need `Authorization: Bearer <access token>` (the same Dikkha sign-in as the app: Google or phone OTP through `/api/auth`). Errors use the existing envelope: `code`, `retryable`, `charged`, `detail`; the `detail` is the code to map to Bangla copy. An expired token gives the normal `401`.

## Flow

1. Student picks a package, the page creates an order and shows the QR, the merchant number and the order code.
2. The Student pays in the bKash app (a parent may pay, from a different number).
3. The Student enters the TrxID and the bKash number the payment came from. The backend stores the payment.
4. Ordinary accounts get the Coins at once (`unverified`). An account that has had a revoked payment gets them only after verification (`pending`).
5. The merchant statement is uploaded by an admin later. A match makes the payment `verified`. Verification usually takes about a day, and can take up to two days. The page must not promise a time or show a countdown.

## Packages

`GET /api/checkout/packages` returns `[{ "package_id", "coins", "amount_bdt" }]`. Packs and prices are **not final**: they come from one config table and Junaid sends the final list when decided. The server always takes the amount and Coins from this table.

## Orders

Order object (returned by create and get):

```json
{
  "order_code": "DK-4821",
  "status": "open",
  "package_id": "pack_100",
  "coins": 110,
  "amount_bdt": 100,
  "merchant_number": "01XXXXXXXXX",
  "qr_image_url": "https://...",
  "created_at": "2026-11-28T10:00:00Z",
  "expires_at": "2026-11-28T11:00:00Z"
}
```

`status`: `open`, `submitted` (a TrxID was entered), `expired`, `cancelled`.

| Endpoint | Purpose |
|---|---|
| `POST /api/checkout/orders` `{ "package_id" }` | Creates an order. A Student has one open order at a time: creating a new one cancels the previous open order. |
| `GET /api/checkout/orders/{order_code}` | Returns the order so the page can resume after a reload. When a TrxID was submitted it also includes the `payment`. |
| `POST /api/checkout/orders/{order_code}/cancel` | Cancels an unpaid order. Only while the order is `open`. |
| `POST /api/checkout/orders/{order_code}/trx` `{ "trx_id", "payer_msisdn" }` | One step: TrxID and the bKash number it came from. Returns `{ "payment", "coins_balance" }`. |

`merchant_number` and `qr_image_url` come from environment config. The real values arrive Sunday, so build against placeholders until then.

`payer_msisdn` may be different from the Student's own number (parents often pay). The payment confirmation SMS always goes to the Student's own OTP-verified phone, never to the payer's number, so the page must not promise an SMS to the payer.

## Payments

`GET /api/checkout/payments` returns the Student's payments, newest first:

```json
{
  "id": "...",
  "order_code": "DK-4821",
  "package_id": "pack_100",
  "coins": 110,
  "amount_bdt": 100,
  "status": "unverified",
  "payer_msisdn_masked": "********789",
  "reject_reason": null,
  "created_at": "2026-11-28T10:05:00Z"
}
```

`status`: `unverified` (Coins added, waiting for the statement), `pending` (no Coins yet, added on verification), `verified`, `rejected`, `revoked`.
`reject_reason` is set only when `status` is `rejected`: `amount_mismatch`, `not_found_in_statement`, `wrong_account`, `other`.
`payer_msisdn_masked` shows only the last 3 digits.

## Balance

After a payment the page reads the balance from `GET /api/coins/wallet` (`coins_balance`).

## Coins history (for the app's Coins page)

`GET /api/coins/transactions?limit=50&before=<created_at>` returns the Coin ledger, newest first:

```json
[{ "id": "...", "amount": 110, "reason": "purchase", "created_at": "2026-11-28T10:05:00Z", "balance_after": 160 }]
```

`amount` is signed. `reason`: `welcome_gift`, `purchase`, `refund`, `streak_reward`, `spend`, `adjustment`, `revoked`. Payment statuses (verified, rejected) are read from `GET /api/checkout/payments`, not from this list.

## Errors

| `detail` | HTTP | When |
|---|---|---|
| `invalid_package` | 400 | Unknown `package_id` |
| `order_not_found` | 404 | Unknown order code, or not this Student's order |
| `order_expired` | 409 | The order passed `expires_at` |
| `order_not_open` | 409 | Submit or cancel on an order that is `submitted`, `cancelled` or `expired` |
| `trx_id_invalid` | 422 | TrxID format is wrong |
| `trx_id_duplicate` | 409 | This TrxID was already used (across all apps) |
| `payment_in_progress` | 409 | The Student already has an unverified payment |
| `too_many_attempts` | 429 | Too many TrxID tries (see limits). `retryable: true`. |
| `401` | 401 | Expired or missing token (normal) |

`amount_mismatch` is **not** an error at submit time. The client never sends an amount, because the server takes it from the package. A mismatch is only found when the statement is matched, and it then shows as `reject_reason: amount_mismatch` on the payment.

## Limits and timers (proposed defaults)

- **Order expiry:** 60 minutes from creation (a parent may pay later). An expired order holds nothing and costs nothing.
- **TrxID tries:** at most 5 failed attempts per order and 10 per hour per Student, then `too_many_attempts`.
- **Verification timeout:** none shown to the Student. Behind the scenes the 24h notice and the 48h revoke only fire after a statement covering the payment's date is processed (see the PRD). If no statement is uploaded, nothing is revoked.

## CORS

Allowed origins in production: `https://neuronfish.dev`, `https://www.neuronfish.dev`, `https://dikkha.ai`, `https://app.dikkha.ai`. No wildcard. `http://localhost:3000` and Vercel preview URLs are allowed only on a dev or staging backend, not in production.

## To confirm

- Final packs and prices (Junaid).
- That `dikkha.ai` and `app.dikkha.ai` are NeuronFish domains, and how previews should be tested without a wildcard (Risad).
- The proposed limits and the 60-minute order expiry (Junaid).

## Addendum from Mrittika's reply (2026-11-27)

- Auth endpoints and shapes: see section 9 of `docs/product/dikkha_web_prd.md`. Access token 1 hour, refresh token 90 days and rotating. Expired token gives `401` with `detail: "Token expired"`.
- Added: `GET /api/checkout/orders/open` returns the current open order or `404 order_not_found`.
- Added: each package has `label` and `bonus_coins`. `coins` stays the total.
- `qr_image_url` and `merchant_number` are the same for every order today but can change. Read them from each order response.
- The error list above is the full checkout list. Auth errors use the same envelope.
- No staging backend yet. `/docs` is off in production. `openapi.json` follows once checkout is built.

## Addendum 2 from Mrittika's reply (2026-11-27)

- **Packages are public.** `GET /api/checkout/packages` will work without a token, on the same path, with a short cache header. It returns only the pack list (`package_id`, `label`, `coins`, `bonus_coins`, `amount_bdt`), so nothing private is exposed. Every other checkout endpoint stays Bearer-only. This replaces the earlier line that every endpoint needs a token. She will update her copy of the contract when she builds it.
- **CORS is not live yet.** The live server currently rejects `https://neuronfish.dev` and `https://www.neuronfish.dev`: the allowed origins are a fixed list. The fix is part of her first checkout ticket: origins become a setting, set in production to exactly those two (no localhost, no Vercel previews). It goes live with her next server deploy, and she will say when. Until then the web client keeps using the mock.
