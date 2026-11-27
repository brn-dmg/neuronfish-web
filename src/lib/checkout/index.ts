import { createLiveApi } from "./live.ts"
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
  if (process.env.NEXT_PUBLIC_CHECKOUT_API_MODE === "live") {
    return createLiveApi(process.env.NEXT_PUBLIC_CHECKOUT_API_BASE_URL ?? DEFAULT_BASE_URL, getToken)
  }
  return createMockApi()
}
