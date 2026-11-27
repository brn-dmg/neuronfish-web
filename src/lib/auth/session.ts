import { CheckoutApiError } from "../checkout/errors.ts"
import type { AuthApi, Tokens } from "./types.ts"

export type StoredSession = Tokens & { expires_at: number; name: string | null }
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">

export const SESSION_KEY = "dikkha.session"
const ACCESS_TTL_MS = 60 * 60 * 1000 // access token lasts 1 hour; refresh tokens last 90 days and rotate

function parse(raw: string | null): StoredSession | null {
  try {
    const s = JSON.parse(raw ?? "null")
    return s && typeof s.access_token === "string" && typeof s.refresh_token === "string" ? s : null
  } catch {
    return null
  }
}

// shortcut: tokens sit in localStorage, readable by page scripts. Move to HttpOnly cookies
// set by a server route if that risk matters.
export function createSession(auth: AuthApi, store: Store | null, now: () => number = Date.now) {
  let state: StoredSession | null = null
  let inflight: Promise<boolean> | null = null
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((fn) => fn())

  const save = (next: StoredSession | null) => {
    state = next
    if (store && next) store.setItem(SESSION_KEY, JSON.stringify(next))
    else store?.removeItem(SESSION_KEY)
    notify()
  }
  const stored = () => parse(store?.getItem(SESSION_KEY) ?? null)

  return {
    /** Read the stored session. Call it on start and when another tab changes the storage. */
    load() {
      state = stored()
      notify()
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
     * Refresh once at a time: refresh tokens rotate, so two callers using the same token would
     * invalidate each other. Another tab may have rotated it already, so the stored session is
     * checked first and again after a 401. Returns false when there is no session left.
     */
    refresh(): Promise<boolean> {
      if (!state) return Promise.resolve(false)
      if (inflight) return inflight
      const latest = stored()
      if (latest && latest.refresh_token !== state.refresh_token) {
        state = latest // another tab already refreshed
        notify()
        return Promise.resolve(true)
      }
      const current = state
      inflight = auth
        .refresh(current.refresh_token)
        .then((r) => {
          // The user signed out (or in again) while this was running: do not bring the old session back.
          if (state?.refresh_token !== current.refresh_token) return state !== null
          const seconds = typeof r.expires_in === "number" ? r.expires_in : ACCESS_TTL_MS / 1000
          save({ ...current, access_token: r.access_token, refresh_token: r.refresh_token, expires_at: now() + seconds * 1000 })
          return true
        })
        .catch((e) => {
          // Only a rejected token ends the session. A rate limit or a network error keeps it.
          if (!(e instanceof CheckoutApiError) || e.status !== 401) return false
          const latest = stored()
          if (latest && latest.refresh_token !== current.refresh_token) {
            state = latest // another tab won the race
            notify()
            return true
          }
          if (state?.refresh_token === current.refresh_token) save(null)
          return state !== null
        })
        .finally(() => {
          inflight = null
        })
      return inflight
    },
  }
}
export type Session = ReturnType<typeof createSession>
