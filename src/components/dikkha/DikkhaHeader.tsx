import Link from "next/link"

// Sign in and the language switch are added in J2-4 and J2-2.
export function DikkhaHeader() {
  return (
    <header className="border-b border-dk-line bg-dk-surface">
      <div className="mx-auto flex h-16 max-w-5xl items-center px-4">
        <Link href="/dikkha" className="text-xl font-semibold text-dk-primary">
          Dikkha
        </Link>
      </div>
    </header>
  )
}
