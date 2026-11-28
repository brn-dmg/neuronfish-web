import { DikkhaHome } from "@/components/dikkha/DikkhaHome"
import { dikkhaMetadata } from "@/content/dikkha/seo"

// Packs are read at build time and refreshed every hour.
export const revalidate = 3600

export const metadata = dikkhaMetadata("bn")

export default function DikkhaPage() {
  return <DikkhaHome lang="bn" />
}
