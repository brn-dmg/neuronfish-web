"use client"

import { useEffect, useRef, useState } from "react"
import { PARTNERS } from "@/content/partners"

/** "#rrggbb" + alpha -> "rgba(r,g,b,a)" */
function withAlpha(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const CYCLE_MS = 2800

export function PartnerStrip() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % PARTNERS.length)
    }, CYCLE_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [paused])

  return (
    <ul className="grid grid-cols-3 gap-x-4 gap-y-9 sm:grid-cols-5 sm:gap-x-6">
      {PARTNERS.map((p, i) => {
        const isActive = i === active
        return (
          <li key={p.id} className="flex justify-center">
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setPaused(true)
                setActive(i)
              }}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => {
                setPaused(true)
                setActive(i)
              }}
              onBlur={() => setPaused(false)}
              className="group flex w-full max-w-[8.5rem] flex-col items-center gap-3 text-center outline-none"
            >
              <span
                className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-full border bg-card transition-[transform,border-color,box-shadow] duration-500 ease-out sm:h-20 sm:w-20"
                style={{
                  borderColor: isActive ? p.accent : "#1F2937",
                  boxShadow: isActive
                    ? `0 0 0 1px ${p.accent}, 0 0 26px 0 ${withAlpha(p.accent, 0.4)}`
                    : "none",
                  transform: isActive ? "scale(1.06)" : "scale(1)",
                }}
              >
                {p.fit === "cover" ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-full w-full object-cover transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0.72 }}
                  />
                ) : (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-10 max-w-[68%] object-contain transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0.72 }}
                  />
                )}
              </span>

              <span className="flex flex-col gap-0.5">
                <span
                  className="text-sm font-semibold leading-tight transition-colors duration-300"
                  style={{ color: isActive ? "#FFFFFF" : "var(--muted-foreground)" }}
                >
                  {p.name}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/60">
                  {p.sector}
                </span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}
