"use client"

import { useEffect, useState } from "react"
import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"
import { normalizePhone } from "@/lib/auth"
import { CheckoutApiError } from "@/lib/checkout/errors"
import { DIKKHA_PLAY_STORE_URL } from "@/lib/constants"
import { useSession } from "./SessionProvider"

type Errors = ReturnType<typeof getContent>["auth"]["errors"]

function errorKey(e: unknown): keyof Errors {
  if (!(e instanceof CheckoutApiError)) return "generic"
  switch (e.detail) {
    case "network_error": return "network"
    case "Invalid phone format": return "invalidPhone"
    case "Invalid OTP":
    case "No OTP found for this phone":
    case "OTP already used": return "invalidOtp"
    case "OTP expired": return "otpExpired"
    case "OTP verification locked": return "otpLocked"
    case "Failed to send OTP SMS": return "smsFailed"
    default: return e.status === 429 ? "tooManyRequests" : "generic"
  }
}

const RESEND_SECONDS = 60 // the app waits 60 s too; the backend allows 3 codes per phone per hour

const input = "w-full rounded-xl border border-dk-line-strong bg-dk-surface px-3 py-3 text-base outline-none focus:border-dk-primary focus:ring-2 focus:ring-dk-primary/30"
const button = "w-full rounded-xl bg-dk-primary px-4 py-3 text-base font-medium text-dk-on-primary disabled:opacity-60"

export function SignIn({ lang }: { lang: Lang }) {
  const t = getContent(lang).auth
  const { ready, session, current, auth } = useSession()
  const [step, setStep] = useState<"phone" | "otp" | "needs-setup">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<keyof Errors | null>(null)
  const [busy, setBusy] = useState(false)
  const [wait, setWait] = useState(0)

  useEffect(() => {
    if (wait <= 0) return
    const id = setTimeout(() => setWait((w) => w - 1), 1000)
    return () => clearTimeout(id)
  }, [wait])

  async function run(fn: () => Promise<void>) {
    setBusy(true)
    setError(null)
    try {
      await fn()
    } catch (e) {
      setError(errorKey(e))
    } finally {
      setBusy(false)
    }
  }

  const send = () =>
    run(async () => {
      const normalized = normalizePhone(phone)
      if (!normalized) throw new CheckoutApiError(400, "Invalid phone format")
      await auth.sendOtp(normalized)
      setStep("otp")
      setWait(RESEND_SECONDS)
    })

  const verify = () =>
    run(async () => {
      const r = await auth.verifyOtp(normalizePhone(phone)!, otp.trim())
      // Accounts that have not finished setup in the app cannot buy Coins: keep no tokens.
      if (r.needs_profile || r.is_new) return setStep("needs-setup")
      session.signIn(r, r.user?.name ?? null)
    })

  if (!ready) return null

  if (current) {
    return (
      <div lang={lang} className="space-y-4">
        <p>
          {t.signedInAs} <strong>{current.name ?? ""}</strong>
        </p>
        <button className={button} onClick={session.signOut}>
          {t.signOut}
        </button>
      </div>
    )
  }

  if (step === "needs-setup") {
    return (
      <div lang={lang} className="space-y-4">
        <h2 className="text-xl font-semibold">{t.needsSetupTitle}</h2>
        <p className="text-dk-muted!">{t.needsSetupBody}</p>
        <a className={`${button} block text-center`} href={DIKKHA_PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t.getApp}
        </a>
      </div>
    )
  }

  return (
    <form
      lang={lang}
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        if (step === "phone") send()
        else verify()
      }}
    >
      <h2 className="text-xl font-semibold">{t.title}</h2>
      {step === "phone" ? (
        <label className="block space-y-1">
          <span className="text-sm text-dk-muted">{t.phoneLabel}</span>
          <input className={input} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </label>
      ) : (
        <label className="block space-y-1">
          <span className="text-sm text-dk-muted">{t.otpLabel}</span>
          <input className={input} inputMode="numeric" autoComplete="one-time-code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </label>
      )}
      {error && (
        <p role="alert" className="text-sm text-dk-bad">
          {t.errors[error]}
        </p>
      )}
      <button className={button} disabled={busy}>
        {step === "phone" ? t.sendCode : t.verify}
      </button>
      {step === "otp" && (
        <div className="flex justify-between text-sm text-dk-primary-ink">
          <button type="button" onClick={send} disabled={busy || wait > 0} className="disabled:text-dk-muted">
            {wait > 0 ? t.sendAgainIn.replace("{n}", String(wait)) : t.sendAgain}
          </button>
          <button type="button" onClick={() => { setStep("phone"); setOtp(""); setError(null); setWait(0) }}>
            {t.changeNumber}
          </button>
        </div>
      )}
    </form>
  )
}
