import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

// Placeholder until the product page sections land (J2-7, J2-8).
export function DikkhaHome({ lang }: { lang: Lang }) {
  return (
    <div lang={lang} className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold">{getContent(lang).brand}</h1>
    </div>
  )
}
