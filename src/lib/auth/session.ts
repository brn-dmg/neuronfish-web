import { CheckoutApiError } from "../checkout/errors.ts"
import type { AuthApi, Tokens } from "./types.ts"

export type StoredSession = Tokens & { expires_at: number; name: string | null }
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">

const KEY = "dikkha.session"
const ACCESS_TTL_MS = 60 * 60 * 1000 // access token lasts 1 hour; refresh tokens last 90 days and rotate

// shortcut: tokens sit in localStorage, readable by page scripts. Move to HttpOnly cookies
// set by a server route if that risk matters.
export function createSession(auth: AuthApi, store: Store | null, now: () => number = Date.now) {
  let state: StoredSession | null = null
  let inflight: Promise<boolean> | null = null
  const listeners = new Set<() => void>()

  const save = (next: StoredSession | null) => {
    state = next
    if (store && next) store.setItem(KEY, JSON.stringify(next))
    else store?.removeItem(KEY)
    listeners.forEach((fn) => fn())
  }

  return {
    load() {
      try {
        state = JSON.parse(store?.getItem(KEY) ?? "null")
      } catch {
        state = null
      }
      return state
    },
    get: () => state,
    getAccessToken: () => state?.access_token ?? null,
    signIn(tokens: Tokens, name: string | null) {
      save({ access_token: tokens.access_token, refresh_token: tokens.refresh_token, expires_at: now() + ACCESS_TTL_MS, name })
    },
    signOut: () => save(null),
    subscribe(fn: () => void) {
      listeners.add(fn)
      return () => {
        listeners.delete(fn)
      }
    },
    /**
     * Refresh once at a time: refresh tokens rotate, so two callers (or tabs of work) using
     * the same token would invalidate each other. Returns false when the session is gone.
     */
    refresh(): Promise<boolean> {
      if (!state) return Promise.resolve(false)
      if (inflight) return inflight
      const current = state
      inflight = auth
        .refresh(current.refresh_token)
        .then((r) => {
          save({ ...current, access_token: r.access_token, refresh_token: r.refresh_token, expires_at: now() + r.expires_in * 1000 })
          return true
        })
        .catch((e) => {
          // A rejected token ends the session; a network blip does not.
          if (e instanceof CheckoutApiError && e.status >= 400 && e.status < 500) save(null)
          return false
        })
        .finally(() => {
          inflight = null
        })
      return inflight
    },
  }
}
export type Session = ReturnType<typeof createSession>
