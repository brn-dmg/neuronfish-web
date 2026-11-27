"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getContent } from "@/content/dikkha"
import { langFromPath, otherLangPath } from "@/content/dikkha/lang"
import { checkoutEnabled } from "@/lib/checkout/flag"
import { useSession } from "./SessionProvider"

export function DikkhaHeader() {
  const pathname = usePathname()
  const lang = langFromPath(pathname)
  const t = getContent(lang)
  const { ready, current, session } = useSession()
  const base = lang === "en" ? "/dikkha/en" : "/dikkha"
  return (
    <header className="border-b border-dk-line bg-dk-surface" lang={lang}>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href={base} className="text-xl font-semibold text-dk-primary">
          {t.brand}
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-dk-muted md:flex">
          {(["how", "prices", "parents", "faq"] as const).map((id) => (
            <Link key={id} href={`${base}#${id}`} className="hover:text-dk-ink">
              {t.nav[id]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
        {checkoutEnabled && ready && (
          current ? (
            <button onClick={session.signOut} className="text-sm text-dk-muted hover:text-dk-ink">
              {current.name ? `${current.name} · ` : ""}{t.auth.signOut}
            </button>
          ) : (
            <Link href={`${base}/signin`} className="text-sm font-medium text-dk-primary-ink hover:underline">
              {t.auth.signIn}
            </Link>
          )
        )}
        <Link
          href={otherLangPath(pathname)}
          lang={lang === "en" ? "bn" : "en"}
          aria-label={t.lang.switchLabel}
          className="rounded-full border border-dk-line-strong px-3 py-1 text-sm hover:bg-dk-primary-soft"
        >
          {t.lang.switchTo}
        </Link>
        </div>
      </div>
    </header>
  )
}
