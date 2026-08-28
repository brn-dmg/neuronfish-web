export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  linkedin?: string
  github?: string
  website?: string
  photoUrl?: string
  initials: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "risad",
    name: "Risad Raihan Malik",
    role: "Founder & CEO",
    bio: "Founder and CEO of NeuronFish. Leads the company and its technical direction.",
    initials: "RM",
    photoUrl: "/ami.jpeg",
    linkedin: "https://www.linkedin.com/in/risad-raihan-malik/",
    github: "https://github.com/Risad-Raihan",
  },
  {
    id: "saif",
    name: "Saif Rashid",
    role: "Co-founder & Managing Director",
    bio: "Co-founder and Managing Director. Drives growth and partnerships across the company.",
    initials: "SR",
    photoUrl: "/saifbhai.jpeg",
    linkedin: "https://www.linkedin.com/in/saif-rashid/",
    website: "https://www.buildwithsaif.com/",
  },
  {
    id: "nafis",
    name: "Nafis Radoan",
    role: "Lead, Full-Stack Department",
    bio: "Full-stack wizard ensuring robust and seamless application experiences across our product suite.",
    initials: "NR",
    linkedin: "#",
    github: "#",
  },
]
