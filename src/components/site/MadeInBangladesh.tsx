"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "motion/react"
import Lottie from "lottie-react"
import flagAnimation from "@/../public/bd-flag.json"
import sceneAnimation from "@/../public/bicycle.json"

const TITLE = "Made in Bangladesh"

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing")
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: false, margin: "-60px" })

  useEffect(() => {
    if (!isInView) return

    let timeout: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1))
        }, 70 + Math.random() * 50)
      } else {
        timeout = setTimeout(() => setPhase("hold"), 2200)
      }
    } else if (phase === "hold") {
      timeout = setTimeout(() => setPhase("erasing"), 100)
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 35)
      } else {
        timeout = setTimeout(() => setPhase("typing"), 600)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, isInView, text])

  return (
    <span ref={ref} aria-label={text}>
      {displayed}
      <motion.span
        className="inline-block w-[3px] h-[0.85em] bg-[#2a4a3a] ml-0.5 align-middle rounded-full"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
      />
    </span>
  )
}

export function MadeInBangladesh() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] aspect-[16/10] md:aspect-[16/9] flex flex-col items-center justify-start"
    >
      {/* Light sky background behind the Lottie */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f4f1] via-[#e8ede9] to-[#dfe6e0]" />

      {/* Lottie scene - fills the entire card */}
      <div className="absolute inset-0">
        <Lottie
          animationData={sceneAnimation}
          loop
          autoplay
          className="w-full h-full"
          style={{ position: "absolute", inset: 0 }}
          rendererSettings={{ preserveAspectRatio: "xMidYMax slice" }}
        />
      </div>

      {/* Content - positioned in the upper sky area */}
      <div className="relative z-10 flex flex-col items-center pt-6 md:pt-10 px-6">
        {/* Waving flag */}
        <motion.div
          className="relative mb-1"
          initial={{ opacity: 0, scale: 0.6, y: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 }}
        >
          <Lottie
            animationData={flagAnimation}
            loop
            autoplay
            className="w-20 h-20 md:w-28 md:h-28 relative drop-shadow-[0_3px_12px_rgba(0,0,0,0.25)]"
          />
        </motion.div>

        {/* "Made in Bangladesh" - Playfair Display serif, dark text on daylight scene */}
        <motion.h3
          className="text-2xl md:text-3xl lg:text-4xl font-black italic tracking-tight min-h-[1.2em]"
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            color: "#2a4a3a",
            textShadow: "0 1px 4px rgba(255,255,255,0.5)",
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <TypingText text={TITLE} />
        </motion.h3>
      </div>
    </div>
  )
}
