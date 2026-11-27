import type { Metadata } from "next"
import { DikkhaHome } from "@/components/dikkha/DikkhaHome"

export const metadata: Metadata = { title: "Dikkha" }

export default function DikkhaEnglishPage() {
  return <DikkhaHome lang="en" />
}
