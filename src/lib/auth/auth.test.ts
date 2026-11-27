import assert from "node:assert/strict"
import { test } from "node:test"
import { CheckoutApiError } from "../checkout/errors.ts"
import type { CheckoutApi } from "../checkout/types.ts"
import { withRefresh } from "../checkout/withRefresh.ts"
import { createMockAuth, MOCK_OTP } from "./mock.ts"
import { createSession } from "./session.ts"
import { normalizePhone } from "./types.ts"

const memory = () => {
  const m = new Map<string, string>()
  return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k) }
}

test("phone numbers are normalized like the backend does", () => {
  assert.equal(normalizePhone("01712345678"), "+8801712345678")
  assert.equal(normalizePhone("+880 1712-345678"), "+8801712345678")
  assert.equal(normalizePhone("8801712345678"), "+8801712345678")
  assert.equal(normalizePhone("0171234567"), null)
  assert.equal(normalizePhone("01212345678"), null)
})

test("sign in, reload and sign out", async () => {
  const store = memory()
  const auth = createMockAuth()
  const s = createSession(auth, store)
  const r = await auth.verifyOtp("+8801712345678", MOCK_OTP)
  s.signIn(r, r.user?.name ?? null)
  assert.equal(createSession(auth, store).load()?.name, "Test Student") // a reload keeps it
  assert.deepEqual(Object.keys(s.get()!).sort(), ["access_token", "expires_at", "name", "refresh_token"]) // nothing else is stored
  s.signOut()
  assert.equal(createSession(auth, store).load(), null)
})

test("unfinished accounts and a wrong code", async () => {
  const auth = createMockAuth()
  const r = await auth.verifyOtp("+8801700000000", MOCK_OTP)
  assert.equal(r.needs_profile, true)
  assert.equal(r.user, undefined)
  await assert.rejects(auth.verifyOtp("+8801712345678", "000000"), (e) => e instanceof CheckoutApiError && e.detail === "Invalid OTP")
})

test("refresh rotates the token and runs once at a time", async () => {
  const auth = createMockAuth()
  let calls = 0
  const counting = { ...auth, refresh: (t: string) => (calls++, auth.refresh(t)) }
  const s = createSession(counting, memory())
  const r = await auth.verifyOtp("+8801712345678", MOCK_OTP)
  s.signIn(r, "x")
  const old = s.get()!.refresh_token
  const [a, b] = await Promise.all([s.refresh(), s.refresh()])
  assert.deepEqual([a, b, calls], [true, true, 1])
  assert.notEqual(s.get()!.refresh_token, old)
})

test("a rejected refresh ends the session; a network error keeps it", async () => {
  const auth = createMockAuth()
  const s = createSession(auth, memory())
  s.signIn({ access_token: "a", refresh_token: "unknown" }, null)
  assert.equal(await s.refresh(), false)
  assert.equal(s.get(), null)

  const down = { ...auth, refresh: async () => { throw new CheckoutApiError(0, "network_error", true) } }
  const s2 = createSession(down, memory())
  s2.signIn({ access_token: "a", refresh_token: "r" }, null)
  assert.equal(await s2.refresh(), false)
  assert.notEqual(s2.get(), null)
})

test("withRefresh retries once after a 401", async () => {
  let calls = 0
  const api = { getWallet: async () => (++calls === 1 ? Promise.reject(new CheckoutApiError(401, "Token expired")) : { coins_balance: 5 }) } as unknown as CheckoutApi
  const wrapped = withRefresh({ ...api, listPackages: api.getWallet } as unknown as CheckoutApi, async () => true)
  assert.deepEqual(await wrapped.getWallet(), { coins_balance: 5 })
  assert.equal(calls, 2)

  calls = 0
  const stuck = withRefresh({ ...api, listPackages: api.getWallet } as unknown as CheckoutApi, async () => false)
  await assert.rejects(stuck.getWallet(), (e) => e instanceof CheckoutApiError && e.status === 401)
})

test("signing out while a refresh is running does not bring the session back", async () => {
  let release!: () => void
  const slow = {
    ...createMockAuth(),
    refresh: () => new Promise<{ access_token: string; refresh_token: string; expires_in: number }>((r) => (release = () => r({ access_token: "a2", refresh_token: "r2", expires_in: 3600 }))),
  }
  const store = memory()
  const s = createSession(slow, store)
  s.signIn({ access_token: "a", refresh_token: "r" }, "x")
  const pending = s.refresh()
  s.signOut()
  release()
  assert.equal(await pending, false)
  assert.equal(s.get(), null)
  assert.equal(store.getItem("dikkha.session"), null)
})

test("a rate limit (429) on refresh keeps the session", async () => {
  const limited = { ...createMockAuth(), refresh: async () => { throw new CheckoutApiError(429, "slow down", true) } }
  const s = createSession(limited, memory())
  s.signIn({ access_token: "a", refresh_token: "r" }, "x")
  assert.equal(await s.refresh(), false)
  assert.equal(s.get()?.refresh_token, "r")
})

test("two tabs: the second adopts the tokens the first one rotated", async () => {
  const auth = createMockAuth()
  const store = memory()
  const r = await auth.verifyOtp("+8801712345678", MOCK_OTP)
  const a = createSession(auth, store)
  a.signIn(r, "x")
  const b = createSession(auth, store)
  b.load()
  assert.equal(await a.refresh(), true) // rotates the refresh token in the store
  assert.equal(await b.refresh(), true) // would be a 401 with the old token; adopts the new one instead
  assert.equal(b.get()?.refresh_token, a.get()?.refresh_token)
  assert.equal(await b.refresh(), true) // and keeps working
})

test("a stored value that is not a session is ignored", () => {
  const store = memory()
  store.setItem("dikkha.session", "{}")
  assert.equal(createSession(createMockAuth(), store).load(), null)
  store.setItem("dikkha.session", "not json")
  assert.equal(createSession(createMockAuth(), store).load(), null)
})

test("a refresh response without expires_in falls back to one hour", async () => {
  const noTtl = { ...createMockAuth(), refresh: async () => ({ access_token: "a2", refresh_token: "r2" }) as never }
  const t = 1000
  const s = createSession(noTtl, memory(), () => t)
  s.signIn({ access_token: "a", refresh_token: "r" }, null)
  await s.refresh()
  assert.equal(s.get()?.expires_at, 1000 + 60 * 60 * 1000)
})
