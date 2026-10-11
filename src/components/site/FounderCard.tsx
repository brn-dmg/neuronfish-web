"use client"

import { useRef, useState, useCallback } from "react"
import Link from "next/link"
import { motion, useSpring, useTransform } from "motion/react"
import { Linkedin, Github, Globe } from "lucide-react"
import { isRealLink, type TeamMember } from "@/content/team"

interface FounderCardProps {
  member: TeamMember
  index: number
}

export function FounderCard({ member, index }: FounderCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spotX, setSpotX] = useState(50)
  const [spotY, setSpotY] = useState(50)

  // Mouse position for 3D tilt - raw values
  const rawX = useSpring(0, { stiffness: 150, damping: 20 })
  const rawY = useSpring(0, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(rawY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(rawX, [-0.5, 0.5], [-6, 6])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    rawX.set(x - 0.5)
    rawY.set(y - 0.5)
    setSpotX(x * 100)
    setSpotY(y * 100)
  }, [rawX, rawY])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setSpotX(((e.clientX - rect.left) / rect.width) * 100)
    setSpotY(((e.clientY - rect.top) / rect.height) * 100)
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }, [rawX, rawY])

  const ringGradient = index === 0
    ? "conic-gradient(from 0deg, #2563eb, #7c3aed, #2563eb)"
    : "conic-gradient(from 180deg, #7c3aed, #2563eb, #7c3aed)"

  const ringGradientRevealed = index === 0
    ? "conic-gradient(from 0deg, #1d4ed8, #5b21b6, #1d4ed8)"
    : "conic-gradient(from 180deg, #5b21b6, #1d4ed8, #5b21b6)"

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative rounded-2xl will-change-transform cursor-default"
    >
      {/* ── Dark layer (always visible base) ── */}
      <div className="relative rounded-2xl border border-white/[0.06] bg-[#0d1117]/80 backdrop-blur-sm overflow-hidden">

        {/* Cream reveal layer - clips from mouse entry point outward */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          animate={{
            clipPath: isHovered
              ? `circle(150% at ${spotX}% ${spotY}%)`
              : `circle(0% at ${spotX}% ${spotY}%)`,
          }}
          transition={{
            duration: isHovered ? 0.65 : 0.45,
            ease: isHovered ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.6, 1],
          }}
          style={{
            background: "linear-gradient(135deg, #f7f3ec 0%, #ede8de 50%, #f2ede4 100%)",
          }}
        />

        {/* Subtle grain texture on cream */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none opacity-0 mix-blend-multiply"
          animate={{ opacity: isHovered ? 0.06 : 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 inset-x-0 h-px z-20 pointer-events-none overflow-hidden rounded-t-2xl">
          <motion.div
            className="h-full"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(30,20,10,0.2), transparent)" }}
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-20 p-8 md:p-10">

          {/* Avatar + Identity */}
          <div className="flex items-start gap-5 mb-6">
            {/* Avatar ring */}
            <div className="relative shrink-0 h-[72px] w-[72px]">
              <div
                className="absolute -inset-[3px] rounded-full transition-opacity duration-500"
                style={{
                  background: isHovered ? ringGradientRevealed : ringGradient,
                  animation: "spin 6s linear infinite",
                  opacity: isHovered ? 1 : 0.6,
                }}
              />
              <motion.div
                className="absolute inset-[2px] rounded-full"
                animate={{ backgroundColor: isHovered ? "#f2ede4" : "#0d1117" }}
                transition={{ duration: 0.4 }}
              />
              {member.photoUrl ? (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="absolute inset-[3px] rounded-full object-cover w-[calc(100%-6px)] h-[calc(100%-6px)]"
                />
              ) : (
                <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-primary/20 to-violet-600/20 flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-br from-blue-300 to-violet-300 bg-clip-text text-transparent select-none">
                    {member.initials}
                  </span>
                </div>
              )}
            </div>

            {/* Name + role */}
            <div className="min-w-0 pt-1">
              <motion.h3
                className="text-xl font-bold tracking-tight"
                animate={{ color: isHovered ? "#1a1208" : "#ffffff" }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                {member.name}
              </motion.h3>
              <motion.div
                className="mt-1.5 inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 border"
                animate={{
                  backgroundColor: isHovered ? "rgba(30,20,10,0.08)" : "rgba(37,99,235,0.08)",
                  borderColor: isHovered ? "rgba(30,20,10,0.15)" : "rgba(37,99,235,0.2)",
                }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                <motion.div
                  className="h-1.5 w-1.5 rounded-full animate-gentle-pulse"
                  animate={{ backgroundColor: isHovered ? "#1e3a1a" : "#2563eb" }}
                  transition={{ duration: 0.35 }}
                />
                <motion.span
                  className="text-xs font-semibold tracking-wide"
                  animate={{ color: isHovered ? "#2a1f0a" : "#93c5fd" }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                >
                  {member.role}
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <motion.p
            className="text-[15px] leading-relaxed mb-8"
            animate={{ color: isHovered ? "#3d2f1a" : "#a1a1aa" }}
            transition={{ duration: 0.35, delay: 0.15 }}
          >
            {member.bio}
          </motion.p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {isRealLink(member.linkedin) && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <motion.span
                  className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium transition-shadow duration-300"
                  animate={isHovered ? {
                    backgroundColor: "#1a1208",
                    borderColor: "rgba(26,18,8,0.8)",
                    color: "#f7f3ec",
                  } : {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "#a1a1aa",
                  }}
                  transition={{ duration: 0.3, delay: 0.18 }}
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </motion.span>
              </Link>
            )}
            {isRealLink(member.github) && (
              <Link
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s GitHub`}
              >
                <motion.span
                  className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium"
                  animate={isHovered ? {
                    backgroundColor: "#1a1208",
                    borderColor: "rgba(26,18,8,0.8)",
                    color: "#f7f3ec",
                  } : {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "#a1a1aa",
                  }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </motion.span>
              </Link>
            )}
            {isRealLink(member.website) && (
              <Link
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s website`}
              >
                <motion.span
                  className="inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-medium"
                  animate={isHovered ? {
                    backgroundColor: "#1a1208",
                    borderColor: "rgba(26,18,8,0.8)",
                    color: "#f7f3ec",
                  } : {
                    backgroundColor: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.06)",
                    color: "#a1a1aa",
                  }}
                  transition={{ duration: 0.3, delay: 0.22 }}
                >
                  <Globe className="h-4 w-4" />
                  Portfolio
                </motion.span>
              </Link>
            )}
          </div>
        </div>

        {/* Bottom ambient glow on hover */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-40 rounded-full bg-primary/[0.08] blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </motion.div>
  )
}
