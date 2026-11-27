import Link from "next/link"
import { SOCIALS } from "@/lib/social"

// Privacy and terms are the existing main-site pages (their design is not changed in J2).
const LINKS = [
  { href: "/dikkha-ai/privacy", label: "Privacy" },
  { href: "/dikkha-ai/terms", label: "Terms" },
]

export function DikkhaFooter() {
  const socials = Object.entries(SOCIALS.dikkha)
  return (
    <footer className="border-t border-dk-line bg-dk-surface">
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
