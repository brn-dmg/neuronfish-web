import Link from "next/link"
import { Github, Linkedin, Globe } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { GlowCard } from "@/components/ui/GlowCard"
import { isRealLink, TeamMember } from "@/content/team"

interface TeamCardProps {
  member: TeamMember
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <GlowCard className="h-full">
      <div className="flex flex-row items-center gap-4 p-6 pb-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={member.photoUrl} alt={member.name} />
          <AvatarFallback className="bg-primary/10 font-semibold text-primary text-lg">
            {member.initials}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h3 className="text-base font-semibold tracking-tight text-foreground">{member.name}</h3>
          <p className="text-sm text-primary font-medium">{member.role}</p>
        </div>
      </div>
      <div className="px-6 pb-6">
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
        <div className="flex gap-3">
          {isRealLink(member.linkedin) && (
            <Link
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
            </Link>
          )}
          {isRealLink(member.github) && (
            <Link
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s GitHub`}
            >
              <Github className="h-4 w-4" />
            </Link>
          )}
          {isRealLink(member.website) && (
            <Link
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`${member.name}'s website`}
            >
              <Globe className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </GlowCard>
  )
}
