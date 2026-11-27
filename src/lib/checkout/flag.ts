import { isLive } from "./mode.ts"

type Env = Record<string, string | undefined>

/**
 * Sign-in and the checkout stay hidden (404, no links) until Mrittika's API is live.
 * Two things must hold: the flag is exactly "true", and the live API is in use. The one
 * exception is local development, where the mock is allowed. Any other environment (production,
 * a preview, test, or NODE_ENV unset) counts as production, so nobody can pay on a fake API.
 */
export function isCheckoutEnabled(env: Env): boolean {
  if (env.NEXT_PUBLIC_CHECKOUT_ENABLED !== "true") return false
  return isLive(env.NEXT_PUBLIC_CHECKOUT_API_MODE) || env.NODE_ENV === "development"
}

// Each variable is read by name: Next only inlines NEXT_PUBLIC_* values written out like this,
// so the header (a client component) sees the same value as the server pages.
export const checkoutEnabled = isCheckoutEnabled({
  NEXT_PUBLIC_CHECKOUT_ENABLED: process.env.NEXT_PUBLIC_CHECKOUT_ENABLED,
  NEXT_PUBLIC_CHECKOUT_API_MODE: process.env.NEXT_PUBLIC_CHECKOUT_API_MODE,
  NODE_ENV: process.env.NODE_ENV,
})
