import { CheckoutApiError } from "../checkout/errors.ts"
import type { AuthApi } from "./types.ts"

// Auth errors use the same envelope as checkout errors (code, retryable, charged, detail).
export function createLiveAuth(baseUrl: string): AuthApi {
  async function post<T>(path: string, body: unknown): Promise<T> {
    let res: Response
    try {
      res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

  return {
    async sendOtp(phone) {
      await post("/api/auth/send-otp", { phone })
    },
    // Ignore the older `token` and `is_new_user` fields.
    verifyOtp: (phone, otp) => post("/api/auth/verify-otp", { phone, otp }),
    refresh: (refresh_token) => post("/api/auth/refresh", { refresh_token }),
    googleSignIn: (id_token) => post("/api/auth/google", { id_token }),
  }
}
