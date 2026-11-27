"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getContent } from "@/content/dikkha"
import { langFromPath, otherLangPath } from "@/content/dikkha/lang"

// Sign in is added in J2-4.
export function DikkhaHeader() {
  const pathname = usePathname()
  const lang = langFromPath(pathname)
  const t = getContent(lang)
  return (
    <header className="border-b border-dk-line bg-dk-surface" lang={lang}>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href={lang === "en" ? "/dikkha/en" : "/dikkha"} className="text-xl font-semibold text-dk-primary">
          {t.brand}
        </Link>
        <Link
          href={otherLangPath(pathname)}
          lang={lang === "en" ? "bn" : "en"}
          aria-label={t.lang.switchLabel}
          className="rounded-full border border-dk-line-strong px-3 py-1 text-sm hover:bg-dk-primary-soft"
        >
          {t.lang.switchTo}
        </Link>
      </div>
    </header>
  )
}
