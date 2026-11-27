import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

// Plain <details>: no JavaScript, keyboard and screen-reader friendly.
export function Faq({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.faq
  return (
    <section id="faq" className="border-y border-dk-line bg-dk-surface">
      <div className="mx-auto grid max-w-3xl gap-6 px-4 py-12">
        <h2 className="text-2xl!">{t.title}</h2>
        <div className="grid gap-2">
          {t.items.map((item) => (
            <details key={item.q} className="group rounded-xl border border-dk-line bg-dk-bg px-4 py-3">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <span aria-hidden className="text-xl text-dk-muted transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="pt-2 text-dk-muted">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
