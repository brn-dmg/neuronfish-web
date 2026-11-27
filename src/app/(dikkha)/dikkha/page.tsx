import type { Metadata } from "next"
import { DikkhaHome } from "@/components/dikkha/DikkhaHome"

export const metadata: Metadata = { title: "Dikkha" }

export default function DikkhaPage() {
  return <DikkhaHome lang="bn" />
}
