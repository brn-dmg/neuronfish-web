import type { Metadata } from "next"
import { COMPANY, DIKKHA_PLAY_STORE_URL } from "../../lib/constants.ts"
import { checkoutEnabled } from "../../lib/checkout/flag.ts"
import { getContent } from "./index.ts"
import type { Lang } from "./lang.ts"

const PATH = { bn: "/dikkha", en: "/dikkha/en" } as const
const OG_IMAGE = "/dikkha/og.png"

/** The same FAQ answer the page shows: while the checkout is off, the "available soon" wording. */
export function faqAnswer(item: { a: string; aSoon?: string }): string {
  return !checkoutEnabled && item.aSoon ? item.aSoon : item.a
}

export function dikkhaMetadata(lang: Lang): Metadata {
  const { title, description, ogAlt } = getContent(lang).meta
  const other = lang === "bn" ? "en" : "bn"
  const locale = (l: Lang) => (l === "bn" ? "bn_BD" : "en_US")
  const image = { url: OG_IMAGE, width: 1200, height: 630, alt: ogAlt }
  return {
    // absolute: the main site's "| NeuronFish" title suffix does not belong on a Dikkha page
    title: { absolute: title },
    description,
    alternates: {
      canonical: PATH[lang],
      languages: { bn: PATH.bn, en: PATH.en, "x-default": PATH.bn },
    },
    openGraph: {
      type: "website",
      siteName: "Dikkha",
      title,
      description,
      url: PATH[lang],
      locale: locale(lang),
      alternateLocale: [locale(other)],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  }
}

/** SoftwareApplication and FAQPage for answer engines and search; the Organization is already in the root layout. */
export function dikkhaJsonLd(lang: Lang) {
  const t = getContent(lang)
  const url = `${COMPANY.url}${PATH[lang]}`
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${COMPANY.url}/dikkha#app`,
        name: "Dikkha",
        description: t.meta.description,
        url,
        applicationCategory: "EducationalApplication",
        operatingSystem: "Android",
        inLanguage: lang,
        downloadUrl: DIKKHA_PLAY_STORE_URL,
        offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
        publisher: { "@id": `${COMPANY.url}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: lang,
        mainEntity: t.home.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: faqAnswer(item) },
        })),
      },
    ],
  }
}
