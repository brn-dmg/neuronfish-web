import { CheckoutApiError } from "./errors.ts"
import type { CheckoutApi } from "./types.ts"

export function createLiveApi(baseUrl: string, getToken: () => string | null): CheckoutApi {
  async function call<T>(method: "GET" | "POST", path: string, body?: unknown): Promise<T> {
    const token = getToken()
    let res: Response
    try {
      res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      })
    } catch {
      throw new CheckoutApiError(0, "network_error", true)
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new CheckoutApiError(res.status, err.detail ?? "unknown_error", err.retryable === true)
    }
    return res.json()
  }

  const o = (code: string) => `/api/checkout/orders/${encodeURIComponent(code)}`
  return {
    listPackages: () => call("GET", "/api/checkout/packages"),
    createOrder: (package_id) => call("POST", "/api/checkout/orders", { package_id }),
    getOrder: (code) => call("GET", o(code)),
    getOpenOrder: () => call("GET", "/api/checkout/orders/open"),
    cancelOrder: (code) => call("POST", `${o(code)}/cancel`),
    submitTrx: (code, input) => call("POST", `${o(code)}/trx`, input),
    getWallet: () => call("GET", "/api/coins/wallet"),
  }
}
