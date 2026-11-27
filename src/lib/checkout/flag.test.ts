import assert from "node:assert/strict"
import { test } from "node:test"
import { isCheckoutEnabled } from "./flag.ts"

const on = { NEXT_PUBLIC_CHECKOUT_ENABLED: "true" }

test("flag off: hidden everywhere", () => {
  assert.equal(isCheckoutEnabled({}), false)
  assert.equal(isCheckoutEnabled({ NEXT_PUBLIC_CHECKOUT_ENABLED: "false", NEXT_PUBLIC_CHECKOUT_API_MODE: "live", NODE_ENV: "production" }), false)
  assert.equal(isCheckoutEnabled({ NEXT_PUBLIC_CHECKOUT_ENABLED: "1", NEXT_PUBLIC_CHECKOUT_API_MODE: "live" }), false) // only "true" counts
})

test("flag on with the mock in production: still hidden", () => {
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production" }), false) // mode unset means mock
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production", NEXT_PUBLIC_CHECKOUT_API_MODE: "mock" }), false)
})

test("flag on with the live API in production: enabled", () => {
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production", NEXT_PUBLIC_CHECKOUT_API_MODE: "live" }), true)
})

test("flag on with the mock in development: enabled (for local work)", () => {
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "development" }), true)
})
