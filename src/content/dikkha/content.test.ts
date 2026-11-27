import assert from "node:assert/strict"
import { test } from "node:test"
import { bn, en, getContent } from "./index.ts"
import { langFromPath, otherLangPath } from "./lang.ts"

test("Bangla overrides English and missing keys fall back to English", () => {
  const c = getContent("bn")
  assert.equal(c.footer.privacy, bn.footer?.privacy)
  assert.equal(c.brand, en.brand) // not translated yet: falls back
  assert.equal(getContent("en").footer.privacy, "Privacy")
})

test("language paths", () => {
  assert.equal(langFromPath("/dikkha"), "bn")
  assert.equal(langFromPath("/dikkha/checkout"), "bn")
  assert.equal(langFromPath("/dikkha/en"), "en")
  assert.equal(langFromPath("/dikkha/en/checkout"), "en")
  assert.equal(otherLangPath("/dikkha"), "/dikkha/en")
  assert.equal(otherLangPath("/dikkha/checkout"), "/dikkha/en/checkout")
  assert.equal(otherLangPath("/dikkha/en"), "/dikkha")
  assert.equal(otherLangPath("/dikkha/en/checkout"), "/dikkha/checkout")
})

test("Bangla lists replace the English list as a whole", () => {
  const c = getContent("bn")
  assert.ok(Array.isArray(c.home.how.steps))
  assert.equal(c.home.how.steps.length, 3)
  assert.equal(c.home.how.steps[0].title, bn.home?.how?.steps?.[0]?.title)
  assert.equal(getContent("en").home.how.steps[0].title, "Today's work")
})
