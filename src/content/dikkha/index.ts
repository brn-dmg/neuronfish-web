import type { Lang } from "./lang.ts"

// English is the complete source and defines the shape. Bangla may be partial:
// any key missing in `bn` falls back to the English text, so an English
// placeholder ships until the Bangla is supplied.
export const en = {
  brand: "Dikkha",
  lang: { switchTo: "বাংলা", switchLabel: "Switch to Bangla" },
  footer: { privacy: "Privacy", terms: "Terms" },
}

export type Content = typeof en
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }

// "গোপনীয়তা ও শর্ত" (Privacy and terms) is the only footer wording in the app copy deck.
export const bn: DeepPartial<Content> = {
  lang: { switchTo: "English", switchLabel: "ইংরেজিতে দেখো" },
  footer: { privacy: "গোপনীয়তা", terms: "শর্ত" },
}

function merge<T extends object>(base: T, over: DeepPartial<T>): T {
  const out = { ...base } as Record<string, unknown>
  for (const [k, v] of Object.entries(over)) {
    const b = (base as Record<string, unknown>)[k]
    out[k] = v && typeof v === "object" && b && typeof b === "object" ? merge(b, v) : (v ?? b)
  }
  return out as T
}

export function getContent(lang: Lang): Content {
  return lang === "en" ? en : merge(en, bn)
}
