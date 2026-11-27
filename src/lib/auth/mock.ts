import { CheckoutApiError } from "../checkout/errors.ts"
import { normalizePhone, type AuthApi } from "./types.ts"

export const MOCK_OTP = "123456"
/** A phone ending in 0000 is an account that has not finished setup in the app. */
export const MOCK_UNFINISHED_SUFFIX = "0000"
export const MOCK_REFRESH_INVALID = "Refresh token expired or invalid"

export function createMockAuth(): AuthApi {
  let seq = 0
  const validRefresh = new Set<string>()
  const issue = () => {
    seq++
    const refresh_token = `mock_rt_${seq}`
    validRefresh.add(refresh_token)
    return { access_token: `mock_at_${seq}`, refresh_token }
  }

  return {
    async sendOtp(phone) {
      if (!normalizePhone(phone)) throw new CheckoutApiError(400, "Invalid phone format")
    },
    async verifyOtp(phone, otp) {
      if (process.env.NODE_ENV === "production") throw new Error("Mock auth cannot be used in production")
      if (!normalizePhone(phone)) throw new CheckoutApiError(400, "Invalid phone format")
      if (otp !== MOCK_OTP) throw new CheckoutApiError(400, "Invalid OTP")
      const unfinished = phone.endsWith(MOCK_UNFINISHED_SUFFIX)
      return unfinished
        ? { ...issue(), needs_profile: true, is_new: true }
        : { ...issue(), needs_profile: false, is_new: false, user: { name: "Test Student" } }
    },
    async refresh(refreshToken) {
      // Refresh tokens rotate: each one works once.
      if (!validRefresh.delete(refreshToken)) throw new CheckoutApiError(401, MOCK_REFRESH_INVALID)
      return { ...issue(), expires_in: 3600 }
    },
  }
}
