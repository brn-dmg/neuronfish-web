"use client"

import { useEffect, useState } from "react"
import { normalizePhone } from "@/lib/auth/types"
import { CheckoutApiError } from "@/lib/checkout/errors"
import type { CheckoutApi, Order, Package, Payment } from "@/lib/checkout/types"
import type { CheckoutBrand, CheckoutCopy } from "./brand"

type ErrKey = keyof CheckoutCopy["errors"]

type View =
  | { v: "loading" }
  | { v: "error"; key: ErrKey }
  | { v: "packages"; packages: Package[]; notice?: ErrKey }
  | { v: "order"; order: Order }
  | { v: "expired" }
  | { v: "done"; payment: Payment; balance: number }

const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""))

function errKey(e: unknown): ErrKey {
  if (!(e instanceof CheckoutApiError)) return "generic"
  switch (e.detail) {
    case "network_error": return "network"
    case "trx_id_invalid": return "invalidTrx"
    case "trx_id_duplicate": return "duplicateTrx"
    case "payment_in_progress": return "paymentInProgress"
    case "too_many_attempts": return "tooManyAttempts"
    case "order_not_open": return "orderNotOpen"
    case "order_not_found": return "orderNotFound"
    case "invalid_package": return "invalidPackage"
    default: return "generic"
  }
}

// Colors come from the layout's --ck-* variables, never from the brand config.
const card = "rounded-2xl border border-(color:--ck-line) bg-(color:--ck-surface) p-5"
const primary = "w-full rounded-xl bg-(color:--ck-primary) px-4 py-3 text-base font-medium text-(color:--ck-on-primary) disabled:opacity-60"
const link = "text-sm text-(color:--ck-primary-ink) underline"
const field = "w-full rounded-xl border border-(color:--ck-line-strong) bg-(color:--ck-surface) px-3 py-3 text-base text-(color:--ck-ink) outline-none focus:border-(color:--ck-primary)"
const coinPill = "rounded-full bg-(color:--ck-coin-soft) px-2 py-0.5 text-sm font-medium text-(color:--ck-coin-ink)"

export function Checkout({ brand, api, studentName }: { brand: CheckoutBrand; api: CheckoutApi; studentName: string | null }) {
  const t = brand.copy
  const [view, setView] = useState<View>({ v: "loading" })

  // Resume the open order if there is one, otherwise show the packages.
  async function resolve(notice?: ErrKey): Promise<View> {
    try {
      return { v: "order", order: await api.getOpenOrder() }
    } catch (e) {
      if (!(e instanceof CheckoutApiError && e.detail === "order_not_found")) return { v: "error", key: errKey(e) }
    }
    try {
      return { v: "packages", packages: await api.listPackages(), notice }
    } catch (e) {
      return { v: "error", key: errKey(e) }
    }
  }
  const go = async (notice?: ErrKey) => {
    setView({ v: "loading" })
    setView(await resolve(notice))
  }

  useEffect(() => {
    let alive = true
    resolve().then((v) => alive && setView(v))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // An open order expires after 60 minutes; show it as soon as it does.
  const orderExpiry = view.v === "order" ? Date.parse(view.order.expires_at) : NaN
  useEffect(() => {
    if (Number.isNaN(orderExpiry)) return
    const id = setTimeout(() => setView({ v: "expired" }), Math.max(0, orderExpiry - Date.now()))
    return () => clearTimeout(id)
  }, [orderExpiry])

  async function pick(pkg: Package) {
    try {
      setView({ v: "order", order: await api.createOrder(pkg.package_id) })
    } catch (e) {
      const key = errKey(e)
      await go(key === "invalidPackage" ? "invalidPackage" : key)
    }
  }

  async function changePackage(order: Order): Promise<ErrKey | null> {
    try {
      await api.cancelOrder(order.order_code)
    } catch (e) {
      const key = errKey(e)
      // An order that is already closed is fine: the reload below shows the right state.
      if (key !== "orderNotOpen" && key !== "orderNotFound") return key
    }
    await go()
    return null
  }

  async function submit(order: Order, trx: string, payer: string): Promise<ErrKey | null> {
    try {
      const r = await api.submitTrx(order.order_code, { trx_id: trx.trim().toUpperCase(), payer_msisdn: payer })
      const balance = await api.getWallet().then((w) => w.coins_balance, () => r.coins_balance)
      setView({ v: "done", payment: r.payment, balance })
      return null
    } catch (e) {
      if (e instanceof CheckoutApiError && e.detail === "order_expired") {
        setView({ v: "expired" })
        return null
      }
      const key = errKey(e)
      if (key === "orderNotOpen" || key === "orderNotFound") {
        await go(key)
        return null
      }
      return key
    }
  }

  return (
    <div className="space-y-5">
      <h1>{t.title}</h1>
      {studentName && <div className="text-sm text-(color:--ck-muted)">{fill(t.account, { name: studentName })}</div>}

      {view.v === "loading" && <div className="text-(color:--ck-muted)">{t.loading}</div>}

      {view.v === "error" && (
        <div className={`${card} space-y-3`}>
          <p role="alert" className="text-(color:--ck-bad)!">{t.errors[view.key]}</p>
          <button className={primary} onClick={() => go()}>{t.retry}</button>
        </div>
      )}

      {view.v === "packages" && (
        <div className="space-y-3">
          <h2>{t.pickPackage}</h2>
          {view.notice && <p role="alert" className="text-(color:--ck-bad)!">{t.errors[view.notice]}</p>}
          {view.packages.map((p) => (
            <button key={p.package_id} onClick={() => pick(p)} className={`${card} flex w-full items-center justify-between text-left`}>
              <span className="flex flex-col gap-1">
                <span className={`${coinPill} self-start`}>{fill(t.coins, { coins: p.coins })}</span>
                {p.bonus_coins > 0 && <span className="text-sm text-(color:--ck-muted)">{fill(t.bonus, { bonus: p.bonus_coins })}</span>}
              </span>
              <span className="text-lg font-semibold">৳{p.amount_bdt}</span>
            </button>
          ))}
        </div>
      )}

      {view.v === "order" && <OrderView key={view.order.order_code} order={view.order} t={t} onSubmit={submit} onChange={() => changePackage(view.order)} />}

      {view.v === "expired" && (
        <div className={`${card} space-y-3`}>
          <h2>{t.expiredTitle}</h2>
          <p>{t.expiredBody}</p>
          <button className={primary} onClick={() => go()}>{t.newOrder}</button>
        </div>
      )}

      {view.v === "done" && <Done payment={view.payment} balance={view.balance} brand={brand} />}
    </div>
  )
}

function OrderView({ order, t, onSubmit, onChange }: { order: Order; t: CheckoutCopy; onSubmit: (o: Order, trx: string, payer: string) => Promise<ErrKey | null>; onChange: () => Promise<ErrKey | null> }) {
  const [trx, setTrx] = useState("")
  const [payer, setPayer] = useState("")
  const [error, setError] = useState<ErrKey | null>(null)
  const [busy, setBusy] = useState(false)
  const time = new Date(order.expires_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

  async function send(e: React.FormEvent) {
    e.preventDefault()
    const payerNumber = normalizePhone(payer) // canonical +8801XXXXXXXXX, the same form sign-in uses
    if (!payerNumber) return setError("invalidPayer")
    setBusy(true)
    setError(await onSubmit(order, trx, payerNumber))
    setBusy(false)
  }

  return (
    <div className="space-y-5">
      <div className={`${card} space-y-4`}>
        <div className="flex items-center justify-between">
          <span className={coinPill}>{fill(t.coins, { coins: order.coins })}</span>
          <span className="text-lg font-semibold">৳{order.amount_bdt}</span>
        </div>
        <p className="font-medium">{t.partnerLine}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={order.qr_image_url} alt={t.qrAlt} width={240} height={240} className="mx-auto rounded-xl border border-(color:--ck-line)" />
        <p>{t.scanQr}</p>
        <dl className="space-y-2">
          <div className="flex justify-between gap-4"><dt className="text-(color:--ck-muted)">{t.merchantNumber}</dt><dd className="font-semibold">{order.merchant_number}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-(color:--ck-muted)">{t.orderCode}</dt><dd className="font-semibold">{order.order_code}</dd></div>
        </dl>
        <div className="text-sm text-(color:--ck-muted)">{fill(t.payBefore, { time })}</div>
      </div>

      <form onSubmit={send} className={`${card} space-y-4`}>
        <div className="text-sm text-(color:--ck-muted)">{t.payHint}</div>
        <label className="block space-y-1">
          <span className="text-sm text-(color:--ck-muted)">{t.trxLabel}</span>
          <input className={field} value={trx} onChange={(e) => setTrx(e.target.value)} autoCapitalize="characters" autoComplete="off" required />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-(color:--ck-muted)">{t.payerLabel}</span>
          <input className={field} type="tel" inputMode="tel" placeholder="01XXXXXXXXX" value={payer} onChange={(e) => setPayer(e.target.value)} required />
        </label>
        {error && <p role="alert" className="text-sm text-(color:--ck-bad)!">{t.errors[error]}</p>}
        <button className={primary} disabled={busy}>{t.submit}</button>
        <button type="button" className={link} disabled={busy} onClick={async () => { setBusy(true); setError(await onChange()); setBusy(false) }}>{t.changePackage}</button>
      </form>
    </div>
  )
}

function Done({ payment, balance, brand }: { payment: Payment; balance: number; brand: CheckoutBrand }) {
  const t = brand.copy
  const added = payment.status !== "pending" // "pending" waits for verification; any other status already has its Coins
  return (
    <div className={`${card} space-y-3`}>
      <h2>{added ? t.doneAddedTitle : t.donePendingTitle}</h2>
      <p>{added ? t.doneAddedBody : t.donePendingBody}</p>
      <div className="text-sm text-(color:--ck-muted)">{t.orderCode}: {payment.order_code}</div>
      <div><span className={coinPill}>{fill(t.balance, { coins: balance })}</span></div>
      <a className={`${primary} block text-center`} href={brand.homeHref}>{t.backHome}</a>
    </div>
  )
}
