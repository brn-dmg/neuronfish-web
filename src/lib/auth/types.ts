// Shapes from Mrittika's reply and the backend auth router (app/routers/auth.py).

export type Tokens = { access_token: string; refresh_token: string }

export type VerifyOtpResult = Tokens & {
  needs_profile: boolean
  is_new: boolean
  /** Present only when the profile is complete. */
  user?: { name?: string | null }
}

export type RefreshResult = Tokens & { expires_in: number }

export interface AuthApi {
  sendOtp(phone: string): Promise<void>
  verifyOtp(phone: string, otp: string): Promise<VerifyOtpResult>
  refresh(refreshToken: string): Promise<RefreshResult>
}

// The backend accepts 01..., 8801... and +8801...; we always send the canonical +8801XXXXXXXXX.
export function normalizePhone(raw: string): string | null {
  const m = /^(?:\+?880|0)(1[3-9]\d{8})$/.exec(raw.replace(/[\s\-.]/g, ""))
  return m ? `+880${m[1]}` : null
}
