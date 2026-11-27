"use client"

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react"
import { createAuthApi, type AuthApi } from "@/lib/auth"
import { createSession, SESSION_KEY, type Session, type StoredSession } from "@/lib/auth/session"
import { createCheckoutApi, type CheckoutApi } from "@/lib/checkout"
import { withRefresh } from "@/lib/checkout/withRefresh"

type Ctx = {
  /** False until the stored session has been read in the browser. */
  ready: boolean
  session: Session
  current: StoredSession | null
  auth: AuthApi
  /** Checkout client that sends the token and refreshes it on a 401. */
  checkoutApi: CheckoutApi
}

const SessionContext = createContext<Ctx | null>(null)

const noopSubscribe = () => () => {}

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo(() => {
    const auth = createAuthApi()
    const session = createSession(auth, typeof window === "undefined" ? null : window.localStorage)
    session.load() // no-op on the server
    const checkoutApi = withRefresh(createCheckoutApi(session.getAccessToken), session.refresh)
    return { auth, session, checkoutApi }
  }, [])
  // The server renders signed out; the browser snapshot takes over after hydration.
  const current = useSyncExternalStore(value.session.subscribe, value.session.get, () => null)
  // Another tab signed in, out or refreshed: pick up its tokens (refresh tokens rotate).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY || e.key === null) value.session.load()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [value])
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false)

  return <SessionContext.Provider value={{ ...value, ready, current }}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error("useSession must be used inside SessionProvider")
  return ctx
}
