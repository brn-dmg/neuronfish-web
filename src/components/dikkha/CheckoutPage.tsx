import { notFound } from "next/navigation"
import { DikkhaCheckout } from "@/components/dikkha/DikkhaCheckout"
import type { Lang } from "@/content/dikkha/lang"
import { checkoutEnabled } from "@/lib/checkout/flag"

export function CheckoutPage({ lang }: { lang: Lang }) {
  if (!checkoutEnabled) notFound() // hidden until the checkout goes live
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <DikkhaCheckout lang={lang} />
    </div>
  )
}
