import type { Metadata } from "next"
import { CheckoutPage } from "@/components/dikkha/CheckoutPage"

export const metadata: Metadata = { title: "Buy Coins", robots: { index: false } }

export default function Page() {
  return <CheckoutPage lang="bn" />
}
