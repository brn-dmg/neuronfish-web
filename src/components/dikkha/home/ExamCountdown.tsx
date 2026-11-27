"use client"

import { useSyncExternalStore } from "react"
import { daysUntil, SSC_DATE } from "@/content/dikkha/countdown"
import { digits } from "@/content/dikkha/digits"
import type { Lang } from "@/content/dikkha/lang"

const noSubscribe = () => () => {}

// The page is built once, so the day count is worked out in the browser (the server renders
// the chip without a count and the browser fills it in). Once the exam has passed the chip
// drops the count; the hero is rewritten for SSC 2028.
export function ExamCountdown({ lang, chip, chipNoCount }: { lang: Lang; chip: string; chipNoCount: string }) {
  const days = useSyncExternalStore(noSubscribe, () => daysUntil(SSC_DATE), () => null)
  const text = days !== null && days > 0 ? chip.replace("{n}", digits(days, lang)) : chipNoCount
  return <span className="w-fit rounded-full bg-dk-primary-soft px-3 py-1 text-sm font-semibold text-dk-primary-ink">{text}</span>
}
