"use client"

import { Checkout } from "@/components/checkout/Checkout"
import { checkoutLang } from "@/content/dikkha"
import { dikkhaBrand } from "@/content/dikkha/brand"
import type { Lang } from "@/content/dikkha/lang"
import { SignIn } from "./SignIn"
import { useSession } from "./SessionProvider"

// Sign in first (so the Coins land on the app account), then the shared Checkout.
export function DikkhaCheckout({ lang }: { lang: Lang }) {
  const { ready, current, checkoutApi } = useSession()
  if (!ready) return null
  if (!current) return <SignIn lang={lang} />
  return (
    <div lang={checkoutLang(lang)}>
      <Checkout brand={dikkhaBrand(lang)} api={checkoutApi} studentName={current.name} />
    </div>
  )
}
