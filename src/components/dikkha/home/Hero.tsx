import { Check } from "lucide-react"
import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"
import { DIKKHA_PLAY_STORE_URL } from "@/lib/constants"
import { ExamCountdown } from "./ExamCountdown"

// No "start on the web" button and no App Store button: J2 has no web app and there is no App Store link yet.
export function Hero({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.hero
  return (
    <section className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-10 md:grid-cols-[1.1fr_0.9fr] md:py-16">
      <div className="grid gap-5">
        <ExamCountdown lang={lang} chip={t.chip} chipNoCount={t.chipNoCount} />
        <h1 className="text-[1.65rem]! leading-[1.5]! font-bold! md:text-[2.125rem]!">{t.title}</h1>
        <p className="text-base text-dk-muted! md:text-lg">{t.body}</p>
        <div>
          <a
            href={DIKKHA_PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.playLabel}
            className="inline-flex items-center rounded-full bg-dk-ink px-6 py-3 text-base font-semibold text-dk-surface"
          >
            {t.play}
          </a>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-dk-muted">
          {t.trust.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-dk-primary" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid justify-items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/dikkha/baghu-welcome.svg" alt={t.baghuAlt} width={240} height={300} className="w-48 md:w-60" />
        {/* A sample of the app, for show only: the words are placeholders from the mockup. */}
        <div aria-hidden className="w-52 rounded-[26px] bg-[#0B0D0C] p-1.5">
          <div className="grid gap-2 rounded-[20px] bg-dk-bg px-2.5 py-3 text-[11px] leading-snug">
            <div className="rounded-xl border border-dk-line bg-dk-surface px-2.5 py-2">
              <div className="font-semibold">{t.previewToday}</div>
              <div>{t.previewChapter}</div>
            </div>
            <div className="rounded-xl border border-dk-line bg-dk-surface px-2.5 py-2">{t.previewChat}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
