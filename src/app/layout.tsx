import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { COMPANY } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY.legalName,
  legalName: COMPANY.legalName,
  url: COMPANY.url,
  logo: `${COMPANY.url}/neuronfish-logo.jpeg`,
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.street,
    addressLocality: COMPANY.address.city,
    addressRegion: COMPANY.address.state,
    postalCode: COMPANY.address.zip,
    addressCountry: COMPANY.address.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: COMPANY.email,
    telephone: COMPANY.phone,
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NeuronFish",
    default: "NeuronFish - AI-powered products for everyday learning & savings",
  },
  description: "NeuronFish, Inc. builds AI-powered products for everyday learning and savings. Home of DIKKHA and CHHAR.",
  metadataBase: new URL("https://www.neuronfish.dev"),
  keywords: ["AI", "Bangladesh", "Education", "Savings", "DIKKHA", "CHHAR", "Dhaka", "Technology"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.neuronfish.dev",
    siteName: "NeuronFish",
    title: "NeuronFish - AI-powered products for everyday learning & savings",
    description: "Innovating for everyday learning and savings with AI.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NeuronFish",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuronFish",
    description: "AI-powered products for everyday learning & savings.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0F14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} ${playfair.variable} antialiased min-h-screen bg-background font-sans text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
