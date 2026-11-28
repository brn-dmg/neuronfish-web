"use client"

import { useEffect, useRef } from "react"
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

function loadGoogle(): Promise<Google> {
  const w = window as unknown as { google?: Google }
  if (w.google) return Promise.resolve(w.google)
  return new Promise((resolve, reject) => {
    const s = document.createElement("script")
    s.src = SCRIPT
    s.async = true
    s.onload = () => (w.google ? resolve(w.google) : reject(new Error("Google script missing")))
    s.onerror = () => reject(new Error("Google script blocked"))
    document.head.appendChild(s)
  })
}

export function GoogleButton({ onCredential, disabled }: { onCredential: (idToken: string) => void; disabled: boolean }) {
  const box = useRef<HTMLDivElement>(null)
  const cb = useRef(onCredential)
  useEffect(() => {
    cb.current = onCredential
  })
  const live = isLive(process.env.NEXT_PUBLIC_CHECKOUT_API_MODE)

  useEffect(() => {
    if (!live || !box.current) return
    const el = box.current
    let gone = false
    loadGoogle()
      .then((g) => {
        if (gone) return
        g.accounts.id.initialize({ client_id: CLIENT_ID, callback: (r) => cb.current(r.credential) })
        g.accounts.id.renderButton(el, { theme: "outline", size: "large", width: Math.min(el.clientWidth || 320, 400), shape: "pill" })
      })
      .catch((e) => console.error("GoogleButton: sign-in script did not load", e)) // button stays empty; phone sign-in still works
    return () => {
      gone = true
    }
  }, [live])

  // Local mocks have no Google: a plain button signs in with a fake credential.
  if (!live) {
    return (
      <button type="button" disabled={disabled} onClick={() => cb.current(MOCK_GOOGLE_TOKEN)} className="w-full rounded-xl border border-dk-line-strong bg-dk-surface px-4 py-3 text-base disabled:opacity-60">
        Continue with Google (test)
      </button>
    )
  }
  return <div ref={box} className={`flex justify-center ${disabled ? "pointer-events-none opacity-60" : ""}`} />
}
