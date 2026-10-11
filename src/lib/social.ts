export type SocialPlatform = "linkedin" | "facebook" | "instagram" | "x"

export type SocialLinksConfig = Partial<Record<SocialPlatform, string>>

/**
 * Single source of truth for social profiles.
 * Fill in an empty URL to make its icon appear; empty URLs are never rendered.
 */
export const SOCIALS = {
  neuronfish: {
    linkedin: "https://www.linkedin.com/company/neuronfish/",
    facebook: "", // TODO: add NeuronFish Facebook URL
    instagram: "", // TODO: add NeuronFish Instagram URL
    x: "", // TODO: add NeuronFish X URL
  },
  dikkha: {
    facebook: "https://www.facebook.com/profile.php?id=61576450977574",
    instagram: "https://www.instagram.com/dikkha.ai/",
  },
  chhar: {
    facebook: "https://www.facebook.com/profile.php?id=61589387202062",
    instagram: "https://www.instagram.com/chhar.bd/",
  },
} as const satisfies Record<string, SocialLinksConfig>

/** All non-empty NeuronFish profile URLs, for JSON-LD sameAs. */
export const NEURONFISH_SAME_AS: string[] = Object.values(SOCIALS.neuronfish).filter(Boolean)
