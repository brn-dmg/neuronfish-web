import assert from "node:assert/strict"
import { test } from "node:test"
import { isCheckoutEnabled } from "./flag.ts"
import { isLive } from "./mode.ts"

const on = { NEXT_PUBLIC_CHECKOUT_ENABLED: "true" }

test("only the exact value 'live' counts as live", () => {
  assert.equal(isLive("live"), true)
  for (const m of [undefined, "", "mock", "LIVE", "staging"]) assert.equal(isLive(m), false)
})

test("flag off: hidden everywhere", () => {
  assert.equal(isCheckoutEnabled({}), false)
  assert.equal(isCheckoutEnabled({ NEXT_PUBLIC_CHECKOUT_ENABLED: "false", NEXT_PUBLIC_CHECKOUT_API_MODE: "live", NODE_ENV: "production" }), false)
  assert.equal(isCheckoutEnabled({ NEXT_PUBLIC_CHECKOUT_ENABLED: "1", NEXT_PUBLIC_CHECKOUT_API_MODE: "live" }), false) // only "true" counts
})

test("flag on with the mock: hidden in production and in any unknown environment", () => {
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production" }), false) // mode unset means mock
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production", NEXT_PUBLIC_CHECKOUT_API_MODE: "mock" }), false)
  assert.equal(isCheckoutEnabled({ ...on }), false) // NODE_ENV unset
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "test" }), false)
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "production", NEXT_PUBLIC_CHECKOUT_API_MODE: "staging" }), false)
})

test("flag on with the live API: enabled in any environment", () => {
  for (const NODE_ENV of ["production", "development", "test", undefined]) {
    assert.equal(isCheckoutEnabled({ ...on, NODE_ENV, NEXT_PUBLIC_CHECKOUT_API_MODE: "live" }), true)
  }
})

test("flag on with the mock in local development: enabled", () => {
  assert.equal(isCheckoutEnabled({ ...on, NODE_ENV: "development" }), true)
})
