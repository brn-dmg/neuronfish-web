import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SocialLinksConfig, SocialPlatform } from "@/lib/social"

const PLATFORMS: { key: SocialPlatform; label: string; icon: typeof Facebook }[] = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "x", label: "X", icon: Twitter },
]

interface SocialLinksProps {
  links: SocialLinksConfig
  /** Name used in aria-labels, e.g. "Dikkha" */
  name: string
  className?: string
  iconClassName?: string
}

export function SocialLinks({ links, name, className, iconClassName }: SocialLinksProps) {
  const visible = PLATFORMS.filter(({ key }) => links[key])
  if (visible.length === 0) return null

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {visible.map(({ key, label, icon: Icon }) => (
        <a
          key={key}
          href={links[key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on ${label}`}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon className={cn("h-4 w-4", iconClassName)} />
        </a>
      ))}
    </div>
  )
}
