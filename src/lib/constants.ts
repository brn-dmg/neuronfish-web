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
  phone: "+8801639673704",
  phoneDisplay: "+880 1639 673704",
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
  teamNote: "Product & engineering team in Dhaka, Bangladesh.",
  url: "https://www.neuronfish.dev",
} as const;
