import assert from "node:assert/strict"
import { test } from "node:test"
import { getContent } from "./index.ts"
import { dikkhaJsonLd, dikkhaMetadata } from "./seo.ts"

type Faq = { mainEntity: { name: string; acceptedAnswer: { text: string } }[] }
type App = { downloadUrl: string; offers: { price: string }; publisher: { "@id": string } }
const node = <T>(lang: "bn" | "en", type: string, checkoutOn?: boolean) => dikkhaJsonLd(lang, checkoutOn)["@graph"].find((n) => n["@type"] === type) as T | undefined

for (const lang of ["bn", "en"] as const) {
  test(`${lang}: structured data is a SoftwareApplication and a FAQPage with every question`, () => {
    const app = node<App>(lang, "SoftwareApplication")
    const faq = node<Faq>(lang, "FAQPage")
    assert.ok(app && faq)
    assert.equal(app.downloadUrl, "https://play.google.com/store/apps/details?id=com.dikkhaai.app&pli=1")
    assert.equal(app.offers.price, "0")
    assert.equal(app.publisher["@id"], "https://www.neuronfish.dev/#organization")
    assert.equal(faq.mainEntity.length, getContent(lang).home.faq.items.length)
    for (const q of faq.mainEntity) assert.ok(q.name && q.acceptedAnswer.text)
  })

  test(`${lang}: nothing in the structured data mentions Nagad, and it round-trips as JSON`, () => {
    const json = JSON.stringify(dikkhaJsonLd(lang))
    assert.ok(!/nagad|নগদ/i.test(json))
    assert.deepEqual(JSON.parse(json), dikkhaJsonLd(lang))
  })

  test(`${lang}: metadata has an absolute title, a short description, a canonical and both languages`, () => {
    const m = dikkhaMetadata(lang)
    const { title, description } = getContent(lang).meta
    assert.deepEqual(m.title, { absolute: title })
    assert.ok(title.length <= 70, `title is ${title.length} characters`)
    assert.ok(description.length <= 170, `description is ${description.length} characters`)
    assert.equal(m.alternates?.canonical, lang === "bn" ? "/dikkha" : "/dikkha/en")
    assert.deepEqual(m.alternates?.languages, { bn: "/dikkha", en: "/dikkha/en", "x-default": "/dikkha" })
  })
}

test("the FAQ answer follows the checkout flag, whatever the environment says", () => {
  const bkash = (on: boolean) => node<Faq>("en", "FAQPage", on)!.mainEntity.find((q) => q.name.includes("bKash"))!.acceptedAnswer.text
  assert.match(bkash(false), /available on this website soon/)
  assert.match(bkash(true), /You can buy Coins on this website with bKash/)
})

test("the two languages have different application ids", () => {
  const id = (lang: "bn" | "en") => (node<App & { "@id": string }>(lang, "SoftwareApplication"))!["@id"]
  assert.notEqual(id("bn"), id("en"))
})
