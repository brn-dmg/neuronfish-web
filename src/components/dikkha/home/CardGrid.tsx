import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

type Block = "features" | "groups"

// Shared by "what you get" and "study groups": a heading and a grid of small cards.
export function CardGrid({ lang, block, id, tone }: { lang: Lang; block: Block; id: string; tone: "surface" | "bg" }) {
  const t = getContent(lang).home[block]
  const section = tone === "surface" ? "border-y border-dk-line bg-dk-surface" : ""
  const card = tone === "surface" ? "bg-dk-bg" : "bg-dk-surface"
  return (
    <section id={id} className={section}>
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12">
        <h2 className="text-2xl!">{t.title}</h2>
        <ul className={`grid gap-3 sm:grid-cols-2 md:grid-cols-3`}>
          {t.items.map((item) => (
            <li key={item.name} className={`rounded-xl border border-dk-line px-4 py-3 ${card}`}>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-dk-muted">{item.body}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
