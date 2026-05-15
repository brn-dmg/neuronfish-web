interface Screen {
  src?: string
  alt?: string
  label: string
  placeholder?: boolean
}

interface VendorDashboardShowcaseProps {
  screens: Screen[]
}

export function VendorDashboardShowcase({ screens }: VendorDashboardShowcaseProps) {
  const [hero, sec1, sec2] = screens

  return (
    <div className="relative mx-auto" style={{ maxWidth: 660 }}>
      {/* Amber radial glow — sits behind the entire cluster */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div
          className="rounded-full"
          style={{
            width: 480,
            height: 360,
            background: "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── Desktop cluster (sm+): sec1 | hero↑ | sec2 ── */}
      <div className="hidden sm:flex items-end justify-center gap-5">

        {/* Left secondary */}
        {sec1 && (
          <div className="shrink-0" style={{ width: 188 }}>
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 20,
                border: "1px solid rgba(245,158,11,0.25)",
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.08)",
                maxHeight: 340,
              }}
            >
              <img
                src={sec1.src}
                alt={sec1.alt ?? sec1.label}
                className="block w-full object-cover object-top"
                style={{ maxHeight: 340 }}
                loading="lazy"
              />
            </div>
            <p
              className="mt-2.5 text-center text-[11px] font-medium"
              style={{ color: "rgba(245,158,11,0.6)" }}
            >
              {sec1.label}
            </p>
          </div>
        )}

        {/* Hero — center, lifted above secondaries */}
        {hero && (
          <div
            className="relative shrink-0"
            style={{ width: 268, transform: "translateY(-32px)" }}
          >
            {/* Per-hero amber bloom */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10"
              style={{
                borderRadius: 32,
                background:
                  "radial-gradient(ellipse at center, rgba(245,158,11,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 24,
                border: "1px solid rgba(245,158,11,0.35)",
                boxShadow:
                  "0 32px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,158,11,0.12), 0 0 48px rgba(245,158,11,0.1)",
                maxHeight: 460,
              }}
            >
              <img
                src={hero.src}
                alt={hero.alt ?? hero.label}
                className="block w-full object-cover object-top"
                style={{ maxHeight: 460 }}
                loading="lazy"
              />
            </div>
            <p
              className="mt-3 text-center text-xs font-semibold"
              style={{ color: "rgba(245,158,11,0.85)" }}
            >
              {hero.label}
            </p>
          </div>
        )}

        {/* Right secondary */}
        {sec2 && (
          <div className="shrink-0" style={{ width: 188 }}>
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 20,
                border: "1px solid rgba(245,158,11,0.25)",
                boxShadow:
                  "0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,158,11,0.08)",
                maxHeight: 340,
              }}
            >
              <img
                src={sec2.src}
                alt={sec2.alt ?? sec2.label}
                className="block w-full object-cover object-top"
                style={{ maxHeight: 340 }}
                loading="lazy"
              />
            </div>
            <p
              className="mt-2.5 text-center text-[11px] font-medium"
              style={{ color: "rgba(245,158,11,0.6)" }}
            >
              {sec2.label}
            </p>
          </div>
        )}

      </div>

      {/* ── Mobile stack (< sm): hero top, secondaries row below ── */}
      <div className="flex flex-col items-center gap-5 sm:hidden">
        {hero && (
          <div style={{ width: 230 }}>
            <div
              className="overflow-hidden"
              style={{
                borderRadius: 22,
                border: "1px solid rgba(245,158,11,0.35)",
                boxShadow:
                  "0 24px 56px rgba(0,0,0,0.65), 0 0 36px rgba(245,158,11,0.1)",
                maxHeight: 400,
              }}
            >
              <img
                src={hero.src}
                alt={hero.alt ?? hero.label}
                className="block w-full object-cover object-top"
                style={{ maxHeight: 400 }}
                loading="lazy"
              />
            </div>
            <p
              className="mt-2.5 text-center text-xs font-semibold"
              style={{ color: "rgba(245,158,11,0.85)" }}
            >
              {hero.label}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          {[sec1, sec2].filter(Boolean).map((screen, i) => (
            <div key={i} style={{ width: 150 }}>
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(245,158,11,0.22)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.55)",
                  maxHeight: 270,
                }}
              >
                <img
                  src={screen!.src}
                  alt={screen!.alt ?? screen!.label}
                  className="block w-full object-cover object-top"
                  style={{ maxHeight: 270 }}
                  loading="lazy"
                />
              </div>
              <p
                className="mt-2 text-center text-[10px] font-medium"
                style={{ color: "rgba(245,158,11,0.6)" }}
              >
                {screen!.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
