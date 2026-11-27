import { CheckoutApiError } from "./errors.ts"
import type { CheckoutApi, Order, Package, Payment } from "./types.ts"

// Mock packs match the real ones Risad decided (the live API serves the same list).
export const MOCK_PACKAGES: Package[] = [
  { package_id: "pack_50", label: "৳50", amount_bdt: 50, coins: 50, bonus_coins: 0 },
  { package_id: "pack_100", label: "৳100", amount_bdt: 100, coins: 110, bonus_coins: 10 },
  { package_id: "pack_250", label: "৳250", amount_bdt: 250, coins: 300, bonus_coins: 50 },
]

// Placeholder until the real QR and merchant number arrive from the API.
const PLACEHOLDER_QR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" fill="#fff" stroke="#999"/><text x="120" y="125" text-anchor="middle" font-size="16" fill="#666">QR placeholder</text></svg>',
  )

export type MockOptions = {
  /** Account had a revoked payment before: coins are added only after verification. */
  revokedHistory?: boolean
  orderTtlMs?: number
  now?: () => number
}

// Magic TrxIDs trigger error scenarios. The real format is validated by the server.
export const MOCK_TRX_DUPLICATE = "DUPLICATE1"
export const MOCK_TRX_RATE_LIMITED = "RATELIMIT1"
const TRX_FORMAT = /^[A-Z0-9]{8,12}$/

export function createMockApi(opts: MockOptions = {}): CheckoutApi {
  const now = opts.now ?? Date.now
  const ttl = opts.orderTtlMs ?? 60 * 60 * 1000
  const orders = new Map<string, Order>()
  const usedTrx = new Set<string>([MOCK_TRX_DUPLICATE])
  const failedAttempts = new Map<string, number>()
  let balance = 0
  let hasUnverified = false
  let seq = 4820

  // Orders expire by time, so status is derived on read.
  const view = (o: Order): Order =>
    o.status === "open" && now() > Date.parse(o.expires_at) ? { ...o, status: "expired" } : { ...o }
  const find = (code: string) => {
    const o = orders.get(code)
    if (!o) throw new CheckoutApiError(404, "order_not_found")
    return view(o)
  }
  const openOrder = () => [...orders.values()].map(view).find((o) => o.status === "open")
  const fail = (order: string) => {
    failedAttempts.set(order, (failedAttempts.get(order) ?? 0) + 1)
  }

  return {
    async listPackages() {
      return MOCK_PACKAGES
    },

    async createOrder(packageId) {
      assertNotProduction()
      const pkg = MOCK_PACKAGES.find((p) => p.package_id === packageId)
      if (!pkg) throw new CheckoutApiError(400, "invalid_package")
      const prev = openOrder()
      if (prev) orders.set(prev.order_code, { ...prev, status: "cancelled" }) // one open order at a time
      const created = now()
      const order: Order = {
        order_code: `DK-${++seq}`,
        status: "open",
        package_id: pkg.package_id,
        coins: pkg.coins,
        amount_bdt: pkg.amount_bdt,
        merchant_number: "01XXXXXXXXX",
        qr_image_url: PLACEHOLDER_QR,
        created_at: new Date(created).toISOString(),
        expires_at: new Date(created + ttl).toISOString(),
      }
      orders.set(order.order_code, order)
      return { ...order }
    },

    async getOrder(code) {
      return find(code)
    },

    async getOpenOrder() {
      const o = openOrder()
      if (!o) throw new CheckoutApiError(404, "order_not_found")
      return o
    },

    async cancelOrder(code) {
      assertNotProduction()
      const o = find(code)
      if (o.status !== "open") throw new CheckoutApiError(409, "order_not_open")
      const cancelled = { ...o, status: "cancelled" as const }
      orders.set(code, cancelled)
      return cancelled
    },

    async submitTrx(code, input) {
      assertNotProduction()
      const o = find(code)
      if (o.status === "expired") throw new CheckoutApiError(409, "order_expired")
      if (o.status !== "open") throw new CheckoutApiError(409, "order_not_open")
      if (hasUnverified) throw new CheckoutApiError(409, "payment_in_progress")
      if (input.trx_id === MOCK_TRX_RATE_LIMITED || (failedAttempts.get(code) ?? 0) >= 5)
        throw new CheckoutApiError(429, "too_many_attempts", true)
      if (!TRX_FORMAT.test(input.trx_id)) {
        fail(code)
        throw new CheckoutApiError(422, "trx_id_invalid")
      }
      if (usedTrx.has(input.trx_id)) {
        fail(code)
        throw new CheckoutApiError(409, "trx_id_duplicate")
      }
      usedTrx.add(input.trx_id)
      hasUnverified = true
      const pending = opts.revokedHistory === true
      if (!pending) balance += o.coins
      const payment: Payment = {
        id: `pay_${code}`,
        order_code: code,
        package_id: o.package_id,
        coins: o.coins,
        amount_bdt: o.amount_bdt,
        status: pending ? "pending" : "unverified",
        payer_msisdn_masked: `********${input.payer_msisdn.slice(-3)}`,
        reject_reason: null,
        created_at: new Date(now()).toISOString(),
      }
      orders.set(code, { ...o, status: "submitted", payment })
      return { payment, coins_balance: balance }
    },

    async getWallet() {
      return { coins_balance: balance }
    },
  }
}

// Payment actions on mocks must never run in production: nobody may pay on a fake API.
function assertNotProduction() {
  if (process.env.NODE_ENV === "production")
    throw new Error("Mock checkout API cannot be used in production")
}
