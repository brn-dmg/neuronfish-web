"use client"

import { useEffect, useRef, useState } from "react"
import { isLive } from "@/lib/checkout/mode"
import { MOCK_GOOGLE_TOKEN } from "@/lib/auth/mock"

// Public web client, the same one the Dikkha backend accepts (from Mrittika).
const CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "179670422210-l346koojea1b4dmfqfcm1b21j4q1evcm.apps.googleusercontent.com"
const SCRIPT = "https://accounts.google.com/gsi/client"

type Google = {
  accounts: {
    id: {
      initialize(o: { client_id: string; callback: (r: { credential: string }) => void }): void
      renderButton(el: HTMLElement, o: { theme: string; size: string; width: number; shape: string }): void
    }
  }
}

let loading: Promise<Google> | null = null // one script tag, however often the button mounts

function loadGoogle(): Promise<Google> {
  const w = window as unknown as { google?: Google }
  if (w.google) return Promise.resolve(w.google)
  if (loading) return loading
  loading = new Promise<Google>((resolve, reject) => {
    const s = document.createElement("script")
    s.src = SCRIPT
    s.async = true
    s.onload = () => (w.google ? resolve(w.google) : reject(new Error("Google script missing")))
    s.onerror = () => {
      s.remove()
      reject(new Error("Google script blocked"))
    }
    document.head.appendChild(s)
  })
  loading.catch(() => {
    loading = null // the next mount may try again
  })
  return loading
}

export function GoogleButton({ onCredential, disabled, orLabel }: { onCredential: (idToken: string) => void; disabled: boolean; orLabel: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)
  const cb = useRef(onCredential)
  const off = useRef(disabled)
  useEffect(() => {
    cb.current = onCredential
    off.current = disabled
  })
  const live = isLive(process.env.NEXT_PUBLIC_CHECKOUT_API_MODE)

  useEffect(() => {
    if (!live || !box.current) return
    const el = box.current
    let gone = false
    loadGoogle()
      .then((g) => {
        if (gone) return
        g.accounts.id.initialize({ client_id: CLIENT_ID, callback: (r) => !off.current && cb.current(r.credential) })
        g.accounts.id.renderButton(el, { theme: "outline", size: "large", width: Math.min(el.clientWidth || 320, 400), shape: "pill" })
      })
      .catch((e) => {
        console.error("GoogleButton: sign-in script did not load", e)
        if (!gone) setFailed(true) // blocked or offline: hide Google, phone sign-in still works
      })
    return () => {
      gone = true
    }
  }, [live])

  if (failed) return null

  // Local mocks have no Google: a plain button signs in with a fake credential.
  return (
    <>
      <p className="text-center text-sm text-dk-muted!">{orLabel}</p>
      {live ? (
        <div ref={box} className={`flex justify-center ${disabled ? "pointer-events-none opacity-60" : ""}`} />
      ) : (
        <button type="button" disabled={disabled} onClick={() => cb.current(MOCK_GOOGLE_TOKEN)} className="w-full rounded-xl border border-dk-line-strong bg-dk-surface px-4 py-3 text-base disabled:opacity-60">
          Continue with Google (test)
        </button>
      )}
    </>
  )
}
