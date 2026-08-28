import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { COMPANY } from "@/lib/constants";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${COMPANY.url}/#organization`,
      name: COMPANY.legalName,
      legalName: COMPANY.legalName,
      url: COMPANY.url,
      logo: `${COMPANY.url}/neuronfish-logo.jpeg`,
      email: COMPANY.email,
      telephone: COMPANY.phone,
      description: COMPANY.description,
      slogan: COMPANY.tagline,
      knowsAbout: [...COMPANY.knowsAbout],
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
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY.url}/#website`,
      url: COMPANY.url,
      name: "NeuronFish",
      publisher: { "@id": `${COMPANY.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${COMPANY.url}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What does NeuronFish do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NeuronFish, Inc. is a technology company that designs and builds enterprise AI systems and modern applications. It develops its own products, including Dikkha AI and Chhar, and works as the technology partner for companies such as Apon Venture Lab, Apon Bazaar, Khulshi Mart, IELTSly, and ReachSavvy.",
          },
        },
        {
          "@type": "Question",
          name: "Where is NeuronFish based?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "NeuronFish, Inc. is incorporated in Delaware, United States. Its engineering team is based in Dhaka, Bangladesh.",
          },
        },
        {
          "@type": "Question",
          name: "Does NeuronFish take on partner projects?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. NeuronFish works as the embedded engineering and applied-AI team for a small portfolio of partner companies, building internal agentic AI systems, agentic ERPs, and customer-facing platforms.",
          },
        },
        {
          "@type": "Question",
          name: "What are NeuronFish's own products?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dikkha AI, an AI study assistant for Class 9 and 10 students; Chhar, a location-based deals platform; and Berai, currently in development.",
          },
        },
      ],
    },
  ],
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
    default: "NeuronFish - Enterprise AI systems and next-gen apps",
  },
  description: COMPANY.description,
  metadataBase: new URL("https://www.neuronfish.dev"),
  keywords: [
    "NeuronFish",
    "enterprise AI",
    "AI agents",
    "agentic AI",
    "product engineering",
    "software company",
    "AI apps",
    "DIKKHA",
    "CHHAR",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.neuronfish.dev",
    siteName: "NeuronFish",
    title: "NeuronFish - Enterprise AI systems and next-gen apps",
    description: COMPANY.description,
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
    description: COMPANY.tagline,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
