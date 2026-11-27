import type { Metadata } from "next"
import { DikkhaHome } from "@/components/dikkha/DikkhaHome"

// Packs are read at build time and refreshed every hour.
export const revalidate = 3600

export const metadata: Metadata = { title: "Dikkha" }

export default function DikkhaEnglishPage() {
  return <DikkhaHome lang="en" />
}
