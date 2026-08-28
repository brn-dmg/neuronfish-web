import Link from "next/link"
import { Container } from "@/components/ui/Container"
import { COMPANY } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="gradient-border-t bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-lg font-extrabold tracking-tight text-foreground">NeuronFish</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building AI-powered products for everyday learning and savings.
            </p>
            <address className="space-y-1 text-xs not-italic text-muted-foreground/70">
              <p className="font-medium text-muted-foreground">{COMPANY.legalName}</p>
              <p>{COMPANY.addressLine}</p>
              <p>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-foreground">
                  {COMPANY.email}
                </a>
                {" · "}
                <a href={`tel:${COMPANY.phone}`} className="transition-colors hover:text-foreground">
                  {COMPANY.phoneDisplay}
                </a>
              </p>
              <p>{COMPANY.teamNote}</p>
            </address>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Products</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/products/dikkha" className="transition-colors hover:text-foreground">
                  DIKKHA
                </Link>
              </li>
              <li>
                <Link href="/products/chhar" className="transition-colors hover:text-foreground">
                  CHHAR
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Legal</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/dikkha-ai/privacy" className="transition-colors hover:text-foreground">
                  Dikkha AI Privacy
                </Link>
              </li>
              <li>
                <Link href="/dikkha-ai/terms" className="transition-colors hover:text-foreground">
                  Dikkha AI Terms
                </Link>
              </li>
              <li>
                <Link href="/chhar/privacy" className="transition-colors hover:text-foreground">
                  Chhar Privacy
                </Link>
              </li>
              <li>
                <Link href="/chhar/terms" className="transition-colors hover:text-foreground">
                  Chhar Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {COMPANY.legalName} All rights reserved.
        </div>
      </Container>
    </footer>
  )
}
