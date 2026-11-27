import type { Metadata } from "next"
import { SignInPage } from "@/components/dikkha/SignInPage"

export const metadata: Metadata = { title: "Dikkha", robots: { index: false } }

export default function Page() {
  return <SignInPage lang="en" />
}
