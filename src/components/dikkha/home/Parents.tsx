import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

export function Parents({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.parents
  return (
    <section id="parents" className="mx-auto grid max-w-5xl gap-3 px-4 py-12">
      <h2 className="text-2xl!">{t.title}</h2>
      <p className="max-w-2xl text-dk-muted!">{t.body}</p>
    </section>
  )
}
