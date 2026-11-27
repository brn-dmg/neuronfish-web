import type { Lang } from "./lang.ts"

const BN = "০১২৩৪৫৬৭৮৯"

/** Bangla digits in Bangla text, Latin digits in English text (design system: digits follow the sentence). */
export function digits(n: number | string, lang: Lang): string {
  return lang === "bn" ? String(n).replace(/\d/g, (d) => BN[Number(d)]) : String(n)
}
