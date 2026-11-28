import { dikkhaJsonLd } from "@/content/dikkha/seo"
import type { Lang } from "@/content/dikkha/lang"
import { JsonLd } from "./JsonLd"
import { CardGrid } from "./home/CardGrid"
import { ChatDemo } from "./home/ChatDemo"
import { Faq } from "./home/Faq"
import { FinalCta } from "./home/FinalCta"
import { Hero } from "./home/Hero"
import { HowItWorks } from "./home/HowItWorks"
import { Parents } from "./home/Parents"
import { Prices } from "./home/Prices"

// The product page, in the order of grill Q109 (the "Proof" block was dropped). The footer is in the layout.
export function DikkhaHome({ lang }: { lang: Lang }) {
  return (
    <div lang={lang}>
      <JsonLd data={dikkhaJsonLd(lang)} />
      <Hero lang={lang} />
      <ChatDemo lang={lang} />
      <HowItWorks lang={lang} />
      <CardGrid lang={lang} block="features" id="features" tone="surface" />
      <CardGrid lang={lang} block="groups" id="groups" tone="bg" />
      <Prices lang={lang} />
      <Parents lang={lang} />
      <Faq lang={lang} />
      <FinalCta lang={lang} />
    </div>
  )
}
