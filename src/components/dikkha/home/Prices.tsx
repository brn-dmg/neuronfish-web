import { getContent } from "@/content/dikkha"
import { digits } from "@/content/dikkha/digits"
import type { Lang } from "@/content/dikkha/lang"
import { createCheckoutApi, type Package } from "@/lib/checkout"
import { checkoutEnabled } from "@/lib/checkout/flag"

const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? "")

// Packs come from the same client as the checkout. Before the live API exists this is the mock
// list, which matches the real packs. The contract wants a token for every call, so with the live
// API and no public packs endpoint the call fails and the section simply shows no pack list.
async function loadPackages(): Promise<Package[]> {
  try {
    return await createCheckoutApi(() => null).listPackages()
  } catch (e) {
    // The page keeps rendering without the pack list; the log says why it is missing.
    console.error("Prices: could not load the Coin packs", e)
    return []
  }
}

// No checkout link on purpose: the checkout is hidden until the API is live (J2-6, J2-11).
export async function Prices({ lang }: { lang: Lang }) {
  const t = getContent(lang).home.prices
  const packages = await loadPackages()
  const card = "rounded-xl border border-dk-line bg-dk-bg px-4 py-4"
  return (
    <section id="prices" className="border-y border-dk-line bg-dk-surface">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-12">
        <h2 className="text-2xl!">{t.title}</h2>
        <p className="max-w-2xl text-dk-muted!">{t.lead}</p>
        <div className="grid items-start gap-4 md:grid-cols-2">
          <div className={card}>
            <div className="font-semibold">{t.freeTitle}</div>
            <div className="text-sm text-dk-muted">{t.freeBody}</div>
          </div>
          {packages.length > 0 && (
            <div className={`${card} grid gap-3`}>
              <div className="font-semibold">{t.packsTitle}</div>
              <ul className="grid gap-2">
                {packages.map((p) => (
                  <li key={p.package_id} className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-dk-coin-soft px-2.5 py-0.5 text-sm font-medium text-dk-coin-ink">
                      {fill(t.pack, { amount: `৳${digits(p.amount_bdt, lang)}`, coins: digits(p.coins, lang) })}
                    </span>
                    {p.bonus_coins > 0 && <span className="text-sm text-dk-muted">{fill(t.bonus, { bonus: digits(p.bonus_coins, lang) })}</span>}
                  </li>
                ))}
              </ul>
              <div className="text-sm text-dk-muted">{checkoutEnabled ? t.payNote : t.payNoteSoon}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
