import type { CheckoutBrand } from "@/components/checkout/brand"
import { getContent } from "@/content/dikkha"
import type { Lang } from "@/content/dikkha/lang"

export function dikkhaBrand(lang: Lang): CheckoutBrand {
  return { name: "Dikkha", homeHref: lang === "en" ? "/dikkha/en" : "/dikkha", copy: getContent(lang).checkout }
}
