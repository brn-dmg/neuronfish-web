export interface Partner {
  id: string
  name: string
  /** Public site, shown as the outbound link */
  url: string
  /** Bare host for display */
  host: string
  /** Path to the resized logo in /public/partners */
  logo: string
  /** Short sector label */
  sector: string
  /** What NeuronFish builds and runs for them. Two sentences, plain. */
  summary: string
  /** Capability tags */
  tags: string[]
  /** Accent hex used for the card border glow */
  accent: string
}

export const PARTNERS: Partner[] = [
  {
    id: "apon-venture-lab",
    name: "Apon Venture Lab",
    url: "https://aponvlab.io",
    host: "aponvlab.io",
    logo: "/partners/apon-venture-lab.png",
    sector: "Venture studio",
    summary:
      "Apon Venture Lab is an AI-native venture studio that co-builds startups with domain-expert founders. NeuronFish is its product engineering team, taking ventures from first commit to a working product.",
    tags: ["MVP engineering", "AI stack", "Product"],
    accent: "#8b5cf6",
  },
  {
    id: "aponbazaar",
    name: "Apon Bazaar",
    url: "https://aponbazaar.co",
    host: "aponbazaar.co",
    logo: "/partners/aponbazaar.png",
    sector: "Fintech and retail",
    summary:
      "Apon Bazaar gives Bangladesh's industrial workforce advance salary, near zero-interest credit, and discounted groceries. NeuronFish builds its internal agentic AI systems, including an agentic ERP.",
    tags: ["Agentic ERP", "Automation", "Internal AI"],
    accent: "#3b82f6",
  },
  {
    id: "khulshi-mart",
    name: "Khulshi Mart",
    url: "https://khulshimart.com",
    host: "khulshimart.com",
    logo: "/partners/khulshi-mart.png",
    sector: "Retail",
    summary:
      "Khulshi Mart is a Chattogram supershop chain with its own food-testing lab, e-commerce, and home delivery. NeuronFish builds its internal agentic AI systems, including an agentic ERP.",
    tags: ["Agentic ERP", "Automation", "Internal AI"],
    accent: "#10b981",
  },
  {
    id: "ieltsly",
    name: "IELTSly",
    url: "https://ieltsly.ai",
    host: "ieltsly.ai",
    logo: "/partners/ieltsly.png",
    sector: "Edtech",
    summary:
      "IELTSly is an AI IELTS preparation platform with a voice-based speaking partner, automated writing evaluation, and adaptive study plans. NeuronFish builds the agentic AI systems behind it.",
    tags: ["Voice AI", "RAG", "Evaluation"],
    accent: "#ef4444",
  },
  {
    id: "reachsavvy",
    name: "ReachSavvy",
    url: "https://reachsavvy.digital",
    host: "reachsavvy.digital",
    logo: "/partners/reachsavvy.png",
    sector: "Marketing",
    summary:
      "ReachSavvy is a digital growth agency running paid media, SEO, and content for brands across several markets. NeuronFish builds its internal agentic AI software for marketing operations.",
    tags: ["Automation", "Internal AI", "Agents"],
    accent: "#a855f7",
  },
]
