import { getContent } from "@/content/dikkha"
import { digits } from "@/content/dikkha/digits"
import type { Lang } from "@/content/dikkha/lang"

export function HowItWorks({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.how
  return (
    <section id="how" className="mx-auto grid max-w-5xl gap-6 px-4 py-12">
      <h2 className="text-2xl!">{t.title}</h2>
      <ol className="grid gap-5 md:grid-cols-3">
        {t.steps.map((step, i) => (
          <li key={step.title} className="flex items-start gap-3">
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-dk-primary text-sm font-semibold text-dk-on-primary">{digits(i + 1, lang)}</span>
            <div>
              <div className="font-semibold">{step.title}</div>
              <div className="text-sm text-dk-muted">{step.body}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
