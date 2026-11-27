import { Hind_Siliguri, Outfit } from "next/font/google"
import { DikkhaHeader } from "@/components/dikkha/DikkhaHeader"
import { DikkhaFooter } from "@/components/dikkha/DikkhaFooter"
import { SessionProvider } from "@/components/dikkha/SessionProvider"

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
})

// Own light theme: does not use the main site's Navbar, Footer, Pluto widget or dark tokens.
export default function DikkhaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`dk-root ${outfit.variable} ${hindSiliguri.variable} flex min-h-screen flex-col bg-dk-bg font-dk text-dk-ink`}
      style={{ colorScheme: "light" }}
    >
      <SessionProvider>
        <DikkhaHeader />
        <main className="flex-1">{children}</main>
        <DikkhaFooter />
      </SessionProvider>
    </div>
  )
}
