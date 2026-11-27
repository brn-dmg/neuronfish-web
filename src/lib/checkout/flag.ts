type Env = Record<string, string | undefined>

/**
 * Sign-in and the checkout stay hidden (404, no links) until Mrittika's API is live.
 * The flag alone is not enough: a production build that still uses the mock client must never
 * show the checkout, so nobody can pay on a fake API even if the flag is switched on early.
 */
export function isCheckoutEnabled(env: Env): boolean {
  if (env.NEXT_PUBLIC_CHECKOUT_ENABLED !== "true") return false
  const usesMock = env.NEXT_PUBLIC_CHECKOUT_API_MODE !== "live"
  return !(usesMock && env.NODE_ENV === "production")
}

// Each variable is read by name: Next only inlines NEXT_PUBLIC_* values written out like this,
// so the header (a client component) sees the same value as the server pages.
const env = {
  NEXT_PUBLIC_CHECKOUT_ENABLED: process.env.NEXT_PUBLIC_CHECKOUT_ENABLED,
  NEXT_PUBLIC_CHECKOUT_API_MODE: process.env.NEXT_PUBLIC_CHECKOUT_API_MODE,
  NODE_ENV: process.env.NODE_ENV,
}
export const checkoutEnabled = isCheckoutEnabled(env)

if (env.NEXT_PUBLIC_CHECKOUT_ENABLED === "true" && !checkoutEnabled && typeof window === "undefined") {
  console.warn("NEXT_PUBLIC_CHECKOUT_ENABLED is on but NEXT_PUBLIC_CHECKOUT_API_MODE is not 'live': checkout stays hidden in production.")
}
