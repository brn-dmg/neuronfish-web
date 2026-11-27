import type { Lang } from "@/content/dikkha/lang"
import { ChatDemo } from "./home/ChatDemo"
import { Hero } from "./home/Hero"
import { HowItWorks } from "./home/HowItWorks"

// Sections 1 to 3 of the product page. Features, prices, parents, FAQ and the final call to action come in J2-17.
export function DikkhaHome({ lang }: { lang: Lang }) {
  return (
    <div lang={lang}>
      <Hero lang={lang} />
      <ChatDemo lang={lang} />
      <HowItWorks lang={lang} />
    </div>
  )
}
