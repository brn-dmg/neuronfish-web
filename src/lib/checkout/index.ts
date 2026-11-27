import { createLiveApi } from "./live.ts"
import { isLive } from "./mode.ts"
import { createMockApi } from "./mock.ts"
import type { CheckoutApi } from "./types.ts"

export * from "./types.ts"
export * from "./errors.ts"

// Production backend. No dev or staging backend exists yet.
const DEFAULT_BASE_URL = "https://dikkha-api.neuronfish.dev"

/**
 * `NEXT_PUBLIC_CHECKOUT_API_MODE` = "mock" (default) or "live".
 * Switching to live changes this env only, not the UI.
 */
export function createCheckoutApi(getToken: () => string | null): CheckoutApi {
  if (isLive(process.env.NEXT_PUBLIC_CHECKOUT_API_MODE)) {
    return createLiveApi(process.env.NEXT_PUBLIC_CHECKOUT_API_BASE_URL || DEFAULT_BASE_URL, getToken)
  }
  // Dev only, read once on load (needs a full page load): ?mock=revoked (coins wait for verification) or ?mock=short-expiry (orders expire in 8 s).
  const scenario = process.env.NODE_ENV !== "production" && typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("mock") : null
  return createMockApi({ revokedHistory: scenario === "revoked", orderTtlMs: scenario === "short-expiry" ? 8000 : undefined })
}
