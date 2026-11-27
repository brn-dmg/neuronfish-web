import { createLiveAuth } from "./live.ts"
import { createMockAuth } from "./mock.ts"
import type { AuthApi } from "./types.ts"

export * from "./types.ts"

// Same env as the checkout client: NEXT_PUBLIC_CHECKOUT_API_MODE = "mock" (default) or "live".
export function createAuthApi(): AuthApi {
  if (process.env.NEXT_PUBLIC_CHECKOUT_API_MODE === "live") {
    return createLiveAuth(process.env.NEXT_PUBLIC_CHECKOUT_API_BASE_URL ?? "https://dikkha-api.neuronfish.dev")
  }
  return createMockAuth()
}
