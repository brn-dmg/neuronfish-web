import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

export function ChatDemo({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.chat
  return (
    <section className="border-y border-dk-line bg-dk-surface">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12 text-center">
        <h2 className="text-2xl!">{t.title}</h2>
        <p className="mx-auto max-w-xl text-dk-muted!">{t.lead}</p>
        <div className="mx-auto grid w-full max-w-lg gap-2 rounded-2xl border border-dk-line bg-dk-surface p-4 text-left">
          <div className="justify-self-end rounded-[14px_14px_4px_14px] bg-dk-primary px-3 py-2 text-sm text-dk-on-primary">{t.question}</div>
          <div className="rounded-[14px_14px_14px_4px] bg-dk-bg px-3 py-2 text-sm">
            <div>{t.answer}</div>
            <span className="mt-2 inline-block rounded-full bg-dk-primary-soft px-2 py-0.5 text-xs font-semibold text-dk-primary-ink">{t.topic}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
