"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { getContent } from "@/content/dikkha"
import { langFromPath } from "@/content/dikkha/lang"
import { SOCIALS } from "@/lib/social"

// Privacy and terms are the existing main-site pages (their design is not changed in J2).
export function DikkhaFooter() {
  const lang = langFromPath(usePathname())
  const t = getContent(lang)
  const LINKS = [
    { href: "/dikkha-ai/privacy", label: t.footer.privacy },
    { href: "/dikkha-ai/terms", label: t.footer.terms },
  ]
  const socials = Object.entries(SOCIALS.dikkha)
  return (
    <footer className="border-t border-dk-line bg-dk-surface" lang={lang}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-dk-muted">
        <nav className="flex gap-6">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-dk-ink">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex gap-6">
          {socials.map(([name, url]) => (
            <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-dk-ink">
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
