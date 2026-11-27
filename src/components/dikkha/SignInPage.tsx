import { notFound } from "next/navigation"
import { SignIn } from "@/components/dikkha/SignIn"
import type { Lang } from "@/content/dikkha/lang"
import { checkoutEnabled } from "@/lib/checkout/flag"

export function SignInPage({ lang }: { lang: Lang }) {
  if (!checkoutEnabled) notFound() // hidden until the checkout goes live
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <SignIn lang={lang} />
    </div>
  )
}
