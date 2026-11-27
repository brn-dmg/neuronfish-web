import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"
import { DIKKHA_PLAY_STORE_URL } from "@/lib/constants"

// Baghu appears only in the hero and here (grill Q13).
export function FinalCta({ lang }: { lang: Lang }) {
  const h = getContent(lang).home
  return (
    <section className="bg-dk-primary">
      <div className="mx-auto grid max-w-5xl justify-items-center gap-5 px-4 py-12 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dikkha/baghu-celebrate.svg" alt={h.cta.baghuAlt} width={160} height={200} className="w-32" />
        <h2 className="text-2xl! text-dk-on-primary!">{h.cta.title}</h2>
        <a
          href={DIKKHA_PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={h.hero.playLabel}
          className="inline-flex items-center rounded-full bg-dk-surface px-6 py-3 text-base font-semibold text-dk-primary"
        >
          {h.hero.play}
        </a>
      </div>
    </section>
  )
}
