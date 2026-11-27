import assert from "node:assert/strict"
import { test } from "node:test"
import { CheckoutApiError } from "./errors.ts"
import { createMockApi, MOCK_TRX_DUPLICATE, MOCK_TRX_RATE_LIMITED } from "./mock.ts"

const input = (trx_id: string) => ({ trx_id, payer_msisdn: "01712345789" })
const rejects = (p: Promise<unknown>, detail: string) =>
  assert.rejects(p, (e) => e instanceof CheckoutApiError && e.detail === detail)

test("ordinary account: coins are added at once and the payment is unverified", async () => {
  const api = createMockApi()
  const order = await api.createOrder("pack_100")
  assert.equal(order.coins, 110)
  const { payment, coins_balance } = await api.submitTrx(order.order_code, input("ABCD123456"))
  assert.equal(payment.status, "unverified")
  assert.equal(coins_balance, 110)
  assert.equal(payment.payer_msisdn_masked, "********789")
})

test("account with a revoked payment: pending, no coins yet", async () => {
  const api = createMockApi({ revokedHistory: true })
  const order = await api.createOrder("pack_50")
  const { payment, coins_balance } = await api.submitTrx(order.order_code, input("ABCD123456"))
  assert.equal(payment.status, "pending")
  assert.equal(coins_balance, 0)
})

test("one open order at a time; open order can be resumed", async () => {
  const api = createMockApi()
  const first = await api.createOrder("pack_50")
  const second = await api.createOrder("pack_100")
  assert.equal((await api.getOrder(first.order_code)).status, "cancelled")
  assert.equal((await api.getOpenOrder()).order_code, second.order_code)
  await api.cancelOrder(second.order_code)
  await rejects(api.getOpenOrder(), "order_not_found")
})

test("errors: invalid package, invalid and duplicate TrxID, rate limit, in progress", async () => {
  const api = createMockApi()
  await rejects(api.createOrder("nope"), "invalid_package")
  const order = await api.createOrder("pack_50")
  await rejects(api.submitTrx(order.order_code, input("bad")), "trx_id_invalid")
  await rejects(api.submitTrx(order.order_code, input(MOCK_TRX_DUPLICATE)), "trx_id_duplicate")
  await rejects(api.submitTrx(order.order_code, input(MOCK_TRX_RATE_LIMITED)), "too_many_attempts")
  await api.submitTrx(order.order_code, input("ABCD123456"))
  const next = await api.createOrder("pack_50")
  await rejects(api.submitTrx(next.order_code, input("ZZZZ123456")), "payment_in_progress")
})

test("5 failed attempts on one order lock it", async () => {
  const api = createMockApi()
  const order = await api.createOrder("pack_50")
  for (let i = 0; i < 5; i++) await rejects(api.submitTrx(order.order_code, input("bad")), "trx_id_invalid")
  await rejects(api.submitTrx(order.order_code, input("ABCD123456")), "too_many_attempts")
})

test("orders expire after the ttl", async () => {
  let t = 0
  const api = createMockApi({ now: () => t })
  const order = await api.createOrder("pack_50")
  t = 60 * 60 * 1000 + 1
  assert.equal((await api.getOrder(order.order_code)).status, "expired")
  await rejects(api.submitTrx(order.order_code, input("ABCD123456")), "order_expired")
  await rejects(api.getOpenOrder(), "order_not_found")
})

test("payment actions throw in production", async () => {
  const prev = process.env.NODE_ENV
  ;(process.env as Record<string, string>).NODE_ENV = "production"
  try {
    const api = createMockApi()
    assert.equal((await api.listPackages()).length, 3) // reads are allowed
    await assert.rejects(api.createOrder("pack_50"), /production/)
  } finally {
    ;(process.env as Record<string, string>).NODE_ENV = prev ?? "test"
  }
})
