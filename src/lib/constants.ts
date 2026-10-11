/** Dikkha AI Google Play Store download link */
export const DIKKHA_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.dikkhaai.app&pli=1";

/** CHHAR Google Play Store download link */
export const CHHAR_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=dev.neuronfish.chhar&pli=1";

/**
 * Legal entity details for NeuronFish, Inc.
 * Single source of truth for footer, contact page, legal pages, and structured data.
 * Must match the company's D-U-N-S record exactly.
 */
export const COMPANY = {
  legalName: "NeuronFish, Inc.",
  shortName: "NeuronFish",
  structure: "Delaware C-Corporation",
  email: "risad@neuronfish.dev",
  phone: "+8801639672704",
  phoneDisplay: "+880 1639 672704",
  address: {
    street: "131 Continental Dr Ste 305",
    city: "Newark",
    state: "DE",
    zip: "19713",
    country: "United States",
    countryCode: "US",
  },
  /** One-line address for inline display */
  addressLine: "131 Continental Dr Ste 305, Newark, DE 19713, USA",
  dhakaOffice: {
    street: "Flat 4B, House 8, Road 2B, Baridhara J Block",
    city: "Dhaka",
    country: "Bangladesh",
  },
  /** One-line Dhaka office address for inline display */
  dhakaOfficeLine: "Flat 4B, House 8, Road 2B, Baridhara J Block, Dhaka, Bangladesh",
  tradeLicense: "TRAD/DNCC/048461/2025",
  foundingDate: "2026-08-12",
  teamNote: "Product and engineering team in Dhaka, Bangladesh.",
  url: "https://www.neuronfish.dev",
  tagline: "A technology company building enterprise AI systems and next-gen apps.",
  description:
    "NeuronFish, Inc. is a technology company. We design and build enterprise AI systems and modern applications, both as our own products and as the technology partner for the companies we work with.",
  knowsAbout: [
    "Enterprise AI",
    "AI agents",
    "Agentic AI systems",
    "Retrieval-augmented generation",
    "Agentic ERP",
    "Mobile and web application development",
    "Product engineering",
  ],
} as const;

/** WhatsApp number (international format, digits only) for CHHAR vendor onboarding. Same as the company phone. */
export const CHHAR_WHATSAPP_NUMBER = "8801639672704"
