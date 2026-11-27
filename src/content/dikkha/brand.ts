import type { CheckoutBrand } from "../../components/checkout/brand.ts"
import { getContent } from "./index.ts"
import type { Lang } from "./lang.ts"

export function dikkhaBrand(lang: Lang): CheckoutBrand {
  return { name: "Dikkha", homeHref: lang === "en" ? "/dikkha/en" : "/dikkha", copy: getContent(lang).checkout }
}
