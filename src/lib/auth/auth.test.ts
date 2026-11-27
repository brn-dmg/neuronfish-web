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
