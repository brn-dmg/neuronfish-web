"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="gradient-border-b sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img
              src="/neuronfish-logo.jpeg"
              alt="NeuronFish logo"
              className="h-8 w-8 rounded-md border border-border/60 object-cover shadow-sm"
            />
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              NeuronFish
            </span>
          </Link>

          <nav className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
              <Link href="/products">Get Started</Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              onClick={toggleMenu}
              className="h-9 w-9 md:hidden"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <Container className="py-4">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button asChild size="sm" className="w-full">
                  <Link href="/products" onClick={closeMenu}>Get Started</Link>
                </Button>
              </div>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
