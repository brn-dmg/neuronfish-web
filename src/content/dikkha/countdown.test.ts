import assert from "node:assert/strict"
import { test } from "node:test"
import { daysUntil } from "./countdown.ts"

test("days to the exam are counted in Dhaka time", () => {
  assert.equal(daysUntil("2027-03-14", new Date("2027-03-13T05:00:00Z")), 1) // 11:00 in Dhaka
  assert.equal(daysUntil("2027-03-14", new Date("2027-03-13T19:00:00Z")), 0) // already 14 March 01:00 in Dhaka
  assert.equal(daysUntil("2027-03-14", new Date("2026-11-27T00:00:00Z")), 107)
  assert.ok(daysUntil("2027-03-14", new Date("2027-03-20T00:00:00Z")) < 0) // exam passed
})

import { digits } from "./digits.ts"

test("digits follow the language", () => {
  assert.equal(digits(107, "bn"), "১০৭")
  assert.equal(digits(107, "en"), "107")
})
